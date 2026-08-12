import { createHmac } from "node:crypto";
import type { Request, Response, NextFunction } from "express";
import { db, rateLimitHitsTable, sql, lt } from "@workspace/db";
import type { ApiErrorBody } from "@workspace/api-zod";
import { logger } from "./logger";

// Postgres tabanlı, sabit pencereli (fixed-window) rate limiter. Autoscale
// altında birden fazla instance çalışabildiği ve process-local bellek
// instance'lar arasında paylaşılmadığı için express-rate-limit'in
// MemoryStore'u yerine bu tablo kullanılıyor.
//
// İki bağımsız katman aynı `rate_limit_hits` tablosunu paylaşır; ayırt edici
// tek şey identifierHash'in geldiği ad alanı (namespace):
//   - Katman 1 (global devre kesici): tüm istekler için sabit bir literal
//     ("contact-global") — hash'lenmeye gerek yok, çünkü zaten hassas/kişisel
//     bir veri değil.
//   - Katman 2 (e-posta bazlı): normalize edilmiş e-postanın HMAC-SHA256
//     hash'i (her zaman 64 karakterlik hex string).
// Bu iki değer yapısal olarak asla çakışmaz, bu yüzden ayrı bir tabloya
// gerek yok.
//
// ÖNEMLİ — GEÇMİŞ TASARIM DEĞİŞİKLİĞİ: Bu limiter artık istemci IP'sine /
// X-Forwarded-For'a HİÇ dayanmıyor. Production'da doğrulandı: Replit'in
// proxy zinciri, tamamen farklı iki ağdaki (masaüstü internet + mobil veri,
// Wi-Fi kapalı) iki farklı gerçek ziyaretçiyi aynı identifier'a
// düşürüyordu — muhtemelen paylaşılan bir proxy hop'u X-Forwarded-For'u
// beklendiği gibi zenginleştirmiyor. Bu, IP bazlı "kullanıcı" limitini
// aslında "paylaşılan proxy" limitine dönüştürüyor ve gerçek kullanıcıları
// birbirine karıştırıyordu. Kök nedeni tahmin etmek (hop sayısı, header
// davranışı vb.) yerine, normal kullanıcı limitinin IP'ye bağımlılığı
// tamamen kaldırıldı — bkz. silinen `client-identity.ts`.

const GLOBAL_WINDOW_MS = Number(process.env["CONTACT_GLOBAL_RATE_WINDOW_MS"] ?? 10 * 60 * 1000);
const GLOBAL_LIMIT = Number(process.env["CONTACT_GLOBAL_RATE_LIMIT"] ?? 100);
const GLOBAL_IDENTIFIER = "contact-global";

const EMAIL_WINDOW_MS = 10 * 60 * 1000;
const EMAIL_LIMIT = 5;

// HASH_KEY yalnızca e-posta bazlı limiter için bir anahtar — gerçek bir
// anonimleştirme mekanizması DEĞİL. RATE_LIMIT_SALT tanımlıysa HMAC anahtarı
// olarak kullanılır (tüm instance'larda aynı olmalı ki aynı e-posta hangi
// instance'a düşerse düşsün aynı hash'e denk gelsin). Tanımlı değilse, sabit
// bir anahtara düşülür: bu durumda hash, ham/normalize e-postayı kolonda düz
// saklamamak için bir veri-minimizasyonu adımıdır, güçlü bir kriptografik
// koruma sağlamaz.
const salt = process.env["RATE_LIMIT_SALT"];
if (!salt) {
  logger.warn(
    "RATE_LIMIT_SALT tanımlı değil. E-posta bazlı rate-limit kimlikleri sabit, gizli olmayan bir " +
      "anahtarla hash'leniyor — bu anonimleştirme sağlamaz, sadece ham e-postayı kolonda düz tutmamak içindir.",
  );
}
const HASH_KEY = salt ?? "delta-oto-contact-rate-limit-v1";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function hashEmail(normalizedEmail: string): string {
  return createHmac("sha256", HASH_KEY).update(normalizedEmail).digest("hex");
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

async function cleanupExpired(): Promise<void> {
  // Fırsatçı temizlik: ayrı bir cron/worker olmadan, süresi dolmuş
  // satırların birikmesini önler. Küçük bir tablo üzerinde çalıştığı için
  // (kısa saklama süresi + düşük hacim) her istekte bir kez çalıştırmak ucuz.
  await db.delete(rateLimitHitsTable).where(lt(rateLimitHitsTable.expiresAt, new Date()));
}

async function checkRateLimit(identifierHash: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const windowStart = new Date(Math.floor(Date.now() / windowMs) * windowMs);
  const expiresAt = new Date(windowStart.getTime() + windowMs);

  const [row] = await db
    .insert(rateLimitHitsTable)
    .values({ identifierHash, windowStart, expiresAt, requestCount: 1 })
    .onConflictDoUpdate({
      target: [rateLimitHitsTable.identifierHash, rateLimitHitsTable.windowStart],
      set: { requestCount: sql`${rateLimitHitsTable.requestCount} + 1` },
    })
    .returning({ requestCount: rateLimitHitsTable.requestCount });

  const requestCount = row?.requestCount ?? 0;
  const resetSeconds = Math.ceil((expiresAt.getTime() - Date.now()) / 1000);

  return {
    allowed: requestCount <= limit,
    limit,
    remaining: Math.max(limit - requestCount, 0),
    resetSeconds,
  };
}

export function setRateLimitHeaders(res: Response, result: RateLimitResult): void {
  res.setHeader("RateLimit-Limit", String(result.limit));
  res.setHeader("RateLimit-Remaining", String(result.remaining));
  res.setHeader("RateLimit-Reset", String(result.resetSeconds));
  if (!result.allowed) {
    res.setHeader("Retry-After", String(result.resetSeconds));
  }
}

// Katman 1: global devre kesici. Kimlikten tamamen bağımsız — tek amacı, bu
// düşük hacimli B2B formunu ve veritabanını yüksek hacimli spam/kötüye
// kullanıma karşı korumak. Normal meşru trafiğin buna değmesi beklenmez.
// Bu, olağan kullanıcı bazlı limit DEĞİL — bkz. checkEmailRateLimit.
export async function globalContactRateLimit(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await cleanupExpired();
    const result = await checkRateLimit(GLOBAL_IDENTIFIER, GLOBAL_LIMIT, GLOBAL_WINDOW_MS);

    if (!result.allowed) {
      // Yalnızca bloklayan katman header'ları yazar — aksi halde bu global
      // katman her zaman ilk çalıştığı için, aşağıdaki e-posta bazlı katman
      // RateLimit-* header'larını (res.setHeader üzerine yazar) kendi
      // değerleriyle ezer ve global sayaç istemciye hiç görünmez olur.
      setRateLimitHeaders(res, result);
      const body: ApiErrorBody = { error: "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin." };
      res.status(429).json(body);
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
}

// Katman 2: normalize edilmiş e-posta bazlı limiter (5 istek / 10 dk).
// Route içinde, gövde doğrulaması ve honeypot kontrolünden SONRA çağrılır —
// bkz. contact.ts. Büyük/küçük harf ve baştaki/sondaki boşluk farkları aynı
// kovaya (bucket) düşer; ham/normalize e-posta tabloda asla düz saklanmaz.
export async function checkEmailRateLimit(email: string): Promise<RateLimitResult> {
  const identifierHash = hashEmail(normalizeEmail(email));
  return checkRateLimit(identifierHash, EMAIL_LIMIT, EMAIL_WINDOW_MS);
}

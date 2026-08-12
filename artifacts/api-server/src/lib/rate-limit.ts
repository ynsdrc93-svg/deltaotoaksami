import { createHmac } from "node:crypto";
import type { Request, Response, NextFunction } from "express";
import { db, rateLimitHitsTable, sql, lt } from "@workspace/db";
import type { ApiErrorBody } from "@workspace/api-zod";
import { getClientIdentifier } from "./client-identity";
import { logger } from "./logger";

// Postgres tabanlı, sabit pencereli (fixed-window) rate limiter. Autoscale
// altında birden fazla instance çalışabildiği ve process-local bellek
// instance'lar arasında paylaşılmadığı için express-rate-limit'in
// MemoryStore'u yerine bu tablo kullanılıyor — zaten kurulu olan Postgres'i
// paylaşarak, Redis vb. yeni bir servis eklemeden.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

// identifierHash yalnızca rate-limit sayacı için bir anahtar — gerçek bir
// anonimleştirme mekanizması DEĞİL. RATE_LIMIT_SALT tanımlıysa HMAC anahtarı
// olarak kullanılır (tüm instance'larda aynı olmalı ki aynı ziyaretçi hangi
// instance'a düşerse düşsün aynı hash'e denk gelsin). Tanımlı değilse, kodda
// sabit/gizli-olmayan bir anahtara düşülür: bu durumda hash, ham IP'yi
// kolonda düz saklamamak için bir veri-minimizasyonu adımıdır, kriptografik
// bir koruma sağlamaz (IP adres uzayı hash'i kaba kuvvetle kırmak için
// yeterince küçüktür).
const salt = process.env["RATE_LIMIT_SALT"];
if (!salt) {
  logger.warn(
    "RATE_LIMIT_SALT tanımlı değil. Rate-limit kimlikleri sabit, gizli olmayan bir anahtarla " +
      "hash'leniyor — bu anonimleştirme sağlamaz, sadece ham IP'yi kolonda düz tutmamak içindir.",
  );
}
const HASH_KEY = salt ?? "delta-oto-contact-rate-limit-v1";

function hashIdentifier(identifier: string): string {
  return createHmac("sha256", HASH_KEY).update(identifier).digest("hex");
}

export async function contactRateLimit(req: Request, res: Response, next: NextFunction): Promise<void> {
  const windowStart = new Date(Math.floor(Date.now() / WINDOW_MS) * WINDOW_MS);
  const expiresAt = new Date(windowStart.getTime() + WINDOW_MS);
  const identifierHash = hashIdentifier(getClientIdentifier(req));

  try {
    // Fırsatçı temizlik: ayrı bir cron/worker olmadan, süresi dolmuş
    // satırların birikmesini önler. Küçük bir tablo üzerinde çalıştığı için
    // (kısa saklama süresi + düşük hacim) her istekte çalıştırmak ucuz.
    await db.delete(rateLimitHitsTable).where(lt(rateLimitHitsTable.expiresAt, new Date()));

    const [row] = await db
      .insert(rateLimitHitsTable)
      .values({ identifierHash, windowStart, expiresAt, requestCount: 1 })
      .onConflictDoUpdate({
        target: [rateLimitHitsTable.identifierHash, rateLimitHitsTable.windowStart],
        set: { requestCount: sql`${rateLimitHitsTable.requestCount} + 1` },
      })
      .returning({ requestCount: rateLimitHitsTable.requestCount });

    if (!row) {
      next();
      return;
    }

    const resetSeconds = Math.ceil((expiresAt.getTime() - Date.now()) / 1000);
    res.setHeader("RateLimit-Limit", String(LIMIT));
    res.setHeader("RateLimit-Remaining", String(Math.max(LIMIT - row.requestCount, 0)));
    res.setHeader("RateLimit-Reset", String(resetSeconds));

    if (row.requestCount > LIMIT) {
      res.setHeader("Retry-After", String(resetSeconds));
      const body: ApiErrorBody = { error: "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin." };
      res.status(429).json(body);
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
}

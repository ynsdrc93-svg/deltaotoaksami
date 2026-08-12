import { pgTable, text, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";

// İletişim formu için Postgres tabanlı, kalıcı rate-limit sayacı (sabit
// pencere modeli). Autoscale altında birden fazla instance çalışabildiği
// ve process-local bellek instance'lar arasında paylaşılmadığı için
// express-rate-limit'in varsayılan MemoryStore'u yerine bu tablo kullanılır.
//
// Bu tek tablo iki bağımsız limiter katmanı tarafından paylaşılır (bkz.
// api-server/src/lib/rate-limit.ts):
//   - Katman 1 (global devre kesici): identifierHash = sabit bir literal
//     ("contact-global"), kimlikten bağımsız.
//   - Katman 2 (e-posta bazlı, 5/10dk): identifierHash = normalize edilmiş
//     e-postanın HMAC-SHA256 hash'i. Ham/normalize e-posta asla düz
//     saklanmaz; hash gerçek bir anonimleştirme mekanizması DEĞİLDİR,
//     sadece veri minimizasyonu içindir.
// İstemci IP'si / X-Forwarded-For artık bu tabloda hiç kullanılmıyor —
// production'da doğrulandı: Replit'in proxy zinciri farklı ağlardaki iki
// gerçek ziyaretçiyi aynı identifier'a düşürüyordu.
//
// windowStart: bu isteğin düştüğü sabit pencerenin başlangıcı (ör. 10 dk'lık
// dilimlere yuvarlanmış). (identifierHash, windowStart) birlikte tekil bir
// sayaç satırını belirler.
// expiresAt: pencere bitişi — limiter kendi içinde bunun öncesindeki
// satırları fırsatçı biçimde siler, ayrı bir cron/worker gerekmez.
export const rateLimitHitsTable = pgTable(
  "rate_limit_hits",
  {
    identifierHash: text("identifier_hash").notNull(),
    windowStart: timestamp("window_start", { withTimezone: true }).notNull(),
    requestCount: integer("request_count").notNull().default(1),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifierHash, table.windowStart] })],
);

export type RateLimitHit = typeof rateLimitHitsTable.$inferSelect;

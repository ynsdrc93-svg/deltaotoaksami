import { randomUUID } from "node:crypto";
import { Router, type IRouter } from "express";
import { SubmitContactFormBody, type ApiErrorBody } from "@workspace/api-zod";
import { db, contactSubmissionsTable } from "@workspace/db";
import { logger } from "../lib/logger";
import { sendContactNotification } from "../lib/email";
import { globalContactRateLimit, checkEmailRateLimit, setRateLimitHeaders } from "../lib/rate-limit";

const router: IRouter = Router();

// Sıra kasıtlı:
//   1. Katman 1 — global devre kesici (middleware, kimlikten bağımsız)
//   2. Gövde doğrulama (Zod)
//   3. Honeypot — bot ise burada sahte başarı dönülür, aşağıdaki hiçbir
//      adıma (e-posta bazlı limit, DB yazımı) değmez
//   4. Katman 2 — normalize edilmiş e-posta bazlı limit
//   5. Kalıcı kayıt + yanıt + (bloklamayan) e-posta bildirimi
router.post("/contact", globalContactRateLimit, async (req, res, next) => {
  const parsed = SubmitContactFormBody.safeParse(req.body);

  if (!parsed.success) {
    const body: ApiErrorBody = { error: "Girdiğiniz bilgiler eksik veya hatalı." };
    res.status(400).json(body);
    return;
  }

  const { website, ...submission } = parsed.data;

  // Honeypot: gerçek kullanıcılar bu alanı hiç görmez/doldurmaz. Doluysa
  // bot kabul edip DB'ye yazmadan / e-posta atmadan / e-posta bazlı limiti
  // tüketmeden sahte bir başarı dönüyoruz.
  if (website) {
    logger.info("Honeypot alanı dolu, istek sessizce reddedildi");
    res.status(201).json({ id: randomUUID() });
    return;
  }

  try {
    const emailLimit = await checkEmailRateLimit(submission.email);
    setRateLimitHeaders(res, emailLimit);
    if (!emailLimit.allowed) {
      const body: ApiErrorBody = { error: "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin." };
      res.status(429).json(body);
      return;
    }
  } catch (err) {
    next(err);
    return;
  }

  let row: { id: string } | undefined;
  try {
    [row] = await db.insert(contactSubmissionsTable).values(submission).returning({ id: contactSubmissionsTable.id });
  } catch (err) {
    next(err);
    return;
  }

  if (!row) {
    const body: ApiErrorBody = { error: "Talebiniz kaydedilemedi, lütfen tekrar deneyin." };
    res.status(500).json(body);
    return;
  }

  res.status(201).json({ id: row.id });

  await sendContactNotification(submission);
});

export default router;

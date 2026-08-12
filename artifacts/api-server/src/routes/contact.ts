import { randomUUID } from "node:crypto";
import { Router, type IRouter } from "express";
import { SubmitContactFormBody, type ApiErrorBody } from "@workspace/api-zod";
import { db, contactSubmissionsTable } from "@workspace/db";
import { logger } from "../lib/logger";
import { sendContactNotification } from "../lib/email";
import { contactRateLimit } from "../lib/rate-limit";

const router: IRouter = Router();

router.post("/contact", contactRateLimit, async (req, res, next) => {
  const parsed = SubmitContactFormBody.safeParse(req.body);

  if (!parsed.success) {
    const body: ApiErrorBody = { error: "Girdiğiniz bilgiler eksik veya hatalı." };
    res.status(400).json(body);
    return;
  }

  const { website, ...submission } = parsed.data;

  // Honeypot: gerçek kullanıcılar bu alanı hiç görmez/doldurmaz. Doluysa
  // bot kabul edip DB'ye yazmadan / e-posta atmadan sahte bir başarı dönüyoruz.
  if (website) {
    logger.info("Honeypot alanı dolu, istek sessizce reddedildi");
    res.status(201).json({ id: randomUUID() });
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

import { Resend } from "resend";
import { logger } from "./logger";
import type { ContactSubmissionInput } from "@workspace/api-zod";

const apiKey = process.env["RESEND_API_KEY"];
const resend = apiKey ? new Resend(apiKey) : null;

const notifyTo = process.env["CONTACT_NOTIFY_EMAIL"] ?? "info@deltaoto.com";
const fromAddress = process.env["CONTACT_FROM_EMAIL"] ?? "Delta Oto Web Sitesi <onboarding@resend.dev>";

// RESEND_API_KEY tanımlı değilse (henüz bir e-posta servisi kurulmadıysa)
// formu kırmadan sessizce atlar — form her durumda veritabanına yazmaya devam eder.
export async function sendContactNotification(submission: ContactSubmissionInput): Promise<void> {
  if (!resend) {
    logger.info("RESEND_API_KEY tanımlı değil, e-posta bildirimi atlandı");
    return;
  }

  try {
    await resend.emails.send({
      from: fromAddress,
      to: notifyTo,
      replyTo: submission.email,
      subject: `Yeni iletişim formu talebi — ${submission.konu ?? "Genel"}`,
      text: [
        `Ad Soyad: ${submission.ad}`,
        `Firma: ${submission.firma ?? "-"}`,
        `Telefon: ${submission.telefon ?? "-"}`,
        `E-posta: ${submission.email}`,
        `Konu: ${submission.konu ?? "-"}`,
        "",
        "Mesaj:",
        submission.mesaj,
      ].join("\n"),
    });
  } catch (err) {
    // E-posta gönderimi başarısız olsa bile talep zaten DB'ye yazıldı;
    // kullanıcıya hata döndürmüyoruz, sadece logluyoruz.
    logger.error({ err }, "İletişim formu e-posta bildirimi gönderilemedi");
  }
}

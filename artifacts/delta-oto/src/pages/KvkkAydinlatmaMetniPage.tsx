import { LegalPageLayout } from "@/components/shared/LegalPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { routeFor, useLang } from "@/lib/i18n";

const content = {
  "tr": {
    "title": "İletişim Verileri Hakkında Bilgilendirme",
    "sections": [
      {
        "id": "bolum-1",
        "heading": "Veri sorumlusu",
        "paragraph": "Delta Oto Aksamı San. ve Tic. A.Ş., Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu, Ümraniye / İstanbul."
      },
      {
        "id": "bolum-2",
        "heading": "E-posta ile iletişim",
        "paragraph": "İletişim formu cihazınızda e-posta taslağı hazırlar. Mesajı gönderirseniz adınız, e-posta adresiniz, varsa telefonunuz ve ilettiğiniz mesaj Delta Oto tarafından talebinizi değerlendirmek ve yanıtlamak amacıyla işlenir. Form girdileri site veritabanına kaydedilmez."
      },
      {
        "id": "bolum-3",
        "heading": "Başvuru",
        "paragraph": "Kişisel verilerinizle ilgili sorularınızı veya 6698 sayılı Kanun’un 11. maddesi kapsamındaki taleplerinizi Delta Oto’nun yukarıdaki adresine ya da info@deltaoto.com adresine iletebilirsiniz."
      }
    ]
  },
  "en": {
    "title": "Contact Data Notice",
    "sections": [
      {
        "id": "bolum-1",
        "heading": "Data controller",
        "paragraph": "Delta Oto Aksamı San. ve Tic. A.Ş., Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu, Ümraniye / İstanbul."
      },
      {
        "id": "bolum-2",
        "heading": "Contact by email",
        "paragraph": "The form prepares an email draft on your device. If you send the message, Delta Oto processes your name, email address, phone number if provided, and message to assess and respond to your inquiry. Form inputs are not stored in a website database."
      },
      {
        "id": "bolum-3",
        "heading": "Requests",
        "paragraph": "For questions about your personal data or requests under Article 11 of Turkish Law No. 6698, contact Delta Oto at the address above or at info@deltaoto.com."
      }
    ]
  }
};

export function KvkkAydinlatmaMetniPage() {
  const lang = useLang();
  const { title, sections } = content[lang];
  const tr = lang === "tr";
  useDocumentMeta(`${title} | Delta Oto`, sections[0].paragraph, "noindex, follow");

  return (
    <LegalPageLayout
      eyebrow={tr ? "Site Bilgileri" : "Website Information"}
      title={title}
      lastUpdatedLabel={tr ? "27 Kasım 2026" : "27 November 2026"}
      tocLabel={tr ? "İçindekiler" : "Contents"}
      toc={sections.map(({ id, heading }) => ({ id, label: heading }))}
      relatedLabel={tr ? "İlgili sayfalar" : "Related pages"}
      related={[
        { href: routeFor("privacy", lang), label: lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy" },
        { href: routeFor("cookies", lang), label: lang === "tr" ? "Çerez Politikası" : "Cookie Policy" },
      ]}
    >
      {sections.map(({ id, heading, paragraph }) => (
        <section key={id} id={id}>
          <h2>{heading}</h2>
          <p>{paragraph}</p>
        </section>
      ))}
    </LegalPageLayout>
  );
}

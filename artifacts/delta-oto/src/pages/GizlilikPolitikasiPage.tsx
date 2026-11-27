import { LegalPageLayout } from "@/components/shared/LegalPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { routeFor, useLang } from "@/lib/i18n";

const content = {
  "tr": {
    "title": "Gizlilik Politikası",
    "sections": [
      {
        "id": "bolum-1",
        "heading": "İletişim formu",
        "paragraph": "Formda yazdığınız bilgiler cihazınızda bir e-posta taslağına aktarılır. Bu form bilgilerinizi internet sitesinin sunucusuna göndermez veya veritabanına kaydetmez. Mesajı e-posta uygulamanızdan gönderirseniz bilgiler Delta Oto’nun kurumsal e-posta kutusuna ulaşır ve talebinizi yanıtlamak için kullanılır."
      },
      {
        "id": "bolum-2",
        "heading": "Site ve dış bağlantılar",
        "paragraph": "Bu kurumsal sitede reklam veya ziyaretçi takibi yapılmaz. Parçabul B2B, harita ve sosyal medya gibi bağlantılar sizi ilgili hizmete götürür. Bu hizmetlerin kendi gizlilik koşulları geçerlidir."
      },
      {
        "id": "bolum-3",
        "heading": "İletişim",
        "paragraph": "Sorularınız için info@deltaoto.com adresini kullanabilirsiniz."
      }
    ]
  },
  "en": {
    "title": "Privacy Policy",
    "sections": [
      {
        "id": "bolum-1",
        "heading": "Contact form",
        "paragraph": "The form prepares an email draft on your device. It does not submit your details to the website server or store them in a website database. If you send the message from your email app, Delta Oto receives it in its corporate inbox and uses it to respond to your inquiry."
      },
      {
        "id": "bolum-2",
        "heading": "Website and external links",
        "paragraph": "This corporate site does not use advertising or visitor tracking. Links to services such as Parçabul B2B, maps and social media take you to those services, which have their own privacy terms."
      },
      {
        "id": "bolum-3",
        "heading": "Contact",
        "paragraph": "For questions, email info@deltaoto.com."
      }
    ]
  }
};

export function GizlilikPolitikasiPage() {
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
        { href: routeFor("kvkk", lang), label: lang === "tr" ? "İletişim Verileri" : "Contact Data" },
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

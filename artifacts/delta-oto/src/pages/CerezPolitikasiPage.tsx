import { LegalPageLayout } from "@/components/shared/LegalPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { routeFor, useLang } from "@/lib/i18n";

const content = {
  "tr": {
    "title": "Çerez Politikası",
    "sections": [
      {
        "id": "bolum-1",
        "heading": "Bu sitede çerez kullanımı",
        "paragraph": "Delta Oto’nun kurumsal sitesi reklam, analitik ve ziyaretçi takip çerezleri kullanmaz. Yazı tipleri siteyle birlikte yüklenir."
      },
      {
        "id": "bolum-2",
        "heading": "Dış hizmetler",
        "paragraph": "Parçabul B2B, sosyal medya ve yol tarifi bağlantılarına gittiğinizde ilgili hizmet kendi çerezlerini ve oturum araçlarını uygulayabilir."
      }
    ]
  },
  "en": {
    "title": "Cookie Policy",
    "sections": [
      {
        "id": "bolum-1",
        "heading": "Cookies on this site",
        "paragraph": "Delta Oto’s corporate website does not use advertising, analytics or visitor tracking cookies. Fonts are served with the website."
      },
      {
        "id": "bolum-2",
        "heading": "External services",
        "paragraph": "Parçabul B2B, social media and map providers may use their own cookies or session technologies when you follow links to their services."
      }
    ]
  }
};

export function CerezPolitikasiPage() {
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
        { href: routeFor("kvkk", lang), label: lang === "tr" ? "İletişim Verileri" : "Contact Data" },
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

import React from "react";
import { LegalPageLayout } from "@/components/shared/LegalPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, routeFor, type Lang } from "@/lib/i18n";

// Bkz. KvkkAydinlatmaMetniPage.tsx üstündeki not — üç sayfa (bu, Çerez
// Politikası, KVKK Aydınlatma Metni) aynı arka plana ve aynı "genel taslak"
// kapsamına sahiptir.
const content = {
  tr: {
    meta: {
      title: "Gizlilik Politikası | Delta Oto",
      description: "Delta Oto'nun web sitesi ziyaretçilerinin ve iletişime geçen kullanıcıların kişisel bilgilerini nasıl topladığını ve kullandığını açıklayan gizlilik politikası.",
    },
    eyebrow: "Yasal",
    title: "Gizlilik Politikası",
    lastUpdated: "Son güncelleme: 1 Eylül 2026 · Taslak",
    draftNotice: "Bu sayfa taslak niteliğindedir; yayından önce Delta Oto yetkilileri ve hukuk danışmanı tarafından incelenip onaylanmalıdır.",
    tocLabel: "İçindekiler",
    relatedLabel: "İlgili Belgeler",
    sections: [
      {
        id: "genel",
        heading: "1. Genel Bilgilendirme",
        paragraphs: [
          "Delta Oto olarak, www.deltaoto.com.tr internet sitesini ziyaret eden ve bizimle iletişime geçen kullanıcılarımızın gizliliğine önem veririz. Bu Gizlilik Politikası, hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve verilerinizi nasıl koruduğumuzu açıklar.",
          "Kişisel verilerin işlenmesine ilişkin ayrıntılı hukuki bilgi için KVKK Aydınlatma Metni'ni, çerez kullanımına ilişkin bilgi için Çerez Politikası'nı inceleyebilirsiniz.",
        ],
      },
      {
        id: "topladigimiz-bilgiler",
        heading: "2. Topladığımız Bilgiler",
        paragraphs: [
          "Bu site, yalnızca siz bizimle İletişim sayfasındaki form, e-posta veya telefon aracılığıyla iletişime geçtiğinizde, gönüllü olarak paylaştığınız bilgileri toplar: ad soyad, firma unvanı, telefon, e-posta adresi ve mesajınızın içeriği.",
          "Sitede bir kullanıcı hesabı, üyelik veya giriş sistemi bulunmamaktadır. B2B portalımız (b2b.parcabul.com.tr) ayrı bir sistemdir ve kendi erişim koşullarına tabidir.",
        ],
      },
      {
        id: "kullanim-amaci",
        heading: "3. Bilgilerin Kullanım Amacı",
        paragraphs: [
          "Paylaştığınız bilgiler yalnızca talebinizi ilgili departmana yönlendirmek ve size geri dönüş yapmak amacıyla kullanılır. Bilgileriniz pazarlama amaçlı toplu e-posta veya SMS gönderimi için kullanılmaz; onayınız olmadan üçüncü taraflara satılmaz veya kiralanmaz.",
        ],
      },
      {
        id: "ucuncu-taraflar",
        heading: "4. Üçüncü Taraflarla Paylaşım",
        paragraphs: [
          "Kişisel verileriniz, yasal bir yükümlülük bulunmadıkça üçüncü taraflarla paylaşılmaz.",
          "Sitede yazı tipleri Google Fonts üzerinden yüklenmektedir; bu, tarayıcınızın Google'ın sunucularına bir kaynak isteği göndermesi anlamına gelir. Site bunun dışında herhangi bir analitik, reklam veya izleme aracı kullanmamaktadır.",
        ],
      },
      {
        id: "veri-guvenligi",
        heading: "5. Veri Güvenliği",
        paragraphs: [
          "Bizimle paylaştığınız bilgilerin güvenliğini sağlamak için makul teknik ve idari önlemler alınır. Ancak internet üzerinden hiçbir iletimin %100 güvenli olmadığını hatırlatmak isteriz.",
        ],
      },
      {
        id: "haklariniz",
        heading: "6. Haklarınız",
        paragraphs: [
          "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınızın tam listesi ve bu hakları nasıl kullanabileceğiniz için KVKK Aydınlatma Metni sayfamızı inceleyebilirsiniz.",
        ],
      },
      {
        id: "degisiklikler",
        heading: "7. Politika Değişiklikleri",
        paragraphs: [
          "Bu politika, site içeriği veya yasal gereklilikler değiştikçe güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır.",
        ],
      },
      {
        id: "iletisim",
        heading: "8. Bize Ulaşın",
        paragraphs: [
          "Gizlilik uygulamalarımızla ilgili sorularınız için info@deltaoto.com adresinden veya İletişim sayfamızdaki kanallardan bize ulaşabilirsiniz.",
        ],
      },
    ],
  },
  en: {
    meta: {
      title: "Privacy Policy | Delta Oto",
      description: "Delta Oto's privacy policy explaining how information from website visitors and contacts is collected and used.",
    },
    eyebrow: "Legal",
    title: "Privacy Policy",
    lastUpdated: "Last updated: September 1, 2026 · Draft",
    draftNotice: "This page is a draft. It must be reviewed and approved by Delta Oto and legal counsel before publication.",
    tocLabel: "Contents",
    relatedLabel: "Related Documents",
    sections: [
      {
        id: "genel",
        heading: "1. Overview",
        paragraphs: [
          "At Delta Oto, we take the privacy of visitors to www.deltaoto.com.tr and everyone who contacts us seriously. This Privacy Policy explains what information we collect, how we use it, and how we protect it.",
          "For detailed legal information on the processing of personal data, see our Personal Data Protection Notice (KVKK). For information on cookie use, see our Cookie Policy.",
        ],
      },
      {
        id: "topladigimiz-bilgiler",
        heading: "2. Information We Collect",
        paragraphs: [
          "This site only collects information you voluntarily share when you contact us — through the form on the Contact page, by email, or by phone: full name, company name, phone number, email address, and the content of your message.",
          "The site has no user account, membership, or login system. Our B2B portal (b2b.parcabul.com.tr) is a separate system with its own access terms.",
        ],
      },
      {
        id: "kullanim-amaci",
        heading: "3. How We Use This Information",
        paragraphs: [
          "Information you share is used only to route your request to the relevant department and to respond to you. It is not used for bulk marketing emails or SMS, and it is not sold or rented to third parties without your consent.",
        ],
      },
      {
        id: "ucuncu-taraflar",
        heading: "4. Sharing with Third Parties",
        paragraphs: [
          "Your personal data is not shared with third parties unless legally required.",
          "Fonts on this site are loaded via Google Fonts, meaning your browser sends a resource request directly to Google's servers. Beyond this, the site does not use any analytics, advertising, or tracking tool.",
        ],
      },
      {
        id: "veri-guvenligi",
        heading: "5. Data Security",
        paragraphs: [
          "Reasonable technical and administrative measures are taken to protect the information you share with us. However, no transmission over the internet is ever 100% secure.",
        ],
      },
      {
        id: "haklariniz",
        heading: "6. Your Rights",
        paragraphs: [
          "For the full list of your rights under Turkish Law No. 6698 on the Protection of Personal Data and how to exercise them, see our Personal Data Protection Notice (KVKK).",
        ],
      },
      {
        id: "degisiklikler",
        heading: "7. Changes to This Policy",
        paragraphs: [
          "This policy may be updated as site content or legal requirements change. The current version is always published on this page.",
        ],
      },
      {
        id: "iletisim",
        heading: "8. Contact Us",
        paragraphs: [
          "For questions about our privacy practices, reach us at info@deltaoto.com or through the channels on our Contact page.",
        ],
      },
    ],
  },
} satisfies Record<Lang, any>;

export function GizlilikPolitikasiPage() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description, "noindex, follow");

  return (
    <LegalPageLayout
      eyebrow={t.eyebrow}
      title={t.title}
      lastUpdatedLabel={t.lastUpdated}
      draftNoticeText={t.draftNotice}
      tocLabel={t.tocLabel}
      toc={t.sections.map((s) => ({ id: s.id, label: s.heading }))}
      relatedLabel={t.relatedLabel}
      related={[
        { href: routeFor("kvkk", lang), label: lang === "tr" ? "KVKK Aydınlatma Metni" : "Personal Data Protection Notice (KVKK)" },
        { href: routeFor("cookies", lang), label: lang === "tr" ? "Çerez Politikası" : "Cookie Policy" },
      ]}
    >
      {t.sections.map((s) => (
        <section key={s.id} id={s.id}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </section>
      ))}
    </LegalPageLayout>
  );
}

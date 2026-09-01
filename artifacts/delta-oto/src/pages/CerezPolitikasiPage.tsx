import React from "react";
import { LegalPageLayout } from "@/components/shared/LegalPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, routeFor, type Lang } from "@/lib/i18n";

// Bkz. KvkkAydinlatmaMetniPage.tsx üstündeki not. Bu sayfanın 2. bölümü
// ("Bu Sitede Çerez Kullanımı") bilinçli olarak DÜRÜST: bu oturumda
// document.cookie / analytics / pixel için tüm src/ taranmış, tek sonuç
// aktif kullanılmayan bir shadcn bileşeninde (ui/sidebar.tsx, hiçbir
// sayfada import edilmiyor) bulunmuştur. Yani site GERÇEKTEN çerez
// kullanmıyor — bu sayfa var olmayan bir çerez envanterini uydurmak yerine
// bu gerçeği açıkça yazıyor.
const content = {
  tr: {
    meta: {
      title: "Çerez Politikası | Delta Oto",
      description: "Delta Oto web sitesinin çerez kullanımına ilişkin politikası — sitenin şu an hangi çerezleri kullandığı ve kullanmadığı hakkında bilgi.",
    },
    eyebrow: "Yasal",
    title: "Çerez Politikası",
    lastUpdated: "Son güncelleme: 1 Eylül 2026 · Taslak",
    draftNotice: "Bu sayfa taslak niteliğindedir; yayından önce Delta Oto yetkilileri ve hukuk danışmanı tarafından incelenip onaylanmalıdır.",
    tocLabel: "İçindekiler",
    relatedLabel: "İlgili Belgeler",
    sections: [
      {
        id: "cerez-nedir",
        heading: "1. Çerez Nedir?",
        paragraphs: [
          "Çerezler (cookies), ziyaret ettiğiniz internet siteleri tarafından tarayıcınıza yerleştirilen; tercihlerinizi hatırlamak, oturum bilgisi tutmak veya kullanım istatistiği toplamak gibi amaçlarla kullanılan küçük metin dosyalarıdır.",
        ],
      },
      {
        id: "bu-sitede-kullanim",
        heading: "2. Bu Sitede Çerez Kullanımı",
        paragraphs: [
          "Bu site (www.deltaoto.com.tr) şu an itibarıyla herhangi bir analitik, reklam, izleme veya tercih çerezi kullanmamaktadır.",
          "Sitede yalnızca Google Fonts üzerinden yazı tipi dosyaları yüklenmektedir; bu, tarayıcınızın ilgili kaynağa doğrudan bir istek göndermesidir ve bu site tarafından çerez yerleştirilmesini gerektirmez.",
        ],
      },
      {
        id: "cerez-turleri",
        heading: "3. Çerez Türleri Hakkında Genel Bilgi",
        paragraphs: [
          "Sitemizde ileride analitik veya işlevsel amaçlı çerezler kullanılmaya başlanması hâlinde, bu bölüm güncellenerek kullanılan çerez türleri (zorunlu, işlevsel, analitik, pazarlama) ve her birinin amacı ayrıntılı biçimde açıklanacak; gerekli görülmesi hâlinde bir onay mekanizması eklenecektir.",
        ],
      },
      {
        id: "tarayici-ayarlari",
        heading: "4. Tarayıcı Ayarları",
        paragraphs: [
          "Kullandığınız tarayıcının ayarları üzerinden çerezleri her zaman engelleyebilir veya silebilirsiniz. Bu site şu an çerez kullanmadığından, bu ayarların site deneyiminizi etkilemesi beklenmez.",
        ],
      },
      {
        id: "guncellemeler",
        heading: "5. Politika Güncellemeleri",
        paragraphs: [
          "Bu politika, sitede çerez kullanımı başladığında veya ilgili mevzuat değiştiğinde güncellenecektir. Güncel sürüm her zaman bu sayfada yayınlanır.",
        ],
      },
    ],
  },
  en: {
    meta: {
      title: "Cookie Policy | Delta Oto",
      description: "Delta Oto's cookie policy — information on which cookies this website currently does and does not use.",
    },
    eyebrow: "Legal",
    title: "Cookie Policy",
    lastUpdated: "Last updated: September 1, 2026 · Draft",
    draftNotice: "This page is a draft. It must be reviewed and approved by Delta Oto and legal counsel before publication.",
    tocLabel: "Contents",
    relatedLabel: "Related Documents",
    sections: [
      {
        id: "cerez-nedir",
        heading: "1. What Is a Cookie?",
        paragraphs: [
          "Cookies are small text files placed on your browser by the websites you visit, typically used to remember your preferences, maintain session information, or collect usage statistics.",
        ],
      },
      {
        id: "bu-sitede-kullanim",
        heading: "2. Cookie Use on This Site",
        paragraphs: [
          "This site (www.deltaoto.com.tr) does not currently use any analytics, advertising, tracking, or preference cookies.",
          "The site loads font files through Google Fonts, meaning your browser sends a request directly to that resource. This does not require this site to place any cookie.",
        ],
      },
      {
        id: "cerez-turleri",
        heading: "3. General Information on Cookie Types",
        paragraphs: [
          "If this site begins using analytics or functional cookies in the future, this section will be updated to describe the cookie types in use (strictly necessary, functional, analytics, marketing) and the purpose of each, along with a consent mechanism if required.",
        ],
      },
      {
        id: "tarayici-ayarlari",
        heading: "4. Browser Settings",
        paragraphs: [
          "You can always block or delete cookies through your browser's settings. Since this site does not currently use cookies, these settings are not expected to affect your experience here.",
        ],
      },
      {
        id: "guncellemeler",
        heading: "5. Updates to This Policy",
        paragraphs: [
          "This policy will be updated when cookie use begins on the site or when applicable law changes. The current version is always published on this page.",
        ],
      },
    ],
  },
} satisfies Record<Lang, any>;

export function CerezPolitikasiPage() {
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
        { href: routeFor("privacy", lang), label: lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy" },
        { href: routeFor("kvkk", lang), label: lang === "tr" ? "KVKK Aydınlatma Metni" : "Personal Data Protection Notice (KVKK)" },
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

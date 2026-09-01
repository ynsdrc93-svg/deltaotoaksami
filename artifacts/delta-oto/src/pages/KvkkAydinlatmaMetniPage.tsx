import React from "react";
import { LegalPageLayout } from "@/components/shared/LegalPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, routeFor, type Lang } from "@/lib/i18n";

// Bu üç sayfa (KVKK/Gizlilik/Çerez) "çerezler vs. tasarım/içerik... hâlâ hiçbir
// şey yok" geri bildirimine karşılık eklendi. Kapsam ve içerik kaynağı
// kullanıcıyla AskUserQuestion üzerinden netleştirildi: (1) üç ayrı sayfa —
// Gizlilik Politikası, Çerez Politikası, KVKK Aydınlatma Metni; interaktif
// bir çerez onay banner'ı İSTENMEDİ (site zaten hiç çerez kullanmıyor, bkz.
// Çerez Politikası içeriği — canlı kodda document.cookie/analytics/pixel
// araması sıfır sonuç verdi). (2) İçerik "genel taslak" olarak yazıldı —
// şirket unvanı/adres/e-posta/telefon SİTEDE ZATEN DOĞRULANMIŞ gerçek
// bilgilerdir (footer, İletişim sayfası ile birebir); ancak MERSİS/vergi
// no gibi bu oturumda doğrulanamayan alanlar UYDURULMADI, sayfa içinde
// açıkça "taslak" ibaresiyle ve LegalPageLayout'taki uyarı kutusuyla
// işaretlendi. Yayından önce hukuki inceleme gerekir.
const content = {
  tr: {
    meta: {
      title: "KVKK Aydınlatma Metni | Delta Oto",
      description: "Delta Oto'nun 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
    },
    eyebrow: "Yasal",
    title: "KVKK Aydınlatma Metni",
    lastUpdated: "Son güncelleme: 1 Eylül 2026 · Taslak",
    draftNotice: "Bu sayfa taslak niteliğindedir; yayından önce Delta Oto yetkilileri ve hukuk danışmanı tarafından incelenip onaylanmalıdır. Aşağıdaki metin, 6698 sayılı KVKK'ya genel uyum amacıyla hazırlanmış bir başlangıç taslağıdır.",
    tocLabel: "İçindekiler",
    relatedLabel: "İlgili Belgeler",
    sections: [
      {
        id: "veri-sorumlusu",
        heading: "1. Veri Sorumlusunun Kimliği",
        paragraphs: [
          "6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca, bu internet sitesi (www.deltaoto.com.tr) üzerinden elde edilen kişisel verileriniz bakımından veri sorumlusu, Delta Oto markası altında faaliyet gösteren Delta Oto Aksamı San. ve Tic. A.Ş.'dir (\"Delta Oto\" veya \"Şirket\").",
          "İletişim adresi: Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul. E-posta: info@deltaoto.com. Telefon: 0216 526 64 64 / 0216 526 33 44.",
        ],
        list: ["Taslak notu: Şirketin MERSİS ve vergi kimlik numarası bu taslakta yer almamaktadır; yayın öncesi eklenmesi gerekir."],
      },
      {
        id: "islenen-veriler",
        heading: "2. İşlenen Kişisel Veriler ve Toplama Yöntemi",
        paragraphs: [
          "Bu site üzerinden, yalnızca sizin bizimle iletişime geçmeyi tercih etmeniz hâlinde, aşağıdaki kategorilerde kişisel veri işlenebilir: kimlik bilgisi (ad soyad), iletişim bilgisi (telefon, e-posta), varsa firma unvanı ve tarafımıza ilettiğiniz mesaj içeriği.",
          "Bu veriler; İletişim sayfasındaki talep formu, e-posta yazışmaları veya telefon görüşmesi yoluyla doğrudan sizin tarafınızdan sağlanır. Site, ziyaretçi davranışını izleyen bir analitik veya reklam aracı kullanmamaktadır (bkz. Çerez Politikası).",
        ],
      },
      {
        id: "amaclar",
        heading: "3. Kişisel Verilerin İşlenme Amaçları",
        paragraphs: ["Kişisel verileriniz aşağıdaki amaçlarla sınırlı olarak işlenir:"],
        list: [
          "Tarafınızca iletilen talep, soru veya şikâyetlerin değerlendirilmesi ve yanıtlanması",
          "Satış, sipariş ve B2B portal erişim süreçlerinin yürütülmesi",
          "Kurumsal iletişim ve müşteri ilişkileri süreçlerinin yönetilmesi",
          "Yasal yükümlülüklerin yerine getirilmesi",
        ],
      },
      {
        id: "hukuki-sebep",
        heading: "4. Hukuki Sebep",
        paragraphs: [
          "Kişisel verileriniz, KVKK'nın 5. maddesinin 2. fıkrasında belirtilen \"bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olma\", \"hukuki yükümlülüğün yerine getirilmesi\" ve \"ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati\" hukuki sebeplerine dayanılarak işlenmektedir. Bu sebeplerin yeterli olmadığı durumlarda açık rızanız ayrıca talep edilir.",
        ],
      },
      {
        id: "aktarim",
        heading: "5. Kişisel Verilerin Aktarılması",
        paragraphs: [
          "Kişisel verileriniz, yasal bir zorunluluk bulunmadıkça üçüncü kişilerle paylaşılmaz. Talebinizin niteliğine göre, yalnızca ilgili Delta Oto departmanı (Satış, B2B Portal Desteği, İnsan Kaynakları veya Genel Kurumsal) ile paylaşılabilir. Yetkili kamu kurum ve kuruluşlarının talebi hâlinde, ilgili mevzuat kapsamında gerekli paylaşımlar yapılabilir.",
        ],
      },
      {
        id: "saklama",
        heading: "6. Saklama Süresi",
        paragraphs: [
          "Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı süreleri saklı kalmak kaydıyla saklanır; bu sürenin sonunda silinir, yok edilir veya anonim hâle getirilir.",
        ],
      },
      {
        id: "haklariniz",
        heading: "7. KVKK Madde 11 Kapsamındaki Haklarınız",
        paragraphs: ["KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:"],
        list: [
          "Kişisel verinizin işlenip işlenmediğini öğrenme",
          "İşlenmişse buna ilişkin bilgi talep etme",
          "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
          "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme",
          "Eksik veya yanlış işlenmişse düzeltilmesini isteme",
          "KVKK'nın 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
          "Düzeltme, silme ve yok edilme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme",
          "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
          "Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
        ],
      },
      {
        id: "basvuru",
        heading: "8. Başvuru Yöntemi",
        paragraphs: [
          "Yukarıdaki haklarınızı kullanmak için talebinizi info@deltaoto.com adresine e-posta yoluyla veya yazılı olarak Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul adresine iletebilirsiniz. Talebiniz, niteliğine göre en geç otuz gün içinde ücretsiz olarak sonuçlandırılır.",
        ],
      },
    ],
  },
  en: {
    meta: {
      title: "Personal Data Protection Notice (KVKK) | Delta Oto",
      description: "Delta Oto's disclosure notice on the processing of personal data under Turkish Law No. 6698 on the Protection of Personal Data (KVKK).",
    },
    eyebrow: "Legal",
    title: "Personal Data Protection Notice (KVKK)",
    lastUpdated: "Last updated: September 1, 2026 · Draft",
    draftNotice: "This page is a draft. It must be reviewed and approved by Delta Oto and legal counsel before publication. The text below is a starting draft prepared for general compliance with Turkish Law No. 6698 (\"KVKK\").",
    tocLabel: "Contents",
    relatedLabel: "Related Documents",
    sections: [
      {
        id: "veri-sorumlusu",
        heading: "1. Identity of the Data Controller",
        paragraphs: [
          "Under Law No. 6698 on the Protection of Personal Data (\"KVKK\"), the data controller for personal data obtained through this website (www.deltaoto.com.tr) is Delta Oto Aksamı San. ve Tic. A.Ş., operating under the Delta Oto brand (\"Delta Oto\" or \"the Company\").",
          "Contact address: Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul, Türkiye. Email: info@deltaoto.com. Phone: 0216 526 64 64 / 0216 526 33 44.",
        ],
        list: ["Draft note: the Company's MERSİS and tax identification numbers are not included in this draft and must be added before publication."],
      },
      {
        id: "islenen-veriler",
        heading: "2. Personal Data Processed and How It Is Collected",
        paragraphs: [
          "Through this site, personal data may be processed only if you choose to contact us, and may include: identity information (full name), contact information (phone, email), company name where applicable, and the content of any message you send us.",
          "This data is provided directly by you, through the contact form on the Contact page, email correspondence, or phone calls. The site does not use any analytics or advertising tool that tracks visitor behavior (see the Cookie Policy).",
        ],
      },
      {
        id: "amaclar",
        heading: "3. Purposes of Processing",
        paragraphs: ["Your personal data is processed strictly for the following purposes:"],
        list: [
          "Evaluating and responding to the requests, questions or complaints you submit",
          "Carrying out sales, order and B2B portal access processes",
          "Managing corporate communication and customer relationship processes",
          "Fulfilling legal obligations",
        ],
      },
      {
        id: "hukuki-sebep",
        heading: "4. Legal Basis",
        paragraphs: [
          "Your personal data is processed on the legal grounds set out in Article 5(2) of the KVKK: being directly related to the establishment or performance of a contract, fulfillment of a legal obligation, and the data controller's legitimate interest provided this does not harm your fundamental rights and freedoms. Where these grounds are insufficient, your explicit consent is separately requested.",
        ],
      },
      {
        id: "aktarim",
        heading: "5. Transfer of Personal Data",
        paragraphs: [
          "Your personal data is not shared with third parties unless legally required. Depending on the nature of your request, it may be shared only with the relevant Delta Oto department (Sales, B2B Portal Support, Human Resources, or General Corporate Affairs). Where required by competent public authorities, necessary disclosures may be made under applicable law.",
        ],
      },
      {
        id: "saklama",
        heading: "6. Retention Period",
        paragraphs: [
          "Your personal data is retained for as long as required by the purpose of processing, subject to the statutory limitation periods set out in applicable law, and is deleted, destroyed, or anonymized thereafter.",
        ],
      },
      {
        id: "haklariniz",
        heading: "7. Your Rights Under Article 11 of the KVKK",
        paragraphs: ["Under Article 11 of the KVKK, you have the right to:"],
        list: [
          "Learn whether your personal data is being processed",
          "Request information if it has been processed",
          "Learn the purpose of processing and whether it is used in accordance with that purpose",
          "Know the third parties to whom it is transferred, domestically or abroad",
          "Request correction if it has been processed incompletely or incorrectly",
          "Request its deletion or destruction within the conditions set out in Article 7 of the KVKK",
          "Request that correction, deletion, or destruction be notified to third parties to whom the data was transferred",
          "Object to a result that is to your detriment arising from analysis of the processed data exclusively through automated systems",
          "Request compensation for damages arising from unlawful processing",
        ],
      },
      {
        id: "basvuru",
        heading: "8. How to Submit a Request",
        paragraphs: [
          "To exercise the rights above, you may send your request by email to info@deltaoto.com or in writing to Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul, Türkiye. Requests are concluded free of charge within thirty days at the latest, depending on their nature.",
        ],
      },
    ],
  },
} satisfies Record<Lang, any>;

export function KvkkAydinlatmaMetniPage() {
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
        { href: routeFor("cookies", lang), label: lang === "tr" ? "Çerez Politikası" : "Cookie Policy" },
      ]}
    >
      {t.sections.map((s) => (
        <section key={s.id} id={s.id}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {s.list && (
            <ul>
              {s.list.map((li, i) => <li key={i}>{li}</li>)}
            </ul>
          )}
        </section>
      ))}
    </LegalPageLayout>
  );
}

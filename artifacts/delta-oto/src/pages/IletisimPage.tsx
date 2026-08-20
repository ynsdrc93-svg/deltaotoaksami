import React, { useState } from "react";
import { MapPin, Phone, Mail, Globe, Clock, ChevronRight, ArrowRight, Users, Package, MonitorSmartphone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { RepresentativeFinderModal } from "@/components/shared/RepresentativeFinderModal";
import { submitContactForm } from "@workspace/api-client-react";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, type Lang } from "@/lib/i18n";

// Departman kartlarının ikonları veriye değil DİZİN'e (index) bağlı — metin
// içeriği content.tr/content.en'de, ikon eşlemesi burada sabit (bkz.
// TedarikciPage.tsx'teki ADVANTAGE_ICONS ile aynı desen).
const DEPT_ICONS = [Package, MonitorSmartphone, Users, Globe];

// Merkez Adres kartındaki satırların ikonları — aynı index-eşleme deseni.
const ADDRESS_ICONS = [MapPin, Phone, Mail, Globe];

// LOKASYON SIRASI: Gebze, İzmir, Ümraniye — bu proje geçişinde (Content/UX
// Pass 01) bilingual hale getirilen diğer sayfayla (LandingPage.tsx, hem
// hubs dizisi hem de gövde metni "Gebze, İzmir ve Ümraniye" sırasını
// kullanıyor) tutarlılık için BİLEREK bu sırada. Ümraniye'nin merkez/HQ
// olduğu; sıradan bağımsız, telefon alanının dolu olmasıyla tetiklenen
// isPrimary rozetiyle (bkz. "Santral Hattı"/"Switchboard" etiketi) zaten
// ayrıca vurgulanıyor — sırada son olması bu vurguyu değiştirmiyor.
// OperasyonPage.tsx ve SpartPage.tsx henüz bu pass'te bilingual hale
// getirilmedi (hâlâ salt Türkçe, eski Ümraniye-önce sırasını koruyorlar) —
// bu bir tutarsızlık değil, henüz sırası gelmemiş ayrı bir iş kalemi.

const content = {
  tr: {
    meta: {
      title: "Bize Ulaşın — Satış, B2B ve Kurumsal İletişim | Delta Oto",
      description: "Delta Oto ile iletişime geçin: satış ve sipariş, B2B portal desteği, insan kaynakları ve kurumsal iletişim için doğrudan hat, e-posta, iletişim formu ve üç operasyon merkezimizin adresleri.",
    },
    hero: {
      eyebrow: "İletişim Kanallarımız · Ümraniye, İstanbul",
      title: ["BİZE", "ULAŞIN"],
      body: "Ürün sorguları, B2B portal erişimi veya kurumsal iletişim için size özel kanaldan ulaşın.",
      findRep: "Bölge Temsilcinizi Bulun",
      contactForm: "İletişim Formu",
      b2bPortal: "B2B Portal",
    },
    quickPaths: {
      eyebrow: "Nasıl Yardımcı Olabiliriz?",
      heading: "İki Hızlı Yol",
      general: {
        title: "Genel İletişim",
        desc: "Satış, B2B portal, İK ve kurumsal iletişim ekiplerimize doğrudan ulaşın.",
        link: "Departmanları görün",
      },
      findRep: {
        title: "Bölge Temsilcinizi Bulun",
        desc: "81 il, 7 bölge — haritadan ilinizi seçin, size özel temsilciyi görün.",
        link: "Haritayı Açın",
      },
    },
    departments: {
      eyebrow: "Departman İletişim",
      heading: "Doğru Birime Ulaşın",
      body: "Her talep türü için ilgili departman doğrudan burada.",
      list: [
        {
          dept: "Satış & Sipariş",
          lines: ["0216 526 64 64"],
          info: "Ürün sorguları, sipariş ve fiyat bilgisi",
          hours: "Pazartesi – Cumartesi, 08:30 – 18:00",
          email: "satis@deltaoto.com",
        },
        {
          dept: "B2B Portal Desteği",
          lines: ["0216 526 33 44"],
          info: "Portal erişimi, kullanıcı yetkilendirme, teknik destek",
          hours: "Pazartesi – Cuma, 09:00 – 17:30",
          email: "b2b@deltaoto.com",
        },
        {
          dept: "İnsan Kaynakları",
          lines: [] as string[],
          info: "Kariyer başvuruları ve staj talepleri",
          hours: "Pazartesi – Cuma, 09:00 – 17:00",
          email: "ik@deltaoto.com",
        },
        {
          dept: "Genel Kurumsal",
          lines: [] as string[],
          info: "Kurumsal iletişim ve genel talepler",
          hours: "Pazartesi – Cuma, 08:30 – 17:30",
          email: "info@deltaoto.com",
        },
      ],
    },
    addressCard: {
      eyebrow: "Merkez Adres",
      heading: "Genel İletişim",
      items: [
        { label: "Merkez Ofis", lines: ["Barbaros Cd. Beyit Sk. No:17,", "Yukarı Dudullu — Ümraniye / İstanbul"] as (string | { text: string; href: string })[] },
        { label: "Santral", lines: ["0216 526 64 64 / 0216 526 33 44", "Satış: Pzt–Cmt 08:30–18:00 · B2B: Pzt–Cuma 09:00–17:30"] as (string | { text: string; href: string })[] },
        { label: "Kurumsal E-posta", lines: ["info@deltaoto.com", "b2b@deltaoto.com"] as (string | { text: string; href: string })[] },
        { label: "Dijital Kanallar", lines: ["www.deltaoto.com.tr", { text: "b2b.parcabul.com.tr (B2B Portal)", href: "https://b2b.parcabul.com.tr/login.aspx" }] as (string | { text: string; href: string })[] },
      ],
    },
    form: {
      eyebrow: "Talep Formu",
      heading: "Bize Yazın",
      body: "Talebiniz en kısa sürede ilgili birime yönlendirilecektir.",
      honeypotLabel: "Web siteniz",
      fields: {
        ad: { label: "Ad Soyad", ph: "Adınız ve soyadınız" },
        firma: { label: "Firma Ünvanı", ph: "Firma adı" },
        telefon: { label: "Telefon", ph: "+90 5XX XXX XX XX" },
        email: { label: "Kurumsal E-posta", ph: "ornek@firma.com.tr" },
      },
      subjectLabel: "Talep Konusu",
      subjectPlaceholder: "Konu seçiniz",
      subjects: [
        "Sipariş ve Teslimat Süreci",
        "Stok ve Ürün Bilgisi",
        "B2B Portal Erişimi ve Yetkilendirme",
        "Genel Kurumsal Talep",
        "Kurumsal İletişim",
        "İnsan Kaynakları & Kariyer",
        "Diğer",
      ],
      messageLabel: "Mesajınız",
      messagePlaceholder: "Talebinizi ve konuyu kısaca açıklayınız...",
      successMsg: "Talebiniz alındı, en kısa sürede size dönüş yapacağız.",
      errorMsg: "Talebiniz gönderilemedi. Lütfen tekrar deneyin ya da bizi doğrudan arayın.",
      submitting: "Gönderiliyor...",
      submit: "Talep Gönderin",
      privacy: "Verileriniz yalnızca talebinizi karşılamak amacıyla kullanılır.",
    },
    locations: {
      eyebrow: "Operasyon Merkezlerimiz",
      heading: "Bizi Nerede Bulabilirsiniz",
      body: "Gebze, İzmir ve Ümraniye'deki üç merkezimizden Türkiye'nin tamamına hizmet veriyoruz.",
      primaryBadge: "Santral Hattı",
      list: [
        {
          name: "Gebze Deposu",
          city: "Gebze, Kocaeli",
          address: "Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli",
          phone: null as string | null,
          type: "Kocaeli",
        },
        {
          name: "Opar Ege Bölge Operasyonu",
          city: "Kemalpaşa, İzmir",
          address: "Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir",
          phone: null as string | null,
          type: "Ege Bölge",
        },
        {
          name: "Merkez Ofis & Depo",
          city: "Ümraniye, İstanbul",
          address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul",
          phone: "0216 526 64 64 / 0216 526 33 44" as string | null,
          type: "Merkez",
        },
      ],
    },
  },
  en: {
    meta: {
      title: "Contact Us — Sales, B2B and Corporate Contacts | Delta Oto",
      description: "Get in touch with Delta Oto: direct lines and email for sales and orders, B2B portal support, human resources and corporate affairs, plus a contact form and the addresses of our three operations centers.",
    },
    hero: {
      eyebrow: "Contact Channels · Ümraniye, İstanbul",
      title: ["CONTACT", "US"],
      body: "Reach us through the right channel for product inquiries, B2B portal access, or corporate communications.",
      findRep: "Find Your Regional Representative",
      contactForm: "Contact Form",
      b2bPortal: "B2B Portal",
    },
    quickPaths: {
      eyebrow: "How Can We Help?",
      heading: "Two Quick Paths",
      general: {
        title: "General Contact",
        desc: "Reach our sales, B2B portal, HR and corporate communications teams directly.",
        link: "View departments",
      },
      findRep: {
        title: "Find Your Regional Representative",
        desc: "81 provinces, 7 regions — pick your province on the map to see your dedicated representative.",
        link: "Open the Map",
      },
    },
    departments: {
      eyebrow: "Department Contacts",
      heading: "Reach the Right Department",
      body: "The right department for every type of request, listed directly here.",
      list: [
        {
          dept: "Sales & Orders",
          lines: ["0216 526 64 64"],
          info: "Product inquiries, orders and pricing information",
          hours: "Monday – Saturday, 08:30 – 18:00",
          email: "satis@deltaoto.com",
        },
        {
          dept: "B2B Portal Support",
          lines: ["0216 526 33 44"],
          info: "Portal access, user authorization, technical support",
          hours: "Monday – Friday, 09:00 – 17:30",
          email: "b2b@deltaoto.com",
        },
        {
          dept: "Human Resources",
          lines: [] as string[],
          info: "Job applications and internship requests",
          hours: "Monday – Friday, 09:00 – 17:00",
          email: "ik@deltaoto.com",
        },
        {
          dept: "Corporate Affairs",
          lines: [] as string[],
          info: "Corporate communications and general inquiries",
          hours: "Monday – Friday, 08:30 – 17:30",
          email: "info@deltaoto.com",
        },
      ],
    },
    addressCard: {
      eyebrow: "Head Office Address",
      heading: "General Contact",
      items: [
        { label: "Head Office", lines: ["Barbaros Cd. Beyit Sk. No:17,", "Yukarı Dudullu — Ümraniye / İstanbul"] as (string | { text: string; href: string })[] },
        { label: "Switchboard", lines: ["0216 526 64 64 / 0216 526 33 44", "Sales: Mon–Sat 08:30–18:00 · B2B: Mon–Fri 09:00–17:30"] as (string | { text: string; href: string })[] },
        { label: "Corporate Email", lines: ["info@deltaoto.com", "b2b@deltaoto.com"] as (string | { text: string; href: string })[] },
        { label: "Digital Channels", lines: ["www.deltaoto.com.tr", { text: "b2b.parcabul.com.tr (B2B Portal)", href: "https://b2b.parcabul.com.tr/login.aspx" }] as (string | { text: string; href: string })[] },
      ],
    },
    form: {
      eyebrow: "Request Form",
      heading: "Write to Us",
      body: "Your request will be routed to the right team as soon as possible.",
      honeypotLabel: "Your website",
      fields: {
        ad: { label: "Full Name", ph: "Your first and last name" },
        firma: { label: "Company Name", ph: "Company name" },
        telefon: { label: "Phone", ph: "+90 5XX XXX XX XX" },
        email: { label: "Corporate Email", ph: "example@company.com.tr" },
      },
      subjectLabel: "Subject",
      subjectPlaceholder: "Select a subject",
      subjects: [
        "Order & Delivery Process",
        "Stock & Product Information",
        "B2B Portal Access & Authorization",
        "General Corporate Inquiry",
        "Corporate Communications",
        "Human Resources & Careers",
        "Other",
      ],
      messageLabel: "Your Message",
      messagePlaceholder: "Briefly describe your request and subject...",
      successMsg: "Your request has been received. We'll get back to you as soon as possible.",
      errorMsg: "Your request couldn't be sent. Please try again or call us directly.",
      submitting: "Sending...",
      submit: "Send Request",
      privacy: "Your information is used only to process your request.",
    },
    locations: {
      eyebrow: "Our Operations Centers",
      heading: "Where to Find Us",
      body: "From our three centers in Gebze, İzmir and Ümraniye, we serve the whole of Türkiye.",
      primaryBadge: "Switchboard",
      list: [
        {
          name: "Gebze Warehouse",
          city: "Gebze, Kocaeli",
          address: "Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli",
          phone: null as string | null,
          type: "Kocaeli",
        },
        {
          name: "Opar Aegean Regional Operation",
          city: "Kemalpaşa, İzmir",
          address: "Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir",
          phone: null as string | null,
          type: "Aegean Region",
        },
        {
          name: "Head Office & Warehouse",
          city: "Ümraniye, İstanbul",
          address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul",
          phone: "0216 526 64 64 / 0216 526 33 44" as string | null,
          type: "Head Office",
        },
      ],
    },
  },
} satisfies Record<Lang, any>;

const EMPTY_FORM = { ad: "", firma: "", telefon: "", email: "", konu: "", mesaj: "", website: "" };

export function IletisimPage() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [repModalOpen, setRepModalOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitContactForm(form);
      setForm(EMPTY_FORM);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO — gerçek yerel fotoğraf (935×1400 dikey kaynak; bkz.
          public/images/iletisim-hero-bosphorus.jpg). Kaynak dikey olduğu için
          tek asset + breakpoint'e göre farklı object-position kullanılıyor.
          "Daha fazla fotoğraf görünsün" isteği CSS scale() ile SAHTE bir
          zoom-out olarak değil, hero'nun kendi yüksekliğini artırarak
          çözüldü — object-cover matematiğinde (bkz. object-cover crop
          hesapları) sabit genişlikte bir full-bleed hero'da yükseklik
          artışı, kaynağın DAHA FAZLA dikey aralığını görünür kılar, boş
          kenar/letterbox riski olmadan:
          - mobilde (~390px genişlik) container zaten kaynağa çok yakındı
            (~%96 yükseklik görünüyordu) — 560→590px ile pratikte tam kare
            (~%100 yükseklik, ~%97 genişlik) görünür oldu; buradan alınacak
            görünür-alan kazancı zaten sınırlıydı.
          - masaüstünde (1440px genişlik) önceki 560px yükseklikte görünen
            dikey şerit ~%26 idi; 650px'e çıkarınca ~%30'a yükseliyor
            (~%15 daha fazla kaynak alanı) — köprü kulesi/güverte/kablo
            örgüsü hâlâ net, sadece etrafında biraz daha bağlam (gökyüzü/
            güverte) görünüyor.

          GÖRÜNTÜ KALİTESİ NOTU (Faz 2 incelemesi): "hafif pikselli/yumuşak"
          görünümün kök nedeni araştırıldı — kaynak 935×1400px, bu hero
          masaüstünde ~1440px+ genişliğe object-cover ile geriliyor (≈1.54x
          upscale, retina ekranlarda fiilen ~3x). Bu saf bir çözünürlük
          yetersizliği; CSS/object-position tarafında telafi edilebilecek bir
          render hatası DEĞİL. Gerçek, daha yüksek çözünürlüklü bir Boğaz
          Köprüsü fotoğrafı için: (1) genel web araması, (2) bu fotoğrafın
          kaynağı olan fotoğrafçının GitHub portföyündeki TÜM diğer
          Istanbul-2023 görselleri (dahil ham "DSC_*" dosyalar) tek tek
          kontrol edildi — o depodaki hiçbir dosya 1400px uzun kenarı
          aşmıyor ve hiçbiri bu kadar iyi bir köprü kompozisyonu sunmuyor.
          Wikimedia Commons'ta 2048×1161'lik daha büyük bir sürüm MEVCUT
          ama bu sandbox'ın ağ politikası wikimedia.org'u (ve Unsplash/
          Pexels'i) tamamen engelliyor — daha önce bu oturumda doğrulandı.
          Sahte keskinleştirme filtresi/upscale eklenmedi (istenmiyor).
          Sonuç: gerçek, ulaşılabilir daha iyi bir alternatif yok — aynı
          asset ve crop bilinçli olarak KORUNDU. Kurumsal lisanslı/daha
          yüksek çözünürlüklü bir çekim sağlanırsa asset swap teknik olarak
          basit (tek dosya + aynı object-position mantığı). */}
      <section className="relative min-h-[590px] sm:min-h-[650px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/iletisim-hero-bosphorus.jpg"
            alt=""
            className="w-full h-full object-cover object-[center_45%] sm:object-[center_34%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/70 to-[#0e1016]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-20" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-16 lg:py-24">
          <div className="flex items-center gap-3 mb-5 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">{t.hero.eyebrow}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-5">
            <span className="do-hero-line">{t.hero.title[0]}</span><br />
            <span className="text-[#7d9bea]">{t.hero.title[1]}</span>
          </h1>
          <p className="text-[17px] text-gray-300 max-w-xl font-light leading-[1.8] mb-6 lg:mb-9">
            {t.hero.body}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setRepModalOpen(true)}
              className="bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-md text-[14px] sm:text-base transition-all duration-200 flex items-center gap-2 sm:gap-2.5 shadow-[0_0_32px_rgba(27,58,143,0.3)] hover:shadow-[0_0_48px_rgba(27,58,143,0.45)]"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              {t.hero.findRep}
            </button>
            <a
              href="#iletisim-formu"
              className="text-gray-200 hover:text-white active:scale-[0.98] text-[14px] sm:text-base font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-6 sm:px-8 py-3.5 sm:py-4 rounded-md transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              {t.hero.contactForm}
            </a>
            <a
              href="https://b2b.parcabul.com.tr/login.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-gray-200 hover:text-white active:scale-[0.98] text-[14px] sm:text-base font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-6 sm:px-8 py-3.5 sm:py-4 rounded-md transition-all duration-200"
            >
              {t.hero.b2bPortal}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* NASIL YARDIMCI OLABİLİRİZ — iki net yol: genel iletişim / temsilci bul.
          Eski ince "Temsilcilerimiz sayfasına gidin" banner'ının yerine geçti —
          artık ayrı bir sayfaya değil, aynı sayfa içindeki modalı açıyor. */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.quickPaths.eyebrow}</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">{t.quickPaths.heading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <a href="#genel-iletisim" className="do-card group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#1B3A8F]/[0.08] flex items-center justify-center mb-5 group-hover:bg-[#1B3A8F] transition-colors">
                <Users className="w-6 h-6 text-[#1B3A8F] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{t.quickPaths.general.title}</h3>
              <p className="text-slate-500 text-[13.5px] leading-relaxed mb-5 flex-1">{t.quickPaths.general.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1B3A8F]">
                {t.quickPaths.general.link} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
            <button type="button" onClick={() => setRepModalOpen(true)} className="do-card group bg-[#1B3A8F] rounded-2xl p-8 flex flex-col text-left">
              <div className="w-12 h-12 rounded-xl bg-white/[0.12] flex items-center justify-center mb-5 group-hover:bg-white transition-colors">
                <MapPin className="w-6 h-6 text-white group-hover:text-[#1B3A8F] transition-colors" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{t.quickPaths.findRep.title}</h3>
              <p className="text-white/60 text-[13.5px] leading-relaxed mb-5 flex-1">{t.quickPaths.findRep.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white">
                {t.quickPaths.findRep.link} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* DEPARTMAN KİŞİ BİLGİLERİ — light */}
      <section id="genel-iletisim" className="scroll-mt-24 bg-[#f8fafc] py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.departments.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.departments.heading}</h2>
            <p className="text-slate-500 mt-3 text-[15px]">{t.departments.body}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.departments.list.map(({ dept, lines, info, hours, email }, i) => {
              const Icon = DEPT_ICONS[i];
              return (
                <div key={dept} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all flex flex-col">
                  <div className="w-10 h-10 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#1B3A8F]" />
                  </div>
                  <h3 className="text-[14px] font-bold text-slate-900 mb-2 leading-snug">{dept}</h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed mb-3 flex-1">{info}</p>
                  <div className="border-t border-slate-100 pt-3 space-y-1.5">
                    {lines.map((l: string) => (
                      <div key={l} className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#1B3A8F] shrink-0" />
                        <span className="text-[13px] font-semibold text-slate-800">{l}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#1B3A8F] shrink-0" />
                      <a href={`mailto:${email}`} className="text-[13px] text-[#1B3A8F] hover:underline font-medium">{email}</a>
                    </div>
                    <div className="flex items-start gap-2 mt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-[11.5px] text-slate-500 leading-snug">{hours}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM + ADRES — light. Lokasyonlar'dan önceye taşındı: footer'dan hemen önceki bölüm
          proje kuralı gereği navy olmalı, bu da yalnızca burada zaten navy olan Lokasyonlar'ı
          en sona almakla (bkz. CLAUDE.md §9.2) en az müdahaleyle sağlanıyor. */}
      <section id="iletisim-formu" className="scroll-mt-24 bg-[#f8fafc] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12 items-start">

          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.addressCard.eyebrow}</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">{t.addressCard.heading}</h2>
            </div>
            {/* Tek, yoğun özet kart — Departman İletişim'deki ikon-kart ızgarasının bir
                tekrarı olmasın diye satır bölmeli tek kart olarak tasarlandı. Doğal
                (zorlanmamış) yükseklik: içerik ne kadar yer kaplıyorsa o kadar —
                önceki versiyon sağdaki form kartıyla eşit yükseklik için satırlar
                arasına yapay boşluk ekliyordu, dağınık görünüyordu. */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
              {t.addressCard.items.map(({ label, lines }, i) => {
                const Icon = ADDRESS_ICONS[i];
                return (
                  <div key={label} className="flex items-center gap-3.5 px-5 py-4 hover:bg-slate-50 transition-colors">
                    <div className="shrink-0 w-8 h-8 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#1B3A8F]" />
                    </div>
                    <div>
                      <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">{label}</div>
                      {lines.map((l, idx) => {
                        const text = typeof l === "string" ? l : l.text;
                        const href = typeof l === "string" ? undefined : l.href;
                        const cls = `text-[12.5px] leading-snug ${idx === 0 ? "text-slate-900 font-semibold" : "text-slate-500"}`;
                        return href ? (
                          <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:text-[#1B3A8F] hover:underline transition-colors`}>{text}</a>
                        ) : (
                          <div key={idx} className={cls}>{text}</div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.form.eyebrow}</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">{t.form.heading}</h2>
              <p className="text-slate-500 mt-2 text-[14px]">{t.form.body}</p>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Honeypot — gerçek kullanıcılar görmez/doldurmaz; ekran okuyucudan da
                  aria-hidden ile tamamen gizli. Doluysa backend isteği bot kabul eder.
                  sr-only negatif offset kullanmadığı için sayfa genişliğini etkilemez. */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">{t.form.honeypotLabel}</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  maxLength={200}
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { id: "ad", label: t.form.fields.ad.label, ph: t.form.fields.ad.ph, type: "text", required: true, maxLength: 100 },
                  { id: "firma", label: t.form.fields.firma.label, ph: t.form.fields.firma.ph, type: "text", required: false, maxLength: 150 },
                  { id: "telefon", label: t.form.fields.telefon.label, ph: t.form.fields.telefon.ph, type: "tel", required: false, maxLength: 40 },
                  { id: "email", label: t.form.fields.email.label, ph: t.form.fields.email.ph, type: "email", required: true, maxLength: 254 },
                ].map(({ id, label, ph, type, required, maxLength }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
                    <input
                      id={id}
                      type={type}
                      required={required}
                      maxLength={maxLength}
                      placeholder={ph}
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition"
                      value={(form as Record<string, string>)[id]}
                      onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <label htmlFor="konu" className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t.form.subjectLabel}</label>
                <select
                  id="konu"
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-700 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition bg-white"
                  value={form.konu}
                  onChange={e => setForm(f => ({ ...f, konu: e.target.value }))}
                >
                  <option value="">{t.form.subjectPlaceholder}</option>
                  {t.form.subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="mt-5">
                <label htmlFor="mesaj" className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t.form.messageLabel}</label>
                <textarea
                  id="mesaj"
                  rows={4}
                  maxLength={5000}
                  placeholder={t.form.messagePlaceholder}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition resize-none"
                  value={form.mesaj}
                  onChange={e => setForm(f => ({ ...f, mesaj: e.target.value }))}
                />
              </div>
              {status === "success" && (
                <div className="mt-6 flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[13.5px] font-medium rounded-lg px-4 py-3.5">
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  {t.form.successMsg}
                </div>
              )}
              {status === "error" && (
                <div className="mt-6 flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-[13.5px] font-medium rounded-lg px-4 py-3.5">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                  {t.form.errorMsg}
                </div>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-6 w-full bg-[#1B3A8F] hover:bg-[#2547B5] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 group shadow-[0_4px_16px_rgba(27,58,143,0.2)]"
              >
                {status === "submitting" ? (
                  <>{t.form.submitting} <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>{t.form.submit} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                )}
              </button>
              <p className="text-center text-[12px] text-slate-400 mt-4">{t.form.privacy}</p>
            </form>
          </div>
        </div>
      </section>

      {/* LOKASYONLAR — navy. Footer'dan hemen önceki bölüm olduğu için proje kuralı
          gereği navy (#1B3A8F) kalıyor; sırası Form+Adres ile değiştirildi. Liste
          sırası: Gebze, İzmir, Ümraniye (bkz. dosya başındaki not). */}
      <section className="bg-[#1B3A8F] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">{t.locations.eyebrow}</span>
            <h2 className="text-3xl font-black tracking-tight">{t.locations.heading}</h2>
            <p className="text-white/55 mt-3 text-[15px]">{t.locations.body}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {t.locations.list.map((loc) => {
              const isPrimary = Boolean(loc.phone);
              return (
                <div
                  key={loc.name}
                  className={`do-card bg-white/[0.08] border rounded-xl p-7 ${isPrimary ? "border-[#7d9bea]/40" : "border-white/[0.12]"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#7d9bea]">{loc.type}</span>
                      <h3 className="text-[16px] font-bold mt-1">{loc.name}</h3>
                      <p className="text-white/70 text-[12px] mt-0.5">{loc.city}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0 mt-1">
                      {isPrimary && (
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#0e1016] bg-[#7d9bea] rounded-full px-2.5 py-1">
                          {t.locations.primaryBadge}
                        </span>
                      )}
                      <MapPin className="w-5 h-5 text-[#7d9bea]" />
                    </div>
                  </div>
                  <p className="text-white/65 text-[13px] leading-relaxed mb-3">{loc.address}</p>
                  {loc.phone && (
                    <div className="flex items-center gap-2 mt-2">
                      <Phone className="w-3.5 h-3.5 text-[#7d9bea] shrink-0" />
                      <span className="text-[13px] text-white/80">{loc.phone}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />

      <RepresentativeFinderModal open={repModalOpen} onClose={() => setRepModalOpen(false)} lang={lang} />
    </div>
  );
}

import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, Handshake, Globe, Menu, X } from "lucide-react";
import { useReveal, useScrolled, useCounter, useScrollProgress, useParallax, useEscapeKey } from "../hooks/use-motion";
import { useDocumentMeta } from "../hooks/use-document-meta";
import { SiteFooter } from "./shared/SiteFooter";
import { BrandLogo } from "./shared/BrandLogo";
import { LanguageSwitcher } from "./shared/LanguageSwitcher";
import { CLASSIFIED_BRANDS, type Brand } from "../lib/brands";
import { useLang, routeFor, type Lang, type RouteKey } from "../lib/i18n";

// turkey-map-react, LandingPage'in JS entry chunk'ının en büyük tek
// katkısıydı (bkz. LogisticsMap.tsx üst notu) — bu yüzden ayrı bir dosyaya
// taşınıp lazy-import edildi. LandingPage kendisi hâlâ eager kalıyor
// (yalnızca harita alt-bileşeni erteleniyor).
const LogisticsMap = lazy(() => import("./LogisticsMap").then((m) => ({ default: m.LogisticsMap })));

// Şerit, Tedarikçiler sayfasıyla AYNI kaynağı (CLASSIFIED_BRANDS — Excel'in
// 61 markası) kullanır; Excel'de olmayan markalar burada da gösterilmez
// (bkz. brands.ts UNCLASSIFIED_BRANDS notu). hasVerifiedLogo:false olan
// markalar gerçek logo yerine tipografik yer tutucuyla akar — bkz.
// shared/BrandLogo.tsx (size="strip"). 3 satıra, sabit dilim yerine
// dinamik olarak eşit bölünür; böylece marka sayısı Excel güncellendiğinde
// satırlar otomatik dengelenir. NOT: "100+ marka" (görünür genel iddia,
// bkz. content.partners.body) ile buradaki 61 GERÇEK sınıflandırılmış logo
// sayısı FARKLI kasıtlı şeyler — biri kamuya açık portföy iddiası, diğeri
// şerit/duvarda gösterilen doğrulanmış logo veri kümesi (bkz. Content/UX
// Pass 01 görev tanımı §5).
const STRIP_BRANDS = CLASSIFIED_BRANDS;
const STRIP_ROWS = 3;
const STRIP_CHUNK = Math.ceil(STRIP_BRANDS.length / STRIP_ROWS);
const BRAND_STRIPS = Array.from({ length: STRIP_ROWS }, (_, i) =>
  STRIP_BRANDS.slice(i * STRIP_CHUNK, (i + 1) * STRIP_CHUNK),
).filter((strip) => strip.length > 0);

function CountUp({ target, suffix = "", duration = 1600, className = "" }: { target: number; suffix?: string; duration?: number; className?: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const count = useCounter(target, duration, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <span ref={ref} className={className}>{started ? count : 0}{suffix}</span>;
}

const NAV_LINKS: { key: RouteKey; label: Record<Lang, string> }[] = [
  { key: "about", label: { tr: "Hakkımızda", en: "About Us" } },
  { key: "partners", label: { tr: "İş Ortaklarımız", en: "Partners" } },
  { key: "operations", label: { tr: "Operasyon ve Lojistik", en: "Operations & Logistics" } },
  { key: "careers", label: { tr: "Kariyer", en: "Careers" } },
  { key: "contact", label: { tr: "İletişim", en: "Contact" } },
];

// Tüm sayfa metni — TR kök/varsayılan dil, EN /en altında. Sayfa bileşenleri
// tekrarlanmıyor (bkz. görev talimatı §2); bunun yerine tek JSX ağacı bu
// objeden dile göre okuyor (const t = content[lang]).
const content = {
  tr: {
    meta: {
      title: "Delta Oto — Otomotiv Yedek Parça Distribütörü | Kuruluş 1976",
      description: "Delta Oto, 1976'dan bu yana 100+ marka ile Türkiye genelinde binek ve hafif ticari araç yedek parça dağıtımı, geniş ürün portföyü ve güçlü lojistik altyapısı sunar. Groupauto üyesi, 81 il dağıtım ağı.",
    },
    tickerItems: ["100+ Marka", "81 İl Dağıtım", "Kuruluş 1976", "GROUPAUTO Üyesi", "Opar Ege Bölge Bayiliği", "Ümraniye Merkez", "Binek & Hafif Ticari", "3 Operasyon Merkezi"],
    hero: {
      eyebrow: "Kuruluş 1976 · Delta Oto",
      titleLine1: "50 YILDIR OTOMOTİV AFTERMARKET'İN",
      titleLine2: "KESİNTİSİZ GÜCÜ",
      body: "Binek ve hafif ticari araç yedek parça pazarında, bağımsız yenileme sektörünü güçlü lojistik altyapımız ve küresel tedarik ağımızla yönlendiriyoruz.",
      ctaContact: "Bize Ulaşın",
      ctaB2B: "B2B Portal",
    },
    metrics: {
      eyebrow: "Rakamlarla Güç",
      brands: "Marka",
      provinces: "İl",
      founded: "Kuruluş",
      body: "1976'dan bu yana otomotiv yedek parça dağıtımında istikrarlı bir güç.",
    },
    partnership: {
      eyebrow: "Stratejik İş Birlikleri",
      headline: "Güçlü Bağlantılar. Yerel Uzmanlık.",
      intro: "Delta Oto; GROUPAUTO International üyeliği ve Opar Ege Bölge Bayiliği ile güçlü iş birliklerini, stok ve dağıtım kabiliyetiyle Türkiye pazarında somut değere dönüştürür.",
      groupauto: {
        eyebrow: "Global Ağ",
        title: "GROUPAUTO International",
        fact: "40+ Ülke · 71 Referans Tedarikçi",
        body: "GROUPAUTO International üyeliğimiz; sektörel bilgi paylaşımı, güçlü iş bağlantıları ve uluslararası aftermarket perspektifiyle Delta Oto'nun iş ortaklıklarını destekler.",
      },
      opar: {
        eyebrow: "Bölgesel Ortaklık",
        title: "Opar",
        fact: "Ege Bölgesi",
        body: "Ege Bölge Bayiliğimiz; Opar'ın marka gücünü Delta Oto'nun bölgesel stok, saha ve dağıtım kabiliyetiyle buluşturur.",
      },
    },
    logistics: {
      eyebrow: "Lojistik Altyapı",
      titleLine1: "Üç Operasyon Merkezi.",
      titleLine2: "Türkiye Genelinde Güçlü Dağıtım.",
      body: "Gebze, İzmir ve Ümraniye'deki operasyon merkezlerimizden Türkiye genelinde planlı, hızlı ve güvenilir dağıtım sağlıyoruz. 100'den fazla markayı güçlü stok yapımız ve düzenli sevkiyat operasyonumuzla müşterilerimize ulaştırıyoruz.",
      hubs: [{ label: "Gebze", plate: 41 }, { label: "İzmir", plate: 35 }, { label: "Ümraniye", plate: 34 }],
      cards: [
        { title: "Her İş Günü Sevkiyat", desc: "Hafta içi her gün düzenli yükleme. Cumartesi sevkiyat kapasitesiyle hizmet sürekliliği korunur." },
        { title: "Aynı Gün Sevk", desc: "14:00'a kadar iletilen siparişler, stokta olan ürünler için aynı gün yola çıkar." },
        { title: "Derin Stok", desc: "50.000'i aşkın aktif SKU ile talep edilen ürünün büyük bölümü hazır stoktan karşılanır." },
        { title: "Türkiye Geneli Dağıtım", desc: "Gebze, İzmir ve Ümraniye operasyon merkezlerinden Türkiye genelinde planlı sevkiyat." },
      ],
    },
    partners: {
      eyebrow: "Yerli ve Global Marka Portföyü",
      title: "İş Ortaklarımız",
      body: "Global ve yerli üreticilerden oluşan 100+ markalık portföyümüz, güçlü stok yapımız ve yaygın dağıtım operasyonumuzla Türkiye genelinde müşterilerimizle buluşuyor.",
      cta: "Tüm iş ortaklarımızı inceleyin",
    },
    agenda: {
      eyebrow: "Gündem & Vizyon",
      titleA: "Sahadaki",
      titleB: "Gelişmeler",
      body: "Sektördeki gelişmeleri ve Delta Oto'nun sahaya yansıyan adımlarını buradan takip edebilirsiniz.",
      card1: {
        tag1: "Mayıs 2026", tag2: "Yeni Operasyon",
        title: "Opar Ege Bölge Bayiliği Operasyonu Başladı",
        body: "Mayıs 2026 itibarıyla Opar Ege Bölge Bayiliği operasyonunu devralarak Ege bölgesindeki tedarik ağımızı doğrudan genişlettik. Bu adımla birlikte bölgeye yönelik ürün çeşitliliğimiz ve teslimat kapasitemiz önemli ölçüde güçlendi.",
      },
      card2: {
        tag1: "2025 · Dubai", tag2: "Uluslararası Zirve",
        title: "GROUPAUTO International Dubai O2O Tedarikçi Günleri 2025",
        body: "Dubai'de düzenlenen GROUPAUTO International O2O Tedarikçi Günleri'nde Türkiye'yi ve Delta Oto'yu temsil ettik. 35'ten fazla global üreticiyle gerçekleştirilen görüşmelerde tedarik portföyümüzü ve piyasa trendlerini ele aldık.",
      },
    },
    cta: {
      title: "Yedek Parça Siparişleriniz için B2B Portalımız",
      body: "Portalımız üzerinden yedek parça siparişi verebilir, stok ve fiyat bilgilerine ulaşabilirsiniz.",
      contact: "İletişim",
    },
    leaveModal: {
      title: "Siteden ayrılıyorsunuz",
      body: (name: string) => `${name} için Delta Oto sitesinden ayrılıp markanın resmi web sitesine yönlendirileceksiniz.`,
      cancel: "İptal",
      continue: "Devam Et",
    },
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
  },
  en: {
    meta: {
      title: "Delta Oto — Automotive Aftermarket Parts Distributor | Est. 1976",
      description: "Since 1976, Delta Oto has supplied 100+ brands of passenger and light commercial vehicle aftermarket parts across Türkiye, backed by a broad product portfolio and strong logistics infrastructure. GROUPAUTO member, distribution to 81 provinces.",
    },
    tickerItems: ["100+ Brands", "81 Provinces", "Est. 1976", "GROUPAUTO Member", "Opar Aegean Dealership", "Ümraniye HQ", "Passenger & Light Commercial", "3 Operations Centers"],
    hero: {
      eyebrow: "Established 1976 · Delta Oto",
      titleLine1: "50 YEARS OF AUTOMOTIVE AFTERMARKET'S",
      titleLine2: "UNINTERRUPTED STRENGTH",
      body: "In the passenger and light commercial vehicle spare parts market, we guide the independent aftermarket with our strong logistics infrastructure and global supply network.",
      ctaContact: "Contact Us",
      ctaB2B: "B2B Portal",
    },
    metrics: {
      eyebrow: "Power in Numbers",
      brands: "Brands",
      provinces: "Provinces",
      founded: "Established",
      body: "A steady force in automotive spare parts distribution since 1976.",
    },
    partnership: {
      eyebrow: "Strategic Partnerships",
      headline: "Strong Connections. Local Expertise.",
      intro: "Through its GROUPAUTO International membership and Opar Aegean Regional Dealership, Delta Oto combines strong partnerships with deep inventory and nationwide distribution capabilities.",
      groupauto: {
        eyebrow: "Global Network",
        title: "GROUPAUTO International",
        fact: "40+ Countries · 71 Referenced Suppliers",
        body: "Our GROUPAUTO International membership strengthens Delta Oto's partnerships through industry knowledge sharing, established business connections and an international aftermarket perspective.",
      },
      opar: {
        eyebrow: "Regional Partnership",
        title: "Opar",
        fact: "Aegean Region",
        body: "Our Aegean Regional Dealership combines Opar's brand strength with Delta Oto's regional inventory, field presence and distribution capabilities.",
      },
    },
    logistics: {
      eyebrow: "Logistics Infrastructure",
      titleLine1: "Three Operations Centers.",
      titleLine2: "Strong Distribution Across Türkiye.",
      body: "From our operations centers in Gebze, İzmir and Ümraniye, we provide planned, fast and reliable distribution across Türkiye. Our strong inventory structure and regular delivery operations support a portfolio of more than 100 brands.",
      hubs: [{ label: "Gebze", plate: 41 }, { label: "İzmir", plate: 35 }, { label: "Ümraniye", plate: 34 }],
      cards: [
        { title: "Shipping Every Business Day", desc: "Regular loading every weekday, with Saturday shipping capacity for uninterrupted service." },
        { title: "Same-Day Dispatch", desc: "Orders placed before 14:00 ship the same day for items in stock." },
        { title: "Deep Inventory", desc: "With more than 50,000 active SKUs, most orders are fulfilled directly from stock." },
        { title: "Nationwide Distribution", desc: "Planned distribution across Türkiye from our Gebze, İzmir and Ümraniye operations centers." },
      ],
    },
    partners: {
      eyebrow: "Local and Global Brand Portfolio",
      title: "Our Partners",
      body: "Our portfolio of more than 100 global and local brands is supported by strong inventory and nationwide distribution capabilities.",
      cta: "View all our partners",
    },
    agenda: {
      eyebrow: "News & Vision",
      titleA: "Recent",
      titleB: "Developments",
      body: "Follow industry developments and how they translate into action at Delta Oto.",
      card1: {
        tag1: "May 2026", tag2: "New Operation",
        title: "Opar Aegean Regional Dealership Operations Begin",
        body: "As of May 2026, we took over the Opar Aegean Regional Dealership operation, directly expanding our supply network in the Aegean region. This step significantly strengthened our product range and delivery capacity for the region.",
      },
      card2: {
        tag1: "2025 · Dubai", tag2: "International Summit",
        title: "GROUPAUTO International Dubai O2O Supplier Days 2025",
        body: "We represented Türkiye and Delta Oto at the GROUPAUTO International O2O Supplier Days held in Dubai. In meetings with more than 35 global manufacturers, we discussed our supply portfolio and market trends.",
      },
    },
    cta: {
      title: "Your B2B Portal for Spare Parts Orders",
      body: "Place spare parts orders and access stock and pricing information through our portal.",
      contact: "Contact",
    },
    leaveModal: {
      title: "You're leaving this site",
      body: (name: string) => `You'll be redirected from the Delta Oto site to ${name}'s official website.`,
      cancel: "Cancel",
      continue: "Continue",
    },
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
} satisfies Record<Lang, any>;

export function LandingPage() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);
  const ref = useReveal();
  // Çift eşik (90 gir / 20 çık): header'ın kendi yükseklik geçişi scroll
  // pozisyonunu hafifçe kaydırabildiği (scroll anchoring) için tek eşik,
  // sınırda ileri-geri salınıma (jitter) yol açıyordu — bkz. useScrolled.
  const scrolled = useScrolled(90, 20);
  const progress = useScrollProgress();
  const heroParallax = useParallax<HTMLImageElement>(0.12);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEscapeKey(() => setMobileOpen(false), mobileOpen);

  // Mobil marka şeridi dokunma davranışı: bir şeride dokunmak YALNIZCA o
  // şeridi durdurur (diğer şeritler akmaya devam eder), bir markaya
  // dokunmak "siteden ayrılıyorsunuz" onayı ister — onaylanana/iptal
  // edilene kadar o şerit duraklı kalır, kullanıcı kazara siteden ayrılmaz.
  // Masaüstü hover-duraklatma (CSS, do-brand-ticker:hover) bundan tamamen
  // bağımsız çalışmaya devam eder — ikisi hiç çakışmaz.
  const [pausedRow, setPausedRow] = useState<number | null>(null);
  const [confirmBrand, setConfirmBrand] = useState<{ brand: Brand; rowIndex: number } | null>(null);
  const cancelLeaveRef = useRef<HTMLButtonElement>(null);
  useEscapeKey(() => setConfirmBrand(null), confirmBrand !== null);

  // Tedarikçi şeridi (~60 marka logosu) ilk yüklemede hero/font/JS ile
  // bant genişliği için yarışmasın diye görüntü isteği, kullanıcı bölüme
  // yaklaşana kadar ertelenir. rootMargin geniş tutuldu (1200px) — kullanıcı
  // gerçekten şeride ulaştığında logolar zaten hazır olsun. Satır
  // sarmalayıcılarında sabit h-16 (bkz. JSX) sayesinde bağlama öncesi/sonrası
  // yükseklik birebir aynı kalır — CLS sıfırda kalır, iskelet/spinner yok.
  const [tickerReady, setTickerReady] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTickerReady(true); obs.disconnect(); } },
      { rootMargin: "1200px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Türkiye haritası (turkey-map-react) entry chunk'ının en büyük tek
  // katkısıydı (bkz. LogisticsMap.tsx) — aynı ticker deseniyle, kullanıcı
  // Operasyon & Lojistik bölümüne yaklaşana kadar lazy-chunk indirilmiyor.
  // Ticker'a göre daha yukarıda olduğu için rootMargin daha dar (800px) ama
  // yine de kullanıcı gerçekten oraya ulaştığında harita zaten hazır olacak
  // kadar geniş. aspectRatio (JSX'te), harita/overlay SVG'lerin ortak
  // viewBox'ıyla ("0 80 1050 585") birebir eşleşiyor — mount öncesi/sonrası
  // yükseklik aynı kalır, CLS sıfırda kalır.
  const [mapReady, setMapReady] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = mapSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMapReady(true); obs.disconnect(); } },
      { rootMargin: "800px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    document.body.style.overflow = confirmBrand ? "hidden" : "";
    if (confirmBrand) cancelLeaveRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [confirmBrand]);

  return (
    <div className="do-page min-h-screen bg-white text-slate-900 overflow-x-clip">
      {/* SCROLL PROGRESS */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#1B3A8F] via-[#2547B5] to-[#7d9bea]" style={{ width: `${progress * 100}%` }}></div>
      </div>

      {/* TICKER BAR */}
      <div className="bg-[#1B3A8F] py-2 overflow-hidden">
        <div className="do-ticker-inner">
          {[...t.tickerItems, ...t.tickerItems].map((item, i) => (
            <span key={i} aria-hidden={i >= t.tickerItems.length} className="px-8 text-xs font-bold uppercase tracking-[0.2em] text-white/90 flex items-center gap-8">
              {item}
              <span className="w-1 h-1 rounded-full bg-white/40 inline-block"></span>
            </span>
          ))}
        </div>
      </div>

      {/* HEADER (light) */}
      <header
        className="sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200"
        style={{ ...(scrolled ? { background: "rgba(255,255,255,0.98)", borderColor: "rgba(15,23,42,0.1)", boxShadow: "0 4px 24px rgba(15,23,42,0.08)" } : {}) }}
      >
        <div className={`w-full px-6 lg:px-10 xl:px-16 flex items-center justify-between transition-[height] duration-300 ${scrolled ? "h-[59px] sm:h-[68px]" : "h-[88px] sm:h-28"}`}>
          {/* Logo — sabit solda. Mobilde (<sm) ~9-10% küçültüldü + 2px yukarı
              optik düzeltme (logo hafif alçak duruyordu) — sm ve üzeri (masaüstü)
              boyut/hizalama birebir korunuyor. */}
          <Link href={routeFor("home", lang)} className="flex items-center shrink-0">
            <img
              src="/images/delta-oto-logo.webp"
              alt="Delta Oto 50. Yıl"
              width={963}
              height={240}
              className={`w-auto transition-[height] duration-300 -mt-0.5 sm:mt-0 ${scrolled ? "h-9 sm:h-12" : "h-[58px] sm:h-20"}`}
            />
          </Link>

          {/* Sağ grup: nav + dil + SPART/B2B kompakt blok */}
          <div className="flex items-center gap-3 xl:gap-5 shrink-0">
            <nav className="hidden xl:flex items-center gap-4 xl:gap-6 text-[13.5px] font-medium tracking-tight text-slate-600">
              {NAV_LINKS.map(({ key, label }) => (
                <Link key={key} href={routeFor(key, lang)} className="do-nav-link whitespace-nowrap hover:text-[#1B3A8F] transition-colors duration-200">{label[lang]}</Link>
              ))}
            </nav>

            <span className="hidden xl:block w-px h-6 bg-slate-200 shrink-0"></span>

            <div className="hidden xl:block">
              <LanguageSwitcher />
            </div>

            {/* Kompakt SPART/B2B Portal bloğu — bkz. SiteHeader.tsx'teki aynı
                deseni (Desktop Feedback Round §6): üst/alt istiflenmiş,
                tek dış çerçeve, ince ayraç. */}
            <div className="hidden xl:flex flex-col rounded-md border border-slate-200 overflow-hidden shrink-0 w-[108px]">
              <Link href={routeFor("spart", lang)} className="flex items-center justify-center h-7 hover:bg-slate-50 transition-colors">
                <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-4 w-auto block" />
              </Link>
              <div className="h-px bg-slate-200" />
              <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 h-7 bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[10px] font-bold tracking-[0.03em] transition-colors group">
                {t.hero.ctaB2B.toUpperCase()}
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? t.menuClose : t.menuOpen}
              aria-expanded={mobileOpen}
              aria-controls="do-landing-mobile-nav"
              onClick={() => setMobileOpen(o => !o)}
              className="xl:hidden inline-flex items-center justify-center w-11 h-11 -mr-2.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        <div id="do-landing-mobile-nav" className={`do-mobile-panel xl:hidden border-slate-200 ${mobileOpen ? "do-open border-t" : ""}`}>
          <div>
            <nav className="w-full px-6 py-3 flex flex-col">
              {NAV_LINKS.map(({ key, label }) => (
                <Link
                  key={key}
                  href={routeFor(key, lang)}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-[15px] font-medium text-slate-700 hover:text-[#1B3A8F] border-b border-slate-100 last:border-b-0"
                >
                  {label[lang]}
                </Link>
              ))}
              <Link href={routeFor("spart", lang)} onClick={() => setMobileOpen(false)} className="py-3 text-[15px] font-medium text-slate-700 hover:text-[#1B3A8F] flex items-center gap-2">
                SPART
                <img src="/images/spart-logo.png" alt="" className="h-5 w-auto" />
              </Link>
              <div className="py-3 flex items-center justify-between border-t border-slate-100 mt-1 pt-4">
                <span className="text-[13px] font-medium text-slate-500">{lang === "tr" ? "Dil" : "Language"}</span>
                <LanguageSwitcher variant="mobile" />
              </div>
              <a
                href="https://b2b.parcabul.com.tr/login.aspx"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-3 bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white text-[15px] font-semibold px-5 py-3 rounded-md transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                {t.hero.ctaB2B}
                <ArrowRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO (dark) — mobilde min-h-screen yerine diğer sayfalardaki
          kompakt yükseklik (560px); tam ekran yükseklik yalnızca lg+'da
          korunur, böylece başlık+açıklama+CTA'lar ilk mobil ekranda daha
          yukarıda ve görünür oturur.
          Görsel: jenerik/anonim depo fotoğrafı yerine gerçek Delta Oto
          tesisi (delta-oto-depot.jpg — binada "delta50" yazısı ve Groupauto
          rozeti görünür durumda). Operasyon sayfası AYNI kaynağı ama FARKLI
          bir crop ile kullanıyor (bkz. OperasyonPage yorumu): bu container
          lg+'da tam ekran yüksekliğinde (Operasyon'un sabit 560px'inden
          farklı) olduğundan, object-cover matematiği zaten doğal olarak
          farklı bir dilim gösteriyor — mobilde dar-dikey crop tabelayı
          çerçeveler, masaüstünde geniş-kısa crop neredeyse tüm kaynağı
          gösterir. Opaklık/gradyan da tabelanın okunur kalması için bu
          sayfaya özgü hafifçe açıldı (bkz. Operasyon'daki kendi değerleri —
          ikisi de aynı değil). Hero başlığı/kırpma/parallax bu revizyon
          kapsamında BİLİNÇLİ OLARAK değiştirilmedi — yalnızca EN çevirisi
          eklendi (bkz. görev talimatı: "preserve hero layout/copy/crop"). */}
      <section className="relative min-h-[560px] lg:min-h-screen flex items-center overflow-hidden bg-[#0e1016] text-white">
        <div className="absolute inset-0">
          <img
            ref={heroParallax}
            src="/images/delta-oto-depot.webp"
            alt=""
            fetchPriority="high"
            className="w-full h-full object-cover object-[34%_50%] lg:object-[40%_28%] opacity-65 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016]/92 via-[#0e1016]/55 to-[#0e1016]/15"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent"></div>
        </div>
        <div className="do-hero-stripe"></div>
        <div className="absolute inset-0 do-grid-bg opacity-60"></div>
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60"></div>
        <div className="do-beam"></div>

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-14 pb-10 lg:pt-20 lg:pb-32">
          <div className="max-w-4xl">
            <div ref={ref} className="do-reveal flex items-center gap-3 mb-5 lg:mb-8">
              <div className="w-8 h-[2px] bg-[#4d74d6]"></div>
              <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">{t.hero.eyebrow}</span>
            </div>

            <h1
              ref={ref}
              className="do-reveal do-d1 text-[34px] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-black leading-[1.05] sm:leading-[1.0] mb-4 lg:mb-6 tracking-[-0.02em] break-words"
            >
              <span className="do-hero-line">{t.hero.titleLine1}</span>
              <br />
              <span className="text-[#7d9bea]">{t.hero.titleLine2}</span>
            </h1>

            <p
              ref={ref}
              className="do-reveal do-d2 text-[17px] text-gray-300 leading-[1.75] max-w-2xl mb-7 lg:mb-12 font-light"
            >
              {t.hero.body}
            </p>

            <div ref={ref} className="do-reveal do-d3 flex flex-wrap gap-4 items-center">
              <Link to={routeFor("contact", lang)}>
                <button className="bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white font-semibold px-8 py-4 rounded-md text-base transition-all duration-200 flex items-center gap-2.5 group shadow-[0_0_32px_rgba(27,58,143,0.3)] hover:shadow-[0_0_48px_rgba(27,58,143,0.45)]">
                  {t.hero.ctaContact}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white active:scale-[0.98] text-base font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-8 py-4 rounded-md transition-all duration-200">
                {t.hero.ctaB2B}
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white animate-pulse"></div>
        </div>
      </section>

      {/* POWER METRICS (light) — üç bağımsız rakam birimi, kart değil; tipografi ve boşlukla ayrışıyor */}
      <section className="relative bg-[#f4f6f9] border-y border-slate-200 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg-light"></div>
        <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1B3A8F]/40 to-transparent"></div>

        <div ref={ref} className="do-reveal max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B3A8F]/60">{t.metrics.eyebrow}</span>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-0">
            <div className="px-4 sm:px-12">
              <div className="do-metric-num text-7xl md:text-8xl font-black text-slate-900 tabular-nums leading-none">
                <CountUp target={100} suffix="+" />
              </div>
              <div className="mt-3 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-500">{t.metrics.brands}</div>
            </div>
            <div className="px-4 sm:px-12">
              <div className="do-metric-num text-7xl md:text-8xl font-black text-[#1B3A8F] tabular-nums leading-none">
                <CountUp target={81} />
              </div>
              <div className="mt-3 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-500">{t.metrics.provinces}</div>
            </div>
            <div className="px-4 sm:px-12">
              <div className="do-metric-num text-7xl md:text-8xl font-black text-slate-900 tabular-nums leading-none">1976</div>
              <div className="mt-3 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-500">{t.metrics.founded}</div>
            </div>
          </div>

          <p className="mt-12 text-slate-800 text-base sm:text-xl md:text-2xl font-bold tracking-tight sm:whitespace-nowrap">{t.metrics.body}</p>
        </div>
      </section>

      {/* STRATEGIC PARTNERSHIP (navy) — Content/UX Pass 01: eski "bir dev +
          bir küçük kart" hiyerarşisi kaldırıldı. GROUPAUTO International ve
          Opar artık BİREBİR eşit boyutta iki editoryal panel — aynı ikon
          rozeti boyutu, aynı tip ölçeği, aynı boşluk/dolgu, aynı kart
          çerçevesi. Ne resmi bir GROUPAUTO ne de Opar logo asset'i repo'da
          mevcut (araştırıldı, bulunamadı) — bu yüzden iki panel de AYNI
          ikon-rozet dilini kullanıyor; bu, asimetrik bir "biri var biri yok"
          logo sorunu yaşamadan eşitliği doğal olarak garanti ediyor. */}
      <section className="py-20 md:py-28 relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #1B3A8F 0%, #14275c 100%)" }}>
        <div className="absolute inset-0 do-grid-bg opacity-40"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        <div className="do-beam do-beam-delay"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p ref={ref} className="do-reveal text-blue-200 text-xs font-bold uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-blue-300 inline-block"></span>
              {t.partnership.eyebrow}
            </p>
            <h2 ref={ref} className="do-reveal do-d1 do-accent-line-light text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              {t.partnership.headline}
            </h2>
            <p ref={ref} className="do-reveal do-d2 text-[17px] text-blue-100/80 leading-[1.8] font-light">
              {t.partnership.intro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { data: t.partnership.groupauto, Icon: Globe, refClass: "do-reveal do-d1" },
              { data: t.partnership.opar, Icon: Handshake, refClass: "do-reveal do-d2" },
            ].map(({ data, Icon, refClass }) => (
              <div
                key={data.title}
                ref={ref}
                className={`${refClass} relative rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-sm overflow-hidden group p-8 flex flex-col`}
              >
                <div className="do-card-beam"></div>
                <div className="relative z-10 flex items-center justify-between mb-7">
                  <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-[#2547B5] group-hover:border-[#2547B5] group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.25em] text-blue-200/50 uppercase">{data.eyebrow}</span>
                </div>
                <div className="relative z-10 font-bold text-white text-xl leading-tight">{data.title}</div>
                <div className="relative z-10 text-[11px] text-[#7d9bea] mt-1.5 uppercase tracking-[0.2em] font-semibold">{data.fact}</div>
                <p className="relative z-10 text-sm text-blue-100/70 leading-relaxed font-light mt-4">
                  {data.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONS & LOGISTICS (dark) */}
      <section className="relative overflow-hidden bg-[#0e1016] text-white">
        <div className="absolute inset-0 do-grid-bg"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-14">
            <div className="lg:w-[44%] shrink-0">
              <p ref={ref} className="do-reveal text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#4d74d6] inline-block"></span>
                {t.logistics.eyebrow}
              </p>
              <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                {t.logistics.titleLine1}<br />
                <span className="text-[#7d9bea]">{t.logistics.titleLine2}</span>
              </h2>
              <p ref={ref} className="do-reveal do-d2 text-[16px] text-gray-300 leading-[1.85] font-light">
                {t.logistics.body}
              </p>
              <div ref={ref} className="do-reveal do-d3 flex flex-wrap gap-x-6 gap-y-2 mt-8">
                {t.logistics.hubs.map((h) => (
                  <div key={h.plate} className="flex items-center gap-2 text-[13px] text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-[#7d9bea] inline-block"></span>
                    {h.label}
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={(el) => { ref(el); mapSectionRef.current = el; }}
              className="do-reveal do-d2 lg:w-[56%] w-full relative"
              style={{ aspectRatio: "1050 / 585" }}
            >
              {mapReady && (
                <Suspense fallback={null}>
                  <LogisticsMap />
                </Suspense>
              )}
            </div>
          </div>

          <div ref={ref} className="do-reveal do-d3 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.logistics.cards.map((card, i) => (
              <div key={card.title} ref={ref} className={`do-reveal ${i > 0 ? `do-d${i}` : ""} group relative border border-white/10 rounded-xl p-6 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300 cursor-default`}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#4d74d6] mb-4"></div>
                <h3 className="text-[14px] font-bold text-white mb-2 leading-snug">{card.title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İŞ ORTAKLARIMIZ (navy) — 3 şerit, dönüşümlü yönlerde kayan marka logoları.
          Eskiden "Tedarikçilerimiz" — görünür terminoloji güncellendi (bkz.
          görev talimatı §4, §11). Logolar artık orijinal marka renklerinde
          (grayscale kaldırıldı, bkz. shared/BrandLogo.tsx). */}
      <section className="bg-[#1B3A8F] py-20 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0 do-grid-bg opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mb-14">
          <p ref={ref} className="do-reveal text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#7d9bea] inline-block"></span>
            {t.partners.eyebrow}
          </p>
          <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {t.partners.title}
          </h2>
          <p ref={ref} className="do-reveal do-d2 text-white/60 text-sm max-w-xl leading-relaxed">
            {t.partners.body}
          </p>
        </div>

        <div ref={tickerRef} className="relative z-10 flex flex-col gap-5">
          {BRAND_STRIPS.map((strip, rowIndex) => (
            <div
              key={rowIndex}
              className="overflow-hidden h-16"
              onTouchStart={() => setPausedRow(rowIndex)}
              onTouchEnd={() => setPausedRow((r) => (r === rowIndex ? null : r))}
              onTouchCancel={() => setPausedRow((r) => (r === rowIndex ? null : r))}
            >
              {tickerReady && (
                <div
                  className={rowIndex === 1 ? "do-brand-ticker" : "do-brand-ticker-reverse"}
                  style={{ animationPlayState: pausedRow === rowIndex || confirmBrand?.rowIndex === rowIndex ? "paused" : undefined }}
                >
                  {[...strip, ...strip].map((b, i) => {
                    const isDuplicate = i >= strip.length;
                    return (
                      <BrandLogo
                        key={`${b.slug}-${i}`}
                        brand={b}
                        size="strip"
                        hidden={isDuplicate}
                        onNavigateAttempt={(brand) => setConfirmBrand({ brand, rowIndex })}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mt-12 text-center">
          <Link href={routeFor("partners", lang)} className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-[#7d9bea] transition-colors group">
            {t.partners.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* AGENDA & VISION (light) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p ref={ref} className="do-reveal text-[#1B3A8F] text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#1B3A8F] inline-block"></span>
              {t.agenda.eyebrow}
            </p>
            <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              {t.agenda.titleA} <span className="text-[#1B3A8F]">{t.agenda.titleB}</span>
            </h2>
            <p ref={ref} className="do-reveal do-d2 text-slate-600 text-sm max-w-xl leading-relaxed">
              {t.agenda.body}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              ref={ref}
              className="do-reveal do-card bg-[#f4f6f9] border border-slate-200 rounded-xl p-10 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B3A8F]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F] bg-[#1B3A8F]/10 border border-[#1B3A8F]/20 px-2.5 py-1 rounded">{t.agenda.card1.tag1}</span>
                <span className="text-[10px] text-slate-600 uppercase tracking-wider">{t.agenda.card1.tag2}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 leading-snug">
                {t.agenda.card1.title}
              </h3>
              <p className="text-[15px] text-slate-600 leading-[1.8] font-light">
                {t.agenda.card1.body}
              </p>
            </div>

            <div
              ref={ref}
              className="do-reveal do-d2 do-card bg-[#f4f6f9] border border-slate-200 rounded-xl p-10 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B3A8F]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F] bg-[#1B3A8F]/10 border border-[#1B3A8F]/20 px-2.5 py-1 rounded">{t.agenda.card2.tag1}</span>
                <span className="text-[10px] text-slate-600 uppercase tracking-wider">{t.agenda.card2.tag2}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 leading-snug">
                {t.agenda.card2.title}
              </h3>
              <p className="text-[15px] text-slate-600 leading-[1.8] font-light">
                {t.agenda.card2.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND (navy) */}
      <section className="relative py-16 md:py-24 bg-[#1B3A8F] overflow-hidden text-white">
        <div className="absolute inset-0 do-grid-bg opacity-30"></div>
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 ref={ref} className="do-reveal text-3xl md:text-4xl font-black text-white tracking-tight">
              {t.cta.title}
            </h2>
            <p ref={ref} className="do-reveal do-d1 text-white/75 text-base mt-3">
              {t.cta.body}
            </p>
          </div>
          <div ref={ref} className="do-reveal do-d2 flex gap-4 shrink-0">
            <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="bg-white text-[#1B3A8F] font-bold px-8 py-4 rounded-md hover:bg-gray-100 active:scale-[0.98] transition-colors text-sm flex items-center gap-2 group">
              {t.hero.ctaB2B}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link to={routeFor("contact", lang)}>
              <button className="border border-white/30 hover:border-white/60 active:scale-[0.98] text-white font-medium px-8 py-4 rounded-md transition-colors text-sm">
                {t.cta.contact}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* "Siteden ayrılıyorsunuz" onayı — yalnızca dokunmatik cihazda, marka
          şeridindeki bir logoya dokunulduğunda devreye girer (bkz.
          BrandLogo onNavigateAttempt). Masaüstü tıklaması bunu hiç görmez. */}
      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center p-6 transition-opacity duration-200 ${
          confirmBrand ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!confirmBrand}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmBrand(null)} />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.leaveModal.title}
          className={`relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transition-all duration-200 ${
            confirmBrand ? "translate-y-0 scale-100" : "translate-y-2 scale-95"
          }`}
        >
          <h3 className="text-lg font-black text-slate-900 mb-2">{t.leaveModal.title}</h3>
          <p className="text-slate-500 text-[13.5px] leading-relaxed mb-6">
            {confirmBrand ? t.leaveModal.body(confirmBrand.brand.name) : ""}
          </p>
          <div className="flex gap-3">
            <button
              ref={cancelLeaveRef}
              type="button"
              onClick={() => setConfirmBrand(null)}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold text-[13.5px] px-4 py-3 rounded-md hover:bg-slate-50 transition-colors"
            >
              {t.leaveModal.cancel}
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirmBrand?.brand.website) {
                  window.open(confirmBrand.brand.website, "_blank", "noopener,noreferrer");
                }
                setConfirmBrand(null);
              }}
              className="flex-1 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold text-[13.5px] px-4 py-3 rounded-md transition-colors"
            >
              {t.leaveModal.continue}
            </button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

import React from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useCounter, useReveal } from "../hooks/use-motion";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, routeFor, type Lang } from "@/lib/i18n";
import {
  ShieldCheck,
  Gauge,
  Wrench,
  Zap,
  Droplets,
  Settings2,
  ArrowRight,
  CheckCircle2,
  Package,
  TrendingUp,
  Award,
  Ruler,
  FlaskConical,
  Car,
  History,
  MapPin,
  Truck,
  Handshake,
  Users,
} from "lucide-react";

// İkonlar dilden bağımsızdır — TedarikciPage.tsx'teki ADVANTAGE_ICONS
// örüntüsüyle aynı: içerik (başlık/açıklama) content.tr/en'de metin olarak
// tutulur, ikon bileşenleri ayrı, indeks bazlı dizilerde durur ve render
// sırasında eşleştirilir.
const CATEGORY_ICONS = [Gauge, Settings2, Droplets, Zap, Wrench, Package];
const QUALITY_ICONS = [Ruler, FlaskConical, Car, History];
const STORY_PERK_ICONS = [ShieldCheck, TrendingUp, Package, Award, CheckCircle2, Wrench];
const PARTNERSHIP_ICONS = [Package, TrendingUp, Truck, ShieldCheck, Handshake, Users];

// Tüm sayfa metni — TR kök/varsayılan dil, EN /en altında (bkz. TedarikciPage.tsx
// örüntüsü). SPART'ın kendi istatistikleri (800+ Referans, 50+ Araç Markası,
// 2 Yıl Garanti, 3 Depo) Delta'nın genel 100+ marka portföy iddiasından
// AYRIDIR ve rakamları burada DEĞİŞTİRİLMEMİŞTİR — yalnızca etiketler
// çevrilmiştir. Dağıtım Altyapısı depo listesi, proje genelinde standardize
// edilen sıraya (Gebze, İzmir, Ümraniye) göre düzenlenmiştir.
const content = {
  tr: {
    meta: {
      title: "SPART — Orijinal Kalite, Akıllı Fiyat | Delta Oto",
      description: "SPART, Delta Oto'nun özel markasıdır: 800+ referans, 50+ araç markası kapsamı ve 2 yıl garantiyle OEM eşdeğeri kalitede yedek parça sunar.",
    },
    hero: {
      eyebrow: "Delta Oto Özel Markası",
      titleLine1: "ORİJİNAL KALİTE,",
      titleLine2: "AKILLI FİYAT.",
      body: "Delta Oto'nun 50 yıllık aftermarket deneyimiyle geliştirilen SPART; OEM eşdeğeri kaliteyi, bağımsız servis ve bayi ağına rekabetçi fiyatla sunar.",
      ctaCategories: "Ürün Kategorileri",
      ctaContact: "SPART İçin Bize Ulaşın",
    },
    stats: [
      { target: 800, suffix: "+", label: "Aktif Referans" },
      { target: 50, suffix: "+", label: "Araç Markası Kapsama" },
      { target: 2, suffix: " Yıl", label: "Ürün Garantisi" },
      { target: 3, suffix: " Depo", label: "Hızlı Sevkiyat Merkezi" },
    ],
    story: {
      eyebrow: "Marka Hikayesi",
      headingLine1: "Delta Oto Deneyiminin",
      headingLine2: "Damgasını Taşıyan Marka",
      body1: "SPART, 1976'dan bu yana Türkiye aftermarket pazarının içinde büyümüş Delta Oto'nun öz markasıdır. Yıllar içinde edinilen tedarik zinciri bilgisi, kalite standartları ve saha geribildirimlerinin tamamı SPART ürünlerinin tasarım ve üretim süreçlerine aktarılmıştır.",
      body2: "\"Original Replacement\" felsefesi basittir: parça değişimi için orijinal kaliteden taviz vermek zorunda değilsiniz. SPART, araç üreticisinin toleranslarını karşılayacak şekilde geliştirilmiştir.",
      imageAlt: "SPART kalite kontrol",
      badgeValue: "50 Yıl",
      badgeLabel: "Sektör Deneyimi",
      perks: [
        { text: "2 Yıl Ürün Garantisi" },
        { text: "Rekabetçi Bayi Fiyatları" },
        { text: "Hazır Stok, Hızlı Sevkiyat" },
        { text: "Test Edilmiş Ürün Kalitesi" },
        { text: "Ürün ve Teknik Bilgi Desteği" },
        { text: "OEM Eşdeğer Performans" },
      ],
    },
    categories: {
      eyebrow: "Ürün Portföyü",
      heading: "Geniş Kapsam, Tek Marka",
      body: "Binek ve hafif ticari araçların kritik sistemlerini kapsayan SPART katalogu, servisinizin ihtiyaç duyduğu her referansı tek çatı altında sunar.",
      items: [
        { title: "Fren Sistemi", desc: "Balatalar, diskler, kampanalar ve hidrolik bileşenler. OEM toleranslarında üretim.", count: "200+", unit: "referans" },
        { title: "Süspansiyon & Direksiyon", desc: "Amortisörler, rotiller, rot başları, salıncaklar. Sürüş güvenliğinde taviz yok.", count: "150+", unit: "referans" },
        { title: "Motor & Filtreler", desc: "Yağ, hava, yakıt ve polen filtreleri. Motor ömrünü koruyan doğru filtrasyon.", count: "120+", unit: "referans" },
        { title: "Elektrik & Ateşleme", desc: "Bujiler, bobinler, marş motorları, alternatörler. Güvenilir start, kesintisiz güç.", count: "180+", unit: "referans" },
        { title: "Aktarma Organları", desc: "Debriyaj setleri, rot milleri, diferansiyel parçaları. Güç aktarımında dayanıklılık.", count: "90+", unit: "referans" },
        { title: "Soğutma Sistemi", desc: "Radyatörler, su pompaları, termostatlar, V-kayışları. Motorunuzu serin tutun.", count: "80+", unit: "referans" },
      ],
    },
    quality: {
      eyebrow: "Neden SPART?",
      heading: "Kaliteyi Belirleyen Standartlar",
      items: [
        { title: "OEM Toleranslarında Üretim", desc: "Her parça, orijinal üretici spesifikasyonları esas alınarak, boyutsal hassasiyet ve malzeme kalitesinde orijinaline eşdeğer olacak şekilde üretilir." },
        { title: "Kapsamlı Test Süreçleri", desc: "Ürünler, sahaya çıkmadan önce çok aşamalı kalite kontrol süreçlerinden geçirilir." },
        { title: "Geniş Araç Kapsama Alanı", desc: "Binek ve hafif ticari araç pazarındaki başlıca marka ve modelleri kapsayan, sürekli büyüyen bir katalog. Doğru parçayı ilk seferinde bulun." },
        { title: "50 Yıllık Sektör Birikimi", desc: "Delta Oto'nun 50 yıllık aftermarket deneyimi, SPART'ın ürün seçimi ve kalite standartlarının temelidir. Bilgi, fiyattan önce gelir." },
      ],
    },
    distribution: {
      eyebrow: "Dağıtım Ağı",
      heading: "Delta Oto Gücüyle Her Yere Ulaşır",
      body: "SPART ürünleri, Delta Oto'nun Gebze, İzmir ve Ümraniye'deki üç operasyon merkezinden stoklanır ve sevk edilir. Haftanın altı günü çalışan lojistik ağı, son sipariş saatine kadar verilen emirleri aynı gün veya ertesi gün teslim eder.",
      depots: [
        {
          label: "Kocaeli",
          name: "Gebze Deposu",
          city: "Kocaeli",
          address: "Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli",
        },
        {
          label: "Ege Bölge",
          name: "Opar Ege Operasyonu",
          city: "İzmir",
          address: "Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir",
        },
        {
          label: "Merkez",
          name: "Ümraniye Merkez Depo",
          city: "İstanbul",
          address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul",
        },
      ],
      footnote: "Cumartesi operasyonu dahil — hafta sonunu beklemeyin.",
    },
    partnership: {
      eyebrow: "İş Ortaklığı Fırsatı",
      heading: "SPART, Ürünün Ötesinde Bir Ortaklıktır",
      body: "SPART'ı servisinize veya mağazanıza taşımak, yalnızca yeni bir ürün hattı eklemek değildir — Delta Oto'nun 50 yıllık tedarik zinciri deneyimini, lojistik altyapısını ve marka güvencesini de yanınıza almaktır. Aşağıdaki başlıklar, bir SPART iş ortağı olarak elde edeceğiniz somut karşılığı özetliyor.",
      items: [
        { title: "Kanıtlanmış Ürün Gücü", desc: "800+ referans, 50+ araç markası kapsamında sürekli büyüyen bir katalog — raf karmaşası değil, net bir portföy." },
        { title: "Rekabetçi Bayi Fiyatlandırması", desc: "Doğrudan üretici-distribütör ilişkisine dayanan bayi fiyatlandırma yapısı, rekabetçi bir maliyet tabanı sunar." },
        { title: "Operasyonel Destek", desc: "Gebze, İzmir ve Ümraniye'deki 3 depodan aynı gün/ertesi gün sevkiyat altyapısından doğrudan yararlanın." },
        { title: "Marka Güvencesi", desc: "2 yıl ürün garantisi ve OEM toleranslarında üretim; Delta Oto'nun 50 yıllık sektör deneyimiyle şekillenen bir marka güvencesi." },
        { title: "Sürekli Genişleyen Katalog", desc: "Yeni araç modelleriyle sürekli genişleyen bir ürün katalogu yapısı." },
        { title: "Marka İletişim Desteği", desc: "Ürün bilgisi ve teknik konularda, Delta Oto'nun saha deneyimine dayanan bir iletişim ve destek yaklaşımıyla ekibinizin yanındayız." },
      ],
    },
    cta: {
      eyebrow: "SPART Original Replacement",
      heading: "SPART ile Çalışmak İster Misiniz?",
      body: "Delta Oto'nun B2B platformu üzerinden SPART ürünlerine erişin, fiyat ve sipariş bilgilerini inceleyin.",
      ctaPortal: "B2B Portala Giriş",
      ctaContact: "Bize Ulaşın",
    },
  },
  en: {
    meta: {
      title: "SPART — Original Quality, Smart Price | Delta Oto",
      description: "SPART is Delta Oto's own brand: OEM-equivalent quality spare parts with 800+ references, coverage for 50+ vehicle makes and a 2-year warranty.",
    },
    hero: {
      eyebrow: "Delta Oto's Own Brand",
      titleLine1: "ORIGINAL QUALITY,",
      titleLine2: "SMART PRICE.",
      body: "Developed with Delta Oto's 50 years of aftermarket experience, SPART brings OEM-equivalent quality to the independent service and dealer network at a competitive price.",
      ctaCategories: "Product Categories",
      ctaContact: "Contact Us About SPART",
    },
    stats: [
      { target: 800, suffix: "+", label: "Active References" },
      { target: 50, suffix: "+", label: "Vehicle Makes Covered" },
      { target: 2, suffix: " Years", label: "Product Warranty" },
      { target: 3, suffix: " Warehouses", label: "Fast Shipping Centers" },
    ],
    story: {
      eyebrow: "Brand Story",
      headingLine1: "A Brand Built on",
      headingLine2: "Delta Oto's Experience",
      body1: "SPART is Delta Oto's own brand, grown from within the Turkish aftermarket since 1976. The supply chain knowledge, quality standards and field feedback gathered over the years all feed directly into the design and production of SPART products.",
      body2: "The \"Original Replacement\" philosophy is simple: you shouldn't have to compromise on original quality when replacing a part. SPART is engineered to meet the vehicle manufacturer's tolerances.",
      imageAlt: "SPART quality control",
      badgeValue: "50 Years",
      badgeLabel: "Industry Experience",
      perks: [
        { text: "2-Year Product Warranty" },
        { text: "Competitive Dealer Pricing" },
        { text: "Stock on Hand, Fast Shipping" },
        { text: "Tested Product Quality" },
        { text: "Product & Technical Support" },
        { text: "OEM-Equivalent Performance" },
      ],
    },
    categories: {
      eyebrow: "Product Portfolio",
      heading: "Broad Coverage, One Brand",
      body: "Covering the critical systems of passenger and light commercial vehicles, the SPART catalog brings every reference your workshop needs under one roof.",
      items: [
        { title: "Brake System", desc: "Pads, discs, drums and hydraulic components, manufactured to OEM tolerances.", count: "200+", unit: "references" },
        { title: "Suspension & Steering", desc: "Shock absorbers, tie rods, ball joints and control arms — no compromise on driving safety.", count: "150+", unit: "references" },
        { title: "Engine & Filters", desc: "Oil, air, fuel and cabin filters — the right filtration to protect engine life.", count: "120+", unit: "references" },
        { title: "Electrical & Ignition", desc: "Spark plugs, coils, starter motors and alternators, for reliable starts and uninterrupted power.", count: "180+", unit: "references" },
        { title: "Drivetrain Components", desc: "Clutch kits, drive shafts and differential parts, built to last under load.", count: "90+", unit: "references" },
        { title: "Cooling System", desc: "Radiators, water pumps, thermostats and V-belts, to keep your engine running cool.", count: "80+", unit: "references" },
      ],
    },
    quality: {
      eyebrow: "Why SPART?",
      heading: "The Standards Behind the Quality",
      items: [
        { title: "Manufactured to OEM Tolerances", desc: "Every part is manufactured against original manufacturer specifications, matching the original in dimensional precision and material quality." },
        { title: "Comprehensive Testing", desc: "Products go through multi-stage quality control before they reach the field." },
        { title: "Broad Vehicle Coverage", desc: "A continuously growing catalog covering the leading brands and models in the passenger and light commercial vehicle market — find the right part the first time." },
        { title: "50 Years of Industry Expertise", desc: "Delta Oto's 50 years of aftermarket experience underpin SPART's product selection and quality standards — knowledge comes before price." },
      ],
    },
    distribution: {
      eyebrow: "Distribution Network",
      heading: "Nationwide Reach, Powered by Delta Oto",
      body: "SPART products are stocked and shipped from Delta Oto's three operations centers in Gebze, İzmir and Ümraniye. Our logistics network runs six days a week, delivering orders placed before the cutoff time the same day or the next.",
      depots: [
        {
          label: "Kocaeli",
          name: "Gebze Warehouse",
          city: "Kocaeli",
          address: "Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli",
        },
        {
          label: "Aegean Region",
          name: "Opar Aegean Operation",
          city: "İzmir",
          address: "Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir",
        },
        {
          label: "Headquarters",
          name: "Ümraniye Main Warehouse",
          city: "İstanbul",
          address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul",
        },
      ],
      footnote: "Saturday operations included — no need to wait for the weekend.",
    },
    partnership: {
      eyebrow: "Partnership Opportunity",
      heading: "SPART Is a Partnership, Not Just a Product",
      body: "Bringing SPART into your workshop or store isn't just adding a new product line — it means gaining Delta Oto's 50 years of supply chain experience, logistics infrastructure and brand assurance alongside it. The points below summarize the concrete value you gain as a SPART partner.",
      items: [
        { title: "Proven Product Strength", desc: "A continuously growing catalog spanning 800+ references and 50+ vehicle makes — a focused portfolio, not shelf clutter." },
        { title: "Competitive Dealer Pricing", desc: "A dealer pricing structure built on a direct manufacturer-distributor relationship gives you a competitive cost base." },
        { title: "Operational Support", desc: "Benefit directly from same-day/next-day shipping infrastructure across our 3 warehouses in Gebze, İzmir and Ümraniye." },
        { title: "Brand Assurance", desc: "A 2-year product warranty and manufacturing to OEM tolerances — brand assurance shaped by Delta Oto's 50 years of industry experience." },
        { title: "Continuously Expanding Catalog", desc: "A product catalog that keeps growing alongside new vehicle models." },
        { title: "Brand Communication Support", desc: "For product information and technical questions, our team stands behind yours with a support approach grounded in Delta Oto's field experience." },
      ],
    },
    cta: {
      eyebrow: "SPART Original Replacement",
      heading: "Interested in Working with SPART?",
      body: "Access SPART products through Delta Oto's B2B platform and review pricing and order information.",
      ctaPortal: "Log in to B2B Portal",
      ctaContact: "Contact Us",
    },
  },
} satisfies Record<Lang, any>;

/** Stat şeridi sayacı: görünüre girince hedefe sayar; prefers-reduced-motion'da doğrudan hedefe atlar (bkz. HakkimizdaPage StatCard / LandingPage MetricItem, useCounter). */
function StatCount({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const count = useCounter(target, 1600, started);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="text-3xl font-black tracking-tight mb-1 tabular-nums">
        {started ? count : 0}{suffix}
      </div>
      <div className="text-[13px] text-white/65 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

export function SpartPage() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);
  const reveal = useReveal();

  return (
    <div className="do-site bg-white min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[580px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/spart-hero.jpg"
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/35" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-20" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-24">
          <div ref={reveal} className="do-reveal flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">
              {t.hero.eyebrow}
            </span>
          </div>

          <h1 ref={reveal} className="do-reveal do-d1 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6 max-w-2xl">
            <span className="do-hero-line">{t.hero.titleLine1}</span>
            <br />
            <span className="text-[#7d9bea]">{t.hero.titleLine2}</span>
          </h1>
          <p ref={reveal} className="do-reveal do-d2 text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
            {t.hero.body}
          </p>

          <div ref={reveal} className="do-reveal do-d3 flex flex-wrap gap-4">
            <a
              href="#kategoriler"
              className="inline-flex items-center gap-2 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
            >
              {t.hero.ctaCategories}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              href={routeFor("contact", lang)}
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-md transition-colors"
            >
              {t.hero.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      {/* SEPARATOR — breathing room before the stat strip */}
      <div className="relative h-10 md:h-14 bg-[#0e1016] overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#4d74d6]/70 to-transparent" />
      </div>

      {/* STAT BAR */}
      <section className="bg-[#1B3A8F] py-10 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {t.stats.map((s) => (
              <StatCount key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* HAKKINDA */}
      <section className="bg-white py-24 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div ref={reveal} className="do-reveal-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.story.eyebrow}</span>
              <h2 className="text-3xl md:text-4xl font-black mt-3 mb-6 tracking-tight text-slate-900">
                {t.story.headingLine1}<br />{t.story.headingLine2}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                {t.story.body1}
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                {t.story.body2}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {t.story.perks.map((a, i) => {
                  const Icon = STORY_PERK_ICONS[i];
                  return (
                    <div key={a.text} className="flex items-center gap-3">
                      <span className="text-[#1B3A8F] shrink-0"><Icon className="w-5 h-5" /></span>
                      <span className="text-[13.5px] text-slate-700 font-medium">{a.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div ref={reveal} className="do-reveal-right relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="/images/spart-quality.jpg"
                  alt={t.story.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#1B3A8F] text-white rounded-xl p-5 shadow-xl">
                <div className="text-2xl font-black">{t.story.badgeValue}</div>
                <div className="text-[12px] text-white/75 mt-0.5">{t.story.badgeLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORİLER */}
      <section id="kategoriler" className="bg-[#f8fafc] py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.categories.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 tracking-tight text-slate-900">
              {t.categories.heading}
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl">
              {t.categories.body}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.categories.items.map((cat, i) => {
              const Icon = CATEGORY_ICONS[i];
              return (
                <div
                  key={cat.title}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center text-[#1B3A8F] group-hover:bg-[#1B3A8F] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-[#1B3A8F]">{cat.count}</span>
                      <div className="text-[11px] text-slate-500 font-medium">{cat.unit}</div>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{cat.title}</h3>
                  <p className="text-[13.5px] text-slate-500 leading-relaxed">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* KALİTE STANDARTLARı */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">
              {t.quality.eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 tracking-tight">
              {t.quality.heading}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {t.quality.items.map((q, i) => {
              const Icon = QUALITY_ICONS[i];
              return (
                <div
                  key={q.title}
                  className="bg-white/[0.07] border border-white/[0.12] rounded-xl p-7 hover:bg-white/[0.11] transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{q.title}</h3>
                  <p className="text-white/65 text-[14px] leading-relaxed">{q.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DAĞITIM ALTYAPISI */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.distribution.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 mb-6 tracking-tight text-slate-900">
              {t.distribution.heading}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t.distribution.body}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {t.distribution.depots.map((depot, i) => (
              <div key={depot.name} ref={reveal} className={`do-reveal ${i === 1 ? "do-d1" : i === 2 ? "do-d2" : ""} do-card bg-white border border-slate-200 rounded-xl p-7`}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#1B3A8F]/[0.08] border border-[#1B3A8F]/[0.12] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#1B3A8F]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F] bg-[#1B3A8F]/[0.08] px-2.5 py-1 rounded">
                    {depot.label}
                  </span>
                </div>
                <h3 className="text-[17px] font-black text-slate-900 mb-1">{depot.name}</h3>
                <p className="text-slate-500 text-[13px] mb-4">{depot.city}</p>
                <p className="text-slate-500 text-[13px] leading-relaxed border-t border-slate-100 pt-4">{depot.address}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#1B3A8F]/[0.05] border border-[#1B3A8F]/[0.12] rounded-xl px-6 py-4 flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#1B3A8F] shrink-0" />
            <p className="text-[13.5px] text-slate-700">
              {t.distribution.footnote}
            </p>
          </div>
        </div>
      </section>

      {/* İŞ ORTAKLIĞI AVANTAJLARI — light */}
      <section className="bg-[#f8fafc] py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal max-w-2xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.partnership.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 mb-6 tracking-tight text-slate-900">
              {t.partnership.heading}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t.partnership.body}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.partnership.items.map((b, i) => {
              const Icon = PARTNERSHIP_ICONS[i];
              return (
                <div
                  key={b.title}
                  className="do-card bg-white border border-slate-200 rounded-xl p-7 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1B3A8F]/[0.08] flex items-center justify-center text-[#1B3A8F] group-hover:bg-[#1B3A8F] group-hover:text-white transition-colors mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-[13.5px] text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — navy */}
      <section className="relative bg-[#1B3A8F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-20" />
        <div ref={reveal} className="do-reveal max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] mb-6">{t.cta.eyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            {t.cta.heading}
          </h2>
          <p className="text-white/65 max-w-xl mx-auto mb-10 text-[15px] leading-relaxed">
            {t.cta.body}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://b2b.parcabul.com.tr/login.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#1B3A8F] hover:bg-white/90 font-bold px-10 py-4 rounded-md transition-colors group"
            >
              {t.cta.ctaPortal}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              href={routeFor("contact", lang)}
              className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 text-white font-semibold px-10 py-4 rounded-md transition-colors"
            >
              {t.cta.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

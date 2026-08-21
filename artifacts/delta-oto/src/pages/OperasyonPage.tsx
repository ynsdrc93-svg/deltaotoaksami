import React, { useEffect, useRef, useState } from "react";
import { Truck, Shield, Zap, Network, PackageCheck, BarChart3, ChevronRight, Calendar, ArrowRight, Handshake } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useReveal, useCounter } from "../hooks/use-motion";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, type Lang } from "@/lib/i18n";

/** Counts up from 0 once scrolled into view; snaps straight to target under prefers-reduced-motion (see useCounter). Adapted from LandingPage's CountUp. */
function CountUp({ target, suffix = "", duration = 1600, className = "" }: { target: number; suffix?: string; duration?: number; className?: string }) {
  const [started, setStarted] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const count = useCounter(target, duration, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.4 });
    if (spanRef.current) obs.observe(spanRef.current);
    return () => obs.disconnect();
  }, []);
  return <span ref={spanRef} className={className}>{(started ? count : 0).toLocaleString("tr-TR")}{suffix}</span>;
}

// Operasyonel Yetkinlikler ikonları — sıra content.tr/en.capabilities.features ile birebir
// eşleşir (bkz. içerik nesnesi aşağıda). Metinler dile göre değiştiği için content'e taşındı;
// ikon atamaları (yapısal, dilden bağımsız) burada, modül seviyesinde kalıyor.
const CAPABILITY_ICONS = [Truck, Zap, Handshake, Shield, BarChart3, PackageCheck, Network, Shield];

// Operasyonel Yetkinlikler'i iki tematik başlık altında sunmak için features'tan türetilen
// görünüm gruplaması (index referansları) — 8 yetkinliğin içeriği (title/desc) birebir korunur,
// yalnızca sunum kümeleniyor. Grup etiketleri (groupLabels) dile göre content içinde tutulur.
const CAPABILITY_GROUPS: number[][] = [
  [0, 1, 2, 6],
  [3, 4, 5, 7],
];

// Teslimat kartı ikonları — sıra content.tr/en.delivery.cards ile birebir eşleşir.
const DELIVERY_ICONS = [Zap, Truck, Calendar];

const content = {
  tr: {
    meta: {
      title: "Operasyon ve Lojistik — Üç Merkezden 81 İle | Delta Oto",
      description: "Delta Oto'nun Gebze, İzmir ve Ümraniye operasyon merkezlerinden 81 ile ulaşan lojistik altyapısı: aynı gün sevkiyat, WMS destekli depo yönetimi ve güvenilir teslimat ağı.",
    },
    hero: {
      eyebrow: "Lojistik & Operasyon Altyapısı",
      title: ["ÜÇ MERKEZDEN", "81 İLE", "YAYGIN DAĞITIM"],
      body: "Lojistik ağımız; Gebze, İzmir ve Ümraniye'deki operasyon merkezlerimizden 81 ile hızlı, güvenilir ve planlı dağıtım sunar.",
      stats: [
        { target: 3, label: "Operasyon Merkezi", sub: "Gebze · İzmir · Ümraniye" },
        { target: 50000, suffix: "+", label: "SKU", sub: "Sürekli stok derinliği" },
        { value: "18:00", label: "Son Sipariş Saati", sub: "Aynı gün sevkiyat" },
        { target: 81, label: "İl", sub: "Ulusal dağıtım kapsamı" },
      ],
    },
    network: {
      eyebrow: "Altyapı Özeti",
      heading: "Operasyonel Ağ Yapımız",
      body: "Üç operasyon merkezinden yönetilen lojistik ağımız, bölgeden bölgeye değişen teslimat takvimi taahhütleriyle çalışır.",
      stats: [
        { target: 50000, suffix: "+", label: "Aktif SKU", sub: "Sürekli güncellenen stok" },
        { value: "7/24", label: "B2B Erişimi", sub: "Dijital sipariş kanalı" },
        { value: "WMS", label: "Depo Yönetimi", sub: "Yazılım destekli operasyon" },
      ],
    },
    delivery: {
      eyebrow: "Teslimat Taahhüdü",
      heading: "Müşterinize Söz Verebilirsiniz",
      body: "Stok derinliğimiz ve geniş lojistik ağımız; acil ihtiyaçta aynı gün, standart siparişlerde ertesi iş günü teslimatı mümkün kılar. Cumartesi sevkiyat kapasitemizle hafta sonu da yanınızdayız.",
      featuredBadge: "Öne Çıkan",
      cards: [
        {
          title: "Aynı Gün Sevkiyat",
          highlight: "18:00 Son Sipariş Saati",
          desc: "Stokta olan ürünler için 18:00'e kadar iletilen siparişler, sipariş saatine bakılmaksızın aynı gün kargoya verilir. Acil ihtiyaçlarınızda net ve güvenilir bir taahhüt.",
          featured: true,
        },
        {
          title: "Ertesi Gün Teslimat",
          highlight: "İstanbul ve Çevre İller",
          desc: "Standart siparişlerde İstanbul ve yakın il müşterileriniz için ertesi iş günü teslimat hedeflenir. Güvenilir ve öngörülebilir bir deneyim.",
          featured: false,
        },
        {
          title: "Cumartesi Operasyonu",
          highlight: "Hafta Sonu Kesintisiz",
          desc: "Cumartesi günleri de sevkiyat kapasitemiz açıktır. Hafta içi geç saatte gelen siparişler için Cumartesi yükleme seçeneğiyle müşterilerinizi korumuş olursunuz.",
          featured: false,
        },
      ],
    },
    depots: {
      eyebrow: "Operasyon Altyapısı",
      heading: "Türkiye Geneline Güçlü Dağıtım Yapısı",
      body: "Ümraniye, Gebze ve İzmir operasyon noktalarımız, birbirini tamamlayan üç bölgesel odak üzerinden Türkiye geneline düzenli bir dağıtım hattı kurar.",
      centralTag: "Merkez Koordinasyon",
      statTrio: [
        { value: "18:00", label: "Aynı Gün Sevk İçin Son Sipariş" },
        { value: "81", label: "İl Kapsamı" },
        { value: "03", label: "Operasyon Noktası" },
      ],
      items: [
        {
          title: "Gebze Operasyon Noktası",
          city: "Kocaeli",
          plate: "41",
          address: "Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli",
          body: "Doğu Marmara sanayi hattına yakın konumuyla bölgesel stok ve sevkiyat akışını destekler. Kocaeli, Sakarya ve çevre illere hızlı erişim sağlar.",
          central: false,
        },
        {
          title: "İzmir Operasyon Noktası",
          city: "İzmir",
          plate: "35",
          address: "Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir",
          body: "Ege Bölgesi'nin stok ve dağıtım odağıdır. İzmir merkezli saha yapısı, bölgedeki düzenli sevkiyat ve bayi erişimini destekler.",
          central: false,
        },
        {
          title: "Ümraniye Merkez Depo",
          city: "İstanbul",
          plate: "34",
          address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul",
          body: "Delta Oto'nun ana koordinasyon ve merkez depo noktasıdır. İstanbul'dan Türkiye geneline uzanan dağıtım planlaması bu merkez üzerinden yönetilir.",
          central: true,
        },
      ],
    },
    capabilities: {
      eyebrow: "Lojistik Altyapı",
      heading: "Operasyonel Yetkinliklerimiz",
      body: "Her operasyonel süreç, müşteri teslimat deneyimini optimize etmek amacıyla yapılandırılmıştır.",
      groupLabels: ["Dağıtım & Kapsama", "Sistem, Kalite & Güvence"],
      features: [
        { title: "Üç Merkezden Ulusal Dağıtım", desc: "Gebze, İzmir ve Ümraniye'deki operasyon merkezlerimizden Türkiye'nin 81 iline anlaşmalı lojistik partnerleriyle düzenli teslimat gerçekleştiriyoruz." },
        { title: "Aynı Gün Sevkiyat Garantisi", desc: "Saat 18:00'e kadar iletilen siparişler, stokta olan ürünler için aynı gün yüklenir. Acil ihtiyaçta servis sürekliliği önceliğimizdir." },
        { title: "Opar Ege Bölge Bayiliği", desc: "Opar'ın Ege bölgesi operasyonunu devralarak İzmir merkezli bölgesel stok derinliğimizi ve teslimat kapasitemizi genişlettik." },
        { title: "WMS Destekli Depo Yönetimi", desc: "Ambar yönetim sistemi stok doğruluğunu ve sipariş hazırlık sürecini kontrol altında tutar; hata payı sistem düzeyinde sıfıra yakın tutulur." },
        { title: "Stok Derinliği & Planlama", desc: "Talep bazlı envanter planlaması ve dönemsel analiz ile kritik ürünlerde yüksek doluluk oranı sürdürülür. Stokta yok cevabı istisnai kalır." },
        { title: "Sevkiyat Kalite Kontrolü", desc: "Her sipariş çıkışı önce WMS kontrolünden, ardından fiziksel doğrulamadan geçer; hasarlı ve eksik gönderim oranı operasyonel sıfır hedefinde tutulur." },
        { title: "GROUPAUTO Türkiye Ağı", desc: "GROUPAUTO Türkiye yapılanması içerisindeki konumumuz; güçlü tedarik bağlantıları ve sektörel iş birliğini doğrudan yurt içi operasyonel kapasitemize taşır." },
        { title: "Tek Tedarikçi Kolaylığı", desc: "100'den fazla marka tek çatı altında. Çoklu tedarikçi yönetiminin operasyonel yükü ortadan kalkar, müşteri enerjisi satışa odaklanır." },
      ],
    },
    process: {
      eyebrow: "İş Akışı",
      heading: "Siparişten Teslimata Dört Adım",
      body: "Standartlaştırılmış süreç; her siparişte öngörülebilir, izlenebilir ve şeffaf bir deneyim sağlar.",
      steps: [
        { num: "01", title: "Talep İletimi", desc: "B2B portalı veya yetkili satış temsilcisi aracılığıyla sipariş kaydı oluşturulur." },
        { num: "02", title: "Anlık Stok Doğrulama", desc: "Envanter sistemi ürün varlığını gerçek zamanlı teyit eder; alternatif ürün gerekiyorsa satış temsilcisi devreye girer." },
        { num: "03", title: "WMS Sevkiyat Hazırlığı", desc: "Sistem talimatıyla depo personeli picking ve paketleme sürecini başlatır; her adım kayıt altına alınır." },
        { num: "04", title: "Sevk & Teslimat Takibi", desc: "Anlaşmalı lojistik partnerleriyle sevkiyat gerçekleştirilir; kritik siparişlerde aynı gün teslimat hedeflenir." },
      ],
      cta: {
        eyebrow: "Hemen Başlayın",
        heading: "Sipariş Sürecinizi Bugün Başlatın",
        body: "B2B portalımız üzerinden anlık stok ve fiyat bilgisine ulaşın.",
        button: "B2B Portal",
      },
    },
  },
  en: {
    meta: {
      title: "Operations & Logistics — Nationwide From Three Centers | Delta Oto",
      description: "Delta Oto's logistics infrastructure reaches all 81 provinces from operations centers in Gebze, İzmir and Ümraniye: same-day dispatch, WMS-supported warehousing and reliable delivery.",
    },
    hero: {
      eyebrow: "Logistics & Operations Infrastructure",
      title: ["THREE CENTERS", "81 PROVINCES", "NATIONWIDE DELIVERY"],
      body: "Our logistics network delivers fast, reliable and planned distribution to all 81 provinces from our operations centers in Gebze, İzmir and Ümraniye.",
      stats: [
        { target: 3, label: "Operations Centers", sub: "Gebze · İzmir · Ümraniye" },
        { target: 50000, suffix: "+", label: "SKU", sub: "Continuous stock depth" },
        { value: "18:00", label: "Order Cutoff Time", sub: "Same-day dispatch" },
        { target: 81, label: "Provinces", sub: "Nationwide distribution coverage" },
      ],
    },
    network: {
      eyebrow: "Infrastructure Overview",
      heading: "Our Operational Network",
      body: "Our logistics network, managed from three operations centers, runs on delivery-time commitments that vary from region to region.",
      stats: [
        { target: 50000, suffix: "+", label: "Active SKUs", sub: "Continuously updated stock" },
        { value: "7/24", label: "B2B Access", sub: "Digital ordering channel" },
        { value: "WMS", label: "Warehouse Management", sub: "Software-supported operations" },
      ],
    },
    delivery: {
      eyebrow: "Delivery Commitment",
      heading: "A Promise You Can Make to Your Customers",
      body: "Our stock depth and broad logistics network make same-day delivery possible for urgent needs and next-business-day delivery for standard orders. With our Saturday dispatch capacity, we're with you through the weekend too.",
      featuredBadge: "Featured",
      cards: [
        {
          title: "Same-Day Dispatch",
          highlight: "18:00 Order Cutoff",
          desc: "For in-stock items, orders placed by 18:00 ship the same day, regardless of exactly when they came in. A clear, reliable commitment when you need it most.",
          featured: true,
        },
        {
          title: "Next-Day Delivery",
          highlight: "İstanbul and Surrounding Provinces",
          desc: "For standard orders, next-business-day delivery is targeted for your customers in İstanbul and neighboring provinces. A reliable, predictable experience.",
          featured: false,
        },
        {
          title: "Saturday Operations",
          highlight: "Uninterrupted Through the Weekend",
          desc: "Our dispatch capacity stays open on Saturdays as well. For orders that come in late during the week, the Saturday loading option keeps your customers covered.",
          featured: false,
        },
      ],
    },
    depots: {
      eyebrow: "Operations Infrastructure",
      heading: "A Strong Distribution Structure Across Türkiye",
      body: "Our Ümraniye, Gebze and İzmir operations sites form three complementary regional hubs, together running a consistent distribution line across Türkiye.",
      centralTag: "Central Coordination",
      statTrio: [
        { value: "18:00", label: "Same-Day Dispatch Cutoff" },
        { value: "81", label: "Provinces Covered" },
        { value: "03", label: "Operations Sites" },
      ],
      items: [
        {
          title: "Gebze Operations Site",
          city: "Kocaeli",
          plate: "41",
          address: "Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli",
          body: "Close to the industrial corridor of eastern Marmara, it supports regional stock and dispatch flow. It provides fast access to Kocaeli, Sakarya and nearby provinces.",
          central: false,
        },
        {
          title: "İzmir Operations Site",
          city: "İzmir",
          plate: "35",
          address: "Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir",
          body: "The stock and distribution hub for the Aegean Region. Our İzmir-based field structure supports regular dispatch and dealer access across the region.",
          central: false,
        },
        {
          title: "Ümraniye Central Warehouse",
          city: "İstanbul",
          plate: "34",
          address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul",
          body: "Delta Oto's main coordination and central warehouse site. Distribution planning from İstanbul to all of Türkiye is managed from this hub.",
          central: true,
        },
      ],
    },
    capabilities: {
      eyebrow: "Logistics Infrastructure",
      heading: "Our Operational Capabilities",
      body: "Every operational process is structured to optimize the customer delivery experience.",
      groupLabels: ["Distribution & Coverage", "Systems, Quality & Assurance"],
      features: [
        { title: "Nationwide Distribution from Three Centers", desc: "From our operations centers in Gebze, İzmir and Ümraniye, we deliver regularly to all 81 provinces of Türkiye through contracted logistics partners." },
        { title: "Same-Day Dispatch Guarantee", desc: "Orders placed before 18:00 are loaded the same day for items in stock. Service continuity is our priority for urgent needs." },
        { title: "Opar Aegean Regional Dealership", desc: "By taking over Opar's Aegean region operation, we expanded our regional stock depth and delivery capacity from our İzmir base." },
        { title: "WMS-Supported Warehouse Management", desc: "Our warehouse management system keeps stock accuracy and order preparation under control, holding the error margin close to zero at the system level." },
        { title: "Stock Depth & Planning", desc: "Demand-based inventory planning and periodic analysis maintain a high fill rate on critical products, keeping out-of-stock responses the exception." },
        { title: "Dispatch Quality Control", desc: "Every outgoing order passes a WMS check followed by physical verification; damaged and incomplete shipments are held to an operational zero target." },
        { title: "GROUPAUTO Türkiye Network", desc: "Our position within the GROUPAUTO Türkiye structure brings strong supply connections and industry collaboration directly into our domestic operational capacity." },
        { title: "Single-Supplier Convenience", desc: "More than 100 brands under one roof. The operational burden of managing multiple suppliers disappears, freeing customer energy to focus on sales." },
      ],
    },
    process: {
      eyebrow: "Workflow",
      heading: "Four Steps From Order to Delivery",
      body: "A standardized process that delivers a predictable, traceable and transparent experience with every order.",
      steps: [
        { num: "01", title: "Order Submission", desc: "The order is logged through the B2B portal or an authorized sales representative." },
        { num: "02", title: "Real-Time Stock Verification", desc: "The inventory system confirms product availability in real time; a sales representative steps in if an alternative product is needed." },
        { num: "03", title: "WMS Dispatch Preparation", desc: "Following system instructions, warehouse staff begin picking and packing; every step is logged." },
        { num: "04", title: "Dispatch & Delivery Tracking", desc: "Shipment is carried out with contracted logistics partners; same-day delivery is targeted for critical orders." },
      ],
      cta: {
        eyebrow: "Start Now",
        heading: "Start Your Order Process Today",
        body: "Access real-time stock and pricing information through our B2B portal.",
        button: "B2B Portal",
      },
    },
  },
} satisfies Record<Lang, any>;

export function OperasyonPage() {
  const ref = useReveal();
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);

  const capabilityGroups = CAPABILITY_GROUPS.map((indices, gi) => ({
    label: t.capabilities.groupLabels[gi],
    items: indices.map((i) => ({
      icon: CAPABILITY_ICONS[i],
      title: t.capabilities.features[i].title,
      desc: t.capabilities.features[i].desc,
    })),
  }));

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO — ana sayfayla AYNI gerçek Delta Oto tesis fotoğrafı
          (delta-oto-hero-facility.webp — "delta50" tabelası + 5 kamyonluk
          filo), eski ayrı depot.jpg kaynağı yerine (Lojistik Sayfası Revizyon
          Turu). Bu container SABİT min-h-[560px] yükseklikte — ana sayfanın
          lg+'da tam-ekran yüksekliğinden farklı, bu yüzden object-cover
          matematiği burada TERS işliyor: konteyner oranı (genişlik/560px)
          görselin kendi oranından (1920/1081) daha geniş olduğu için TAM
          GENİŞLİK gösterilip fazlalık DİKEY eksende kırpılıyor. object-
          position-y, tabela (kaynakta y≈%12-27) VE kamyon filosunun (kaynakta
          y≈%51-74) ikisini de 560px'lik pencereye sığdıracak şekilde seçildi
          — bu iki bölge birlikte kaynağın neredeyse tamamını (y≈%9-56)
          kaplıyor, dar bir sabit-yükseklik konteynerde ikisini birden tutmak
          çok az boşluk bırakıyor (bkz. görev raporu, görsel doğrulama). */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/delta-oto-hero-facility.webp"
            alt=""
            width={1920}
            height={1081}
            className="w-full h-full object-cover object-[50%_28%] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016]/90 via-[#0e1016]/50 to-[#0e1016]/12" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
        <div className="do-beam" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-10 lg:py-28">
          <div ref={ref} className="do-reveal flex items-center gap-3 mb-3 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">{t.hero.eyebrow}</span>
          </div>
          <h1 ref={ref} className="do-reveal do-d1 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-3 lg:mb-6">
            <span className="do-hero-line">{t.hero.title[0]}</span><br />
            <span className="text-white">{t.hero.title[1]}</span><br />
            <span className="text-[#7d9bea]">{t.hero.title[2]}</span>
          </h1>
          <p ref={ref} className="do-reveal do-d2 text-[17px] text-gray-300 leading-[1.6] sm:leading-[1.8] max-w-2xl mb-4 lg:mb-10 font-light">
            {t.hero.body}
          </p>
          {/* 2x2 (mobil) / 1x4 (sm+) grid — eşit sütun genişliği garantili; eski
              flex-wrap + min-w yaklaşımı içerik-bağımlı genişlik ürettiği için
              (ör. "50.000+" diğer değerlerden çok daha geniş) mobilde dengesiz
              satır kırılmasına yol açıyordu. divide-x yalnızca sm+'da (tek satır)
              devrede — 2 satırlı mobil grid'de divide-x/y birleşimi yanlış
              kenarlıklara yol açacağından mobilde ayrım salt boşlukla sağlanır.
              text-center yalnızca mobilde: kısa değerler ("3", "81") solda
              sıkışık, uzun değerler ("50.000+") sütunu dolduruyor gibi
              görünüp dengesiz hizalanmış hissi veriyordu — ortalamak her
              kartı içerik uzunluğundan bağımsız eşit görünür kılar. sm+'da
              (tek satır, divide-x) orijinal sola yaslı düzen korunur. */}
          <div ref={ref} className="do-reveal do-d3 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 sm:gap-0 sm:divide-x sm:divide-white/10 border-t border-b border-white/15">
            {t.hero.stats.map(({ target, suffix, value, label, sub }) => (
              <div key={label} className="py-3 sm:px-6 sm:py-5 text-center sm:text-left sm:first:pl-0">
                <div className="text-[26px] sm:text-3xl md:text-4xl font-black text-white tabular-nums leading-none">
                  {target !== undefined ? <CountUp target={target} suffix={suffix} /> : value}
                </div>
                <div className="text-[10.5px] sm:text-[11px] font-bold text-[#7d9bea] uppercase tracking-[0.12em] sm:tracking-[0.15em] mt-2 sm:mt-2.5">{label}</div>
                <div className="text-[10.5px] sm:text-[11px] text-white/50 mt-1 leading-snug">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALTYAPI RAKAMLARI — light */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.network.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.network.heading}</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">{t.network.body}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {t.network.stats.map(({ target, suffix, value, label, sub }) => (
              <div key={label} className="text-center p-6 rounded-xl border border-slate-200 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all">
                <div className="text-[22px] font-black text-[#1B3A8F] leading-tight tabular-nums">
                  {target !== undefined ? <CountUp target={target} suffix={suffix} /> : value}
                </div>
                <div className="text-[12px] font-bold text-slate-900 uppercase tracking-wide mt-1.5">{label}</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESLİMAT HIZ GÜVENCESİ — navy */}
      <section className="bg-[#1B3A8F] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">{t.delivery.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 leading-[1.1]">{t.delivery.heading}</h2>
            <p className="text-white/65 leading-[1.85] text-[15.5px] max-w-2xl">
              {t.delivery.body}
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {t.delivery.cards.map(({ title, highlight, desc, featured }: { title: string; highlight: string; desc: string; featured: boolean }, i: number) => {
              const Icon = DELIVERY_ICONS[i];
              return (
                <div
                  key={title}
                  className={`relative flex flex-col gap-4 rounded-xl p-7 transition-colors ${
                    featured
                      ? "lg:col-span-2 border border-[#7d9bea]/50 bg-white/[0.12] hover:bg-white/[0.16] shadow-[0_20px_60px_rgba(125,155,234,0.18)]"
                      : "border border-white/[0.12] bg-white/[0.08] hover:bg-white/[0.14]"
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-7 text-[10px] font-black uppercase tracking-widest text-[#0e1016] bg-[#7d9bea] px-3 py-1 rounded-full">
                      {t.delivery.featuredBadge}
                    </span>
                  )}
                  <div className="flex items-start justify-between">
                    <div className={`rounded-xl border flex items-center justify-center ${featured ? "w-12 h-12 bg-[#7d9bea]/20 border-[#7d9bea]/40" : "w-11 h-11 bg-white/10 border-white/15"}`}>
                      <Icon className={`${featured ? "w-6 h-6" : "w-5 h-5"} text-[#7d9bea]`} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${featured ? "bg-[#7d9bea] text-[#0e1016]" : "text-[#7d9bea] bg-white/10 border border-white/15"}`}>{highlight}</span>
                  </div>
                  <div>
                    <h3 className={`font-bold mb-2 ${featured ? "text-[17px]" : "text-[15px]"}`}>{title}</h3>
                    <p className={`leading-relaxed ${featured ? "text-white/70 text-[14px]" : "text-white/60 text-[13.5px]"}`}>{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOJİSTİK MERKEZLERİMİZ — white. Header/Supplier Assets Round: bir
          önceki tur ("Visual Redesign Round") üç düz metin kolonunu hâlâ
          "METİN / METİN / METİN" gibi okutuyordu — kullanıcı geri bildirimi
          net: "too text-heavy". Editoryal yön korunuyor (tipografi ağırlıklı,
          kart/kutu yok) ama görsel anlatım güçlendirildi: (1) 18:00 / 81 / 03
          artık ayrı bir KPI kutusu değil, girişin hemen altında sessiz bir
          rakam üçlüsü; (2) her lokasyon artık dev, soluk bir "01/02/03" indeks
          numarasıyla açılıyor (dergi bölüm numaralandırması), yanında plaka
          kodu (41/35/34 — turkey-regions.ts'teki gerçek il plaka verisiyle
          aynı dil), gövde metni 2 cümleye indirildi; (3) üstteki ince çizgi,
          artık her lokasyonun başında dolu (Ümraniye/merkez) veya içi boş
          (Gebze/İzmir) küçük bir "rota noktası" noktasıyla kesişiyor — saf
          metin kolonları yerine hafif bir "harita/rota" hissi. Ümraniye hâlâ
          kart büyütülmeden yalnızca "Merkez Koordinasyon" etiketi ve dolu
          noktayla ayırt ediliyor. Motion: OPERASYONEL GÜÇLER bölümündeki
          onaylanmış alternating-left/right dilinin AYNISI — burada üç yatay
          kolon olduğu için tek tek dönüşümlü değil, kademeli (do-d1/d2/d3)
          standart reveal kullanıldı; sola/sağa giriş, sayfa geneli motion
          sisteminde başka yerlerde uygulanıyor. */}
      <section className="bg-white py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={ref} className="do-reveal max-w-2xl mb-12 md:mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.depots.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.depots.heading}</h2>
            <p className="text-slate-500 mt-4 text-[15px] leading-relaxed">{t.depots.body}</p>
          </div>

          <div ref={ref} className="do-reveal do-d2 flex flex-wrap items-baseline gap-x-10 gap-y-5 pb-12 md:pb-14 mb-14 md:mb-16 border-b border-slate-200">
            {t.depots.statTrio.map(({ value, label }: { value: string; label: string }) => (
              <div key={label} className="flex items-baseline gap-2.5">
                <span className="text-4xl md:text-5xl font-black text-[#1B3A8F] tabular-nums tracking-tight leading-none">{value}</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wide font-bold max-w-[120px] leading-tight">{label}</span>
              </div>
            ))}
          </div>

          <div className="relative grid md:grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-14">
            <div className="hidden md:block absolute top-[5px] left-0 right-0 h-px bg-slate-200" aria-hidden="true" />
            {t.depots.items.map(({ title, city, plate, address, body, central }: { title: string; city: string; plate: string; address: string; body: string; central: boolean }, i: number) => (
              <div key={title} ref={ref} className={`relative do-reveal ${i === 0 ? "do-d1" : i === 1 ? "do-d2" : "do-d3"}`}>
                <div
                  className={`relative z-10 w-[10px] h-[10px] rounded-full mb-6 ${central ? "bg-[#1B3A8F]" : "bg-white border-2 border-[#1B3A8F]/35"}`}
                  aria-hidden="true"
                />
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl md:text-6xl font-black text-slate-100 tabular-nums leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 tabular-nums">{plate} · {city}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <h3 className="font-black text-slate-900 text-xl tracking-tight">{title}</h3>
                  {central && (
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1B3A8F]">· {t.depots.centralTag}</span>
                  )}
                </div>
                <p className="text-slate-600 text-[14px] leading-relaxed mt-3">{body}</p>
                <p className="text-slate-400 text-[12.5px] leading-relaxed mt-4 pt-4 border-t border-slate-100">{address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERASYONEL GÜÇLER — dark (bir önceki ve sonraki bölüm navy; iki navy'nin arasına aynı tonu tekrarlamamak için koyu zemin) */}
      <section className="relative bg-[#0e1016] py-24 text-white overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">{t.capabilities.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">{t.capabilities.heading}</h2>
            <p className="text-white/60 mt-3 max-w-2xl text-[15px]">{t.capabilities.body}</p>
          </div>
          {/* 8 yetkinlik, iki tematik başlık altında büyük indeks numaralı satırlar halinde —
              kart ızgarası yerine editoryal bir liste; içerik (title/desc) aynen korunuyor. */}
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-4">
            {capabilityGroups.map((group, gi) => (
              <div key={group.label} ref={ref} className={gi === 0 ? "do-reveal-left" : "do-reveal-right"}>
                <div className="flex items-center gap-3 pb-4 mb-1 border-b border-white/15">
                  <span className="text-[11px] font-black text-[#7d9bea] tabular-nums">{gi === 0 ? "01—04" : "05—08"}</span>
                  <span className="w-1 h-1 rounded-full bg-white/25" />
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-white/85">{group.label}</h3>
                </div>
                {group.items.map((f, i) => (
                  <div
                    key={f.title}
                    className="group/row flex items-start gap-5 py-6 border-b border-white/10 last:border-b-0 hover:bg-white/[0.03] transition-colors rounded-lg -mx-3 px-3"
                  >
                    <span className="shrink-0 w-11 pt-0.5 text-4xl font-black text-white/[0.15] group-hover/row:text-[#7d9bea]/50 tabular-nums leading-none transition-colors">
                      {String(gi * 4 + i + 1).padStart(2, "0")}
                    </span>
                    <div className="shrink-0 w-10 h-10 mt-0.5 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover/row:bg-[#7d9bea]/15 group-hover/row:border-[#7d9bea]/30 transition-colors">
                      <f.icon className="w-[18px] h-[18px] text-[#7d9bea]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[15px] font-bold mb-1.5 leading-snug">{f.title}</h4>
                      <p className="text-white/60 text-[13.5px] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SİPARİŞ SÜRECİ — navy */}
      <section className="relative bg-[#1B3A8F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">{t.process.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">{t.process.heading}</h2>
            <p className="text-white/70 mt-3 max-w-xl text-[15px]">{t.process.body}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {t.process.steps.map((s: { num: string; title: string; desc: string }, i: number) => (
              <div key={s.num} className="relative">
                <div className="text-7xl font-black text-white/[0.07] mb-4 leading-none select-none">{s.num}</div>
                <h3 className="text-[15px] font-bold mb-2 leading-snug">{s.title}</h3>
                <p className="text-white/70 text-[13.5px] leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-white/15">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Kapanış CTA'sı — aynı navy section içinde ama kendi çerçeveli paneliyle net şekilde
              ayrışan, sayfanın son çağrı anını taşıyan bir alt-blok (bkz. TedarikciPage/SpartPage
              kapanış CTA deseni; burada ayrı bir navy section açmak yerine sub-block tercih edildi,
              çünkü bu section zaten navy ve hemen üstündeki bölüm de navy — iki navy section'ı
              art arda getirmek üstteki "OPERASYONEL GÜÇLER" dark ara-katmanının amacını bozardı). */}
          <div ref={ref} className="do-reveal mt-16 md:mt-20 relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-8 sm:p-10 md:p-12">
            <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#7d9bea]/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#7d9bea] mb-4">
                  <span className="w-6 h-[2px] bg-[#7d9bea] inline-block" />
                  {t.process.cta.eyebrow}
                </span>
                <h3 className="text-2xl sm:text-[28px] md:text-3xl font-black tracking-tight leading-[1.15] mb-3">
                  {t.process.cta.heading}
                </h3>
                <p className="text-white/70 text-[15.5px] leading-relaxed">
                  {t.process.cta.body}
                </p>
              </div>
              <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-white text-[#1B3A8F] font-bold px-8 md:px-10 py-4 rounded-md hover:bg-gray-100 active:scale-[0.98] transition-colors text-sm flex items-center gap-2 group">
                {t.process.cta.button}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { Truck, Zap, ChevronRight, ChevronDown, Calendar, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useReveal, useCounter, useSectionProgress } from "../hooks/use-motion";
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
        { value: "17:00", label: "Son Sipariş Saati", sub: "Aynı gün sevkiyat" },
        { target: 81, label: "İl", sub: "Ulusal dağıtım kapsamı" },
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
          highlight: "17:00 Son Sipariş Saati",
          desc: "Stokta olan ürünler için 17:00'e kadar iletilen siparişler, sipariş saatine bakılmaksızın aynı gün kargoya verilir. Acil ihtiyaçlarınızda net ve güvenilir bir taahhüt.",
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
    // Görsel/UX Düzeltme Turu (§3-4): önceki dikey "Zincirleme Sorumluluk"
    // düzeni (Gebze satırı → İzmir satırı → büyük Ümraniye paneli → 81 İl
    // kapanışı, hepsi alt alta) 1440×810'da TEK SAHNE olarak sığmıyordu —
    // kullanıcı geri bildirimi net: "16:9 porsiyona sığmıyor". Konsept
    // (bölgesel besleme → merkezi karar → ulusal çıktı) KORUNDU, sunum
    // sıfırdan YATAY bir bileşime dönüştürüldü: üç blok artık ALT ALTA değil
    // YAN YANA (bkz. JSX) — dikey yığın yerine genişlik kullanan, tek bakışta
    // okunan bir kompozisyon. Kopya de buna göre sıkılaştırıldı: adres
    // satırları kaldırıldı (bu bilginin birincil yeri zaten İletişim
    // sayfası — burada tekrar etmek "az kopya, az kutu" ilkesine aykırıydı),
    // roleTag'ler tek/iki kelimeye indirildi, body cümleleri tek kısa
    // ifadeye indirildi. Masaüstünde yatay, mobilde (16:9 zorunluluğu
    // masaüstüne özgü) doğal biçimde dikey yığılır.
    // Görsel/UX Düzeltme Turu §3 (canlı incelemede bulunan): "İki Bölge, Tek
    // Karar Noktası" operasyonu coğrafi olarak sınırlıymış gibi gösteriyordu
    // ve Ümraniye'yi TEK fiziksel merkezmiş gibi yanlış çerçeveliyordu.
    // Gerçek hikaye: Türkiye geneli dağıtım/operasyon, Ümraniye'den MERKEZİ
    // KOORDİNASYON — Gebze ve İzmir birer operasyon noktası, "bölge" değil.
    // Başlık ve Ümraniye paneli metni bu yönde yeniden yazıldı; "tek karar
    // noktası" / "tüm karar burada alınır" gibi mutlaklık ifade eden
    // kelimeler kaldırıldı. Diğer her şey (Gebze/İzmir/Ümraniye/81 İl,
    // yatay 16:9 kompozisyon) KORUNDU.
    depots: {
      eyebrow: "Operasyon Altyapısı",
      heading: "Türkiye Geneli, Tek Merkezden Koordinasyon",
      body: "Gebze ve İzmir operasyon noktalarımızı, Ümraniye'deki merkezden koordine ediyoruz.",
      reachValue: "81",
      reachLabel: "İl",
      reachBody: "Türkiye'nin tamamına planlı dağıtım.",
      items: [
        { title: "Gebze", plate: "41", tag: "Doğu Marmara", body: "Kocaeli ve Sakarya'ya hızlı erişim.", central: false },
        { title: "İzmir", plate: "35", tag: "Ege Bölgesi · Opar", body: "Ege'nin dağıtım omurgası.", central: false },
        { title: "Ümraniye", plate: "34", tag: "Merkez Koordinasyon", body: "Stok ve sevkiyat koordinasyonu, Ümraniye merkezden yönetilir.", central: true },
      ],
    },
    // Hard-edit (§21-22): 8 madde → 3. Kalan 5 madde bu sayfada BAŞKA YERDE
    // (hero/Teslimat/yukarıdaki Operasyon Altyapısı) zaten söylenmişti veya
    // konu dışıydı (GROUPAUTO ağı ve tek-tedarikçi kolaylığı bu sayfanın
    // değil, İş Ortaklarımız'ın konusu). Yalnızca üç GERÇEKTEN operasyonel
    // ve BAŞKA YERDE anlatılmamış yetkinlik kaldı — sayı simetrisi için 8'de
    // tutulmadı.
    capabilities: {
      eyebrow: "Lojistik Altyapı",
      heading: "Sistem ve Kalite",
      items: [
        { title: "WMS Destekli Depo Yönetimi", desc: "Stok doğruluğu ve sipariş hazırlığı sistem kontrolünde; hata payı sıfıra yakın." },
        { title: "Stok Derinliği & Planlama", desc: "Talep bazlı planlama, kritik ürünlerde yüksek doluluk sağlar; stokta yok yanıtı istisnadır." },
        { title: "Sevkiyat Kalite Kontrolü", desc: "Her sevkiyat WMS ve fiziksel kontrolden geçer; hasarlı/eksik gönderim oranı hedefte sıfır." },
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
        { value: "17:00", label: "Order Cutoff Time", sub: "Same-day dispatch" },
        { target: 81, label: "Provinces", sub: "Nationwide distribution coverage" },
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
          highlight: "17:00 Order Cutoff",
          desc: "For in-stock items, orders placed by 17:00 ship the same day, regardless of exactly when they came in. A clear, reliable commitment when you need it most.",
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
      heading: "Nationwide Operations, Centrally Coordinated",
      body: "We coordinate our operation points in Gebze and İzmir from our center in Ümraniye.",
      reachValue: "81",
      reachLabel: "Provinces",
      reachBody: "Regular, planned distribution across Türkiye.",
      items: [
        { title: "Gebze", plate: "41", tag: "Eastern Marmara", body: "Fast access to Kocaeli and Sakarya.", central: false },
        { title: "İzmir", plate: "35", tag: "Aegean Region · Opar", body: "The Aegean's distribution backbone.", central: false },
        { title: "Ümraniye", plate: "34", tag: "Central Coordination", body: "Stock and dispatch coordination is managed from the Ümraniye center.", central: true },
      ],
    },
    capabilities: {
      eyebrow: "Logistics Infrastructure",
      heading: "Systems and Quality",
      items: [
        { title: "WMS-Supported Warehouse Management", desc: "Stock accuracy and order prep run under system control — error margin near zero." },
        { title: "Stock Depth & Planning", desc: "Demand-based planning keeps critical products in stock; out-of-stock stays the exception." },
        { title: "Dispatch Quality Control", desc: "Every shipment passes a WMS and physical check — damaged or incomplete stays near zero." },
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

  // Dört adımlık süreç scroll'a bağlı gerçek bir ilerleme izler. Görsel/UX
  // Düzeltme Turu (§6-9): 'settle' modu (useSectionProgress'in artık
  // parametreli hale gelen hook'u, bkz. use-motion.ts) burada KRİTİK — eski
  // tek-formül davranışı (şimdi 'transit') progress'i bölümün TÜM viewport
  // geçişine (giriş→tam çıkış) yayıyordu; bu satır boyu kısa bir blok için
  // bu, progress'in ancak kullanıcı bölümü zaten geçtikten SONRA 1'e
  // ulaşması demekti — adım 3/4 kullanıcı modülü etkin biçimde terk
  // ETTİKTEN sonra yanıyordu (bildirilen hata). 'settle', bölüm hâlâ
  // rahatça tam görünürken 1'e ulaşacak şekilde hedefliyor. explicit mode
  // parametresi (default zaten 'settle') niyeti belgelemek için yazılı.
  const [processRef, processProgress] = useSectionProgress<HTMLDivElement>("settle");
  const activeStep = Math.min(3, Math.floor(processProgress * 4));

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
          çok az boşluk bırakıyor (bkz. görev raporu, görsel doğrulama).

          Hero Görsel Turu bulgusu: yukarıdaki matematik SADECE lg+ (geniş/
          alçak konteyner) için geçerli — mobilde (dar/uzun konteyner,
          390×~570) kısıt TERSİNE döner: yükseklik TAM gösterilir (kırpma
          yok), GENİŞLİK kırpılır — yalnızca kaynağın ~%38'i (≈737px/1920px)
          görünür kalır. Eski tek object-[50%_28%] değeri bu dar pencereyi
          yatayda TAM ORTALIYORDU; kaynakta tabela (x≈1150-1700px/1920,
          PIL ile piksel-hassas ölçüldü) VE kamyon filosu (x≈860-1910px)
          merkezde değil, SAĞ yarıda kümelenmiş olduğu için "delta50"
          tabelasının sağ ucu kırpılıyordu (canlı mobil QA'da görüldü).
          %72 ara denemesi de yetersiz kaldı (tabela hâlâ ~112px kırpılıyordu)
          — pencere matematiği yeniden hesaplandı (scale=max(390/1920,
          H/1081), overflow=1920·scale-390, offset=konum%×overflow/scale)
          ve %83'te tabelanın TAMAMININ pencerede kaldığı doğrulandı
          (pencere kaynakta ≈994-1730px, tabela 1150-1700px içinde, ~150px
          sol/30px sağ pay). Bu ödünleşimle filodan 5 kamyonun 3'ü tam,
          2'si kısmi görünür — tabelanın eksiksiz/net kalması, her kamyonun
          tam görünmesinden daha öncelikli (marka kimliği). Dikey (%28)
          mobilde hiç kırpma yapmadığından etkisizdir ama masaüstüyle
          tutarlılık için korundu. */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/delta-oto-hero-facility.webp"
            alt=""
            width={1920}
            height={1081}
            className="w-full h-full object-cover object-[83%_28%] lg:object-[50%_28%] opacity-70"
          />
          {/* Hero Görsel Turu bulgusu: eski via-50/50% durağı, kısa
              "ÜÇ MERKEZDEN" başlığının gradyan-metin kuyruğunun (do-hero-line,
              beyaz→%55 saydam) tam üstüne denk geldiği noktada görselin
              parlak/açık gri bina duvarıyla çakışıp metni neredeyse görünmez
              kılıyordu (canlı QA'da ölçüldü/görüldü). Via durağı %65'e
              çıkarıldı — başlık bölgesi artık tutarlı şekilde korunuyor,
              delta50 tabelası/kamyon filosu (durağın sağında, %50'den sonra)
              görünürlüğü DEĞİŞMEDİ. */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016]/90 via-[#0e1016]/65 to-[#0e1016]/12" />
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
          {/* Hero Görsel Turu: title[0] artık do-hero-line (beyaz→%55 saydam
              gradyan) DEĞİL, düz beyaz — kısa ("ÜÇ MERKEZDEN") bir ifade
              olduğu için gradyanın soluk kuyruğu, görselin bu bölgedeki
              açık gri bina duvarıyla çakışınca metni neredeyse okunamaz
              kılıyordu (canlı QA'da tespit edildi). Diğer sayfalardaki
              do-hero-line kullanımı (uzun/çok satırlı başlıklar, tutarlı
              koyu zemin) etkilenmedi — bu tek satıra özgü bir düzeltme. */}
          <h1 ref={ref} className="do-reveal do-d1 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-3 lg:mb-6">
            <span className="text-white">{t.hero.title[0]}</span><br />
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

      {/* "Altyapı Rakamları" bölümü kaldırıldı (fact-ownership denetimi,
          §20-22): SKU rakamı yukarıdaki hero stat şeridiyle, WMS aşağıdaki
          Sistem ve Kalite bölümüyle birebir aynı gerçeği tekrar ediyordu;
          7/24 B2B erişimi sitede zaten defalarca (footer, İletişim, B2B
          CTA'ları) söylenmiş, tek başına bir bölümü hak etmeyen küçük bir
          detaydı. Hero'nun hemen ardından İKİNCİ bir rakam şeridi olması da
          kendi başına bir tekrar hissi yaratıyordu. */}

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

      {/* OPERASYON ALTYAPISI — white. Görsel/UX Düzeltme Turu (§3-4): önceki
          tur bu bölümü soyut node/edge SVG diyagramından kurtarıp saf
          tipografiye taşımıştı ("Zincirleme Sorumluluk": Gebze/İzmir besler
          → Ümraniye karar verir → 81 il çıktı alır) — konsept doğruydu, ama
          dikey yığın (satır→satır→büyük panel→kapanış, alt alta) 1440×810'da
          TEK SAHNE olarak sığmıyordu (kullanıcı: "16:9 porsiyona sığmıyor").
          Bu turda konsept AYNI kaldı, MEDYUM yatay bir bileşime döndü: aynı
          üç blok artık masaüstünde YAN YANA (bölgesel sütun → Ümraniye paneli
          → 81 İl kapanışı), aralarında .do-flow-line-h (yatay büyüyen
          bağlayıcı, index.css) ile bağlı. Mobilde (16:9 zorunluluğu yalnızca
          masaüstüne özgü) aynı üç blok doğal biçimde dikey yığılır — dikey
          .do-flow-line kardeşi burada devrede kalıyor. */}
      <section className="bg-white py-16 md:py-20 lg:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={ref} className="do-reveal max-w-2xl mb-8 md:mb-10 lg:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.depots.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.depots.heading}</h2>
            <p className="text-slate-500 mt-3 text-[15px] leading-relaxed">{t.depots.body}</p>
          </div>

          {/* MASAÜSTÜ — yatay tek sahne: bölgesel sütun (Gebze/İzmir, alt
              alta, küçük görsel ağırlık) → bağlayıcı → Ümraniye (dolgun navy
              panel, en büyük ağırlık) → bağlayıcı → 81 İl (büyük kapanış
              rakamı). Üç blok arasındaki KONTRAST (küçük/büyük/büyük-rakam)
              bölgesel-merkezi ayrımını, ayrı bir "MERKEZ" etiketinden daha
              güçlü anlatıyor. */}
          <div className="hidden lg:flex items-stretch">
            <div className="flex-1 flex flex-col justify-center gap-5 pr-8 min-w-0">
              {t.depots.items.filter((it: { central: boolean }) => !it.central).map((loc: { title: string; plate: string; tag: string; body: string }, i: number) => (
                <React.Fragment key={loc.title}>
                  {i > 0 && <div ref={ref} className="do-flow-line-h h-px bg-slate-200 w-full" aria-hidden="true" />}
                  <div ref={ref} className={`do-reveal ${i === 0 ? "" : "do-d1"} flex items-start gap-4`}>
                    <span className="shrink-0 w-9 h-9 rounded-lg border-2 border-slate-300 flex items-center justify-center text-[12px] font-black text-slate-400 tabular-nums">
                      {loc.plate}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <div className="flex flex-wrap items-baseline gap-x-2.5">
                        <h3 className="text-base font-black text-slate-900">{loc.title}</h3>
                        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#1B3A8F]/70">{loc.tag}</span>
                      </div>
                      <p className="text-slate-500 text-[12.5px] leading-snug mt-1">{loc.body}</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center px-5 shrink-0" aria-hidden="true">
              <div ref={ref} className="do-flow-line-h w-10 h-px bg-slate-300" />
            </div>

            {t.depots.items.filter((it: { central: boolean }) => it.central).map((hub: { title: string; plate: string; tag: string; body: string }) => (
              <div key={hub.title} className="flex-[1.3] min-w-0">
                <div ref={ref} className="do-reveal do-d2 h-full bg-[#1B3A8F] text-white rounded-2xl p-7 flex flex-col justify-center">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2.5">
                    <span className="text-[12px] font-black text-[#7d9bea] tabular-nums">{hub.plate}</span>
                    <h3 className="text-2xl font-black tracking-tight">{hub.title}</h3>
                  </div>
                  <span className="text-[10.5px] font-black uppercase tracking-[0.15em] text-[#7d9bea] mb-2.5 block">{hub.tag}</span>
                  <p className="text-white/75 text-[13.5px] leading-relaxed max-w-xs">{hub.body}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center px-5 shrink-0" aria-hidden="true">
              <div ref={ref} className="do-flow-line-h w-10 h-px bg-slate-300" />
            </div>

            <div ref={ref} className="do-reveal do-d3 flex-1 flex flex-col justify-center pl-2 min-w-0">
              <span className="text-6xl font-black text-[#1B3A8F] tabular-nums leading-none">{t.depots.reachValue}</span>
              <div className="text-sm font-black text-slate-900 uppercase tracking-tight mt-2">{t.depots.reachLabel}</div>
              <p className="text-slate-500 text-[12.5px] mt-1 max-w-[13rem] leading-snug">{t.depots.reachBody}</p>
            </div>
          </div>

          {/* MOBİL/TABLET — aynı üç blok doğal biçimde dikey yığılır (16:9
              tek-sahne zorunluluğu yalnızca masaüstüne özgü). */}
          <div className="lg:hidden max-w-lg">
            {t.depots.items.filter((it: { central: boolean }) => !it.central).map((loc: { title: string; plate: string; tag: string; body: string }, i: number) => (
              <React.Fragment key={loc.title}>
                <div ref={ref} className={`do-reveal ${i === 0 ? "" : "do-d1"} flex items-start gap-4`}>
                  <span className="shrink-0 w-10 h-10 rounded-lg border-2 border-slate-300 flex items-center justify-center text-[12px] font-black text-slate-400 tabular-nums">
                    {loc.plate}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <h3 className="text-base font-black text-slate-900">{loc.title}</h3>
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#1B3A8F]/70">{loc.tag}</span>
                    </div>
                    <p className="text-slate-500 text-[13px] leading-snug mt-1">{loc.body}</p>
                  </div>
                </div>
                <div className="pl-5 py-2.5" aria-hidden="true">
                  <div ref={ref} className="do-flow-line w-px h-5 bg-slate-200" />
                </div>
              </React.Fragment>
            ))}

            <div className="pl-5 -mt-2.5 mb-2.5" aria-hidden="true">
              <ChevronDown className="w-4 h-4 text-slate-300" />
            </div>

            {t.depots.items.filter((it: { central: boolean }) => it.central).map((hub: { title: string; plate: string; tag: string; body: string }) => (
              <div key={hub.title} ref={ref} className="do-reveal do-d2 bg-[#1B3A8F] text-white rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <span className="text-[12px] font-black text-[#7d9bea] tabular-nums">{hub.plate}</span>
                  <h3 className="text-xl font-black tracking-tight">{hub.title}</h3>
                  <span className="text-[10.5px] font-black uppercase tracking-[0.12em] text-[#7d9bea]">{hub.tag}</span>
                </div>
                <p className="text-white/75 text-[13.5px] leading-relaxed">{hub.body}</p>
              </div>
            ))}

            <div className="flex flex-col items-start pl-9 mt-2.5 mb-2" aria-hidden="true">
              <div ref={ref} className="do-flow-line w-px h-6 bg-slate-200" />
              <ChevronDown className="w-4 h-4 text-slate-300 -mt-0.5" />
            </div>

            <div ref={ref} className="do-reveal do-d3 flex items-baseline gap-4 pt-2">
              <span className="text-5xl font-black text-[#1B3A8F] tabular-nums leading-none">{t.depots.reachValue}</span>
              <div>
                <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{t.depots.reachLabel}</div>
                <p className="text-slate-500 text-[13px] mt-1">{t.depots.reachBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SİSTEM VE KALİTE — dark. Hard-edit (§21-22, önceki tur): eskiden 8
          madde, iki tematik grup altında. Beşi kaldırıldı — üç merkezden
          dağıtım/17:00/Opar zaten yukarıdaki Operasyon Altyapısı ve Teslimat
          bölümlerinde söylendi; GROUPAUTO ağı ve tek-tedarikçi kolaylığı bu
          sayfanın değil İş Ortaklarımız'ın konusuydu. Kalan 3 madde gerçekten
          operasyonel ve BAŞKA YERDE yok.

          Görsel/UX Düzeltme Turu §4 (canlı incelemede bulunan): eski gevşek
          3-sütun grid (büyük gap-x/y-10 boşluk + küçük ikon + küçük metin,
          py-24 dolgu) kullanıcının ekran görüntüsünde "başlık + devasa boş
          koyu alan" olarak okunuyordu — üç madde ORADAYDI ama kompozisyon
          onları GÖRÜNÜR biçimde ÇERÇEVELEMİYORDU, boşluk içerikten fazla
          ağırlık taşıyordu. Çözüm: (1) dolgu sıkılaştırıldı (py-24→py-16/20),
          (2) üç madde artık border-t/divide-x/border-b ile TEK bir çerçeveli
          şerit — sınırlar kompozisyona "bunlar üç GERÇEK, sınırlı unsur"
          diyen bir kapsayıcılık veriyor (site genelinde zaten kullanılan
          numaralı-liste/divide-x dili, yeni icat edilmiş değil — bkz.
          TedarikciPage "Neden Delta Oto" ve bu sayfanın kendi Operasyon
          Altyapısı plaka numaraları), (3) ikonlar yerine 01/02/03 numaralı
          endeks (aynı sebep: mevcut site dili), (4) üç ayrı gecikmeli
          do-reveal yerine TEK bir kapsayıcı reveal — üç maddenin farklı
          anlarda yarı-saydam görünüp "bitmemiş" hissi verme riskini
          (canlı incelemede olası bir etken) ortadan kaldırıyor. */}
      <section className="relative bg-[#0e1016] py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div ref={ref} className="do-reveal mb-10 md:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">{t.capabilities.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">{t.capabilities.heading}</h2>
          </div>
          <div ref={ref} className="do-reveal grid sm:grid-cols-3 sm:divide-x sm:divide-white/10 border-t border-white/10">
            {t.capabilities.items.map((f: { title: string; desc: string }, i: number) => (
              <div key={f.title} className="py-7 sm:py-8 sm:pl-8 sm:first:pl-0 sm:pr-4 border-b sm:border-b-0 border-white/10 last:border-b-0">
                <span className="text-[11px] font-black text-[#7d9bea] tabular-nums block mb-4">0{i + 1}</span>
                <h3 className="text-[17px] font-bold mb-2.5 leading-snug">{f.title}</h3>
                <p className="text-white/60 text-[13.5px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SİPARİŞ SÜRECİ — navy. Motion dekoratif değil, tasarımın kendisi:
          processProgress bu bloğun kendi scroll geçişini izler ('settle'
          modu, bkz. yukarıdaki hook yorumu ve use-motion.ts — Görsel/UX
          Düzeltme Turu §6-9, adım 4'ün kullanıcı modülü terk ETMEDEN
          tamamlanmasını garanti eden düzeltme), üstteki ince çubuk gerçek
          zamanlı dolar. Üç durum (§8, "gerçek bir yolculuk hissi"): quiet
          (henüz sırası gelmedi) → passed (geçildi, okunur/açık kalır, asla
          solmaz) → current (şu an "buradayız", ayrıca büyütülmüş nokta +
          numara — hareket eden bir imleç hissi). Boyut/metin İÇERİĞİ
          DEĞİŞMEZ, sıra animasyon olmadan da tam okunur kalır.
          prefers-reduced-motion'da hook progress'i 1'e kilitler → activeStep
          3'e sabitlenir, dört adım da "passed" (current değil) durumunda
          baştan tam/okunur görünür — sitenin genel reduced-motion geçiş-
          süresi-sıfırlama kuralı (index.css) transition-colors/transform'u
          otomatik kapsar. */}
      <section className="relative bg-[#1B3A8F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">{t.process.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">{t.process.heading}</h2>
            <p className="text-white/70 mt-3 max-w-xl text-[15px]">{t.process.body}</p>
          </div>

          <div ref={processRef}>
            <div className="relative h-[3px] bg-white/10 rounded-full mb-12 overflow-hidden" aria-hidden="true">
              <div className="absolute inset-y-0 left-0 bg-[#7d9bea] rounded-full transition-[width] duration-150 ease-out" style={{ width: `${processProgress * 100}%` }} />
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {t.process.steps.map((s: { num: string; title: string; desc: string }, i: number) => {
                const isActive = i <= activeStep;
                const isCurrent = i === activeStep;
                return (
                  <div key={s.num} className="relative">
                    <div
                      className={`rounded-full mb-5 transition-all duration-300 ${
                        isCurrent ? "w-3 h-3 bg-[#7d9bea] shadow-[0_0_0_4px_rgba(125,155,234,0.25)]" : isActive ? "w-2 h-2 bg-[#7d9bea]/70" : "w-2 h-2 bg-white/15"
                      }`}
                      aria-hidden="true"
                    />
                    <div
                      className={`font-black mb-4 leading-none select-none origin-left transition-all duration-300 ${
                        isCurrent ? "text-7xl text-white/40 scale-105" : isActive ? "text-7xl text-white/20" : "text-7xl text-white/[0.07]"
                      }`}
                    >
                      {s.num}
                    </div>
                    <h3 className={`text-[15px] font-bold mb-2 leading-snug transition-colors duration-300 ${isCurrent ? "text-white" : isActive ? "text-white/85" : "text-white/50"}`}>{s.title}</h3>
                    <p className={`text-[13.5px] leading-relaxed transition-colors duration-300 ${isCurrent ? "text-white/80" : isActive ? "text-white/60" : "text-white/35"}`}>{s.desc}</p>
                    {i < 3 && (
                      <div className="hidden md:block absolute top-8 -right-3">
                        <ChevronRight className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-[#7d9bea]" : "text-white/15"}`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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

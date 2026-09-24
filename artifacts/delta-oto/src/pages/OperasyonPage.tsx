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
      title: "Operasyon ve Lojistik — Gebze ve İzmir'den 81 İle | Delta Oto",
      description: "Delta Oto'nun Gebze ve İzmir operasyon noktalarından 81 ile ulaşan lojistik altyapısı: aynı gün sevkiyat, WMS destekli depo yönetimi ve güvenilir teslimat ağı.",
    },
    hero: {
      eyebrow: "Lojistik & Operasyon Altyapısı",
      title: ["GEBZE VE İZMİR'DEN", "81 İLE", "PLANLI DAĞITIM"],
      body: "Lojistik ağımız; Gebze ve İzmir'deki operasyon noktalarımızdan 81 ile hızlı, güvenilir ve planlı dağıtım sunar.",
      stats: [
        { target: 2, label: "Operasyon Merkezi", sub: "Gebze · İzmir" },
        { target: 50000, suffix: "+", label: "SKU", sub: "Sürekli stok derinliği" },
        { value: "17:00", label: "Son Sipariş Saati", sub: "Aynı gün sevkiyat" },
        { target: 81, label: "İl", sub: "Ulusal dağıtım kapsamı" },
      ],
    },
    // Copy Discipline Turu: "Müşterinize Söz Verebilirsiniz" başlığı ve
    // "yanınızdayız" / "net ve güvenilir bir taahhüt" / "müşterilerinizi
    // korumuş olursunuz" gibi satış-dili ifadeler kaldırıldı — kullanıcı
    // bunları yapay/çocuksu/AI-copy hissi veren fazlalık olarak reddetti.
    // Aynı operasyonel gerçekler (17:00 kesim, ertesi gün, Cumartesi) sade
    // B2B diliyle kaldı; hiçbir taahhüt güçlendirilmedi.
    delivery: {
      eyebrow: "Teslimat Yapısı",
      heading: "Planlı Sevkiyat",
      body: "Stok derinliğimiz ve geniş lojistik ağımız; acil ihtiyaçta aynı gün, standart siparişlerde ertesi iş günü sevkiyatı mümkün kılar. Cumartesi sevkiyat kapasitesiyle hafta sonu kesintisi yaşanmaz.",
      featuredBadge: "Öne Çıkan",
      cards: [
        {
          title: "Aynı Gün Sevkiyat",
          highlight: "17:00 Son Sipariş Saati",
          desc: "Stokta olan ürünler için 17:00'e kadar iletilen siparişler, sipariş saatine bakılmaksızın aynı gün kargoya verilir.",
          featured: true,
        },
        {
          title: "Ertesi Gün Teslimat",
          highlight: "İstanbul ve Çevre İller",
          desc: "Standart siparişlerde İstanbul ve yakın il müşterileri için ertesi iş günü teslimat hedeflenir.",
          featured: false,
        },
        {
          title: "Cumartesi Operasyonu",
          highlight: "Hafta Sonu Kesintisiz",
          desc: "Cumartesi günleri de sevkiyat kapasitemiz açıktır. Hafta içi geç saatte gelen siparişler, Cumartesi yükleme seçeneğiyle karşılanır.",
          featured: false,
        },
      ],
    },
    // Fotoğraf-Öncelikli Depo Modülü Turu: eski tipografi-ağırlıklı "Gebze/
    // İzmir sütunu → Ümraniye navy panel → 81 İl kapanışı" yatay kompozisyonu
    // (plaka numaralı, node/flow-line bağlantılı) TAMAMEN kaldırıldı —
    // kullanıcı artık plaka-numarası ağırlıklı bir infografik değil, GERÇEK
    // fotoğrafla anlatılan iki eşit-ağırlıklı operasyon noktası istiyor.
    // Ümraniye bu modülden ÇIKARILDI (dağıtım anlatısı artık yalnızca Gebze +
    // İzmir → Türkiye geneli; Ümraniye merkez/HQ kimliği İletişim sayfasında
    // ve footer'da zaten var, oradan SİLİNMEDİ — bkz. görev talimatı §K).
    // Görsel varlık notu — Gerçek Depo Fotoğrafı Turu: artık Gebze'ye ve
    // İzmir'e ÖZGÜ, gerçek depo içi fotoğraflar repoda mevcut
    // (operations-gebze-interior.png/webp, operations-izmir-interior.png/webp
    // — eski jenerik stand-in'lerin (delta-oto-hero-facility.webp,
    // delta-oto-depot.webp) yerini bu modülde aldı; o iki dosya kaldırılmadı,
    // yalnızca burada kullanılmıyor). Her iki fotoğrafta da rafların
    // üzerinde doğal olarak asılı "delta50" tabelaları var; İzmir'de ayrıca
    // Opar tabelası da doğal biçimde görünüyor — bu HTML/CSS ile eklenmiş bir
    // logo bindirmesi DEĞİL, fotoğrafın kendi içeriği. Panel üzerine yalnızca
    // şehir adı (Gebze/İzmir) metin katmanı bindiriliyor, başka hiçbir
    // logo/tabela eklenmedi ya da kaldırılmadı.
    depots: {
      eyebrow: "Operasyon Altyapısı",
      heading: "Gebze ve İzmir'den Türkiye Geneline Dağıtım",
      body: "İki operasyon noktamızdan, Türkiye'nin tamamına düzenli sevkiyat ağıyla ulaşıyoruz.",
      reachValue: "81 İl",
      reachLabel: "Türkiye Geneline Dağıtım",
      panels: [
        { title: "Gebze", caption: "Marmara'dan Türkiye geneline sevkiyat.", image: "/images/operations-gebze-interior.webp", position: "50% 50%" },
        { title: "İzmir", caption: "Ege'den bölgesel sevkiyat.", image: "/images/operations-izmir-interior.webp", position: "78% 50%" },
      ],
    },
    // Hard-edit (§21-22): 8 madde → 3. Kalan 5 madde bu sayfada BAŞKA YERDE
    // (hero/Teslimat/yukarıdaki Operasyon Altyapısı) zaten söylenmişti veya
    // konu dışıydı (GROUPAUTO ağı ve tek-tedarikçi kolaylığı bu sayfanın
    // değil, İş Ortaklarımız'ın konusu).
    // Kalite Mesajı Taşıma Turu: İş Ortaklarımız'daki standalone "Kayıt Dışı
    // ve Sahte Ürüne Sıfır Tolerans" modülü kaldırıldı — o mesajın MANTIKLI
    // sahibi burası. "Stok Derinliği & Planlama" (sitede başka yerlerde zaten
    // ağırlıkla söylenmiş bir gerçek — hero stat, homepage metrics) bu yeni
    // maddeyle DEĞİŞTİRİLDİ; tek cümlelik özet, eski modülün TÜMÜ taşınmadı.
    capabilities: {
      eyebrow: "Lojistik Altyapı",
      heading: "Sistem ve Kalite",
      items: [
        { title: "Tedarik Kaynağı & Ürün Güveni", desc: "Kayıt dışı ve sahte ürüne sıfır tolerans; her marka denetimli kaynak doğrulamasından ve süregelen kontrolden geçer." },
        { title: "WMS Destekli Depo Yönetimi", desc: "Stok doğruluğu ve sipariş hazırlığı sistem kontrolünde; hata payı sıfıra yakın." },
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
      title: "Operations & Logistics — From Gebze and İzmir to 81 Provinces | Delta Oto",
      description: "Delta Oto's logistics infrastructure reaches all 81 provinces from our Gebze and İzmir operations points: same-day dispatch, WMS-supported warehousing and reliable delivery.",
    },
    hero: {
      eyebrow: "Logistics & Operations Infrastructure",
      title: ["FROM GEBZE AND İZMİR", "TO 81 PROVINCES", "PLANNED DELIVERY"],
      body: "Our logistics network delivers fast, reliable and planned distribution to all 81 provinces from our operations points in Gebze and İzmir.",
      stats: [
        { target: 2, label: "Operations Centers", sub: "Gebze · İzmir" },
        { target: 50000, suffix: "+", label: "SKU", sub: "Continuous stock depth" },
        { value: "17:00", label: "Order Cutoff Time", sub: "Same-day dispatch" },
        { target: 81, label: "Provinces", sub: "Nationwide distribution coverage" },
      ],
    },
    delivery: {
      eyebrow: "Delivery Structure",
      heading: "Planned Dispatch",
      body: "Our stock depth and broad logistics network enable same-day dispatch for urgent needs and next-business-day dispatch for standard orders. Our Saturday dispatch capacity keeps the weekend covered.",
      featuredBadge: "Featured",
      cards: [
        {
          title: "Same-Day Dispatch",
          highlight: "17:00 Order Cutoff",
          desc: "For in-stock items, orders placed by 17:00 ship the same day, regardless of exactly when they came in.",
          featured: true,
        },
        {
          title: "Next-Day Delivery",
          highlight: "İstanbul and Surrounding Provinces",
          desc: "For standard orders, next-business-day delivery is targeted for customers in İstanbul and neighboring provinces.",
          featured: false,
        },
        {
          title: "Saturday Operations",
          highlight: "Uninterrupted Through the Weekend",
          desc: "Our dispatch capacity stays open on Saturdays as well. Orders that come in late during the week are covered by the Saturday loading option.",
          featured: false,
        },
      ],
    },
    depots: {
      eyebrow: "Operations Infrastructure",
      heading: "Nationwide Distribution from Gebze and İzmir",
      body: "From our two operations points, we reach the whole of Türkiye through a regular, structured dispatch network.",
      reachValue: "81 Provinces",
      reachLabel: "Nationwide Distribution",
      panels: [
        { title: "Gebze", caption: "Nationwide dispatch from Marmara.", image: "/images/operations-gebze-interior.webp", position: "50% 50%" },
        { title: "İzmir", caption: "Regional dispatch from the Aegean.", image: "/images/operations-izmir-interior.webp", position: "78% 50%" },
      ],
    },
    capabilities: {
      eyebrow: "Logistics Infrastructure",
      heading: "Systems and Quality",
      items: [
        { title: "Supply Source & Product Trust", desc: "Zero tolerance for unregistered or counterfeit product; every brand undergoes audited source verification and ongoing controls." },
        { title: "WMS-Supported Warehouse Management", desc: "Stock accuracy and order prep run under system control — error margin near zero." },
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

  // Dört adımlık süreç scroll'a bağlı gerçek bir ilerleme izler.
  // Adım Zamanlaması Turu #4 (canlı inceleme): üç 'reveal' + eşik-ayarı
  // turundan sonra da 04 "hâlâ fazla geç, modül neredeyse biterken değil
  // rahat görünürken aktifleşmeli" bulundu. Kök neden eşik dağılımı değildi
  // — 'reveal'in END hedefi (minVisibleAtEnd, elementin YÜKSEKLİĞİNE göre
  // bir taban) bu KISA satır için progress=1'de rect.top'ı NEGATİFE
  // düşürebiliyordu, yani 04 kendi penceresinin sonuna doğru zaten kısmen
  // kırpılıyordu. 'focus' modu (bkz. use-motion.ts) elementin TEPESİ yerine
  // MERKEZİNİ izler, giriş/çıkış hedefleri sabit viewport oranları (%88→%16)
  // — element yüksekliğinden bağımsız, progress=1'de bile satır her zaman
  // viewport'un üst kenarının İÇİNDE kalır, asla kırpılmaz.
  const [processRef, processProgress] = useSectionProgress<HTMLDivElement>("focus");
  // 'focus'un END'i artık kendi başına "hâlâ rahat görünür" garantisi
  // verdiğinden (üstteki not), eşit dağılım öne-yüklemeden daha okunaklı:
  // 04 progress %75'te aktifleşiyor — o anda satırın merkezi viewport'un
  // ~%34'ünde (üst-orta), hâlâ tamamen ekranda. 01-03 da kendi aralarında
  // eşit adımlarla, doğal bir ritimle ilerliyor.
  const STEP_THRESHOLDS = [0, 0.25, 0.5, 0.75]
  const activeStep = STEP_THRESHOLDS.filter((t) => processProgress >= t).length - 1

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

      {/* OPERASYON ALTYAPISI — Görsel Bütünleşme Turu 2: önceki turda "81 İl"
          DOM'da aynı <section>'a taşınmıştı ama hâlâ ayrı, tam genişlikte,
          kendi büyük lacivert bloğuyla (py-14/16, max-w-7xl'in DIŞINA taşan
          full-bleed) canlı QA'da "farklı bir bölüm" gibi okunuyordu — DOM
          bütünleşmesi görsel bütünleşme YERİNE GEÇMEDİ. Artık "81 İl" ayrı
          bir blok değil: fotoğraf çiftiyle AYNI konteynerde (aynı max-w-7xl,
          aynı yatay kenarlar), fotoğraf grid'iyle aynı dar boşlukla (mt-5
          lg:mt-6 — panel arası gap-5/gap-6 ile birebir aynı ritim) hemen
          altına oturan, aynı köşe yarıçapına (rounded-2xl) sahip KOMPAKT bir
          kapanış rayı — iki fotoğrafın "ulusal sonucu" gibi okunuyor, ayrı
          bir bölüm/KPI kartı/banner gibi değil. */}
      <section className="bg-white py-16 md:py-20 lg:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={ref} className="do-reveal max-w-4xl mb-8 md:mb-10 lg:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.depots.eyebrow}</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.depots.heading}</h2>
            <p className="text-slate-500 mt-3 text-[15px] leading-relaxed max-w-xl">{t.depots.body}</p>
          </div>

          {/* Kırpma notu: kaynak fotoğraflar geniş-format depo iç mekanı
              (1672x941, ~16:9) — eski md:aspect-[3/4] (dikey) kırpımı
              genişliğin yarısından fazlasını kesip "aşırı yakınlaştırılmış"
              hissi veriyordu. Artık tüm kırılımlarda ölçüsüz olmayan, geniş-
              formata daha sadık bir oran kullanılıyor; her panelin kendi
              object-position'ı (bkz. veri: Gebze ortalı, İzmir sağa yaslı —
              Opar tabelasının kadraj dışı kalmaması için) korunuyor.

              Görsel Bütünleşme Turu 3 (canlı inceleme — kullanıcı Turu 2'den
              SONRA da "81 İl hâlâ ayrı bir bant gibi duruyor" dedi): DOM
              bitişikliği ve eşit dış ritim (mt-5/6) yeterli gelmedi, çünkü
              üç eleman hâlâ GÖRSEL OLARAK üç ayrı köşeli/yuvarlatılmış kutu
              olarak kodlanıyordu (her biri kendi rounded-2xl + aralarında
              gerçek boşluk) — bir "galeri + ayrı banner" gibi okunmaya devam
              etti. Kök çözüm: üçü artık TEK bir dıştan yuvarlatılmış
              (rounded-2xl overflow-hidden) kap içinde, aralarında hiç boşluk
              olmadan bitişik — iki fotoğraf `gap-px` (bir piksellik nötr
              ayraç, galeri hissi) ile yan yana, 81 İl şeridi hemen altında
              sıfır boşlukla devam ediyor. Artık üç ayrı kart değil, TEK bir
              bileşik panel — 81 İl artık fotoğrafların "kapanışı" gibi değil,
              aynı nesnenin bir PARÇASI gibi okunuyor. */}
          <div ref={ref} className="do-reveal rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-px bg-slate-200">
              {t.depots.panels.map((panel: { title: string; caption: string; image: string; position: string }) => (
                <div
                  key={panel.title}
                  className="relative aspect-[4/3] lg:aspect-[16/10]"
                >
                  <img
                    src={panel.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: panel.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0e1016]/92 from-0% via-[#0e1016]/55 via-[35%] to-transparent to-[72%]" />
                  <div className="absolute inset-0 p-6 md:p-7 lg:p-8 flex flex-col justify-end text-white max-w-[85%] sm:max-w-[70%] lg:max-w-[88%]">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight">{panel.title}</h3>
                    <p className="mt-1.5 text-[13px] md:text-sm text-white/75 font-medium leading-snug">{panel.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 81 İL — artık ayrı bir kart DEĞİL, yukarıdaki fotoğraf
                ızgarasıyla aynı dış çerçevenin bitişik devamı (bkz. üstteki
                not). Kendi köşe yarıçapı/boşluğu yok. */}
            <div className="bg-[#1B3A8F] px-8 md:px-12 py-7 md:py-8 flex items-center justify-center gap-4 md:gap-5 text-white text-center">
              <span className="text-4xl md:text-5xl font-black tracking-tight tabular-nums">{t.depots.reachValue}</span>
              <span aria-hidden="true" className="w-px h-8 md:h-9 bg-white/25 shrink-0" />
              <span className="text-[#7d9bea] text-xs md:text-sm font-bold uppercase tracking-[0.2em]">{t.depots.reachLabel}</span>
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
          processProgress bu bloğun kendi scroll geçişini izler ('focus'
          modu — bkz. use-motion.ts'teki hook yorumu: modül viewport'a
          gerçekten girmeden progress 0'da kalır, satırın MERKEZİ viewport'un
          ~%88'inden ~%16'sına yükselirken 0→1'e ilerler — element
          yüksekliğinden bağımsız sabit bir viewport oranı olduğundan satır
          progress=1'de bile her zaman tamamen ekranda kalır, hiçbir adım
          kendi penceresinin sonunda kırpılmaz), üstteki ince çubuk gerçek
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

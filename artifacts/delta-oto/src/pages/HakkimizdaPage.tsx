import React from "react";
import { Link } from "wouter";
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  Globe,
  Award,
  Users,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  Gauge,
  Sprout,
  Package,
  Tag,
  Truck,
  Network,
  Route,
  Recycle,
  Laptop,
} from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useCounter, useReveal } from "../hooks/use-motion";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, routeFor, type Lang } from "@/lib/i18n";

// do-d1..do-d4: index.css'te tanımlı sabit stagger gecikmeleri (80/160/240/320ms).
// Tailwind'in JIT taraması bu sınıfları görmese de sorun değil — bunlar Tailwind
// utility'si değil, index.css'te elle yazılmış düz CSS kuralları.
const STAGGER_CLASSES = ["do-d1", "do-d2", "do-d3", "do-d4"];

// Dil-bağımsız yapısal veri (ikon, hedef sayı, yıl, pending bayrağı) modül
// seviyesinde sabit kalır; sadece görüntülenen metin (label/sub/title/desc)
// `content.tr`/`content.en`'den gelir ve component içinde index'e göre
// eşlenir (bkz. TedarikciPage'deki ADVANTAGE_ICONS deseni).
const FACT_ICONS = [Award, Globe, Users, TrendingUp];

// grouped: tr-TR binlik ayraç (nokta) uygulanır — sadece 1000 ve üzeri gerçek miktarlarda kullanılır (1976 bir yıl, ayraç almaz).
// NOT: toLocaleString("tr-TR") çağrısı StatCard içinde sabit — bu, sitedeki
// diğer sayaç bileşenleriyle (LandingPage CountUp, OperasyonPage CountUp)
// aynı, önceden kurulmuş davranıştır; bu görevin kapsamı dışında değiştirilmedi.
const FACT_META: { target: number; plus: boolean; grouped: boolean }[] = [
  { target: 1976, plus: false, grouped: false },
  { target: 118,  plus: false, grouped: false }, // Düzeltme: eskiden 40+ idi — sayfanın kendi groupauto.stats'ıyla (118 Ülke) tutarsızdı, gerçek resmi rakamla eşitlendi
  { target: 29,   plus: false, grouped: false }, // Düzeltme: resmi Groupauto International üye sayısı (29 Members) — bkz. aşağıdaki not
  { target: 100,  plus: true,  grouped: false }, // İçerik/UX Revizyon Notu: sitewide marka iddiası 250+ → 100+ değişti (bkz. content.*.facts.items[3])
];

// `pending: true` kayıtlar gerçek bir tarih ama henüz yazılmamış içerik demektir —
// uydurma olay eklemek yerine dürüstçe "detaylar ekleniyor" olarak işaretlenir.
// year/pending dil-bağımsızdır; label/desc content.*.timeline.items[i]'den gelir.
const MILESTONE_META: { year: string; pending: boolean }[] = [
  { year: "1976", pending: false },
  { year: "1990", pending: false },
  { year: "1998", pending: true },
  { year: "2005", pending: false },
  { year: "2010", pending: true },
  { year: "2015", pending: false },
  { year: "2020", pending: true },
  { year: "2026", pending: false },
];

const VALUE_ICONS = [ShieldCheck, BadgeCheck, Gauge, Sprout];
const BUSINESS_UNIT_ICONS = [Package, Tag, Truck, Network];
const ESG_ICONS = [Route, Recycle, Laptop];

// İçerik/UX Revizyon Notu (zorunlu düzeltmeler):
// 1) Groupauto International üyelik istatistik satırındaki üçüncü öğe
//    ("İhracat" / "Kapasitesi") Delta'nın KENDİSİNİN ihracat/uluslararası
//    dağıtım kapasitesine sahip olduğu iddiasıydı — şirket politikası bunu
//    yasaklıyor (Delta yalnızca Türkiye çapında dağıtım yapar; yalnızca
//    Groupauto International özel adı/ağı uluslararası olarak nitelenebilir).
// 2) Sitewide marka sayısı iddiası "250+" → "100+" olarak değişti (bkz.
//    FACT_META[3], BUSINESS_UNITS[0], MILESTONES[7]).
// 3) 2015 dönüm noktasındaki bir cümle kaldırıldı — Delta'nın kendisinin
//    ihracat yaptığı iddiasıydı; şirket Türkiye çapında bir distribütör
//    olarak konumlandırılır.
// 4) Düzeltme turu: yukarıdaki (1) maddesinin İLK düzeltmesinde yerine
//    konan "3.000+ Üye Firma" rakamı da desteksizdi (uydurma/doğrulanmamış
//    bir sayıydı, gerçek bir kaynağa dayanmıyordu). FACT_META[2] ve
//    groupauto.stats artık YALNIZCA GROUPAUTO International'ın kendi resmi
//    kamuya açık rakamlarından (29 Members / 71 Referenced Suppliers /
//    1.958 Distributors) alınan üç değeri kullanıyor — hiçbiri yukarı
//    yuvarlanmadı veya yeniden yorumlanmadı.
const content = {
  tr: {
    meta: {
      title: "Hakkımızda — 50 Yıllık Kurumsal Birikim | Delta Oto",
      description: "Delta Oto'nun 1976'dan bugüne kurumsal tarihçesi, değer çerçevesi, iş birimleri ve GROUPAUTO Türkiye üyeliği; 118 ülkede küresel tedarik gücü.",
    },
    hero: {
      eyebrow: "Kuruluş 1976 · Delta Oto",
      title: ["YARIM ASRIN", "KURUMSAL", "BİRİKİMİ"],
      body: "1976'dan bu yana otomotiv yedek parça dağıtım sektöründe faaliyet gösteren Delta Oto; güçlü tedarik altyapısı, geniş marka portföyü ve GROUPAUTO Türkiye üyeliğiyle sektörün yapıcı güçlerinden biri olmaya devam etmektedir.",
      cta: "Operasyon Altyapımızı İnceleyin",
    },
    facts: {
      eyebrow: "Rakamlarla Delta Oto",
      heading: "Kurumsal Ölçek ve Erişim",
      items: [
        { label: "Kuruluş Yılı", sub: "50 yıl sektör deneyimi" },
        { label: "Ülke Ağı", sub: "GROUPAUTO Türkiye" },
        { label: "Groupauto Üyesi", sub: "Küresel distribütör ağı" },
        { label: "Aktif Marka", sub: "Sürekli güncellenen portföy" },
      ],
    },
    timeline: {
      eyebrow: "Kurumsal Tarihçe",
      heading: "50 Yıllık Gelişim Kronolojisi",
      body: "Kuruluştan bugüne kat edilen mesafe; stratejik kararların, güçlü ortaklıkların ve disiplinli operasyonun bir ürünüdür. Dönemler arasında gezinmek için kartları kaydırın.",
      regionAriaLabel: "Kurumsal tarihçe, yatay kaydırılabilir zaman çizelgesi",
      comingSoon: "Yakında",
      pendingText: "Bu döneme ait detaylar yakında eklenecek.",
      prevAria: "Önceki dönem",
      nextAria: "Sonraki dönem",
      dotLabel: (year: string) => `${year} dönemine git`,
      items: [
        { label: "Kuruluş", desc: "Ümraniye'de temelleri atılan şirket, otomotiv aftermarket sektörünün kurucu distribütörleri arasında yerini aldı." },
        { label: "Portföy Genişlemesi", desc: "Tedarik ağının derinleşmesiyle birlikte İstanbul bölgesinde lider distribütör konumuna ulaşıldı; ürün kategorileri sistematik biçimde genişletildi." },
        { label: "", desc: "" },
        { label: "GROUPAUTO Üyeliği", desc: "Avrupa merkezli bağımsız aftermarket ağına tam üye olunarak küresel tedarik kanallarına, üretici anlaşmalarına ve piyasa bilgisine erişim sağlandı." },
        { label: "", desc: "" },
        { label: "Ulusal Lojistik Ağı", desc: "Türkiye'nin 81 iline kesintisiz teslimat kapasitesi kuruldu. Opar Ege bölge operasyonuyla dağıtım coğrafyası İzmir ve Ege'ye yayıldı." },
        { label: "", desc: "" },
        { label: "50. Kuruluş Yılı", desc: "100'den fazla aktif marka, binlerce müşteri ilişkisi ve yarım asrın kurumsal birikimiyle sektördeki yapıcı konumunu pekiştiriyor." },
      ],
    },
    values: {
      eyebrow: "Kurumsal İlkeler",
      heading: "Değer Çerçevemiz",
      body: "50 yıllık deneyim, dört temel kurumsal ilke üzerine inşa edilmiştir. Bu ilkeler her karar sürecinde referans alınır.",
      items: [
        { title: "Kurumsal Güvenilirlik", desc: "Ticari ilişkilerde öngörülebilirlik ve taahhüt bütünlüğü, Delta Oto'nun temel kurumsal kimliğini oluşturur. Her sipariş ve her iş birliği bu güven çerçevesinde yürütülür." },
        { title: "Ürün Kalite Güvencesi", desc: "Portföydeki her marka, denetimli kaynak doğrulamasından geçer. Kayıt dışı ve sahte ürün sıfır toleranstır; OEM ve OEM eşdeğeri standart zorunluluğu istisnasız uygulanır." },
        { title: "Operasyonel Mükemmellik", desc: "Siparişten teslimata uzanan sürecin her halkasında performans standardı titizlikle korunur. WMS destekli süreçler, stok doğruluğunu ve hız taahhüdünü güvence altına alır." },
        { title: "Sürdürülebilir Büyüme", desc: "Müşteri portföyünün rekabet gücünü artırmak ve uzun vadeli iş ortaklıkları kurmak, Delta Oto'nun büyüme stratejisinin merkezindedir. Kısa vadeli kâr yerine ilişki kalitesi önceliklidir." },
      ],
    },
    businessUnits: {
      eyebrow: "Faaliyet Alanları",
      heading: "İş Birimlerimiz",
      body: "Delta Oto, birbirini tamamlayan iş kollarıyla otomotiv satış sonrası sektöründe kapsamlı bir tedarik gücü sunmaktadır.",
      items: [
        { title: "Aftermarket Dağıtım", desc: "Binek ve hafif ticari araç kategorilerinde 100'den fazla küresel ve yerel marka distribütörlüğü. Türkiye'nin tamamına B2B kanalı üzerinden tedarik.", tags: ["100+ Marka", "50.000+ SKU", "B2B Portal"] },
        { title: "SPART Private Label", desc: "Delta Oto'nun özel dağıtım markası SPART; OEM eşdeğeri kaliteyi rekabetçi fiyat yapısıyla sunar. Fren, süspansiyon, motor ve elektrik kategorilerinde aktif portföy.", tags: ["OEM Eşdeğeri", "Rekabetçi Fiyat", "Geniş SKU Gamı"] },
        { title: "Ağır Vasıta Grubu", desc: "Kamyon, otobüs ve iş makinesi kategorilerinde seçilmiş marka ve ürün gamıyla ağır vasıta segmentine özel tedarik hizmeti.", tags: ["Kamyon", "Otobüs", "İş Makinesi"] },
        { title: "B2B Dijital Kanal", desc: "7/24 erişilebilen B2B portalı üzerinden anlık stok sorgulama, fiyat listeleri ve sipariş yönetimi. Müşteri operasyonlarına entegre dijital tedarik deneyimi.", tags: ["7/24 Erişim", "Anlık Stok", "Dijital Sipariş"] },
      ],
    },
    groupauto: {
      eyebrow: "Küresel Ağ",
      heading: "GROUPAUTO Türkiye Üyeliği",
      body: "Avrupa merkezli GROUPAUTO ağının Türkiye üyesi sıfatıyla, 118 ülkedeki distribütörler ve küresel üreticilerle doğrudan bağlantı içindeyiz. Bu üyelik; ürün erişimini, tedarik koşullarını ve piyasa bilgisini rakiplerimizin önünde konumlandırır.",
      stats: [["29", "Üye Ağ"], ["71", "Referans Tedarikçi"], ["1.958", "Distribütör"]] as [string, string][],
      exploreLink: "Marka Portföyümüzü İnceleyin",
      benefitsHeading: "Üyeliğin Faydaları",
      benefits: [
        { t: "Küresel Satın Alma Gücü", d: "Ortak müzakere kapasitesiyle üreticilerden daha rekabetçi koşullar ve fiyatlar elde edilir." },
        { t: "Ürün Erişim Önceliği", d: "Yeni model kapsamları ve tedarikçi başlatmaları Groupauto kanalı üzerinden öncelikli erişimle portföye eklenir." },
        { t: "Piyasa İstihbarat Ağı", d: "Avrupa ve bölge pazarlarındaki talep trendleri, üretici haberleri ve fiyat hareketleri üye ağı üzerinden gerçek zamanlı takip edilir." },
        { t: "Kalite Protokolleri", d: "Groupauto tedarikçi kalite standartları, ürün doğrulama ve katalog yönetim süreçlerine doğrudan entegre edilmektedir." },
      ],
    },
    esg: {
      eyebrow: "Kurumsal Sorumluluk",
      heading: "Çevre ve Sürdürülebilirlik",
      body: "Lojistik ve operasyon süreçlerimizde çevresel etkiyi azaltmaya yönelik uygulamalar hayata geçirilmektedir.",
      imageAlt: "Delta Oto lojistik deposu",
      overlayLabel: "Gerçek Operasyon",
      overlayText: "Uygulamalar, Delta Oto'nun kendi lojistik merkezlerinde hayata geçirilir.",
      items: [
        { title: "Lojistik Optimizasyonu", desc: "Rota planlaması ve yük konsolidasyonuyla teslimat başına karbon ayak izinin azaltılması hedeflenmektedir." },
        { title: "Ambalaj ve Atık Yönetimi", desc: "Tedarikçilerle birlikte yürütülen ambalaj azaltım çalışmaları ile depo atık yönetimi süreçleri hayata geçirilmiştir." },
        { title: "Sayısal Dönüşüm", desc: "Kağıtsız sipariş ve fatura süreçleri, B2B portal entegrasyonuyla müşteri operasyonlarına sunulmaktadır." },
      ],
    },
    cta: {
      heading: "Delta Oto ile İş Ortaklığına Başlayın",
      body: "50 yıllık kurumsal birikimimizle tanışın; B2B portalımızdan sipariş verin veya ekibimizle doğrudan iletişime geçin.",
      b2b: "B2B Portal",
      contact: "İletişim",
    },
  },
  en: {
    meta: {
      title: "About Us — 50 Years of Institutional Heritage | Delta Oto",
      description: "Delta Oto's corporate history, value framework, business units and GROUPAUTO Türkiye membership since 1976 — global supply strength across 118 countries.",
    },
    hero: {
      eyebrow: "Founded 1976 · Delta Oto",
      title: ["HALF A CENTURY OF", "INSTITUTIONAL", "HERITAGE"],
      body: "Delta Oto has operated in the automotive spare parts distribution industry since 1976. With a strong supply infrastructure, a broad brand portfolio and its GROUPAUTO Türkiye membership, it continues to be one of the industry's constructive forces.",
      cta: "Explore Our Operations Infrastructure",
    },
    facts: {
      eyebrow: "Delta Oto by the Numbers",
      heading: "Corporate Scale and Reach",
      items: [
        { label: "Founding Year", sub: "50 years of industry experience" },
        { label: "Country Network", sub: "GROUPAUTO Türkiye" },
        { label: "GROUPAUTO Members", sub: "Global distributor network" },
        { label: "Active Brands", sub: "Continuously updated portfolio" },
      ],
    },
    timeline: {
      eyebrow: "Corporate History",
      heading: "A 50-Year Timeline of Growth",
      body: "The distance covered from our founding to today is the product of strategic decisions, strong partnerships and disciplined operations. Scroll the cards to move between periods.",
      regionAriaLabel: "Corporate history, horizontally scrollable timeline",
      comingSoon: "Coming Soon",
      pendingText: "Details for this period will be added soon.",
      prevAria: "Previous period",
      nextAria: "Next period",
      dotLabel: (year: string) => `Go to ${year}`,
      items: [
        { label: "Founding", desc: "Founded in Ümraniye, the company took its place among the founding distributors of the automotive aftermarket industry." },
        { label: "Portfolio Expansion", desc: "As the supply network deepened, the company reached a leading distributor position in the İstanbul region; product categories were systematically expanded." },
        { label: "", desc: "" },
        { label: "GROUPAUTO Membership", desc: "Full membership in the Europe-based independent aftermarket network provided access to global supply channels, manufacturer agreements and market intelligence." },
        { label: "", desc: "" },
        { label: "National Logistics Network", desc: "Uninterrupted delivery capacity to all 81 provinces of Turkey was established. With the Opar Aegean regional operation, distribution coverage expanded to İzmir and the Aegean region." },
        { label: "", desc: "" },
        { label: "50th Anniversary", desc: "With more than 100 active brands, thousands of customer relationships and half a century of institutional heritage, the company reinforces its constructive position in the industry." },
      ],
    },
    values: {
      eyebrow: "Corporate Principles",
      heading: "Our Value Framework",
      body: "Fifty years of experience are built on four core corporate principles. These principles are the reference point in every decision-making process.",
      items: [
        { title: "Corporate Reliability", desc: "Predictability and integrity of commitment in business relationships form the core of Delta Oto's corporate identity. Every order and every partnership is carried out within this framework of trust." },
        { title: "Product Quality Assurance", desc: "Every brand in the portfolio undergoes audited source verification. Unregistered and counterfeit products are subject to zero tolerance; the OEM or OEM-equivalent standard requirement is applied without exception." },
        { title: "Operational Excellence", desc: "Performance standards are carefully maintained at every link in the process from order to delivery. WMS-supported processes safeguard stock accuracy and our commitment to speed." },
        { title: "Sustainable Growth", desc: "Strengthening the competitiveness of our customer portfolio and building long-term business partnerships are at the center of Delta Oto's growth strategy. Relationship quality takes priority over short-term profit." },
      ],
    },
    businessUnits: {
      eyebrow: "Areas of Activity",
      heading: "Our Business Units",
      body: "With complementary lines of business, Delta Oto offers comprehensive supply capability in the automotive aftersales industry.",
      items: [
        { title: "Aftermarket Distribution", desc: "Distribution of more than 100 global and domestic brands across passenger and light commercial vehicle categories, supplying all of Turkey through the B2B channel.", tags: ["100+ Brands", "50,000+ SKUs", "B2B Portal"] },
        { title: "SPART Private Label", desc: "SPART, Delta Oto's private-label distribution brand, delivers OEM-equivalent quality at a competitive price structure, with an active portfolio in brake, suspension, engine and electrical categories.", tags: ["OEM Equivalent", "Competitive Pricing", "Wide SKU Range"] },
        { title: "Heavy-Duty Vehicle Group", desc: "Dedicated supply service for the heavy-duty vehicle segment, with a select range of brands and products in the truck, bus and heavy-equipment categories.", tags: ["Trucks", "Buses", "Heavy Equipment"] },
        { title: "B2B Digital Channel", desc: "Real-time stock lookup, price lists and order management through a B2B portal accessible around the clock — a digital supply experience integrated into customer operations.", tags: ["24/7 Access", "Real-Time Stock", "Digital Ordering"] },
      ],
    },
    groupauto: {
      eyebrow: "Global Network",
      heading: "GROUPAUTO Türkiye Membership",
      body: "As the Turkey member of the Europe-based GROUPAUTO network, we are directly connected with distributors and global manufacturers across 118 countries. This membership puts our product access, supply terms and market intelligence ahead of our competitors.",
      stats: [["29", "Members"], ["71", "Referenced Suppliers"], ["1,958", "Distributors"]] as [string, string][],
      exploreLink: "Explore Our Brand Portfolio",
      benefitsHeading: "Benefits of Membership",
      benefits: [
        { t: "Global Purchasing Power", d: "Shared negotiating capacity secures more competitive terms and prices from manufacturers." },
        { t: "Priority Product Access", d: "New model coverage and supplier launches are added to the portfolio with priority access through the GROUPAUTO channel." },
        { t: "Market Intelligence Network", d: "Demand trends, manufacturer news and price movements across European and regional markets are tracked in real time through the member network." },
        { t: "Quality Protocols", d: "GROUPAUTO supplier quality standards are directly integrated into our product verification and catalog management processes." },
      ],
    },
    esg: {
      eyebrow: "Corporate Responsibility",
      heading: "Environment and Sustainability",
      body: "Practices aimed at reducing environmental impact are being implemented across our logistics and operational processes.",
      imageAlt: "Delta Oto logistics warehouse",
      overlayLabel: "Real Operations",
      overlayText: "These practices are implemented at Delta Oto's own logistics centers.",
      items: [
        { title: "Logistics Optimization", desc: "Route planning and load consolidation aim to reduce the carbon footprint per delivery." },
        { title: "Packaging and Waste Management", desc: "Packaging-reduction efforts carried out together with our suppliers, along with warehouse waste management processes, have been put into practice." },
        { title: "Digital Transformation", desc: "Paperless ordering and invoicing processes are made available to customer operations through B2B portal integration." },
      ],
    },
    cta: {
      heading: "Start a Business Partnership with Delta Oto",
      body: "Get to know our 50 years of institutional heritage; place an order through our B2B portal or contact our team directly.",
      b2b: "B2B Portal",
      contact: "Contact",
    },
  },
} satisfies Record<Lang, any>;

/** Kurumsal Rakamlar kartı: kart görünüre girince hedef değere sayarak ulaşır (LandingPage'deki MetricItem/CountUp desenine benzer, bu sayfaya özgü sadeleştirilmiş hali). */
function StatCard({ icon: Icon, target, plus, grouped, label, sub }: {
  icon: React.ElementType;
  target: number;
  plus: boolean;
  grouped: boolean;
  label: string;
  sub: string;
}) {
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

  const display = grouped ? count.toLocaleString("tr-TR") : String(count);

  return (
    <div ref={ref} className="border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all group">
      <div className="w-11 h-11 bg-[#1B3A8F]/[0.07] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1B3A8F]/[0.12] transition-colors">
        <Icon className="w-5 h-5 text-[#1B3A8F]" />
      </div>
      <div className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight tabular-nums">
        {display}{plus ? "+" : ""}
      </div>
      <div className="text-[12px] font-bold text-[#1B3A8F] uppercase tracking-wider mt-2">{label}</div>
      <div className="text-[12px] text-slate-400 mt-1 leading-snug">{sub}</div>
    </div>
  );
}

/**
 * Zaman Çizgisi: dikey liste yerine yatay scroll-snap kart rayı. Ortalanan kart
 * IntersectionObserver ile "aktif" işaretlenip büyütülür — StatCard'daki gözlemci
 * kurulumuyla aynı temel API (yeni bir animasyon sistemi değil), sadece amacı
 * sayaç tetiklemek yerine hangi kartın odakta olduğunu takip etmek.
 *
 * `pending: true` kayıtlar (bkz. MILESTONE_META üstteki not) kesikli kenarlık, düşük
 * opaklık ve açık "Yakında" etiketiyle dürüst placeholder olarak kalır; uydurma
 * başlık/açıklama eklenmez.
 */
function MilestoneTimeline({ t }: { t: (typeof content)["tr"]["timeline"] }) {
  const MILESTONES = MILESTONE_META.map((m, i) => ({ ...m, ...t.items[i] }));
  const reveal = useReveal();
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = React.useState(0);
  // İlk/son birkaç kart, rayın dolgusu/genişliği yüzünden hiçbir zaman TAM
  // ortalanamıyor (scrollIntoView'ın hedeflediği scrollLeft negatif çıkıyor ya
  // da maxScrollLeft'i aşıyor, tarayıcı 0'a/maxScrollLeft'e klipliyor) — bu da
  // örn. kart 0 ve 1'in (aynı şekilde son iki kartın) AYNI fiziksel
  // scrollLeft'e kliplenmesine yol açar. IntersectionObserver salt geometriyle
  // bu iki index'i hiçbir zaman ayırt edemez ve "sol" hep aynı komşu karta
  // geri sıçrar/takılır kalırdı. Çözüm: programatik gezinmede (buton/nokta
  // tıklaması) hedef index doğrudan ve iyimser olarak yazılır; observer
  // yalnızca elle/organik kaydırma sırasında devrede kalır.
  const navigatingRef = React.useRef(false);
  const hasScrolledRef = React.useRef(false);
  const navigateTimeoutRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => { hasScrolledRef.current = true; };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => {
        // Mount anında (henüz hiç kaydırma olmamışken) observer'ın kendi ilk
        // ölçümüyle veya programatik bir gezinme sürerken `active`'i ezmesini
        // engeller — bkz. yukarıdaki not.
        if (navigatingRef.current || !hasScrolledRef.current) return;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActive(idx);
        });
      },
      // Kök olarak scroller'ın kendisi kullanılır (sayfa değil); sadece orta
      // ~24%'lik bant kesişim sayılır, böylece o an ortalanan kart "aktif" olur.
      { root: scroller, threshold: 0, rootMargin: "0px -38% 0px -38%" }
    );
    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => {
      obs.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      window.clearTimeout(navigateTimeoutRef.current);
    };
  }, []);

  const scrollToIndex = (i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    setActive(i);
    navigatingRef.current = true;
    window.clearTimeout(navigateTimeoutRef.current);
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
    // Smooth scroll (+ CSS snap'in kendi yerleşmesi) tamamlanana kadar
    // observer'ı devre dışı tut; scrollend desteği varsa onu, yoksa süre
    // bazlı bir geri dönüşü kullan.
    const scroller = scrollerRef.current;
    const clearNavigating = () => { navigatingRef.current = false; };
    if (scroller && "onscrollend" in scroller) {
      scroller.addEventListener("scrollend", clearNavigating, { once: true });
    } else {
      navigateTimeoutRef.current = window.setTimeout(clearNavigating, reduceMotion ? 50 : 600);
    }
  };

  const step = (dir: 1 | -1) => scrollToIndex(Math.min(Math.max(active + dir, 0), MILESTONES.length - 1));

  return (
    <section className="bg-[#1B3A8F] py-24 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={reveal} className="do-reveal mb-14 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">{t.eyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">{t.heading}</h2>
          <p className="text-white/75 mt-3 text-[15px]">{t.body}</p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          role="region"
          aria-label={t.regionAriaLabel}
          tabIndex={0}
          className="do-hide-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 pl-6 pr-6 lg:pl-8 lg:pr-8"
        >
          {MILESTONES.map((m, i) => {
            const isActive = active === i;
            return (
              <div
                key={m.year}
                ref={(el) => { cardRefs.current[i] = el; }}
                data-index={i}
                className={[
                  "shrink-0 snap-center rounded-xl border flex flex-col overflow-hidden transition-all duration-500",
                  "w-[78vw] sm:w-[340px] lg:w-[360px]",
                  m.pending
                    ? "border-dashed border-white/25 bg-white/[0.03]"
                    : isActive
                      ? "border-[#7d9bea]/50 bg-white/[0.10]"
                      : "border-white/[0.12] bg-white/[0.05]",
                  isActive ? "opacity-100" : "opacity-50",
                ].join(" ")}
              >
                <div className="aspect-video do-grid-bg bg-black/10 flex items-end p-6 relative">
                  <span
                    className={`inline-block font-black text-6xl leading-none tracking-tight text-white origin-bottom-left transition-transform duration-500 ${isActive ? "scale-100" : "scale-[0.7]"}`}
                  >
                    {m.year}
                  </span>
                </div>
                <div className="h-px bg-white/10 mx-6" />
                <div className="p-6 pt-5 flex-1 flex flex-col">
                  {m.pending ? (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/45 mb-3">
                        <Clock className="w-3.5 h-3.5" strokeWidth={2} /> {t.comingSoon}
                      </span>
                      <p className="text-white/55 text-[13px] italic leading-relaxed">{t.pendingText}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-[15px] font-bold text-white mb-2 leading-snug">{m.label}</h3>
                      <p className="text-white/70 text-[13px] leading-relaxed">{m.desc}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          <div className="shrink-0 w-1" aria-hidden="true" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 lg:w-20 bg-gradient-to-r from-[#1B3A8F] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 lg:w-20 bg-gradient-to-l from-[#1B3A8F] to-transparent" />

        <button
          type="button"
          onClick={() => step(-1)}
          disabled={active === 0}
          aria-label={t.prevAria}
          className="hidden lg:flex items-center justify-center absolute left-3 top-[38%] -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:border-white/30 transition-colors disabled:opacity-25 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={active === MILESTONES.length - 1}
          aria-label={t.nextAria}
          className="hidden lg:flex items-center justify-center absolute right-3 top-[38%] -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:border-white/30 transition-colors disabled:opacity-25 disabled:pointer-events-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 flex items-center gap-2 flex-wrap">
        {MILESTONES.map((m, i) => (
          <button
            key={m.year}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-current={active === i}
            aria-label={t.dotLabel(m.year)}
            className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-9 bg-[#7d9bea]" : "w-4 bg-white/25 hover:bg-white/45"}`}
          />
        ))}
      </div>
    </section>
  );
}

export function HakkimizdaPage() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);

  // Değerler ve Sürdürülebilirlik panelleri aynı gözlemciyi paylaşır (StatCard'ın
  // ayrı IntersectionObserver kurma deseni yerine, çok-elemanlı useReveal kaydı).
  const reveal = useReveal();

  // Dil-bağımsız yapısal veri (ikon) + dile göre değişen metin (label/sub/title/desc/tags)
  // burada index'e göre birleştirilir — bkz. modül üstü FACT_META/VALUE_ICONS/vb. notu.
  const FACT_STATS = FACT_META.map((m, i) => ({ ...m, icon: FACT_ICONS[i], label: t.facts.items[i].label, sub: t.facts.items[i].sub }));
  const VALUES = t.values.items.map((v, i) => ({ ...v, icon: VALUE_ICONS[i] }));
  const BUSINESS_UNITS = t.businessUnits.items.map((b, i) => ({ ...b, icon: BUSINESS_UNIT_ICONS[i] }));
  const ESG_ITEMS = t.esg.items.map((e, i) => ({ ...e, icon: ESG_ICONS[i] }));

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/delta-oto-hero.png"
            alt=""
            className="w-full h-full object-cover opacity-25"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-16 lg:py-28">
          <div className="flex items-center gap-3 mb-5 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">{t.hero.eyebrow}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-6">
            <span className="do-hero-line">{t.hero.title[0]}</span><br />
            <span className="text-white">{t.hero.title[1]}</span><br />
            <span className="text-[#7d9bea]">{t.hero.title[2]}</span>
          </h1>
          <p className="text-base text-gray-300 leading-[1.8] max-w-2xl mb-6 lg:mb-10 font-light">
            {t.hero.body}
          </p>
          <Link
            href={routeFor("operations", lang)}
            className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            {t.hero.cta} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* KURUMSAL RAKAMLAR — light */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.facts.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.facts.heading}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {FACT_STATS.map((stat, i) => (
              <div key={stat.target} ref={reveal} className={`do-reveal ${STAGGER_CLASSES[i] ?? ""}`}>
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <MilestoneTimeline t={t.timeline} />

      {/* DEĞERLER — white, kart-grid yerine tam genişlik bölmeli editorial panel */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.values.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.values.heading}</h2>
            <p className="text-slate-500 mt-3 text-[15px]">{t.values.body}</p>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-slate-200">
              {VALUES.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  ref={reveal}
                  className={`do-reveal ${STAGGER_CLASSES[i] ?? ""} group relative bg-white px-7 py-10 lg:py-12 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-[#1B3A8F] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 right-4 text-[104px] leading-none font-black text-slate-100 group-hover:text-white/10 transition-colors duration-500 select-none"
                  >
                    0{i + 1}
                  </span>
                  <div className="relative">
                    <Icon className="w-8 h-8 text-[#1B3A8F] group-hover:text-white mb-8 transition-colors duration-300" strokeWidth={1.5} />
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-white mb-4 leading-snug transition-colors duration-300">{title}</h3>
                    <p className="text-slate-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-300">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* İŞ BİRİMLERİ — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">{t.businessUnits.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">{t.businessUnits.heading}</h2>
            <p className="text-white/75 mt-3 max-w-xl text-[15px]">{t.businessUnits.body}</p>
          </div>
          {/* Kart ızgarası yerine numaralı editoryal satır listesi — bu sayfada
              iki bölüm üstteki VALUES paneli ve Operasyon'un OPS_GROUPS listesi
              aynı deseni (büyük soluk index numarası + ikon + metin, kart değil)
              kullanıyor; İş Birimlerimiz aynı ızgara+kart tekrarını kırıyor. */}
          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {BUSINESS_UNITS.map(({ icon: Icon, title, desc, tags }, i) => (
              <div
                key={title}
                ref={reveal}
                className={`do-reveal ${STAGGER_CLASSES[i] ?? ""} group/row flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-7 hover:bg-white/[0.03] transition-colors duration-300 rounded-lg -mx-4 px-4`}
              >
                <div className="flex items-center gap-5 shrink-0 sm:w-72">
                  <span className="text-4xl sm:text-5xl font-black text-white/[0.12] group-hover/row:text-[#7d9bea]/40 tabular-nums leading-none transition-colors duration-300 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-11 h-11 bg-white/10 border border-white/15 rounded-xl flex items-center justify-center shrink-0 group-hover/row:bg-[#7d9bea]/15 group-hover/row:border-[#7d9bea]/30 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#7d9bea]" />
                  </div>
                  <h3 className="text-[15px] font-bold leading-snug">{title}</h3>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/75 text-sm leading-relaxed">{desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {tags.map(tag => <span key={tag} className="text-[11px] bg-white/10 border border-white/15 text-white/70 px-2.5 py-1 rounded-full">{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROUPAUTO — dark */}
      {/* Not: eskiden burada çok düşük opaklıkta (opacity-10, üstüne de
          %80 siyah katman) jenerik bir depo görseli (delta-oto-ops.png)
          vardı — pratikte görünmez denecek kadar silikti. delta-oto-depot.jpg'i
          burada da (dördüncü kez) kullanmak tekrar hissini güçlendireceğinden,
          görsel katman tamamen kaldırıldı; grid doku zaten yeterli zemin
          dokusu sağlıyor. */}
      <section className="relative bg-[#0e1016] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div ref={reveal} className="do-reveal-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">{t.groupauto.eyebrow}</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">{t.groupauto.heading}</h2>
              <p className="text-gray-300 leading-[1.85] text-base mb-8 max-w-lg">
                {t.groupauto.body}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
                {t.groupauto.stats.map(([n, l]) => (
                  <div key={l} className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-5 text-center">
                    <div className="text-2xl font-black text-white mb-1">{n}</div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wide">{l}</div>
                  </div>
                ))}
              </div>
              <Link href={routeFor("partners", lang)} className="inline-flex items-center gap-2 text-[#7d9bea] text-[14px] font-semibold hover:text-white transition-colors group">
                {t.groupauto.exploreLink} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div ref={reveal} className="do-reveal-right space-y-4">
              <h3 className="text-[15px] font-bold text-white/80 uppercase tracking-widest mb-6">{t.groupauto.benefitsHeading}</h3>
              {t.groupauto.benefits.map(item => (
                <div key={item.t} className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-5 hover:bg-white/[0.1] transition-colors">
                  <h4 className="text-[15px] font-bold mb-1.5">{item.t}</h4>
                  <p className="text-white/75 text-sm leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SÜRDÜRÜLEBİLİRLİK — light, kart grid yerine gerçek depo görseli + editorial liste ikilisi */}
      <section className="bg-[#f8fafc] py-20 lg:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.esg.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.esg.heading}</h2>
            <p className="text-slate-500 mt-3 text-[15px]">{t.esg.body}</p>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm grid lg:grid-cols-5">
            {/* Gerçek tesis görseli: konuya uydurma stok görsel yerine Delta Oto'nun kendi deposu */}
            <div ref={reveal} className="do-reveal-left relative lg:col-span-2 aspect-video lg:aspect-auto min-h-[260px]">
              <img
                src="/images/delta-oto-depot.jpg"
                alt={t.esg.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016]/85 via-[#0e1016]/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em] block mb-1.5">{t.esg.overlayLabel}</span>
                <p className="text-white/85 text-sm leading-snug max-w-xs">{t.esg.overlayText}</p>
              </div>
            </div>

            <div ref={reveal} className="do-reveal-right lg:col-span-3 bg-white divide-y divide-slate-200">
              {ESG_ITEMS.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="group relative flex gap-4 sm:gap-6 items-start p-5 sm:p-7 lg:p-8 hover:bg-slate-50/80 transition-colors duration-300">
                  <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1 bg-[#1B3A8F] transition-all duration-300" aria-hidden="true" />
                  <Icon className="w-7 h-7 text-[#1B3A8F] shrink-0 mt-0.5" strokeWidth={1.5} />
                  {/* min-w-0: flex item'ların varsayılan min-width:auto'suna karşı
                      koruma — metin uzun kelime içermese de garanti şekilde
                      sarmalanır, satır taşma riski kalmaz. */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 tracking-wider">0{i + 1}</span>
                    <h3 className="text-lg font-black text-slate-900 mt-1 mb-2 leading-snug">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-md">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KAPANIŞ CTA — navy (footer öncesi son bölüm daima #1B3A8F olmalı; ESG'nin rengi değişmedi, araya yeni bant eklendi) */}
      <section className="bg-[#1B3A8F] py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div ref={reveal} className="do-reveal-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">{t.cta.heading}</h2>
            <p className="text-white/75 text-sm mt-2 max-w-lg">{t.cta.body}</p>
          </div>
          <div ref={reveal} className="do-reveal-right flex gap-4 shrink-0">
            <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="bg-white text-[#1B3A8F] font-bold px-7 py-3.5 rounded-md hover:bg-gray-100 transition-colors text-sm inline-flex items-center gap-2 group">
              {t.cta.b2b}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link href={routeFor("contact", lang)} className="border border-white/30 hover:border-white/60 text-white font-medium px-7 py-3.5 rounded-md transition-colors text-sm">
              {t.cta.contact}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

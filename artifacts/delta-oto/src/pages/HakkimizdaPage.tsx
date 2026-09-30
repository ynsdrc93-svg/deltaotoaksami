import React from "react";
import { Link } from "wouter";
import {
  ChevronRight,
  ChevronDown,
  Clock,
  Globe,
  Award,
  Users,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  Gauge,
  Sprout,
  Route,
  Recycle,
  Laptop,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useCounter, useReveal, useViewportFocusIndex } from "../hooks/use-motion";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, routeFor, gundemAnchor, gundemDetailRoute, type Lang } from "@/lib/i18n";
import { AGENDA_ITEMS } from "@/lib/agenda";

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
// Turu 5 düzeltmesi: `group` alanı eklendi — "Rakamlarla Delta Oto" eskiden
// dört rakamı TEK, ayrışmamış bir gridde gösteriyordu; bunlardan ikisi
// (1976, 100+) Delta Oto'NUN KENDİ rakamı, diğer ikisi (118, 29) ise
// GROUPAUTO International'ın KENDİ resmi rakamı (Delta yalnızca üyesi
// olduğu bir ağın parçası) — hiçbir görsel/metinsel ayrım olmadan yan yana
// durmaları "bu sayı kime ait?" belirsizliğine yol açıyordu (canlı geri
// bildirim). Artık render iki ayrı, açıkça etiketli alt gruba bölünüyor
// (bkz. aşağıdaki render'da DELTA_FACTS/NETWORK_FACTS filtrelemesi) — sayı
// değerleri DEĞİŞMEDİ, yalnızca hangi gruba ait oldukları artık açık.
// `id` (Turu 5, CMS Hazırlık): önceden React key'i doğrudan `target`
// (rakamın kendisi) idi — kırılgan, çünkü rakam ileride güncellenirse
// (ör. "100" → "105") aynı zamanda kaydın "kimliği" de değişmiş olurdu.
// Artık ayrı, rakamdan bağımsız sabit bir string id var — REASON_META
// (TedarikciPage.tsx) ve MILESTONE_META ile aynı kalıp.
const FACT_META: { id: string; target: number; plus: boolean; grouped: boolean; group: "delta" | "network" }[] = [
  { id: "founding-year", target: 1976, plus: false, grouped: false, group: "delta" },
  { id: "country-network", target: 118,  plus: false, grouped: false, group: "network" }, // Düzeltme: eskiden 40+ idi — sayfanın kendi groupauto.stats'ıyla (118 Ülke) tutarsızdı, gerçek resmi rakamla eşitlendi
  { id: "groupauto-members", target: 29,   plus: false, grouped: false, group: "network" }, // Düzeltme: resmi Groupauto International üye sayısı (29 Members) — bkz. aşağıdaki not
  { id: "active-brands", target: 100,  plus: true,  grouped: false, group: "delta" }, // İçerik/UX Revizyon Notu: sitewide marka iddiası 250+ → 100+ değişti (bkz. content.*.facts.items[3])
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
      title: "Hakkımızda — Otomotiv Aftermarket'in 50+ Yıllık Kurumsal Birikimi | Delta Oto",
      description: "Delta Oto'nun 1976'dan bugüne kurumsal tarihçesi, değer çerçevesi, iş birimleri ve GROUPAUTO Türkiye üyeliği; 118 ülkede küresel tedarik gücü.",
    },
    hero: {
      eyebrow: "Kuruluş 1976 · Delta Oto",
      title: ["OTOMOTİV AFTERMARKET'İN", "50+ YILLIK", "KURUMSAL BİRİKİMİ"],
      body: "1976'dan bu yana otomotiv yedek parça dağıtım sektöründe faaliyet gösteren Delta Oto; güçlü tedarik altyapısı, geniş marka portföyü ve GROUPAUTO Türkiye üyeliğiyle sektörün yapıcı güçlerinden biri olmaya devam etmektedir.",
      cta: "Operasyon Altyapımızı İnceleyin",
    },
    facts: {
      eyebrow: "Rakamlarla Delta Oto",
      heading: "Kurumsal Ölçek ve Erişim",
      groupDeltaLabel: "Delta Oto Ölçeği",
      groupNetworkLabel: "Ağ / Ekosistem Erişimi",
      groupNetworkNote: "GROUPAUTO Türkiye üyeliği üzerinden",
      networkBadge: "GROUPAUTO",
      items: [
        { label: "Kuruluş Yılı", sub: "50+ yıl sektör deneyimi" },
        { label: "Ülke Ağı", sub: "Distribütör kapsama alanı" },
        { label: "Groupauto Üyesi", sub: "Küresel distribütör ağı" },
        { label: "Aktif Marka", sub: "Sürekli güncellenen portföy" },
      ],
    },
    timeline: {
      eyebrow: "Kurumsal Tarihçe",
      heading: "50+ Yıllık Gelişim Kronolojisi",
      listAriaLabel: "Kuruluştan bugüne kurumsal tarihçe zaman çizelgesi",
      comingSoon: "Yakında",
      pendingText: "Bu döneme ait detaylar yakında eklenecek.",
      items: [
        { label: "Kuruluş", desc: "Ümraniye'de temelleri atılan şirket, otomotiv aftermarket sektörünün kurucu distribütörleri arasında yerini aldı." },
        { label: "Portföy Genişlemesi", desc: "Tedarik ağının derinleşmesiyle birlikte İstanbul bölgesinde lider distribütör konumuna ulaşıldı; ürün kategorileri sistematik biçimde genişletildi." },
        { label: "", desc: "" },
        { label: "GROUPAUTO Üyeliği", desc: "Avrupa merkezli bağımsız aftermarket ağına tam üye olunarak küresel tedarik kanallarına, üretici anlaşmalarına ve piyasa bilgisine erişim sağlandı." },
        { label: "", desc: "" },
        { label: "Ulusal Lojistik Ağı", desc: "Türkiye'nin 81 iline kesintisiz teslimat kapasitesi kuruldu. Opar Ege bölge operasyonuyla dağıtım coğrafyası İzmir ve Ege'ye yayıldı." },
        { label: "", desc: "" },
        { label: "50. Kuruluş Yılı", desc: "100'den fazla aktif marka, binlerce müşteri ilişkisi ve 50+ yıllık kurumsal birikimiyle sektördeki yapıcı konumunu pekiştiriyor." },
      ],
    },
    values: {
      eyebrow: "Kurumsal İlkeler",
      heading: "Değer Çerçevemiz",
      body: "50+ yıllık deneyim, dört temel kurumsal ilke üzerine inşa edilmiştir. Bu ilkeler her karar sürecinde referans alınır.",
      items: [
        { title: "Kurumsal Güvenilirlik", desc: "Ticari ilişkilerde öngörülebilirlik ve taahhüt bütünlüğü, Delta Oto'nun temel kurumsal kimliğini oluşturur. Her sipariş ve her iş birliği bu güven çerçevesinde yürütülür." },
        { title: "Ürün Kalite Güvencesi", desc: "Portföydeki her marka, denetimli kaynak doğrulamasından geçer. Kayıt dışı ve sahte ürün sıfır toleranstır; OEM ve OEM eşdeğeri standart zorunluluğu istisnasız uygulanır." },
        { title: "Operasyonel Mükemmellik", desc: "Siparişten teslimata uzanan sürecin her halkasında performans standardı titizlikle korunur. WMS destekli süreçler, stok doğruluğunu ve hız taahhüdünü güvence altına alır." },
        { title: "Sürdürülebilir Büyüme", desc: "Müşteri portföyünün rekabet gücünü artırmak ve uzun vadeli iş ortaklıkları kurmak, Delta Oto'nun büyüme stratejisinin merkezindedir. Kısa vadeli kâr yerine ilişki kalitesi önceliklidir." },
      ],
    },
    gundem: {
      eyebrow: "Gündem",
      heading: "Sahadaki Gelişmeler",
      readMore: "Devamını Oku",
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
      body: "50+ yıllık kurumsal birikimimizle tanışın; B2B portalımızdan sipariş verin veya ekibimizle doğrudan iletişime geçin.",
      b2b: "B2B Portal",
      contact: "İletişim",
    },
  },
  en: {
    meta: {
      title: "About Us — 50+ Years of Corporate Experience in the Automotive Aftermarket | Delta Oto",
      description: "Delta Oto's corporate history, value framework, business units and GROUPAUTO Türkiye membership since 1976 — global supply strength across 118 countries.",
    },
    hero: {
      eyebrow: "Founded 1976 · Delta Oto",
      title: ["50+ YEARS OF", "CORPORATE EXPERIENCE", "IN THE AUTOMOTIVE AFTERMARKET"],
      body: "Delta Oto has operated in the automotive spare parts distribution industry since 1976. With a strong supply infrastructure, a broad brand portfolio and its GROUPAUTO Türkiye membership, it continues to be one of the industry's constructive forces.",
      cta: "Explore Our Operations Infrastructure",
    },
    facts: {
      eyebrow: "Delta Oto by the Numbers",
      heading: "Corporate Scale and Reach",
      groupDeltaLabel: "Delta Oto Scale",
      groupNetworkLabel: "Network / Ecosystem Access",
      groupNetworkNote: "Through GROUPAUTO Türkiye membership",
      networkBadge: "GROUPAUTO",
      items: [
        { label: "Founding Year", sub: "50+ years of industry experience" },
        { label: "Country Network", sub: "Distributor coverage area" },
        { label: "GROUPAUTO Members", sub: "Global distributor network" },
        { label: "Active Brands", sub: "Continuously updated portfolio" },
      ],
    },
    timeline: {
      eyebrow: "Corporate History",
      heading: "A 50+ Year Timeline of Growth",
      listAriaLabel: "Corporate history timeline from founding to today",
      comingSoon: "Coming Soon",
      pendingText: "Details for this period will be added soon.",
      items: [
        { label: "Founding", desc: "Founded in Ümraniye, the company took its place among the founding distributors of the automotive aftermarket industry." },
        { label: "Portfolio Expansion", desc: "As the supply network deepened, the company reached a leading distributor position in the İstanbul region; product categories were systematically expanded." },
        { label: "", desc: "" },
        { label: "GROUPAUTO Membership", desc: "Full membership in the Europe-based independent aftermarket network provided access to global supply channels, manufacturer agreements and market intelligence." },
        { label: "", desc: "" },
        { label: "National Logistics Network", desc: "Uninterrupted delivery capacity to all 81 provinces of Turkey was established. With the Opar Aegean regional operation, distribution coverage expanded to İzmir and the Aegean region." },
        { label: "", desc: "" },
        { label: "50th Anniversary", desc: "With more than 100 active brands, thousands of customer relationships and 50+ years of institutional heritage, the company reinforces its constructive position in the industry." },
      ],
    },
    values: {
      eyebrow: "Corporate Principles",
      heading: "Our Value Framework",
      body: "50+ years of experience are built on four core corporate principles. These principles are the reference point in every decision-making process.",
      items: [
        { title: "Corporate Reliability", desc: "Predictability and integrity of commitment in business relationships form the core of Delta Oto's corporate identity. Every order and every partnership is carried out within this framework of trust." },
        { title: "Product Quality Assurance", desc: "Every brand in the portfolio undergoes audited source verification. Unregistered and counterfeit products are subject to zero tolerance; the OEM or OEM-equivalent standard requirement is applied without exception." },
        { title: "Operational Excellence", desc: "Performance standards are carefully maintained at every link in the process from order to delivery. WMS-supported processes safeguard stock accuracy and our commitment to speed." },
        { title: "Sustainable Growth", desc: "Strengthening the competitiveness of our customer portfolio and building long-term business partnerships are at the center of Delta Oto's growth strategy. Relationship quality takes priority over short-term profit." },
      ],
    },
    gundem: {
      eyebrow: "Agenda",
      heading: "Recent Developments",
      readMore: "Read More",
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
      body: "Get to know our 50+ years of institutional heritage; place an order through our B2B portal or contact our team directly.",
      b2b: "B2B Portal",
      contact: "Contact",
    },
  },
} satisfies Record<Lang, any>;

/** Kurumsal Rakamlar kartı: kart görünüre girince hedef değere sayarak ulaşır (LandingPage'deki MetricItem/CountUp desenine benzer, bu sayfaya özgü sadeleştirilmiş hali).
 * `badge` (Turu 5): yalnızca "network" grubundaki kartlara geçiliyor — kart
 * seviyesinde bile "bu rakam GROUPAUTO'ya ait" mesajını üstteki grup
 * etiketinden bağımsız olarak tekrar eden küçük bir rozet; kullanıcı yalnızca
 * bu tek kartı görse bile kaynağı belirsiz kalmasın diye. */
function StatCard({ icon: Icon, target, plus, grouped, label, sub, badge }: {
  icon: React.ElementType;
  target: number;
  plus: boolean;
  grouped: boolean;
  label: string;
  sub: string;
  badge?: string;
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
    <div ref={ref} className="relative border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all group">
      {badge && (
        <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wide text-[#7d9bea] bg-[#1B3A8F]/[0.07] rounded-full px-2 py-1">
          {badge}
        </span>
      )}
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
 * Zaman Çizgisi — Turu 5 (Accordion + Scroll-Sync): önceki tur "hepsi her zaman
 * açık" dikey liste hâline mobilde fazla kalabalık geldi (canlı geri bildirim).
 * Artık her satır varsayılan olarak yalnızca YIL + BAŞLIK gösteriyor;
 * açıklama gizli, satıra tıklayınca/dokununca (tek seferde yalnızca bir
 * satır) açılıyor — klasik accordion. AYRICA sayfa kaydırılırken görünüm
 * merkezine en yakın satır otomatik olarak aktif/açık hâle geliyor — bunun
 * için sıfırdan bir IntersectionObserver kurulmadı, Operasyon sayfasındaki
 * "Siparişten Teslimata" 4 adımlı animasyonunda zaten kanıtlanmış olan
 * `useViewportFocusIndex` hook'u (bkz. src/hooks/use-motion.ts) AYNEN yeniden
 * kullanıldı — rAF+scroll event tabanlı, her satırın GERÇEK
 * getBoundingClientRect'ini ölçüyor, eşik-tetiklemeli değil sürekli
 * "şu an en yakın hangisi" hesaplıyor; bu yüzden bir satır açılıp
 * yüksekliği değiştiğinde (aşağıdaki satırları ittiğinde) sahte bir
 * "yeni satır göründü" tetiklemesi YOK — yalnızca gerçek bir sonraki
 * scroll event'inde güncelleniyor, geri besleme döngüsü riski taşımıyor.
 *
 * Manuel tıklama ile scroll-senkronu birlikte çalışıyor: tıklama anında
 * `manualOverrideRef` 2.5sn'lik bir muafiyet penceresi açıyor — bu süre
 * boyunca scroll-hook'un güncellemesi görmezden geliniyor (kullanıcı az
 * önce seçtiği satırın hemen elinden alınmaması için), süre dolunca scroll
 * yeniden devralıyor. `prefers-reduced-motion` altında hook'un kendi scroll
 * dinleyicisi hiç kurulmuyor (activeIndex sürekli -1 kalıyor) — bu durumda
 * zaman çizelgesi salt tıklamayla çalışır, hiçbir satır otomatik açılmaz/
 * kapanmaz (mevcut davranış bozulmaz, yalnızca "scroll'a bağlı otomatik
 * geçiş" kısmı devre dışı kalır — okumak için hareket ZORUNLU değildir).
 *
 * `pending: true` kayıtlar (bkz. MILESTONE_META üstteki not) artık daha da
 * hafif — küçük/soluk yıl rakamı + "Yakında" rozetiyle gerçek dönüm
 * noktalarının önüne asla geçmiyor; uydurma başlık/açıklama eklenmez.
 *
 * Çizgi konumlandırma notu (değişmedi): bağlayıcı dikey çizgi her satırın
 * kendi `relative` kutusu içinde `top-0 bottom-0` ile çiziliyor — yüzde
 * tabanlı olduğu için satırın gerçek yüksekliğini (açık/kapalı fark etmeksizin)
 * otomatik kapsıyor, JS ölçüm gerekmiyor.
 */
function MilestoneTimeline({ t }: { t: (typeof content)["tr"]["timeline"] }) {
  const MILESTONES = MILESTONE_META.map((m, i) => ({ ...m, ...t.items[i] }));
  const reveal = useReveal();

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const manualOverrideRef = React.useRef(false);
  const overrideTimeoutRef = React.useRef<number | undefined>(undefined);
  const [setFocusRef, scrollActiveIndex] = useViewportFocusIndex(MILESTONES.length, 0.42, 0.45);

  React.useEffect(() => {
    if (manualOverrideRef.current) return;
    if (scrollActiveIndex >= 0) setOpenIndex(scrollActiveIndex);
  }, [scrollActiveIndex]);

  React.useEffect(() => () => window.clearTimeout(overrideTimeoutRef.current), []);

  const handleRowToggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
    manualOverrideRef.current = true;
    window.clearTimeout(overrideTimeoutRef.current);
    overrideTimeoutRef.current = window.setTimeout(() => { manualOverrideRef.current = false; }, 2500);
  };

  return (
    <section className="bg-[#1B3A8F] py-20 md:py-24 lg:py-28 text-white overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={reveal} className="do-reveal mb-12 md:mb-16 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">{t.eyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">{t.heading}</h2>
        </div>

        <ol className="relative max-w-4xl list-none pl-0" aria-label={t.listAriaLabel}>
          {MILESTONES.map((m, i) => {
            const isLast = i === MILESTONES.length - 1;
            const isOpen = openIndex === i;
            return (
              <li
                key={m.year}
                ref={(el) => { reveal(el); setFocusRef[i](el); }}
                className={`do-reveal relative flex ${isLast ? "" : "pb-5 sm:pb-6 lg:pb-7"}`}
              >
                {!isLast && (
                  <span
                    className="absolute top-0 bottom-0 w-px bg-white/15 left-[72px] sm:left-[116px] lg:left-[140px]"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`w-12 sm:w-20 lg:w-24 shrink-0 pt-0.5 font-black tabular-nums leading-none transition-colors duration-300 ${
                    m.pending
                      ? "text-base sm:text-lg lg:text-xl text-white/35"
                      : `text-xl sm:text-2xl lg:text-3xl ${isOpen ? "text-white" : "text-white/80"}`
                  }`}
                >
                  {m.year}
                </span>
                <span className="w-6 sm:w-8 lg:w-10 shrink-0 flex justify-center">
                  <span
                    className={`relative z-10 mt-2 block w-3 h-3 rounded-full ring-4 ring-[#1B3A8F] transition-colors duration-300 ${
                      m.pending ? "bg-white/20" : isOpen ? "bg-[#7d9bea]" : "bg-white/40"
                    }`}
                    aria-hidden="true"
                  />
                </span>
                <div className="flex-1 min-w-0 pb-1">
                  <button
                    type="button"
                    onClick={() => handleRowToggle(i)}
                    aria-expanded={isOpen}
                    className="group flex items-start justify-between gap-3 w-full text-left rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d9bea] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A8F]"
                  >
                    {m.pending ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/35">
                        <Clock className="w-3.5 h-3.5" strokeWidth={2} /> {t.comingSoon}
                      </span>
                    ) : (
                      <h3 className={`text-[16px] sm:text-[18px] lg:text-[20px] font-bold leading-snug transition-colors duration-300 ${isOpen ? "text-white" : "text-white/85"}`}>
                        {m.label}
                      </h3>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 mt-1 shrink-0 transition-transform duration-300 ${m.pending ? "text-white/25" : "text-white/50"} ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={2}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr] mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {m.pending ? (
                        <p className="text-white/55 text-[13px] italic leading-relaxed max-w-xl">{t.pendingText}</p>
                      ) : (
                        <p className="text-white/70 text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-relaxed max-w-2xl">{m.desc}</p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
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
  // Turu 5: `group` alanına göre iki ayrı, açıkça etiketli alt kümeye
  // bölünüyor (bkz. FACT_META üstteki not) — .filter() burada index'e değil
  // her kaydın kendi `group` alanına dayanıyor, sıra değişse de doğru gruba
  // düşer.
  const DELTA_FACTS = FACT_STATS.filter((f) => f.group === "delta");
  const NETWORK_FACTS = FACT_STATS.filter((f) => f.group === "network");
  const VALUES = t.values.items.map((v, i) => ({ ...v, icon: VALUE_ICONS[i] }));
  // Değer Çerçevemiz Etkileşim Turu 2: varsayılan yüzey beyaz + lacivert
  // başlık (editoryal indeks); aktif öğe (hover/focus/dokunma) TÜM hücreyi
  // Delta lacivertine çeviriyor, başlık+açıklama beyaza dönüyor — masaüstünde
  // CSS group-hover/group-focus-within ile anlık önizleme, dokunmatikte bu
  // React state ile kalıcı açma sağlanıyor. Tek index tutuluyor (Set değil):
  // bir öğeye dokunmak, açıksa başka bir öğeyi otomatik kapatıp aktif durumu
  // temiz biçimde taşıyor — aynı anda yalnızca bir hücre lacivert olabilir,
  // komşular her zaman sakin kalır.
  const [activeValueIndex, setActiveValueIndex] = React.useState<number | null>(null);
  const toggleValue = (i: number) => setActiveValueIndex((prev) => (prev === i ? null : i));
  const ESG_ITEMS = t.esg.items.map((e, i) => ({ ...e, icon: ESG_ICONS[i] }));
  // Gündem: dizi zaten en-yeniden-en-eskiye sıralı (bkz. agenda.ts) — ilk öğe
  // "lead" (büyük), geri kalanı kompakt editoryal liste. Bugün 2 öğe var ama
  // düzen kaç öğe eklenirse eklensin aynı şekilde büyür (görev talimatı §8).
  const [gundemLead, ...gundemRest] = AGENDA_ITEMS;

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
          {/* Sitewide ince/yatay CTA ölçüsü: tüm breakpoint'lerde tek, tutarlı
              px-6 py-2.5 + text-[13.5px] — artık ayrı bir mobil/masaüstü
              ölçüsü yok, .do-tap-target görünmez dokunma payını genişletiyor. */}
          <Link
            href={routeFor("operations", lang)}
            className="do-tap-target inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold text-[13.5px] px-6 py-2.5 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            {t.hero.cta} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* KURUMSAL RAKAMLAR — light. Turu 5: eskiden dört rakam tek, ayrışmamış
          bir gridde duruyordu — ikisi Delta Oto'nun kendi rakamı (1976,
          100+), ikisi GROUPAUTO International'ın kendi resmi rakamıydı (118,
          29); hiçbir ayrım olmadığından "bu sayı kime ait?" belirsizliği
          vardı (canlı geri bildirim). Artık iki AÇIKÇA etiketli alt grup:
          "Delta Oto Ölçeği" ve "Ağ / Ekosistem Erişimi" (GROUPAUTO Türkiye
          üyeliği üzerinden) — aralarında görünür bir ayraç + ikinci grubun
          her kartında ayrıca küçük bir "GROUPAUTO" rozeti (bkz. StatCard
          `badge` prop'u) kart seviyesinde de kaynağı netleştiriyor. Sayı
          değerleri DEĞİŞMEDİ (1976 / 118 / 29 / 100+), yalnızca sunumu. */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.facts.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.facts.heading}</h2>
          </div>

          <div className="space-y-10">
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                {t.facts.groupDeltaLabel}
              </span>
              <div className="grid grid-cols-2 gap-5">
                {DELTA_FACTS.map((stat, i) => (
                  <div key={stat.id} ref={reveal} className={`do-reveal ${STAGGER_CLASSES[i] ?? ""}`}>
                    <StatCard {...stat} />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 border-t border-slate-100">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
                {t.facts.groupNetworkLabel}
              </span>
              <span className="block text-[12.5px] text-slate-400 mb-4">{t.facts.groupNetworkNote}</span>
              <div className="grid grid-cols-2 gap-5">
                {NETWORK_FACTS.map((stat, i) => (
                  <div key={stat.id} ref={reveal} className={`do-reveal ${STAGGER_CLASSES[i + 2] ?? ""}`}>
                    <StatCard {...stat} badge={t.facts.networkBadge} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MilestoneTimeline t={t.timeline} />

      {/* GÜNDEM — white. Anasayfa'nın kısa önizlemesinin (2 öğe) tam
          karşılığı: burası "Tüm Gündem"in gittiği gerçek hedef. Aynı
          AGENDA_ITEMS kaynağı (kopya içerik yok). 6 eşit kart/karusel/sahte
          dergi DEĞİL (görev talimatı §8) — bir "lead" (öne çıkan, büyük) +
          geri kalanı ince ayraçlı kompakt bir liste. Bu düzen kaç öğe
          eklenirse eklensin aynı şekilde büyür; liste satırları kart değil,
          sayfanın geri kalanında zaten kurulu "editoryal indeks" diliyle
          (bkz. Operasyon capabilities, Tedarikçiler CategoryExplorer) tutarlı. */}
      <section id={lang === "tr" ? "gundem" : "agenda"} className="bg-white py-24 scroll-mt-24 sm:scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.gundem.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.gundem.heading}</h2>
          </div>

          {/* overflow-x-clip: Kariyer sayfasındaki AYNI kök nedenin
              (do-reveal-left/right'ın pre-reveal translateX(±32px)
              durumu, .do-in eklenmeden önce) burada da ~8px mobil yatay
              taşmaya yol açtığı bulundu (390/375px QA) — aynı kanıtlanmış,
              yerel/kapsamlı çözüm uygulandı: paylaşılan .do-reveal-left/
              right CSS'i veya animasyonun kendisi DEĞİŞMEDİ, yalnızca bu
              ızgara taşmayı kırpıyor. */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 overflow-x-clip">
            {gundemLead && (
              <Link
                href={gundemDetailRoute(gundemLead.slug, lang)}
                ref={reveal}
                className="do-reveal-left group block lg:col-span-3"
              >
                <div className="flex items-center gap-3 mb-4 text-[11px] font-bold uppercase tracking-[0.15em]">
                  <span className="text-[#1B3A8F]">{gundemLead.date[lang]}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
                  <span className="text-slate-400">{gundemLead.category[lang]}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug mb-4 group-hover:text-[#1B3A8F] transition-colors">
                  {gundemLead.title[lang]}
                </h3>
                <p className="text-slate-500 text-[15px] leading-[1.8] font-light max-w-xl">{gundemLead.summary[lang]}</p>
                {/* Mobil Okunurluk Turu: bkz. LandingPage.tsx'teki birebir
                    aynı gerekçe — dokunmatik cihazda hover tetiklenmediği
                    için ipucu görünmez kalıyordu, artık varsayılan görünür,
                    yalnızca gerçek hover destekleyen cihazlarda soluk başlar. */}
                <span className="inline-flex items-center gap-1.5 mt-5 text-[13px] font-semibold text-[#1B3A8F] opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity">
                  {t.gundem.readMore} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            )}

            {/* Mobil Okunurluk Turu: lead ile "rest" grubu arasındaki sınır
                masaüstünde lg:border-l ile ayrışıyordu ama <lg'de (dikey
                istifte) hiç ayraç yoktu — iki haber grubu birbirine
                karışıyordu (canlı telefon incelemesinde bulundu). "rest"
                grubunun İÇİNDEKİ öğeler zaten divide-y ile ayrışıyor
                (değişmedi) — yalnızca lead→rest sınırına mobil üst
                ayraç eklendi, lg+'da devre dışı (mevcut lg:border-l
                korunuyor, üst üste binmiyor). */}
            {gundemRest.length > 0 && (
              <div ref={reveal} className="do-reveal-right lg:col-span-2 pt-6 border-t border-slate-200 lg:pt-0 lg:border-t-0 lg:border-l lg:border-slate-200 lg:pl-10 divide-y divide-slate-100">
                {gundemRest.map((item) => (
                  <Link key={item.slug} href={gundemDetailRoute(item.slug, lang)} className="group block py-5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-2 text-[10.5px] font-bold uppercase tracking-[0.12em]">
                      <span className="text-[#1B3A8F]">{item.date[lang]}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
                      <span className="text-slate-400">{item.category[lang]}</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-slate-900 leading-snug group-hover:text-[#1B3A8F] transition-colors">{item.title[lang]}</h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed mt-1.5">{item.summary[lang]}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DEĞERLER — Görsel Ayrışma Turu: hemen üstündeki Gündem bölümü de
          bg-white olduğu için ikisi ayrım çizgisi olmadan tek bir beyaz
          blok gibi akıyordu (kullanıcı geri bildirimi). Çözüm: sayfanın
          zaten kullandığı, kurumsal renk sisteminde tanımlı "light section"
          tonuna (#f8fafc — bkz. aşağıdaki SÜRDÜRÜLEBİLİRLİK bölümünde aynı
          desen) + ince bir üst kenarlığa geçildi; yeni bir renk icat
          edilmedi, mevcut tasarım sistemi tekrar kullanıldı. Kart-grid
          yerine tam genişlik bölmeli editorial panel aynen korunuyor. */}
      <section className="bg-[#f8fafc] py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.values.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.values.heading}</h2>
            <p className="text-slate-500 mt-3 text-[15px]">{t.values.body}</p>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-slate-200">
              {VALUES.map(({ icon: Icon, title, desc }, i) => {
                const isOpen = activeValueIndex === i;
                // React/useReveal Çakışma Turu: aşağıdaki div ref={reveal} taşıyor —
                // useReveal()'ın IntersectionObserver'ı görünür olunca .do-in
                // sınıfını doğrudan DOM'a (React'ın bilgisi DIŞINDA) ekliyor.
                // isOpen'a göre className STRING'i değişirse, React yeniden
                // render'da bu elementin class attribute'unu YENİDEN YAZAR ve
                // elle eklenmiş .do-in'i SİLER (kart kalıcı opacity:0'da
                // takılı kalır — canlı QA'da yakalandı). Çözüm: bu elementin
                // className'i i'ye göre SABİT tutuluyor (asla isOpen'a göre
                // değişmiyor); aktif navy arka plan onun yerine className'den
                // bağımsız bir style prop'uyla uygulanıyor (React style'ı
                // class'tan ayrı yönetir, .do-in'e dokunmaz).
                return (
                  <div
                    key={title}
                    ref={reveal}
                    className={`do-reveal ${STAGGER_CLASSES[i] ?? ""} group relative px-7 py-9 lg:py-10 transition-colors duration-300 bg-white hover:bg-[#1B3A8F] focus-within:bg-[#1B3A8F]`}
                    style={isOpen ? { backgroundColor: "#1B3A8F" } : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -top-3 right-4 text-[104px] leading-none font-black select-none transition-colors duration-300 ${
                        isOpen ? "text-white/10" : "text-slate-50"
                      } group-hover:text-white/10 group-focus-within:text-white/10`}
                    >
                      0{i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleValue(i)}
                      aria-expanded={isOpen}
                      className="relative block w-full text-left rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A8F]"
                    >
                      <Icon
                        className={`w-7 h-7 mb-6 transition-colors duration-300 ${
                          isOpen ? "text-white" : "text-[#1B3A8F]/60"
                        } group-hover:text-white group-focus-within:text-white`}
                        strokeWidth={1.5}
                      />
                      <h3
                        className={`text-xl font-black leading-snug transition-colors duration-300 ${
                          isOpen ? "text-white" : "text-[#1B3A8F]"
                        } group-hover:text-white group-focus-within:text-white`}
                      >
                        {title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className={`block h-[2px] mt-3 transition-all duration-300 ${
                          isOpen ? "w-12 bg-white" : "w-6 bg-[#1B3A8F]/30"
                        } group-hover:w-12 group-hover:bg-white group-focus-within:w-12 group-focus-within:bg-white`}
                      />
                      <p
                        className={`text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-out ${
                          isOpen ? "max-h-32 opacity-100 mt-4 text-white/85" : "max-h-0 opacity-0 mt-0 text-slate-500"
                        } group-hover:max-h-32 group-hover:opacity-100 group-hover:mt-4 group-hover:text-white/85 group-focus-within:max-h-32 group-focus-within:opacity-100 group-focus-within:mt-4 group-focus-within:text-white/85`}
                      >
                        {desc}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Görsel/UX Düzeltme Turu (§1): eski "YAPIMIZ / Üç İş Kolu, Tek
          Altyapı" bölümü (İş Birimlerimiz'in bir önceki turda kart-gridden
          tek-cümle+adlandırma-satırına indirgenmiş hali) kullanıcı
          tarafından tamamen reddedildi — yeniden tasarlanmadı, sadece
          silindi. Yerine başka bir "Ne Yapıyoruz" bölümü KONMADI; sayfa
          Değerler'den doğrudan GROUPAUTO'ya akıyor (aşağıdaki dark bölüm
          zaten kendi üst boşluğunu taşıyor, ayrı bir dolgu bloğuna gerek
          yok). */}

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
          {/* Mobil Taşma Turu (regresyon): bu gridin do-reveal-left/right
              çifti, Gündem gridindeki AYNI kök nedenle (bkz. o bölümdeki
              yorum — pre-reveal translateX(±32px), .do-in eklenmeden önce)
              320/768px'te ~8px yatay sayfa taşmasına yol açıyordu; canlı
              QA'da bulundu, git stash ile bu turun DEĞİŞİKLİKLERİNDEN ÖNCE
              de var olduğu (regresyon, önceki bir turda başka bir bölüme
              uygulanan düzeltme buraya hiç taşınmamış) doğrulandı. Aynı
              kanıtlanmış yerel çözüm: overflow-x-clip. */}
          <div className="grid lg:grid-cols-2 gap-14 items-start overflow-x-clip">
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
      <section className="bg-[#1B3A8F] py-16 text-white overflow-x-clip">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div ref={reveal} className="do-reveal-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">{t.cta.heading}</h2>
            <p className="text-white/75 text-sm mt-2 max-w-lg">{t.cta.body}</p>
          </div>
          <div ref={reveal} className="do-reveal-right flex gap-4 shrink-0">
            <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="do-tap-target bg-white text-[#1B3A8F] font-bold px-6 py-2.5 rounded-md hover:bg-gray-100 transition-colors text-[13.5px] inline-flex items-center gap-2 group">
              {t.cta.b2b}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link href={routeFor("contact", lang)} className="do-tap-target border border-white/30 hover:border-white/60 text-white font-medium px-6 py-2.5 rounded-md transition-colors text-[13.5px]">
              {t.cta.contact}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

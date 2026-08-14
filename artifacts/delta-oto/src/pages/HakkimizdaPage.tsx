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

// do-d1..do-d4: index.css'te tanımlı sabit stagger gecikmeleri (80/160/240/320ms).
// Tailwind'in JIT taraması bu sınıfları görmese de sorun değil — bunlar Tailwind
// utility'si değil, index.css'te elle yazılmış düz CSS kuralları.
const STAGGER_CLASSES = ["do-d1", "do-d2", "do-d3", "do-d4"];

// `pending: true` kayıtlar gerçek bir tarih ama henüz yazılmamış içerik demektir —
// uydurma olay eklemek yerine dürüstçe "detaylar ekleniyor" olarak işaretlenir.
const MILESTONES = [
  { year: "1976", label: "Kuruluş", desc: "Ümraniye'de temelleri atılan şirket, otomotiv aftermarket sektörünün kurucu distribütörleri arasında yerini aldı.", pending: false },
  { year: "1990", label: "Portföy Genişlemesi", desc: "Tedarik ağının derinleşmesiyle birlikte İstanbul bölgesinde lider distribütör konumuna ulaşıldı; ürün kategorileri sistematik biçimde genişletildi.", pending: false },
  { year: "1998", label: "", desc: "", pending: true },
  { year: "2005", label: "Groupauto International Üyeliği", desc: "Avrupa merkezli bağımsız aftermarket ağına tam üye olunarak küresel tedarik kanallarına, üretici anlaşmalarına ve piyasa bilgisine erişim sağlandı.", pending: false },
  { year: "2010", label: "", desc: "", pending: true },
  { year: "2015", label: "Ulusal Lojistik Ağı", desc: "Türkiye'nin 81 iline kesintisiz teslimat kapasitesi kuruldu. Opar Ege bölge operasyonuyla dağıtım coğrafyası İzmir ve Ege'ye yayıldı; ihracat operasyonu faaliyete geçti.", pending: false },
  { year: "2020", label: "", desc: "", pending: true },
  { year: "2026", label: "50. Kuruluş Yılı", desc: "250'den fazla aktif marka, binlerce müşteri ilişkisi ve yarım asrın kurumsal birikimiyle sektördeki yapıcı konumunu pekiştiriyor.", pending: false },
];

// grouped: tr-TR binlik ayraç (nokta) uygulanır — sadece 1000 ve üzeri gerçek miktarlarda kullanılır (1976 bir yıl, ayraç almaz).
const FACT_STATS = [
  { icon: Award,      target: 1976, plus: false, grouped: false, label: "Kuruluş Yılı",     sub: "50 yıl sektör deneyimi" },
  { icon: Globe,      target: 40,   plus: true,  grouped: false, label: "Ülke Ağı",         sub: "Groupauto International" },
  { icon: Users,      target: 3000, plus: true,  grouped: true,  label: "Groupauto Üyesi",  sub: "Küresel distribütör ağı" },
  { icon: TrendingUp, target: 250,  plus: true,  grouped: false, label: "Aktif Marka",      sub: "Sürekli güncellenen portföy" },
];

const VALUES = [
  { icon: ShieldCheck, title: "Kurumsal Güvenilirlik", desc: "Ticari ilişkilerde öngörülebilirlik ve taahhüt bütünlüğü, Delta Oto'nun temel kurumsal kimliğini oluşturur. Her sipariş ve her iş birliği bu güven çerçevesinde yürütülür." },
  { icon: BadgeCheck,  title: "Ürün Kalite Güvencesi", desc: "Portföydeki her marka, denetimli kaynak doğrulamasından geçer. Kayıt dışı ve sahte ürün sıfır toleranstır; OEM ve OEM eşdeğeri standart zorunluluğu istisnasız uygulanır." },
  { icon: Gauge,       title: "Operasyonel Mükemmellik", desc: "Siparişten teslimata uzanan sürecin her halkasında performans standardı titizlikle korunur. WMS destekli süreçler, stok doğruluğunu ve hız taahhüdünü güvence altına alır." },
  { icon: Sprout,      title: "Sürdürülebilir Büyüme", desc: "Müşteri portföyünün rekabet gücünü artırmak ve uzun vadeli iş ortaklıkları kurmak, Delta Oto'nun büyüme stratejisinin merkezindedir. Kısa vadeli kâr yerine ilişki kalitesi önceliklidir." },
];

const BUSINESS_UNITS = [
  { icon: Package, title: "Aftermarket Dağıtım", desc: "Binek ve hafif ticari araç kategorilerinde 250'den fazla küresel ve yerel marka distribütörlüğü. Türkiye'nin tamamına B2B kanalı üzerinden tedarik.", tags: ["250+ Marka", "50.000+ SKU", "B2B Portal"] },
  { icon: Tag,     title: "SPART Private Label", desc: "Delta Oto'nun özel dağıtım markası SPART; OEM eşdeğeri kaliteyi rekabetçi fiyat yapısıyla sunar. Fren, süspansiyon, motor ve kaporta kategorilerinde aktif portföy.", tags: ["OEM Eşdeğeri", "Rekabetçi Fiyat", "Geniş SKU Gamı"] },
  { icon: Truck,   title: "Ağır Vasıta Grubu", desc: "Kamyon, otobüs ve iş makinesi kategorilerinde seçilmiş marka ve ürün gamıyla ağır vasıta segmentine özel tedarik hizmeti.", tags: ["Kamyon", "Otobüs", "İş Makinesi"] },
  { icon: Network, title: "B2B Dijital Kanal", desc: "7/24 erişilebilen B2B portalı üzerinden anlık stok sorgulama, fiyat listeleri ve sipariş yönetimi. Müşteri operasyonlarına entegre dijital tedarik deneyimi.", tags: ["7/24 Erişim", "Anlık Stok", "Dijital Sipariş"] },
];

const ESG_ITEMS = [
  { icon: Route,   title: "Lojistik Optimizasyonu", desc: "Rota planlaması ve yük konsolidasyonuyla teslimat başına karbon ayak izinin azaltılması hedeflenmektedir." },
  { icon: Recycle, title: "Ambalaj ve Atık Yönetimi", desc: "Tedarikçilerle birlikte yürütülen ambalaj azaltım çalışmaları ile depo atık yönetimi süreçleri hayata geçirilmiştir." },
  { icon: Laptop,  title: "Sayısal Dönüşüm", desc: "Kağıtsız sipariş ve fatura süreçleri, B2B portal entegrasyonuyla müşteri operasyonlarına sunulmaktadır." },
];

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
 * `pending: true` kayıtlar (bkz. MILESTONES üstteki not) kesikli kenarlık, düşük
 * opaklık ve açık "Yakında" etiketiyle dürüst placeholder olarak kalır; uydurma
 * başlık/açıklama eklenmez.
 */
function MilestoneTimeline() {
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
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Kurumsal Tarihçe</span>
          <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">50 Yıllık Gelişim Kronolojisi</h2>
          <p className="text-white/75 mt-3 text-[15px]">Kuruluştan bugüne kat edilen mesafe; stratejik kararların, güçlü ortaklıkların ve disiplinli operasyonun bir ürünüdür. Dönemler arasında gezinmek için kartları kaydırın.</p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          role="region"
          aria-label="Kurumsal tarihçe, yatay kaydırılabilir zaman çizelgesi"
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
                        <Clock className="w-3.5 h-3.5" strokeWidth={2} /> Yakında
                      </span>
                      <p className="text-white/55 text-[13px] italic leading-relaxed">Bu döneme ait detaylar yakında eklenecek.</p>
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
          aria-label="Önceki dönem"
          className="hidden lg:flex items-center justify-center absolute left-3 top-[38%] -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:border-white/30 transition-colors disabled:opacity-25 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={active === MILESTONES.length - 1}
          aria-label="Sonraki dönem"
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
            aria-label={`${m.year} dönemine git`}
            className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-9 bg-[#7d9bea]" : "w-4 bg-white/25 hover:bg-white/45"}`}
          />
        ))}
      </div>
    </section>
  );
}

export function HakkimizdaPage() {
  // Değerler ve Sürdürülebilirlik panelleri aynı gözlemciyi paylaşır (StatCard'ın
  // ayrı IntersectionObserver kurma deseni yerine, çok-elemanlı useReveal kaydı).
  const reveal = useReveal();

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
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kuruluş 1976 · Delta Oto</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-6">
            <span className="do-hero-line">YARIM ASRIN</span><br />
            <span className="text-white">KURUMSAL</span><br />
            <span className="text-[#7d9bea]">BİRİKİMİ</span>
          </h1>
          <p className="text-base text-gray-300 leading-[1.8] max-w-2xl mb-6 lg:mb-10 font-light">
            1976'dan bu yana otomotiv yedek parça dağıtım sektöründe faaliyet gösteren Delta Oto; güçlü tedarik altyapısı, geniş marka portföyü ve Groupauto International üyeliğiyle sektörün yapıcı güçlerinden biri olmaya devam etmektedir.
          </p>
          <Link
            href="/operasyon"
            className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            Operasyon Altyapımızı İnceleyin <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* KURUMSAL RAKAMLAR — light */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Rakamlarla Delta Oto</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Kurumsal Ölçek ve Erişim</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {FACT_STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <MilestoneTimeline />

      {/* DEĞERLER — white, kart-grid yerine tam genişlik bölmeli editorial panel */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Kurumsal İlkeler</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Değer Çerçevemiz</h2>
            <p className="text-slate-500 mt-3 text-[15px]">50 yıllık deneyim, dört temel kurumsal ilke üzerine inşa edilmiştir. Bu ilkeler her karar sürecinde referans alınır.</p>
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
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Faaliyet Alanları</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">İş Birimlerimiz</h2>
            <p className="text-white/75 mt-3 max-w-xl text-[15px]">Delta Oto, birbirini tamamlayan iş kollarıyla otomotiv satış sonrası sektöründe kapsamlı bir tedarik gücü sunmaktadır.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {BUSINESS_UNITS.map(({ icon: Icon, title, desc, tags }) => (
              <div key={title} className="group bg-white/[0.08] border border-white/[0.12] rounded-xl p-7 hover:bg-white/[0.14] transition-colors flex flex-col">
                <div className="w-11 h-11 bg-white/10 border border-white/15 rounded-xl flex items-center justify-center mb-5 group-hover:bg-white/[0.18] transition-colors">
                  <Icon className="w-5 h-5 text-[#7d9bea]" />
                </div>
                <h3 className="text-[15px] font-bold mb-3 leading-snug">{title}</h3>
                <p className="text-white/75 text-sm leading-relaxed flex-1">{desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {tags.map(t => <span key={t} className="text-[11px] bg-white/10 border border-white/15 text-white/70 px-2.5 py-1 rounded-full">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROUPAUTO — dark */}
      <section className="relative bg-[#0e1016] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/delta-oto-ops.png" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0e1016]/80" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">Uluslararası Ağ</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Groupauto International Üyesi</h2>
              <p className="text-gray-300 leading-[1.85] text-base mb-8 max-w-lg">
                Avrupa merkezli Groupauto International ağının Türkiye üyesi sıfatıyla, 40'tan fazla ülkedeki distribütörler ve küresel üreticilerle doğrudan bağlantı içindeyiz. Bu üyelik; ürün erişimini, tedarik koşullarını ve piyasa bilgisini rakiplerimizin önünde konumlandırır.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
                {[["50+", "Global Tedarikçi"], ["Top Tier", "Tedarikçi Erişimi"], ["İhracat", "Kapasitesi"]].map(([n, l]) => (
                  <div key={l} className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-5 text-center">
                    <div className="text-2xl font-black text-white mb-1">{n}</div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wide">{l}</div>
                  </div>
                ))}
              </div>
              <Link href="/tedarikciler" className="inline-flex items-center gap-2 text-[#7d9bea] text-[14px] font-semibold hover:text-white transition-colors group">
                Marka Portföyümüzü İnceleyin <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="space-y-4">
              <h3 className="text-[15px] font-bold text-white/80 uppercase tracking-widest mb-6">Üyeliğin Faydaları</h3>
              {[
                { t: "Küresel Satın Alma Gücü", d: "Ortak müzakere kapasitesiyle üreticilerden daha rekabetçi koşullar ve fiyatlar elde edilir." },
                { t: "Ürün Erişim Önceliği",     d: "Yeni model kapsamları ve tedarikçi başlatmaları Groupauto kanalı üzerinden öncelikli erişimle portföye eklenir." },
                { t: "Piyasa İstihbarat Ağı",    d: "Avrupa ve bölge pazarlarındaki talep trendleri, üretici haberleri ve fiyat hareketleri üye ağı üzerinden gerçek zamanlı takip edilir." },
                { t: "Kalite Protokolleri",       d: "Groupauto tedarikçi kalite standartları, ürün doğrulama ve katalog yönetim süreçlerine doğrudan entegre edilmektedir." },
              ].map(item => (
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
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Kurumsal Sorumluluk</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Çevre ve Sürdürülebilirlik</h2>
            <p className="text-slate-500 mt-3 text-[15px]">Lojistik ve operasyon süreçlerimizde çevresel etkiyi azaltmaya yönelik uygulamalar hayata geçirilmektedir.</p>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm grid lg:grid-cols-5">
            {/* Gerçek tesis görseli: konuya uydurma stok görsel yerine Delta Oto'nun kendi deposu */}
            <div ref={reveal} className="do-reveal-left relative lg:col-span-2 aspect-video lg:aspect-auto min-h-[260px]">
              <img
                src="/images/delta-oto-depot.jpg"
                alt="Delta Oto lojistik deposu"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016]/85 via-[#0e1016]/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em] block mb-1.5">Gerçek Operasyon</span>
                <p className="text-white/85 text-sm leading-snug max-w-xs">Uygulamalar, Delta Oto'nun kendi lojistik merkezlerinde hayata geçirilir.</p>
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
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Delta Oto ile İş Ortaklığına Başlayın</h2>
            <p className="text-white/75 text-sm mt-2 max-w-lg">50 yıllık kurumsal birikimimizle tanışın; B2B portalımızdan sipariş verin veya ekibimizle doğrudan iletişime geçin.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="bg-white text-[#1B3A8F] font-bold px-7 py-3.5 rounded-md hover:bg-gray-100 transition-colors text-sm inline-flex items-center gap-2 group">
              B2B Portal
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link href="/iletisim" className="border border-white/30 hover:border-white/60 text-white font-medium px-7 py-3.5 rounded-md transition-colors text-sm">
              İletişim
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

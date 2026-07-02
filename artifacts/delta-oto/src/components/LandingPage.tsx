import React, { useEffect, useRef, useState } from "react";
import {
  ChevronRight, ArrowRight, MapPin, Mail, Phone, Globe, Truck, Shield, Zap, Network,
  Menu, X, Disc, Filter, Settings, Cog, BatteryCharging, Droplet, Facebook, Instagram,
  Linkedin, Warehouse, PackageCheck, ClipboardCheck, Handshake, FileText, Calendar,
} from "lucide-react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  .do-page { font-family: 'Inter', sans-serif; }

  .do-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1);
  }
  .do-reveal.do-in { opacity: 1; transform: none; }
  .do-d1 { transition-delay: 80ms; }
  .do-d2 { transition-delay: 160ms; }
  .do-d3 { transition-delay: 240ms; }
  .do-d4 { transition-delay: 320ms; }

  .do-reveal-left {
    opacity: 0;
    transform: translateX(-32px);
    transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
  }
  .do-reveal-left.do-in { opacity: 1; transform: none; }

  .do-reveal-right {
    opacity: 0;
    transform: translateX(32px);
    transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
  }
  .do-reveal-right.do-in { opacity: 1; transform: none; }

  .do-spart-badge {
    background: #f1f5f9;
    border: 1px solid rgba(15,23,42,0.1);
    border-radius: 4px;
    padding: 5px 10px;
    transition: all 0.2s;
  }
  .do-spart-badge:hover {
    background: #e8edf4;
    border-color: rgba(27,58,143,0.4);
  }

  .do-hero-line {
    background: linear-gradient(90deg, #fff 60%, rgba(255,255,255,0.55));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .do-metric-num {
    background: linear-gradient(135deg, #0f172a 35%, #1B3A8F);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-variant-numeric: tabular-nums;
  }

  .do-card {
    transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
    border-top: 2px solid transparent;
  }
  .do-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 48px rgba(15,23,42,0.12);
    border-top-color: #1B3A8F;
  }

  .do-accent-line::before {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: #1B3A8F;
    margin-bottom: 20px;
  }
  .do-accent-line-light::before {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: rgba(255,255,255,0.9);
    margin-bottom: 20px;
  }

  .do-grid-bg {
    background-image:
      linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .do-grid-bg-light {
    background-image:
      linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .do-nav-link {
    position: relative;
    padding-bottom: 2px;
  }
  .do-nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1.5px;
    background: #1B3A8F;
    transition: width 0.25s ease;
  }
  .do-nav-link:hover::after { width: 100%; }

  .do-page a, .do-page button { outline: none; }
  .do-page a:focus-visible,
  .do-page button:focus-visible {
    outline: 2px solid #2547B5;
    outline-offset: 3px;
    border-radius: 6px;
  }

  @keyframes do-sweep {
    0% { transform: translateX(-150%) skewX(-14deg); opacity: 0; }
    16% { opacity: 1; }
    52% { opacity: 0; }
    100% { transform: translateX(280%) skewX(-14deg); opacity: 0; }
  }
  .do-beam {
    position: absolute; top: 0; bottom: 0; left: 0;
    width: 26%;
    background: linear-gradient(90deg, transparent, rgba(125,155,234,0.16), transparent);
    filter: blur(8px);
    pointer-events: none;
    z-index: 1;
    animation: do-sweep 9s ease-in-out infinite;
  }
  .do-beam-delay { animation-delay: 4.5s; }

  .do-card-beam {
    position: absolute; top: 0; bottom: 0; left: -70%;
    width: 55%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
    transform: skewX(-16deg);
    pointer-events: none;
    z-index: 1;
    transition: left 0.75s cubic-bezier(.22,1,.36,1);
  }
  .group:hover .do-card-beam { left: 140%; }

  @media (prefers-reduced-motion: reduce) {
    .do-beam, .do-beam-delay { animation: none; opacity: 0; }
    .do-ticker-inner { animation: none; }
    .do-card-beam { display: none; }
    .do-reveal, .do-reveal-left, .do-reveal-right {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
    .do-card, .do-nav-link::after, .do-spart-badge { transition: none; }
    .do-card:hover { transform: none; }
    .animate-pulse { animation: none; }
    .do-page *, .do-page *::before, .do-page *::after {
      transition-duration: 0.001ms !important;
    }
  }

  .do-hero-stripe {
    position: absolute;
    top: 0; right: 0;
    width: 42%;
    height: 100%;
    clip-path: polygon(18% 0, 100% 0, 100% 100%, 0% 100%);
    background: linear-gradient(135deg, rgba(27,58,143,0.06), rgba(14,16,22,0.0));
    pointer-events: none;
  }

  @keyframes do-ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .do-ticker-inner { animation: do-ticker 22s linear infinite; display: flex; width: max-content; }
  .do-ticker-inner:hover { animation-play-state: paused; }

  .do-logo-invert { filter: brightness(0) invert(1); }
  .do-spart-logo-filter { filter: brightness(0) invert(1) sepia(1) saturate(0) brightness(1.6); }
  .do-spart-dark { filter: brightness(0) saturate(0); opacity: 0.72; }

  @keyframes do-marquee-ltr {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  @keyframes do-marquee-rtl {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .do-marquee-row {
    position: relative;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
    mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
  }
  .do-marquee-track {
    display: flex;
    width: max-content;
    will-change: transform;
  }
  .do-marquee-track.do-mq-ltr { animation: do-marquee-ltr 46s linear infinite; }
  .do-marquee-track.do-mq-rtl { animation: do-marquee-rtl 40s linear infinite; }
  .do-marquee-track.do-mq-slow { animation-duration: 62s; }
  .do-marquee-row:hover .do-marquee-track { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) {
    .do-marquee-track { animation: none; }
  }
`;

function useReveal() {
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("do-in"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const ref = (el: HTMLElement | null) => { if (el && !refs.current.includes(el)) refs.current.push(el); };
  return ref;
}

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useCounter(target: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

function MetricItem({ number, suffix = "", label, delay = "0ms", plus = false }: { number: number; suffix?: string; label: string; delay?: string; plus?: boolean }) {
  const [started, setStarted] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const count = useCounter(number, 1800, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (divRef.current) obs.observe(divRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={divRef} className="text-center px-10 py-10 md:py-0 relative" style={{ transitionDelay: delay }}>
      <div className="do-metric-num text-6xl md:text-7xl xl:text-8xl font-black mb-3 leading-none tracking-tighter">
        {started ? `${suffix}${count}` : `${suffix}0`}
        {plus && "+"}
      </div>
      <div className="text-slate-600 text-sm font-medium tracking-widest uppercase leading-relaxed max-w-[180px] mx-auto">{label}</div>
    </div>
  );
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return p;
}

function useParallax<T extends HTMLElement>(speed = 0.12) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0) scale(1.16)`;
      }
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [speed]);
  return ref;
}

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

const NAV_LINKS = ["Hakkımızda", "Tedarikçiler", "Operasyon ve Lojistik", "Kariyer", "İletişim"];

const PRODUCT_GROUPS = [
  { Icon: Disc, image: "/images/brake-systems.png", title: "Fren Sistemleri", desc: "Balata, disk, kaliper ve fren hattı bileşenlerinde geniş kapsam." },
  { Icon: Filter, image: "/images/filters.png", title: "Filtre Grubu", desc: "Yağ, hava, yakıt ve polen filtrelerinde tam ürün derinliği." },
  { Icon: Settings, image: "/images/suspension-steering.png", title: "Süspansiyon & Direksiyon", desc: "Amortisör, rotil ve direksiyon sistemi parçaları." },
  { Icon: Cog, image: "/images/engine-parts.png", title: "Motor Parçaları", desc: "Motor bloğu, conta ve tahrik sistemi bileşenleri." },
  { Icon: Zap, image: "/images/electrical-lighting.png", title: "Elektrik & Aydınlatma", desc: "Far, sensör ve elektrik sistemi ekipmanları." },
  { Icon: BatteryCharging, image: "/images/battery-energy.png", title: "Akü & Enerji", desc: "Marka çeşitliliğiyle akü ve enerji çözümleri." },
  { Icon: Droplet, image: "/images/oil-chemicals.png", title: "Yağ, Kimyasal & Bakım", desc: "Motor yağı, bakım ürünleri ve kimyasal çözümler." },
  { Icon: Truck, image: "/images/heavy-duty.png", title: "Ağır Vasıta Ürünleri", desc: "Ticari araç ve ağır vasıta yedek parça grubu." },
];

const BRAND_LOGOS = [
  "bosch", "valeo", "skf", "ngk", "denso", "mahle", "sachs", "trw", "hella", "febi",
  "gates", "monroe", "philips", "osram", "delphi", "luk", "ina", "fag", "brembo", "contitech",
  "mannfilter", "borgwarner", "corteco", "knecht", "lemforder", "swag", "gunsan", "optimal",
  "filtron", "kale", "champion", "elring", "wahler", "vdo",
].map((slug) => ({ slug, src: `/images/brands/${slug}.png` }));

function splitIntoRows<T>(arr: T[], rows: number): T[][] {
  const out: T[][] = Array.from({ length: rows }, () => []);
  arr.forEach((item, i) => out[i % rows].push(item));
  return out;
}

const BRAND_ROWS = splitIntoRows(BRAND_LOGOS, 3);

function BrandLogoCard({ slug, src }: { slug: string; src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className="shrink-0 w-[160px] h-20 sm:w-[180px] sm:h-[90px] mx-3 bg-white border border-[#E6ECF4] rounded-xl shadow-[0_6px_18px_rgba(15,35,70,0.05)] flex items-center justify-center px-5 py-4">
      <img
        src={src}
        alt={slug.toUpperCase()}
        loading="lazy"
        className="max-w-full max-h-full w-auto h-auto object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function BrandMarqueeRow({ logos, direction, slow }: { logos: { slug: string; src: string }[]; direction: "ltr" | "rtl"; slow?: boolean }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="do-marquee-row">
      <div className={`do-marquee-track ${direction === "ltr" ? "do-mq-ltr" : "do-mq-rtl"} ${slow ? "do-mq-slow" : ""}`}>
        {doubled.map((logo, i) => (
          <BrandLogoCard key={`${logo.slug}-${i}`} slug={logo.slug} src={logo.src} />
        ))}
      </div>
    </div>
  );
}

const NEWS_ITEMS = [
  {
    date: "Mayıs 2026", tag: "Yeni Operasyon", Icon: Zap,
    title: "Opar Ege Bölge Bayiliği Operasyonu Başladı",
    desc: "Mayıs 2026 itibarıyla Opar Ege Bölge Bayiliği operasyonunu devralarak Ege bölgesindeki tedarik ağımızı doğrudan genişlettik.",
  },
  {
    date: "27–29 Mayıs 2026", tag: "Uluslararası Zirve", Icon: Globe,
    title: "GROUPAUTO O2O Europe & Heavy Duty Days 2026",
    desc: "Mallorca'da düzenlenen zirvede Türkiye'yi temsil ettik; 35 farklı global üreticiyle kritik görüşmeler gerçekleştirdik.",
  },
  {
    date: "Yakında", tag: "Marka İş Birliği", Icon: Handshake,
    title: "Ürün Portföyünde Yeni Marka Genişlemeleri",
    desc: "İş ortaklarımızın rekabet gücünü artırmak için ürün portföyümüzü yeni marka iş birlikleriyle büyütmeye devam ediyoruz.",
  },
];

export function LandingPage() {
  const ref = useReveal();
  const scrolled = useScrolled();
  const progress = useScrollProgress();
  const heroParallax = useParallax<HTMLImageElement>(0.12);
  const opsParallax = useParallax<HTMLImageElement>(0.1);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const tickerItems = ["250+ Marka", "81 İl + İhracat", "Kuruluş 1976", "Groupauto Üyesi", "Opar Ege Bölge Bayiliği", "Ümraniye Merkez", "Binek & Hafif Ticari", "Kesintisiz Lojistik"];

  return (
    <div className="do-page min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <style>{CSS}</style>

      {/* SCROLL PROGRESS */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#1B3A8F] via-[#2547B5] to-[#7d9bea]" style={{ width: `${progress * 100}%` }}></div>
      </div>

      {/* TICKER BAR */}
      <div className="bg-[#1B3A8F] py-1.5 overflow-hidden">
        <div className="do-ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="px-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 flex items-center gap-7">
              {item}
              <span className="w-1 h-1 rounded-full bg-white/35 inline-block"></span>
            </span>
          ))}
        </div>
      </div>

      {/* HEADER (light) */}
      <header
        className="sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
        style={{ ...(scrolled ? { background: "rgba(255,255,255,0.98)", borderColor: "rgba(15,23,42,0.1)", boxShadow: "0 4px 24px rgba(15,23,42,0.08)" } : {}) }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: logo + nav */}
          <div className="flex items-center gap-5 lg:gap-7 min-w-0">
            <a href="#" className="flex items-center shrink-0">
              <img
                src="/images/delta-oto-logo.png"
                alt="Delta Oto 50. Yıl"
                className="h-10 sm:h-12 lg:h-14 xl:h-[68px] w-auto"
              />
            </a>
            <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[12.5px] xl:text-[13px] font-medium tracking-tight text-slate-600">
              {NAV_LINKS.map(link => (
                <a key={link} href="#" className="do-nav-link whitespace-nowrap hover:text-[#1B3A8F] transition-colors duration-200">{link}</a>
              ))}
            </nav>
          </div>

          {/* Right: SPART badge + CTA (desktop) + hamburger (mobile/tablet) */}
          <div className="flex items-center gap-4 lg:gap-5 shrink-0">
            <img
              src="/images/spart-logo.png"
              alt="SPART"
              className="hidden lg:block h-6 xl:h-7 w-auto shrink-0"
            />
            <a href="#" className="hidden lg:flex items-center bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[12.5px] xl:text-[13px] font-semibold tracking-[0.01em] px-4 xl:px-5 py-2.5 rounded-md transition-all duration-200 gap-1.5 shadow-sm hover:shadow-md group whitespace-nowrap">
              B2B Portal
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <button
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md border border-slate-200 text-slate-700 hover:border-[#1B3A8F]/40 hover:text-[#1B3A8F] transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE / TABLET MENU PANEL */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-t border-slate-200 bg-white ${mobileOpen ? "max-h-[calc(100vh-64px)] overflow-y-auto" : "max-h-0"}`}
        >
          <nav className="flex flex-col px-4 sm:px-6 py-4">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href="#"
                onClick={() => setMobileOpen(false)}
                className="py-3.5 text-[15px] font-medium text-slate-700 hover:text-[#1B3A8F] border-b border-slate-100 last:border-b-0 transition-colors"
              >
                {link}
              </a>
            ))}
            <div className="mt-5">
              <a href="#" className="w-full text-center bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-sm font-semibold px-5 py-3 rounded-md transition-colors flex items-center justify-center gap-1.5">
                B2B Portal
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO (dark) */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0e1016] text-white">
        <div className="absolute inset-0">
          <img
            ref={heroParallax}
            src="/images/delta-oto-depot.jpg"
            alt="Delta Oto lojistik deposu ve dağıtım filosu"
            className="w-full h-full object-cover opacity-70 will-change-transform"
            style={{ objectPosition: "center 55%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/60 to-[#1B3A8F]/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016]/50 via-transparent to-transparent"></div>
        </div>
        <div className="do-hero-stripe"></div>
        <div className="absolute inset-0 do-grid-bg opacity-60"></div>
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60"></div>
        <div className="do-beam"></div>

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-20 pb-32">
          <div className="max-w-4xl">
            <div ref={ref} className="do-reveal flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#4d74d6]"></div>
              <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kuruluş 1976 · Delta Oto</span>
            </div>

            <h1
              ref={ref}
              className="do-reveal do-d1 text-[32px] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-black leading-[1.12] mb-6 tracking-[-0.02em] break-words"
            >
              <span className="do-hero-line">Dünyanın Parçası,</span>
              <br />
              <span className="text-white">50 Yıldır Aynı</span>
              <br />
              <span className="text-[#7d9bea]">Çatı Altında.</span>
            </h1>

            <p
              ref={ref}
              className="do-reveal do-d2 text-[17px] text-gray-200 leading-[1.75] max-w-2xl mb-12 font-light"
            >
              Delta Oto Aksamı, güçlü marka iş birlikleri, geniş ürün portföyü ve gelişmiş lojistik altyapısıyla otomotiv satış sonrası sektörüne güvenilir çözümler sunar.
            </p>

            <div ref={ref} className="do-reveal do-d3 flex flex-wrap gap-4 items-center">
              <button className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md text-base transition-all duration-200 flex items-center gap-2.5 group shadow-[0_0_32px_rgba(27,58,143,0.3)] hover:shadow-[0_0_48px_rgba(27,58,143,0.45)]">
                Ürün Gruplarını İncele
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-gray-100 hover:text-white text-base font-medium flex items-center gap-2 border border-white/25 hover:border-white/45 px-8 py-4 rounded-md transition-all duration-200">
                İş Ortağı Olun
              </button>
            </div>

            <div ref={ref} className="do-reveal do-d4 mt-16 flex flex-wrap gap-6">
              {[
                { Icon: Shield, text: "ISO Sertifikalı" },
                { Icon: Globe, text: "Groupauto Üyesi" },
                { Icon: Truck, text: "81 İl + İhracat" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-gray-400 text-sm">
                  <Icon className="w-4 h-4 text-[#7d9bea]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white animate-pulse"></div>
        </div>
      </section>

      {/* PRODUCT GROUPS — ÜRÜN GRUPLARI (light) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p ref={ref} className="do-reveal text-[#1B3A8F] text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#1B3A8F] inline-block"></span>
                Ürün Grupları
              </p>
              <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Geniş <span className="text-[#1B3A8F]">Ürün Portföyü</span>
              </h2>
            </div>
            <p ref={ref} className="do-reveal do-d2 text-slate-600 text-sm max-w-xs leading-relaxed">
              Binek ve hafif ticari araç gruplarında sekiz ana ürün kategorisinde geniş kapsamlı tedarik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
            {PRODUCT_GROUPS.map(({ image, title, desc }, i) => (
              <div
                key={title}
                ref={ref}
                className={`do-reveal ${i % 4 === 1 ? "do-d1" : i % 4 === 2 ? "do-d2" : i % 4 === 3 ? "do-d3" : ""} do-card flex flex-col h-full bg-white border border-[#E6ECF4] rounded-[22px] overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1B3A8F]/25 shadow-[0_12px_32px_rgba(15,35,70,0.06)] hover:shadow-[0_20px_44px_rgba(15,35,70,0.11)]`}
              >
                <div className="relative pt-5 px-5">
                  <div
                    className="relative w-full h-[170px] md:h-[184px] rounded-[18px] overflow-hidden flex items-center justify-center"
                    style={{ background: "linear-gradient(180deg, #F7F9FC 0%, #EEF3F9 100%)" }}
                  >
                    <div className="absolute w-40 h-40 rounded-full bg-[#1B3A8F]/[0.07] blur-2xl"></div>
                    <img
                      src={image}
                      alt={title}
                      className="relative z-10 w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 px-6 py-6">
                  <h3 className="font-extrabold text-[#0B1328] text-[22px] leading-snug mb-2.5">{title}</h3>
                  <p className="text-[15px] text-[#66758A] leading-[1.65] mb-5 flex-1">{desc}</p>
                  <a href="#" className="inline-flex items-center gap-1.5 text-[15px] text-[#1B3A8F] font-bold group/link">
                    Detaylı İncele
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS (light) */}
      <section className="py-20 md:py-28 bg-[#f4f6f9] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p ref={ref} className="do-reveal text-[#1B3A8F] text-xs font-bold uppercase tracking-[0.3em] mb-4">Markalar</p>
            <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              Global ve Yerel Güçlü<br className="hidden sm:block" /> Marka İş Birlikleri
            </h2>
          </div>

          <div ref={ref} className="do-reveal flex flex-col gap-4 sm:gap-5 mb-10 -mx-6 lg:-mx-8 px-0">
            <BrandMarqueeRow logos={BRAND_ROWS[0]} direction="ltr" />
            <BrandMarqueeRow logos={BRAND_ROWS[1]} direction="rtl" />
            <div className="hidden sm:block">
              <BrandMarqueeRow logos={BRAND_ROWS[2]} direction="ltr" slow />
            </div>
          </div>

          <p ref={ref} className="do-reveal text-center text-slate-600 text-[15px] leading-relaxed max-w-2xl mx-auto font-light">
            Delta Oto, otomotiv satış sonrası sektörünün ihtiyaçlarına yönelik geniş marka ve ürün çeşitliliğiyle iş ortaklarına değer katar.
          </p>
        </div>
      </section>

      {/* POWER METRICS (light) */}
      <section className="relative bg-[#f4f6f9] border-y border-slate-200 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg-light"></div>
        <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1B3A8F]/40 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <MetricItem number={250} plus label="Ulusal ve Uluslararası Marka Referansı" delay="0ms" />
            <MetricItem number={81} plus label="Kesintisiz Dağıtım ve Lojistik Ağı" delay="80ms" />
            <MetricItem number={1976} label="Kuruluş ve Sektörel Liderlik" delay="160ms" />
          </div>
        </div>
      </section>

      {/* STRATEGIC PARTNERSHIP (navy) */}
      <section className="py-20 md:py-28 relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #1B3A8F 0%, #14275c 100%)" }}>
        <div className="absolute inset-0 do-grid-bg opacity-40"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        <div className="do-beam do-beam-delay"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2">
              <p ref={ref} className="do-reveal text-blue-200 text-xs font-bold uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-blue-300 inline-block"></span>
                Stratejik Ortaklık
              </p>
              <h2 ref={ref} className="do-reveal do-d1 do-accent-line-light text-4xl md:text-5xl font-black text-white mb-7 tracking-tight leading-[1.1]">
                Uluslararası Güç,<br/>Yerel Hakimiyet.
              </h2>
              <p ref={ref} className="do-reveal do-d2 text-[17px] text-blue-100/80 leading-[1.8] font-light">
                Dünyanın en büyük yedek parça organizasyonlarından Groupauto'nun gücüyle, optimize edilmiş satın alma kapasitemizi birleştiriyoruz. Global vizyonumuzla, iş ortaklarımıza her geçen gün daha rekabetçi ve öncü çalışma olanakları sunuyoruz.
              </p>

              <div ref={ref} className="do-reveal do-d3 mt-12 flex gap-12">
                {[
                  { target: 35, suffix: "+", label: "Global Tedarikçi" },
                  { target: 12, suffix: "", label: "Avrupa Ülkesi" },
                ].map(({ target, suffix, label }) => (
                  <div key={label}>
                    <div className="flex items-baseline">
                      <CountUp target={target} className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tight" />
                      <span className="text-3xl font-black text-[#7d9bea]">{suffix}</span>
                    </div>
                    <div className="w-9 h-[2px] bg-[#4d74d6] mt-3 mb-3"></div>
                    <div className="text-[11px] text-blue-200/70 uppercase tracking-[0.18em]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 flex flex-col sm:flex-row gap-5 w-full">
              {[
                { Icon: Globe, label: "Groupauto International", sub: "Global Ağ", desc: "Dünya genelinde entegre satın alma ve tedarik organizasyonu." },
                { Icon: Network, label: "Groupauto Türkiye", sub: "Yerel Hakimiyet", desc: "Türkiye genelinde yaygın bayi ve dağıtım gücü." },
              ].map((item, i) => (
                <div
                  key={item.label}
                  ref={ref}
                  className={`do-reveal ${i === 1 ? "do-d2" : "do-d1"} group relative flex-1 overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-sm p-8 transition-all duration-500 hover:border-white/40 hover:bg-white/[0.1] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)] min-h-[230px]`}
                >
                  <div className="do-card-beam"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-7">
                      <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-[#2547B5] group-hover:border-[#2547B5] group-hover:scale-105 transition-all duration-300">
                        <item.Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[11px] font-black tracking-[0.3em] text-blue-200/40 tabular-nums">0{i + 1}</span>
                    </div>
                    <div className="font-bold text-white text-lg leading-tight">{item.label}</div>
                    <div className="text-[11px] text-[#7d9bea] mt-1.5 uppercase tracking-[0.2em] font-semibold">{item.sub}</div>
                    <p className="text-sm text-blue-100/65 leading-relaxed font-light mt-4">{item.desc}</p>
                    <div className="mt-auto pt-5 flex items-center gap-2 text-[12px] text-blue-200/50 group-hover:text-white transition-colors duration-300">
                      <span className="w-5 h-[1.5px] bg-current"></span>
                      Detaylı Bilgi
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOJİSTİK GÜCÜMÜZ (dark) */}
      <section className="relative min-h-[640px] flex items-center overflow-hidden bg-[#0e1016] text-white">
        <div className="absolute inset-0">
          <img
            ref={opsParallax}
            src="/images/delta-oto-depot.jpg"
            alt="Delta Oto depolama ve sevkiyat altyapısı"
            className="w-full h-full object-cover opacity-25 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/85 to-[#0e1016]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 do-grid-bg"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 relative z-10 w-full">
          <div className="max-w-2xl">
            <p ref={ref} className="do-reveal text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#4d74d6] inline-block"></span>
              Lojistik Gücümüz
            </p>
            <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Güvenilir Tedarik,<br />
              <span className="text-[#7d9bea]">Güçlü Operasyon.</span>
            </h2>
            <p ref={ref} className="do-reveal do-d2 text-[16px] text-gray-300 leading-[1.85] font-light mb-5">
              Delta Oto, gelişmiş depolama ve sevkiyat altyapısıyla iş ortaklarına hızlı, düzenli ve sürdürülebilir yedek parça tedarik desteği sunar. Ümraniye'deki merkezimizden Türkiye'nin tamamına ve küresel pazarlara uzanan dağıtım ağımızla, binek ve hafif ticari araç gruplarında 250'den fazla markanın tedariğini sağlıyoruz.
            </p>

            <div ref={ref} className="do-reveal do-d3 mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { Icon: Warehouse, text: "Geniş Depolama Altyapısı" },
                { Icon: ClipboardCheck, text: "Hızlı Sipariş Hazırlama" },
                { Icon: MapPin, text: "Türkiye Geneline Hizmet" },
                { Icon: PackageCheck, text: "Güvenilir Tedarik Akışı" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-gray-300 border border-white/10 hover:border-white/25 hover:text-white rounded-md px-4 py-3 font-medium transition-colors duration-200">
                  <Icon className="w-4 h-4 text-[#7d9bea] shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* İŞ ORTAKLIĞI (light, minimal band) */}
      <section className="relative py-12 md:py-14 bg-white border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-start gap-4 max-w-xl">
              <div className="w-8 h-[2px] bg-[#1B3A8F] mt-3 shrink-0"></div>
              <div>
                <h2 ref={ref} className="do-reveal text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-[1.15] mb-3">
                  Delta ile İş Ortaklığınızı Güçlendirin
                </h2>
                <p ref={ref} className="do-reveal do-d1 text-[15px] text-slate-600 leading-relaxed font-light">
                  Geniş ürün portföyümüz, güvenilir tedarik yapımız ve sektör deneyimimizle iş ortaklarımızın sürdürülebilir büyümesine katkı sağlıyoruz.
                </p>
              </div>
            </div>
            <div ref={ref} className="do-reveal do-d2 flex flex-wrap gap-3 shrink-0">
              <button className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-6 py-3.5 rounded-md text-sm transition-colors flex items-center gap-2 group whitespace-nowrap">
                Başvuru Formu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="border border-slate-200 hover:border-[#1B3A8F]/40 text-slate-700 hover:text-[#1B3A8F] font-medium px-6 py-3.5 rounded-md text-sm transition-colors whitespace-nowrap">
                Bizimle İletişime Geçin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HABERLER VE DUYURULAR (light) */}
      <section className="py-20 md:py-28 bg-[#f4f6f9] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p ref={ref} className="do-reveal text-[#1B3A8F] text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#1B3A8F] inline-block"></span>
                Haberler ve Duyurular
              </p>
              <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Sahadaki <span className="text-[#1B3A8F]">Gelişmeler</span>
              </h2>
            </div>
            <p ref={ref} className="do-reveal do-d2 text-slate-600 text-sm max-w-xs leading-relaxed">
              50 yıllık ivmemizi her alanda somut büyümeyle sürdürüyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_ITEMS.map((item, i) => (
              <div
                key={item.title}
                ref={ref}
                className={`do-reveal ${i === 1 ? "do-d1" : i === 2 ? "do-d2" : ""} do-card bg-white border border-slate-200 rounded-xl p-8 group relative overflow-hidden flex flex-col`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B3A8F]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F] bg-[#1B3A8F]/10 border border-[#1B3A8F]/20 px-2.5 py-1 rounded">{item.date}</span>
                  <item.Icon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[10px] text-slate-600 uppercase tracking-wider">{item.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-[1.8] font-light">
                  {item.desc}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-2 text-[13px] text-[#1B3A8F] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Devamını Oku <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER (dark navy) */}
      <footer className="bg-[#0a0e1c] pt-16 md:pt-20 pb-10 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-16">

            <div>
              <img
                src="/images/delta-oto-logo.png"
                alt="Delta Oto"
                className="h-16 do-logo-invert mb-7 opacity-80"
              />
              <div className="flex items-center gap-3">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" aria-label="Sosyal medya" className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">Hızlı Bağlantılar</h4>
              <ul className="space-y-3.5">
                {["Kurumsal", "B2B Portal Girişi", "Lojistik Gücümüz", "İş Ortaklığı", "İletişim"].map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-3 h-[1px] bg-[#1B3A8F] inline-block transition-all duration-200"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">Ürün Grupları</h4>
              <ul className="space-y-3.5">
                {["Fren Sistemleri", "Filtre Grubu", "Motor Parçaları", "Elektrik & Aydınlatma", "Akü & Enerji"].map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-3 h-[1px] bg-[#1B3A8F] inline-block transition-all duration-200"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <h4 className="text-white text-xs font-bold tracking-[0.2em] mb-5">Private Label</h4>
                <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-9 w-auto rounded-md opacity-90 hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">İletişim</h4>
              <ul className="space-y-4 text-sm text-gray-500 mb-8">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 shrink-0 text-gray-500 mt-0.5" />
                  <span className="leading-relaxed">Barbaros Cd. Beyit Sk. No:17,<br />Yukarı Dudullu - Ümraniye / İstanbul</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0 text-gray-500" />
                  <a href="mailto:info@deltaoto.com" className="hover:text-white transition-colors">info@deltaoto.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0 text-gray-500" />
                  <span>0216 526 64 64 / 0216 526 33 44</span>
                </li>
              </ul>
              <div className="flex gap-3">
                {["OSS", "ISO 9001", "TS EN"].map(cert => (
                  <div key={cert} className="h-12 px-3 border border-white/8 rounded-lg flex items-center justify-center bg-white/3 hover:border-white/15 transition-colors">
                    <span className="text-[10px] text-gray-400 font-bold text-center leading-tight">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <span>© 2026 Delta Oto. Tüm hakları saklıdır.</span>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" />KVKK</a>
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Çerez Politikası</a>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1B3A8F] animate-pulse"></div>
              <span>Delta Oto · Kuruluş 1976</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

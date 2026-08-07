import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, MapPin, Mail, Phone, Globe, Truck, Zap, Network, PackageCheck } from "lucide-react";
import { MobileMenuButton, MobileDrawer } from "@/components/shared/MobileNav";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const NAV = [
  { label: "Hakkımızda",           href: "/hakkimizda"  },
  { label: "Tedarikçiler",          href: "/tedarikciler" },
  { label: "Operasyon ve Lojistik", href: "/operasyon"   },
  { label: "Kariyer",               href: "/kariyer"     },
  { label: "İletişim",              href: "/iletisim"    },
];

const MARQUEE_BRANDS = ["bosch", "brembo", "valeo", "hella", "ngk", "denso", "mahle", "trw", "sachs", "monroe", "skf", "gates", "osram", "philips"];

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

function BrandTile({ slug }: { slug: string }) {
  return (
    <div className="shrink-0 w-36 h-24 bg-white rounded-xl border border-slate-200 flex items-center justify-center px-5 shadow-sm hover:shadow-md hover:border-[#1B3A8F]/25 transition-all duration-300">
      <img
        src={`/images/brands/${slug}.png`}
        alt={slug}
        className="max-h-11 max-w-[100px] w-auto object-contain grayscale hover:grayscale-0 transition-all duration-400"
      />
    </div>
  );
}

export function LandingPage() {
  const ref = useReveal();
  const scrolled = useScrolled();
  const progress = useScrollProgress();
  const heroParallax = useParallax<HTMLImageElement>(0.12);
  const opsParallax = useParallax<HTMLImageElement>(0.1);
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  const tickerItems = ["250+ Marka", "81 İl + İhracat", "Kuruluş 1976", "Groupauto Üyesi", "Opar Ege Bölge Bayiliği", "Ümraniye Merkez", "Binek & Hafif Ticari", "Kesintisiz Lojistik"];

  return (
    <div className="do-page min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* SCROLL PROGRESS */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#1B3A8F] via-[#2547B5] to-[#7d9bea]" style={{ width: `${progress * 100}%` }}></div>
      </div>

      {/* TICKER BAR */}
      <div className="bg-[#1B3A8F] py-2 overflow-hidden">
        <div className={reducedMotion ? "do-ticker-static" : "do-ticker-inner"}>
          {(reducedMotion ? tickerItems : [...tickerItems, ...tickerItems]).map((item, i) => (
            <span key={i} className="px-8 text-xs font-bold uppercase tracking-[0.2em] text-white/90 flex items-center gap-8">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 lg:h-28 flex items-center justify-between">
          {/* Left: logo + nav */}
          <div className="flex items-center gap-8 lg:gap-12">
            <a href="#" className="flex items-center shrink-0">
              <img
                src="/images/delta-oto-logo.png"
                alt="Delta Oto 50. Yıl"
                className="h-14 sm:h-16 lg:h-20 w-auto"
              />
            </a>
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13.5px] font-medium tracking-tight text-slate-600">
              {NAV.map(({ label, href }) => (
                <Link key={href} href={href} className="whitespace-nowrap hover:text-[#1B3A8F] transition-colors duration-200 border-b-2 border-transparent pb-0.5">{label}</Link>
              ))}
            </nav>
          </div>

          {/* Right: SPART + B2B (desktop) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a href="#" className="flex items-center rounded-md overflow-hidden ring-1 ring-slate-200 hover:ring-[#1B3A8F]/40 transition-all duration-200">
              <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-7 w-auto block" />
            </a>
            <span className="block w-px h-6 bg-slate-200"></span>
            <a href="#" className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[13px] font-semibold tracking-[0.01em] px-5 py-2.5 rounded-md transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md group whitespace-nowrap">
              B2B Portal
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-3">
            <Link href="/spart" className="flex items-center rounded-md overflow-hidden ring-1 ring-slate-200">
              <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-6 w-auto block" />
            </Link>
            <MobileMenuButton onClick={() => setMenuOpen(true)} />
          </div>
        </div>
      </header>
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} items={NAV} activeHref="/" />

      {/* HERO (dark) */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0e1016] text-white">
        <div className="absolute inset-0">
          <img
            ref={heroParallax}
            src="/images/delta-oto-hero.png"
            alt=""
            className="w-full h-full object-cover opacity-30 will-change-transform"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent"></div>
        </div>
        <div className="do-hero-stripe"></div>
        <div className="absolute inset-0 do-grid-bg opacity-60"></div>
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60"></div>
        <div className="do-beam"></div>

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-24">
          <div className="max-w-4xl">
            <div ref={ref} className="do-reveal flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#4d74d6]"></div>
              <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kuruluş 1976 · Delta Oto</span>
            </div>

            <h1
              ref={ref}
              className="do-reveal do-d1 text-[34px] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-black leading-[1.05] sm:leading-[1.0] mb-6 tracking-[-0.02em] break-words"
            >
              <span className="do-hero-line">50 YILDIR</span>
              <br />
              <span className="text-white">OTOMOTİV</span>
              <br />
              <span className="text-white">AFTERMARKET'İN</span>
              <br />
              <span className="do-hero-accent">KESİNTİSİZ GÜCÜ</span>
            </h1>

            <p
              ref={ref}
              className="do-reveal do-d2 text-[17px] text-gray-300 leading-[1.75] max-w-2xl mb-10 font-light"
            >
              Binek ve hafif ticari araç yedek parça pazarında, bağımsız yenileme sektörünü 1976'dan bugüne güçlü lojistik altyapımız ve küresel tedarik ağımızla yönlendiriyoruz.
            </p>

            <div ref={ref} className="do-reveal do-d3 flex flex-wrap gap-4 items-center mb-12">
              <Link
                href="/iletisim"
                className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md text-base transition-all duration-200 flex items-center gap-2.5 group shadow-[0_0_32px_rgba(27,58,143,0.3)] hover:shadow-[0_0_48px_rgba(27,58,143,0.45)]"
              >
                Bize Ulaşın
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="text-gray-200 hover:text-white text-base font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-8 py-4 rounded-md transition-all duration-200">
                B2B Portal
              </button>
            </div>

            <div ref={ref} className="do-reveal do-d4 flex flex-wrap gap-3">
              {[
                { Icon: Globe,       text: "Groupauto Üyesi" },
                { Icon: PackageCheck, text: "50.000+ Aktif SKU" },
                { Icon: Truck,       text: "Cumartesi Sevkiyat" },
                { Icon: Network,     text: "3 Operasyon Merkezi" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-gray-200 text-[13px] font-medium border border-white/15 bg-white/[0.04] rounded-full px-4 py-2">
                  <Icon className="w-4 h-4 text-[#7d9bea]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-6 lg:right-8 hidden sm:flex items-center gap-2.5 text-white/40 text-[11px] font-medium uppercase tracking-[0.2em]">
          Kaydırın
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* POWER METRICS (light) */}
      <section className="relative bg-[#f8fafc] border-y border-slate-200 py-16 md:py-20 overflow-hidden">
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
                Groupauto International'ın Türkiye üyesiyiz. Bu üyelik; 40'tan fazla ülkedeki 3.000'i aşkın üye firma gücünü doğrudan satın alma kaldıracımıza dönüştürür. Global ağın tedarik kapasitesiyle Türkiye pazarının dinamiklerini tek bir çatı altında buluşturuyoruz.
              </p>

              <div ref={ref} className="do-reveal do-d3 mt-12 flex gap-12">
                {[
                  { target: 50, suffix: "+", label: "Global Tedarikçi" },
                  { target: 40, suffix: "+", label: "Ülke Ağı" },
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
                { Icon: Globe, label: "Groupauto International", sub: "40+ Ülke · 3.000+ Üye Firma", desc: "Dünyanın en büyük bağımsız yedek parça ağı: global satın alma gücü, ortak kalite standartları ve uluslararası tedarik kapasitesi." },
                { Icon: Network, label: "Groupauto Türkiye", sub: "Delta Oto Bünyesinde", desc: "Türkiye'de Groupauto ağının operasyonel ayağı. Global satın alma avantajını yerel stok derinliği ve lojistik hızıyla birleştiriyoruz." },
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

      {/* OPERATIONS & LOGISTICS (dark) */}
      <section className="relative overflow-hidden bg-[#0e1016] text-white">
        <div className="absolute inset-0">
          <img
            ref={opsParallax}
            src="/images/delta-oto-ops.png"
            alt="Operations"
            className="w-full h-full object-cover opacity-25 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/85 to-[#0e1016]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 do-grid-bg"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 relative z-10 w-full">
          <div className="max-w-2xl mb-14">
            <p ref={ref} className="do-reveal text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#4d74d6] inline-block"></span>
              Lojistik Altyapı
            </p>
            <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Üç Merkezden,<br />
              <span className="do-hero-accent">81 İle Kesintisiz.</span>
            </h2>
            <p ref={ref} className="do-reveal do-d2 text-[16px] text-gray-300 leading-[1.85] font-light">
              Ümraniye, Gebze ve İzmir'deki operasyon merkezlerimizden Türkiye'nin tamamına ve küresel pazarlara uzanan dağıtım ağıyla; binek ve hafif ticari araç gruplarında 250'den fazla markanın tedariğini hız ve güvenilirlik standartlarında gerçekleştiriyoruz.
            </p>
          </div>

          <div ref={ref} className="do-reveal do-d3 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Her İş Günü Sevkiyat", desc: "Hafta içi her gün düzenli yükleme. Cumartesi sevkiyat kapasitesiyle hizmet sürekliliği korunur." },
              { title: "Aynı Gün Sevk", desc: "14:00'a kadar iletilen siparişler, stokta olan ürünler için aynı gün yola çıkar." },
              { title: "Derin Stok", desc: "50.000'i aşkın aktif SKU ile talep edilen ürünün büyük bölümü hazır stoktan karşılanır." },
              { title: "İhracat Kapasitesi", desc: "Groupauto International kanallarıyla Türkiye dışı pazarlara da ürün ihracatı gerçekleştirilir." },
            ].map((card, i) => (
              <div key={card.title} ref={ref} className={`do-reveal ${i > 0 ? `do-d${i}` : ""} group relative border border-white/10 rounded-xl p-6 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300 cursor-default`}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#4d74d6] mb-4"></div>
                <h3 className="text-[14px] font-bold text-white mb-2 leading-snug">{card.title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENDA & VISION (white) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p ref={ref} className="do-reveal text-[#1B3A8F] text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#1B3A8F] inline-block"></span>
                Gündem & Vizyon
              </p>
              <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Sahadaki <span className="text-[#1B3A8F]">Gelişmeler</span>
              </h2>
            </div>
            <p ref={ref} className="do-reveal do-d2 text-slate-600 text-sm max-w-xs leading-relaxed">
              Sektördeki gelişmeleri ve Delta Oto'nun sahaya yansıyan adımlarını buradan takip edebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              ref={ref}
              className="do-reveal do-card bg-[#f8fafc] border border-slate-200 rounded-xl p-10 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B3A8F]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F] bg-[#1B3A8F]/10 border border-[#1B3A8F]/20 px-2.5 py-1 rounded">Mayıs 2026</span>
                <Zap className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] text-slate-600 uppercase tracking-wider">Yeni Operasyon</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 leading-snug">
                Opar Ege Bölge Bayiliği Operasyonu Başladı
              </h3>
              <p className="text-[15px] text-slate-600 leading-[1.8] font-light">
                Mayıs 2026 itibarıyla Opar Ege Bölge Bayiliği operasyonunu devralarak Ege bölgesindeki tedarik ağımızı doğrudan genişlettik. Bu adımla birlikte bölgeye yönelik ürün çeşitliliğimiz ve teslimat kapasitemiz önemli ölçüde güçlendi.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[13px] text-[#1B3A8F] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Devamını Oku <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              ref={ref}
              className="do-reveal do-d2 do-card bg-[#f8fafc] border border-slate-200 rounded-xl p-10 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B3A8F]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F] bg-[#1B3A8F]/10 border border-[#1B3A8F]/20 px-2.5 py-1 rounded">2025 — Dubai</span>
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] text-slate-600 uppercase tracking-wider">Uluslararası Zirve</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 leading-snug">
                Groupauto International Dubai O2O Tedarikçi Günleri 2025
              </h3>
              <p className="text-[15px] text-slate-600 leading-[1.8] font-light">
                Dubai'de düzenlenen Groupauto International O2O Tedarikçi Günleri'nde Türkiye'yi ve Delta Oto'yu temsil ettik. 35'ten fazla global üreticiyle gerçekleştirilen görüşmelerde tedarik portföyümüzü ve piyasa trendlerini ele aldık.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[13px] text-[#1B3A8F] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Devamını Oku <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS MARQUEE (light) */}
      <section className="bg-[#f8fafc] py-20 md:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div>
            <p ref={ref} className="do-reveal text-[#1B3A8F] text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#1B3A8F] inline-block"></span>
              Marka Portföyü
            </p>
            <h2 ref={ref} className="do-reveal do-d1 text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              250+ Küresel ve Yerel Marka, Tek Çatı
            </h2>
          </div>
          <div ref={ref} className="do-reveal do-d2 shrink-0">
            <Link href="/tedarikciler" className="inline-flex items-center gap-2 text-[#1B3A8F] text-sm font-semibold hover:gap-3 transition-all">
              Tüm Markaları İnceleyin <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="do-bm-wrap py-2">
          <div className={`do-bm-track ${reducedMotion ? "" : "do-ltr"} pl-4`}>
            {(reducedMotion ? MARQUEE_BRANDS : [...MARQUEE_BRANDS, ...MARQUEE_BRANDS]).map((b, i) => <BrandTile key={i} slug={b} />)}
          </div>
        </div>
      </section>

      {/* CTA BAND (navy) */}
      <section className="relative py-20 md:py-28 bg-[#1B3A8F] overflow-hidden text-white">
        <div className="absolute inset-0 do-grid-bg opacity-30"></div>
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 bottom-0 w-64 h-64 rounded-full bg-white/[0.04] blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            <div>
              <span ref={ref} className="do-reveal inline-flex items-center gap-3 text-blue-200 text-xs font-bold uppercase tracking-[0.3em] mb-5">
                <span className="w-8 h-[2px] bg-blue-300 inline-block"></span>
                B2B Portal
              </span>
              <h2 ref={ref} className="do-reveal do-d1 text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] max-w-xl">
                Güçlü Ortaklık, Kesintisiz Tedarik
              </h2>
              <p ref={ref} className="do-reveal do-d2 text-white/70 text-base mt-4 max-w-md leading-relaxed">
                Portalımız üzerinden yedek parça siparişi verebilir, anlık stok ve fiyat bilgilerine 7/24 ulaşabilirsiniz.
              </p>
            </div>
            <div ref={ref} className="do-reveal do-d3 flex flex-col gap-4 shrink-0 w-full sm:w-auto">
              <div className="flex gap-4">
                <button className="bg-white text-[#1B3A8F] font-bold px-8 py-4 rounded-md hover:bg-gray-100 transition-colors text-sm flex items-center gap-2 group">
                  B2B Portal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <Link href="/iletisim" className="border border-white/30 hover:border-white/60 text-white font-medium px-8 py-4 rounded-md transition-colors text-sm inline-flex items-center">
                  İletişim
                </Link>
              </div>
            </div>
          </div>
          <div ref={ref} className="do-reveal do-d4 flex flex-wrap gap-6 pt-8 border-t border-white/10 text-[13px] text-blue-100/70">
            {["Aynı gün sevkiyat · 14:00 kesim saati", "50.000+ aktif SKU", "81 il + ihracat kapsamı"].map(t => (
              <span key={t} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7d9bea]"></span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

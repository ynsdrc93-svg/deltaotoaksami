import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, MapPin, Mail, Phone, Globe, Zap, Network, Menu, X } from "lucide-react";
import { useReveal, useScrolled, useCounter, useScrollProgress, useParallax, useEscapeKey } from "../hooks/use-motion";
import TurkeyMap from "turkey-map-react";
import { cities as turkeyCities } from "turkey-map-react/lib/data";

const OPS_HUB_PLATES = [34, 41, 35]; // İstanbul (Ümraniye), Kocaeli (Gebze), İzmir
const OPS_HUB_PATHS = turkeyCities.filter((c) => OPS_HUB_PLATES.includes(c.plateNumber));

function MetricItem({ number, suffix = "", label, delay = "0ms", plus = false, animate = true }: { number: number; suffix?: string; label: string; delay?: string; plus?: boolean; animate?: boolean }) {
  const [started, setStarted] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const count = useCounter(number, 1800, animate && started);
  useEffect(() => {
    if (!animate) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (divRef.current) obs.observe(divRef.current);
    return () => obs.disconnect();
  }, [animate]);
  const shown = animate ? (started ? count : 0) : number;
  return (
    <div ref={divRef} className="text-center px-10 py-10 md:py-0 relative" style={{ transitionDelay: delay }}>
      <div className="do-metric-num text-6xl md:text-7xl xl:text-8xl font-black mb-3 leading-none tracking-tighter">
        {suffix}{shown}
        {plus && "+"}
      </div>
      <div className="text-slate-600 text-sm font-medium tracking-widest uppercase leading-relaxed max-w-[180px] mx-auto">{label}</div>
    </div>
  );
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

const NAV_LINKS = [
  { label: "Hakkımızda",           href: "/hakkimizda"  },
  { label: "Tedarikçiler",          href: "/tedarikciler" },
  { label: "Operasyon ve Lojistik", href: "/operasyon"   },
  { label: "Kariyer",               href: "/kariyer"     },
  { label: "İletişim",              href: "/iletisim"    },
];

export function LandingPage() {
  const ref = useReveal();
  const scrolled = useScrolled();
  const progress = useScrollProgress();
  const heroParallax = useParallax<HTMLImageElement>(0.12);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEscapeKey(() => setMobileOpen(false), mobileOpen);

  const tickerItems = ["250+ Marka", "81 İl + İhracat", "Kuruluş 1976", "Groupauto Üyesi", "Opar Ege Bölge Bayiliği", "Ümraniye Merkez", "Binek & Hafif Ticari", "Kesintisiz Lojistik"];

  return (
    <div className="do-page min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* SCROLL PROGRESS */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#1B3A8F] via-[#2547B5] to-[#7d9bea]" style={{ width: `${progress * 100}%` }}></div>
      </div>

      {/* TICKER BAR */}
      <div className="bg-[#1B3A8F] py-2 overflow-hidden">
        <div className="do-ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-28 flex items-center justify-between">
          {/* Left: logo + nav */}
          <div className="flex items-center gap-8 lg:gap-12">
            <a href="#" className="flex items-center shrink-0">
              <img
                src="/images/delta-oto-logo.png"
                alt="Delta Oto 50. Yıl"
                className="h-16 sm:h-20 w-auto"
              />
            </a>
            <nav className="hidden xl:flex items-center gap-6 xl:gap-8 text-[13.5px] font-medium tracking-tight text-slate-600">
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={href} href={href} className="do-nav-link whitespace-nowrap hover:text-[#1B3A8F] transition-colors duration-200">{label}</Link>
              ))}
            </nav>
          </div>

          {/* Right: SPART + B2B + mobile toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <a href="#" className="hidden xl:flex items-center rounded-md overflow-hidden ring-1 ring-slate-200 hover:ring-[#1B3A8F]/40 transition-all duration-200">
              <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-7 w-auto block" />
            </a>
            <span className="hidden xl:block w-px h-6 bg-slate-200"></span>
            <a href="#" className="bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white text-xs sm:text-[13px] font-semibold tracking-[0.01em] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md group whitespace-nowrap">
              B2B Portal
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <button
              type="button"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              aria-controls="do-landing-mobile-nav"
              onClick={() => setMobileOpen(o => !o)}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        <div id="do-landing-mobile-nav" className={`do-mobile-panel xl:hidden border-slate-200 ${mobileOpen ? "do-open border-t" : ""}`}>
          <div>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-[15px] font-medium text-slate-700 hover:text-[#1B3A8F] border-b border-slate-100 last:border-b-0"
                >
                  {label}
                </Link>
              ))}
              <a href="#" onClick={() => setMobileOpen(false)} className="py-3 text-[15px] font-medium text-slate-700 hover:text-[#1B3A8F] flex items-center gap-2">
                SPART
                <img src="/images/spart-logo.png" alt="" className="h-5 w-auto" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO (dark) */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0e1016] text-white">
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

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-20 pb-32">
          <div className="max-w-4xl">
            <div ref={ref} className="do-reveal flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#4d74d6]"></div>
              <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kuruluş 1976 · Delta Oto</span>
            </div>

            <h1
              ref={ref}
              className="do-reveal do-d1 text-[34px] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-black leading-[1.05] sm:leading-[1.0] mb-6 tracking-[-0.02em] break-words"
            >
              <span className="do-hero-line">50 YILDIR</span> <span className="text-white">OTOMOTİV AFTERMARKET'İN</span>
              <br />
              <span className="text-[#7d9bea]">KESİNTİSİZ GÜCÜ</span>
            </h1>

            <p
              ref={ref}
              className="do-reveal do-d2 text-[17px] text-gray-300 leading-[1.75] max-w-2xl mb-12 font-light"
            >
              Binek ve hafif ticari araç yedek parça pazarında, bağımsız yenileme sektörünü güçlü lojistik altyapımız ve küresel tedarik ağımızla yönlendiriyoruz.
            </p>

            <div ref={ref} className="do-reveal do-d3 flex flex-wrap gap-4 items-center">
              <Link to="/iletisim">
                <button className="bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white font-semibold px-8 py-4 rounded-md text-base transition-all duration-200 flex items-center gap-2.5 group shadow-[0_0_32px_rgba(27,58,143,0.3)] hover:shadow-[0_0_48px_rgba(27,58,143,0.45)]">
                  Bize Ulaşın
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="text-gray-200 hover:text-white active:scale-[0.98] text-base font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-8 py-4 rounded-md transition-all duration-200">
                B2B Portal
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white animate-pulse"></div>
        </div>
      </section>

      {/* POWER METRICS (light) */}
      <section className="relative bg-[#f4f6f9] border-y border-slate-200 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg-light"></div>
        <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1B3A8F]/40 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <MetricItem number={250} plus label="Aktif Marka" delay="0ms" />
            <MetricItem number={81} plus label="İl + İhracat" delay="80ms" />
            <MetricItem number={1976} label="Kuruluş Yılı" delay="160ms" animate={false} />
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

            <div
              ref={ref}
              className="do-reveal do-d1 lg:w-1/2 w-full relative rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-sm overflow-hidden flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/10"
            >
              {[
                { Icon: Globe, label: "Groupauto International", tag: "Global Ağ", sub: "40+ Ülke · 3.000+ Üye Firma", desc: "Dünyanın en büyük bağımsız yedek parça ağı: global satın alma gücü, ortak kalite standartları ve uluslararası tedarik kapasitesi." },
                { Icon: Network, label: "Groupauto Türkiye", tag: "Yerel Ayak", sub: "Delta Oto Bünyesinde", desc: "Türkiye'de Groupauto ağının operasyonel ayağı. Global satın alma avantajını yerel stok derinliği ve lojistik hızıyla birleştiriyoruz." },
              ].map((item) => (
                <div key={item.label} className="group relative flex-1 p-8 transition-colors duration-500 hover:bg-white/[0.05]">
                  <div className="do-card-beam"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-7">
                      <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-[#2547B5] group-hover:border-[#2547B5] group-hover:scale-105 transition-all duration-300">
                        <item.Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[10px] font-black tracking-[0.25em] text-blue-200/50 uppercase">{item.tag}</span>
                    </div>
                    <div className="font-bold text-white text-lg leading-tight">{item.label}</div>
                    <div className="text-[11px] text-[#7d9bea] mt-1.5 uppercase tracking-[0.2em] font-semibold">{item.sub}</div>
                    <p className="text-sm text-blue-100/65 leading-relaxed font-light mt-4">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
                Lojistik Altyapı
              </p>
              <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                Üç Merkezden,<br />
                <span className="text-[#7d9bea]">81 İle Kesintisiz.</span>
              </h2>
              <p ref={ref} className="do-reveal do-d2 text-[16px] text-gray-300 leading-[1.85] font-light">
                Ümraniye, Gebze ve İzmir'deki operasyon merkezlerimizden Türkiye'nin tamamına ve küresel pazarlara uzanan dağıtım ağıyla; binek ve hafif ticari araç gruplarında 250'den fazla markanın tedariğini hız ve güvenilirlik standartlarında gerçekleştiriyoruz.
              </p>
              <div ref={ref} className="do-reveal do-d3 flex flex-wrap gap-x-6 gap-y-2 mt-8">
                {[
                  { label: "Ümraniye", plate: 34 },
                  { label: "Gebze", plate: 41 },
                  { label: "İzmir", plate: 35 },
                ].map((h) => (
                  <div key={h.plate} className="flex items-center gap-2 text-[13px] text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-[#7d9bea] inline-block"></span>
                    {h.label}
                  </div>
                ))}
              </div>
            </div>

            <div ref={ref} className="do-reveal do-d2 lg:w-[56%] w-full relative">
              <TurkeyMap
                hoverable
                showTooltip
                customStyle={{ idleColor: "#1B3A8F", hoverColor: "#4d74d6" }}
              />
              {/* turkey-map-react has no per-city color prop; overlay the 3 hub
                  provinces' own path data (same viewBox) with the accent fill. */}
              <svg
                viewBox="0 80 1050 585"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                {OPS_HUB_PATHS.map((c) => (
                  <path key={c.id} d={c.path} fill="#7d9bea" />
                ))}
              </svg>
            </div>
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

      {/* AGENDA & VISION (light) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p ref={ref} className="do-reveal text-[#1B3A8F] text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#1B3A8F] inline-block"></span>
              Gündem & Vizyon
            </p>
            <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Sahadaki <span className="text-[#1B3A8F]">Gelişmeler</span>
            </h2>
            <p ref={ref} className="do-reveal do-d2 text-slate-600 text-sm max-w-xl leading-relaxed">
              Sektördeki gelişmeleri ve Delta Oto'nun sahaya yansıyan adımlarını buradan takip edebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              ref={ref}
              className="do-reveal do-card bg-[#f4f6f9] border border-slate-200 rounded-xl p-10 group relative overflow-hidden"
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
            </div>

            <div
              ref={ref}
              className="do-reveal do-d2 do-card bg-[#f4f6f9] border border-slate-200 rounded-xl p-10 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B3A8F]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F] bg-[#1B3A8F]/10 border border-[#1B3A8F]/20 px-2.5 py-1 rounded">2025 · Dubai</span>
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] text-slate-600 uppercase tracking-wider">Uluslararası Zirve</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 leading-snug">
                Groupauto International Dubai O2O Tedarikçi Günleri 2025
              </h3>
              <p className="text-[15px] text-slate-600 leading-[1.8] font-light">
                Dubai'de düzenlenen Groupauto International O2O Tedarikçi Günleri'nde Türkiye'yi ve Delta Oto'yu temsil ettik. 35'ten fazla global üreticiyle gerçekleştirilen görüşmelerde tedarik portföyümüzü ve piyasa trendlerini ele aldık.
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
              Yedek Parça Siparişleriniz için B2B Portalımız
            </h2>
            <p ref={ref} className="do-reveal do-d1 text-white/75 text-base mt-3">
              Portalımız üzerinden yedek parça siparişi verebilir, stok ve fiyat bilgilerine ulaşabilirsiniz.
            </p>
          </div>
          <div ref={ref} className="do-reveal do-d2 flex gap-4 shrink-0">
            <button className="bg-white text-[#1B3A8F] font-bold px-8 py-4 rounded-md hover:bg-gray-100 active:scale-[0.98] transition-colors text-sm flex items-center gap-2 group">
              B2B Portal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link to="/iletisim">
              <button className="border border-white/30 hover:border-white/60 active:scale-[0.98] text-white font-medium px-8 py-4 rounded-md transition-colors text-sm">
                İletişim
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER (dark) */}
      <footer className="bg-[#0a0c11] pt-16 md:pt-20 pb-10 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">

            <div>
              <img
                src="/images/delta-oto-logo.png"
                alt="Delta Oto"
                className="h-14 do-logo-invert mb-8 opacity-85"
              />
              <ul className="space-y-4 text-sm text-gray-500">
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
            </div>

            <div className="md:pl-6">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">Hızlı Bağlantılar</h4>
              <ul className="space-y-3.5">
                {["Kurumsal", "B2B Portal Girişi", "İletişim", "Gizlilik Politikası"].map(link => (
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
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">Sertifikalar & Üyelikler</h4>
              <div className="flex gap-4 mb-8">
                {["OSS\nDerneği", "ISO\n9001", "TS\nEN"].map(cert => (
                  <div key={cert} className="w-20 h-16 border border-white/8 rounded-lg flex items-center justify-center bg-white/3 hover:border-white/15 transition-colors">
                    <span className="text-[10px] text-gray-400 font-bold text-center whitespace-pre-line leading-tight">{cert}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                Kalite standartlarımız ve sektörel üyeliklerimizle güvenilir iş ortaklığının güvencesini sunuyoruz.
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <span>© 2026 Delta Oto. Tüm hakları saklıdır.</span>
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

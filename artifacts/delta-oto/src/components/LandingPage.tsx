import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, ArrowRight, MapPin, Mail, Phone, Globe, Truck, Shield, Zap, Network } from "lucide-react";

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

export function LandingPage() {
  const ref = useReveal();
  const scrolled = useScrolled();
  const progress = useScrollProgress();
  const heroParallax = useParallax<HTMLImageElement>(0.12);
  const opsParallax = useParallax<HTMLImageElement>(0.1);

  const tickerItems = ["250+ Marka", "81 İl + İhracat", "1976'dan Bu Yana", "Groupauto Üyesi", "Opar Ege Bölge Bayiliği", "Ümraniye Merkez", "Binek & Hafif Ticari", "Sıfır Hata Toleransı"];

  return (
    <div className="do-page min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <style>{CSS}</style>

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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between gap-8">
          <a href="#" className="flex items-center shrink-0">
            <img
              src="/images/delta-oto-logo.png"
              alt="Delta Oto 50. Yıl"
              className="h-8 w-auto"
            />
          </a>

          <nav className="hidden xl:flex items-center gap-8 text-[13px] font-medium tracking-tight text-slate-600">
            {["Hakkımızda", "Tedarikçiler", "Operasyon ve Lojistik", "Kariyer", "İletişim"].map(link => (
              <a key={link} href="#" className="do-nav-link whitespace-nowrap hover:text-[#1B3A8F] transition-colors duration-200">{link}</a>
            ))}
          </nav>

          <div className="flex items-center gap-5 shrink-0">
            <a href="#" className="hidden lg:flex items-center rounded-md overflow-hidden ring-1 ring-slate-200 hover:ring-[#1B3A8F]/40 transition-all duration-200">
              <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-7 w-auto block" />
            </a>
            <span className="hidden lg:block w-px h-6 bg-slate-200"></span>
            <a href="#" className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[13px] font-semibold tracking-[0.01em] px-5 py-2.5 rounded-md transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md group">
              B2B Portal
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
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
              <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">1976 · 50 Yıllık Sektörel Güç</span>
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
              <span className="text-[#7d9bea]">KESİNTİSİZ GÜCÜ</span>
            </h1>

            <p
              ref={ref}
              className="do-reveal do-d2 text-[17px] text-gray-300 leading-[1.75] max-w-2xl mb-12 font-light"
            >
              Binek ve hafif ticari araç yedek parça pazarında, bağımsız yenileme sektörünü 1976'dan bugüne güçlü lojistik altyapımız ve küresel tedarik ağımızla yönlendiriyoruz.
            </p>

            <div ref={ref} className="do-reveal do-d3 flex flex-wrap gap-4 items-center">
              <button className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md text-base transition-all duration-200 flex items-center gap-2.5 group shadow-[0_0_32px_rgba(27,58,143,0.3)] hover:shadow-[0_0_48px_rgba(27,58,143,0.45)]">
                Operasyon Gücümüzü İnceleyin
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-gray-200 hover:text-white text-base font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-8 py-4 rounded-md transition-all duration-200">
                Hakkımızda
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

      {/* POWER METRICS (light) */}
      <section className="relative bg-[#f4f6f9] border-y border-slate-200 py-20 overflow-hidden">
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
      <section className="py-28 relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #1B3A8F 0%, #14275c 100%)" }}>
        <div className="absolute inset-0 do-grid-bg opacity-40"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        <div className="do-beam do-beam-delay"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
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

      {/* OPERATIONS & LOGISTICS (dark) */}
      <section className="relative min-h-[640px] flex items-center overflow-hidden bg-[#0e1016] text-white">
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

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28 relative z-10 w-full">
          <div className="max-w-2xl">
            <p ref={ref} className="do-reveal text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#4d74d6] inline-block"></span>
              Operasyon & Lojistik
            </p>
            <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Kesintisiz Tedarik.<br />
              <span className="text-[#7d9bea]">Sıfır Hata Toleransı.</span>
            </h2>
            <p ref={ref} className="do-reveal do-d2 text-[16px] text-gray-300 leading-[1.85] font-light mb-5">
              Otomotiv satış sonrası pazarında mazerete yer yoktur. Lojistiği sadece bir taşıma işlemi değil, iş ortaklarımız için stratejik bir rekabet avantajı olarak yönetiyoruz. Ümraniye'deki merkezimizden Türkiye'nin tamamına ve küresel pazarlara uzanan dağıtım ağımızla, binek ve hafif ticari araç gruplarında 250'den fazla markanın tedariğini sağlıyoruz.
            </p>
            <p ref={ref} className="do-reveal do-d3 text-[16px] text-gray-300 leading-[1.85] font-light">
              Yakın zamanda Opar Ege Bölge Bayiliği'ni de bünyemize katarak sahadaki gücümüzü pekiştirdik.
            </p>

            <div ref={ref} className="do-reveal do-d4 mt-10 flex flex-wrap gap-3">
              {["Tam Günlük Dağıtım", "Soğuk Zincir", "Stok Optimizasyonu", "İhracat Lojistiği"].map(chip => (
                <span key={chip} className="text-xs text-gray-300 border border-white/10 hover:border-white/25 hover:text-white rounded-md px-3 py-1.5 font-medium transition-colors duration-200">{chip}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AGENDA & VISION (light) */}
      <section className="py-28 bg-white">
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
              50 yıllık ivmemizi her alanda somut büyümeyle sürdürüyoruz.
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
                Yarım asırlık büyüme ivmemizi sahada yeni yatırımlarla somutlaştırıyoruz. Mayıs 2026 itibarıyla Opar Ege Bölge Bayiliği operasyonunu devralarak Ege bölgesindeki tedarik ağımızı doğrudan genişlettik. Hedefimiz net: İş ortaklarımıza her koşulda daha hızlı, daha geniş ve daha güçlü bir envanter sunmak.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[13px] text-[#1B3A8F] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Devamını Oku <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              ref={ref}
              className="do-reveal do-d2 do-card bg-[#f4f6f9] border border-slate-200 rounded-xl p-10 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B3A8F]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F] bg-[#1B3A8F]/10 border border-[#1B3A8F]/20 px-2.5 py-1 rounded">27–29 Mayıs 2026</span>
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] text-slate-600 uppercase tracking-wider">Uluslararası Zirve</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-5 leading-snug">
                GROUPAUTO O2O Europe & O2O Heavy Duty Days 2026 — Mallorca
              </h3>
              <p className="text-[15px] text-slate-600 leading-[1.8] font-light">
                27-29 Mayıs tarihlerinde düzenlenen uluslararası zirvede Türkiye'yi ve yerel gücümüzü temsil ettik. İş ortaklarımızın pazar rekabetinde daha da güçlenmesi ve yeni fırsatlara erişimi için 35 farklı global üreticiyle kritik görüşmeler gerçekleştirdik. Sektörün geleceği yazılırken masadayız.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[13px] text-[#1B3A8F] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Devamını Oku <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND (navy) */}
      <section className="relative py-24 bg-[#1B3A8F] overflow-hidden text-white">
        <div className="absolute inset-0 do-grid-bg opacity-30"></div>
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 ref={ref} className="do-reveal text-3xl md:text-4xl font-black text-white tracking-tight">
              İş ortağımız olmak ister misiniz?
            </h2>
            <p ref={ref} className="do-reveal do-d1 text-white/75 text-base mt-3">
              B2B portalımıza erişin, ağımıza katılın.
            </p>
          </div>
          <div ref={ref} className="do-reveal do-d2 flex gap-4 shrink-0">
            <button className="bg-white text-[#1B3A8F] font-bold px-8 py-4 rounded-md hover:bg-gray-100 transition-colors text-sm flex items-center gap-2 group">
              B2B Portal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="border border-white/30 hover:border-white/60 text-white font-medium px-8 py-4 rounded-md transition-colors text-sm">
              İletişim
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER (dark) */}
      <footer className="bg-[#0a0c11] pt-20 pb-10 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">

            <div>
              <img
                src="/images/delta-oto-logo.png"
                alt="Delta Oto"
                className="h-10 do-logo-invert mb-8 opacity-80"
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
                <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-5">Private Label</h4>
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
              <span>50 Yıllık Sektörel Güç · 1976'dan Bu Yana</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

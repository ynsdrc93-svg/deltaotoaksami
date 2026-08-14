import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, Globe, Zap, Network, Menu, X, Handshake } from "lucide-react";
import { useReveal, useScrolled, useCounter, useScrollProgress, useParallax, useEscapeKey } from "../hooks/use-motion";
import { SiteFooter } from "./shared/SiteFooter";
import { BrandLogo } from "./shared/BrandLogo";
import TurkeyMap from "turkey-map-react";
import { cities as turkeyCities } from "turkey-map-react/lib/data";
import { CLASSIFIED_BRANDS, type Brand } from "../lib/brands";

// Şerit, Tedarikçiler sayfasıyla AYNI kaynağı (CLASSIFIED_BRANDS — Excel'in
// 61 markası) kullanır; Excel'de olmayan markalar burada da gösterilmez
// (bkz. brands.ts UNCLASSIFIED_BRANDS notu). hasVerifiedLogo:false olan
// markalar gerçek logo yerine tipografik yer tutucuyla akar — bkz.
// shared/BrandLogo.tsx (size="strip"). 3 satıra, sabit dilim yerine
// dinamik olarak eşit bölünür; böylece marka sayısı Excel güncellendiğinde
// satırlar otomatik dengelenir.
const STRIP_BRANDS = CLASSIFIED_BRANDS;
const STRIP_ROWS = 3;
const STRIP_CHUNK = Math.ceil(STRIP_BRANDS.length / STRIP_ROWS);
const BRAND_STRIPS = Array.from({ length: STRIP_ROWS }, (_, i) =>
  STRIP_BRANDS.slice(i * STRIP_CHUNK, (i + 1) * STRIP_CHUNK),
).filter((strip) => strip.length > 0);

const OPS_HUB_PLATES = [34, 41, 35]; // İstanbul (Ümraniye), Kocaeli (Gebze), İzmir
const OPS_HUB_PATHS = turkeyCities.filter((c) => OPS_HUB_PLATES.includes(c.plateNumber));
const OPS_HUB_POINTS: [number, number][] = [
  [193.6, 211.0], // Ümraniye / İstanbul
  [241.0, 236.5], // Gebze / Kocaeli
  [96.7, 376.5],  // İzmir
];

// Dağıtım rotaları: 3 merkezden ülke geneline uzanan ok çizgileri.
// Uçlar turkey-map-react'in path verisinden hesaplanan yaklaşık il merkezleri
// (bounding-box centroid), haritayla aynı viewBox ("0 80 1050 585") üzerinde.
const DISTRIBUTION_ROUTES: { from: [number, number]; to: [number, number] }[] = [
  { from: [193.6, 211.0], to: [555.7, 218.6] }, // Ümraniye -> Samsun (Karadeniz)
  { from: [193.6, 211.0], to: [750.7, 246.5] }, // Ümraniye -> Trabzon (Doğu Karadeniz)
  { from: [193.6, 211.0], to: [911.6, 256.6] }, // Ümraniye -> Kars (uç kuzeydoğu)
  { from: [193.6, 211.0], to: [836.8, 293.1] }, // Ümraniye -> Erzurum (Doğu Anadolu)
  { from: [193.6, 211.0], to: [959.2, 387.8] }, // Ümraniye -> Van (uç doğu)
  { from: [193.6, 211.0], to: [365.1, 325.1] }, // Ümraniye -> Ankara (İç Anadolu)
  { from: [193.6, 211.0], to: [550.4, 406.2] }, // Ümraniye -> Kayseri (İç Anadolu)
  { from: [193.6, 211.0], to: [623.3, 336.2] }, // Ümraniye -> Sivas (İç/Doğu geçiş)
  { from: [193.6, 211.0], to: [621.8, 498.8] }, // Ümraniye -> Gaziantep (Güneydoğu Anadolu)
  { from: [193.6, 211.0], to: [780.0, 425.9] }, // Ümraniye -> Diyarbakır (Güneydoğu Anadolu)
  { from: [193.6, 211.0], to: [717.9, 480.5] }, // Ümraniye -> Şanlıurfa (Güneydoğu Anadolu)
  { from: [193.6, 211.0], to: [533.1, 476.7] }, // Ümraniye -> Adana (Akdeniz/Çukurova)
  { from: [241.0, 236.5], to: [195.1, 287.0] }, // Gebze -> Bursa (yakın Marmara)
  { from: [241.0, 236.5], to: [295.8, 323.5] }, // Gebze -> Eskişehir (İç Anadolu batı)
  { from: [241.0, 236.5], to: [437.4, 207.8] }, // Gebze -> Kastamonu (Batı Karadeniz)
  { from: [241.0, 236.5], to: [387.5, 437.6] }, // Gebze -> Konya (İç Anadolu güney)
  { from: [96.7, 376.5],  to: [277.6, 519.5] }, // İzmir -> Antalya (Akdeniz)
  { from: [96.7, 376.5],  to: [149.2, 495.1] }, // İzmir -> Muğla (Ege güney)
];

// Her rotaya hafif rastgele bir gecikme/süre ata — hepsi aynı anda değil,
// organik/dağınık bir ritimde art arda "uçar" gibi görünsün. Kısa gecikme +
// kısa döngü süresi = bölüm göründüğü anda hızla harekete geçen, dinamik bir his.
const ROUTE_TIMING = DISTRIBUTION_ROUTES.map(() => ({
  delay: +(Math.random() * 1.8).toFixed(2),
  duration: +(3 + Math.random() * 1.5).toFixed(2),
}));

/** İki nokta arasında hafif yukarı kavisli bir uçuş-rotası eğrisi (quadratic bezier). */
function routeArcPath([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const candidates: [number, number][] = [[-dy / len, dx / len], [dy / len, -dx / len]];
  const [px, py] = candidates[0][1] < candidates[1][1] ? candidates[0] : candidates[1];
  const bow = len * 0.16;
  const mx = (x1 + x2) / 2 + px * bow;
  const my = (y1 + y2) / 2 + py * bow;
  return `M ${x1},${y1} Q ${mx.toFixed(1)},${my.toFixed(1)} ${x2},${y2}`;
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
  // Çift eşik (90 gir / 20 çık): header'ın kendi yükseklik geçişi scroll
  // pozisyonunu hafifçe kaydırabildiği (scroll anchoring) için tek eşik,
  // sınırda ileri-geri salınıma (jitter) yol açıyordu — bkz. useScrolled.
  const scrolled = useScrolled(90, 20);
  const progress = useScrollProgress();
  const heroParallax = useParallax<HTMLImageElement>(0.12);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEscapeKey(() => setMobileOpen(false), mobileOpen);

  // Mobil marka şeridi dokunma davranışı: bir şeride dokunmak YALNIZCA o
  // şeridi durdurur (diğer şeritler akmaya devam eder), bir markaya
  // dokunmak "siteden ayrılıyorsunuz" onayı ister — onaylanana/iptal
  // edilene kadar o şerit duraklı kalır, kullanıcı kazara siteden ayrılmaz.
  // Masaüstü hover-duraklatma (CSS, do-ticker-inner:hover) bundan tamamen
  // bağımsız çalışmaya devam eder — ikisi hiç çakışmaz.
  const [pausedRow, setPausedRow] = useState<number | null>(null);
  const [confirmBrand, setConfirmBrand] = useState<{ brand: Brand; rowIndex: number } | null>(null);
  const cancelLeaveRef = useRef<HTMLButtonElement>(null);
  useEscapeKey(() => setConfirmBrand(null), confirmBrand !== null);
  useEffect(() => {
    document.body.style.overflow = confirmBrand ? "hidden" : "";
    if (confirmBrand) cancelLeaveRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [confirmBrand]);

  const tickerItems = ["250+ Marka", "81 İl + İhracat", "Kuruluş 1976", "Groupauto Üyesi", "Opar Ege Bölge Bayiliği", "Ümraniye Merkez", "Binek & Hafif Ticari", "Kesintisiz Lojistik"];

  return (
    <div className="do-page min-h-screen bg-white text-slate-900 overflow-x-clip">
      {/* SCROLL PROGRESS */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#1B3A8F] via-[#2547B5] to-[#7d9bea]" style={{ width: `${progress * 100}%` }}></div>
      </div>

      {/* TICKER BAR */}
      <div className="bg-[#1B3A8F] py-2 overflow-hidden">
        <div className="do-ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} aria-hidden={i >= tickerItems.length} className="px-8 text-xs font-bold uppercase tracking-[0.2em] text-white/90 flex items-center gap-8">
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
        <div className={`w-full px-6 lg:px-10 xl:px-16 flex items-center justify-between transition-[height] duration-300 ${scrolled ? "h-16 sm:h-[68px]" : "h-24 sm:h-28"}`}>
          {/* Logo — sabit solda */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/images/delta-oto-logo.png"
              alt="Delta Oto 50. Yıl"
              className={`w-auto transition-[height] duration-300 ${scrolled ? "h-10 sm:h-12" : "h-16 sm:h-20"}`}
            />
          </Link>

          {/* Sağ grup: nav + SPART + B2B */}
          <div className="flex items-center gap-5 xl:gap-7 shrink-0">
            <nav className="hidden xl:flex items-center gap-5 xl:gap-7 text-[13.5px] font-medium tracking-tight text-slate-600">
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={href} href={href} className="do-nav-link whitespace-nowrap hover:text-[#1B3A8F] transition-colors duration-200">{label}</Link>
              ))}
            </nav>

            <span className="hidden xl:block w-px h-6 bg-slate-200 shrink-0"></span>

            <Link href="/spart" className="hidden xl:flex items-center rounded-md overflow-hidden ring-1 ring-slate-200 hover:ring-[#1B3A8F]/40 transition-all duration-200 shrink-0">
              <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-7 w-auto block" />
            </Link>

            <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="hidden xl:flex bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white text-xs sm:text-[13px] font-semibold tracking-[0.01em] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md transition-all duration-200 items-center gap-1.5 shadow-sm hover:shadow-md group whitespace-nowrap shrink-0">
              B2B Portal
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              type="button"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              aria-controls="do-landing-mobile-nav"
              onClick={() => setMobileOpen(o => !o)}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        <div id="do-landing-mobile-nav" className={`do-mobile-panel xl:hidden border-slate-200 ${mobileOpen ? "do-open border-t" : ""}`}>
          <div>
            <nav className="w-full px-6 py-3 flex flex-col">
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
              <Link href="/spart" onClick={() => setMobileOpen(false)} className="py-3 text-[15px] font-medium text-slate-700 hover:text-[#1B3A8F] flex items-center gap-2">
                SPART
                <img src="/images/spart-logo.png" alt="" className="h-5 w-auto" />
              </Link>
              <a
                href="https://b2b.parcabul.com.tr/login.aspx"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-3 bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white text-[15px] font-semibold px-5 py-3 rounded-md transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                B2B Portal
                <ArrowRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO (dark) — mobilde min-h-screen yerine diğer sayfalardaki
          kompakt yükseklik (560px); tam ekran yükseklik yalnızca lg+'da
          korunur, böylece başlık+açıklama+CTA'lar ilk mobil ekranda daha
          yukarıda ve görünür oturur. */}
      <section className="relative min-h-[560px] lg:min-h-screen flex items-center overflow-hidden bg-[#0e1016] text-white">
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

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pt-14 pb-10 lg:pt-20 lg:pb-32">
          <div className="max-w-4xl">
            <div ref={ref} className="do-reveal flex items-center gap-3 mb-5 lg:mb-8">
              <div className="w-8 h-[2px] bg-[#4d74d6]"></div>
              <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kuruluş 1976 · Delta Oto</span>
            </div>

            <h1
              ref={ref}
              className="do-reveal do-d1 text-[34px] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-black leading-[1.05] sm:leading-[1.0] mb-4 lg:mb-6 tracking-[-0.02em] break-words"
            >
              <span className="do-hero-line">50 YILDIR OTOMOTİV AFTERMARKET'İN</span>
              <br />
              <span className="text-[#7d9bea]">KESİNTİSİZ GÜCÜ</span>
            </h1>

            <p
              ref={ref}
              className="do-reveal do-d2 text-[17px] text-gray-300 leading-[1.75] max-w-2xl mb-7 lg:mb-12 font-light"
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
              <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white active:scale-[0.98] text-base font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-8 py-4 rounded-md transition-all duration-200">
                B2B Portal
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white animate-pulse"></div>
        </div>
      </section>

      {/* POWER METRICS (light) — üç bağımsız rakam birimi, kart değil; tipografi ve boşlukla ayrışıyor */}
      <section className="relative bg-[#f4f6f9] border-y border-slate-200 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg-light"></div>
        <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1B3A8F]/40 to-transparent"></div>

        <div ref={ref} className="do-reveal max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1B3A8F]/60">Rakamlarla Güç</span>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-0">
            <div className="px-4 sm:px-12">
              <div className="do-metric-num text-7xl md:text-8xl font-black text-slate-900 tabular-nums leading-none">
                <CountUp target={250} suffix="+" />
              </div>
              <div className="mt-3 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-500">Marka</div>
            </div>
            <div className="px-4 sm:px-12">
              <div className="do-metric-num text-7xl md:text-8xl font-black text-[#1B3A8F] tabular-nums leading-none">
                <CountUp target={81} />
              </div>
              <div className="mt-3 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-500">İl</div>
            </div>
            <div className="px-4 sm:px-12">
              <div className="do-metric-num text-7xl md:text-8xl font-black text-slate-900 tabular-nums leading-none">1976</div>
              <div className="mt-3 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-500">Kuruluş</div>
            </div>
          </div>

          <p className="mt-12 text-slate-800 text-base sm:text-xl md:text-2xl font-bold tracking-tight sm:whitespace-nowrap">1976'dan bu yana otomotiv yedek parça dağıtımında kesintisiz güç.</p>
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
                Groupauto International'ın Türkiye üyesiyiz. Bu üyelik; 40'tan fazla ülkedeki 3.000'i aşkın üye firma gücünü doğrudan satın alma kaldıracımıza dönüştürür. Merkezi müzakere edilen tedarik koşulları, ortak kalite standartları ve üye ağı çapında paylaşılan know-how; Türkiye pazarının hızını küresel ağın gücüyle birleştiriyor.
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

            <div ref={ref} className="do-reveal do-d1 lg:w-1/2 w-full flex flex-col gap-5">
              <div className="relative rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-sm overflow-hidden group">
                <div className="do-card-beam"></div>
                <div className="relative z-10 p-8">
                  <div className="flex items-center justify-between mb-7">
                    <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-[#2547B5] group-hover:border-[#2547B5] group-hover:scale-105 transition-all duration-300">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.25em] text-blue-200/50 uppercase">Global Ağ</span>
                  </div>
                  <div className="font-bold text-white text-lg leading-tight">Groupauto International</div>
                  <div className="text-[11px] text-[#7d9bea] mt-1.5 uppercase tracking-[0.2em] font-semibold">40+ Ülke · 3.000+ Üye Firma</div>
                  <p className="text-sm text-blue-100/65 leading-relaxed font-light mt-4">
                    Dünyanın en büyük bağımsız yedek parça ağı: global satın alma gücü, ortak kalite standartları ve uluslararası tedarik kapasitesi.
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {[
                      "Merkezi müzakere edilen satın alma koşulları",
                      "OEM eşdeğeri ortak kalite standartları",
                      "Üye ağı çapında teknik eğitim ve know-how paylaşımı",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] text-blue-100/75">
                        <span className="w-1 h-1 rounded-full bg-[#7d9bea] mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative z-10 border-t border-white/10 bg-black/10 px-8 py-5 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Network className="w-4 h-4 text-[#7d9bea]" />
                  </div>
                  <p className="text-[13px] text-blue-100/75 leading-snug">
                    <span className="text-white font-semibold">Delta Oto</span>, bu ağın Türkiye'deki resmi üyesi olarak global satın alma gücünü yerel stok derinliği ve lojistik hızıyla buluşturuyor.
                  </p>
                </div>
              </div>

              <div className="relative rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-sm overflow-hidden group p-6 flex items-center gap-5">
                <div className="do-card-beam"></div>
                <div className="relative z-10 w-11 h-11 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 group-hover:bg-[#2547B5] group-hover:border-[#2547B5] transition-all duration-300">
                  <Handshake className="w-5 h-5 text-white" />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-black tracking-[0.25em] text-blue-200/50 uppercase">Bölgesel Ortaklık</span>
                  <div className="font-bold text-white text-[15px] leading-tight mt-1">Opar Ege Bölge Bayiliği</div>
                  <p className="text-[13px] text-blue-100/65 leading-snug mt-1.5">İzmir ve çevresinde devraldığımız bölgesel operasyonla stok derinliğimizi ve teslimat hızımızı güçlendirdik.</p>
                </div>
              </div>
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
              {/* Not: haritanın path verisinde birkaç ilde küçük iç-su (göl) boşlukları var
                  (ör. Tuz Gölü) — arkaplana glow/gradient eklemek silüetin dışına taşıp
                  bozuk görünüyordu, bu yüzden haritayı olduğu gibi (temiz) bırakıyoruz. */}
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
              {/* 3 merkezden ülke geneline dağıtımı görselleştiren, scroll'da
                  kendini çizen rota okları — "sadece batıda 3 nokta" algısını
                  "buradan tüm ülkeye" hikayesine dönüştürür. */}
              <svg
                ref={ref}
                viewBox="0 80 1050 585"
                className="do-route-layer absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <marker id="do-route-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#7d9bea" />
                  </marker>
                </defs>
                {DISTRIBUTION_ROUTES.map((r, i) => (
                  <path
                    key={i}
                    className="do-route-line"
                    d={routeArcPath(r.from, r.to)}
                    stroke="#7d9bea"
                    strokeWidth={1.75}
                    strokeDasharray={1400}
                    markerEnd="url(#do-route-arrow)"
                    style={{ animationDelay: `${ROUTE_TIMING[i].delay}s`, animationDuration: `${ROUTE_TIMING[i].duration}s` }}
                  />
                ))}
                {DISTRIBUTION_ROUTES.map((r, i) => (
                  <circle
                    key={`d${i}`}
                    className="do-route-dest"
                    cx={r.to[0]}
                    cy={r.to[1]}
                    r={3.5}
                    fill="#7d9bea"
                    style={{ animationDelay: `${ROUTE_TIMING[i].delay}s`, animationDuration: `${ROUTE_TIMING[i].duration}s` }}
                  />
                ))}
                {OPS_HUB_POINTS.map((p, i) => (
                  <circle key={`h${i}`} cx={p[0]} cy={p[1]} r={4.5} fill="#7d9bea" stroke="#0e1016" strokeWidth={1.5} />
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

      {/* TEDARİKÇİLERİMİZ (navy) — 3 şerit, dönüşümlü yönlerde kayan marka logoları */}
      <section className="bg-[#1B3A8F] py-20 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0 do-grid-bg opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mb-14">
          <p ref={ref} className="do-reveal text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#7d9bea] inline-block"></span>
            Yerli ve Global Marka Portföyü
          </p>
          <h2 ref={ref} className="do-reveal do-d1 text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Tedarikçilerimiz
          </h2>
          <p ref={ref} className="do-reveal do-d2 text-white/60 text-sm max-w-xl leading-relaxed">
            {STRIP_BRANDS.length} yerli ve global markayla çalışıyoruz; tam listeyi, Yerli/Global ayrımını ve kategoriye göre filtrelemeyi Tedarikçiler sayfamızda inceleyebilirsiniz.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-5">
          {BRAND_STRIPS.map((strip, rowIndex) => (
            <div
              key={rowIndex}
              className="overflow-hidden"
              onTouchStart={() => setPausedRow(rowIndex)}
              onTouchEnd={() => setPausedRow((r) => (r === rowIndex ? null : r))}
              onTouchCancel={() => setPausedRow((r) => (r === rowIndex ? null : r))}
            >
              <div
                className={rowIndex === 1 ? "do-ticker-inner" : "do-ticker-inner-reverse"}
                style={{ animationPlayState: pausedRow === rowIndex || confirmBrand?.rowIndex === rowIndex ? "paused" : undefined }}
              >
                {[...strip, ...strip].map((b, i) => {
                  const isDuplicate = i >= strip.length;
                  return (
                    <BrandLogo
                      key={`${b.slug}-${i}`}
                      brand={b}
                      size="strip"
                      hidden={isDuplicate}
                      onNavigateAttempt={(brand) => setConfirmBrand({ brand, rowIndex })}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mt-12 text-center">
          <Link href="/tedarikciler" className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-[#7d9bea] transition-colors group">
            Tüm tedarikçilerimizi inceleyin
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
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
            <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="bg-white text-[#1B3A8F] font-bold px-8 py-4 rounded-md hover:bg-gray-100 active:scale-[0.98] transition-colors text-sm flex items-center gap-2 group">
              B2B Portal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link to="/iletisim">
              <button className="border border-white/30 hover:border-white/60 active:scale-[0.98] text-white font-medium px-8 py-4 rounded-md transition-colors text-sm">
                İletişim
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* "Siteden ayrılıyorsunuz" onayı — yalnızca dokunmatik cihazda, marka
          şeridindeki bir logoya dokunulduğunda devreye girer (bkz.
          BrandLogo onNavigateAttempt). Masaüstü tıklaması bunu hiç görmez. */}
      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center p-6 transition-opacity duration-200 ${
          confirmBrand ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!confirmBrand}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmBrand(null)} />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Siteden ayrılıyorsunuz"
          className={`relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transition-all duration-200 ${
            confirmBrand ? "translate-y-0 scale-100" : "translate-y-2 scale-95"
          }`}
        >
          <h3 className="text-lg font-black text-slate-900 mb-2">Siteden ayrılıyorsunuz</h3>
          <p className="text-slate-500 text-[13.5px] leading-relaxed mb-6">
            {confirmBrand?.brand.name} için Delta Oto sitesinden ayrılıp markanın resmi web sitesine yönlendirileceksiniz.
          </p>
          <div className="flex gap-3">
            <button
              ref={cancelLeaveRef}
              type="button"
              onClick={() => setConfirmBrand(null)}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold text-[13.5px] px-4 py-3 rounded-md hover:bg-slate-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirmBrand?.brand.website) {
                  window.open(confirmBrand.brand.website, "_blank", "noopener,noreferrer");
                }
                setConfirmBrand(null);
              }}
              className="flex-1 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold text-[13.5px] px-4 py-3 rounded-md transition-colors"
            >
              Devam Et
            </button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

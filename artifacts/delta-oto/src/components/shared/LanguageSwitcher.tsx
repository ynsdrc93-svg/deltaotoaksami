import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown } from "lucide-react";
import { useEscapeKey } from "@/hooks/use-motion";
import { otherLanguageHref, type Lang } from "@/lib/i18n";

// Basit/temiz, satır-içi SVG bayraklar (emoji yok, CDN yok) — 16x16
// viewBox, küçük boyutta (segment kontrolde ~14px) net kalması için
// abartılı detaydan kaçınıldı.
function TrFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#E30A17" />
      <circle cx="6.6" cy="8" r="4.3" fill="#fff" />
      <circle cx="7.6" cy="8" r="3.5" fill="#E30A17" />
      <path
        fill="#fff"
        d="M10.3 8l1.62-.53-1.0 1.38.01-1.7.99 1.38z"
      />
    </svg>
  );
}

function GbFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <defs>
        <clipPath id="gb-circle-clip">
          <circle cx="8" cy="8" r="8" />
        </clipPath>
      </defs>
      <g clipPath="url(#gb-circle-clip)">
        <rect width="16" height="16" fill="#00247D" />
        <path d="M0 0L16 16M16 0L0 16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0L16 16M16 0L0 16" stroke="#CF142B" strokeWidth="1.2" />
        <path d="M8 0V16M0 8H16" stroke="#fff" strokeWidth="5.4" />
        <path d="M8 0V16M0 8H16" stroke="#CF142B" strokeWidth="2.2" />
      </g>
    </svg>
  );
}

const LANGS: { lang: Lang; label: string; Flag: typeof TrFlag; ariaLabel: string }[] = [
  { lang: "tr", label: "TR", Flag: TrFlag, ariaLabel: "Türkçe" },
  { lang: "en", label: "EN", Flag: GbFlag, ariaLabel: "English" },
];

/** Mobil panel için: iki dili yan yana gösteren sabit segment kontrol —
 * geniş dokunmatik hedef alanı bu bağlamda avantaj, DEĞİŞMEDİ (Desktop
 * Feedback Round yalnızca masaüstü davranışını hedefliyor). */
function MobileSegmented() {
  const [location] = useLocation();
  return (
    <div role="group" aria-label="Dil seçimi / Language selection" className="inline-flex items-center rounded-md border border-slate-200 bg-white p-0.5 shrink-0 gap-0.5">
      {LANGS.map(({ lang, label, Flag, ariaLabel }) => {
        const active = (lang === "en") === (location === "/en" || location.startsWith("/en/"));
        const href = active ? location : otherLanguageHref(location);
        return (
          <Link
            key={lang}
            href={href}
            aria-label={ariaLabel}
            aria-current={active ? "true" : undefined}
            className={`flex items-center justify-center gap-1.5 rounded transition-colors duration-150 font-semibold h-11 px-3.5 text-[13px] ${
              active ? "bg-[#1B3A8F]/10 text-[#1B3A8F]" : "text-slate-500 hover:text-[#1B3A8F] hover:bg-slate-50"
            }`}
          >
            <Flag className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}

/** Masaüstü header için: yalnızca AKTİF dili gösteren kompakt bir tetikleyici
 * ("[TR ▾]" gibi) — iki dilin aynı anda görünmesi (eski segment kontrol)
 * kaldırıldı (Desktop Feedback Round §5). Tıklamak, diğer dili içeren dar
 * bir açılır panel gösterir; seçmek doğrudan otherLanguageHref() ile
 * rota-farkındalıklı geçişi korur. Dışarı tıklama ve Escape kapatır. */
function DesktopDropdown() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEscapeKey(() => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Route değişince (dil değiştirme dahil) panel kapansın.
  useEffect(() => { setOpen(false); }, [location]);

  const isEn = location === "/en" || location.startsWith("/en/");
  const active = LANGS.find((l) => (l.lang === "en") === isEn)!;
  const other = LANGS.find((l) => l.lang !== active.lang)!;
  const otherHref = otherLanguageHref(location);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${active.ariaLabel === "Türkçe" ? "Dil" : "Language"}: ${active.ariaLabel}`}
        className={`flex items-center gap-1.5 h-7 pl-2 pr-1.5 rounded-md border transition-colors duration-150 font-semibold text-[11.5px] ${
          open ? "border-[#1B3A8F]/40 bg-[#1B3A8F]/[0.06] text-[#1B3A8F]" : "border-slate-200 text-slate-600 hover:border-[#1B3A8F]/30 hover:text-[#1B3A8F]"
        }`}
      >
        <active.Flag className="w-3.5 h-3.5 shrink-0" />
        {active.label}
        <ChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        role="listbox"
        className={`absolute right-0 top-full mt-1.5 min-w-[92px] rounded-md border border-slate-200 bg-white shadow-lg shadow-slate-900/[0.08] py-1 transition-all duration-150 origin-top-right z-50 ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <Link
          href={otherHref}
          role="option"
          aria-selected="false"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#1B3A8F] transition-colors"
        >
          <other.Flag className="w-3.5 h-3.5 shrink-0" />
          {other.label}
        </Link>
      </div>
    </div>
  );
}

export function LanguageSwitcher({ variant = "compact" }: { variant?: "compact" | "mobile" }) {
  return variant === "mobile" ? <MobileSegmented /> : <DesktopDropdown />;
}

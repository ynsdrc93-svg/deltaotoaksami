import { Link, useLocation } from "wouter";
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

/** Masaüstü header ve mobil panel için ortak, kompakt segment kontrol.
 * `variant="compact"` masaüstü header'a (küçük, sığ), `variant="mobile"`
 * mobil panele (40-44px dokunma hedefi) uyarlanmış boyut/boşluk verir. */
export function LanguageSwitcher({ variant = "compact" }: { variant?: "compact" | "mobile" }) {
  const [location] = useLocation();
  const isMobile = variant === "mobile";

  return (
    <div
      role="group"
      aria-label="Dil seçimi / Language selection"
      className={`inline-flex items-center rounded-md border border-slate-200 bg-white p-0.5 shrink-0 ${isMobile ? "gap-0.5" : "gap-0.5"}`}
    >
      {LANGS.map(({ lang, label, Flag, ariaLabel }) => {
        const active = (lang === "en") === (location === "/en" || location.startsWith("/en/"));
        const href = active ? location : otherLanguageHref(location);
        return (
          <Link
            key={lang}
            href={href}
            aria-label={ariaLabel}
            aria-current={active ? "true" : undefined}
            className={`flex items-center justify-center gap-1.5 rounded transition-colors duration-150 font-semibold ${
              isMobile ? "h-11 px-3.5 text-[13px]" : "h-7 px-2.5 text-[11.5px]"
            } ${
              active
                ? "bg-[#1B3A8F]/10 text-[#1B3A8F]"
                : "text-slate-500 hover:text-[#1B3A8F] hover:bg-slate-50"
            }`}
          >
            <Flag className={isMobile ? "w-4 h-4 shrink-0" : "w-3.5 h-3.5 shrink-0"} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}

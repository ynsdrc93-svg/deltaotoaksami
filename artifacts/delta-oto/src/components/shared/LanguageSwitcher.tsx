import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { useEscapeKey } from "@/hooks/use-motion";
import { otherLanguageHref, type Lang } from "@/lib/i18n";

// Basit/temiz, satır-içi SVG bayraklar (emoji yok, CDN yok) — 20x14 viewBox,
// gerçek bayrak en-boy oranına yakın DİKDÖRTGEN kart (Visual Polish Round:
// eskiden dairesel rozet biçimindeydi, "ucuz/basit" hissi ve gereksiz bir
// yuvarlaklık taşıyordu — hafif yuvarlatılmış köşeli (rx=1.5) düz bir
// dikdörtgen daha sade/premium duruyor, gerçek bayrak formuna da daha sadık).
function TrFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true">
      <rect width="20" height="14" rx="1.5" fill="#E30A17" />
      <circle cx="8.1" cy="7" r="3.7" fill="#fff" />
      <circle cx="9.1" cy="7" r="2.95" fill="#E30A17" />
      <path fill="#fff" d="M12.75 7l2.1-.7-1.32 1.8.03-2.2 1.29 1.8z" />
    </svg>
  );
}

function GbFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true">
      <defs>
        <clipPath id="gb-rect-clip">
          <rect width="20" height="14" rx="1.5" />
        </clipPath>
      </defs>
      <g clipPath="url(#gb-rect-clip)">
        <rect width="20" height="14" fill="#00247D" />
        <path d="M0 0L20 14M20 0L0 14" stroke="#fff" strokeWidth="2.8" />
        <path d="M0 0L20 14M20 0L0 14" stroke="#CF142B" strokeWidth="1" />
        <path d="M10 0V14M0 7H20" stroke="#fff" strokeWidth="4.6" />
        <path d="M10 0V14M0 7H20" stroke="#CF142B" strokeWidth="1.8" />
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
            <Flag className="w-[18px] h-3 shrink-0 rounded-[1.5px]" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}

/** Masaüstü header için: yalnızca AKTİF dilin bayrağı, metinsiz (ne "TR" ne
 * "EN" yazısı, chevron da yok — sadece bayrak ikonu bir kare buton içinde).
 * Tıklamak, diğer dilin bayrağını (yine metinsiz) içeren dar bir açılır
 * panel gösterir; seçmek doğrudan otherLanguageHref() ile rota-farkındalıklı
 * geçişi korur. Erişilebilirlik metni (aria-label/title) her iki düğmede de
 * korunuyor — yalnızca GÖRSEL etiket kaldırıldı. Dışarı tıklama ve Escape
 * kapatır. */
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
      {/* Çerçevesiz, dikdörtgen bayrak — eskiden kare+border'lı bir buton
          içindeki dairesel bayraktı (Visual Polish Round §1): border
          tamamen kaldırıldı, bayrak artık SPART'ın header'daki muamelesiyle
          aynı mantıkla ("kutu değil, kendisi") sadece hover'da hafif bir
          zemin kazanıyor. Ok/chevron yok — bayrak tek başına yeterince
          okunaklı ve tıklanabilir hissettiriyor. */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={active.ariaLabel}
        aria-label={`${active.ariaLabel === "Türkçe" ? "Dil" : "Language"}: ${active.ariaLabel}`}
        className={`flex items-center justify-center p-1.5 rounded-[3px] transition-colors duration-150 ${
          open ? "bg-[#1B3A8F]/[0.07]" : "hover:bg-slate-100/80"
        }`}
      >
        <active.Flag className="w-[22px] h-[15px] shrink-0" />
      </button>

      <div
        role="listbox"
        className={`absolute right-0 top-full mt-1.5 rounded-md border border-slate-200 bg-white shadow-lg shadow-slate-900/[0.08] p-1.5 transition-all duration-150 origin-top-right z-50 ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <Link
          href={otherHref}
          role="option"
          aria-selected="false"
          title={other.ariaLabel}
          aria-label={other.ariaLabel}
          onClick={() => setOpen(false)}
          className="flex items-center justify-center p-1.5 rounded-[3px] hover:bg-slate-100/80 transition-colors"
        >
          <other.Flag className="w-[22px] h-[15px] shrink-0" />
        </Link>
      </div>
    </div>
  );
}

export function LanguageSwitcher({ variant = "compact" }: { variant?: "compact" | "mobile" }) {
  return variant === "mobile" ? <MobileSegmented /> : <DesktopDropdown />;
}

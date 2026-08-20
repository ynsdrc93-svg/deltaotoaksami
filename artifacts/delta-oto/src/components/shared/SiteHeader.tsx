import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEscapeKey, useScrolled } from "../../hooks/use-motion";
import { useLang, routeFor, type Lang } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Nav etiketleri: "Tedarikçiler" görünür kullanıcı terminolojisi olarak
// "İş Ortaklarımız" (nav'da kısaca "Partners"/"İş Ortaklarımız") oldu — route
// (/tedarikciler) bilinçli olarak DEĞİŞMEDİ, mevcut linkler kırılmasın diye
// (bkz. lib/i18n.ts routeFor). İç veri adı hâlâ "partners" (RouteKey).
const NAV: { key: "about" | "partners" | "operations" | "careers" | "contact"; label: Record<Lang, string> }[] = [
  { key: "about", label: { tr: "Hakkımızda", en: "About Us" } },
  { key: "partners", label: { tr: "İş Ortaklarımız", en: "Partners" } },
  { key: "operations", label: { tr: "Operasyon ve Lojistik", en: "Operations & Logistics" } },
  { key: "careers", label: { tr: "Kariyer", en: "Careers" } },
  { key: "contact", label: { tr: "İletişim", en: "Contact" } },
];

const SPART_ALT: Record<Lang, string> = { tr: "SPART Original Replacement", en: "SPART Original Replacement" };
const B2B_LABEL: Record<Lang, string> = { tr: "B2B Portal", en: "B2B Portal" };
const MENU_OPEN_LABEL: Record<Lang, string> = { tr: "Menüyü aç", en: "Open menu" };
const MENU_CLOSE_LABEL: Record<Lang, string> = { tr: "Menüyü kapat", en: "Close menu" };

export function SiteHeader() {
  // Çift eşik (90 gir / 20 çık): header'ın kendi yükseklik geçişi scroll
  // pozisyonunu hafifçe kaydırabildiği (scroll anchoring) için tek eşik,
  // sınırda ileri-geri salınıma (jitter) yol açıyordu — bkz. useScrolled.
  const scrolled = useScrolled(90, 20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const lang = useLang();

  useEffect(() => { setMobileOpen(false); }, [location]);
  useEscapeKey(() => setMobileOpen(false), mobileOpen);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200"
        style={scrolled ? { background: "rgba(255,255,255,0.98)", borderColor: "rgba(15,23,42,0.1)", boxShadow: "0 4px 24px rgba(15,23,42,0.08)" } : {}}
      >
        <div className={`w-full px-6 lg:px-10 xl:px-16 flex items-center justify-between transition-[height] duration-300 ${scrolled ? "h-[59px] sm:h-[68px]" : "h-[88px] sm:h-28"}`}>

          {/* Logo — sabit solda. Mobilde (<sm) ~9-10% küçültüldü + 2px yukarı
              optik düzeltme (logo hafif alçak duruyordu) — sm ve üzeri (masaüstü)
              boyut/hizalama birebir korunuyor. */}
          <Link href={routeFor("home", lang)} className="flex items-center shrink-0">
            <img
              src="/images/delta-oto-logo.webp"
              alt="Delta Oto 50. Yıl"
              width={963}
              height={240}
              className={`w-auto transition-[height] duration-300 -mt-0.5 sm:mt-0 ${scrolled ? "h-9 sm:h-12" : "h-[58px] sm:h-20"}`}
            />
          </Link>

          {/* Sağ grup: nav + dil + SPART/B2B kompakt blok */}
          <div className="flex items-center gap-3 xl:gap-5 shrink-0">
            <nav className="hidden xl:flex items-center gap-4 xl:gap-6 text-[13.5px] font-medium tracking-tight text-slate-600">
              {NAV.map(({ key, label }) => {
                const href = routeFor(key, lang);
                const isActive = location === href;
                return (
                  <Link
                    key={key}
                    href={href}
                    className={`do-nav-link whitespace-nowrap transition-colors duration-200 ${
                      isActive ? "text-[#1B3A8F] font-semibold do-active" : "hover:text-[#1B3A8F]"
                    }`}
                  >
                    {label[lang]}
                  </Link>
                );
              })}
            </nav>

            <span className="hidden xl:block w-px h-6 bg-slate-200 shrink-0" />

            <div className="hidden xl:block">
              <LanguageSwitcher />
            </div>

            {/* Kompakt SPART/B2B Portal bloğu — eskiden yan yana iki geniş öğe
                (logo kutusu + dolgun buton), artık paylaşılan tek bir dış
                çerçevede üst/alt istiflenmiş, ince bir ayraçla ayrılmış iki
                satır (Desktop Feedback Round §6). Her ikisi de bağımsız
                tıklanabilir kalıyor; yatay alan kazanımı burada. */}
            <div className="hidden xl:flex flex-col rounded-md border border-slate-200 overflow-hidden shrink-0 w-[108px]">
              <Link
                href={routeFor("spart", lang)}
                className="flex items-center justify-center h-7 hover:bg-slate-50 transition-colors"
              >
                <img src="/images/spart-logo.png" alt={SPART_ALT[lang]} className="h-4 w-auto block" />
              </Link>
              <div className="h-px bg-slate-200" />
              <a
                href="https://b2b.parcabul.com.tr/login.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 h-7 bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[10px] font-bold tracking-[0.03em] transition-colors group"
              >
                {B2B_LABEL[lang].toUpperCase()}
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? MENU_CLOSE_LABEL[lang] : MENU_OPEN_LABEL[lang]}
              aria-expanded={mobileOpen}
              aria-controls="do-site-mobile-nav"
              onClick={() => setMobileOpen(o => !o)}
              className="xl:hidden inline-flex items-center justify-center w-11 h-11 -mr-2.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile nav panel */}
        <div id="do-site-mobile-nav" className={`do-mobile-panel xl:hidden border-slate-200 ${mobileOpen ? "do-open border-t" : ""}`}>
          <div>
            <nav className="w-full px-6 py-3 flex flex-col">
              {NAV.map(({ key, label }) => {
                const href = routeFor(key, lang);
                const isActive = location === href;
                return (
                  <Link
                    key={key}
                    href={href}
                    className={`py-3 text-[15px] font-medium border-b border-slate-100 last:border-b-0 ${isActive ? "text-[#1B3A8F] font-semibold" : "text-slate-700 hover:text-[#1B3A8F]"}`}
                  >
                    {label[lang]}
                  </Link>
                );
              })}
              <Link href={routeFor("spart", lang)} className="py-3 text-[15px] font-medium text-slate-700 hover:text-[#1B3A8F] flex items-center gap-2">
                SPART
                <img src="/images/spart-logo.png" alt="" className="h-5 w-auto" />
              </Link>
              <div className="py-3 flex items-center justify-between border-t border-slate-100 mt-1 pt-4">
                <span className="text-[13px] font-medium text-slate-500">{lang === "tr" ? "Dil" : "Language"}</span>
                <LanguageSwitcher variant="mobile" />
              </div>
              <a
                href="https://b2b.parcabul.com.tr/login.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white text-[15px] font-semibold px-5 py-3 rounded-md transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                {B2B_LABEL[lang]}
                <ArrowRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

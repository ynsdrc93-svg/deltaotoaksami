import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEscapeKey } from "../../hooks/use-motion";

const NAV: { label: string; href: string }[] = [
  { label: "Hakkımızda",           href: "/hakkimizda"  },
  { label: "Tedarikçiler",          href: "/tedarikciler" },
  { label: "Operasyon ve Lojistik", href: "/operasyon"   },
  { label: "Kariyer",               href: "/kariyer"     },
  { label: "İletişim",              href: "/iletisim"    },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);
  useEscapeKey(() => setMobileOpen(false), mobileOpen);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200"
        style={scrolled ? { background: "rgba(255,255,255,0.98)", borderColor: "rgba(15,23,42,0.1)", boxShadow: "0 4px 24px rgba(15,23,42,0.08)" } : {}}
      >
        <div className={`w-full px-6 lg:px-10 xl:px-16 flex items-center justify-between transition-[height] duration-300 ${scrolled ? "h-16 sm:h-[68px]" : "h-24 sm:h-28"}`}>

          {/* Logo — sabit solda */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/images/delta-oto-logo.png" alt="Delta Oto 50. Yıl" className={`w-auto transition-[height] duration-300 ${scrolled ? "h-10 sm:h-12" : "h-16 sm:h-20"}`} />
          </Link>

          {/* Sağ grup: nav + SPART + B2B */}
          <div className="flex items-center gap-5 xl:gap-7 shrink-0">
            <nav className="hidden xl:flex items-center gap-5 xl:gap-7 text-[13.5px] font-medium tracking-tight text-slate-600">
              {NAV.map(({ label, href }) => {
                const isActive = location === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`do-nav-link whitespace-nowrap transition-colors duration-200 ${
                      isActive ? "text-[#1B3A8F] font-semibold do-active" : "hover:text-[#1B3A8F]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            <span className="hidden xl:block w-px h-6 bg-slate-200 shrink-0" />

            <Link
              href="/spart"
              className="hidden xl:flex items-center rounded-md overflow-hidden ring-1 ring-slate-200 hover:ring-[#1B3A8F]/40 transition-all duration-200 shrink-0"
            >
              <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-7 w-auto block" />
            </Link>

            <a
              href="https://b2b.parcabul.com.tr/login.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white text-xs sm:text-[13px] font-semibold tracking-[0.01em] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md transition-all duration-200 items-center gap-1.5 shadow-sm hover:shadow-md group whitespace-nowrap shrink-0"
            >
              B2B Portal
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              type="button"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              aria-controls="do-site-mobile-nav"
              onClick={() => setMobileOpen(o => !o)}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile nav panel */}
        <div id="do-site-mobile-nav" className={`do-mobile-panel xl:hidden border-slate-200 ${mobileOpen ? "do-open border-t" : ""}`}>
          <div>
            <nav className="w-full px-6 py-3 flex flex-col">
              {NAV.map(({ label, href }) => {
                const isActive = location === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`py-3 text-[15px] font-medium border-b border-slate-100 last:border-b-0 ${isActive ? "text-[#1B3A8F] font-semibold" : "text-slate-700 hover:text-[#1B3A8F]"}`}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link href="/spart" className="py-3 text-[15px] font-medium text-slate-700 hover:text-[#1B3A8F] flex items-center gap-2">
                SPART
                <img src="/images/spart-logo.png" alt="" className="h-5 w-auto" />
              </Link>
              <a
                href="https://b2b.parcabul.com.tr/login.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white text-[15px] font-semibold px-5 py-3 rounded-md transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                B2B Portal
                <ArrowRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

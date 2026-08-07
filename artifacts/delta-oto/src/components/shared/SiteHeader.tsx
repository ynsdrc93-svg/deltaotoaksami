import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { MobileMenuButton, MobileDrawer } from "@/components/shared/MobileNav";

const NAV: { label: string; href: string }[] = [
  { label: "Hakkımızda",           href: "/hakkimizda"  },
  { label: "Tedarikçiler",          href: "/tedarikciler" },
  { label: "Operasyon ve Lojistik", href: "/operasyon"   },
  { label: "Kariyer",               href: "/kariyer"     },
  { label: "İletişim",              href: "/iletisim"    },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200"
        style={scrolled ? { background: "rgba(255,255,255,0.98)", borderColor: "rgba(15,23,42,0.1)", boxShadow: "0 4px 24px rgba(15,23,42,0.08)" } : {}}
      >
        <div className="w-full px-6 lg:px-10 xl:px-16 h-20 sm:h-24 lg:h-28 flex items-center justify-between">

          {/* Logo — sabit solda */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/images/delta-oto-logo.png" alt="Delta Oto 50. Yıl" className="h-14 sm:h-16 lg:h-20 w-auto" />
          </Link>

          {/* Sağ grup: nav + SPART + B2B (desktop) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0">
            <nav className="flex items-center gap-5 xl:gap-7 text-[13.5px] font-medium tracking-tight text-slate-600">
              {NAV.map(({ label, href }) => {
                const isActive = location === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`whitespace-nowrap transition-colors duration-200 pb-0.5 ${
                      isActive
                        ? "text-[#1B3A8F] font-semibold border-b-2 border-[#1B3A8F]"
                        : "hover:text-[#1B3A8F] border-b-2 border-transparent"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            <span className="w-px h-6 bg-slate-200 shrink-0" />

            <Link
              href="/spart"
              className="flex items-center rounded-md overflow-hidden ring-1 ring-slate-200 hover:ring-[#1B3A8F]/40 transition-all duration-200 shrink-0"
            >
              <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-7 w-auto block" />
            </Link>

            <Link
              href="#"
              className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[13px] font-semibold tracking-[0.01em] px-5 py-2.5 rounded-md transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md group whitespace-nowrap shrink-0"
            >
              B2B Portal
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile: SPART mini-mark + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <Link href="/spart" className="flex items-center rounded-md overflow-hidden ring-1 ring-slate-200">
              <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-6 w-auto block" />
            </Link>
            <MobileMenuButton onClick={() => setMenuOpen(true)} />
          </div>

        </div>
      </header>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} items={NAV} activeHref={location} />
    </>
  );
}

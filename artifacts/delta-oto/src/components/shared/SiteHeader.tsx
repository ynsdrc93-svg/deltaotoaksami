import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

const SITE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  .do-site { font-family: 'Inter', sans-serif; }
  .do-grid-bg {
    background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .do-hero-line {
    background: linear-gradient(90deg, #fff 60%, rgba(255,255,255,0.55));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .do-logo-invert { filter: brightness(0) invert(1); }
`;

const NAV: { label: string; href: string }[] = [
  { label: "Hakkımızda",           href: "/hakkimizda"  },
  { label: "Tedarikçiler",          href: "/tedarikciler" },
  { label: "Operasyon ve Lojistik", href: "/operasyon"   },
  { label: "Kariyer",               href: "/kariyer"     },
  { label: "İletişim",              href: "/iletisim"    },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{SITE_CSS}</style>
      <header
        className="sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200"
        style={scrolled ? { background: "rgba(255,255,255,0.98)", borderColor: "rgba(15,23,42,0.1)", boxShadow: "0 4px 24px rgba(15,23,42,0.08)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-28 flex items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="flex items-center shrink-0">
              <img src="/images/delta-oto-logo.png" alt="Delta Oto 50. Yıl" className="h-16 sm:h-20 w-auto" />
            </Link>
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13.5px] font-medium tracking-tight text-slate-600">
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
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link href="#" className="hidden lg:flex items-center rounded-md overflow-hidden ring-1 ring-slate-200 hover:ring-[#1B3A8F]/40 transition-all duration-200">
              <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-7 w-auto block" />
            </Link>
            <span className="hidden lg:block w-px h-6 bg-slate-200" />
            <Link
              href="#"
              className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-xs sm:text-[13px] font-semibold tracking-[0.01em] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md group whitespace-nowrap"
            >
              B2B Portal
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

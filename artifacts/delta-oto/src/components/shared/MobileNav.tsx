import React, { useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";

export type NavItem = { label: string; href: string };

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden flex items-center justify-center w-10 h-10 -mr-1.5 text-slate-700 hover:text-[#1B3A8F] transition-colors shrink-0"
      aria-label="Menüyü aç"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}

export function MobileDrawer({
  open,
  onClose,
  items,
  activeHref,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  activeHref?: string;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={`do-drawer-backdrop ${open ? "do-open" : ""} fixed inset-0 z-[100] bg-[#0e1016]/60 backdrop-blur-sm lg:hidden`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        className={`do-drawer-panel ${open ? "do-open" : ""} absolute top-0 right-0 h-full w-[84%] max-w-sm bg-white shadow-2xl flex flex-col`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigasyonu"
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100 shrink-0">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Menü</span>
          <button
            onClick={onClose}
            aria-label="Menüyü kapat"
            className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-[#1B3A8F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
          {items.map(({ label, href }) => {
            const isActive = activeHref === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`py-4 text-[16px] font-semibold border-b border-slate-100 transition-colors ${
                  isActive ? "text-[#1B3A8F]" : "text-slate-800 hover:text-[#1B3A8F]"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/spart"
            onClick={onClose}
            className={`py-4 text-[16px] font-semibold border-b border-slate-100 transition-colors flex items-center gap-2 ${
              activeHref === "/spart" ? "text-[#1B3A8F]" : "text-slate-800 hover:text-[#1B3A8F]"
            }`}
          >
            SPART Private Label
          </Link>
        </nav>

        <div className="p-6 border-t border-slate-100 shrink-0">
          <Link
            href="#"
            onClick={onClose}
            className="w-full bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-5 py-3.5 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            B2B Portal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "wouter";
import { Info } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useReveal } from "@/hooks/use-motion";

// Üç yasal sayfanın (KVKK Aydınlatma Metni, Gizlilik Politikası, Çerez
// Politikası) paylaştığı tek düzen kabuğu — hero/taslak-uyarısı/içindekiler/
// ilgili-belgeler bloklarının üçünde birebir aynı kalmasını garanti eder.
// Asıl gövde metni (numaralı bölümler) `children` olarak page dosyalarında
// kalır; bu bileşen yalnızca çerçeveyi standardize eder.
export interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdatedLabel: string;
  draftNoticeText: string;
  tocLabel: string;
  toc: { id: string; label: string }[];
  relatedLabel: string;
  related: { href: string; label: string }[];
  children: React.ReactNode;
}

export function LegalPageLayout({
  eyebrow, title, lastUpdatedLabel, draftNoticeText, tocLabel, toc, relatedLabel, related, children,
}: LegalPageLayoutProps) {
  const reveal = useReveal();

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      <section className="relative bg-[#f8fafc] border-b border-slate-200 py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-[#1B3A8F]" />
            <span className="text-[#1B3A8F] text-xs font-bold uppercase tracking-[0.3em]">{eyebrow}</span>
          </div>
          <h1 ref={reveal} className="do-reveal do-d1 text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.02em] text-slate-900 mb-4">
            {title}
          </h1>
          <p ref={reveal} className="do-reveal do-d2 text-[13px] text-slate-400 font-medium mb-8">
            {lastUpdatedLabel}
          </p>

          <div ref={reveal} className="do-reveal do-d3 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-5 py-4">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[13.5px] text-amber-900 leading-relaxed">{draftNoticeText}</p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {toc.length > 0 && (
            <nav aria-label={tocLabel} className="mb-12 border border-slate-200 rounded-xl p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-3">{tocLabel}</span>
              <ol className="space-y-2">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-[14px] text-slate-600 hover:text-[#1B3A8F] transition-colors">
                      <span className="text-slate-400 tabular-nums mr-2">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="do-legal-prose">
            {children}
          </div>

          {related.length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-3">{relatedLabel}</span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {related.map((r) => (
                  <Link key={r.href} href={r.href} className="text-[14px] text-[#1B3A8F] font-semibold hover:text-[#2547B5] transition-colors">
                    {r.label} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

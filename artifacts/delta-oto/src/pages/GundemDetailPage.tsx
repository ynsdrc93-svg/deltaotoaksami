import React from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useReveal } from "@/hooks/use-motion";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, routeFor, gundemAnchor, type Lang } from "@/lib/i18n";
import { agendaItemBySlug } from "@/lib/agenda";

// Gündem'in detay katmanı (görev talimatı §9): Anasayfa önizlemesi →
// Hakkımızda Gündem → tek bir öğenin kendi sayfası. Mevcut iki gerçek
// gelişim için içerik zaten kısa (tek paragraf) — burada UZATILMADI,
// UYDURULMADI; mimari gelecekte daha uzun/gerçek içerik eklenebilecek
// şekilde kuruldu (agenda.ts'teki body[] bir dizi, tek paragrafla sınırlı
// değil), bugünün kısıtlı içeriği yapay biçimde şişirilmedi.
const T = {
  eyebrow: { tr: "Gündem", en: "Agenda" },
  back: { tr: "Tüm Gündem", en: "All Updates" },
  notFoundTitle: { tr: "İçerik Bulunamadı", en: "Content Not Found" },
  notFoundBody: {
    tr: "Aradığınız gündem öğesi taşınmış veya kaldırılmış olabilir.",
    en: "The update you're looking for may have been moved or removed.",
  },
} satisfies Record<string, Record<Lang, string>>;

export function GundemDetailPage() {
  const lang = useLang();
  const { slug = "" } = useParams<{ slug: string }>();
  const item = agendaItemBySlug(slug);
  const reveal = useReveal();

  useDocumentMeta(
    item ? `${item.title[lang]} | Delta Oto` : `${T.notFoundTitle[lang]} | Delta Oto`,
    item ? item.summary[lang] : T.notFoundBody[lang],
  );

  const backHref = `${routeFor("about", lang)}#${gundemAnchor(lang)}`;

  if (!item) {
    return (
      <div className="do-site bg-white min-h-screen flex flex-col">
        <SiteHeader />
        <section className="flex-1 flex items-center justify-center bg-[#0e1016] text-white py-24">
          <div className="max-w-lg mx-auto px-6 text-center">
            <h1 className="text-2xl font-black mb-3">{T.notFoundTitle[lang]}</h1>
            <p className="text-gray-400 text-[14px] mb-8">{T.notFoundBody[lang]}</p>
            <Link href={backHref} className="inline-flex items-center gap-2 text-[#7d9bea] font-semibold text-sm hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> {T.back[lang]}
            </Link>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      <section className="bg-[#f8fafc] border-b border-slate-200 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link ref={reveal} href={backHref} className="do-reveal inline-flex items-center gap-2 text-[13px] font-semibold text-slate-500 hover:text-[#1B3A8F] transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> {T.back[lang]}
          </Link>
          <div ref={reveal} className="do-reveal do-d1 flex items-center gap-3 mb-5 text-[12px] font-bold uppercase tracking-[0.15em]">
            <span className="text-[#1B3A8F]">{item.date[lang]}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
            <span className="text-slate-500">{item.category[lang]}</span>
          </div>
          <h1 ref={reveal} className="do-reveal do-d2 text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.02em] text-slate-900 leading-[1.1]">
            {item.title[lang]}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div ref={reveal} className="do-reveal max-w-3xl mx-auto px-6 lg:px-8">
          {item.body[lang].map((p, i) => (
            <p key={i} className="text-slate-600 text-[16px] leading-[1.85] mb-5 last:mb-0">
              {p}
            </p>
          ))}

          {item.sourceType === "social" && item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-8 text-[14px] font-semibold text-[#1B3A8F] hover:text-[#2547B5] transition-colors"
            >
              {lang === "tr" ? "Gönderiyi Gör" : "View Post"}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          <div className="mt-14 pt-8 border-t border-slate-200">
            <Link href={backHref} className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-500 hover:text-[#1B3A8F] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> {T.back[lang]}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

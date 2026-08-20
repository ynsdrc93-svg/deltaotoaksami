import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, routeFor, type Lang } from "@/lib/i18n";

// Eskiden jenerik shadcn iskeleti ("Did you forget to add the page to the
// router?" — geliştirici hata mesajı, hiç markalanmamıştı). Artık sitenin
// geri kalanıyla tutarlı: SiteHeader/SiteFooter + koyu hero dili + iki dilli
// içerik (Content/UX Pass 01, §2 — "404/fallback" içerik kapsamında).
const content = {
  tr: {
    meta: { title: "Sayfa Bulunamadı | Delta Oto", description: "Aradığınız sayfa bulunamadı. Delta Oto anasayfasına dönebilirsiniz." },
    eyebrow: "Hata 404",
    title: "Sayfa Bulunamadı",
    body: "Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir.",
    cta: "Anasayfaya Dön",
  },
  en: {
    meta: { title: "Page Not Found | Delta Oto", description: "The page you're looking for could not be found. Return to the Delta Oto homepage." },
    eyebrow: "Error 404",
    title: "Page Not Found",
    body: "The page you're looking for may have been moved, removed, or never existed.",
    cta: "Back to Homepage",
  },
} satisfies Record<Lang, any>;

export default function NotFound() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);

  return (
    <div className="do-site bg-white min-h-screen flex flex-col">
      <SiteHeader />
      <section className="relative flex-1 flex items-center text-white overflow-hidden bg-[#0e1016] py-24">
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
        <div className="w-full max-w-3xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">{t.eyebrow}</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-[-0.02em] mt-4 mb-6">
            <span className="do-hero-line">404</span>
          </h1>
          <p className="text-xl font-black tracking-tight text-white mb-3">{t.title}</p>
          <p className="text-gray-300 text-[15px] leading-relaxed max-w-md mx-auto mb-10">{t.body}</p>
          <Link
            href={routeFor("home", lang)}
            className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            {t.cta}
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

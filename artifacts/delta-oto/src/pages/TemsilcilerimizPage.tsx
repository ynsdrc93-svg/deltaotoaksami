import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { RepresentativeFinderModal } from "@/components/shared/RepresentativeFinderModal";
import { GENERAL_CONTACT } from "@/lib/representatives";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, type Lang } from "@/lib/i18n";

function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

const content = {
  tr: {
    meta: {
      title: "Temsilcilerimiz — Bölge Satış Ağı | Delta Oto",
      description: "Türkiye'nin 81 iline yayılan satış ağımızda size en yakın Delta Oto temsilcisini haritadan saniyeler içinde bulun.",
    },
    hero: {
      eyebrow: "Satış Ağımız",
      titleLead: "Size En Yakın",
      titleBrand: "Delta Oto ",
      titleAccent: "Temsilcisi",
      body: "Türkiye'nin 81 iline yayılan satış yapılanmamızda, size en uygun iletişim noktasını haritadan birkaç saniyede bulun.",
      cta: "Temsilcinizi Bulun",
    },
    generalContact: {
      heading: "Genel İletişim",
      body: "Haritayı kullanmak istemiyorsanız, genel satış hattımız da size yardımcı olur.",
    },
  },
  en: {
    meta: {
      title: "Our Representatives — Regional Sales Network | Delta Oto",
      description: "Find your nearest Delta Oto representative in seconds — our sales network spans all 81 provinces of Turkey.",
    },
    hero: {
      eyebrow: "Our Sales Network",
      titleLead: "Your Nearest",
      titleBrand: "Delta Oto ",
      titleAccent: "Representative",
      body: "Our sales network spans all 81 provinces of Turkey. Find the contact point nearest you on the map in just a few seconds.",
      cta: "Find Your Representative",
    },
    generalContact: {
      heading: "General Contact",
      body: "If you'd rather not use the map, our general sales line is here to help.",
    },
  },
} satisfies Record<Lang, any>;

// İkincil erişim rotası — asıl temsilci-bulma deneyimi artık /iletisim
// içinde aynı modalı açan bir CTA olarak yaşıyor (bkz. IletisimPage.tsx).
// Bu sayfa /iletisim ile yarışan ayrı bir tam sayfa deneyim değil, doğrudan
// aynı modalı açan sade bir giriş noktası.
export function TemsilcilerimizPage() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO — dark, fotoğrafsız (bilinçli tercih). Bu sayfa artık aynı
          Türkiye haritası deneyimini açan ikincil bir giriş noktası (bkz.
          İletişim); ana depo fotoğrafını (delta-oto-depot.jpg) üçüncü kez
          kırpıp burada da kullanmak "aynı fotoğrafın her yerde tekrarı"
          hissini güçlendirirdi. Diğer sayfalardan görsel olarak kasıtlı
          şekilde ayrışması — grid doku + marka lacivertinden ince bir üst-sol
          ton + aksan çizgisi — yeterli "eksik/yarım hissi" düzeltmesini
          fotoğraf tekrarına gerek kalmadan sağlıyor. */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A8F]/20 via-transparent to-transparent" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-14 lg:py-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-5 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">{t.hero.eyebrow}</span>
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-[-0.02em] mb-4 lg:mb-6 max-w-2xl">
            <span className="do-hero-line">{t.hero.titleLead}</span><br />
            <span className="text-white">{t.hero.titleBrand}</span><span className="text-[#7d9bea]">{t.hero.titleAccent}</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-xl font-light mb-6 lg:mb-10">
            {t.hero.body}
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            <MapPin className="w-4 h-4" />
            {t.hero.cta}
          </button>
        </div>
      </section>

      {/* GENEL İLETİŞİM — navy, footer öncesi son bölüm (site rengi ritmi) */}
      <section className="bg-[#1B3A8F] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black text-white mb-1">{t.generalContact.heading}</h2>
            <p className="text-white/60 text-[13.5px]">{t.generalContact.body}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={telHref(GENERAL_CONTACT.phone)}
              className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/15 hover:bg-white/[0.14] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-md transition-colors"
            >
              <Phone className="w-4 h-4 text-[#7d9bea]" /> {GENERAL_CONTACT.phone}
            </a>
            <a
              href={`mailto:${GENERAL_CONTACT.email}`}
              className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/15 hover:bg-white/[0.14] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-md transition-colors"
            >
              <Mail className="w-4 h-4 text-[#7d9bea]" /> {GENERAL_CONTACT.email}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <RepresentativeFinderModal open={modalOpen} onClose={() => setModalOpen(false)} lang={lang} />
    </div>
  );
}

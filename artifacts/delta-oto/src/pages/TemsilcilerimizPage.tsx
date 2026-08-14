import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { RepresentativeFinderModal } from "@/components/shared/RepresentativeFinderModal";
import { GENERAL_CONTACT } from "@/lib/representatives";

function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

// İkincil erişim rotası — asıl temsilci-bulma deneyimi artık /iletisim
// içinde aynı modalı açan bir CTA olarak yaşıyor (bkz. IletisimPage.tsx).
// Bu sayfa /iletisim ile yarışan ayrı bir tam sayfa deneyim değil, doğrudan
// aynı modalı açan sade bir giriş noktası.
export function TemsilcilerimizPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO — dark */}
      <section className="relative min-h-[460px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-14 lg:py-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-5 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Satış Ağımız</span>
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-[-0.02em] mb-4 lg:mb-6 max-w-2xl">
            <span className="do-hero-line">Size En Yakın</span><br />
            <span className="text-white">Delta Oto </span><span className="text-[#7d9bea]">Temsilcisi</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-xl font-light mb-6 lg:mb-10">
            Türkiye'nin 81 iline yayılan satış yapılanmamızda, size en uygun iletişim noktasını
            haritadan birkaç saniyede bulun.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            <MapPin className="w-4 h-4" />
            Temsilcinizi Bulun
          </button>
        </div>
      </section>

      {/* GENEL İLETİŞİM — navy, footer öncesi son bölüm (site rengi ritmi) */}
      <section className="bg-[#1B3A8F] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black text-white mb-1">Genel İletişim</h2>
            <p className="text-white/60 text-[13.5px]">Haritayı kullanmak istemiyorsanız, genel satış hattımız da size yardımcı olur.</p>
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

      <RepresentativeFinderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

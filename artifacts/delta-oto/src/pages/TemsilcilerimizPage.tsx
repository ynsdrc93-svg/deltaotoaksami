import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import {
  ACTIVE_REPRESENTATIVES,
  REPRESENTATIVE_REGIONS,
  GENERAL_CONTACT,
  type Representative,
} from "@/lib/representatives";

// Tel/mailto href'leri için: görünen metin biçimi (boşluklu) korunur, href
// yalnızca rakamlara indirgenir.
function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

function RepresentativeCard({ rep }: { rep: Representative }) {
  return (
    <div className="do-card bg-white border border-slate-200 rounded-xl p-7">
      <h3 className="text-[17px] font-black text-slate-900 leading-snug">{rep.name}</h3>
      {rep.title && <p className="text-slate-500 text-[13px] mt-0.5">{rep.title}</p>}

      <div className="mt-5 pt-5 border-t border-slate-100">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#1B3A8F]">{rep.region}</span>
        {rep.provinces && rep.provinces.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {rep.provinces.map((p) => (
              <span key={p} className="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        {rep.phone && (
          <a href={telHref(rep.phone)} className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700 hover:text-[#1B3A8F] transition-colors">
            <Phone className="w-4 h-4 text-[#1B3A8F] shrink-0" /> {rep.phone}
          </a>
        )}
        {rep.email && (
          <a href={`mailto:${rep.email}`} className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700 hover:text-[#1B3A8F] transition-colors break-all">
            <Mail className="w-4 h-4 text-[#1B3A8F] shrink-0" /> {rep.email}
          </a>
        )}
      </div>
    </div>
  );
}

export function TemsilcilerimizPage() {
  const hasRepresentatives = ACTIVE_REPRESENTATIVES.length > 0;
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const filtered = activeRegion
    ? ACTIVE_REPRESENTATIVES.filter((r) => r.region === activeRegion)
    : ACTIVE_REPRESENTATIVES;

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO — dark */}
      <section className="relative min-h-[420px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-24">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Satış Ağımız</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-[-0.02em] mb-6 max-w-3xl">
            <span className="do-hero-line">Size En Yakın</span><br />
            <span className="text-white">Delta Oto </span><span className="text-[#7d9bea]">Temsilcisi</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl font-light">
            Türkiye genelindeki satış yapılanmamızla müşterilerimize bulundukları bölgede
            doğrudan ve etkin destek sağlıyoruz. Bölgenizden sorumlu satış ekibimize
            ulaşarak ürün, sipariş ve ticari süreçleriniz hakkında destek alabilirsiniz.
          </p>
        </div>
      </section>

      {/* TEMSİLCİ AĞI — doğrulanmış kayıt olduğunda gösterilir; şu an
          ACTIVE_REPRESENTATIVES boş olduğu için bu bölüm render edilmez.
          Mimari hazır: gerçek kayıtlar representatives.ts'e eklendiğinde bu
          bölüm otomatik olarak görünür, sayfa kodunda değişiklik gerekmez. */}
      {hasRepresentatives && (
        <section className="bg-white py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {REPRESENTATIVE_REGIONS.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-10">
                <button
                  type="button"
                  onClick={() => setActiveRegion(null)}
                  className={`text-[13px] font-semibold px-4 py-2 rounded-md border transition-colors ${
                    activeRegion === null
                      ? "bg-[#1B3A8F] border-[#1B3A8F] text-white"
                      : "border-slate-200 text-slate-600 hover:border-[#1B3A8F]/40"
                  }`}
                >
                  Tümü
                </button>
                {REPRESENTATIVE_REGIONS.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setActiveRegion(region)}
                    className={`text-[13px] font-semibold px-4 py-2 rounded-md border transition-colors ${
                      activeRegion === region
                        ? "bg-[#1B3A8F] border-[#1B3A8F] text-white"
                        : "border-slate-200 text-slate-600 hover:border-[#1B3A8F]/40"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((rep) => (
                <RepresentativeCard key={rep.id} rep={rep} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GENEL İLETİŞİM — her zaman gösterilir; temsilci verisi yokken
          sayfanın asıl içeriği budur (bkz. proje talimatı: "polished
          general-contact state"). Footer öncesi son bölüm olduğu için navy. */}
      <section className="relative bg-[#1B3A8F] text-white py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-20" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">
            Genel İletişim
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-5">
            {hasRepresentatives ? "Doğru Temsilciyi Bulamadınız mı?" : "Size Nasıl Yardımcı Olabiliriz?"}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-12 text-[15px] leading-relaxed">
            Satış ekibimiz sizi doğru bölge temsilcisine yönlendirmek için yardımcı olacaktır.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
            <a
              href={telHref(GENERAL_CONTACT.phone)}
              className="flex items-center justify-center gap-3 bg-white/[0.08] border border-white/15 hover:bg-white/[0.14] rounded-lg px-6 py-5 transition-colors"
            >
              <Phone className="w-5 h-5 text-[#7d9bea] shrink-0" />
              <span className="font-bold text-[15px]">{GENERAL_CONTACT.phone}</span>
            </a>
            <a
              href={`mailto:${GENERAL_CONTACT.email}`}
              className="flex items-center justify-center gap-3 bg-white/[0.08] border border-white/15 hover:bg-white/[0.14] rounded-lg px-6 py-5 transition-colors"
            >
              <Mail className="w-5 h-5 text-[#7d9bea] shrink-0" />
              <span className="font-bold text-[15px]">{GENERAL_CONTACT.email}</span>
            </a>
          </div>

          <div className="text-white/50 text-[13px] leading-relaxed mb-10">
            <p>{GENERAL_CONTACT.address}</p>
            <p className="mt-1">Faks: {GENERAL_CONTACT.fax}</p>
          </div>

          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 text-white font-semibold px-8 py-3.5 rounded-md transition-colors"
          >
            İletişim Sayfasına Git
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

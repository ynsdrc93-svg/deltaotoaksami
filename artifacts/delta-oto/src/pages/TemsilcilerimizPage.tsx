import React, { useState } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import TurkeyMap from "turkey-map-react";
import { cities as turkeyCities } from "turkey-map-react/lib/data";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import {
  representativeForProvince,
  GENERAL_CONTACT,
  type Representative,
} from "@/lib/representatives";
import {
  TURKEY_REGIONS,
  TURKEY_PROVINCES,
  provincesInRegion,
  provinceByPlate,
  type TurkeyRegion,
  type TurkeyProvince,
} from "@/lib/turkey-regions";

const CITY_PATH_BY_PLATE: Map<number, string> = new Map(
  turkeyCities.map((c: { plateNumber: number; path: string }) => [c.plateNumber, c.path]),
);

function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

function FallbackDetail({ province }: { province: TurkeyProvince }) {
  return (
    <div>
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B3A8F]">{province.region}</span>
      <h3 className="text-2xl font-black text-slate-900 mt-1 mb-5">{province.name}</h3>
      <p className="text-slate-500 text-[14px] leading-relaxed mb-7">
        Bu il için güncel bir temsilci ataması henüz yayınlanmadı. Ekibimize genel satış hattımız
        üzerinden doğrudan ulaşabilirsiniz.
      </p>
      <div className="space-y-2.5">
        <a href={telHref(GENERAL_CONTACT.phone)} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700 hover:text-[#1B3A8F] transition-colors">
          <Phone className="w-4 h-4 text-[#1B3A8F] shrink-0" /> {GENERAL_CONTACT.phone}
        </a>
        <a href={`mailto:${GENERAL_CONTACT.email}`} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700 hover:text-[#1B3A8F] transition-colors break-all">
          <Mail className="w-4 h-4 text-[#1B3A8F] shrink-0" /> {GENERAL_CONTACT.email}
        </a>
      </div>
    </div>
  );
}

function RepresentativeDetail({ rep, province }: { rep: Representative; province: TurkeyProvince }) {
  return (
    <div>
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B3A8F]">{province.name} · {rep.region}</span>
      <h3 className="text-2xl font-black text-slate-900 mt-1 leading-snug">{rep.name}</h3>
      {rep.title && <p className="text-slate-500 text-[13px] mt-0.5 mb-6">{rep.title}</p>}
      <div className="space-y-2.5 mt-6">
        {rep.phone && (
          <a href={telHref(rep.phone)} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700 hover:text-[#1B3A8F] transition-colors">
            <Phone className="w-4 h-4 text-[#1B3A8F] shrink-0" /> {rep.phone}
          </a>
        )}
        {rep.email && (
          <a href={`mailto:${rep.email}`} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700 hover:text-[#1B3A8F] transition-colors break-all">
            <Mail className="w-4 h-4 text-[#1B3A8F] shrink-0" /> {rep.email}
          </a>
        )}
      </div>
    </div>
  );
}

export function TemsilcilerimizPage() {
  const [selectedRegion, setSelectedRegion] = useState<TurkeyRegion | "all">("all");
  const [selectedPlate, setSelectedPlate] = useState<number | null>(null);

  const visibleProvinces = selectedRegion === "all" ? TURKEY_PROVINCES : provincesInRegion(selectedRegion);
  const selectedProvince = selectedPlate != null ? provinceByPlate(selectedPlate) ?? null : null;
  const selectedRep = selectedPlate != null ? representativeForProvince(selectedPlate) : undefined;

  function selectProvince(plate: number) {
    setSelectedPlate(plate);
    const region = provinceByPlate(plate)?.region;
    if (region) setSelectedRegion(region);
  }

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO — dark */}
      <section className="relative min-h-[380px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-20">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Satış Ağımız</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-[-0.02em] mb-6 max-w-3xl">
            <span className="do-hero-line">Size En Yakın</span><br />
            <span className="text-white">Delta Oto </span><span className="text-[#7d9bea]">Temsilcisi</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl font-light">
            Türkiye'nin 81 iline yayılan satış yapılanmamızda, size en uygun iletişim noktasını
            haritadan veya bölge listesinden birkaç saniyede bulabilirsiniz.
          </p>
        </div>
      </section>

      {/* HARİTA / İL SEÇİMİ — white, sayfanın ana deneyimi */}
      <section className="bg-white py-20 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Bölgesel Kapsama</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">İlinizi Seçin</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">
              81 il, 7 coğrafi bölge — haritadan bir ile tıklayın ya da aşağıdaki listeden ilinizi seçin,
              size doğru iletişim kanalını gösterelim.
            </p>
          </div>

          {/* Bölge filtresi */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setSelectedRegion("all")}
              aria-pressed={selectedRegion === "all"}
              className={`text-[13px] font-semibold px-4 py-2 rounded-md border transition-colors ${
                selectedRegion === "all"
                  ? "bg-[#1B3A8F] border-[#1B3A8F] text-white"
                  : "border-slate-200 text-slate-600 hover:border-[#1B3A8F]/40"
              }`}
            >
              Tüm Türkiye
            </button>
            {TURKEY_REGIONS.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                aria-pressed={selectedRegion === region}
                className={`text-[13px] font-semibold px-4 py-2 rounded-md border transition-colors ${
                  selectedRegion === region
                    ? "bg-[#1B3A8F] border-[#1B3A8F] text-white"
                    : "border-slate-200 text-slate-600 hover:border-[#1B3A8F]/40"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
            {/* Sol: harita + il listesi */}
            <div>
              <div className="relative max-w-xl mx-auto lg:max-w-none">
                <TurkeyMap
                  hoverable
                  showTooltip
                  customStyle={{ idleColor: "#e2e8f0", hoverColor: "#1B3A8F" }}
                  onClick={(city) => selectProvince(city.plateNumber)}
                />
                {selectedProvince && (
                  <svg
                    viewBox="0 80 1050 585"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    aria-hidden="true"
                  >
                    <path d={CITY_PATH_BY_PLATE.get(selectedProvince.plate)} fill="#1B3A8F" stroke="#7d9bea" strokeWidth={2} />
                  </svg>
                )}
              </div>
              <p className="text-slate-400 text-[12.5px] text-center mt-3 mb-8">
                İl üzerine gelerek adını görün, tıklayarak detay panelini açın.
              </p>

              <div className="flex flex-wrap gap-2">
                {visibleProvinces.map((p) => {
                  const isSelected = p.plate === selectedPlate;
                  return (
                    <button
                      key={p.plate}
                      type="button"
                      onClick={() => selectProvince(p.plate)}
                      aria-pressed={isSelected}
                      className={`text-[12.5px] font-semibold px-3 py-1.5 rounded-md border transition-colors ${
                        isSelected
                          ? "bg-[#1B3A8F] border-[#1B3A8F] text-white"
                          : "border-slate-200 text-slate-600 hover:border-[#1B3A8F]/40 hover:text-[#1B3A8F]"
                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sağ: detay paneli */}
            <div className="do-card bg-white border border-slate-200 rounded-2xl p-8 lg:sticky lg:top-28">
              {!selectedProvince ? (
                <div className="text-center py-10">
                  <MapPin className="w-7 h-7 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-slate-400 text-[14px] leading-relaxed">
                    Haritadan veya listeden bir il seçerek başlayın.
                  </p>
                </div>
              ) : selectedRep ? (
                <RepresentativeDetail rep={selectedRep} province={selectedProvince} />
              ) : (
                <FallbackDetail province={selectedProvince} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GENEL İLETİŞİM — navy, footer öncesi son bölüm (site rengi ritmi),
          ama artık ikincil/kompakt bir güvenlik ağı — sayfanın ana deneyimi
          yukarıdaki harita/il seçimi. */}
      <section className="bg-[#1B3A8F] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black text-white mb-1">Doğru İli Bulamadınız mı?</h2>
            <p className="text-white/60 text-[13.5px]">Genel satış hattımız size yardımcı olmaktan memnuniyet duyar.</p>
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
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-[13.5px] font-semibold px-2 transition-colors"
            >
              İletişim Sayfası <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

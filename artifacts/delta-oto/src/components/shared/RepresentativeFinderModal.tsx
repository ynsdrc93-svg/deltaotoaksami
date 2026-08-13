import React, { useEffect, useRef, useState } from "react";
import { X, MapPin, Phone, Mail } from "lucide-react";
import TurkeyMap from "turkey-map-react";
import { cities as turkeyCities } from "turkey-map-react/lib/data";
import { useEscapeKey } from "@/hooks/use-motion";
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

// Bölge temsilcisi bulma deneyiminin TEK yeri — /iletisim ve /temsilcilerimiz
// aynı modalı açar, mantık burada tekilleşir (DRY). Harita + bölge filtresi +
// il listesi + detay paneli, önceden /temsilcilerimiz'in ana gövdesiydi;
// artık kontrollü bir overlay içinde, hem masaüstünde hem mobilde tam ekran
// sheet olarak davranır.

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
      <h3 className="text-xl font-black text-slate-900 mt-1 mb-4">{province.name}</h3>
      <p className="text-slate-500 text-[13.5px] leading-relaxed mb-6">
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
      <h3 className="text-xl font-black text-slate-900 mt-1 leading-snug">{rep.name}</h3>
      {rep.title && <p className="text-slate-500 text-[13px] mt-0.5 mb-5">{rep.title}</p>}
      <div className="space-y-2.5 mt-5">
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

export function RepresentativeFinderModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selectedRegion, setSelectedRegion] = useState<TurkeyRegion | "all">("all");
  const [selectedPlate, setSelectedPlate] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const visibleProvinces = selectedRegion === "all" ? TURKEY_PROVINCES : provincesInRegion(selectedRegion);
  const selectedProvince = selectedPlate != null ? provinceByPlate(selectedPlate) ?? null : null;
  const selectedRep = selectedPlate != null ? representativeForProvince(selectedPlate) : undefined;

  function selectProvince(plate: number) {
    setSelectedPlate(plate);
    const region = provinceByPlate(plate)?.region;
    if (region) setSelectedRegion(region);
  }

  useEscapeKey(onClose, open);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[80] transition-opacity duration-300 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute inset-0 sm:inset-5 lg:inset-x-0 lg:top-8 lg:bottom-8 lg:mx-auto lg:max-w-5xl bg-white sm:rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Bölge Temsilcinizi Bulun"
      >
        <div className="flex items-start justify-between gap-4 p-6 lg:p-7 border-b border-slate-100 shrink-0">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B3A8F]">Satış Ağımız</span>
            <h2 className="text-xl lg:text-2xl font-black text-slate-900 mt-1">Bölge Temsilcinizi Bulun</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-7">
            <button
              type="button"
              onClick={() => setSelectedRegion("all")}
              aria-pressed={selectedRegion === "all"}
              className={`text-[12.5px] font-semibold px-3.5 py-1.5 rounded-md border transition-colors ${
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
                className={`text-[12.5px] font-semibold px-3.5 py-1.5 rounded-md border transition-colors ${
                  selectedRegion === region
                    ? "bg-[#1B3A8F] border-[#1B3A8F] text-white"
                    : "border-slate-200 text-slate-600 hover:border-[#1B3A8F]/40"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
            <div>
              <div className="relative max-w-[280px] sm:max-w-sm mx-auto lg:max-w-none">
                <TurkeyMap
                  hoverable
                  showTooltip
                  customStyle={{ idleColor: "#e2e8f0", hoverColor: "#1B3A8F" }}
                  onClick={(city) => selectProvince(city.plateNumber)}
                />
                {selectedProvince && (
                  <svg viewBox="0 80 1050 585" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                    <path d={CITY_PATH_BY_PLATE.get(selectedProvince.plate)} fill="#1B3A8F" stroke="#7d9bea" strokeWidth={2} />
                  </svg>
                )}
              </div>
              <p className="text-slate-400 text-[12px] text-center mt-3 mb-6">
                İl üzerine gelerek adını görün, tıklayarak seçin.
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
                      className={`text-[12px] font-semibold px-3 py-1.5 rounded-md border transition-colors ${
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

            <div className="do-card bg-white border border-slate-200 rounded-2xl p-7 lg:sticky lg:top-0">
              {!selectedProvince ? (
                <div className="text-center py-8">
                  <MapPin className="w-7 h-7 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-slate-400 text-[13.5px] leading-relaxed">
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

        <div className="border-t border-slate-100 px-6 lg:px-8 py-4 shrink-0 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60">
          <span className="text-[12.5px] text-slate-500">İlinizi bulamadınız mı? Genel hattımızla da iletişime geçebilirsiniz.</span>
          <div className="flex items-center gap-3">
            <a href={telHref(GENERAL_CONTACT.phone)} className="text-[12.5px] font-semibold text-[#1B3A8F] hover:text-[#2547B5] transition-colors">{GENERAL_CONTACT.phone}</a>
            <span className="text-slate-300">·</span>
            <a href={`mailto:${GENERAL_CONTACT.email}`} className="text-[12.5px] font-semibold text-[#1B3A8F] hover:text-[#2547B5] transition-colors">{GENERAL_CONTACT.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

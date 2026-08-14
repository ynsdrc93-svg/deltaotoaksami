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
// aynı modalı açar, mantık burada tekilleşir (DRY).

const CITY_PATH_BY_PLATE: Map<number, string> = new Map(
  turkeyCities.map((c: { plateNumber: number; path: string }) => [c.plateNumber, c.path]),
);

// Otomatik bounding-box merkezi çoğu il için iyi çalışıyor, ancak gerçekten
// küçük/sıkışık birkaç il (Doğu Marmara ve Batı Karadeniz kümeleri) için
// okunabilirlik adına küçük, elle ayarlanmış nudge'lar — il konumunu/veriyi
// DEĞİŞTİRMEZ, yalnızca o ilin etiketinin görsel yerleşimini ince ayarlar.
const PROVINCE_LABEL_OFFSETS: Record<number, { dx: number; dy: number }> = {
  34: { dx: 4, dy: 10 },    // İstanbul — boğaz nedeniyle bbox merkezi sudaki boşluğa denk gelebilir
  41: { dx: -10, dy: -8 },  // Kocaeli
  77: { dx: 12, dy: 10 },   // Yalova — Kocaeli/Bursa arasında çok küçük
  11: { dx: 8, dy: 10 },    // Bilecik
  54: { dx: -4, dy: 10 },   // Sakarya
  81: { dx: 10, dy: -2 },   // Düzce
  74: { dx: -8, dy: -6 },   // Bartın
  78: { dx: 8, dy: 10 },    // Karabük
  67: { dx: -10, dy: 4 },   // Zonguldak
  69: { dx: 10, dy: 6 },    // Bayburt
  79: { dx: 0, dy: 10 },    // Kilis
  73: { dx: 0, dy: -8 },    // Şırnak
};

// Eşikler, 81 ilin gerçek bounding-box alan dağılımına göre kalibre edildi
// (min≈500, p25≈3550, medyan≈5000, p75≈8400, max≈27700 birim²) — küçük
// illerin (ör. Yalova, Kilis, Bayburt) etiketi orantılı olarak küçük kalır,
// büyük illerin (ör. Konya, Sivas) etiketi daha büyük ve rahat okunur olur.
// `scale`: harita SVG'si viewBox birimlerinde sabit kalıyor ama mobilde
// fiziksel render genişliği masaüstünün çok altında (~340px vs ~700px) —
// aynı birim font-size mobilde ekranda çok daha küçük piksele düşüyor. Mobil
// modalda ~1.8 verilerek bu fiziksel küçülme telafi edilir, okunabilirlik
// masaüstüyle kıyaslanabilir hale gelir.
function labelFontSize(area: number, isSelected: boolean, scale = 1): number {
  const base = area > 9000 ? 12 : area > 5000 ? 10 : area > 2200 ? 8.5 : 6.8;
  return (isSelected ? base + 1.5 : base) * scale;
}

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
      {/* Coğrafi bağlam province verisinden gelir (province.region ·
          province.name) — rep.region kullanılmaz, çünkü bu ilin ataması tek
          bir temsilciye özelse (ör. Gümüşhane) ikisi aynı string olup
          "Gümüşhane · Gümüşhane" gibi anlamsız bir tekrar üretebilir. */}
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B3A8F]">{province.region} · {province.name}</span>
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
  const [labelPositions, setLabelPositions] = useState<Map<number, { x: number; y: number; area: number }>>(new Map());
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const allProvincesLayerRef = useRef<SVGGElement>(null);
  // Tailwind'in `sm` eşiğiyle (640px) hizalı — bu genişliğin altında harita
  // fiziksel olarak çok daha küçük render edildiği için il etiketleri
  // labelFontSize'da ölçeklenir (bkz. yukarıdaki not).
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const regionProvinces = selectedRegion === "all" ? [] : provincesInRegion(selectedRegion);
  const activeRegionPlates = new Set(regionProvinces.map((p) => p.plate));
  const visibleProvinces = selectedRegion === "all" ? TURKEY_PROVINCES : regionProvinces;
  const selectedProvince = selectedPlate != null ? provinceByPlate(selectedPlate) ?? null : null;
  const selectedRep = selectedPlate != null ? representativeForProvince(selectedPlate) : undefined;

  function selectProvince(plate: number) {
    setSelectedPlate(plate);
    const region = provinceByPlate(plate)?.region;
    if (region) setSelectedRegion(region);
  }

  function fillForProvince(plate: number): string {
    if (plate === selectedPlate) return "#1B3A8F";
    if (activeRegionPlates.has(plate)) return "#9db3e8";
    return "transparent";
  }

  // İl geometrisi hiç değişmediği için etiket konumları yalnızca bir kez,
  // mount'ta hesaplanır (path'in gerçek bounding-box merkezi). Bölge/il
  // seçimi yalnızca hangi etiketin vurgulanacağını belirler — konumları
  // yeniden hesaplamaz.
  useEffect(() => {
    if (!allProvincesLayerRef.current) return;
    const next = new Map<number, { x: number; y: number; area: number }>();
    allProvincesLayerRef.current.querySelectorAll("path[data-plate]").forEach((el) => {
      const plate = Number(el.getAttribute("data-plate"));
      const bbox = (el as SVGGraphicsElement).getBBox();
      next.set(plate, { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2, area: bbox.width * bbox.height });
    });
    setLabelPositions(next);
  }, []);

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
        className={`absolute inset-0 sm:inset-5 lg:inset-x-0 lg:top-4 lg:bottom-4 lg:mx-auto lg:max-w-6xl bg-white sm:rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Bölge Temsilcinizi Bulun"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 lg:px-6 lg:py-4 border-b border-slate-100 shrink-0">
          <h2 className="text-lg lg:text-xl font-black text-slate-900">Bölge Temsilcinizi Bulun</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              type="button"
              onClick={() => setSelectedRegion("all")}
              aria-pressed={selectedRegion === "all"}
              className={`text-[11.5px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                selectedRegion === "all"
                  ? "bg-[#1B3A8F] border-[#1B3A8F] text-white shadow-sm shadow-[#1B3A8F]/20"
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
                className={`text-[11.5px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  selectedRegion === region
                    ? "bg-[#1B3A8F] border-[#1B3A8F] text-white shadow-sm shadow-[#1B3A8F]/20"
                    : "border-slate-200 text-slate-600 hover:border-[#1B3A8F]/40"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[3fr_1fr] gap-4 sm:gap-5">
            {/* Harita + il ızgarası — tek "feature panel" çerçevesi, tüm 81 il adı her zaman görünür.
                Mobilde max-width sınırı yok — harita panelin tüm genişliğini
                kullanır, bu da etiketlerin fiziksel render boyutunu (dolayısıyla
                okunabilirliğini) doğrudan büyütür. */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-2.5 sm:p-4 lg:p-5">
              <div className="relative mx-auto">
                <TurkeyMap
                  hoverable
                  customStyle={{ idleColor: "#e2e8f0", hoverColor: "#c7d5f5" }}
                  onClick={(city) => selectProvince(city.plateNumber)}
                />
                <svg viewBox="0 80 1050 585" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                  <g ref={allProvincesLayerRef}>
                    {TURKEY_PROVINCES.map((p) => (
                      <path
                        key={p.plate}
                        data-plate={p.plate}
                        d={CITY_PATH_BY_PLATE.get(p.plate)}
                        fill={fillForProvince(p.plate)}
                        stroke={p.plate === selectedPlate || activeRegionPlates.has(p.plate) ? "#ffffff" : "none"}
                        strokeWidth={1}
                      />
                    ))}
                  </g>
                  {TURKEY_PROVINCES.map((p) => {
                    const pos = labelPositions.get(p.plate);
                    if (!pos) return null;
                    const offset = PROVINCE_LABEL_OFFSETS[p.plate];
                    const isSelected = p.plate === selectedPlate;
                    const isQuiet = selectedRegion !== "all" && !activeRegionPlates.has(p.plate) && !isSelected;
                    const labelScale = isNarrow ? 1.8 : 1;
                    return (
                      <text
                        key={p.plate}
                        x={pos.x + (offset?.dx ?? 0)}
                        y={pos.y + (offset?.dy ?? 0)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={labelFontSize(pos.area, isSelected, labelScale)}
                        fontWeight={isSelected ? 700 : isQuiet ? 500 : 700}
                        fill={isSelected ? "#ffffff" : "#1B3A8F"}
                        fillOpacity={isQuiet ? 0.55 : 1}
                        stroke={isSelected ? "none" : "#ffffff"}
                        strokeOpacity={isQuiet ? 0.7 : 1}
                        strokeWidth={isSelected ? 0 : 2.3 * labelScale}
                        paintOrder="stroke"
                      >
                        {p.name}
                      </text>
                    );
                  })}
                </svg>
              </div>

              {/* "Tüm Türkiye": kısa tek satır ipucu. Bölge seçili: o bölgenin il
                  ızgarası — 81 ili listelemeye çalışmak yerine, yalnızca seçili
                  bölgenin illeri kompakt bir ızgarada gösterilir. */}
              {selectedRegion === "all" ? (
                <p className="text-slate-400 text-[11.5px] text-center mt-2.5">
                  Haritadan bir il seçin veya yukarıdan bölge seçerek daraltın.
                </p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-3">
                  {visibleProvinces.map((p) => {
                    const isSelected = p.plate === selectedPlate;
                    return (
                      <button
                        key={p.plate}
                        type="button"
                        onClick={() => selectProvince(p.plate)}
                        aria-pressed={isSelected}
                        className={`text-[12px] font-semibold px-2 py-2 rounded-md border truncate transition-colors ${
                          isSelected
                            ? "bg-[#1B3A8F] border-[#1B3A8F] text-white"
                            : "bg-white border-slate-200 text-slate-600 hover:border-[#1B3A8F]/40 hover:text-[#1B3A8F]"
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Temsilci/fallback detayı — kolonun kalan boşluğunu dikey ortalayarak kullanır */}
            <div className="relative do-card bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 overflow-hidden flex flex-col justify-center min-h-[140px] sm:min-h-[160px]">
              <MapPin className="absolute -right-3 -bottom-3 w-16 h-16 sm:-right-4 sm:-bottom-4 sm:w-20 sm:h-20 text-slate-50 pointer-events-none" strokeWidth={1} aria-hidden="true" />
              <div className="relative">
                {!selectedProvince ? (
                  <div className="text-center">
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
        </div>

        <div className="border-t border-slate-100 px-5 lg:px-6 py-2.5 shrink-0 flex flex-wrap items-center justify-between gap-2 bg-slate-50/60">
          <span className="text-[11.5px] text-slate-500">İlinizi bulamadınız mı?</span>
          <div className="flex items-center gap-2.5">
            <a href={telHref(GENERAL_CONTACT.phone)} className="text-[11.5px] font-semibold text-[#1B3A8F] hover:text-[#2547B5] transition-colors">{GENERAL_CONTACT.phone}</a>
            <span className="text-slate-300">·</span>
            <a href={`mailto:${GENERAL_CONTACT.email}`} className="text-[11.5px] font-semibold text-[#1B3A8F] hover:text-[#2547B5] transition-colors">{GENERAL_CONTACT.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

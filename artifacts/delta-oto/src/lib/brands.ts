// Excel kaynağı "Kopya Delta Markalar -kategoriler.xlsx" (Sheet: Markalar) —
// Delta Oto'nun kendi tedarikçi sınıflandırması, Yerli/Global ayrımının
// TEK doğruluk kaynağı. Bu dosyadaki origin alanı asla tahminle atanmaz.
export type BrandOrigin = "yerli" | "global";

export interface Brand {
  slug: string;
  name: string;
  website?: string;
  /** Excel kaynağında sınıflandırılmış markalarda dolu; diğerlerinde yok. */
  origin?: BrandOrigin;
  /** false ise /images/brands/{slug}.png henüz yok — tipografik yer tutucu kullanılır. */
  hasLogo: boolean;
}

// Excel'e göre Yerli/Global sınıflandırılmış 61 marka — Tedarikçiler sayfasındaki
// resmi marka duvarının (Global Markalar / Yerli Markalar) TEK kaynağı.
// Alfabetik değil, Excel'deki orijinal sıra korunmuştur.
export const CLASSIFIED_BRANDS: Brand[] = [
  { slug: "behr", name: "Behr", origin: "global", hasLogo: false },
  { slug: "beru", name: "Beru", origin: "global", hasLogo: false },
  { slug: "blueprint", name: "Blue Print", origin: "global", hasLogo: false },
  { slug: "borgwarner", name: "BorgWarner", website: "https://www.borgwarner.com/aftermarket", origin: "global", hasLogo: true },
  { slug: "bosch", name: "Bosch", website: "https://www.boschaftermarket.com/", origin: "global", hasLogo: true },
  { slug: "brembo", name: "Brembo", website: "https://www.brembo.com/en", origin: "global", hasLogo: true },
  { slug: "cargo", name: "HC-Cargo", origin: "global", hasLogo: false },
  { slug: "champion", name: "Champion", origin: "global", hasLogo: true },
  { slug: "contitech", name: "ContiTech", origin: "global", hasLogo: true },
  { slug: "corteco", name: "Corteco", website: "https://www.corteco.com/", origin: "global", hasLogo: true },
  { slug: "dayco", name: "Dayco", origin: "global", hasLogo: false },
  { slug: "delphi", name: "Delphi", origin: "global", hasLogo: true },
  { slug: "denso", name: "Denso", website: "https://www.denso-am.eu/", origin: "global", hasLogo: true },
  { slug: "dolz", name: "Dolz", website: "https://www.idolz.com/en/", origin: "global", hasLogo: true },
  { slug: "elring", name: "Elring", website: "https://www.elring.us/", origin: "global", hasLogo: true },
  { slug: "era", name: "ERA Benelux", origin: "global", hasLogo: false },
  { slug: "fag", name: "FAG", origin: "global", hasLogo: true },
  { slug: "febi", name: "febi bilstein", origin: "global", hasLogo: true },
  { slug: "ferodo", name: "Ferodo", origin: "global", hasLogo: false },
  { slug: "filtron", name: "Filtron", origin: "yerli", hasLogo: true },
  { slug: "frendi", name: "Frendi", origin: "yerli", hasLogo: false },
  { slug: "gates", name: "Gates", website: "https://www.gates.com/", origin: "global", hasLogo: true },
  { slug: "gkn", name: "GKN", website: "https://www.gknautomotive.com/en/aftermarket/", origin: "global", hasLogo: true },
  { slug: "hlmando", name: "HL Mando", website: "https://hlmandoaftermarket.com/", origin: "global", hasLogo: true },
  { slug: "hattat", name: "Hattat", origin: "yerli", hasLogo: false },
  { slug: "hella", name: "Hella", origin: "global", hasLogo: true },
  { slug: "henkel", name: "Henkel", origin: "global", hasLogo: false },
  { slug: "ina", name: "INA", origin: "global", hasLogo: true },
  { slug: "ioto", name: "IOTO", origin: "yerli", hasLogo: false },
  { slug: "kale", name: "Kale", origin: "yerli", hasLogo: true },
  { slug: "kingpiston", name: "King Piston", origin: "yerli", hasLogo: false },
  { slug: "lemforder", name: "Lemförder", origin: "global", hasLogo: true },
  { slug: "liquimoly", name: "Liqui Moly", website: "https://www.liqui-moly.com/", origin: "global", hasLogo: true },
  { slug: "luk", name: "LuK", origin: "global", hasLogo: true },
  { slug: "mahle", name: "Mahle", website: "https://www.mahle-aftermarket.com/eu/en/", origin: "global", hasLogo: true },
  { slug: "mannfilter", name: "Mann-Filter", website: "https://www.mann-filter.com/", origin: "global", hasLogo: true },
  { slug: "monroe", name: "Monroe", website: "https://www.monroe.com/", origin: "yerli", hasLogo: true },
  { slug: "ngk", name: "NGK", origin: "global", hasLogo: true },
  { slug: "nrf", name: "NRF", website: "https://www.nrf.eu/", origin: "global", hasLogo: true },
  { slug: "optima", name: "Optima", origin: "yerli", hasLogo: false },
  { slug: "osram", name: "Osram", website: "https://www.osram.com/am/", origin: "global", hasLogo: true },
  { slug: "purflux", name: "Purflux Group", website: "https://purfluxgroup.com/", origin: "global", hasLogo: true },
  { slug: "rapro", name: "Rapro", origin: "yerli", hasLogo: false },
  { slug: "sachs", name: "Sachs", origin: "global", hasLogo: true },
  { slug: "segautomotive", name: "SEG Automotive", website: "https://www.seg-automotive.com/", origin: "global", hasLogo: true },
  { slug: "silbak", name: "Silbak", origin: "yerli", hasLogo: false },
  { slug: "skf", name: "SKF", website: "https://vehicleaftermarket.skf.com/", origin: "global", hasLogo: true },
  { slug: "spart", name: "Spart", origin: "yerli", hasLogo: true },
  { slug: "supsan", name: "Supsan", origin: "yerli", hasLogo: false },
  { slug: "swag", name: "SWAG", origin: "global", hasLogo: true },
  { slug: "taifun", name: "Taifun", origin: "yerli", hasLogo: false },
  { slug: "teknorot", name: "Teknorot", origin: "yerli", hasLogo: false },
  { slug: "trw", name: "TRW", origin: "global", hasLogo: true },
  { slug: "ucel", name: "Üçel", origin: "yerli", hasLogo: false },
  { slug: "ufifilters", name: "UFI Filters", website: "https://www.ufi-aftermarket.com/", origin: "global", hasLogo: true },
  { slug: "valeo", name: "Valeo", website: "https://www.valeoservice.com/en-com", origin: "global", hasLogo: true },
  { slug: "vdo", name: "VDO", origin: "global", hasLogo: true },
  { slug: "vitesco", name: "Vitesco Technologies", website: "https://www.vitesco-technologies.com/", origin: "global", hasLogo: true },
  { slug: "wolflubricants", name: "Wolf Lubricants", website: "https://www.wolflubes.com/", origin: "global", hasLogo: true },
  { slug: "opar", name: "Opar", origin: "global", hasLogo: true },
  { slug: "marelli", name: "Marelli", website: "https://www.magnetimarelli-parts-and-services.com/", origin: "global", hasLogo: true },
];

export const GLOBAL_BRANDS: Brand[] = CLASSIFIED_BRANDS.filter((b) => b.origin === "global");
export const YERLI_BRANDS: Brand[] = CLASSIFIED_BRANDS.filter((b) => b.origin === "yerli");

// Excel'de sınıflandırılmamış ama önceki çalışmada resmi kaynaklardan doğrulanmış
// ek markalar. Yerli/Global etiketi taşımazlar (bilinçli tercih — bkz. proje notları)
// — yalnızca ana sayfanın etiketsiz "geniş portföy" şeridinde kullanılır.
export const UNCLASSIFIED_BRANDS: Brand[] = [
  { slug: "ajusa", name: "Ajusa", website: "https://ajusa.online/en/", hasLogo: true },
  { slug: "akzonobel", name: "AkzoNobel", website: "https://www.akzonobel.com/", hasLogo: true },
  { slug: "bilsteingroup", name: "Bilstein Group", website: "https://bilsteingroup.com/en/", hasLogo: true },
  { slug: "clarios", name: "Clarios", website: "https://www.clarios.com/", hasLogo: true },
  { slug: "cojali", name: "Cojali", website: "https://www.cojaliparts.com/en/", hasLogo: true },
  { slug: "continental", name: "Continental", website: "https://www.continental-aftermarket.com/", hasLogo: true },
  { slug: "dinex", name: "Dinex", website: "https://www.dinex.eu/", hasLogo: true },
  { slug: "driv", name: "DRiV", website: "https://www.drivparts.com/", hasLogo: true },
  { slug: "forvia", name: "Forvia (Hella)", website: "https://www.hella.com/en/", hasLogo: true },
  { slug: "haynespro", name: "HaynesPro", website: "https://www.haynespro.com/", hasLogo: true },
  { slug: "hengst", name: "Hengst Filtration", website: "https://www.hengst.com/en/solutions/industries/136-automotive-aftermarket", hasLogo: true },
  { slug: "herthbuss", name: "Herth+Buss", website: "https://herthundbuss.com/en/", hasLogo: true },
  { slug: "kyb", name: "KYB", website: "https://kyb-europe.com/", hasLogo: true },
  { slug: "meritor", name: "Meritor", website: "https://www.meritorpartsxpress.com/", hasLogo: true },
  { slug: "nissens", name: "Nissens", website: "https://nissens.com/", hasLogo: true },
  { slug: "niterra", name: "Niterra (NGK)", website: "https://www.ngkntk.com/", hasLogo: true },
  { slug: "philips", name: "Philips", website: "https://www.philips.com/", hasLogo: true },
  { slug: "phinia", name: "Phinia (Delphi)", website: "https://www.delphiautoparts.com/", hasLogo: true },
  { slug: "schaeffler", name: "Schaeffler", website: "https://www.schaeffler.com/en/divisions-products/automotive-aftermarket/", hasLogo: true },
  { slug: "stabilus", name: "Stabilus", website: "https://www.stabilus.com/", hasLogo: true },
  { slug: "tecalliance", name: "TecAlliance", website: "https://www.tecalliance.net/", hasLogo: true },
  { slug: "titanx", name: "TitanX", website: "https://www.titanx.com/", hasLogo: true },
  { slug: "tmdfriction", name: "TMD Friction (Textar)", website: "https://tmdfriction.com/", hasLogo: true },
  { slug: "totalenergies", name: "TotalEnergies", website: "https://lubricants.totalenergies.com/home", hasLogo: true },
  { slug: "trucktec", name: "Trucktec Automotive", website: "https://www.trucktec.com/", hasLogo: true },
  { slug: "zfaftermarket", name: "ZF Aftermarket", website: "https://aftermarket.zf.com/", hasLogo: true },
];

// Ana sayfa marka şeridi için: sınıflandırılmış + sınıflandırılmamış markaların tamamı.
export const ALL_BRANDS: Brand[] = [...CLASSIFIED_BRANDS, ...UNCLASSIFIED_BRANDS];

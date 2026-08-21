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
  /** false ise doğrulanmış bir logo asset'i henüz yok — tipografik yer tutucu
   * kullanılır (bkz. src/components/shared/BrandLogo.tsx). Asla tahmini/düşük
   * kaliteli bir görselle "true" işaretlenmez. */
  hasVerifiedLogo: boolean;
  /** Dosya uzantısı — /images/brands/{slug}.{logoFormat}. Belirtilmezse "png" varsayılır.
   * "webp" — scripts/optimize-images.mjs ile üretilen, retina-safe boyutta optimize edilmiş raster logo. */
  logoFormat?: "png" | "svg" | "webp";
  /** "dark" ise logo yalnızca beyaz/açık renkli çizim içerir (şeffaf zeminde
   * görünmez) — koyu kart zemininde gösterilmesi gerekir. Belirtilmezse "light". */
  logoBackground?: "light" | "dark";
}

// Excel'e göre Yerli/Global sınıflandırılmış 61 marka — Tedarikçiler sayfasındaki
// resmi marka duvarının (Global Markalar / Yerli Markalar) TEK kaynağı.
// Alfabetik değil, Excel'deki orijinal sıra korunmuştur.
// logoFormat: "webp" olan tüm raster logolar scripts/optimize-images.mjs ile
// üretildi (bkz. CLAUDE.md performans notları) — orijinal PNG kaynaklar
// diskte source-of-truth olarak duruyor, yalnızca sitede referans verilen
// format webp'ye çevrildi. Yeni bir marka eklenirse logoFormat belirtilmeden
// bırakılabilir (BrandLogo.tsx varsayılanı "png"); script tekrar
// çalıştırılınca webp'ye geçirilebilir.
//
// Header/Supplier Assets Round: "Delta-Tedarikci-Logolari.pdf" (kullanıcı
// sağladı, 55 sayfa/marka, Adobe Illustrator kaynağı) artık bu 61 markanın
// 55'i için logo ARTWORK'ünün tek doğruluk kaynağı — sayfa→marka eşlemesi
// birebir doğrulandı, hiçbiri tahmin edilmedi. Her sayfa yüksek çözünürlükte
// (400dpi, şeffaflık korunarak) render edildi, alpha kanalına göre içerik
// sınırlarına kırpıldı (~%3 kenar boşluğu eklendi), 560px genişliğe (mevcut
// asset kuralıyla aynı) yeniden boyutlandırıldı — sanat yeniden çizilmedi,
// renklendirilmedi, deforme edilmedi. PDF'te OLMAYAN 6 sınıflandırılmış
// marka (LuK, Mahle, Mann-Filter, Monroe, Optima, Taifun) mevcut doğrulanmış
// asset'leriyle DEĞİŞMEDEN kalıyor. PDF'teki yeni artwork'ün önceki
// asset'ten farklı olarak zaten açık zeminde tam okunaklı çıktığı 5 marka
// (Frendi, IOTO, King Piston, Silbak, Supsan) için logoBackground:"dark"
// bayrağı kaldırıldı — yeni asset koyu kart gerektirmiyor.
export const CLASSIFIED_BRANDS: Brand[] = [
  { slug: "behr", name: "Behr", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "beru", name: "Beru", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "blueprint", name: "Blue Print", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "borgwarner", name: "BorgWarner", website: "https://www.borgwarner.com/aftermarket", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "bosch", name: "Bosch", website: "https://www.boschaftermarket.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "brembo", name: "Brembo", website: "https://www.brembo.com/en", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "cargo", name: "HC-Cargo", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "champion", name: "Champion", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "contitech", name: "ContiTech", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "corteco", name: "Corteco", website: "https://www.corteco.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "dayco", name: "Dayco", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "delphi", name: "Delphi", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "denso", name: "Denso", website: "https://www.denso-am.eu/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "dolz", name: "Dolz", website: "https://www.idolz.com/en/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "elring", name: "Elring", website: "https://www.elring.us/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "era", name: "ERA Benelux", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "fag", name: "FAG", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "febi", name: "febi bilstein", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "ferodo", name: "Ferodo", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "filtron", name: "Filtron", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "frendi", name: "Frendi", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "gates", name: "Gates", website: "https://www.gates.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "gkn", name: "GKN", website: "https://www.gknautomotive.com/en/aftermarket/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "hlmando", name: "HL Mando", website: "https://hlmandoaftermarket.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "hattat", name: "Hattat", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "hella", name: "Hella", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "henkel", name: "Henkel", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "ina", name: "INA", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "ioto", name: "IOTO", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "kale", name: "Kale", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "kingpiston", name: "King Piston", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "lemforder", name: "Lemförder", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "liquimoly", name: "Liqui Moly", website: "https://www.liqui-moly.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "luk", name: "LuK", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "mahle", name: "Mahle", website: "https://www.mahle-aftermarket.com/eu/en/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "mannfilter", name: "Mann-Filter", website: "https://www.mann-filter.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "monroe", name: "Monroe", website: "https://www.monroe.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "ngk", name: "NGK", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "nrf", name: "NRF", website: "https://www.nrf.eu/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "optima", name: "Optima", origin: "yerli", hasVerifiedLogo: true, logoFormat: "svg" },
  { slug: "osram", name: "Osram", website: "https://www.osram.com/am/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "purflux", name: "Purflux Group", website: "https://purfluxgroup.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "rapro", name: "Rapro", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "sachs", name: "Sachs", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "segautomotive", name: "SEG Automotive", website: "https://www.seg-automotive.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "silbak", name: "Silbak", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "skf", name: "SKF", website: "https://vehicleaftermarket.skf.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "spart", name: "Spart", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "supsan", name: "Supsan", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "swag", name: "SWAG", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "taifun", name: "Taifun", origin: "yerli", hasVerifiedLogo: false },
  { slug: "teknorot", name: "Teknorot", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "trw", name: "TRW", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "ucel", name: "Üçel", origin: "yerli", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "ufifilters", name: "UFI Filters", website: "https://www.ufi-aftermarket.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "valeo", name: "Valeo", website: "https://www.valeoservice.com/en-com", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "vdo", name: "VDO", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "vitesco", name: "Vitesco Technologies", website: "https://www.vitesco-technologies.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "wolflubricants", name: "Wolf Lubricants", website: "https://www.wolflubes.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "opar", name: "Opar", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
  { slug: "marelli", name: "Marelli", website: "https://www.magnetimarelli-parts-and-services.com/", origin: "global", hasVerifiedLogo: true, logoFormat: "webp" },
];

export const GLOBAL_BRANDS: Brand[] = CLASSIFIED_BRANDS.filter((b) => b.origin === "global");
export const YERLI_BRANDS: Brand[] = CLASSIFIED_BRANDS.filter((b) => b.origin === "yerli");

// DORMANT — Excel kaynağında ("Kopya Delta Markalar -kategoriler.xlsx") yer
// almayan, önceki çalışmada resmi kaynaklardan doğrulanmış ek markalar.
// Excel şu an için TEK marka kaynağı kabul edildiğinden (kullanıcı kararı),
// bu liste hiçbir sayfada gösterilmiyor ve hiçbir marka sayacına dahil
// edilmiyor — Tedarikçiler sayfası ve ana sayfa şeridi yalnızca
// CLASSIFIED_BRANDS kullanır. Silinmedi: Excel ileride güncellenip bu
// markaları kapsarsa, araştırılmış website verisi burada hazır durur.
export const UNCLASSIFIED_BRANDS: Brand[] = [
  { slug: "ajusa", name: "Ajusa", website: "https://ajusa.online/en/", hasVerifiedLogo: true },
  { slug: "akzonobel", name: "AkzoNobel", website: "https://www.akzonobel.com/", hasVerifiedLogo: true },
  { slug: "bilsteingroup", name: "Bilstein Group", website: "https://bilsteingroup.com/en/", hasVerifiedLogo: true },
  { slug: "clarios", name: "Clarios", website: "https://www.clarios.com/", hasVerifiedLogo: true },
  { slug: "cojali", name: "Cojali", website: "https://www.cojaliparts.com/en/", hasVerifiedLogo: true },
  { slug: "continental", name: "Continental", website: "https://www.continental-aftermarket.com/", hasVerifiedLogo: true },
  { slug: "dinex", name: "Dinex", website: "https://www.dinex.eu/", hasVerifiedLogo: true },
  { slug: "driv", name: "DRiV", website: "https://www.drivparts.com/", hasVerifiedLogo: true },
  { slug: "forvia", name: "Forvia (Hella)", website: "https://www.hella.com/en/", hasVerifiedLogo: true },
  { slug: "haynespro", name: "HaynesPro", website: "https://www.haynespro.com/", hasVerifiedLogo: true },
  { slug: "hengst", name: "Hengst Filtration", website: "https://www.hengst.com/en/solutions/industries/136-automotive-aftermarket", hasVerifiedLogo: true },
  { slug: "herthbuss", name: "Herth+Buss", website: "https://herthundbuss.com/en/", hasVerifiedLogo: true },
  { slug: "kyb", name: "KYB", website: "https://kyb-europe.com/", hasVerifiedLogo: true },
  { slug: "meritor", name: "Meritor", website: "https://www.meritorpartsxpress.com/", hasVerifiedLogo: true },
  { slug: "nissens", name: "Nissens", website: "https://nissens.com/", hasVerifiedLogo: true },
  { slug: "niterra", name: "Niterra (NGK)", website: "https://www.ngkntk.com/", hasVerifiedLogo: true },
  { slug: "philips", name: "Philips", website: "https://www.philips.com/", hasVerifiedLogo: true },
  { slug: "phinia", name: "Phinia (Delphi)", website: "https://www.delphiautoparts.com/", hasVerifiedLogo: true },
  { slug: "schaeffler", name: "Schaeffler", website: "https://www.schaeffler.com/en/divisions-products/automotive-aftermarket/", hasVerifiedLogo: true },
  { slug: "stabilus", name: "Stabilus", website: "https://www.stabilus.com/", hasVerifiedLogo: true },
  { slug: "tecalliance", name: "TecAlliance", website: "https://www.tecalliance.net/", hasVerifiedLogo: true },
  { slug: "titanx", name: "TitanX", website: "https://www.titanx.com/", hasVerifiedLogo: true },
  { slug: "tmdfriction", name: "TMD Friction (Textar)", website: "https://tmdfriction.com/", hasVerifiedLogo: true },
  { slug: "totalenergies", name: "TotalEnergies", website: "https://lubricants.totalenergies.com/home", hasVerifiedLogo: true },
  { slug: "trucktec", name: "Trucktec Automotive", website: "https://www.trucktec.com/", hasVerifiedLogo: true },
  { slug: "zfaftermarket", name: "ZF Aftermarket", website: "https://aftermarket.zf.com/", hasVerifiedLogo: true },
];

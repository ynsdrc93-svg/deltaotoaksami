import type { LucideIcon } from "lucide-react";
import {
  Cog, Eye, Lightbulb, CircleDot, RotateCw, Navigation, Zap, Filter, Disc, Car, Waves, RefreshCw, Thermometer, CircleDashed, Wrench, Droplet, Settings2, PackageCheck, BatteryCharging, Snowflake, MoveVertical, Boxes, Fuel,
} from "lucide-react";

// Excel kaynağı "Kopya Delta Markalar -kategoriler.xlsx" (Sheet: Ürün Grupları,
// 30.159 satırlık ürün-marka verisinden agrege edilmiştir) — Tedarikçiler sayfasının
// kategori bölümünün TEK doğruluk kaynağı. Kategori adları kullanıcı tarafından
// verilen tam listeyle birebir eşleşir; brandSlugs, o kategoride ürün veren
// (Excel'de doğrulanmış) markaların gerçek listesidir — temsili/tahmini değildir.
export interface ProductCategory {
  name: string;
  icon: LucideIcon;
  description: string;
  brandSlugs: string[];
  /** Sunum katmanına özel öncelik sıralaması — YALNIZCA brandSlugs içindeki
   * markaların bir alt kümesi/yeniden sıralaması, yeni bir marka-kategori
   * ilişkisi eklemez. UI'da öne çıkan marka çiplerinin hangi sırayla
   * gösterileceğini belirler (en tanınır/ilgili önce); brandSlugs'taki geri
   * kalan markalar orijinal sırayla arkasından gelmeye devam eder. Belirtilmezse
   * brandSlugs'ın kendi sırası kullanılır. */
  featuredBrandSlugs?: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { name: "Aks-Transmisyon", icon: Cog, description: "Aks mili, diferansiyel ve güç aktarma organlarında OEM ve OEM eşdeğeri kapsam.", brandSlugs: ["blueprint", "corteco", "fag", "febi", "gkn", "ina", "lemforder", "rapro", "skf", "spart", "swag", "ucel"], featuredBrandSlugs: ["skf", "gkn", "fag", "ina", "spart", "febi"] },
  { name: "Araç Görünürlük-Uyarı Grubu", icon: Eye, description: "Sinyal, uyarı ve görünürlük sistemlerinde araç güvenliğini tamamlayan ürün grubu.", brandSlugs: ["bosch", "cargo", "denso", "febi", "hella", "osram", "silbak", "swag", "valeo"], featuredBrandSlugs: ["bosch", "hella", "valeo", "osram", "silbak"] },
  { name: "Aydınlatma", icon: Lightbulb, description: "Far, arka lamba ve iç aydınlatmada orijinal görünüm ve performans.", brandSlugs: ["bosch", "hella", "valeo"], featuredBrandSlugs: ["hella", "bosch", "valeo"] },
  { name: "Conta-Keçe-O-Ring", icon: CircleDot, description: "Motor ve şanzıman sızdırmazlığında hassas ölçü ve malzeme uyumu.", brandSlugs: ["blueprint", "bosch", "cargo", "corteco", "elring", "febi", "henkel", "liquimoly", "skf", "supsan", "swag", "ucel"], featuredBrandSlugs: ["elring", "corteco", "bosch", "febi", "supsan", "skf"] },
  { name: "Debriyaj-Volan", icon: RotateCw, description: "Debriyaj seti, volan ve güç aktarma komponentlerinde eksiksiz kapsam.", brandSlugs: ["blueprint", "borgwarner", "bosch", "corteco", "delphi", "febi", "ina", "luk", "rapro", "sachs", "skf", "trw", "valeo"], featuredBrandSlugs: ["luk", "sachs", "borgwarner", "valeo", "ina"] },
  { name: "Direksiyon", icon: Navigation, description: "Direksiyon kutusu, pompa ve rot sisteminde sürüş güvenliğine yönelik parçalar.", brandSlugs: ["delphi", "hlmando", "hattat", "kale", "lemforder", "rapro"], featuredBrandSlugs: ["lemforder", "delphi", "hattat", "kale"] },
  { name: "Elektrik", icon: Zap, description: "Araç elektroniği ve kablo donanımında geniş marka alternatifi.", brandSlugs: ["behr", "beru", "blueprint", "bosch", "cargo", "champion", "delphi", "denso", "era", "febi", "hlmando", "hella", "ina", "mahle", "ngk", "nrf", "optima", "osram", "spart", "swag", "valeo"], featuredBrandSlugs: ["bosch", "denso", "valeo", "hella", "ngk", "beru", "optima", "spart"] },
  { name: "Filtre", icon: Filter, description: "Yağ, hava, yakıt ve kabin filtrelerinde periyodik bakım kapsamı.", brandSlugs: ["blueprint", "bosch", "corteco", "delphi", "denso", "febi", "filtron", "hlmando", "mahle", "mannfilter", "purflux", "spart", "swag", "valeo"], featuredBrandSlugs: ["mannfilter", "bosch", "mahle", "purflux", "filtron", "spart"] },
  { name: "Fren Sistemi", icon: Disc, description: "Balata, disk ve hidrolik fren komponentlerinde OEM standardı.", brandSlugs: ["blueprint", "bosch", "brembo", "delphi", "febi", "ferodo", "frendi", "hlmando", "skf", "spart", "swag", "trw", "valeo"], featuredBrandSlugs: ["brembo", "trw", "ferodo", "bosch", "frendi", "spart"] },
  { name: "Kaporta-Karoseri", icon: Car, description: "Kaporta ve karoseri parçalarında orijinal ölçü ve uyum garantisi.", brandSlugs: ["bosch", "febi", "spart", "ucel", "valeo"], featuredBrandSlugs: ["valeo", "bosch", "spart", "ucel", "febi"] },
  { name: "Kauçuk-Hortumlar-Borular", icon: Waves, description: "Motor ve yakıt sistemi hortum/boru hatlarında dayanıklı malzeme kalitesi.", brandSlugs: ["behr", "blueprint", "bosch", "corteco", "delphi", "fag", "febi", "gates", "gkn", "ina", "lemforder", "rapro", "skf", "spart", "swag", "trw", "ucel"], featuredBrandSlugs: ["gates", "corteco", "febi", "spart", "gkn"] },
  { name: "Kayış-Gergi-Rulman-Kit", icon: RefreshCw, description: "Triger/V kayışı, gergi ve rulman setlerinde tam kit çözümleri.", brandSlugs: ["blueprint", "bosch", "cargo", "contitech", "corteco", "dayco", "dolz", "fag", "febi", "gates", "hlmando", "ina", "kale", "luk", "skf", "spart", "supsan", "swag", "taifun", "valeo"], featuredBrandSlugs: ["gates", "contitech", "dayco", "skf", "ina", "luk", "spart"] },
  { name: "Klima-Isıtma", icon: Thermometer, description: "Klima kompresörü, radyatör ve kabin konfor sistemlerinde tam kapsam.", brandSlugs: ["behr", "bosch", "delphi", "denso", "febi", "hlmando", "hella", "kale", "nrf", "spart", "swag", "valeo"], featuredBrandSlugs: ["behr", "denso", "valeo", "nrf", "bosch", "spart"] },
  { name: "Lastik-Jant", icon: CircleDashed, description: "Lastik ve jant kategorisinde geniş ebat ve marka seçeneği.", brandSlugs: ["febi", "swag"], featuredBrandSlugs: ["febi", "swag"] },
  { name: "Motor", icon: Wrench, description: "Motor iç aksamı ve yapı parçalarında hassas mühendislik gerektiren kategori.", brandSlugs: ["borgwarner", "contitech", "corteco", "elring", "febi", "gates", "ina", "ioto", "kingpiston", "mahle", "rapro", "supsan", "swag", "taifun", "ucel"], featuredBrandSlugs: ["mahle", "borgwarner", "elring", "ina", "kingpiston", "ioto"] },
  { name: "Motor Yağı", icon: Droplet, description: "Motor yağı ve yağlama ürünlerinde uluslararası performans standartları.", brandSlugs: ["liquimoly", "spart", "swag", "wolflubricants"], featuredBrandSlugs: ["liquimoly", "spart", "wolflubricants", "swag"] },
  { name: "Şanzıman", icon: Settings2, description: "Şanzıman ve güç aktarma organlarında OEM eşdeğeri parça kapsamı.", brandSlugs: ["bosch", "febi", "ina", "luk", "skf", "swag", "vitesco"], featuredBrandSlugs: ["luk", "ina", "skf", "bosch", "vitesco"] },
  { name: "Sarf ve Bakım Ürünleri", icon: PackageCheck, description: "Periyodik bakım ve sarf malzemelerinde tam kapsamlı ürün gamı.", brandSlugs: ["bosch", "denso", "febi", "ferodo", "henkel", "liquimoly", "spart", "swag", "valeo", "wolflubricants"], featuredBrandSlugs: ["liquimoly", "henkel", "bosch", "spart", "valeo"] },
  { name: "Şarj-Marş", icon: BatteryCharging, description: "Marş motoru ve alternatör grubunda güvenilir performans.", brandSlugs: ["bosch", "cargo", "contitech", "denso", "fag", "gates", "hella", "ina", "segautomotive", "skf", "swag", "valeo"], featuredBrandSlugs: ["bosch", "denso", "valeo", "segautomotive", "hella"] },
  { name: "Soğutma", icon: Snowflake, description: "Radyatör ve motor soğutma sisteminde ısı yönetimi çözümleri.", brandSlugs: ["behr", "blueprint", "bosch", "delphi", "denso", "elring", "era", "febi", "gates", "hlmando", "hella", "kale", "mahle", "nrf", "rapro", "sachs", "spart", "swag", "ucel", "valeo"], featuredBrandSlugs: ["behr", "nrf", "mahle", "gates", "valeo", "spart"] },
  { name: "Süspansiyon-Taşıyıcı Sistem", icon: MoveVertical, description: "Amortisör, salıncak ve taşıyıcı sistem parçalarında sürüş konforu.", brandSlugs: ["blueprint", "corteco", "delphi", "fag", "febi", "ina", "lemforder", "monroe", "rapro", "sachs", "skf", "spart", "swag", "teknorot", "trw", "ucel", "valeo"], featuredBrandSlugs: ["monroe", "sachs", "lemforder", "trw", "teknorot", "spart"] },
  { name: "Üniversal Ürünler", icon: Boxes, description: "Araç bağımsız, geniş uygulama alanına sahip evrensel ürün grubu.", brandSlugs: ["bosch", "cargo", "delphi", "elring", "osram", "skf", "spart"], featuredBrandSlugs: ["bosch", "skf", "osram", "spart", "delphi"] },
  { name: "Yakıt ve Enjeksiyon", icon: Fuel, description: "Yakıt pompası ve enjeksiyon sisteminde hassas performans parçaları.", brandSlugs: ["behr", "borgwarner", "bosch", "delphi", "denso", "era", "febi", "hella", "kale", "mahle", "ngk", "spart", "valeo", "vdo"], featuredBrandSlugs: ["bosch", "delphi", "denso", "vdo", "spart"] },
];

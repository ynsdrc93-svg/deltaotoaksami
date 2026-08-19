import { Link } from "wouter";
import type { Brand } from "@/lib/brands";

// Tek reusable marka-logosu bileşeni — Tedarikçiler sayfasının marka duvarı
// ("wall"), kategori gezgininin marka alanı ("gallery") ve ana sayfa
// tedarikçi şeridi ("strip") aynı bileşeni, aynı brand datasını kullanır.
// Gerçek en-boy oranı her zaman korunur (object-fit: contain, sabit
// yükseklik + auto genişlik) — hiçbir logo deforme edilmez. hasVerifiedLogo
// false olan markalar (ör. henüz doğrulanmış logosu olmayan TAIFUN) için
// kırık görsel yerine temiz bir tipografik yer tutucu kullanılır.
// logoBackground: "dark" olan markalar (yalnızca beyaz/açık renkli çizim
// içeren, şeffaf zeminde görünmeyen asset'ler — bkz. brands.ts) koyu bir
// kart zemininde gösterilir; site genelindeki "dark hero" tonuyla (#0e1016)
// tutarlıdır.
type BrandLogoSize = "wall" | "strip" | "gallery";

interface SizeStyle {
  light: string;
  dark: string;
  img: string;
  textSize: string;
  textHover: string;
}

const SIZES: Record<BrandLogoSize, SizeStyle> = {
  wall: {
    // Mobilde (<sm) marka duvarı 4 sütun (bkz. TedarikciPage BrandGroup) —
    // orijinal h-32/px-6/py-6 kart 4 sütunda logoyu sıkıştırıp taşırdı, bu
    // yüzden yalnızca <sm tier'ı daraltıldı; sm ve üzeri (3/4/5/6 sütun)
    // birebir eski değerlerinde kaldı.
    light: "do-card bg-white rounded-2xl flex items-center justify-center h-16 px-2 py-2 sm:h-32 sm:px-6 sm:py-6 lg:h-36 shadow-sm",
    dark: "do-card bg-[#0e1016] border border-white/10 rounded-2xl flex items-center justify-center h-16 px-2 py-2 sm:h-32 sm:px-6 sm:py-6 lg:h-36 shadow-sm",
    img: "max-h-8 sm:max-h-12 lg:max-h-14 w-auto h-auto max-w-full object-contain",
    textSize: "text-[15px]",
    textHover: "",
  },
  /** Tedarikçiler kategori gezgininin Aktif Ürün Doku'sundaki marka alanı
   * için — bu ekranda marka alanı modülün ANA odağıdır (kompakt kategori
   * bilgisi + küçük B2B aksiyonunun yanında dominant bir grid). Her logo
   * AYNI kutu boyutunu (sabit yükseklik, CSS grid'de eşit sütun genişliği)
   * paylaşır — böylece küçük/kare bir logo ile geniş bir wordmark yan yana
   * eşit görsel ağırlıkta durur ("biri kayboluyor biri bağırıyor" hissi
   * olmadan). Marka duvarındaki ("wall") kart diliyle aynı aile (beyaz
   * kart, ince kenarlık) ama daha kompakt — burada tek kategoride 20'ye
   * yakın logo aynı anda görünebiliyor. */
  gallery: {
    light: "border border-slate-200 rounded-lg bg-white flex items-center justify-center h-16 px-3 hover:border-[#1B3A8F]/30 transition-colors",
    dark: "border border-white/10 rounded-lg bg-[#0e1016] flex items-center justify-center h-16 px-3 hover:border-white/25 transition-colors",
    img: "max-h-8 max-w-full w-auto h-auto object-contain",
    textSize: "text-[11px]",
    textHover: "",
  },
  strip: {
    light: "group relative shrink-0 mx-2.5 w-[170px] bg-white rounded-lg h-16 px-4 flex items-center justify-center shadow-sm hover:shadow-lg hover:z-10 transition-shadow duration-300",
    dark: "group relative shrink-0 mx-2.5 w-[170px] bg-[#0e1016] border border-white/10 rounded-lg h-16 px-4 flex items-center justify-center shadow-sm hover:shadow-lg hover:z-10 transition-shadow duration-300",
    img: "max-h-7 max-w-[110px] w-auto h-auto object-contain grayscale group-hover:grayscale-0 group-hover:scale-125 transition-all duration-300",
    textSize: "text-[11px]",
    textHover: "group-hover:scale-110 transition-transform duration-300",
  },
};

export function BrandLogo({
  brand,
  size = "wall",
  hidden,
  onNavigateAttempt,
}: {
  brand: Brand;
  size?: BrandLogoSize;
  /** Şerit gibi kopyalanan/gizli duplikasyonlar için — aria-hidden + tabIndex=-1 uygular. */
  hidden?: boolean;
  /** Verilirse VE cihaz dokunmatikse (hover desteklemiyorsa), brand.website'e
   * doğrudan gitmek yerine varsayılan navigasyon engellenir ve bu callback
   * çağrılır — çağıran taraf "siteden ayrılıyorsunuz" onayı gösterebilir.
   * Masaüstü/fare tıklaması etkilenmez, her zaman doğrudan siteye gider. */
  onNavigateAttempt?: (brand: Brand, url: string) => void;
}) {
  const style = SIZES[size];
  const isDark = brand.logoBackground === "dark";
  const textColor = isDark ? "text-white" : "text-[#1B3A8F]";

  const content = brand.hasVerifiedLogo ? (
    <img
      src={`/images/brands/${brand.slug}.${brand.logoFormat ?? "png"}`}
      alt={brand.name}
      className={style.img}
    />
  ) : (
    <span className={`${textColor} font-black text-center leading-tight tracking-tight px-2 ${style.textSize} ${style.textHover}`}>
      {brand.name}
    </span>
  );

  const cardClass = isDark ? style.dark : style.light;
  const a11yProps = hidden ? { "aria-hidden": true, tabIndex: -1 } : {};

  if (brand.slug === "spart") {
    return (
      <Link href="/spart" title={brand.name} className={cardClass} {...a11yProps}>
        {content}
      </Link>
    );
  }
  if (brand.website) {
    const websiteUrl = brand.website;
    return (
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={brand.name}
        className={cardClass}
        onClick={(e) => {
          // "(hover: hover)" = gerçek fare/trackpad. Dokunmatikte bunu
          // devre dışı bırakıp callback'e devrederiz; masaüstü tıklaması
          // hiçbir zaman kesilmez, her zaman doğrudan yeni sekmede açılır.
          if (onNavigateAttempt && !window.matchMedia("(hover: hover)").matches) {
            e.preventDefault();
            onNavigateAttempt(brand, websiteUrl);
          }
        }}
        {...a11yProps}
      >
        {content}
      </a>
    );
  }
  return (
    <div title={brand.name} className={cardClass}>
      {content}
    </div>
  );
}

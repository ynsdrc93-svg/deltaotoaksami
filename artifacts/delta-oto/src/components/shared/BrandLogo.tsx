import { Link } from "wouter";
import type { Brand } from "@/lib/brands";

// Tek reusable marka-logosu bileşeni — Tedarikçiler sayfasının marka duvarı
// ("wall"), kategori panelindeki marka çipleri ("chip") ve ana sayfa
// tedarikçi şeridi ("strip") aynı bileşeni, aynı brand datasını kullanır.
// Gerçek en-boy oranı her zaman korunur (object-fit: contain, sabit
// yükseklik + auto genişlik) — hiçbir logo deforme edilmez. hasVerifiedLogo
// false olan markalar (ör. henüz doğrulanmış logosu olmayan TAIFUN) için
// kırık görsel yerine temiz bir tipografik yer tutucu kullanılır.
// logoBackground: "dark" olan markalar (yalnızca beyaz/açık renkli çizim
// içeren, şeffaf zeminde görünmeyen asset'ler — bkz. brands.ts) koyu bir
// kart zemininde gösterilir; site genelindeki "dark hero" tonuyla (#0e1016)
// tutarlıdır.
type BrandLogoSize = "wall" | "chip" | "strip" | "compact";

interface SizeStyle {
  light: string;
  dark: string;
  img: string;
  textSize: string;
  textHover: string;
}

const SIZES: Record<BrandLogoSize, SizeStyle> = {
  wall: {
    light: "do-card bg-white rounded-2xl flex items-center justify-center h-32 sm:h-36 px-6 py-6 shadow-sm",
    dark: "do-card bg-[#0e1016] border border-white/10 rounded-2xl flex items-center justify-center h-32 sm:h-36 px-6 py-6 shadow-sm",
    img: "max-h-12 sm:max-h-14 w-auto h-auto max-w-full object-contain",
    textSize: "text-[15px]",
    textHover: "",
  },
  /** Spotlight marka rafları için — sabit KART GENİŞLİĞİ + yüksekliği
   * ("wall" varyantının bir CSS grid'de otomatik eşit-genişlik kazanmasıyla
   * aynı ilkeyi, flex-wrap bir rafta elle tekrarlar). Yalnızca yükseklik
   * sabitlenip genişlik logonun kendi en-boy oranına bırakılırsa geniş
   * wordmark'lar küçük/kare markalardan çok daha büyük görünür — sabit
   * genişlik + max-height VE max-width ile img, optik ağırlığı eşitler.
   * "chip"ten daha kompakt, önceki (yalnızca h-11) sürümden daha ferah. */
  compact: {
    light: "border border-slate-200 rounded-lg w-24 h-14 flex items-center justify-center px-2.5 bg-white hover:border-[#1B3A8F]/30 transition-colors shrink-0",
    dark: "border border-white/10 rounded-lg w-24 h-14 flex items-center justify-center px-2.5 bg-[#0e1016] hover:border-white/25 transition-colors shrink-0",
    img: "max-h-7 max-w-full w-auto h-auto object-contain",
    textSize: "text-[10px]",
    textHover: "",
  },
  chip: {
    light: "border border-slate-200 rounded-xl h-20 flex items-center justify-center px-6 bg-white hover:border-[#1B3A8F]/30 hover:shadow-md transition-all",
    dark: "border border-white/10 rounded-xl h-20 flex items-center justify-center px-6 bg-[#0e1016] hover:border-white/25 hover:shadow-md transition-all",
    img: "max-h-11 w-auto h-auto object-contain",
    textSize: "text-[12px]",
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
}: {
  brand: Brand;
  size?: BrandLogoSize;
  /** Şerit gibi kopyalanan/gizli duplikasyonlar için — aria-hidden + tabIndex=-1 uygular. */
  hidden?: boolean;
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
    return (
      <a href={brand.website} target="_blank" rel="noopener noreferrer" title={brand.name} className={cardClass} {...a11yProps}>
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

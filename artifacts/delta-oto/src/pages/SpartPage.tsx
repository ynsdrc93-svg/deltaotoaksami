import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { routeFor, useLang } from "@/lib/i18n";

const brandUrl = "https://spartauto.replit.app";
const images = "/images/spart";
const families = [
  {
    tr: "Fren ve yürüyen aksam",
    en: "Brakes and chassis",
    groups: [
      ["fren-sistemi", "Fren Sistemi", "Brake System"],
      ["suspansiyon", "Süspansiyon", "Suspension"],
      ["on-takim", "Ön Takım", "Front Axle Components"],
      ["direksiyon", "Direksiyon", "Steering"],
      ["rulman", "Rulman", "Bearings"],
    ],
  },
  {
    tr: "Motor ve bakım",
    en: "Engine and maintenance",
    groups: [
      ["madeni-yag-ve-katkilar", "Madeni Yağ ve Katkılar", "Lubricants and Additives"],
      ["filtre", "Filtre", "Filters"],
      ["contalar-ve-keceler", "Contalar ve Keçeler", "Gaskets and Seals"],
      ["sogutma-sistemi", "Soğutma Sistemi", "Cooling System"],
      ["yakit-sistemi", "Yakıt Sistemi", "Fuel System"],
    ],
  },
  {
    tr: "Güç aktarma",
    en: "Drivetrain",
    groups: [
      ["debriyaj", "Debriyaj", "Clutch"],
      ["aks-ve-aksami", "Aks ve Aksamı", "Axles and Components"],
    ],
  },
  {
    tr: "Elektrik sistemi",
    en: "Electrical system",
    groups: [["elektrik", "Elektrik", "Electrical Components"]],
  },
];

export function SpartPage() {
  const lang = useLang();
  const tr = lang === "tr";
  const intro = tr
    ? "SPART, Delta Oto Aksamı’nın otomotiv yedek parça markasıdır."
    : "SPART is Delta Oto Aksamı’s automotive replacement parts brand.";
  useDocumentMeta("SPART — Original Replacement | Delta Oto", intro);

  return (
    <div className="do-site min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main>
        <section className="bg-[#10192e] text-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <div className="px-6 py-12 sm:px-10 lg:self-center lg:py-16">
              <img src={`${images}/logo.webp`} alt="SPART — Original Replacement" className="mb-8 w-36 sm:w-44" />
              <h1 className="text-5xl font-black leading-none tracking-tight sm:text-6xl">
                {tr ? "Her parçada" : "Every part."}<br /><span className="text-[#ffd016]">SPART.</span>
              </h1>
              <p className="mt-6 max-w-md leading-relaxed text-slate-200">{intro} {tr
                ? "Bakım ve onarım için yedek parça gruplarını keşfedin."
                : "Explore replacement parts for maintenance and repair."}</p>
              <a href="#spart-urunler" className="mt-7 inline-flex items-center gap-2 bg-[#ffd016] px-5 py-3 text-sm font-bold text-[#10192e] hover:bg-[#ffe077]">
                {tr ? "Ürünleri inceleyin" : "Explore products"} <ArrowUpRight size={16} />
              </a>
            </div>
            <img src={`${images}/hero-product.webp`}
              alt={tr ? "SPART disk fren balatası ve yağ filtresi ambalajları" : "SPART brake pad and oil filter packaging"}
              className="aspect-[3/2] w-full object-cover lg:h-full lg:min-h-[400px]" fetchPriority="high" />
          </div>
        </section>
        <section id="spart-urunler" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-14 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight">{tr ? "Ürün grupları" : "Product groups"}</h2>
              <p className="mt-2 text-slate-600">{tr ? "13 ürün grubu, araçtaki sisteme göre 4 ailede." : "13 product groups across four vehicle systems."}</p>
            </div>
            <a href={`${brandUrl}/urunler`} className="inline-flex items-center gap-2 text-sm font-bold underline decoration-[#ffd016] decoration-2 underline-offset-4">
              {tr ? "SPART ürün kataloğu" : "SPART product catalog"} <ArrowUpRight size={16} />
            </a>
          </div>
          {families.map(family => (
            <section key={family.en} className="mt-8 border-t border-slate-200 pt-5">
              <h3 className="mb-4 text-lg font-bold">{family[lang]}</h3>
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                {family.groups.map(([slug, nameTr, nameEn]) => (
                  <li key={slug}>
                    <a href={`${brandUrl}/urunler/${slug}`} className="group block overflow-hidden rounded-lg border border-slate-200 bg-white hover:border-[#b28e00] focus-visible:outline-2">
                      <img src={`${images}/cat-${slug}.webp`} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover" />
                      <div className="flex items-center justify-between gap-2 px-3 py-3 text-sm font-semibold">
                        {tr ? nameTr : nameEn}<ArrowUpRight size={15} className="shrink-0" />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="mt-5 text-sm text-slate-600">{tr ? "Görseller ürün gruplarını temsilen hazırlanmıştır." : "Images are illustrative representations of product groups."}</p>
        </section>
        <section className="bg-[#f4f5f7]">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-12 sm:px-10 md:grid-cols-2">
            <img src={`${images}/filter-tight.webp`} alt={tr ? "SPART hava, kabin, yakıt ve yağ filtresi ambalajları" : "SPART air, cabin, fuel and oil filter packaging"} loading="lazy" className="w-full rounded-lg" />
            <div>
              <h2 className="text-3xl font-black">{tr ? "Ürün ve satış soruları" : "Product and sales inquiries"}</h2>
              <p className="mt-3 max-w-md text-slate-700">{tr
                ? "Doğru parçayı bulmak için araç marka, model, yıl ve motor kodunu, varsa şasi ya da OE numarasını paylaşın."
                : "To find the right part, provide the vehicle make, model, year and engine code, plus the VIN or OE number if available."}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold">
                <Link href={routeFor("contact", lang)} className="underline underline-offset-4">{tr ? "Delta Oto İletişim" : "Contact Delta Oto"}</Link>
                <a href="https://b2b.parcabul.com.tr/login.aspx" className="underline underline-offset-4">Parçabul B2B</a>
                <a href={brandUrl} className="inline-flex items-center gap-1 underline underline-offset-4">SPART <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

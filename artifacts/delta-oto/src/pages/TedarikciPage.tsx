import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, ChevronDown, ArrowRight, CheckCircle2, Check, Globe, Package, Shield, Zap, Handshake, Search, X } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { CLASSIFIED_BRANDS, GLOBAL_BRANDS, YERLI_BRANDS, type Brand } from "@/lib/brands";
import { PRODUCT_CATEGORIES, MACRO_FAMILIES, type ProductCategory } from "@/lib/categories";
import { useEscapeKey, useReveal } from "@/hooks/use-motion";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, type Lang } from "@/lib/i18n";

const ADVANTAGE_ICONS = [Package, Globe, Shield, Zap, Handshake];

const content = {
  tr: {
    meta: {
      title: "İş Ortaklarımız — 100+ Marka, Tek Çatı | Delta Oto",
      description: "Delta Oto'nun global ve yerli iş ortağı markaları: 100'den fazla marka, 23 ürün kategorisi ve OEM standardında kalite güvencesi tek portföyde.",
    },
    hero: {
      eyebrow: "Ürün Portföyü · 100+ Marka",
      title: ["GLOBAL KALİTE,", "TEK ÇATI,", "DERİN STOK"],
      body: "Binek ve hafif ticari araç kategorilerinde dünyanın önde gelen OEM üreticileriyle doğrudan çalışıyoruz. 100'den fazla marka ve 50.000'i aşkın SKU; tek tedarikçi ilişkisiyle eksiksiz karşılanır. GROUPAUTO Türkiye üyeliğiyle global satın alma gücü, yerel hız ve servis kalitesiyle buluşuyor.",
      cta: "B2B Portal",
    },
    brandWall: {
      eyebrow: "Marka Portföyü",
      heading: (n: number) => `${n} Markanın Tek Çatısı`,
      desc: "Global OEM tedarikçilerini ve güçlü yerli üreticileri, tek portföyde bir araya getiriyoruz.",
      searchPlaceholder: "Marka ara...",
      searchLabel: "Marka ara",
      noResults: (q: string) => `"${q}" ile eşleşen marka bulunamadı.`,
      globalLabel: "Global Markalar",
      domesticLabel: "Yerli Markalar",
    },
    categories: {
      eyebrow: "Ürün Kategorileri",
      heading: "Uçtan Uca Kategori Kapsamı",
      countCategories: (n: number) => `${n} kategori`,
      countFamilies: (n: number) => `${n} ürün ailesi`,
      colFamily: "Ürün Ailesi",
      colSubcategory: "Alt Kategori",
      itemsSuffix: (n: number) => `${n} kategori`,
      relatedBrands: "İlgili Markalar",
      brandsSuffix: (n: number) => `${n} marka`,
      viewInB2B: "B2B Portal'da incele",
      prevFamily: "Önceki ürün ailesi",
      nextFamily: "Sonraki ürün ailesi",
      allFamilies: "Tüm Aileler",
      allFamiliesTitle: "Tüm Ürün Aileleri",
      close: "Kapat",
    },
    quality: {
      eyebrow: "Kalite Güvencesi",
      heading: "Tedarikçi Kalite Kriterleri",
      body: "Portföyümüze alınan her marka, titiz bir ön değerlendirme ve süregelen denetim sürecine tabidir. GROUPAUTO'nun global satın alma standartları bu sürecin omurgasını oluşturur. Sahte ve düşük kaliteli ürüne karşı sıfır tolerans politikamız; müşterilerimizin saha güvenilirliğini korumanın temel güvencesidir.",
      items: [
        "OEM veya OEM eşdeğeri sertifikasyon zorunluluğu",
        "Kayıt dışı ve taklit ürün sıfır toleranstır",
        "Üretici belgelendirmesi ve lot takip zorunluluğu",
        "Periyodik ürün denetimleri ve saha geri bildirim sistemi",
        "GROUPAUTO'nun global satın alma standartları",
        "Stok tutarlılığı ve teslimat performansı SLA takibi",
      ],
      stats: [
        { n: "100+", l: "Aktif Marka", d: "Sürekli büyüyen portföy" },
        { n: "50.000+", l: "Aktif SKU", d: "Geniş stok derinliği" },
        { n: "OEM", l: "Standart", d: "OEM veya eşdeğeri zorunlu" },
        { n: "Groupauto", l: "Üyeliği", d: "Global satın alma ağı" },
      ],
    },
    advantages: {
      eyebrow: "Tedarik Üstünlüğü",
      heading: "Neden Delta Oto?",
      body: "Tek tedarikçi kolaylığı, global satın alma gücü ve OEM kalite güvencesi — hepsi tek çatı altında.",
      items: [
        { title: "Kapsamlı Ürün Gamı", desc: "100'den fazla markanın 50.000'i aşkın SKU'sundan oluşan portföy; tek tedarikçi ilişkisiyle uçtan uca karşılanır. Çoklu tedarikçi koordinasyonu yükü kalkar." },
        { title: "GROUPAUTO Tedarik Ayrıcalığı", desc: "GROUPAUTO Türkiye üyeliği; 118 ülkedeki 71 referans tedarikçi gücünü satın alma kaldıracımıza dönüştürür. Global fiyat avantajı doğrudan portföyümüze yansır." },
        { title: "OEM Standart Kalite Güvencesi", desc: "Yalnızca orijinal ve OEM eşdeğeri ürün kategorilerinde faaliyet gösteriyoruz. Sahte ve düşük kaliteli ürün portföyde kesinlikle yer almaz." },
        { title: "Dinamik Katalog Yönetimi", desc: "Yeni araç modelleri ve marka genişlemeleri portföye sürekli eklenir. Güncel stok bilgisine B2B portalı üzerinden anlık erişilir, bekleme olmadan sipariş verilir." },
        { title: "Opar Ege Bölge Bayiliği", desc: "Opar'ın Ege bölgesi operasyonunu devralarak İzmir ve çevresinde bölgesel stok derinliğimizi ve teslimat hızımızı doğrudan güçlendirdik." },
      ],
    },
    cta: {
      heading: "Stok Sorgulama ve Sipariş için B2B Portal",
      body: "Anlık stok durumu, fiyat listesi ve sipariş yönetimi; B2B portalımız üzerinden 7/24 erişilebilir.",
      button: "Portala Giriş Yapın",
    },
  },
  en: {
    meta: {
      title: "Our Partners — 100+ Brands, One Roof | Delta Oto",
      description: "Delta Oto's global and domestic partner brands: more than 100 brands, 23 product categories and OEM-standard quality assurance in a single portfolio.",
    },
    hero: {
      eyebrow: "Product Portfolio · 100+ Brands",
      title: ["GLOBAL QUALITY,", "ONE ROOF,", "DEEP STOCK"],
      body: "We work directly with the world's leading OEM manufacturers across passenger and light commercial vehicle categories. More than 100 brands and over 50,000 SKUs are covered end-to-end through a single supplier relationship. Our GROUPAUTO Türkiye membership brings global purchasing power together with local speed and service quality.",
      cta: "B2B Portal",
    },
    brandWall: {
      eyebrow: "Brand Portfolio",
      heading: (n: number) => `${n} Brands Under One Roof`,
      desc: "We bring together leading global OEM suppliers and strong domestic manufacturers in a single portfolio.",
      searchPlaceholder: "Search brands...",
      searchLabel: "Search brands",
      noResults: (q: string) => `No brands match "${q}".`,
      globalLabel: "Global Brands",
      domesticLabel: "Domestic Brands",
    },
    categories: {
      eyebrow: "Product Categories",
      heading: "End-to-End Category Coverage",
      countCategories: (n: number) => `${n} categories`,
      countFamilies: (n: number) => `${n} product families`,
      colFamily: "Product Family",
      colSubcategory: "Subcategory",
      itemsSuffix: (n: number) => `${n} categories`,
      relatedBrands: "Related Brands",
      brandsSuffix: (n: number) => `${n} brands`,
      viewInB2B: "View in B2B Portal",
      prevFamily: "Previous product family",
      nextFamily: "Next product family",
      allFamilies: "All Families",
      allFamiliesTitle: "All Product Families",
      close: "Close",
    },
    quality: {
      eyebrow: "Quality Assurance",
      heading: "Supplier Quality Criteria",
      body: "Every brand admitted to our portfolio undergoes rigorous pre-qualification and ongoing audit. GROUPAUTO's global purchasing standards form the backbone of this process. Our zero-tolerance policy on counterfeit and substandard products is the core guarantee behind our customers' field reliability.",
      items: [
        "Mandatory OEM or OEM-equivalent certification",
        "Zero tolerance for unregistered and counterfeit products",
        "Mandatory manufacturer certification and lot traceability",
        "Periodic product audits and field feedback system",
        "GROUPAUTO's global purchasing standards",
        "Stock consistency and delivery performance SLA tracking",
      ],
      stats: [
        { n: "100+", l: "Active Brands", d: "A continuously growing portfolio" },
        { n: "50,000+", l: "Active SKUs", d: "Deep stock coverage" },
        { n: "OEM", l: "Standard", d: "OEM or equivalent required" },
        { n: "GROUPAUTO", l: "Membership", d: "Global purchasing network" },
      ],
    },
    advantages: {
      eyebrow: "Supply Advantage",
      heading: "Why Delta Oto?",
      body: "Single-supplier convenience, global purchasing power and OEM quality assurance — all under one roof.",
      items: [
        { title: "Comprehensive Product Range", desc: "A portfolio of more than 100 brands and over 50,000 SKUs, covered end-to-end through a single supplier relationship — removing the burden of coordinating multiple suppliers." },
        { title: "GROUPAUTO Purchasing Advantage", desc: "Our GROUPAUTO Türkiye membership turns the strength of 71 referenced suppliers across 118 countries into purchasing leverage, translating directly into portfolio-wide price advantages." },
        { title: "OEM-Standard Quality Assurance", desc: "We operate exclusively in original and OEM-equivalent product categories. Counterfeit and substandard products have no place in our portfolio." },
        { title: "Dynamic Catalog Management", desc: "New vehicle models and brand expansions are added to the portfolio continuously. Current stock information is available instantly through the B2B portal, so orders can be placed without delay." },
        { title: "Aegean Regional Dealership with Opar", desc: "By taking over Opar's Aegean region operation, we directly strengthened our regional stock depth and delivery speed in and around İzmir." },
      ],
    },
    cta: {
      heading: "B2B Portal for Stock Inquiries and Orders",
      body: "Real-time stock availability, price lists and order management are accessible around the clock through our B2B portal.",
      button: "Go to Portal",
    },
  },
} satisfies Record<Lang, any>;

function BrandGroup({ label, brands }: { label: string; brands: Brand[] }) {
  const reveal = useReveal();
  if (brands.length === 0) return null;
  return (
    <div ref={reveal} className="do-reveal">
      <div className="flex items-center gap-4 mb-7">
        <h3 className="text-xl font-black text-white tracking-tight">{label}</h3>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      {/* Content/UX Pass 01 (§14, sonra Revizyon Turu): masaüstünde satır
          başına logo yoğunluğu kademeli artırılmıştı (lg 5→xl 6→2xl 7);
          bu turda gerçek "masaüstü" eşiği olan xl (1280px, header/nav'ın
          da kullandığı proje-geneli desktop kırılımı) ve üzerinde düz 8
          sütuna çıkarıldı. lg (1024-1279px, tablet-ish ara bölge) 6'da
          kaldı — 8 sütun orada kart boyutunu aşırı sıkıştırırdı. Mobil
          (4) ve sm (3) yoğunluğu DEĞİŞMEDİ. */}
      <div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 gap-2.5 sm:gap-4">
        {brands.map((b) => (
          <BrandLogo key={b.slug} brand={b} size="wall" />
        ))}
      </div>
    </div>
  );
}

function CategoryBrandRefs({ category, brands }: { category: ProductCategory; brands: Brand[] }) {
  // Marka alanı bu modülün ana odağıdır: TÜM markalar alfabetik sırada
  // (tr locale, her iki dilde de tutarlı sıralama için sabit) tek seferde
  // açık gelir — expand/collapse YOK.
  const resolved = category.brandSlugs
    .map((slug) => brands.find((b) => b.slug === slug))
    .filter((b): b is Brand => Boolean(b))
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5">
      {resolved.map((b, i) => (
        <div key={b.slug} className="do-chip-in" style={{ animationDelay: `${Math.min(i, 14) * 20}ms` }}>
          <BrandLogo brand={b} size="gallery" />
        </div>
      ))}
    </div>
  );
}

// Kategori Gezgini (Category Explorer) — v4: GERÇEK 3 SÜTUNLU SOLDAN SAĞA AKIŞ
// (Content/UX Pass 01, §15-18). v3 (aile endeksi solda + sağda kategori
// matrisi/aktif doku ALT ALTA yığılmış) işlevsel olarak doğruydu ama tek bir
// "FAMILY → SUBCATEGORY → BRANDS" karar akışı hissi vermiyordu — kategori
// seçimi ile marka sonucu aynı dikey sütunda üst üste duruyordu. v4'te üç
// aşama artık GERÇEKTEN yan yana, tek bir çerçevenin (rounded-2xl border)
// içinde üç ayrı sütun: 1) Ürün Ailesi (~23%) 2) Alt Kategori (~27%)
// 3) Markalar (~50%, görsel olarak baskın kalmaya devam ediyor).
//
// Etkileşim mimarisi DEĞİŞMEDİ: hover'a bağlı bir seçim state'i YOK, seçim
// SADECE tıklamayla değişir (CLICK = commit). Tek doğruluk kaynağı
// `activeIdx` — `activeFamilyIdx` bundan TÜRETİLİR (find), ayrı bir state
// olarak tutulmaz. Varsayılan durum: family 01 / o ailenin ilk kategorisi
// (activeIdx=0) — kategori matrisi ilk render'da zaten dolu gelir. Bir
// aileye tıklamak o ailenin ilk kategorisini `setActiveIdx` ile commit eder;
// bu da bir TIKLAMA sonucudur, hover değil. Hover yalnızca ince bir önizleme
// ipucu (metin/zemin rengi, ince kenarlık) verir — ölçek/sıçrama/parıltı yok.
function CategoryExplorer({ categories, brands, lang, t }: { categories: ProductCategory[]; brands: Brand[]; lang: Lang; t: (typeof content)["tr"]["categories"] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  // Mobilde aile seçimi yalnızca alttaki kategori listesini FİLTRELER —
  // hangi kategorinin "seçili/kilitli" olduğuyla (activeIdx) ilgisi yoktur.
  const [mobileFamilyIdx, setMobileFamilyIdx] = useState(0);
  // <lg'de kategoriye dokunmak masaüstündeki gibi inline stage'i değiştirmenin
  // yanı sıra alttan açılan bir bottom-sheet gösterir — akıştan kopma
  // hissi yaratmaması için (masaüstünde stage zaten görünür durumda).
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  // "Tüm Aileler" sayfası — mobilde yatay çip şeridinin yerini alan ayrı bir
  // sheet; kategori detay sheet'inden bağımsız (ikisi asla aynı anda açık
  // olamaz, ayrı tetikleyicilerden açılırlar).
  const [mobileFamilySheetOpen, setMobileFamilySheetOpen] = useState(false);
  useEscapeKey(() => setMobileSheetOpen(false), mobileSheetOpen);
  useEscapeKey(() => setMobileFamilySheetOpen(false), mobileFamilySheetOpen);
  useEffect(() => {
    document.body.style.overflow = mobileSheetOpen || mobileFamilySheetOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileSheetOpen, mobileFamilySheetOpen]);

  const cn = (c: ProductCategory) => (lang === "en" ? c.nameEn : c.name);
  const cd = (c: ProductCategory) => (lang === "en" ? c.descriptionEn : c.description);

  // GÖRÜNTÜLENEN sıra: 01-08 aile hiyerarşisiyle TUTARLI, tek bir "display
  // order". categories.ts'teki PRODUCT_CATEGORIES'in kendi (Excel) satır
  // sırasına DOKUNULMADI — yalnızca bu bileşen, MACRO_FAMILIES sırasına göre
  // düzleştirilmiş bir sunum listesi (orderedCategories) türetiyor.
  const categoryByName = new Map(categories.map((c) => [c.name, c]));
  const orderedCategories = MACRO_FAMILIES.flatMap((f) =>
    f.categoryNames
      .map((name) => categoryByName.get(name))
      .filter((c): c is ProductCategory => c !== undefined),
  );
  const orderedIndexByName = new Map(orderedCategories.map((c, i) => [c.name, i]));
  const active = orderedCategories[activeIdx];

  const families = MACRO_FAMILIES.map((f) => ({
    label: f.label[lang],
    items: f.categoryNames
      .map((name) => orderedIndexByName.get(name))
      .filter((idx): idx is number => idx !== undefined)
      .map((idx) => ({ cat: orderedCategories[idx], idx })),
  }));
  const activeFamilyIdx = families.findIndex((f) => f.items.some((it) => it.idx === activeIdx));
  const activeFamily = families[activeFamilyIdx] ?? null;
  const mobileFamily = families[mobileFamilyIdx];

  // Bir aileye tıklamak o ailenin İLK kategorisini commit eder — bu da bir
  // tıklamanın doğrudan sonucudur (hover değil), sağ sütunun her zaman
  // geçerli bir kategori göstermesini sağlar.
  function selectFamily(fi: number) {
    const first = families[fi]?.items[0];
    if (first) setActiveIdx(first.idx);
  }
  function selectCategory(idx: number) {
    setActiveIdx(idx);
    setMobileSheetOpen(true);
  }
  function prevMobileFamily() {
    setMobileFamilyIdx((i) => (i - 1 + families.length) % families.length);
  }
  function nextMobileFamily() {
    setMobileFamilyIdx((i) => (i + 1) % families.length);
  }

  const reveal = useReveal();

  return (
    <div ref={reveal} className="do-reveal">
      {/* MASAÜSTÜ — üç sütun TEK bir çerçeve içinde, soldan sağa:
          1) Ürün Ailesi (~23%, 8 aile her zaman görünür) 2) Alt Kategori
          (~27%, seçili ailenin kategorileri, dikey liste) 3) Markalar
          (~50%, seçili kategorinin marka galerisi — görsel olarak baskın).
          Satırlar yalnızca düz CSS :hover ile kendi rengini değiştirir;
          seçim SADECE tıklamayla commit edilir. */}
      <div className="hidden lg:grid grid-cols-[23%_27%_50%] divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden items-stretch">

        {/* SÜTUN 1 — Ürün Ailesi. Kart YOK, dashboard sidebar'ı değil, teknik
            bir katalog içindekiler sayfası hissi (büyük indeks numarası +
            ince ayraç + aile adı). Satırlar arasında bilerek `-mt-px` (1px)
            örtüşme var — bu görsel boşluk yaratmaz, tam tersi bir "hover
            flicker" hatasını önler: sınır artık kayan-noktalı bir
            karşılaştırmayla değil, sabit DOM boyama sırasıyla çözülür. */}
        <div className="do-index-list flex flex-col">
          <div className="px-4 pt-4 pb-2 shrink-0">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-slate-400">{t.colFamily}</span>
          </div>
          <div className="border-t border-slate-200 flex-1">
            {families.map((family, fi) => {
              const isActive = fi === activeFamilyIdx;
              return (
                <button
                  key={family.label}
                  type="button"
                  onClick={() => selectFamily(fi)}
                  aria-current={isActive}
                  className={`do-index-row group relative w-full flex items-start gap-3 py-3.5 px-4 text-left border-l-2 transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
                    fi > 0 ? "border-t border-slate-200 -mt-px" : ""
                  } ${
                    isActive
                      ? "do-index-row-active bg-[#1B3A8F] border-l-[#1B3A8F] focus-visible:outline-white"
                      : "border-l-transparent hover:border-l-[#1B3A8F]/40 hover:bg-[#1B3A8F]/[0.04] focus-visible:outline-[#1B3A8F]"
                  }`}
                >
                  <span className={`text-lg font-black tabular-nums w-6 shrink-0 pt-px transition-colors duration-150 ${
                    isActive ? "text-white" : "text-slate-300 group-hover:text-[#1B3A8F]"
                  }`}>
                    {String(fi + 1).padStart(2, "0")}
                  </span>
                  <span className={`flex-1 leading-snug transition-colors duration-150 ${
                    isActive ? "text-[13px] pt-[3px] text-white font-bold" : "text-[12.5px] pt-1 text-slate-600 font-semibold group-hover:text-[#1B3A8F]"
                  }`}>
                    {family.label}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 mt-1 transition-opacity duration-150 pointer-events-none ${
                      isActive ? "text-white opacity-100" : "text-[#1B3A8F]/70 opacity-0 group-hover:opacity-100"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* SÜTUN 2 — Alt Kategori. Seçili ailenin kategorileri, tek dikey
            liste (v3'teki 2 sütunlu matris DEĞİL — artık kendi dar ve
            adanmış sütunu var). Bir kategoriye tıklamak Sütun 3'ü hemen
            günceller. */}
        <div key={activeFamily?.label} className="do-fade-up flex flex-col min-w-0">
          <div className="px-4 pt-4 pb-2 shrink-0">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#1B3A8F] block truncate">{activeFamily?.label}</span>
            <span className="text-[10.5px] font-semibold text-slate-400">{t.itemsSuffix(activeFamily?.items.length ?? 0)}</span>
          </div>
          <div className="do-index-list border-t border-slate-200 flex-1">
            {activeFamily?.items.map(({ cat, idx }, i) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  aria-current={isActive}
                  className={`do-index-row group w-full flex items-center gap-2.5 py-3 px-4 text-left border-l-2 transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1B3A8F] ${
                    i > 0 ? "border-t border-slate-200 -mt-px" : ""
                  } ${
                    isActive ? "do-index-row-active border-l-[#1B3A8F] bg-[#1B3A8F]/[0.08]" : "border-l-transparent hover:bg-[#1B3A8F]/[0.05]"
                  }`}
                >
                  <cat.icon
                    className={`w-4 h-4 shrink-0 transition-colors duration-150 ${
                      isActive ? "text-[#1B3A8F]" : "text-slate-400 group-hover:text-[#1B3A8F]"
                    }`}
                    strokeWidth={1.75}
                  />
                  <span
                    className={`flex-1 min-w-0 text-[13px] leading-tight transition-colors duration-150 ${
                      isActive ? "text-[#1B3A8F] font-bold" : "text-slate-700 font-medium group-hover:text-[#1B3A8F]"
                    }`}
                  >
                    {cn(cat)}
                  </span>
                  {isActive ? (
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 text-[#1B3A8F]" aria-hidden="true" />
                  ) : (
                    <ChevronRight
                      className="w-3.5 h-3.5 shrink-0 text-[#1B3A8F]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SÜTUN 3 — Markalar. Modülün ANA odağı: kompakt kategori bilgisi
            üstte, altında TÜM markalar alfabetik ve tek seferde açık (bkz.
            CategoryBrandRefs). Diğer iki sütuna göre en geniş (~%50) ve en
            fazla nefes payına sahip sütun — görsel ağırlık burada. */}
        <div key={active.name} className="do-fade-up p-6 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#1B3A8F] flex items-center justify-center mb-3">
                <active.icon className="w-4 h-4 text-white" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1B3A8F] block mb-1">
                {String(activeIdx + 1).padStart(2, "0")}/{String(orderedCategories.length).padStart(2, "0")}
              </span>
              <h3 className="text-base font-black text-slate-900 tracking-tight leading-tight mb-1.5">{cn(active)}</h3>
              <p className="text-slate-500 text-[12.5px] leading-relaxed max-w-md">{cd(active)}</p>
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4 pt-4 border-t border-slate-100">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">{t.relatedBrands}</span>
              <span className="text-[11px] font-bold text-slate-400">{t.brandsSuffix(active.brandSlugs.length)}</span>
            </div>
            <a
              href="https://b2b.parcabul.com.tr/login.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#1B3A8F] hover:text-[#2547B5] transition-colors shrink-0 group"
            >
              {t.viewInB2B}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
          <CategoryBrandRefs category={active} brands={brands} />
        </div>
      </div>

      {/* MOBİL — kendi modeli: kompakt "01/08" sayaç + önceki/sonraki +
          "Tüm Aileler" + filtrelenmiş kategori listesi (tıklama = seç + sheet
          aç) + marka grid'i sheet içinde. Masaüstü 3-sütununun sıkıştırılmış
          hali DEĞİL — adım adım akış (1. aile, 2. alt kategori, 3. markalar)
          korunuyor, yatay taşma yok, dokunma alanları geniş. */}
      <div className="lg:hidden">
        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            onClick={prevMobileFamily}
            aria-label={t.prevFamily}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center shrink-0 active:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
          <div className="flex-1 min-w-0 text-center">
            <div className="text-[10px] font-bold text-[#1B3A8F] tabular-nums tracking-[0.1em]">
              {String(mobileFamilyIdx + 1).padStart(2, "0")} / {String(families.length).padStart(2, "0")}
            </div>
            <div className="text-[14.5px] font-black text-slate-900 leading-snug truncate px-1">{mobileFamily.label}</div>
          </div>
          <button
            type="button"
            onClick={nextMobileFamily}
            aria-label={t.nextFamily}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center shrink-0 active:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setMobileFamilySheetOpen(true)}
          className="w-full flex items-center justify-center gap-1.5 text-[12px] font-bold text-[#1B3A8F] py-2.5 mb-4 border-y border-slate-200 active:bg-slate-50 transition-colors"
        >
          {t.allFamilies}
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
          {t.itemsSuffix(mobileFamily.items.length)}
        </div>
        {/* Masaüstü endeksiyle aynı editoryal dil: kutulu kart yerine ince
            ayraçlı liste — geniş dokunma alanı korunur. */}
        <div className="divide-y divide-slate-200 border-t border-slate-200">
          {mobileFamily.items.map(({ cat, idx }) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => selectCategory(idx)}
              className="w-full flex items-center gap-3 py-3.5 text-left active:bg-slate-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1B3A8F]/[0.08] flex items-center justify-center shrink-0">
                <cat.icon className="w-4 h-4 text-[#1B3A8F]" strokeWidth={1.75} />
              </div>
              <span className="flex-1 min-w-0 text-[13.5px] font-semibold text-slate-800">{cn(cat)}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      {/* MOBİL "TÜM AİLELER" SHEET */}
      <div
        className={`lg:hidden fixed inset-0 z-[70] transition-opacity duration-300 ${
          mobileFamilySheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileFamilySheetOpen}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFamilySheetOpen(false)} />
        <div
          className={`absolute inset-x-0 bottom-0 max-h-[80vh] bg-white rounded-t-2xl shadow-2xl flex flex-col transition-transform duration-300 ${
            mobileFamilySheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={t.allFamiliesTitle}
        >
          <div className="flex justify-center pt-3 pb-1 shrink-0" aria-hidden="true">
            <div className="w-10 h-1 rounded-full bg-slate-200" />
          </div>
          <div className="flex items-center justify-between gap-3 px-5 pb-3 border-b border-slate-100 shrink-0">
            <h3 className="text-[15px] font-black text-slate-900 tracking-tight">{t.allFamiliesTitle}</h3>
            <button
              type="button"
              onClick={() => setMobileFamilySheetOpen(false)}
              aria-label={t.close}
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto p-5 divide-y divide-slate-100">
            {families.map((family, fi) => {
              const isActive = fi === mobileFamilyIdx;
              return (
                <button
                  key={family.label}
                  type="button"
                  onClick={() => { setMobileFamilyIdx(fi); setMobileFamilySheetOpen(false); }}
                  aria-current={isActive}
                  className="w-full flex items-center gap-3.5 py-3.5 text-left active:bg-slate-50 transition-colors"
                >
                  <span className={`text-lg font-black tabular-nums w-7 shrink-0 ${isActive ? "text-[#1B3A8F]" : "text-slate-300"}`}>
                    {String(fi + 1).padStart(2, "0")}
                  </span>
                  <span className={`flex-1 min-w-0 text-[14px] leading-snug ${isActive ? "text-[#1B3A8F] font-bold" : "text-slate-700 font-semibold"}`}>
                    {family.label}
                  </span>
                  {isActive && <Check className="w-4 h-4 text-[#1B3A8F] shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBİL BOTTOM-SHEET — kategoriye dokununca alttan açılır */}
      <div
        className={`lg:hidden fixed inset-0 z-[70] transition-opacity duration-300 ${
          mobileSheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileSheetOpen}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileSheetOpen(false)} />
        <div
          className={`absolute inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl shadow-2xl flex flex-col transition-transform duration-300 ${
            mobileSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={cn(active)}
        >
          <div className="flex justify-center pt-3 pb-1 shrink-0" aria-hidden="true">
            <div className="w-10 h-1 rounded-full bg-slate-200" />
          </div>
          <div className="flex items-center justify-between gap-3 px-5 pb-3 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#1B3A8F] flex items-center justify-center shrink-0">
                <active.icon className="w-5 h-5 text-white" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1B3A8F] block truncate">
                  {String(activeIdx + 1).padStart(2, "0")} / {String(orderedCategories.length).padStart(2, "0")} · {activeFamily?.label}
                </span>
                <h3 className="text-[15px] font-black text-slate-900 tracking-tight leading-snug truncate">{cn(active)}</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileSheetOpen(false)}
              aria-label={t.close}
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto p-5">
            <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{cd(active)}</p>
            <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{t.relatedBrands}</span>
                <span className="text-[10px] font-bold text-slate-400">{t.brandsSuffix(active.brandSlugs.length)}</span>
              </div>
              <a
                href="https://b2b.parcabul.com.tr/login.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#1B3A8F] hover:text-[#2547B5] transition-colors shrink-0 group"
              >
                {t.viewInB2B}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
            <CategoryBrandRefs category={active} brands={brands} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TedarikciPage() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);
  const [brandSearch, setBrandSearch] = useState("");
  const query = brandSearch.trim().toLowerCase();
  const filteredGlobal = GLOBAL_BRANDS.filter((b) => b.name.toLowerCase().includes(query));
  const filteredYerli = YERLI_BRANDS.filter((b) => b.name.toLowerCase().includes(query));
  const noBrandResults = filteredGlobal.length === 0 && filteredYerli.length === 0;
  const reveal = useReveal();

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO — mobilde min-h + py kısaltıldı (kategori bölümüne erişim
          gecikmesin diye); lg+'da (masaüstü) birebir korunuyor. */}
      <section className="relative min-h-[400px] lg:min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-25"
            style={{ objectPosition: "center 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-10 lg:py-28">
          <div ref={reveal} className="do-reveal flex items-center gap-3 mb-5 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">{t.hero.eyebrow}</span>
          </div>
          <h1 ref={reveal} className="do-reveal do-d1 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-6">
            <span className="do-hero-line">{t.hero.title[0]}</span><br />
            <span className="text-white">{t.hero.title[1]}</span><br />
            <span className="text-[#7d9bea]">{t.hero.title[2]}</span>
          </h1>
          <p ref={reveal} className="do-reveal do-d2 text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-6 lg:mb-10 font-light">
            {t.hero.body}
          </p>
          <a
            ref={reveal}
            href="https://b2b.parcabul.com.tr/login.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="do-reveal do-d3 inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            {t.hero.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* MARKA DUVARI — Global Markalar / Yerli Markalar, Excel kaynağına göre
          net iki gruba ayrılmış, aranabilir/filtrelenebilir tam marka dizini. */}
      <section className="relative bg-[#1B3A8F] py-10 md:py-24 border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div ref={reveal} className="do-reveal mb-8 lg:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">{t.brandWall.eyebrow}</span>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-2">{t.brandWall.heading(CLASSIFIED_BRANDS.length)}</h2>
              <p className="text-white/45 text-[14px] max-w-xl mt-3 leading-relaxed">{t.brandWall.desc}</p>
            </div>
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder={t.brandWall.searchPlaceholder}
                aria-label={t.brandWall.searchLabel}
                className="w-full bg-white/[0.08] border border-white/15 rounded-lg pl-11 pr-4 py-3 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#7d9bea]/60 focus:bg-white/[0.12] transition-colors"
              />
            </div>
          </div>

          {noBrandResults ? (
            <p className="text-white/50 text-[14px] py-16 text-center">{t.brandWall.noResults(brandSearch)}</p>
          ) : (
            <div className="space-y-8 lg:space-y-16">
              <BrandGroup label={t.brandWall.globalLabel} brands={filteredGlobal} />
              <BrandGroup label={t.brandWall.domesticLabel} brands={filteredYerli} />
            </div>
          )}
        </div>
      </section>

      {/* KATEGORİLER — light, Excel Ürün Grupları'na göre 23 kategori. */}
      <section className="bg-[#f8fafc] py-10 lg:py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-6 lg:mb-7">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.categories.eyebrow}</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1 tracking-tight">{t.categories.heading}</h2>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-[13px] font-bold text-slate-500">{t.categories.countCategories(PRODUCT_CATEGORIES.length)}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
              <span className="text-[13px] font-bold text-slate-500">{t.categories.countFamilies(MACRO_FAMILIES.length)}</span>
            </div>
          </div>
          <CategoryExplorer categories={PRODUCT_CATEGORIES} brands={CLASSIFIED_BRANDS} lang={lang} t={t.categories} />
        </div>
      </section>

      {/* TEDARİKÇİ KALİTE KRİTERLERİ — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div ref={reveal} className="do-reveal-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">{t.quality.eyebrow}</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">{t.quality.heading}</h2>
              <p className="text-white/65 leading-[1.85] text-[15.5px] mb-8">
                {t.quality.body}
              </p>
              <div className="space-y-3">
                {t.quality.items.map((q) => (
                  <div key={q} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#7d9bea] shrink-0 mt-0.5" />
                    <span className="text-white/80 text-[14px] leading-snug">{q}</span>
                  </div>
                ))}
              </div>
            </div>
            <div ref={reveal} className="do-reveal-right grid grid-cols-2 gap-4">
              {t.quality.stats.map(({ n, l, d }) => (
                <div key={l} className="bg-white/[0.08] border border-white/[0.12] rounded-xl p-6 hover:bg-white/[0.14] transition-colors">
                  <div className="text-2xl font-black text-white mb-1">{n}</div>
                  <div className="text-[12px] font-bold text-[#7d9bea] uppercase tracking-wide">{l}</div>
                  <div className="text-[12px] text-white/50 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAJLAR — white */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.advantages.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.advantages.heading}</h2>
            <p className="text-slate-500 mt-3 text-[15px] max-w-2xl">{t.advantages.body}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {t.advantages.items.map(({ title, desc }, i) => {
              const Icon = ADVANTAGE_ICONS[i];
              return (
                <div key={title} ref={reveal} className={`do-reveal ${i % 2 === 1 ? "do-d1" : ""} do-card flex gap-6 border border-slate-200 rounded-xl p-8 group`}>
                  <div className="shrink-0 w-12 h-12 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center group-hover:bg-[#1B3A8F] transition-colors">
                    <Icon className="w-5 h-5 text-[#1B3A8F] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-snug">{title}</h3>
                    <p className="text-slate-500 text-[14px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — navy */}
      <section className="relative bg-[#1B3A8F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-20" />
        <div ref={reveal} className="do-reveal max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{t.cta.heading}</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-[16px] font-light">{t.cta.body}</p>
          <a
            href="https://b2b.parcabul.com.tr/login.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#1B3A8F] hover:bg-gray-100 active:scale-[0.98] font-bold px-10 py-4 rounded-md transition-all inline-flex items-center gap-2 shadow-lg group"
          >
            {t.cta.button} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

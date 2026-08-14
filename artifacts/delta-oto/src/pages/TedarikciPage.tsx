import React, { useId, useState } from "react";
import { ChevronRight, ChevronUp, ArrowRight, CheckCircle2, Globe, Package, Shield, Zap, Handshake, Search } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { CLASSIFIED_BRANDS, GLOBAL_BRANDS, YERLI_BRANDS, type Brand } from "@/lib/brands";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/categories";

const QUALITY = [
  "OEM veya OEM eşdeğeri sertifikasyon zorunluluğu",
  "Kayıt dışı ve taklit ürün sıfır toleranstır",
  "Üretici belgelendirmesi ve lot takip zorunluluğu",
  "Periyodik ürün denetimleri ve saha geri bildirim sistemi",
  "Groupauto International global satın alma standartları",
  "Stok tutarlılığı ve teslimat performansı SLA takibi",
];

const ADVANTAGES = [
  { Icon: Package, title: "Kapsamlı Ürün Gamı", desc: "250'den fazla markanın 50.000'i aşkın SKU'sundan oluşan portföy; tek tedarikçi ilişkisiyle uçtan uca karşılanır. Çoklu tedarikçi koordinasyonu yükü kalkar." },
  { Icon: Globe,   title: "Groupauto Tedarik Ayrıcalığı", desc: "Groupauto International üyeliği; 40+ ülkedeki 3.000+ üye firma gücünü satın alma kaldıracımıza dönüştürür. Global fiyat avantajı doğrudan portföyümüze yansır." },
  { Icon: Shield,  title: "OEM Standart Kalite Güvencesi", desc: "Yalnızca orijinal ve OEM eşdeğeri ürün kategorilerinde faaliyet gösteriyoruz. Sahte ve düşük kaliteli ürün portföyde kesinlikle yer almaz." },
  { Icon: Zap,     title: "Dinamik Katalog Yönetimi", desc: "Yeni araç modelleri ve marka genişlemeleri portföye sürekli eklenir. Güncel stok bilgisine B2B portalı üzerinden anlık erişilir, bekleme olmadan sipariş verilir." },
  { Icon: Handshake, title: "Opar Ege Bölge Bayiliği", desc: "Opar'ın Ege bölgesi operasyonunu devralarak İzmir ve çevresinde bölgesel stok derinliğimizi ve teslimat hızımızı doğrudan güçlendirdik." },
];

function BrandGroup({ label, brands }: { label: string; brands: Brand[] }) {
  if (brands.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-4 mb-7">
        <h3 className="text-xl font-black text-white tracking-tight">{label}</h3>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {brands.map((b) => (
          <BrandLogo key={b.slug} brand={b} size="wall" />
        ))}
      </div>
    </div>
  );
}

const CATEGORY_BRAND_LIMIT = 7;

// Sunum-katmanı-yalnızca makro aile gruplaması — 23 onaylı Excel kategorisini
// DEĞİŞTİRMEZ (isim/slug/brandSlugs/featuredBrandSlugs sabit kalır), yalnızca
// atlas'ta görsel olarak nasıl kümelendiklerini belirler. Her isim
// PRODUCT_CATEGORIES'teki gerçek category.name ile birebir eşleşir.
const MACRO_FAMILIES: { label: string; categoryNames: string[] }[] = [
  { label: "Motor & Yakıt Sistemleri", categoryNames: ["Motor", "Yakıt ve Enjeksiyon"] },
  { label: "Güç Aktarımı", categoryNames: ["Aks-Transmisyon", "Debriyaj-Volan", "Şanzıman"] },
  { label: "Fren & Şasi", categoryNames: ["Fren Sistemi", "Direksiyon", "Süspansiyon-Taşıyıcı Sistem"] },
  { label: "Elektrik, Aydınlatma & Görüş", categoryNames: ["Elektrik", "Şarj-Marş", "Aydınlatma", "Araç Görünürlük-Uyarı Grubu"] },
  { label: "Termal Yönetim", categoryNames: ["Klima-Isıtma", "Soğutma"] },
  { label: "Filtrasyon & Bakım", categoryNames: ["Filtre", "Motor Yağı", "Sarf ve Bakım Ürünleri"] },
  { label: "Sızdırmazlık & Motor Çevresi", categoryNames: ["Conta-Keçe-O-Ring", "Kayış-Gergi-Rulman-Kit", "Kauçuk-Hortumlar-Borular"] },
  { label: "Dış Donanım & Tamamlayıcı Ürünler", categoryNames: ["Kaporta-Karoseri", "Lastik-Jant", "Üniversal Ürünler"] },
];

function CategoryBrandRefs({ category, brands }: { category: ProductCategory; brands: Brand[] }) {
  // Genişletme durumu bilerek burada, yerel state olarak tutuluyor: bu
  // bileşen CategoryShowcase'te `key={display.name}` taşıyan bir üst
  // sarmalayıcının içinde render edilir, dolayısıyla kategori değişince
  // (hover önizleme veya kilitleme fark etmeksizin) React bileşeni komple
  // yeniden mount eder ve `expanded` otomatik olarak false'a döner — ayrı
  // bir reset efekti yazmaya gerek kalmaz.
  const [expanded, setExpanded] = useState(false);
  const shelfId = useId();

  // featuredBrandSlugs (varsa) önce gösterilir — brandSlugs'ın yalnızca
  // öncelik sırasıdır, yeni bir marka eklemez. Kalan markalar kendi
  // orijinal (Excel) sırasıyla arkasından gelir.
  const featured = category.featuredBrandSlugs ?? [];
  const orderedSlugs = [...featured, ...category.brandSlugs.filter((s) => !featured.includes(s))];
  const resolved = orderedSlugs
    .map((slug) => brands.find((b) => b.slug === slug))
    .filter((b): b is Brand => Boolean(b));
  const shown = resolved.slice(0, CATEGORY_BRAND_LIMIT);
  const rest = resolved.length - shown.length;
  const visible = expanded ? resolved : shown;

  return (
    <div id={shelfId} className="flex flex-wrap items-center gap-2.5 bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-100">
      {visible.map((b, i) => {
        const isNewlyRevealed = i >= shown.length;
        return (
          <div
            key={b.slug}
            className={isNewlyRevealed ? "do-chip-expand" : "do-chip-in"}
            style={{ animationDelay: isNewlyRevealed ? `${(i - shown.length) * 30}ms` : `${i * 35}ms` }}
          >
            <BrandLogo brand={b} size="compact" />
          </div>
        );
      })}
      {rest > 0 && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
          aria-controls={shelfId}
          className="group w-24 h-14 rounded-lg border border-dashed border-slate-300 flex items-center justify-center shrink-0 hover:border-[#1B3A8F]/50 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3A8F] transition-colors"
        >
          <span className="text-slate-400 group-hover:text-[#1B3A8F] text-[11px] font-bold text-center leading-tight transition-colors">
            +{rest}<br />marka
          </span>
        </button>
      )}
      {rest > 0 && expanded && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          aria-expanded={true}
          aria-controls={shelfId}
          className="inline-flex items-center gap-1 h-14 px-2 rounded-lg shrink-0 text-[11px] font-bold text-[#1B3A8F] hover:text-[#2547B5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3A8F] transition-colors"
        >
          <ChevronUp className="w-3.5 h-3.5" strokeWidth={2} />
          Daha az göster
        </button>
      )}
    </div>
  );
}

// Kategori Atlası: 23 onaylı kategori, 8 makro aile altında sunum-katmanında
// kümelenmiş — hepsi her zaman görünür ve doğrudan tıklanabilir (ekstra
// tıklama/alt sayfa yok). Altında seçili/önizlenen kategorinin sıkışık, yatay
// "spotlight" paneli. Etkileşim: HOVER = canlı önizleme (masaüstü),
// CLICK/TAP = kilitle. Fare atlasdan tamamen çıkınca son kilitlenen
// kategoriye geri dönülür. Hover, kutucuğun kendisini vurgularken hovered
// kategori dışındaki AİLELER hafifçe geri çekilir — aynı ailenin diğer
// üyeleri okunaklı kalır. Aynı Excel-kaynaklı PRODUCT_CATEGORIES verisi,
// yalnızca sunum katmanı.
function CategoryShowcase({ categories, brands }: { categories: ProductCategory[]; brands: Brand[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const displayIdx = hoveredIdx ?? activeIdx;
  const display = categories[displayIdx];
  const isHovering = hoveredIdx !== null;

  const indexByName = new Map(categories.map((c, i) => [c.name, i]));
  const families = MACRO_FAMILIES.map((f) => ({
    label: f.label,
    items: f.categoryNames
      .map((name) => ({ idx: indexByName.get(name) }))
      .filter((x): x is { idx: number } => x.idx !== undefined)
      .map(({ idx }) => ({ cat: categories[idx], idx })),
  }));
  const hoveredFamily = hoveredIdx != null ? families.find((f) => f.items.some((it) => it.idx === hoveredIdx))?.label ?? null : null;

  return (
    <div className="relative overflow-hidden" onMouseLeave={() => setHoveredIdx(null)}>
      <div
        className={`do-category-atmosphere pointer-events-none absolute -inset-x-10 -inset-y-16 transition-opacity duration-500 ${isHovering ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />

      {/* Kategori Atlası — 8 makro aile, 23 kategori, tamamı her zaman görünür */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 mb-8">
        {families.map((family) => {
          const isFamilyDim = isHovering && hoveredFamily !== family.label;
          return (
            <div key={family.label} className={`transition-opacity duration-300 ${isFamilyDim ? "opacity-55" : "opacity-100"}`}>
              <div
                className={`text-[10px] font-bold uppercase tracking-[0.1em] mb-2 transition-colors duration-300 truncate ${
                  hoveredFamily === family.label ? "text-[#1B3A8F]" : "text-slate-400"
                }`}
              >
                {family.label}
              </div>
              <div className="space-y-1">
                {family.items.map(({ cat, idx }) => {
                  const isHovered = idx === hoveredIdx;
                  const isLocked = idx === activeIdx;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onFocus={() => setHoveredIdx(idx)}
                      onBlur={() => setHoveredIdx(null)}
                      aria-current={isLocked}
                      className={`do-category-tile w-full flex items-center gap-2 rounded-md border-l-[3px] pl-2.5 pr-2 py-2 text-left transition-all duration-300 ${
                        isHovered
                          ? "bg-[#1B3A8F] border-l-[#7d9bea]"
                          : isLocked
                          ? "bg-[#1B3A8F]/[0.06] border-l-[#1B3A8F]/50"
                          : "border-l-transparent hover:bg-slate-50"
                      }`}
                    >
                      <cat.icon className={`w-3.5 h-3.5 shrink-0 ${isHovered ? "text-white" : "text-[#1B3A8F]"}`} strokeWidth={1.75} />
                      <span className={`text-[12.5px] leading-tight font-semibold truncate ${isHovered ? "text-white" : "text-slate-700"}`}>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Seçili/önizlenen kategori — sıkışık, yatay spotlight paneli */}
      <div key={display.name} className="do-fade-up relative bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="grid lg:grid-cols-[280px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="relative overflow-hidden p-6 lg:p-7 flex flex-col justify-center">
            <div className="absolute -right-3 -bottom-4 text-[100px] leading-none font-black text-slate-50 select-none pointer-events-none" aria-hidden="true">
              {String(displayIdx + 1).padStart(2, "0")}
            </div>
            <div className="relative flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#1B3A8F] flex items-center justify-center shrink-0">
                <display.icon className="w-6 h-6 text-white" strokeWidth={1.75} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1B3A8F]">
                {String(displayIdx + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
              </span>
            </div>
            <h3 className="relative text-xl font-black text-slate-900 tracking-tight leading-snug mb-1.5">{display.name}</h3>
            <p className="relative text-slate-500 text-[13px] leading-relaxed line-clamp-2">{display.description}</p>
          </div>
          <div className="p-6 lg:p-7 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 block mb-3">Öne Çıkan Markalar</span>
            <CategoryBrandRefs category={display} brands={brands} />
            <a
              href="https://b2b.parcabul.com.tr/login.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-[12.5px] font-semibold text-[#1B3A8F] hover:text-[#2547B5] transition-colors group w-fit"
            >
              B2B Portal'da inceleyin
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TedarikciPage() {
  const [brandSearch, setBrandSearch] = useState("");
  const query = brandSearch.trim().toLowerCase();
  const filteredGlobal = GLOBAL_BRANDS.filter((b) => b.name.toLowerCase().includes(query));
  const filteredYerli = YERLI_BRANDS.filter((b) => b.name.toLowerCase().includes(query));
  const noBrandResults = filteredGlobal.length === 0 && filteredYerli.length === 0;

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
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

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-28">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Ürün Portföyü · 250+ Marka</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="do-hero-line">GLOBAL KALİTE,</span><br />
            <span className="text-white">TEK ÇATI,</span><br />
            <span className="text-[#7d9bea]">DERİN STOK</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
            Binek ve hafif ticari araç kategorilerinde dünyanın önde gelen OEM üreticileriyle doğrudan çalışıyoruz. 250'den fazla marka ve 50.000'i aşkın SKU; tek tedarikçi ilişkisiyle eksiksiz karşılanır. Groupauto International üyeliğiyle global satın alma gücü, yerel hız ve servis kalitesiyle buluşuyor.
          </p>
          <a
            href="https://b2b.parcabul.com.tr/login.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            B2B Portal
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* MARKA DUVARI — Global Markalar / Yerli Markalar, Excel kaynağına göre
          net iki gruba ayrılmış, aranabilir/filtrelenebilir tam marka dizini */}
      <section className="relative bg-[#1B3A8F] py-20 md:py-24 border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Marka Portföyü</span>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-2">{CLASSIFIED_BRANDS.length} Markanın Tek Çatısı</h2>
              <p className="text-white/45 text-[14px] max-w-xl mt-3 leading-relaxed">Global OEM tedarikçilerini ve güçlü yerli üreticileri, tek portföyde bir araya getiriyoruz.</p>
            </div>
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Marka ara..."
                aria-label="Marka ara"
                className="w-full bg-white/[0.08] border border-white/15 rounded-lg pl-11 pr-4 py-3 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#7d9bea]/60 focus:bg-white/[0.12] transition-colors"
              />
            </div>
          </div>

          {noBrandResults ? (
            <p className="text-white/50 text-[14px] py-16 text-center">"{brandSearch}" ile eşleşen marka bulunamadı.</p>
          ) : (
            <div className="space-y-16">
              <BrandGroup label="Global Markalar" brands={filteredGlobal} />
              <BrandGroup label="Yerli Markalar" brands={filteredYerli} />
            </div>
          )}

          <p className="text-white/50 text-[13px] mt-14 text-center">
            {CLASSIFIED_BRANDS.length} yerli ve global markadan oluşan geniş ürün portföyümüzü kategoriye göre aşağıda inceleyebilir,
            {" "}güncel stok durumu için B2B portalına göz atabilirsiniz.
          </p>
        </div>
      </section>

      {/* KATEGORİLER — light, Excel Ürün Grupları'na göre 23 kategori.
          Bölüm py-12/lg:py-14 — kategori atlası + spotlight bir 16:9 masaüstü
          viewport'a (1440×900 dahil) kaydırmadan sığmalı; Faz D'de spotlight'a
          biraz daha nefes alanı verildi (hâlâ tek viewport sınırı içinde). */}
      <section className="bg-[#f8fafc] py-12 lg:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-7">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Ürün Kategorileri</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-1.5 tracking-tight">Uçtan Uca Kategori Kapsamı</h2>
          </div>
          <CategoryShowcase categories={PRODUCT_CATEGORIES} brands={CLASSIFIED_BRANDS} />
        </div>
      </section>

      {/* TEDARİKÇİ KALİTE KRİTERLERİ — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">Kalite Güvencesi</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Tedarikçi Kalite Kriterleri</h2>
              <p className="text-white/65 leading-[1.85] text-[15.5px] mb-8">
                Portföyümüze alınan her marka, titiz bir ön değerlendirme ve süregelen denetim sürecine tabidir. Groupauto International global satın alma standartları bu sürecin omurgasını oluşturur. Sahte ve düşük kaliteli ürüne karşı sıfır tolerans politikamız; müşterilerimizin saha güvenilirliğini korumanın temel güvencesidir.
              </p>
              <div className="space-y-3">
                {QUALITY.map((q) => (
                  <div key={q} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#7d9bea] shrink-0 mt-0.5" />
                    <span className="text-white/80 text-[14px] leading-snug">{q}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "250+",      l: "Aktif Marka",   d: "Sürekli büyüyen portföy" },
                { n: "50.000+",   l: "Aktif SKU",     d: "Geniş stok derinliği" },
                { n: "OEM",       l: "Standart",      d: "Tüm ürünlerde zorunlu" },
                { n: "Groupauto", l: "Üyeliği",       d: "Global satın alma ağı" },
              ].map(({ n, l, d }) => (
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
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Tedarik Üstünlüğü</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Neden Delta Oto?</h2>
            <p className="text-slate-500 mt-3 text-[15px] max-w-2xl">Tek tedarikçi kolaylığı, global satın alma gücü ve OEM kalite güvencesi — hepsi tek çatı altında.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {ADVANTAGES.map(({ Icon, title, desc }) => (
              <div key={title} className="do-card flex gap-6 border border-slate-200 rounded-xl p-8 group">
                <div className="shrink-0 w-12 h-12 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center group-hover:bg-[#1B3A8F] transition-colors">
                  <Icon className="w-5 h-5 text-[#1B3A8F] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-snug">{title}</h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — navy */}
      <section className="relative bg-[#1B3A8F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Stok Sorgulama ve Sipariş için B2B Portal</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-[16px] font-light">Anlık stok durumu, fiyat listesi ve sipariş yönetimi; B2B portalımız üzerinden 7/24 erişilebilir.</p>
          <button className="bg-white text-[#1B3A8F] hover:bg-gray-100 active:scale-[0.98] font-bold px-10 py-4 rounded-md transition-all inline-flex items-center gap-2 shadow-lg group">
            Portala Giriş Yapın <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

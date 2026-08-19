import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, ChevronDown, ArrowRight, CheckCircle2, Check, Globe, Package, Shield, Zap, Handshake, Search, X } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { CLASSIFIED_BRANDS, GLOBAL_BRANDS, YERLI_BRANDS, type Brand } from "@/lib/brands";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/categories";
import { useEscapeKey } from "@/hooks/use-motion";

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
      <div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 sm:gap-4">
        {brands.map((b) => (
          <BrandLogo key={b.slug} brand={b} size="wall" />
        ))}
      </div>
    </div>
  );
}

// Sunum-katmanı-yalnızca makro aile gruplaması — 23 onaylı Excel kategorisini
// DEĞİŞTİRMEZ (slug/brandSlugs/featuredBrandSlugs sabit kalır), yalnızca
// atlas'ta görsel olarak nasıl kümelendiklerini belirler. categoryNames,
// PRODUCT_CATEGORIES'teki GÖRÜNTÜLENEN category.name ile birebir eşleşir
// (categories.ts'te netlik için yeniden adlandırılan 4 kategori burada da
// güncel adıyla geçer). Aile başlıklarından 3'ü ("Termal Yönetim",
// "Sızdırmazlık & Motor Çevresi", "Dış Donanım & Tamamlayıcı Ürünler")
// soyut/mühendislik-jargonu gibi duruyordu; içerdikleri kategorileri
// doğrudan adlandıran daha somut başlıklara çevrildi.
const MACRO_FAMILIES: { label: string; categoryNames: string[] }[] = [
  { label: "Motor & Yakıt Sistemleri", categoryNames: ["Motor İç Aksamı", "Yakıt ve Enjeksiyon"] },
  { label: "Güç Aktarımı", categoryNames: ["Aks-Transmisyon", "Debriyaj-Volan", "Şanzıman"] },
  { label: "Fren & Şasi", categoryNames: ["Fren Sistemi", "Direksiyon", "Süspansiyon ve Taşıyıcı Sistem"] },
  { label: "Elektrik, Aydınlatma & Görüş", categoryNames: ["Elektrik Donanımı", "Şarj-Marş", "Aydınlatma", "Sinyalizasyon ve Görünürlük"] },
  { label: "Klima ve Soğutma Sistemleri", categoryNames: ["Klima-Isıtma", "Soğutma"] },
  { label: "Filtrasyon & Bakım", categoryNames: ["Filtre", "Motor Yağı", "Sarf ve Bakım Ürünleri"] },
  { label: "Sızdırmazlık, Kayış ve Hortum Sistemleri", categoryNames: ["Conta-Keçe-O-Ring", "Kayış-Gergi-Rulman-Kit", "Kauçuk-Hortumlar-Borular"] },
  { label: "Kaporta, Lastik ve Tamamlayıcı Ürünler", categoryNames: ["Kaporta-Karoseri", "Lastik-Jant", "Üniversal Ürünler"] },
];

function CategoryBrandRefs({ category, brands }: { category: ProductCategory; brands: Brand[] }) {
  // Marka alanı bu modülün ana odağıdır: TÜM markalar alfabetik sırada
  // (tr locale) tek seferde açık gelir — expand/collapse YOK. Önceki
  // "öne çıkan markalar önce" sıralaması (featuredBrandSlugs) burada
  // artık kullanılmıyor; alfabetik sıra, "biri baskın biri kayıp" hissi
  // yaratmadan tüm markaları eşit bir tarama düzeninde sunuyor.
  const resolved = category.brandSlugs
    .map((slug) => brands.find((b) => b.slug === slug))
    .filter((b): b is Brand => Boolean(b))
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
      {resolved.map((b, i) => (
        <div key={b.slug} className="do-chip-in" style={{ animationDelay: `${Math.min(i, 14) * 20}ms` }}>
          <BrandLogo brand={b} size="gallery" />
        </div>
      ))}
    </div>
  );
}

// Kategori Gezgini (Category Explorer) — v3: SOL AİLE ENDEKSİ + SAĞ
// KATEGORİLER + AKTİF ÜRÜN DOKU. Etkileşim mimarisi baştan beri KORUNUYOR:
// hover'a bağlı bir state ARTIK HİÇ YOK, seçim SADECE tıklamayla değişir
// (CLICK = commit). Tek doğruluk kaynağı `activeIdx` (seçili kategori) —
// `activeFamilyIdx` bundan TÜRETİLİR (find), ayrı bir state olarak
// tutulmaz; bu, orijinal "Fren Sistemi" hatasına yol açan sınıfın (iki
// state'in birbirinden bağımsız kayması) v3'te de yeniden ortaya
// çıkmasını mimari olarak imkânsız kılar. Bir aileye tıklamak o ailenin
// ilk kategorisini `setActiveIdx` ile commit eder — bu da bir TIKLAMA
// sonucu, hover değil.
//
// v3'ün değiştirdiği şey GÖRSEL MİMARİ: v2'nin 4×2 matrisi (23 kategorinin
// TAMAMI her zaman görünür) işlevsel ama yoğundu. Yerine: sol tarafta 8
// ürün ailesinin TAMAMI dikey bir "içindekiler" endeksi olarak her zaman
// görünür (büyük indeks numarası + ince ayraç + aile adı — kart YOK, dashboard
// sidebar'ı değil, teknik bir katalog içindekiler sayfası hissi); sağda
// SADECE seçili ailenin kategorileri + onun altında (aynı sütunda, "kopuk
// kutu" hissi vermeden) AKTİF ÜRÜN DOKU. Veri kaynağı değişmedi: aynı
// Excel-kökenli PRODUCT_CATEGORIES + sunum-katmanı MACRO_FAMILIES.
//
// Mikro-etkileşim turu: aktif aile satırı artık KALICI dolgun navy zemin +
// beyaz tipografi (aktif olmayan satırlarda hiçbir arka plan yok — yalnızca
// hover'da soldan sağa açılan bir navy dolgu pseudo-katmanı belirir, saf CSS
// :hover, hiçbir state'e dokunmaz; fare ayrılınca geri kapanır). Varsayılan
// yükleme durumu artık her zaman family 01 / category 01 — bkz. aşağıdaki
// orderedCategories notu.
function CategoryExplorer({ categories, brands }: { categories: ProductCategory[]; brands: Brand[] }) {
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

  // GÖRÜNTÜLENEN sıra: 01-08 aile hiyerarşisiyle TUTARLI, tek bir "display
  // order". categories.ts'teki PRODUCT_CATEGORIES'in kendi (Excel) satır
  // sırasına DOKUNULMADI — brandSlugs/icon/description/ilişkiler birebir
  // aynı; yalnızca bu bileşen, MACRO_FAMILIES sırasına göre düzleştirilmiş
  // bir sunum listesi (orderedCategories) türetiyor ve activeIdx artık BU
  // listenin içindeki pozisyonu tutuyor. Böylece "Motor İç Aksamı" (family
  // 01'in ilk kategorisi) 01/23 olarak görünür — önceden Excel'deki ham
  // satır konumu olan 15/23'ü gösteriyordu, kafa karıştırıcıydı.
  const categoryByName = new Map(categories.map((c) => [c.name, c]));
  const orderedCategories = MACRO_FAMILIES.flatMap((f) =>
    f.categoryNames
      .map((name) => categoryByName.get(name))
      .filter((c): c is ProductCategory => c !== undefined),
  );
  const orderedIndexByName = new Map(orderedCategories.map((c, i) => [c.name, i]));
  const active = orderedCategories[activeIdx];

  const families = MACRO_FAMILIES.map((f) => ({
    label: f.label,
    items: f.categoryNames
      .map((name) => orderedIndexByName.get(name))
      .filter((idx): idx is number => idx !== undefined)
      .map((idx) => ({ cat: orderedCategories[idx], idx })),
  }));
  const activeFamilyIdx = families.findIndex((f) => f.items.some((it) => it.idx === activeIdx));
  const activeFamily = families[activeFamilyIdx] ?? null;
  const mobileFamily = families[mobileFamilyIdx];

  // Bir aileye tıklamak o ailenin İLK kategorisini commit eder — bu da bir
  // tıklamanın doğrudan sonucudur (hover değil), sağ panelin her zaman
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

  return (
    <div>
      {/* MASAÜSTÜ — SOL: 8 ürün ailesinin TAMAMI dikey bir "içindekiler"
          endeksi (her zaman görünür, teknik katalog dili — büyük indeks
          numarası + ince ayraç, kart YOK). SAĞ: seçili ailenin kategorileri,
          hemen altında (aynı sütunda) o kategorinin Aktif Ürün Doku'su —
          tek bir sürekli okuma akışı, kopuk kutu hissi yok. Satırlar
          yalnızca düz CSS :hover ile kendi rengini değiştirir; seçim
          SADECE tıklamayla commit edilir. */}
      <div className="hidden lg:grid grid-cols-[280px_1fr] gap-10">
        <div className="divide-y divide-slate-200 border-t border-slate-200 self-start">
          {families.map((family, fi) => {
            const isActive = fi === activeFamilyIdx;
            return (
              <button
                key={family.label}
                type="button"
                onClick={() => selectFamily(fi)}
                aria-current={isActive}
                className={`group relative w-full flex items-start gap-3.5 py-4 px-3.5 text-left overflow-hidden transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
                  isActive ? "bg-[#1B3A8F] focus-visible:outline-white" : "focus-visible:outline-[#1B3A8F]"
                }`}
              >
                {/* Hover-yalnızca navy dolgu: seçili DEĞİLSE, fareyle üzerine
                    gelince soldan sağa açılan bir dolgu (scale-x, saf CSS
                    :hover — hiçbir state'e dokunmaz). Fare ayrılınca geri
                    kapanır; seçili aile için bu katman hiç render edilmez,
                    onun navy'si kalıcı ve statiktir. */}
                {!isActive && (
                  <span
                    className="absolute inset-0 bg-[#1B3A8F] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"
                    aria-hidden="true"
                  />
                )}
                <span className={`relative z-10 text-xl font-black tabular-nums w-7 shrink-0 pt-px transition-colors duration-200 ${
                  isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                }`}>
                  {String(fi + 1).padStart(2, "0")}
                </span>
                <span className={`relative z-10 flex-1 text-[13px] leading-snug pt-1 transition-colors duration-200 ${
                  isActive ? "text-white font-bold" : "text-slate-600 font-semibold group-hover:text-white"
                }`}>
                  {family.label}
                </span>
                <ChevronRight
                  className={`relative z-10 w-4 h-4 shrink-0 mt-1 transition-all duration-200 ${
                    isActive
                      ? "text-white opacity-100 translate-x-0"
                      : "text-white opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        <div className="min-w-0">
          <div key={activeFamily?.label} className="do-fade-up">
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1B3A8F]">{activeFamily?.label}</span>
              <span className="text-[11px] font-bold text-slate-400">{activeFamily?.items.length} kategori</span>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {activeFamily?.items.map(({ cat, idx }) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-current={isActive}
                    className={`group flex items-center gap-2.5 -ml-[2px] pl-2.5 pr-2 py-2 text-left border-l-2 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1B3A8F] ${
                      isActive ? "border-l-[#1B3A8F] bg-[#1B3A8F]/[0.08]" : "border-l-transparent hover:bg-[#1B3A8F]/[0.05]"
                    }`}
                  >
                    <cat.icon
                      className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                        isActive ? "text-[#1B3A8F]" : "text-slate-400 group-hover:text-[#1B3A8F] group-hover:translate-x-0.5"
                      }`}
                      strokeWidth={1.75}
                    />
                    <span
                      className={`flex-1 text-[14px] leading-tight transition-transform duration-150 ${
                        isActive ? "text-[#1B3A8F] font-bold" : "text-slate-700 font-medium group-hover:text-[#1B3A8F] group-hover:translate-x-0.5"
                      }`}
                    >
                      {cat.name}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 text-[#1B3A8F] transition-opacity duration-150 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* AKTİF ÜRÜN DOKU — sol: kompakt kategori bilgisi. Sağ: marka
              alanı — modülün ANA odağı, tüm markalar alfabetik ve tek
              seferde açık (bkz. CategoryBrandRefs). B2B aksiyonu artık ayrı
              bir sütun/buton DEĞİL — marka başlığının yanında küçük bir
              metin-link olarak yardımcı konumda. Kategori listesinin hemen
              altında, aynı sağ sütunda — endeksten kopuk bir kutu değil. */}
          <div key={active.name} className="do-fade-up mt-6 rounded-xl border border-slate-200 bg-white">
            <div className="grid lg:grid-cols-[200px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              <div className="p-6 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#1B3A8F] flex items-center justify-center mb-3">
                  <active.icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1B3A8F] block mb-1">
                  {String(activeIdx + 1).padStart(2, "0")}/{String(orderedCategories.length).padStart(2, "0")}
                </span>
                <h3 className="text-base font-black text-slate-900 tracking-tight leading-tight mb-1.5">{active.name}</h3>
                <p className="text-slate-500 text-[12.5px] leading-relaxed">{active.description}</p>
              </div>

              <div className="p-6 min-w-0">
                <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">İlgili Markalar</span>
                    <span className="text-[11px] font-bold text-slate-400">{active.brandSlugs.length} marka</span>
                  </div>
                  <a
                    href="https://b2b.parcabul.com.tr/login.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#1B3A8F] hover:text-[#2547B5] transition-colors shrink-0 group"
                  >
                    B2B Portal'da incele
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
                <CategoryBrandRefs category={active} brands={brands} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBİL — kendi modeli: kompakt "01/08" sayaç + önceki/sonraki +
          "Tüm Aileler" (yatay çip şeridi KALDIRILDI — viewport'ta kırpılıyordu,
          körü körüne yatay kaydırma gerektiriyordu) + filtrelenmiş kategori
          listesi (tıklama = seç + sheet aç). Masaüstü endeksinin küçültülmüş
          hali DEĞİL — 8 aileyi aynı anda yatay göstermek yerine tek seferde
          birini gösterip gezinmeyi ok tuşlarına/sheet'e bırakmak dokunmatikte
          daha temiz. */}
      <div className="lg:hidden">
        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            onClick={prevMobileFamily}
            aria-label="Önceki ürün ailesi"
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
            aria-label="Sonraki ürün ailesi"
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
          Tüm Aileler
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
          {mobileFamily.items.length} kategori
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
              <span className="flex-1 min-w-0 text-[13.5px] font-semibold text-slate-800">{cat.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      {/* MOBİL "TÜM AİLELER" SHEET — 8 aileyi tek seferde yatay göstermek
          yerine (eski çip şeridi, viewport'ta kırpılıyordu) ayrı bir sayfada
          listeler. Birine dokunmak SADECE o aileyi seçer ve sheet'i kapatır —
          hangi kategorinin "seçili/kilitli" olduğuna (activeIdx) dokunmaz. */}
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
          aria-label="Tüm ürün aileleri"
        >
          <div className="flex justify-center pt-3 pb-1 shrink-0" aria-hidden="true">
            <div className="w-10 h-1 rounded-full bg-slate-200" />
          </div>
          <div className="flex items-center justify-between gap-3 px-5 pb-3 border-b border-slate-100 shrink-0">
            <h3 className="text-[15px] font-black text-slate-900 tracking-tight">Tüm Ürün Aileleri</h3>
            <button
              type="button"
              onClick={() => setMobileFamilySheetOpen(false)}
              aria-label="Kapat"
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

      {/* MOBİL BOTTOM-SHEET — kategoriye dokununca alttan açılır
          (RepresentativeFinderModal'daki modal dilini izler: backdrop blur,
          rounded-2xl, shadow-2xl). */}
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
          aria-label={active.name}
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
                <h3 className="text-[15px] font-black text-slate-900 tracking-tight leading-snug truncate">{active.name}</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileSheetOpen(false)}
              aria-label="Kapat"
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto p-5">
            <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{active.description}</p>
            <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">İlgili Markalar</span>
                <span className="text-[10px] font-bold text-slate-400">{active.brandSlugs.length} marka</span>
              </div>
              <a
                href="https://b2b.parcabul.com.tr/login.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#1B3A8F] hover:text-[#2547B5] transition-colors shrink-0 group"
              >
                B2B Portal'da incele
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
  const [brandSearch, setBrandSearch] = useState("");
  const query = brandSearch.trim().toLowerCase();
  const filteredGlobal = GLOBAL_BRANDS.filter((b) => b.name.toLowerCase().includes(query));
  const filteredYerli = YERLI_BRANDS.filter((b) => b.name.toLowerCase().includes(query));
  const noBrandResults = filteredGlobal.length === 0 && filteredYerli.length === 0;

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
          <div className="flex items-center gap-3 mb-5 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Ürün Portföyü · 250+ Marka</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-6">
            <span className="do-hero-line">GLOBAL KALİTE,</span><br />
            <span className="text-white">TEK ÇATI,</span><br />
            <span className="text-[#7d9bea]">DERİN STOK</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-6 lg:mb-10 font-light">
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
          net iki gruba ayrılmış, aranabilir/filtrelenebilir tam marka dizini.
          Mobilde dış boşluklar (section py, başlık/grup/kapanış aralıkları)
          daraltıldı — Hero + bu bölüm birlikte "büyük mavi boşluk" hissi
          veriyordu; 4 sütunlu logo duvarının kendisi (grid-cols-4/gap) VE
          arama/filtre işlevi DOKUNULMADAN korundu, yalnızca çevresindeki
          nefes payı küçültüldü. lg+'da (masaüstü) birebir korunuyor. */}
      <section className="relative bg-[#1B3A8F] py-10 md:py-24 border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-8 lg:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
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
            <div className="space-y-8 lg:space-y-16">
              <BrandGroup label="Global Markalar" brands={filteredGlobal} />
              <BrandGroup label="Yerli Markalar" brands={filteredYerli} />
            </div>
          )}

          <p className="text-white/50 text-[13px] mt-8 lg:mt-14 text-center">
            {CLASSIFIED_BRANDS.length} yerli ve global markadan oluşan geniş ürün portföyümüzü kategoriye göre aşağıda inceleyebilir,
            {" "}güncel stok durumu için B2B portalına göz atabilirsiniz.
          </p>
        </div>
      </section>

      {/* KATEGORİLER — light, Excel Ürün Grupları'na göre 23 kategori.
          Başlık + sayaç TEK satırda (ayrı bloklar değil) — modülün kendisi
          (matris + aktif ürün doku) 1440×900'de kaydırmadan sığması gereken
          asıl içerik; üst alan bunun için mümkün olduğunca kompakt tutulur. */}
      <section className="bg-[#f8fafc] py-10 lg:py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-6 lg:mb-7">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Ürün Kategorileri</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1 tracking-tight">Uçtan Uca Kategori Kapsamı</h2>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-[13px] font-bold text-slate-500">{PRODUCT_CATEGORIES.length} kategori</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
              <span className="text-[13px] font-bold text-slate-500">{MACRO_FAMILIES.length} ürün ailesi</span>
            </div>
          </div>
          <CategoryExplorer categories={PRODUCT_CATEGORIES} brands={CLASSIFIED_BRANDS} />
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
                { n: "OEM",       l: "Standart",      d: "OEM veya eşdeğeri zorunlu" },
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

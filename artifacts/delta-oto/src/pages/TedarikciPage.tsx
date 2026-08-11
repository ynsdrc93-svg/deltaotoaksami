import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, CheckCircle2, Globe, Package, Shield, Zap, Handshake, X, Cog } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useEscapeKey, useReveal } from "../hooks/use-motion";

// Sonsuz kayan logo bandı yerine: küratörlü, hiyerarşili statik sergi.
// 3 "featured" marka 2x2 büyük karo, geri kalanı standart karo — bento-grid.
// Kapsamlılık işini artık kategori panelleri üstleniyor, bu bölümün her şeyi
// göstermeye çalışmasına gerek yok.
const FLAGSHIP_BRANDS = [
  { slug: "bosch", featured: true },
  { slug: "continental", featured: true },
  { slug: "brembo", featured: true },
  { slug: "valeo", featured: false },
  { slug: "hella", featured: false },
  { slug: "denso", featured: false },
  { slug: "skf", featured: false },
  { slug: "mahle", featured: false },
  { slug: "trw", featured: false },
  { slug: "ngk", featured: false },
  { slug: "philips", featured: false },
  { slug: "osram", featured: false },
];

const BRAND_LABELS: Record<string, string> = {
  bosch: "Bosch", valeo: "Valeo", hella: "Hella", brembo: "Brembo", ngk: "NGK", sachs: "Sachs",
  denso: "Denso", monroe: "Monroe", trw: "TRW", mahle: "Mahle", gates: "Gates", skf: "SKF",
  febi: "Febi", osram: "Osram", philips: "Philips", delphi: "Delphi Technologies", ina: "INA",
  continental: "Continental", luk: "LuK", lemforder: "Lemförder", fag: "FAG", elring: "Elring",
  corteco: "Corteco", filtron: "Filtron", knecht: "Knecht", mannfilter: "Mann-Filter",
  champion: "Champion", borgwarner: "BorgWarner", swag: "SWAG", optimal: "Optimal", kale: "Kale",
  wahler: "Wahler", vdo: "VDO", gunsan: "Gunsan",
};

// brandSlugs: her kategori gerçek endüstri uzmanlığına göre eşleştirilmiş, /images/brands/'ta
// karşılığı olan gerçek logo dosyaları — kart üstündeki "+ daha fazla" popup'ta bunları gösterir.
const CATEGORIES = [
  { name: "Fren & Güvenlik Sistemleri", count: "45+ Marka", brandSlugs: ["brembo", "trw", "bosch", "delphi", "febi"], image: "/images/brake-systems.png", desc: "Fren balata/disk sistemleri, ABS ve araç güvenlik elektroniğinde OEM ve OEM eşdeğeri portföy." },
  { name: "Süspansiyon & Direksiyon",   count: "38+ Marka", brandSlugs: ["sachs", "monroe", "trw", "lemforder", "skf"], image: "/images/suspension-steering.png", desc: "Amortisör, rotil, salıncak ve direksiyon sistemi bileşenlerinde geniş marka alternatifi." },
  { name: "Motor, Ateşleme & Elektrik", count: "52+ Marka", brandSlugs: ["bosch", "denso", "ngk", "delphi", "borgwarner", "vdo"], image: "/images/engine-parts.png", desc: "Ateşleme, yakıt enjeksiyonu, turbo ve araç elektroniğinde küresel OEM tedarikçileri." },
  { name: "Rulman & Transmisyon",        count: "28+ Marka", brandSlugs: ["skf", "fag", "ina", "luk", "optimal"], image: undefined, desc: "Rulman, debriyaj ve şanzıman gruplarında hassas mühendislik gerektiren kategoriler." },
  { name: "Filtre & Periyodik Bakım",    count: "30+ Marka", brandSlugs: ["mannfilter", "knecht", "filtron", "champion", "gunsan"], image: "/images/filters.png", desc: "Yağ, hava, yakıt ve kabin filtrelerinde periyodik bakım döngüsüne uygun geniş kapsam." },
  { name: "Kaporta & Aydınlatma",        count: "35+ Marka", brandSlugs: ["valeo", "hella", "osram", "philips"], image: "/images/electrical-lighting.png", desc: "Far, arka lamba ve kaporta/aydınlatma sistemlerinde orijinal görünüm ve performans." },
];

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

export function TedarikciPage() {
  const ref = useReveal();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const active = CATEGORIES.find((c) => c.name === activeCategory) ?? null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  useEscapeKey(() => setActiveCategory(null), !!active);
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);
  useEffect(() => {
    if (active) {
      closeButtonRef.current?.focus();
    } else {
      lastTriggerRef.current?.focus();
    }
  }, [active]);

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
          <Link
            href="#"
            className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            B2B Portal
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* MARKA DUVARI — navy, küratörlü statik bento-sergi (kayan bant değil) */}
      <section className="relative bg-[#1B3A8F] py-20 md:py-24 border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Global Marka Portföyü</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-2">Güvenilir Markaların Tek Çatısı</h2>
            <p className="text-white/45 text-[14px] max-w-2xl mt-3 leading-relaxed">Dünyanın önde gelen OEM tedarikçilerinin Türkiye distribütörü olarak, bayilerimize global kaliteyi yerel hızla ulaştırıyoruz. Aşağıda öne çıkan birkaç ortağımız yer alıyor; kategoriye göre tam listeyi az sonraki kartlardan görebilirsiniz.</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[84px] sm:auto-rows-[96px]" style={{ gridAutoFlow: "dense" }}>
            {FLAGSHIP_BRANDS.map((b, i) => (
              <div
                key={b.slug}
                ref={ref}
                className={`do-reveal do-d${(i % 4) + 1} ${b.featured ? "col-span-2 row-span-2" : "col-span-1 row-span-1"} bg-white rounded-xl flex items-center justify-center p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <img
                  src={`/images/brands/${b.slug}.png`}
                  alt={BRAND_LABELS[b.slug]}
                  className={`object-contain w-auto grayscale hover:grayscale-0 transition-all duration-400 ${b.featured ? "max-h-16 sm:max-h-20 max-w-[75%]" : "max-h-8 sm:max-h-10 max-w-[80%]"}`}
                />
              </div>
            ))}
          </div>

          <p className="text-white/50 text-[13px] mt-10 text-center">Portföydeki tüm markalar OEM veya OEM eşdeğeri sertifikasyon standardındadır. Gösterilen markalar temsili bir seçimdir; tam liste için B2B portalına giriş yapınız.</p>
        </div>
      </section>

      {/* KATEGORİLER — light */}
      <section className="bg-[#f8fafc] py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Ürün Kategorileri</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Uçtan Uca Kategori Kapsamı</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">Her kategoride birden fazla marka alternatifi sunarak müşterilerimize tercih esnekliği ve maliyet optimizasyon imkânı sağlıyoruz.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={(e) => { lastTriggerRef.current = e.currentTarget; setActiveCategory(cat.name); }}
                className="do-card bg-white border border-slate-200 rounded-xl overflow-hidden group cursor-pointer text-left w-full"
              >
                {cat.image ? (
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    <img src={cat.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#1B3A8F] to-[#0e1016] flex items-center justify-center">
                    <Cog className="w-12 h-12 text-white/25" strokeWidth={1.25} />
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{cat.name}</h3>
                    <span className="shrink-0 ml-3 text-[11px] font-bold text-[#1B3A8F] bg-[#1B3A8F]/[0.08] border border-[#1B3A8F]/[0.15] px-2.5 py-1 rounded">{cat.count}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.brandSlugs.slice(0, 4).map(s => (
                      <span key={s} className="text-[12px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-medium">{BRAND_LABELS[s]}</span>
                    ))}
                    <span className="text-[12px] text-[#1B3A8F] font-semibold px-2.5 py-1 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      + daha fazla <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
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

      {/* Kategori marka paneli — "+ daha fazla" vaadini gerçek logo setiyle karşılayan sağdan panel */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 ${active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!active}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setActiveCategory(null)} />
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[440px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${active ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
          aria-label={active?.name}
        >
          <div className="flex items-start justify-between gap-4 p-7 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B3A8F]">{active?.count}</span>
              <h3 className="text-xl font-black text-slate-900 mt-1 leading-snug">{active?.name}</h3>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setActiveCategory(null)}
              aria-label="Kapat"
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-7">
            <p className="text-slate-500 text-[14px] leading-relaxed mb-7">{active?.desc}</p>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 block mb-4">Öne Çıkan Tedarikçiler</span>
            <div className="grid grid-cols-2 gap-3">
              {active?.brandSlugs.map((s) => (
                <div key={s} className="border border-slate-200 rounded-xl h-20 flex items-center justify-center px-4 bg-white hover:border-[#1B3A8F]/30 hover:shadow-md transition-all">
                  <img src={`/images/brands/${s}.png`} alt={BRAND_LABELS[s]} className="max-h-9 max-w-[100px] w-auto object-contain" />
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-[12px] leading-relaxed mt-7">Gösterilen markalar bu kategorideki öne çıkan tedarikçilerimizden temsili bir seçimdir; tam liste ve stok durumu için B2B portalına giriş yapınız.</p>
          </div>
          <div className="p-7 border-t border-slate-100">
            <a href="#" className="w-full bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white font-semibold px-6 py-3.5 rounded-md transition-all flex items-center justify-center gap-2 group">
              B2B Portal'da İncele
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "wouter";
import { CheckCircle2, Globe, Package, Shield, Zap, Disc3, Settings2, CircleDot, Filter, Lightbulb, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const ROW1 = ["bosch","valeo","hella","brembo","ngk","sachs","denso","monroe","trw","mahle","gates","skf","febi","osram","philips","delphi","ina"];
const ROW2 = ["contitech","luk","lemforder","fag","elring","corteco","filtron","knecht","mannfilter","champion","borgwarner","swag","optimal","kale","wahler","vdo","gunsan"];

const CATEGORIES = [
  { icon: Disc3,     name: "Fren & Güvenlik Sistemleri", count: "45+", image: "/images/brake-systems.png",       imagePosition: "center",     brands: ["Brembo", "Bosch", "TRW", "Ferodo", "ATE"] },
  { icon: Settings2,  name: "Süspansiyon & Direksiyon",   count: "38+", image: "/images/suspension-steering.png", imagePosition: "center",     brands: ["Monroe", "Sachs", "KYB", "Lemförder", "SKF"] },
  { icon: Zap,        name: "Motor, Ateşleme & Elektrik", count: "52+", image: "/images/engine-parts.png",        imagePosition: "center",     brands: ["Bosch", "Denso", "NGK", "Gates", "INA"] },
  { icon: CircleDot,  name: "Rulman & Transmisyon",        count: "28+", image: "/images/heavy-duty.png",         imagePosition: "center 68%", brands: ["FAG", "SKF", "LUK", "ContiTech", "GKN"] },
  { icon: Filter,     name: "Filtre & Periyodik Bakım",    count: "30+", image: "/images/filters.png",            imagePosition: "center",     brands: ["Mann+Hummel", "Mahle", "Filtron", "Hengst", "UFI"] },
  { icon: Lightbulb,  name: "Kaporta & Aydınlatma",        count: "35+", image: "/images/electrical-lighting.png", imagePosition: "center",    brands: ["Valeo", "Hella", "Osram", "Philips", "Depo"] },
];

const FEATURED_BRANDS = ["bosch", "brembo", "trw", "denso"];

const QUALITY = [
  "OEM veya OEM eşdeğeri sertifikasyon zorunluluğu",
  "Kayıt dışı ve taklit ürün sıfır toleranstır",
  "Üretici belgelendirmesi ve lot takip zorunluluğu",
  "Periyodik ürün denetimleri ve saha geri bildirim sistemi",
  "Groupauto International global satın alma standartları",
  "Stok tutarlılığı ve teslimat performansı SLA takibi",
];

const ADVANTAGES = [
  { Icon: Package, figure: "250+",  figureLabel: "Aktif Marka",       title: "Kapsamlı Ürün Gamı",           desc: "Tek tedarikçi ilişkisiyle uçtan uca karşılanan 50.000'i aşkın SKU'luk portföy; çoklu tedarikçi koordinasyonu yükü ortadan kalkar." },
  { Icon: Globe,   figure: "40+",   figureLabel: "Ülke Ağı",          title: "Groupauto Tedarik Ayrıcalığı", desc: "Groupauto International üyeliği; 3.000'i aşkın üye firmanın satın alma gücünü kaldıraca dönüştürür ve global fiyat avantajını doğrudan portföyümüze yansıtır." },
  { Icon: Shield,  figure: "OEM",   figureLabel: "Zorunlu Standart",  title: "OEM Standart Kalite Güvencesi", desc: "Yalnızca orijinal ve OEM eşdeğeri ürün kategorilerinde faaliyet gösteriyoruz. Sahte ve düşük kaliteli ürün portföyde kesinlikle yer almaz." },
  { Icon: Zap,     figure: "7/24",  figureLabel: "Portal Erişimi",    title: "Dinamik Katalog Yönetimi",     desc: "Yeni araç modelleri ve marka genişlemeleri portföye sürekli eklenir. Güncel stok bilgisine B2B portalı üzerinden anlık erişilebilir; bekleme olmadan sipariş." },
];

function BrandCard({ slug }: { slug: string }) {
  return (
    <div className="shrink-0 w-44 h-28 bg-white rounded-xl border border-slate-200 flex items-center justify-center px-6 py-5 shadow-sm hover:shadow-md hover:border-[#1B3A8F]/25 transition-all duration-300">
      <img
        src={`/images/brands/${slug}.png`}
        alt={slug}
        className="max-h-16 max-w-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-400"
      />
    </div>
  );
}

function FeaturedBrandCard({ slug }: { slug: string }) {
  return (
    <div className="w-40 sm:w-48 h-28 sm:h-32 bg-white rounded-2xl flex items-center justify-center px-7 py-6 shadow-[0_24px_48px_rgba(0,0,0,0.35)] border-t-2 border-[#4d74d6]">
      <img
        src={`/images/brands/${slug}.png`}
        alt={slug}
        className="max-h-16 sm:max-h-20 max-w-full w-auto object-contain"
      />
    </div>
  );
}

export function TedarikciPage() {
  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO (dark, split panel) */}
      <section className="relative overflow-hidden bg-[#0e1016] text-white">
        <div className="flex flex-col lg:flex-row lg:min-h-[620px]">

          {/* LEFT — solid ink panel, oversized "250" mark, real content */}
          <div className="relative lg:w-[57%] flex items-center px-6 sm:px-10 lg:pl-14 xl:pl-20 lg:pr-10 xl:pr-14 py-20 lg:py-28 overflow-hidden">
            <div
              aria-hidden
              className="absolute -left-6 -bottom-16 sm:-bottom-24 lg:-bottom-28 text-[130px] sm:text-[210px] lg:text-[270px] xl:text-[310px] font-black leading-none text-white/[0.045] select-none pointer-events-none tracking-tighter"
            >
              250
            </div>
            <div className="do-grid-bg absolute inset-0 opacity-50"></div>
            <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60"></div>
            <div className="do-beam"></div>

            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-[2px] bg-[#4d74d6]" />
                <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Ürün Portföyü · 250+ Marka</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[56px] xl:text-[68px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
                <span className="do-hero-line">GLOBAL KALİTE,</span><br />
                <span className="text-white">TEK ÇATI,</span><br />
                <span className="do-hero-accent">DERİN STOK</span>
              </h1>
              <p className="text-[16px] sm:text-[17px] text-gray-300 leading-[1.8] max-w-lg mb-10 font-light">
                Binek ve hafif ticari araç kategorilerinde dünyanın önde gelen OEM üreticileriyle doğrudan çalışıyoruz. 250'den fazla marka ve 50.000'i aşkın SKU; tek tedarikçi ilişkisiyle eksiksiz karşılanır. Groupauto International üyeliğiyle global satın alma gücü, yerel hız ve servis kalitesiyle buluşuyor.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { Icon: Package, text: "50.000+ Aktif SKU" },
                  { Icon: Globe,   text: "Groupauto · 40+ Ülke" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="do-stat-tag bg-white/[0.06] border border-white/15">
                    <span className="flex items-center gap-2 text-gray-200 text-[12.5px] font-medium px-4 py-2.5">
                      <Icon className="w-4 h-4 text-[#7d9bea]" />
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — full-strength photography, not a dimmed backdrop */}
          <div className="relative lg:w-[43%] min-h-[320px] sm:min-h-[420px] lg:min-h-0 overflow-hidden">
            <img
              src="/images/spart-warehouse.jpg"
              alt="Delta Oto parça deposu raf hattı"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 35%" }}
            />
            <div className="absolute inset-y-0 left-0 w-16 lg:w-28 bg-gradient-to-r from-[#0e1016] to-transparent hidden lg:block"></div>
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0e1016] to-transparent lg:hidden"></div>
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e1016]/80 to-transparent"></div>

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <div className="do-stat-tag bg-[#1B3A8F] shadow-2xl">
                <span className="flex items-baseline gap-2.5 px-5 py-3.5">
                  <span className="text-3xl font-black text-white leading-none tabular-nums">250+</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-100 max-w-[7rem] leading-tight">Aktif Global Marka</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKA DUVARI — dark */}
      <section className="bg-[#0e1016] py-20 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Global Marka Portföyü</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Güvenilir Markaların Tek Çatısı</h2>
            <p className="text-white/45 text-[14px] max-w-sm sm:text-right leading-relaxed">Dünyanın önde gelen OEM tedarikçilerinin Türkiye distribütörü olarak, bayilerimize global kaliteyi yerel hızla ulaştırıyoruz.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Öne Çıkan Küresel Ortaklar</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {FEATURED_BRANDS.map((slug) => <FeaturedBrandCard key={slug} slug={slug} />)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="do-bm-wrap py-2">
            <div className="do-bm-track do-ltr pl-4">
              {[...ROW1, ...ROW1].map((b, i) => <BrandCard key={i} slug={b} />)}
            </div>
          </div>
          <div className="do-bm-wrap py-2">
            <div className="do-bm-track do-rtl pl-4">
              {[...ROW2, ...ROW2].map((b, i) => <BrandCard key={i} slug={b} />)}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10 text-center">
          <p className="text-white/30 text-[13px]">Portföydeki tüm markalar OEM veya OEM eşdeğeri sertifikasyon standardındadır — gösterilen 34 marka, geniş tedarikçi ağımızın öne çıkan bir kesitidir. Tam liste ve anlık stok için B2B portalına giriş yapın.</p>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="do-entity-card bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#1B3A8F]/30 hover:shadow-xl group">
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    style={{ objectPosition: cat.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 w-9 h-9 bg-[#1B3A8F] rounded-lg flex items-center justify-center shadow-lg">
                    <cat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-3.5 right-4 text-right">
                    <div className="text-[28px] font-black text-white leading-none tabular-nums">{cat.count}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 mt-0.5">Marka</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-4">{cat.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.brands.map(b => (
                      <span key={b} className="text-[11.5px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-medium">{b}</span>
                    ))}
                  </div>
                </div>
              </div>
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
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden min-h-[420px] shadow-2xl">
                <img
                  src="/images/spart-quality.jpg"
                  alt="Kumpasla hassas kalite kontrol ölçümü"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c11] via-[#0a0c11]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c11]/50 via-transparent to-transparent" />

                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full pl-3 pr-4 py-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#7d9bea]" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">Sıfır Tolerans Politikası</span>
                  </span>
                </div>

                <div className="absolute bottom-7 left-7">
                  <div className="do-stat-tag bg-[#1B3A8F] shadow-2xl">
                    <span className="flex items-baseline gap-2.5 px-5 py-3.5">
                      <span className="text-2xl font-black text-white leading-none">OEM</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-100 max-w-[7rem] leading-tight">Zorunlu Kalite Standardı</span>
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-8 right-7 text-right">
                  <div className="text-[15px] font-black text-white leading-none">Groupauto</div>
                  <div className="text-[10px] text-white/55 uppercase tracking-[0.15em] mt-1.5">Global Satın Alma Ağı</div>
                </div>
              </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADVANTAGES.map(({ Icon, figure, figureLabel, title, desc }) => (
              <div key={title} className="do-entity-card bg-white border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-lg">
                <div className="w-10 h-10 bg-[#1B3A8F]/[0.08] rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-4 h-4 text-[#1B3A8F]" />
                </div>
                <div className="do-metric-num text-4xl font-black leading-none tracking-tighter tabular-nums mb-1.5">{figure}</div>
                <div className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-5">{figureLabel}</div>
                <h3 className="text-[14px] font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — navy */}
      <section className="relative bg-[#1B3A8F] text-white py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="absolute -right-16 top-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-3 text-blue-200 text-xs font-bold uppercase tracking-[0.3em] mb-5">
              <span className="w-8 h-[2px] bg-blue-300 inline-block hidden md:inline-block" />
              B2B Portal
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 max-w-lg">Stok Sorgulama ve Sipariş için B2B Portal</h2>
            <p className="text-gray-300 max-w-xl text-[16px] font-light">Anlık stok durumu, fiyat listesi ve sipariş yönetimi; B2B portalımız üzerinden 7/24 erişilebilir.</p>
          </div>
          <div className="shrink-0 flex flex-col items-center md:items-end gap-4">
            <button className="bg-white text-[#1B3A8F] hover:bg-gray-100 font-bold px-10 py-4 rounded-md transition-colors inline-flex items-center gap-2 shadow-[0_0_32px_rgba(255,255,255,0.12)] group">
              Portala Giriş Yapın <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-[12px] text-blue-100/60">OEM kalite güvencesi · Sıfır tolerans · Anlık stok</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

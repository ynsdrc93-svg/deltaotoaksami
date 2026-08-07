import React from "react";
import { Link } from "wouter";
import { CheckCircle2, Globe, Package, Shield, Zap, Disc3, Settings2, CircleDot, Filter, Lightbulb, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const ROW1 = ["bosch","valeo","hella","brembo","ngk","sachs","denso","monroe","trw","mahle","gates","skf","febi","osram","philips","delphi","ina"];
const ROW2 = ["contitech","luk","lemforder","fag","elring","corteco","filtron","knecht","mannfilter","champion","borgwarner","swag","optimal","kale","wahler","vdo","gunsan"];

const CATEGORIES = [
  { icon: Disc3,     name: "Fren & Güvenlik Sistemleri", count: "45+ Marka", brands: ["Brembo", "Bosch", "TRW", "Ferodo", "ATE"] },
  { icon: Settings2,  name: "Süspansiyon & Direksiyon",   count: "38+ Marka", brands: ["Monroe", "Sachs", "KYB", "Lemförder", "SKF"] },
  { icon: Zap,        name: "Motor, Ateşleme & Elektrik", count: "52+ Marka", brands: ["Bosch", "Denso", "NGK", "Gates", "INA"] },
  { icon: CircleDot,  name: "Rulman & Transmisyon",        count: "28+ Marka", brands: ["FAG", "SKF", "LUK", "ContiTech", "GKN"] },
  { icon: Filter,     name: "Filtre & Periyodik Bakım",    count: "30+ Marka", brands: ["Mann+Hummel", "Mahle", "Filtron", "Hengst", "UFI"] },
  { icon: Lightbulb,  name: "Kaporta & Aydınlatma",        count: "35+ Marka", brands: ["Valeo", "Hella", "Osram", "Philips", "Depo"] },
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
  { Icon: Zap,     title: "Dinamik Katalog Yönetimi", desc: "Yeni araç modelleri ve marka genişlemeleri portföye sürekli eklenir. Güncel stok bilgisine B2B portalı üzerinden anlık erişilebilir; bekleme olmadan sipariş." },
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

export function TedarikciPage() {
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
            <span className="do-hero-accent">DERİN STOK</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
            Binek ve hafif ticari araç kategorilerinde dünyanın önde gelen OEM üreticileriyle doğrudan çalışıyoruz. 250'den fazla marka ve 50.000'i aşkın SKU; tek tedarikçi ilişkisiyle eksiksiz karşılanır. Groupauto International üyeliğiyle global satın alma gücü, yerel hız ve servis kalitesiyle buluşuyor.
          </p>
          <div className="flex flex-wrap gap-5">
            {[["250+","Aktif Marka","OEM kalite standardı"],["50.000+","Aktif SKU","Geniş stok derinliği"],["Groupauto","Üyeliği","40+ ülke, 3.000+ firma"]].map(([n,l,d]) => (
              <div key={l} className="border border-white/15 rounded-xl px-6 py-4 bg-white/5">
                <div className="text-2xl font-black text-white">{n}</div>
                <div className="text-[12px] font-bold text-[#7d9bea] uppercase tracking-wide mt-0.5">{l}</div>
                <div className="text-[11px] text-gray-400 mt-1">{d}</div>
              </div>
            ))}
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
          <p className="text-white/30 text-[13px]">Portföydeki tüm markalar OEM veya OEM eşdeğeri sertifikasyon standardındadır. Gösterilen markalar temsili seçimdir; tam liste için B2B portalına giriş yapınız.</p>
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
              <div key={cat.name} className="do-entity-card bg-white border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/40 hover:shadow-lg group cursor-pointer">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center group-hover:bg-[#1B3A8F] transition-colors">
                    <cat.icon className="w-5 h-5 text-[#1B3A8F] group-hover:text-white transition-colors" />
                  </div>
                  <span className="shrink-0 text-[11px] font-bold text-[#1B3A8F] bg-[#1B3A8F]/[0.08] border border-[#1B3A8F]/[0.15] px-2.5 py-1 rounded">{cat.count}</span>
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-4">{cat.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.brands.map(b => (
                    <span key={b} className="text-[12px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-medium">{b}</span>
                  ))}
                  <span className="text-[12px] text-[#1B3A8F] font-semibold px-2.5 py-1">+ daha fazla</span>
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
              <div className="bg-white/[0.06] border border-white/[0.12] rounded-2xl p-10 text-center">
                <Shield className="w-10 h-10 text-[#7d9bea] mx-auto mb-6" />
                <div className="text-3xl font-black text-white mb-2">OEM / OEM Eşdeğeri</div>
                <div className="text-[13px] text-white/60 uppercase tracking-[0.2em] mb-8">Zorunlu Kalite Standardı</div>
                <div className="h-px bg-white/10 mb-8" />
                <div className="text-3xl font-black text-white mb-2">Groupauto</div>
                <div className="text-[13px] text-white/60 uppercase tracking-[0.2em]">Global Satın Alma Ağı</div>
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
          <div className="grid md:grid-cols-2 gap-5">
            {ADVANTAGES.map(({ Icon, title, desc }) => (
              <div key={title} className="do-entity-card flex gap-6 border border-slate-200 rounded-xl p-8 hover:border-[#1B3A8F]/30 hover:shadow-lg group">
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
            <span className="text-[12px] text-blue-100/60">250+ marka · 50.000+ SKU · Anlık stok</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

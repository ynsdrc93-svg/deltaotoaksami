import React from "react";
import { Link } from "wouter";
import { ChevronRight, CheckCircle2, Globe, Package, Shield, Zap } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const MARQUEE_CSS = `
  @keyframes brand-ltr { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes brand-rtl { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
  .bm-wrap { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%); mask-image: linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%); }
  .bm-track { display: flex; width: max-content; gap: 16px; }
  .bm-track.ltr { animation: brand-ltr 45s linear infinite; }
  .bm-track.rtl { animation: brand-rtl 50s linear infinite; }
  .bm-wrap:hover .bm-track { animation-play-state: paused; }
`;

const ROW1 = ["bosch","valeo","hella","brembo","ngk","sachs","denso","monroe","trw","mahle","gates","skf","febi","osram","philips","delphi","ina"];
const ROW2 = ["contitech","luk","lemforder","fag","elring","corteco","filtron","knecht","mannfilter","champion","borgwarner","swag","optimal","kale","wahler","vdo","gunsan"];

const CATEGORIES = [
  { name: "Fren & Güvenlik Sistemleri", count: "45+ Marka", brands: ["Brembo", "Bosch", "TRW", "Ferodo", "ATE"] },
  { name: "Süspansiyon & Direksiyon",   count: "38+ Marka", brands: ["Monroe", "Sachs", "KYB", "Lemförder", "SKF"] },
  { name: "Motor, Ateşleme & Elektrik", count: "52+ Marka", brands: ["Bosch", "Denso", "NGK", "Gates", "INA"] },
  { name: "Rulman & Transmisyon",        count: "28+ Marka", brands: ["FAG", "SKF", "LUK", "ContiTech", "GKN"] },
  { name: "Filtre & Periyodik Bakım",    count: "30+ Marka", brands: ["Mann+Hummel", "Mahle", "Filtron", "Hengst", "UFI"] },
  { name: "Kaporta & Aydınlatma",        count: "35+ Marka", brands: ["Valeo", "Hella", "Osram", "Philips", "Depo"] },
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
    <div className="shrink-0 w-44 h-28 bg-white rounded-xl border border-slate-200 flex items-center justify-center px-5 shadow-sm hover:shadow-md hover:border-[#1B3A8F]/25 transition-all duration-300">
      <img
        src={`/images/brands/${slug}.png`}
        alt={slug}
        className="max-h-14 max-w-[120px] w-auto object-contain grayscale hover:grayscale-0 transition-all duration-400"
      />
    </div>
  );
}

export function TedarikciPage() {
  return (
    <div className="do-site bg-white min-h-screen">
      <style>{MARQUEE_CSS}</style>
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
          <div className="bm-wrap py-2">
            <div className="bm-track ltr pl-4">
              {[...ROW1, ...ROW1].map((b, i) => <BrandCard key={i} slug={b} />)}
            </div>
          </div>
          <div className="bm-wrap py-2">
            <div className="bm-track rtl pl-4">
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
              <div key={cat.name} className="bg-white border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/40 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{cat.name}</h3>
                  <span className="shrink-0 ml-3 text-[11px] font-bold text-[#1B3A8F] bg-[#1B3A8F]/[0.08] border border-[#1B3A8F]/[0.15] px-2.5 py-1 rounded">{cat.count}</span>
                </div>
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
              <div key={title} className="flex gap-6 border border-slate-200 rounded-xl p-8 hover:border-[#1B3A8F]/30 hover:shadow-lg transition-all group">
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

      {/* CTA — dark */}
      <section className="relative bg-[#0e1016] text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0e1016]/85" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Stok Sorgulama ve Sipariş için B2B Portal</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-[16px] font-light">Anlık stok durumu, fiyat listesi ve sipariş yönetimi; B2B portalımız üzerinden 7/24 erişilebilir.</p>
          <button className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-10 py-4 rounded-md transition-colors inline-flex items-center gap-2 shadow-[0_0_32px_rgba(27,58,143,0.3)]">
            Portala Giriş Yapın <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

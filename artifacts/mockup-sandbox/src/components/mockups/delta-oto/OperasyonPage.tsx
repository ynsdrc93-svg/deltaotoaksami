import React from "react";
import { ArrowRight, Truck, Shield, Zap, Network, ChevronRight } from "lucide-react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  .do-page { font-family: 'Inter', sans-serif; }
  .do-grid-bg {
    background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .do-hero-line {
    background: linear-gradient(90deg, #fff 60%, rgba(255,255,255,0.55));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NAV = ["Hakkımızda", "Tedarikçiler", "Operasyon ve Lojistik", "Kariyer", "İletişim"];

const OPS_FEATURES = [
  { icon: Truck, title: "Ulusal Dağıtım Kapasitesi", desc: "Ümraniye merkez depo ve Opar Ege bölge operasyonuyla Türkiye'nin 81 iline düzenli ve güvenilir teslimat gerçekleştirilir." },
  { icon: Zap, title: "Öncelikli Sipariş Karşılama", desc: "B2B portalı üzerinden iletilen acil talepler öncelik sıralamasına alınır; stokta olan kritik siparişler aynı gün sevk edilir." },
  { icon: Shield, title: "WMS Destekli Depo Yönetimi", desc: "Ambar yönetim sistemiyle stok doğruluğu ve sipariş hazırlık süresi üst düzeyde korunur; hata payı minimize edilir." },
  { icon: Network, title: "İhracat ve Bölgesel Erişim", desc: "Groupauto International kanalları aracılığıyla Türkiye dışındaki pazarlara ürün ihracatı gerçekleştirilmektedir." },
];

const PROCESS = [
  { num: "01", title: "Talep İletimi", desc: "B2B portalı veya yetkili satış kanalı aracılığıyla sipariş oluşturulur." },
  { num: "02", title: "Stok Doğrulama", desc: "Anlık envanter sistemi üzerinden ürün varlığı teyit edilir; alternatif gerekiyorsa önerilir." },
  { num: "03", title: "Sipariş Hazırlığı", desc: "WMS talimatıyla depo personeli sevkiyat hazırlığını başlatır." },
  { num: "04", title: "Sevk & Teslimat", desc: "Anlaşmalı lojistik partnerleri aracılığıyla hedef ile yönlendirilir." },
];

export default function OperasyonPage() {
  return (
    <div className="do-page bg-white min-h-screen">
      <style>{CSS}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="#" className="shrink-0">
              <img src="/images/delta-oto-logo.png" alt="Delta Oto 50. Yıl" className="h-16 w-auto" />
            </a>
            <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-slate-600">
              {NAV.map(l => (
                <a key={l} href="#" className={`hover:text-[#1B3A8F] transition-colors whitespace-nowrap ${l === "Operasyon ve Lojistik" ? "text-[#1B3A8F] font-semibold border-b-2 border-[#1B3A8F] pb-0.5" : ""}`}>{l}</a>
              ))}
            </nav>
          </div>
          <a href="#" className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[13px] font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center gap-1.5 group">
            B2B Portal <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </header>

      {/* HERO — dark + warehouse image */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-30"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-28">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Lojistik & Operasyon Altyapısı</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="do-hero-line">81 İLE</span><br />
            <span className="text-white">KESİNTİSİZ</span><br />
            <span className="text-[#7d9bea]">TEDARİK GÜCÜ</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
            Ümraniye merkez depo ve Opar Ege bölge operasyonuyla desteklenen lojistik ağımız; sipariş hazırlıktan son mile kadar her aşamada performans ve güvenilirlik standartlarını korur.
          </p>
          <div className="flex flex-wrap gap-5">
            {[["81", "İl", "Türkiye geneli teslimat"], ["50.000+", "SKU", "Sürekli stok derinliği"], ["Aynı Gün", "Sevkiyat", "Kritik siparişler için"]].map(([n, l, d]) => (
              <div key={l} className="border border-white/15 rounded-xl px-6 py-4 bg-white/5">
                <div className="text-2xl font-black text-white">{n}</div>
                <div className="text-[12px] font-bold text-[#7d9bea] uppercase tracking-wide mt-0.5">{l}</div>
                <div className="text-[11px] text-gray-400 mt-1">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERASYONEL GÜÇLER — light */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Lojistik Altyapı</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Operasyonel Yetkinliklerimiz</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">Her operasyonel süreç, müşteri teslimat deneyimini optimize etmek amacıyla yapılandırılmıştır.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {OPS_FEATURES.map((f) => (
              <div key={f.title} className="flex gap-6 p-7 rounded-xl border border-slate-200 hover:border-[#1B3A8F]/30 hover:shadow-lg transition-all">
                <div className="shrink-0 w-12 h-12 bg-[#1B3A8F]/8 rounded-xl flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-[#1B3A8F]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-snug">{f.title}</h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SİPARİŞ SÜRECİ — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">İş Akışı</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Siparişten Teslimata İş Akışı</h2>
            <p className="text-white/60 mt-3 max-w-xl text-[15px]">Standartlaştırılmış dört aşamalı süreç; her siparişte öngörülebilir ve şeffaf bir deneyim sağlar.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS.map((s, i) => (
              <div key={s.num} className="relative">
                <div className="text-6xl font-black text-white/10 mb-4 leading-none">{s.num}</div>
                <h3 className="text-[15px] font-bold mb-2 leading-snug">{s.title}</h3>
                <p className="text-white/60 text-[13.5px] leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-white/20">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPART — dark + image */}
      <section className="relative bg-[#0e1016] text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0e1016]/80" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">Dağıtım Markası</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-5">SPART Original Replacement</h2>
            <p className="text-gray-300 leading-[1.85] max-w-lg text-[15.5px]">
              SPART, Delta Oto'nun kendi dağıtım markasıdır. OEM eşdeğeri kalite standartlarını rekabetçi fiyat yapısıyla bir araya getirir. Fren, süspansiyon, motor ve kaporta kategorilerinde geniş SKU gamı mevcuttur.
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center w-56 h-28 rounded-xl bg-white/5 border border-white/10">
            <img src="/images/spart-logo.png" alt="SPART" className="h-14 w-auto" onError={(e) => { (e.target as HTMLImageElement).parentElement!.querySelector('span')!.style.display='block'; (e.target as HTMLImageElement).style.display='none'; }} />
            <span className="text-white/30 text-sm font-medium hidden">SPART</span>
          </div>
        </div>
      </section>

      <footer className="bg-[#060810] text-white py-14 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <img src="/images/delta-oto-logo.png" alt="Delta Oto" className="h-12 mx-auto mb-5 brightness-0 invert opacity-70" />
          <p className="text-gray-500 text-sm">© 2026 Delta Oto A.Ş. — Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

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
`;

const NAV_LINKS = ["Hakkımızda", "Tedarikçiler", "Operasyon ve Lojistik", "Kariyer", "İletişim"];

const METRICS = [
  { value: "81", unit: "İl", desc: "Türkiye'nin tüm illerine teslimat" },
  { value: "50.000+", unit: "SKU", desc: "Sürekli stokta tutulan ürün" },
  { value: "Aynı Gün", unit: "Teslimat", desc: "Kritik siparişlerde aynı gün karşılama" },
  { value: "2", unit: "Depo", desc: "Ümraniye merkez + Opar Ege bölge" },
];

const OPS_FEATURES = [
  { icon: Truck, title: "Geniş Dağıtım Ağı", desc: "İstanbul çıkışlı merkez depodan 81 ile servis. Bölgesel dağıtım için Ege'de Opar bayiliği ile destek." },
  { icon: Zap, title: "Hızlı Sipariş Karşılama", desc: "B2B portalı üzerinden verilen siparişler öncelik sırasına göre işleme alınır. Kritik siparişler aynı gün sevk edilir." },
  { icon: Shield, title: "Depo Yönetimi", desc: "WMS destekli depo yönetimi ile stok doğruluğu ve sipariş karşılama hızı üst seviyede tutulur." },
  { icon: Network, title: "İhracat Kanalı", desc: "Türkiye dışındaki pazarlara Groupauto International kanalları aracılığıyla ihracat gerçekleştiriyoruz." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Sipariş", desc: "B2B portalı veya telefon üzerinden sipariş oluşturulur." },
  { num: "02", title: "Stok Kontrolü", desc: "Anlık stok bilgisi ile ürün onaylanır veya alternatif önerilir." },
  { num: "03", title: "Hazırlık", desc: "WMS sistemi ile depo personeli siparişi hazırlar." },
  { num: "04", title: "Sevk", desc: "Anlaşmalı kargo ve kurye ağı ile ilgili ile yönlendirilir." },
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
              {NAV_LINKS.map(l => (
                <a key={l} href="#" className={`hover:text-[#1B3A8F] transition-colors whitespace-nowrap ${l === "Operasyon ve Lojistik" ? "text-[#1B3A8F] font-semibold" : ""}`}>{l}</a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[13px] font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center gap-1.5 group">
              B2B Portal <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO — dark */}
      <section className="relative bg-[#0e1016] text-white py-28 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-50" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Lojistik & Operasyon</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="text-white">81 İLDE</span><br />
            <span className="text-[#7d9bea]">KESİNTİSİZ TEDARİK</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.75] max-w-2xl mb-10 font-light">
            Ümraniye merkez depo ve Opar Ege bölge operasyonuyla Türkiye'nin her iline hızlı, güvenilir teslimat sağlıyoruz. Depo yönetiminden son mile kadar her adım optimize edilmiştir.
          </p>
          <div className="flex flex-wrap gap-4">
            {METRICS.map((m) => (
              <div key={m.unit} className="border border-white/15 rounded-xl px-6 py-4 bg-white/5">
                <div className="text-2xl font-black text-white">{m.value}</div>
                <div className="text-[12px] font-bold text-[#7d9bea] uppercase tracking-wide mt-0.5">{m.unit}</div>
                <div className="text-[12px] text-gray-400 mt-1">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÖZELLİKLER — light */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Altyapı</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Operasyonel Güçlerimiz</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {OPS_FEATURES.map((f) => (
              <div key={f.title} className="flex gap-6 p-7 rounded-xl border border-slate-200 hover:border-[#1B3A8F]/30 hover:shadow-lg transition-all">
                <div className="shrink-0 w-12 h-12 bg-[#1B3A8F]/8 rounded-xl flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-[#1B3A8F]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
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
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Süreç</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Siparişten Teslimata</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((s) => (
              <div key={s.num} className="relative">
                <div className="text-5xl font-black text-white/15 mb-4">{s.num}</div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-white/65 text-[14px] leading-relaxed">{s.desc}</p>
                {s.num !== "04" && (
                  <div className="hidden md:block absolute top-10 -right-3 text-white/20">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPART — dark */}
      <section className="bg-[#0e1016] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">Markamız</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">SPART Original Replacement</h2>
            <p className="text-gray-300 leading-[1.8] max-w-lg text-[16px]">
              SPART, Delta Oto'nun kendi dağıtım markasıdır. OEM kalite eşdeğeri ürünleri rekabetçi fiyatla sunar. Branda, motor, fren ve süspansiyon kategorilerinde geniş SKU gamı mevcuttur.
            </p>
          </div>
          <div className="shrink-0">
            <img src="/images/spart-logo.png" alt="SPART" className="h-20 w-auto" onError={(e) => {(e.target as HTMLImageElement).style.display='none'}} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060810] text-white py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <img src="/images/delta-oto-logo.png" alt="Delta Oto" className="h-12 mx-auto mb-6 brightness-0 invert opacity-70" />
          <p className="text-gray-500 text-sm">© 2026 Delta Oto A.Ş. — Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

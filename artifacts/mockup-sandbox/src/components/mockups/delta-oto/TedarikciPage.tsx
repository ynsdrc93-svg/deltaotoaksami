import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

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

const CATEGORIES = [
  { name: "Fren Sistemleri", count: "45+ Marka", brands: ["Brembo", "ATE", "Bosch", "TRW", "Ferodo"] },
  { name: "Süspansiyon & Direksiyon", count: "38+ Marka", brands: ["Monroe", "Bilstein", "KYB", "Sachs", "Lemförder"] },
  { name: "Motor & Elektrik", count: "52+ Marka", brands: ["Bosch", "Denso", "NGK", "Gates", "INA"] },
  { name: "Egzoz & Emisyon", count: "22+ Marka", brands: ["Walker", "Bosal", "Eberspächer", "Vegaz", "Klarius"] },
  { name: "Filtre & Bakım", count: "30+ Marka", brands: ["Mann+Hummel", "Mahle", "Hengst", "Sogefi", "UFI"] },
  { name: "Kaporta & Aydınlatma", count: "35+ Marka", brands: ["Valeo", "Hella", "Osram", "Magneti Marelli", "Depo"] },
];

const ADVANTAGES = [
  { title: "Geniş Ürün Gamı", desc: "250'den fazla markanın, 50.000+ SKU içeren stoğuna tek sipariş noktasından ulaşın." },
  { title: "Groupauto Ayrıcalığı", desc: "Groupauto International üyeliği sayesinde global tedarik avantajlarından yararlanın." },
  { title: "OEM Kalitesi", desc: "Yalnızca orijinal ve OEM kalite eşdeğeri ürün kategorileri satıyoruz. Güvenceyi biz veriyoruz." },
  { title: "Hızlı Güncelleme", desc: "Yeni modeller ve yeni markalar kataloga eklenir. Güncel ürün bilgisi için B2B portalımız her zaman açık." },
];

export default function TedarikciPage() {
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
                <a key={l} href="#" className={`hover:text-[#1B3A8F] transition-colors whitespace-nowrap ${l === "Tedarikçiler" ? "text-[#1B3A8F] font-semibold" : ""}`}>{l}</a>
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
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Ürün Portföyü</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="text-white">250+ MARKA,</span><br />
            <span className="text-[#7d9bea]">TEK ÇATI ALTINDA</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.75] max-w-2xl mb-10 font-light">
            Binek ve hafif ticari araç yedek parça kategorilerinde Avrupa ve dünya markalarını tek çatı altında sunuyoruz. Geniş stok, anlık erişim, güvenilir teslimat.
          </p>
          <div className="flex flex-wrap gap-6 mt-6">
            {[["250+", "Aktif Marka"], ["50.000+", "SKU"], ["Tümü", "OEM Kalite"]].map(([n, l]) => (
              <div key={l} className="border border-white/15 rounded-xl px-6 py-4">
                <div className="text-3xl font-black text-white">{n}</div>
                <div className="text-[13px] text-gray-400 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KATEGORİLER — light */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Ürün Kategorileri</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Geniş Portföy, Derin Stok</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">
              Her kategoride birden fazla marka seçeneği sunar; müşterilerimiz ihtiyaçlarına göre ürün tercih esnekliği yaşar.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/40 hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
                  <span className="text-xs font-bold text-[#1B3A8F] bg-[#1B3A8F]/8 border border-[#1B3A8F]/15 px-2.5 py-1 rounded">{cat.count}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.brands.map(b => (
                    <span key={b} className="text-[12px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">{b}</span>
                  ))}
                  <span className="text-[12px] text-[#1B3A8F] font-medium px-2.5 py-1">+daha fazla</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANTAJLAR — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Neden Delta Oto?</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Tedarikçi Avantajlarımız</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="bg-white/10 backdrop-blur border border-white/15 rounded-xl p-8 hover:bg-white/15 transition-colors">
                <h3 className="text-lg font-bold mb-3">{a.title}</h3>
                <p className="text-white/70 text-[14px] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="bg-[#0e1016] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Stok ve Fiyat Bilgisi için B2B Portal</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-[16px]">Portalımız üzerinden anlık stok sorgusu yapabilir, sipariş oluşturabilirsiniz.</p>
          <button className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-10 py-4 rounded-md transition-colors flex items-center gap-2 mx-auto">
            B2B Portala Giriş <ChevronRight className="w-5 h-5" />
          </button>
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

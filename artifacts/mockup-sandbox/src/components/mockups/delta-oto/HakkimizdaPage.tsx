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

const MILESTONES = [
  { year: "1976", label: "Kuruluş", desc: "Ümraniye'de küçük bir depo ve büyük bir vizyonla sektöre girdi." },
  { year: "1990", label: "Bölgesel Büyüme", desc: "Ürün gamı genişledi, İstanbul'un lider distribütörlerinden biri oldu." },
  { year: "2005", label: "Groupauto Üyeliği", desc: "Avrupa'nın en büyük bağımsız yedek parça ağına katıldı." },
  { year: "2015", label: "81 İle Erişim", desc: "Lojistik ağı Türkiye'nin tümüne yayıldı, ihracat başladı." },
  { year: "2026", label: "50. Yıl", desc: "250+ marka, binlerce müşteri ve kesintisiz bir büyüme ivmesiyle yarım asır." },
];

const VALUES = [
  { title: "Güvenilirlik", desc: "50 yıldır söz verdiğimizi yerine getiririz. Tedarik zincirinde güven, pazarın temelidir." },
  { title: "Kalite", desc: "Sattığımız her ürün, denetimli tedarik kanallarından geçer. Sahtecilik sıfır toleranstır." },
  { title: "Hız", desc: "Siparişleri zamanında teslim etmek müşteri başarısının ön koşuludur; lojistiğimizi bu ilke üzerine kurduk." },
  { title: "Büyüme", desc: "Müşterilerimizin büyümesi bizim büyümemizdir; onların rekabet gücünü artırmak için çalışırız." },
];

export default function HakkimizdaPage() {
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
                <a key={l} href="#" className={`hover:text-[#1B3A8F] transition-colors whitespace-nowrap ${l === "Hakkımızda" ? "text-[#1B3A8F] font-semibold" : ""}`}>{l}</a>
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
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kuruluş 1976 · Delta Oto</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="text-white">YARIM ASIRLIK</span><br />
            <span className="text-[#7d9bea]">BÜYÜME HİKAYESİ</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.75] max-w-2xl mb-10 font-light">
            1976'da Ümraniye'de atılan adım, bugün 250'den fazla marka ve Türkiye genelinde güçlü bir lojistik ağa dönüştü. Delta Oto, bağımsız aftermarket sektörünün kurucu güçlerinden biridir.
          </p>
          <button className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md flex items-center gap-2.5 group transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)]">
            Operasyon Gücümüzü İnceleyin <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ZAMAN ÇİZGİSİ — light */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Tarihçe</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">50 Yıllık Kilometre Taşları</h2>
          </div>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-[2px] bg-slate-200" />
            <div className="space-y-10">
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex items-start gap-8">
                  <div className="shrink-0 w-32 text-right">
                    <span className="text-2xl font-black text-[#1B3A8F]">{m.year}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[25px] top-2 w-3 h-3 rounded-full bg-[#1B3A8F] border-2 border-white shadow" />
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{m.label}</h3>
                    <p className="text-slate-500 text-[15px] leading-relaxed max-w-xl">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEĞERLER — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">İlkelerimiz</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Temel Değerlerimiz</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white/10 backdrop-blur border border-white/15 rounded-xl p-8 hover:bg-white/15 transition-colors">
                <h3 className="text-lg font-bold mb-3">{v.title}</h3>
                <p className="text-white/70 text-[14px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROUPAUTO — dark */}
      <section className="bg-[#0e1016] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">Küresel Ağ</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Groupauto Üyesiyiz</h2>
            <p className="text-gray-300 leading-[1.8] text-[16px] mb-8 max-w-lg">
              Avrupa'nın en büyük bağımsız yedek parça distribütörleri ağı Groupauto International'ın Türkiye üyesi olarak, 40'tan fazla ülkedeki tedarik ağına erişiyoruz. Bu üyelik, ürün çeşitliliğimizi ve fiyat rekabetçiliğimizi doğrudan güçlendiriyor.
            </p>
            <div className="flex gap-8">
              {[["40+", "Ülke"], ["3.000+", "Üye"], ["Top 5", "Tedarikçi Erişimi"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-black text-white">{n}</div>
                  <div className="text-[13px] text-gray-400 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-80 h-56 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-white/30 text-sm">Groupauto Ağ Haritası</span>
            </div>
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

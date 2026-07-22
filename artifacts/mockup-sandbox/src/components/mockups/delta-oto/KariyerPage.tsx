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

const CULTURE_VALUES = [
  { title: "Sonuç Odaklılık", desc: "Hedefleri zamanında ve nitelikli biçimde gerçekleştirmek temel beklentimizdir." },
  { title: "Takım Ruhu", desc: "Bireysel başarı takım başarısının temelidir; iş birliğini her zaman öne alırız." },
  { title: "Sürekli Gelişim", desc: "Sektör bilgisini güncel tutmak için eğitim ve gelişim fırsatları sunuyoruz." },
  { title: "Dürüstlük", desc: "Müşterilerimize, tedarikçilerimize ve birbirimize karşı şeffaf ve dürüst ilişki kuruyoruz." },
];

const OPEN_POSITIONS = [
  { title: "Satış Uzmanı — İç Piyasa", dept: "Satış", type: "Tam Zamanlı", location: "Ümraniye, İstanbul" },
  { title: "Tedarik Zinciri Analisti", dept: "Operasyon", type: "Tam Zamanlı", location: "Ümraniye, İstanbul" },
  { title: "Depo ve Lojistik Sorumlusu", dept: "Lojistik", type: "Tam Zamanlı", location: "Ümraniye, İstanbul" },
  { title: "Ürün Yöneticisi — Aftermarket", dept: "Ürün", type: "Tam Zamanlı", location: "Ümraniye, İstanbul" },
  { title: "Yazılım Geliştirici (Full Stack)", dept: "Teknoloji", type: "Tam Zamanlı / Hibrit", location: "İstanbul" },
  { title: "Müşteri Hizmetleri Uzmanı", dept: "Müşteri Deneyimi", type: "Tam Zamanlı", location: "Ümraniye, İstanbul" },
];

const BENEFITS = [
  "Özel sağlık sigortası",
  "Yemek kartı",
  "Sektörel eğitim desteği",
  "Esnek çalışma saatleri (pozisyona göre)",
  "Yıllık gelişim görüşmesi",
  "Ulaşım desteği",
];

export default function KariyerPage() {
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
                <a key={l} href="#" className={`hover:text-[#1B3A8F] transition-colors whitespace-nowrap ${l === "Kariyer" ? "text-[#1B3A8F] font-semibold" : ""}`}>{l}</a>
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
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">İnsan Kaynakları</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="text-white">GELECEĞİ</span><br />
            <span className="text-[#7d9bea]">BİZİMLE İNŞA ET</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.75] max-w-2xl mb-10 font-light">
            50 yıllık büyüme hikayemizin bir parçası olun. Delta Oto'da çalışmak; güçlü bir sektör bilgisi kazanmak, dinamik bir ekibin içinde yer almak ve kalıcı kariyer fırsatları yaratmak anlamına gelir.
          </p>
          <button className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md flex items-center gap-2.5 group transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)]">
            Açık Pozisyonlara Bak <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ŞİRKET KÜLTÜRÜ — light */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Kültür</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Çalışma Kültürümüz</h2>
            <p className="text-slate-500 mt-3 text-[15px] max-w-xl">
              Delta Oto'da başarı bireysel değil, kolektiftir. Sonuç odaklı, dürüst ve gelişime açık bir yapı içinde çalışıyoruz.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CULTURE_VALUES.map((v) => (
              <div key={v.title} className="border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-500 text-[14px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AÇIK POZİSYONLAR — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Fırsatlar</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Açık Pozisyonlar</h2>
          </div>
          <div className="space-y-3">
            {OPEN_POSITIONS.map((pos) => (
              <div key={pos.title} className="bg-white/10 backdrop-blur border border-white/15 rounded-xl px-7 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/15 transition-colors group cursor-pointer">
                <div>
                  <h3 className="text-base font-bold">{pos.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[12px] text-[#7d9bea] font-medium">{pos.dept}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-[12px] text-white/60">{pos.location}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-[12px] text-white/60">{pos.type}</span>
                  </div>
                </div>
                <button className="shrink-0 text-[13px] font-semibold border border-white/30 px-4 py-2 rounded-lg hover:bg-white hover:text-[#1B3A8F] transition-colors flex items-center gap-1.5">
                  Başvur <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YAN HAKLAR — dark */}
      <section className="bg-[#0e1016] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">Yan Haklar</span>
            <h2 className="text-3xl font-black tracking-tight">Çalışan Avantajları</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7d9bea] shrink-0" />
                <span className="text-[14px] text-gray-300">{b}</span>
              </div>
            ))}
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

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
  .do-hero-line {
    background: linear-gradient(90deg, #fff 60%, rgba(255,255,255,0.55));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NAV = ["Hakkımızda", "Tedarikçiler", "Operasyon ve Lojistik", "Kariyer", "İletişim"];

const MILESTONES = [
  { year: "1976", label: "Kuruluş", desc: "Ümraniye'de temelleri atılan şirket, otomotiv aftermarket sektörünün kurucu distribütörleri arasında yerini aldı." },
  { year: "1990", label: "Portföy Genişlemesi", desc: "Tedarik ağının derinleşmesiyle birlikte İstanbul bölgesinde lider distribütör konumuna ulaşıldı." },
  { year: "2005", label: "Groupauto International Üyeliği", desc: "Avrupa merkezli bağımsız aftermarket ağına tam üye olunarak küresel tedarik kanallarına erişim sağlandı." },
  { year: "2015", label: "Ulusal Lojistik Ağı", desc: "Türkiye'nin 81 iline kesintisiz teslimat kapasitesi kuruldu; ihracat operasyonu faaliyete geçti." },
  { year: "2026", label: "50. Kuruluş Yılı", desc: "250'den fazla aktif marka, binlerce müşteri ilişkisi ve yarım asrın birikimiyle sektördeki yerini pekiştiriyor." },
];

const VALUES = [
  { title: "Kurumsal Güvenilirlik", desc: "Ticari ilişkilerde öngörülebilirlik ve taahhüt bütünlüğü, Delta Oto'nun temel kurumsal kimliğini oluşturur." },
  { title: "Ürün Kalite Güvencesi", desc: "Portföydeki her marka, denetimli kaynak doğrulamasından geçer. Kayıt dışı ürün sıfır toleranstır." },
  { title: "Operasyonel Mükemmellik", desc: "Siparişten teslimata uzanan sürecin her halkasında performans standardı titizlikle korunur." },
  { title: "Sürdürülebilir Büyüme", desc: "Müşteri portföyünün rekabet gücünü artırmak, Delta Oto'nun uzun vadeli büyüme stratejisinin merkezindedir." },
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
              {NAV.map(l => (
                <a key={l} href="#" className={`hover:text-[#1B3A8F] transition-colors whitespace-nowrap ${l === "Hakkımızda" ? "text-[#1B3A8F] font-semibold border-b-2 border-[#1B3A8F] pb-0.5" : ""}`}>{l}</a>
              ))}
            </nav>
          </div>
          <a href="#" className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[13px] font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center gap-1.5 group">
            B2B Portal <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </header>

      {/* HERO — dark + background image */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-25"
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
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kuruluş 1976 · Delta Oto</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="do-hero-line">YARIM ASRIN</span><br />
            <span className="text-white">KURUMSAL</span><br />
            <span className="text-[#7d9bea]">BİRİKİMİ</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
            1976'dan bu yana otomotiv yedek parça dağıtım sektöründe faaliyet gösteren Delta Oto; güçlü tedarik altyapısı, geniş marka portföyü ve Groupauto International üyeliğiyle sektörün yapıcı güçlerinden biri olmaya devam etmektedir.
          </p>
          <button className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md flex items-center gap-2.5 group transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] hover:shadow-[0_0_48px_rgba(27,58,143,0.45)]">
            Operasyon Altyapımızı İnceleyin <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ZAMAN ÇİZGİSİ — light */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Kurumsal Tarihçe</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">50 Yıllık Gelişim Süreci</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">Kuruluştan bugüne kat edilen mesafe; stratejik kararların, güçlü ortaklıkların ve disiplinli operasyonun bir ürünüdür.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-10">
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex items-start gap-10">
                  <div className="shrink-0 w-28 text-right">
                    <span className="text-2xl font-black text-[#1B3A8F]">{m.year}</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="absolute -left-[1.65rem] top-2.5 w-3 h-3 rounded-full bg-[#1B3A8F] border-2 border-white shadow" />
                    <h3 className="text-[16px] font-bold text-slate-900 mb-1.5">{m.label}</h3>
                    <p className="text-slate-500 text-[14px] leading-relaxed max-w-2xl">{m.desc}</p>
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
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Kurumsal İlkeler</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Değer Çerçevemiz</h2>
            <p className="text-white/60 mt-3 max-w-xl text-[15px]">50 yıllık deneyim, dört temel kurumsal ilke üzerine inşa edilmiştir.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white/8 backdrop-blur border border-white/12 rounded-xl p-8 hover:bg-white/14 transition-colors">
                <h3 className="text-[15px] font-bold mb-3 leading-snug">{v.title}</h3>
                <p className="text-white/65 text-[13.5px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROUPAUTO — dark + image */}
      <section className="relative bg-[#0e1016] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0e1016]/80" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">Uluslararası Ağ</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Groupauto International Üyesi</h2>
            <p className="text-gray-300 leading-[1.85] text-[15.5px] mb-8 max-w-lg">
              Avrupa merkezli Groupauto International ağının Türkiye üyesi sıfatıyla, 40'tan fazla ülkedeki distribütörler ve üreticilerle doğrudan bağlantı içindeyiz. Bu üyelik; ürün erişimini, tedarik koşullarını ve piyasa bilgisini rakiplerimizin önünde konumlandırır.
            </p>
            <div className="flex gap-10">
              {[["40+", "Ülke"], ["3.000+", "Üye Firma"], ["Top Tier", "Tedarikçi Erişimi"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-black text-white">{n}</div>
                  <div className="text-[12px] text-gray-400 mt-1 uppercase tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-80 h-52 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-white/25 text-sm font-medium">Groupauto Ağ Görseli</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060810] text-white py-14 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <img src="/images/delta-oto-logo.png" alt="Delta Oto" className="h-12 mx-auto mb-5 brightness-0 invert opacity-70" />
          <p className="text-gray-500 text-sm">© 2026 Delta Oto A.Ş. — Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

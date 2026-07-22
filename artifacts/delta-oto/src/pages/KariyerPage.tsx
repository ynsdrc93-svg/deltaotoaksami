import React from "react";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const CULTURE = [
  { title: "Performans Odaklılık", desc: "Sonuçlar ve taahhüt bütünlüğü temel değerlendirme kriterleridir. Hedefler netleştirilir, takip edilir ve gerçekleştirilir." },
  { title: "Kolektif Başarı", desc: "Bireysel yetkinlik, takım dinamikleriyle pekiştirilir. Bilgi paylaşımı ve iş birliği kurumsal kültürün temel bileşenidir." },
  { title: "Sürekli Yetkinlik Gelişimi", desc: "Sektör bilgisini güncel tutmak için eğitim programları, mentorluk ve konferans katılım desteği sunulmaktadır." },
  { title: "Kurumsal Dürüstlük", desc: "Müşterilerimize, tedarikçilerimize ve birbirimize karşı şeffaf, tutarlı ve dürüst ilişki standartları korunur." },
];

const POSITIONS = [
  { title: "Satış Uzmanı — Yurt İçi Piyasa", dept: "Satış & Müşteri Yönetimi", type: "Tam Zamanlı", loc: "Ümraniye, İstanbul" },
  { title: "Tedarik Zinciri Analisti", dept: "Operasyon & Planlama", type: "Tam Zamanlı", loc: "Ümraniye, İstanbul" },
  { title: "Depo ve Lojistik Sorumlusu", dept: "Depo Operasyonları", type: "Tam Zamanlı", loc: "Ümraniye, İstanbul" },
  { title: "Ürün Yöneticisi — Aftermarket", dept: "Ürün & Portföy", type: "Tam Zamanlı", loc: "Ümraniye, İstanbul" },
  { title: "Yazılım Geliştirici (Full Stack)", dept: "Teknoloji & Dijital", type: "Tam Zamanlı / Hibrit", loc: "İstanbul" },
  { title: "Müşteri Deneyimi Uzmanı", dept: "Müşteri İlişkileri", type: "Tam Zamanlı", loc: "Ümraniye, İstanbul" },
];

const BENEFITS = [
  "Özel sağlık sigortası",
  "Yemek kartı katkısı",
  "Sektörel eğitim ve gelişim bütçesi",
  "Esnek çalışma saatleri (pozisyona göre)",
  "Yıllık performans ve kariyer görüşmesi",
  "Ulaşım desteği",
];

export function KariyerPage() {
  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-28">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">İnsan Kaynakları · Kariyer Fırsatları</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="do-hero-line">GELECEĞİ</span><br />
            <span className="text-white">BİZİMLE</span><br />
            <span className="text-[#7d9bea]">İNŞA EDİN</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
            50 yıllık kurumsal birikimin parçası olun. Delta Oto'da kariyer; güçlü sektör yetkinliği, dinamik bir ekip yapısı ve uzun vadeli profesyonel gelişim fırsatı anlamına gelir.
          </p>
          <button className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group">
            Açık Pozisyonları İnceleyin <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* KÜLTÜR — light */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Çalışma Kültürü</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Kurumsal Kültür Değerlerimiz</h2>
            <p className="text-slate-500 mt-3 text-[15px] max-w-2xl">Delta Oto'da başarı bireysel değil, kolektiftir. Sonuç odaklı, dürüst ve gelişime açık kurumsal kültür içinde çalışıyoruz.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CULTURE.map((v) => (
              <div key={v.title} className="border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-lg transition-all">
                <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-snug">{v.title}</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POZİSYONLAR — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Açık Pozisyonlar</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Kariyer Fırsatları</h2>
            <p className="text-white/60 mt-3 max-w-xl text-[15px]">Ekibimize katılmak için size uygun pozisyonu inceleyin ve başvurun.</p>
          </div>
          <div className="space-y-3">
            {POSITIONS.map((p) => (
              <div key={p.title} className="bg-white/[0.08] border border-white/[0.12] rounded-xl px-7 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.14] transition-colors group cursor-pointer">
                <div>
                  <h3 className="text-[15px] font-bold leading-snug">{p.title}</h3>
                  <div className="flex items-center flex-wrap gap-2 mt-1.5">
                    <span className="text-[12px] text-[#7d9bea] font-semibold">{p.dept}</span>
                    <span className="text-white/25">·</span>
                    <span className="text-[12px] text-white/55">{p.loc}</span>
                    <span className="text-white/25">·</span>
                    <span className="text-[12px] text-white/55">{p.type}</span>
                  </div>
                </div>
                <button className="shrink-0 text-[13px] font-semibold border border-white/25 px-4 py-2 rounded-lg hover:bg-white hover:text-[#1B3A8F] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                  Başvurun <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YAN HAKLAR — dark */}
      <section className="relative bg-[#0e1016] text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0e1016]/80" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">Çalışan Avantajları</span>
            <h2 className="text-3xl font-black tracking-tight">Yan Haklar ve İmkânlar</h2>
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

      <SiteFooter />
    </div>
  );
}

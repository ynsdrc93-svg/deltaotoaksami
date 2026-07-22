import React from "react";
import { ChevronRight, Quote } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const CULTURE = [
  { title: "Performans Odaklılık", desc: "Sonuçlar ve taahhüt bütünlüğü temel değerlendirme kriterleridir. Hedefler netleştirilir, takip edilir ve gerçekleştirilir." },
  { title: "Kolektif Başarı", desc: "Bireysel yetkinlik, takım dinamikleriyle pekiştirilir. Bilgi paylaşımı ve iş birliği kurumsal kültürün temel bileşenidir." },
  { title: "Sürekli Yetkinlik Gelişimi", desc: "Sektör bilgisini güncel tutmak için eğitim programları, mentorluk ve konferans katılım desteği sunulmaktadır." },
  { title: "Kurumsal Dürüstlük", desc: "Müşterilere, tedarikçilere ve birbirimize karşı şeffaf, tutarlı ve dürüst ilişki standartları istisnasız korunur." },
];

const TESTIMONIALS = [
  { quote: "Delta Oto'da geçen yıllar, sektörün derinliklerini keşfetmemi sağladı. Hem ürün bilgisi hem de ticari ilişki yönetimi açısından kendimi buraya borçluyum.", name: "Satış & Müşteri Yönetimi", yrs: "9 Yıl" },
  { quote: "Lojistik ve tedarik zinciri alanında sıfırdan öğrenmek için doğru adres. Ekip olarak hedeflerimizi paylaşıyor, başarıyı birlikte inşa ediyoruz.", name: "Operasyon & Planlama", yrs: "5 Yıl" },
  { quote: "Ürün portföyünü yönetmek; hem teknik hem de stratejik yetkinlik gerektiriyor. Delta Oto bu ikisini bir arada geliştirme fırsatı sunuyor.", name: "Ürün & Portföy Yönetimi", yrs: "7 Yıl" },
];

const DEPARTMENTS = [
  {
    dept: "Satış & Müşteri Yönetimi",
    positions: [
      { title: "Satış Uzmanı — Yurt İçi Piyasa", type: "Tam Zamanlı", loc: "Ümraniye, İstanbul" },
      { title: "Müşteri Deneyimi Uzmanı",          type: "Tam Zamanlı", loc: "Ümraniye, İstanbul" },
    ],
  },
  {
    dept: "Operasyon & Planlama",
    positions: [
      { title: "Tedarik Zinciri Analisti",         type: "Tam Zamanlı", loc: "Ümraniye, İstanbul" },
      { title: "Depo ve Lojistik Sorumlusu",        type: "Tam Zamanlı", loc: "Ümraniye, İstanbul" },
    ],
  },
  {
    dept: "Ürün & Portföy",
    positions: [
      { title: "Ürün Yöneticisi — Aftermarket",    type: "Tam Zamanlı", loc: "Ümraniye, İstanbul" },
    ],
  },
  {
    dept: "Teknoloji & Dijital",
    positions: [
      { title: "Yazılım Geliştirici (Full Stack)",  type: "Tam Zamanlı / Hibrit", loc: "İstanbul" },
    ],
  },
];

const BENEFITS = [
  { label: "Özel sağlık sigortası",           sub: "Tüm çalışanlar için" },
  { label: "Yemek kartı katkısı",              sub: "Günlük katkı desteği" },
  { label: "Sektörel eğitim bütçesi",          sub: "Yıllık gelişim programı" },
  { label: "Esnek çalışma saatleri",           sub: "Pozisyona göre uygulanır" },
  { label: "Yıllık kariyer görüşmesi",         sub: "Şeffaf performans değerlendirmesi" },
  { label: "Ulaşım desteği",                   sub: "Servis veya ulaşım katkısı" },
  { label: "Marka ve ürün eğitimleri",         sub: "Tedarikçi işbirliğiyle" },
  { label: "Mentörlük programı",               sub: "Kıdemli çalışan rehberliği" },
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
            <p className="text-slate-500 mt-3 text-[15px] max-w-2xl">Delta Oto'da başarı bireysel değil, kolektiftir. Sonuç odaklı, dürüst ve gelişime açık bir ortamda çalışıyoruz.</p>
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

      {/* ÇALIŞAN SESİ — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Çalışan Deneyimi</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Delta Oto'da Olmak</h2>
            <p className="text-white/60 mt-3 max-w-xl text-[15px]">Farklı departmanlardan çalışanların Delta Oto deneyimi.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/[0.08] border border-white/[0.12] rounded-xl p-8 hover:bg-white/[0.14] transition-colors flex flex-col">
                <Quote className="w-5 h-5 text-[#7d9bea] mb-5 shrink-0" />
                <p className="text-white/75 text-[14px] leading-[1.85] flex-1 italic">"{t.quote}"</p>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="text-[13px] font-bold text-white">{t.name}</div>
                  <div className="text-[12px] text-[#7d9bea] mt-0.5">{t.yrs} Deneyim</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AÇIK POZİSYONLAR — white */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Açık Pozisyonlar</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Kariyer Fırsatları</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-[15px]">Departmanlara göre açık pozisyonları inceleyin ve size uygun rolü bulun.</p>
          </div>
          <div className="space-y-8">
            {DEPARTMENTS.map(({ dept, positions }) => (
              <div key={dept}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1B3A8F]" />
                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-[#1B3A8F]">{dept}</h3>
                </div>
                <div className="space-y-2">
                  {positions.map((p) => (
                    <div key={p.title} className="border border-slate-200 rounded-xl px-7 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all group cursor-pointer">
                      <div>
                        <h4 className="text-[15px] font-bold text-slate-900 leading-snug">{p.title}</h4>
                        <div className="flex items-center flex-wrap gap-2 mt-1.5">
                          <span className="text-[12px] text-slate-400">{p.loc}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-[12px] text-slate-400">{p.type}</span>
                        </div>
                      </div>
                      <button className="shrink-0 text-[13px] font-semibold border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-[#1B3A8F] hover:text-white hover:border-[#1B3A8F] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                        Başvurun <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <p className="text-slate-600 text-[14px]">Aradığınız pozisyonu bulamadınız mı?</p>
            <p className="text-slate-900 font-semibold text-[14px] mt-1">
              Genel başvuru için <a href="mailto:ik@deltaoto.com" className="text-[#1B3A8F] hover:underline">ik@deltaoto.com</a> adresine CV'nizi iletebilirsiniz.
            </p>
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
            <p className="text-white/55 mt-3 text-[15px] max-w-xl">Uzun vadeli kurumsal ilişkilerde çalışanların gelişimine yatırım yapıyoruz.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.label} className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-5 py-5 hover:bg-white/[0.1] transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#7d9bea] mb-4" />
                <div className="text-[13.5px] font-semibold text-gray-200">{b.label}</div>
                <div className="text-[12px] text-white/40 mt-1">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

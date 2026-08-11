import React from "react";
import {
  ExternalLink,
  Quote,
  Linkedin,
  ChevronDown,
  HeartPulse,
  Utensils,
  GraduationCap,
  Clock,
  CalendarCheck,
  Bus,
  BookOpen,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useReveal } from "../hooks/use-motion";

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

const BENEFITS = [
  { label: "Özel sağlık sigortası",     sub: "Tüm çalışanlar için",               Icon: HeartPulse },
  { label: "Yemek kartı katkısı",        sub: "Her iş günü için sağlanır",         Icon: Utensils },
  { label: "Sektörel eğitim bütçesi",    sub: "Yıllık gelişim programı",           Icon: GraduationCap },
  { label: "Esnek çalışma saatleri",     sub: "Pozisyona göre uygulanır",          Icon: Clock },
  { label: "Yıllık kariyer görüşmesi",   sub: "Şeffaf performans değerlendirmesi", Icon: CalendarCheck },
  { label: "Ulaşım desteği",             sub: "Servis hattı veya yol bedeli",      Icon: Bus },
  { label: "Marka ve ürün eğitimleri",   sub: "Tedarikçi işbirliğiyle",            Icon: BookOpen },
  { label: "Mentorluk programı",         sub: "Kıdemli çalışan rehberliği",        Icon: Users },
];

const JOB_PLATFORMS = [
  {
    name: "LinkedIn",
    desc: "Delta Oto'nun LinkedIn sayfasını takip ederek açık pozisyonlara başvurabilir, şirket güncellemelerini ve sektör haberlerini takip edebilirsiniz.",
    url: "https://www.linkedin.com/company/delta-oto",
    label: "LinkedIn'de Pozisyonları İnceleyin",
    color: "#0A66C2",
    Icon: Linkedin,
  },
  {
    name: "Kariyer.net",
    desc: "Güncel iş ilanlarımızı Kariyer.net üzerinden inceleyebilir, online başvurunuzu kolayca tamamlayabilirsiniz.",
    url: "https://www.kariyer.net",
    label: "Kariyer.net'i Ziyaret Edin",
    color: "#1B3A8F",
    Icon: ExternalLink,
  },
];

export function KariyerPage() {
  const reveal = useReveal();

  const scrollToPlatforms = () => {
    const target = document.getElementById("kariyer-platformlari");
    if (!target) return;
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

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
          <button
            type="button"
            onClick={scrollToPlatforms}
            className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            Açık Pozisyonları Gör
            <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* KÜLTÜR — light */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Çalışma Kültürü</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Kurumsal Kültür Değerlerimiz</h2>
            <p className="text-slate-500 mt-3 text-[15px] max-w-2xl">Delta Oto'da başarı bireysel değil, kolektiftir. Sonuç odaklı, dürüst ve gelişime açık bir ortamda çalışıyoruz.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CULTURE.map((v, i) => (
              <div
                key={v.title}
                ref={reveal}
                className={`do-reveal do-d${(i % 4) + 1} border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-lg transition-all`}
              >
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
          <div ref={reveal} className="do-reveal mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Çalışan Deneyimi</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Delta Oto'da Olmak</h2>
            <p className="text-white/60 mt-3 max-w-xl text-[15px]">Farklı departmanlardan çalışanların Delta Oto deneyimi.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                ref={reveal}
                className={`do-reveal do-d${(i % 4) + 1} bg-white/[0.08] border border-white/[0.12] rounded-xl p-8 hover:bg-white/[0.14] transition-colors flex flex-col`}
              >
                <Quote className="w-5 h-5 text-[#7d9bea] mb-5 shrink-0" />
                <p className="text-white/75 text-[14px] leading-[1.85] flex-1 italic">"{t.quote}"</p>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="text-[13px] font-bold text-white">{t.name}</div>
                  <div className="text-[12px] text-blue-100 mt-0.5">{t.yrs} Deneyim</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KARİYER PLATFORMLARI — white */}
      <section id="kariyer-platformlari" className="bg-white py-24 scroll-mt-24 sm:scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Açık Pozisyonlar</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Kariyer Fırsatları</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-[15px]">
              Güncel pozisyonlarımız LinkedIn ve Kariyer.net üzerinde yayımlanmaktadır. Başvuru için tercih ettiğiniz platformu seçin.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {JOB_PLATFORMS.map(({ name, desc, url, label, Icon }, i) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                ref={reveal}
                className={`do-reveal do-d${(i % 4) + 1} group border border-slate-200 rounded-2xl p-8 hover:border-[#1B3A8F]/40 hover:shadow-xl transition-all block`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center group-hover:bg-[#1B3A8F] transition-colors">
                    <Icon className="w-7 h-7 text-[#1B3A8F] group-hover:text-white transition-colors" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[#1B3A8F] transition-colors mt-1" />
                </div>
                <h3 className="text-[18px] font-black text-slate-900 mb-3">{name}</h3>
                <p className="text-slate-500 text-[14px] leading-relaxed mb-6">{desc}</p>
                <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1B3A8F] group-hover:gap-3 transition-all">
                  {label} <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
          <div className="p-7 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <p className="text-slate-600 text-[14px]">Proaktif başvuru yapmak ister misiniz?</p>
            <p className="text-slate-900 font-semibold text-[14px] mt-1">
              CV'nizi ve ilgilendiğiniz departmanı <a href="mailto:ik@deltaoto.com" className="text-[#1B3A8F] hover:underline">ik@deltaoto.com</a> adresine iletebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* YAN HAKLAR — navy */}
      <section className="relative bg-[#1B3A8F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#1B3A8F]/80" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div ref={reveal} className="do-reveal mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">Çalışan Avantajları</span>
            <h2 className="text-3xl font-black tracking-tight">Yan Haklar ve İmkânlar</h2>
            <p className="text-white/55 mt-3 text-[15px] max-w-xl">Uzun vadeli kurumsal ilişkilerde çalışanların gelişimine yatırım yapıyoruz.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <div
                key={b.label}
                ref={reveal}
                className={`do-reveal do-d${(i % 4) + 1} bg-white/[0.06] border border-white/[0.1] rounded-xl px-5 py-5 hover:bg-white/[0.1] transition-colors`}
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <b.Icon className="w-5 h-5 text-[#7d9bea]" />
                </div>
                <div className="text-[13.5px] font-semibold text-gray-200">{b.label}</div>
                <div className="text-[12px] text-white/70 mt-1">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

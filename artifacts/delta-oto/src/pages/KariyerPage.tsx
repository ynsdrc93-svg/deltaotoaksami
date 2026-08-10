import React from "react";
import {
  ExternalLink, Quote, Linkedin, Target, Users, GraduationCap, ShieldCheck,
  HeartPulse, UtensilsCrossed, CalendarClock, Award, Bus, BadgeCheck, UserCheck,
  ArrowRight, ChevronRight,
} from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const CULTURE = [
  { icon: GraduationCap, title: "Sürekli Yetkinlik Gelişimi", desc: "Sektör bilgisini güncel tutmak için eğitim programları, mentorluk ve konferans katılım desteği sunulmaktadır." },
  { icon: Target,        title: "Performans Odaklılık", desc: "Sonuçlar ve taahhüt bütünlüğü temel değerlendirme kriterleridir. Hedefler netleştirilir, takip edilir ve gerçekleştirilir." },
  { icon: Users,         title: "Kolektif Başarı", desc: "Bireysel yetkinlik, takım dinamikleriyle pekiştirilir. Bilgi paylaşımı ve iş birliği kurumsal kültürün temel bileşenidir." },
  { icon: ShieldCheck,   title: "Kurumsal Dürüstlük", desc: "Müşterilere, tedarikçilere ve birbirimize karşı şeffaf, tutarlı ve dürüst ilişki standartları istisnasız korunur." },
];

const TESTIMONIALS = [
  { name: "Satış & Müşteri Yönetimi",   quote: "Delta Oto'da geçen yıllar, sektörün derinliklerini keşfetmemi sağladı. Hem ürün bilgisi hem de ticari ilişki yönetimi açısından kendimi buraya borçluyum.", yrs: "9" },
  { name: "Operasyon & Planlama",       quote: "Lojistik ve tedarik zinciri alanında sıfırdan öğrenmek için doğru adres. Ekip olarak hedeflerimizi paylaşıyor, başarıyı birlikte inşa ediyoruz.", yrs: "5" },
  { name: "Ürün & Portföy Yönetimi",    quote: "Ürün portföyünü yönetmek; hem teknik hem de stratejik yetkinlik gerektiriyor. Delta Oto bu ikisini bir arada geliştirme fırsatı sunuyor.", yrs: "7" },
];

const BENEFITS = [
  { icon: HeartPulse,      label: "Özel sağlık sigortası",     sub: "Tüm çalışanlar için" },
  { icon: CalendarClock,   label: "Esnek çalışma saatleri",    sub: "Pozisyona göre uygulanır" },
  { icon: GraduationCap,   label: "Sektörel eğitim bütçesi",   sub: "Yıllık gelişim programı" },
  { icon: UtensilsCrossed, label: "Yemek kartı katkısı",        sub: "Günlük katkı desteği" },
  { icon: Award,           label: "Yıllık kariyer görüşmesi",  sub: "Şeffaf performans değerlendirmesi" },
  { icon: Bus,             label: "Ulaşım desteği",             sub: "Servis veya ulaşım katkısı" },
  { icon: BadgeCheck,      label: "Marka ve ürün eğitimleri",  sub: "Tedarikçi işbirliğiyle" },
  { icon: UserCheck,       label: "Mentörlük programı",         sub: "Kıdemli çalışan rehberliği" },
];
const BENEFITS_HEADLINE = BENEFITS.slice(0, 3);
const BENEFITS_SUPPORTING = BENEFITS.slice(3);

const JOB_PLATFORMS = [
  {
    name: "LinkedIn",
    desc: "Delta Oto'nun LinkedIn sayfasını takip ederek açık pozisyonlara başvurabilir, güncel ilanları takip edebilirsiniz.",
    url: "https://www.linkedin.com/company/delta-oto",
    Icon: Linkedin,
  },
  {
    name: "Kariyer.net",
    desc: "Güncel iş ilanlarımızı Kariyer.net üzerinden inceleyebilir, online başvurunuzu kolayca tamamlayabilirsiniz.",
    url: "https://www.kariyer.net",
    Icon: ExternalLink,
  },
];

export function KariyerPage() {
  const [cultureFeatured, ...cultureSupporting] = CULTURE;
  const CultureFeaturedIcon = cultureFeatured.icon;
  const [testimonialFeatured, ...testimonialsSupporting] = TESTIMONIALS;

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO (dark, split panel) */}
      <section className="relative overflow-hidden bg-[#0e1016] text-white">
        <div className="flex flex-col lg:flex-row lg:min-h-[82vh]">

          {/* LEFT — ink panel, oversized "50" mark, real content */}
          <div className="relative lg:w-[57%] flex items-center px-6 sm:px-10 lg:pl-14 xl:pl-20 lg:pr-10 xl:pr-14 py-20 lg:py-28 overflow-hidden">
            <div
              aria-hidden
              className="absolute -left-6 -bottom-16 sm:-bottom-24 lg:-bottom-28 text-[220px] sm:text-[320px] lg:text-[380px] font-black leading-none text-white/[0.045] select-none pointer-events-none tracking-tighter"
            >
              50
            </div>
            <div className="do-grid-bg absolute inset-0 opacity-50" />
            <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
            <div className="do-beam" />

            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-[2px] bg-[#4d74d6]" />
                <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">İnsan Kaynakları · Kariyer Fırsatları</span>
              </div>
              <h1 className="text-[34px] sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[68px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
                <span className="do-hero-line">GELECEĞİ</span><br />
                <span className="text-white">BİZİMLE</span><br />
                <span className="do-hero-accent">İNŞA EDİN</span>
              </h1>
              <p className="text-[16px] sm:text-[17px] text-gray-300 leading-[1.8] max-w-lg mb-10 font-light">
                50 yıllık kurumsal birikimin parçası olun. Delta Oto'da kariyer; güçlü sektör yetkinliği, dinamik bir ekip yapısı ve uzun vadeli profesyonel gelişim fırsatı anlamına gelir.
              </p>
              <a
                href="#pozisyonlar"
                className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
              >
                Açık Pozisyonları İnceleyin <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* RIGHT — full-strength photography, not a dimmed backdrop */}
          <div className="relative lg:w-[43%] min-h-[320px] sm:min-h-[420px] lg:min-h-0 overflow-hidden">
            <img
              src="/images/delta-oto-hero.png"
              alt="Delta Oto ekibi operasyon merkezinde"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 40%" }}
            />
            <div className="absolute inset-y-0 left-0 w-16 lg:w-28 bg-gradient-to-r from-[#0e1016] to-transparent hidden lg:block" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0e1016] to-transparent lg:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e1016]/80 to-transparent" />

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <div className="do-stat-tag bg-[#1B3A8F] shadow-2xl">
                <span className="flex items-baseline gap-2.5 px-5 py-3.5">
                  <span className="text-3xl font-black text-white leading-none tabular-nums">3</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-100 max-w-[7rem] leading-tight">Şehirde Operasyon Ekibi</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KÜLTÜR — white, one featured value + supporting list (asymmetric) */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Çalışma Kültürü</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Kurumsal Kültür Değerlerimiz</h2>
            <p className="text-slate-500 mt-3 text-[15px] max-w-2xl">Delta Oto'da başarı bireysel değil, kolektiftir. Sonuç odaklı, dürüst ve gelişime açık bir ortamda çalışıyoruz.</p>
          </div>
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14">
            <div className="do-entity-card bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 sm:p-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3A8F]">Öne Çıkan Değer</span>
              <div className="w-14 h-14 rounded-2xl bg-[#1B3A8F] flex items-center justify-center mt-6 mb-7">
                <CultureFeaturedIcon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl sm:text-[28px] font-black text-slate-900 mb-4 leading-tight tracking-tight">{cultureFeatured.title}</h3>
              <p className="text-slate-600 text-[15.5px] leading-[1.85] max-w-md">{cultureFeatured.desc}</p>
            </div>

            <div className="flex flex-col">
              {cultureSupporting.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className={`flex items-start gap-4 py-6 ${i === 0 ? "pt-0" : "border-t border-slate-200"}`}>
                  <div className="w-9 h-9 rounded-lg bg-[#1B3A8F]/[0.07] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#1B3A8F]" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-bold text-slate-900 mb-1.5">{title}</h4>
                    <p className="text-slate-500 text-[13.5px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ÇALIŞAN SESİ — navy, one featured testimonial + two supporting (asymmetric) */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Çalışan Deneyimi</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Delta Oto'da Olmak</h2>
            <p className="text-white/60 mt-3 max-w-xl text-[15px]">Farklı departmanlardan çalışanların Delta Oto deneyimi.</p>
          </div>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
            <div className="do-entity-card bg-white/[0.08] border border-white/[0.14] rounded-2xl p-8 sm:p-10 flex flex-col">
              <Quote className="w-8 h-8 text-[#7d9bea] mb-6 shrink-0" />
              <p className="text-white text-xl sm:text-[24px] leading-[1.5] italic font-light flex-1">"{testimonialFeatured.quote}"</p>
              <div className="mt-9 pt-6 border-t border-white/15 flex items-end justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d9bea]">Çalışan Deneyimi</div>
                  <div className="text-[15px] font-bold text-white mt-1.5">{testimonialFeatured.name}</div>
                </div>
                <div className="do-stat-tag bg-white/10 border border-white/15 shrink-0">
                  <span className="flex items-baseline gap-2 px-4 py-2.5">
                    <span className="text-3xl font-black text-white leading-none tabular-nums">{testimonialFeatured.yrs}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100">Yıl Deneyim</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {testimonialsSupporting.map((t) => (
                <div key={t.name} className="do-entity-card bg-white/[0.05] border border-white/[0.1] rounded-xl p-6 hover:bg-white/[0.09] flex-1 flex flex-col">
                  <p className="text-white/70 text-[13.5px] leading-[1.75] italic flex-1">"{t.quote}"</p>
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <span className="text-[12px] font-bold text-white">{t.name}</span>
                    <span className="do-stat-tag text-[10px] font-bold text-[#7d9bea] bg-white/10 border border-white/15 px-2.5 py-1 rounded-md uppercase tracking-wider shrink-0"><span>{t.yrs} Yıl</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KARİYER FIRSATLARI — white, real photography + link rows */}
      <section id="pozisyonlar" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Açık Pozisyonlar</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Kariyer Fırsatları</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-[15px]">
              Güncel pozisyonlarımız LinkedIn ve Kariyer.net üzerinde yayımlanmaktadır. Başvuru için tercih ettiğiniz platformu seçin.
            </p>
          </div>
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14 items-stretch">
            <div className="relative rounded-2xl overflow-hidden min-h-[280px] lg:min-h-[360px] shadow-xl">
              <img
                src="/images/delta-oto-ops.png"
                alt="Delta Oto operasyon merkezi"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 55%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016]/75 via-[#0e1016]/10 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="do-stat-tag bg-[#1B3A8F] shadow-xl">
                  <span className="flex items-baseline gap-2 px-4 py-3">
                    <span className="text-2xl font-black text-white leading-none">2</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100 max-w-[6rem] leading-tight">Aktif Kariyer Platformu</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              {JOB_PLATFORMS.map(({ name, desc, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 p-6 rounded-xl border border-slate-200 hover:border-[#1B3A8F]/40 hover:bg-[#f8fafc] transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1B3A8F]/[0.08] flex items-center justify-center shrink-0 group-hover:bg-[#1B3A8F] transition-colors">
                    <Icon className="w-5 h-5 text-[#1B3A8F] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-black text-slate-900">{name}</h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed mt-1">{desc}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[#1B3A8F] transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YAN HAKLAR + KAPANIŞ — navy, final section before footer */}
      <section className="relative bg-[#1B3A8F] text-white py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="absolute -right-24 top-1/3 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">Çalışan Avantajları</span>
            <h2 className="text-3xl font-black tracking-tight">Yan Haklar ve İmkânlar</h2>
            <p className="text-white/55 mt-3 text-[15px] max-w-xl">Uzun vadeli kurumsal ilişkilerde çalışanların gelişimine yatırım yapıyoruz.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-6">
            {BENEFITS_HEADLINE.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="do-entity-card bg-white/[0.07] border border-white/[0.14] rounded-2xl p-7 hover:bg-white/[0.12]">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#7d9bea]" />
                </div>
                <div className="text-[16px] font-bold text-white leading-snug">{label}</div>
                <div className="text-[13px] text-white/50 mt-1.5">{sub}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pb-14 mb-14 border-b border-white/10">
            {BENEFITS_SUPPORTING.map(({ icon: Icon, label }) => (
              <div key={label} className="inline-flex items-center gap-2.5 bg-white/[0.05] border border-white/10 rounded-full pl-3 pr-4 py-2.5">
                <Icon className="w-3.5 h-3.5 text-[#7d9bea]" />
                <span className="text-[12.5px] font-medium text-white/70">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <span className="inline-flex items-center gap-3 text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                <span className="w-8 h-[2px] bg-[#7d9bea] inline-block" />
                Ekibimize Katılın
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight max-w-lg">Aramıza Katılmaya Hazır Mısınız?</h3>
              <p className="text-white/55 mt-3 max-w-md text-[14.5px] leading-relaxed">CV'nizi ve ilgilendiğiniz departmanı ik@deltaoto.com adresine iletin; açık pozisyonları LinkedIn ve Kariyer.net üzerinden takip edin.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="mailto:ik@deltaoto.com"
                className="inline-flex items-center gap-2 bg-white text-[#1B3A8F] hover:bg-gray-100 font-bold px-8 py-4 rounded-md transition-colors group whitespace-nowrap"
              >
                CV Gönder <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#pozisyonlar"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-md transition-colors whitespace-nowrap"
              >
                Açık Pozisyonlar
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

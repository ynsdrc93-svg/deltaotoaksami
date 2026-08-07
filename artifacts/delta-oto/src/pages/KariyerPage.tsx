import React from "react";
import { ExternalLink, Quote, Linkedin, Target, Users, GraduationCap, ShieldCheck, HeartPulse, UtensilsCrossed, CalendarClock, Award, Bus, BadgeCheck, UserCheck, Mail, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const CULTURE = [
  { icon: Target,        title: "Performans Odaklılık", desc: "Sonuçlar ve taahhüt bütünlüğü temel değerlendirme kriterleridir. Hedefler netleştirilir, takip edilir ve gerçekleştirilir." },
  { icon: Users,         title: "Kolektif Başarı", desc: "Bireysel yetkinlik, takım dinamikleriyle pekiştirilir. Bilgi paylaşımı ve iş birliği kurumsal kültürün temel bileşenidir." },
  { icon: GraduationCap, title: "Sürekli Yetkinlik Gelişimi", desc: "Sektör bilgisini güncel tutmak için eğitim programları, mentorluk ve konferans katılım desteği sunulmaktadır." },
  { icon: ShieldCheck,   title: "Kurumsal Dürüstlük", desc: "Müşterilere, tedarikçilere ve birbirimize karşı şeffaf, tutarlı ve dürüst ilişki standartları istisnasız korunur." },
];

const TESTIMONIALS = [
  { initials: "SM", quote: "Delta Oto'da geçen yıllar, sektörün derinliklerini keşfetmemi sağladı. Hem ürün bilgisi hem de ticari ilişki yönetimi açısından kendimi buraya borçluyum.", name: "Satış & Müşteri Yönetimi", yrs: "9 Yıl" },
  { initials: "OP", quote: "Lojistik ve tedarik zinciri alanında sıfırdan öğrenmek için doğru adres. Ekip olarak hedeflerimizi paylaşıyor, başarıyı birlikte inşa ediyoruz.", name: "Operasyon & Planlama", yrs: "5 Yıl" },
  { initials: "ÜP", quote: "Ürün portföyünü yönetmek; hem teknik hem de stratejik yetkinlik gerektiriyor. Delta Oto bu ikisini bir arada geliştirme fırsatı sunuyor.", name: "Ürün & Portföy Yönetimi", yrs: "7 Yıl" },
];

const BENEFITS = [
  { icon: HeartPulse,      label: "Özel sağlık sigortası",           sub: "Tüm çalışanlar için" },
  { icon: UtensilsCrossed, label: "Yemek kartı katkısı",              sub: "Günlük katkı desteği" },
  { icon: GraduationCap,   label: "Sektörel eğitim bütçesi",          sub: "Yıllık gelişim programı" },
  { icon: CalendarClock,   label: "Esnek çalışma saatleri",           sub: "Pozisyona göre uygulanır" },
  { icon: Award,           label: "Yıllık kariyer görüşmesi",         sub: "Şeffaf performans değerlendirmesi" },
  { icon: Bus,             label: "Ulaşım desteği",                   sub: "Servis veya ulaşım katkısı" },
  { icon: BadgeCheck,      label: "Marka ve ürün eğitimleri",         sub: "Tedarikçi işbirliğiyle" },
  { icon: UserCheck,       label: "Mentörlük programı",               sub: "Kıdemli çalışan rehberliği" },
];

const JOB_PLATFORMS = [
  {
    name: "LinkedIn",
    desc: "Delta Oto'nun LinkedIn sayfasını takip ederek açık pozisyonlara başvurabilir, şirket güncellemelerini ve sektör haberlerini takip edebilirsiniz.",
    url: "https://www.linkedin.com/company/delta-oto",
    label: "LinkedIn'de Pozisyonları İnceleyin",
    Icon: Linkedin,
  },
  {
    name: "Kariyer.net",
    desc: "Güncel iş ilanlarımızı Kariyer.net üzerinden inceleyebilir, online başvurunuzu kolayca tamamlayabilirsiniz.",
    url: "https://www.kariyer.net",
    label: "Kariyer.net'te İlanları Görün",
    Icon: ExternalLink,
  },
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
            <span className="do-hero-accent">İNŞA EDİN</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
            50 yıllık kurumsal birikimin parçası olun. Delta Oto'da kariyer; güçlü sektör yetkinliği, dinamik bir ekip yapısı ve uzun vadeli profesyonel gelişim fırsatı anlamına gelir.
          </p>
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
            {CULTURE.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="do-entity-card border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-lg group">
                <div className="w-11 h-11 bg-[#1B3A8F]/[0.07] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#1B3A8F] transition-colors">
                  <Icon className="w-5 h-5 text-[#1B3A8F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-snug">{title}</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">{desc}</p>
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
              <div key={t.name} className="do-entity-card bg-white/[0.08] border border-white/[0.12] rounded-xl p-8 hover:bg-white/[0.14] flex flex-col">
                <Quote className="w-5 h-5 text-[#7d9bea] mb-5 shrink-0" />
                <p className="text-white/75 text-[14px] leading-[1.85] flex-1 italic">"{t.quote}"</p>
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-black text-[#7d9bea]">{t.initials}</span>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-white">{t.name}</div>
                    <div className="text-[12px] text-[#7d9bea] mt-0.5">{t.yrs} Deneyim</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KARİYER PLATFORMLARI — white */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Açık Pozisyonlar</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Kariyer Fırsatları</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-[15px]">
              Güncel pozisyonlarımız LinkedIn ve Kariyer.net üzerinde yayımlanmaktadır. Başvuru için tercih ettiğiniz platformu seçin.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {JOB_PLATFORMS.map(({ name, desc, url, label, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-slate-200 rounded-2xl p-8 hover:border-[#1B3A8F]/40 hover:shadow-xl transition-all block"
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
          <a
            href="mailto:ik@deltaoto.com"
            className="group flex flex-col sm:flex-row items-center justify-between gap-5 p-7 bg-[#f8fafc] border border-slate-200 rounded-xl hover:border-[#1B3A8F]/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1B3A8F]/[0.08] flex items-center justify-center shrink-0 group-hover:bg-[#1B3A8F] transition-colors">
                <Mail className="w-5 h-5 text-[#1B3A8F] group-hover:text-white transition-colors" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-slate-900 font-bold text-[14.5px]">Proaktif başvuru yapmak ister misiniz?</p>
                <p className="text-slate-500 text-[13.5px] mt-0.5">CV'nizi ve ilgilendiğiniz departmanı ik@deltaoto.com adresine iletebilirsiniz.</p>
              </div>
            </div>
            <span className="shrink-0 inline-flex items-center gap-2 bg-[#1B3A8F] group-hover:bg-[#2547B5] text-white font-semibold px-6 py-3 rounded-md transition-colors text-[13px] whitespace-nowrap">
              CV Gönder <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        </div>
      </section>

      {/* YAN HAKLAR — navy */}
      <section className="relative bg-[#1B3A8F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">Çalışan Avantajları</span>
            <h2 className="text-3xl font-black tracking-tight">Yan Haklar ve İmkânlar</h2>
            <p className="text-white/55 mt-3 text-[15px] max-w-xl">Uzun vadeli kurumsal ilişkilerde çalışanların gelişimine yatırım yapıyoruz.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {BENEFITS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="do-entity-card bg-white/[0.06] border border-white/[0.1] rounded-xl px-5 py-5 hover:bg-white/[0.1]">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-[#7d9bea]" />
                </div>
                <div className="text-[13.5px] font-semibold text-gray-200">{label}</div>
                <div className="text-[12px] text-white/40 mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

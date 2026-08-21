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
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, type Lang } from "@/lib/i18n";

// Dil-bağımsız yapısal veri (ikon/URL/renk) — metinler content{} objesinde.
// İki dil dalı arasında ikon bileşenlerini tekrar etmemek için ayrı tutulur;
// sıralama content.*.benefits.groups / content.*.platforms.items ile birebir eşleşir.
const JOB_PLATFORMS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/delta-oto-aksam%C4%B1-san-ve-tic-a-%C5%9F/?viewAsMember=true", Icon: Linkedin },
  { name: "Kariyer.net", url: "https://www.kariyer.net", Icon: ExternalLink },
];

// Aynı 8 gerçek yan hak; sunumu daha anlamlı kılmak için iki başlık altında gruplandı
// (sağlık/beslenme/gündelik ritim vs. bilgi/kariyer gelişimi). İçerik değişmedi, sadece düzen.
const BENEFIT_ICONS = [
  { featured: HeartPulse, rest: [Utensils, Clock, Bus] },
  { featured: GraduationCap, rest: [CalendarCheck, BookOpen, Users] },
];

const content = {
  tr: {
    meta: {
      title: "Kariyer Fırsatları — İnsan Kaynakları | Delta Oto",
      description: "Delta Oto'da kariyer: kurumsal kültür değerlerimiz, çalışan deneyimlerimiz, açık pozisyonlarımız ve sunduğumuz yan haklar hakkında bilgi edinin.",
    },
    hero: {
      eyebrow: "İnsan Kaynakları · Kariyer Fırsatları",
      title: ["GELECEĞİ", "BİZİMLE", "İNŞA EDİN"],
      body: "50 yıllık kurumsal birikimin parçası olun. Delta Oto'da kariyer; güçlü sektör yetkinliği, dinamik bir ekip yapısı ve uzun vadeli profesyonel gelişim fırsatı anlamına gelir.",
      cta: "Açık Pozisyonları Gör",
    },
    culture: {
      eyebrow: "Çalışma Kültürü",
      heading: "Kurumsal Kültür Değerlerimiz",
      desc: "Delta Oto'da başarı bireysel değil, kolektiftir. Sonuç odaklı, dürüst ve gelişime açık bir ortamda çalışıyoruz.",
      items: [
        { title: "Sözünü Tutmak", desc: "Bir teslim tarihine, bir siparişe ya da bir müşteriye verilen söz belirleyicidir. Hedefler net konur, sonucun arkasında durulur." },
        { title: "Birlikte Çalışmak", desc: "Tek başına iyi olmak yetmez; bilgiyi paylaşan, birbirinin işini kolaylaştıran bir ekip yapısı önceliklidir." },
        { title: "İşin Başında Öğrenmek", desc: "Sektör bilgisi büyük ölçüde sahada, zamanla edinilir; bu süreç eğitim desteği ve kıdemli çalışan tecrübesiyle güçlenir." },
        { title: "Dürüst İlişkiler", desc: "Müşteriyle, tedarikçiyle ve ekip arkadaşlarıyla ilişkide gerçekçi konuşmak, söz vermeden önce iki kez düşünmek esastır." },
      ],
    },
    testimonials: {
      eyebrow: "Çalışan Deneyimi",
      heading: "Delta Oto'da Olmak",
      desc: "Farklı departmanlardan çalışanların Delta Oto deneyimi.",
      items: [
        { quote: "Delta Oto'da geçen yıllar, sektörün derinliklerini keşfetmemi sağladı. Hem ürün bilgisi hem de ticari ilişki yönetimi açısından kendimi buraya borçluyum.", name: "Satış & Müşteri Yönetimi", yrs: "9 Yıl" },
        { quote: "Lojistik ve tedarik zinciri alanında sıfırdan öğrenmek için doğru adres. Ekip olarak hedeflerimizi paylaşıyor, başarıyı birlikte inşa ediyoruz.", name: "Operasyon & Planlama", yrs: "5 Yıl" },
        { quote: "Ürün portföyünü yönetmek; hem teknik hem de stratejik yetkinlik gerektiriyor. Delta Oto bu ikisini bir arada geliştirme fırsatı sunuyor.", name: "Ürün & Portföy Yönetimi", yrs: "7 Yıl" },
      ],
      expSuffix: "Deneyim",
    },
    platforms: {
      eyebrow: "Açık Pozisyonlar",
      heading: "Kariyer Fırsatları",
      desc: "Güncel pozisyonlarımız LinkedIn ve Kariyer.net üzerinde yayımlanmaktadır. Başvuru için tercih ettiğiniz platformu seçin.",
      items: [
        { desc: "Delta Oto'nun LinkedIn sayfasını takip ederek açık pozisyonlara başvurabilir, şirket güncellemelerini ve sektör haberlerini takip edebilirsiniz.", label: "LinkedIn'de Pozisyonları İnceleyin" },
        { desc: "Güncel iş ilanlarımızı Kariyer.net üzerinden inceleyebilir, online başvurunuzu kolayca tamamlayabilirsiniz.", label: "Kariyer.net'i Ziyaret Edin" },
      ],
      proactive: {
        title: "Proaktif başvuru yapmak ister misiniz?",
        prefix: "CV'nizi ve ilgilendiğiniz departmanı ",
        suffix: " adresine iletebilirsiniz.",
      },
    },
    benefits: {
      eyebrow: "Çalışan Avantajları",
      heading: "Yan Haklar ve İmkânlar",
      desc: "Uzun vadeli kurumsal ilişkilerde çalışanların gelişimine yatırım yapıyoruz. Sekiz destek, iki ana başlıkta toplanıyor: yaşam dengesi ve kariyer yatırımı.",
      groups: [
        {
          title: "Yaşam Dengesi",
          desc: "Sağlığınız, beslenmeniz ve günlük ritminiz için sunduğumuz destekler.",
          featured: { label: "Özel sağlık sigortası", sub: "Tüm çalışanlar için" },
          rest: [
            { label: "Yemek kartı katkısı", sub: "Her iş günü için sağlanır" },
            { label: "Esnek çalışma saatleri", sub: "Pozisyona göre uygulanır" },
            { label: "Ulaşım desteği", sub: "Servis hattı veya yol bedeli" },
          ],
        },
        {
          title: "Kariyer Yatırımı",
          desc: "Bilginize, becerinize ve kariyer yolculuğunuza yaptığımız yatırımlar.",
          featured: { label: "Sektörel eğitim bütçesi", sub: "Yıllık gelişim programı" },
          rest: [
            { label: "Yıllık kariyer görüşmesi", sub: "Şeffaf performans değerlendirmesi" },
            { label: "Marka ve ürün eğitimleri", sub: "Tedarikçi işbirliğiyle" },
            { label: "Mentorluk programı", sub: "Kıdemli çalışan rehberliği" },
          ],
        },
      ],
    },
  },
  en: {
    meta: {
      title: "Careers — Human Resources | Delta Oto",
      description: "Careers at Delta Oto: learn about our workplace culture, employee experiences, open positions and the benefits we offer.",
    },
    hero: {
      eyebrow: "Human Resources · Career Opportunities",
      title: ["BUILD", "THE FUTURE", "WITH US"],
      body: "Become part of 50 years of institutional experience. A career at Delta Oto means strong industry expertise, a dynamic team, and long-term opportunities for professional growth.",
      cta: "View Open Positions",
    },
    culture: {
      eyebrow: "Workplace Culture",
      heading: "Our Corporate Culture Values",
      desc: "At Delta Oto, success is collective, not individual. We work in an environment that is results-driven, honest, and open to growth.",
      items: [
        { title: "Keeping Our Word", desc: "A commitment made on a delivery date, an order, or to a customer is what defines us. Goals are set clearly, and we stand behind the outcome." },
        { title: "Working Together", desc: "Being good on your own isn't enough; what matters most is a team that shares knowledge and makes each other's work easier." },
        { title: "Learning on the Job", desc: "Industry knowledge is largely gained in the field, over time; this process is reinforced by training support and the experience of senior colleagues." },
        { title: "Honest Relationships", desc: "Speaking realistically with customers, suppliers and teammates, and thinking twice before making a promise, is fundamental." },
      ],
    },
    testimonials: {
      eyebrow: "Employee Experience",
      heading: "Working at Delta Oto",
      desc: "Employees from different departments share their experience at Delta Oto.",
      items: [
        { quote: "My years at Delta Oto have let me explore the depths of this industry. I owe much of what I know about both product knowledge and managing commercial relationships to my time here.", name: "Sales & Account Management", yrs: "9 Years" },
        { quote: "This is the right place to learn logistics and supply chain from the ground up. We share our goals as a team and build success together.", name: "Operations & Planning", yrs: "5 Years" },
        { quote: "Managing the product portfolio takes both technical know-how and strategic thinking. Delta Oto gives you the chance to build both at once.", name: "Product & Portfolio Management", yrs: "7 Years" },
      ],
      expSuffix: "of Experience",
    },
    platforms: {
      eyebrow: "Open Positions",
      heading: "Career Opportunities",
      desc: "Our current openings are posted on LinkedIn and Kariyer.net. Choose whichever platform you prefer to apply.",
      items: [
        { desc: "Follow Delta Oto's LinkedIn page to apply for open positions and stay up to date with company news and industry updates.", label: "View Positions on LinkedIn" },
        { desc: "Browse our current job postings on Kariyer.net and complete your online application easily.", label: "Visit Kariyer.net" },
      ],
      proactive: {
        title: "Prefer to apply proactively?",
        prefix: "You can send your CV, along with the department you're interested in, to ",
        suffix: ".",
      },
    },
    benefits: {
      eyebrow: "Employee Benefits",
      heading: "Benefits and Perks",
      desc: "We invest in our employees' growth as part of long-term working relationships. Eight benefits are organized under two headings: work-life balance and career investment.",
      groups: [
        {
          title: "Work-Life Balance",
          desc: "The support we provide for your health, nutrition and daily routine.",
          featured: { label: "Private health insurance", sub: "For all employees" },
          rest: [
            { label: "Meal card allowance", sub: "Provided for every working day" },
            { label: "Flexible working hours", sub: "Applied depending on the role" },
            { label: "Transportation support", sub: "Shuttle service or commuting allowance" },
          ],
        },
        {
          title: "Career Investment",
          desc: "The investments we make in your knowledge, skills and career path.",
          featured: { label: "Industry training budget", sub: "Annual development program" },
          rest: [
            { label: "Annual career review", sub: "Transparent performance evaluation" },
            { label: "Brand and product training", sub: "Delivered in collaboration with suppliers" },
            { label: "Mentorship program", sub: "Guidance from senior colleagues" },
          ],
        },
      ],
    },
  },
} satisfies Record<Lang, any>;

export function KariyerPage() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);
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

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-16 lg:py-28">
          <div ref={reveal} className="do-reveal flex items-center gap-3 mb-5 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">{t.hero.eyebrow}</span>
          </div>
          <h1 ref={reveal} className="do-reveal do-d1 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-6">
            <span className="do-hero-line">{t.hero.title[0]}</span><br />
            <span className="text-white">{t.hero.title[1]}</span><br />
            <span className="text-[#7d9bea]">{t.hero.title[2]}</span>
          </h1>
          <p ref={reveal} className="do-reveal do-d2 text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-6 lg:mb-10 font-light">
            {t.hero.body}
          </p>
          <button
            ref={reveal}
            type="button"
            onClick={scrollToPlatforms}
            className="do-reveal do-d3 inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            {t.hero.cta}
            <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* KÜLTÜR — light */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.culture.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.culture.heading}</h2>
            <p className="text-slate-500 mt-3 text-[15px] max-w-2xl">{t.culture.desc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.culture.items.map((item, i) => (
              <div
                key={item.title}
                ref={reveal}
                className={`do-reveal do-d${(i % 4) + 1} border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-lg transition-all`}
              >
                <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-snug">{item.title}</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÇALIŞAN SESİ — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">{t.testimonials.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">{t.testimonials.heading}</h2>
            <p className="text-white/60 mt-3 max-w-xl text-[15px]">{t.testimonials.desc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => (
              <div
                key={item.name}
                ref={reveal}
                className={`do-reveal do-d${(i % 4) + 1} bg-white/[0.08] border border-white/[0.12] rounded-xl p-8 hover:bg-white/[0.14] transition-colors flex flex-col`}
              >
                <Quote className="w-5 h-5 text-[#7d9bea] mb-5 shrink-0" />
                <p className="text-white/75 text-[14px] leading-[1.85] flex-1 italic">"{item.quote}"</p>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="text-[13px] font-bold text-white">{item.name}</div>
                  <div className="text-[12px] text-blue-100 mt-0.5">{item.yrs} {t.testimonials.expSuffix}</div>
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
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.platforms.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.platforms.heading}</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-[15px]">
              {t.platforms.desc}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {JOB_PLATFORMS.map(({ name, url, Icon }, i) => {
              const p = t.platforms.items[i];
              return (
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
                  <p className="text-slate-500 text-[14px] leading-relaxed mb-6">{p.desc}</p>
                  <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1B3A8F] group-hover:gap-3 transition-all">
                    {p.label} <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              );
            })}
          </div>
          <div className="p-7 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <p className="text-slate-600 text-[14px]">{t.platforms.proactive.title}</p>
            <p className="text-slate-900 font-semibold text-[14px] mt-1">
              {t.platforms.proactive.prefix}<a href="mailto:ik@deltaoto.com" className="text-[#1B3A8F] hover:underline">ik@deltaoto.com</a>{t.platforms.proactive.suffix}
            </p>
          </div>
        </div>
      </section>

      {/* YAN HAKLAR — navy. İki anlamlı kategoriye ayrılmış editoryal bento düzeni: her panelde
          1 öne çıkan hak (yatay, büyük tipografi) + 3 destekleyici hak (kompakt 3'lü sıra).
          Tüm 8 gerçek hak korunuyor — değişen yalnızca sunum. */}
      <section className="relative bg-[#1B3A8F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#1B3A8F]/80" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div ref={reveal} className="do-reveal mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">{t.benefits.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">{t.benefits.heading}</h2>
            <p className="text-white/60 mt-4 text-[15px] leading-relaxed max-w-xl">
              {t.benefits.desc}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {t.benefits.groups.map((group, gi) => {
              const icons = BENEFIT_ICONS[gi];
              return (
                <div
                  key={group.title}
                  ref={reveal}
                  className={`do-reveal do-d${gi + 1} relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-7 md:p-8 transition-colors duration-300 hover:border-white/20`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -top-5 -right-2 md:-right-3 text-[120px] md:text-[140px] font-black leading-none text-white/[0.06] tabular-nums"
                  >
                    0{gi + 1}
                  </span>

                  <div className="relative mb-7">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">{group.title}</h3>
                    <p className="text-white/60 text-[13px] mt-2 max-w-xs leading-relaxed">{group.desc}</p>
                  </div>

                  {/* Öne çıkan hak */}
                  <div className="group relative flex items-center gap-5 rounded-xl border border-white/10 bg-white/[0.05] p-5 mb-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#7d9bea]/40 hover:bg-white/[0.08] hover:shadow-[0_20px_45px_rgba(125,155,234,0.16)]">
                    <div className="do-card-beam" />
                    <div className="relative z-10 shrink-0 w-14 h-14 rounded-full bg-white/10 border border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#7d9bea]/20 group-hover:border-[#7d9bea]/30">
                      <icons.featured className="w-6 h-6 text-[#7d9bea]" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <div className="text-base md:text-lg font-black text-white leading-snug">{group.featured.label}</div>
                      <div className="text-white/60 text-[13px] mt-1">{group.featured.sub}</div>
                    </div>
                  </div>

                  {/* Destekleyici haklar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {group.rest.map((r, ri) => {
                      const Icon = icons.rest[ri];
                      return (
                        <div
                          key={r.label}
                          className="rounded-xl border border-white/10 bg-white/[0.035] p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/20"
                        >
                          <Icon className="w-4 h-4 text-[#7d9bea] mb-2.5" />
                          <div className="text-[12.5px] font-bold text-white leading-snug">{r.label}</div>
                          <div className="text-[11px] text-white/60 mt-1 leading-snug">{r.sub}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

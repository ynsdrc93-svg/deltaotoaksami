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
import { useReveal, useViewportFocusIndex, usePrefersReducedMotion } from "../hooks/use-motion";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, type Lang } from "@/lib/i18n";

// Dil-bağımsız yapısal veri (ikon/URL/renk) — metinler content{} objesinde.
// İki dil dalı arasında ikon bileşenlerini tekrar etmemek için ayrı tutulur;
// sıralama content.*.benefits.items / content.*.platforms.items ile birebir eşleşir.
const JOB_PLATFORMS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/delta-oto-aksam%C4%B1-san-ve-tic-a-%C5%9F/?viewAsMember=true", Icon: Linkedin },
  { name: "Kariyer.net", url: "https://www.kariyer.net", Icon: ExternalLink },
];

// Aynı 8 gerçek yan hak; tek sistem olarak sunulur (eski "Yaşam Dengesi / Kariyer
// Yatırımı" iki panelli ayrımı kaldırıldı — kullanıcı bu yapay ikiliyi istemiyor).
// Sıra content.*.benefits.items ile birebir eşleşir.
const BENEFIT_ICONS = [HeartPulse, Utensils, Clock, Bus, GraduationCap, CalendarCheck, BookOpen, Users];

const content = {
  tr: {
    meta: {
      title: "Kariyer Fırsatları — İnsan Kaynakları | Delta Oto",
      description: "Delta Oto'da kariyer: kurumsal kültür değerlerimiz, çalışan deneyimlerimiz, açık pozisyonlarımız ve sunduğumuz yan haklar hakkında bilgi edinin.",
    },
    hero: {
      eyebrow: "İnsan Kaynakları · Kariyer Fırsatları",
      title: ["50 YILLIK", "BİR EKİBİN", "PARÇASI OLUN"],
      body: "Otomotiv yedek parça dağıtımında yarım asırlık bir ekip; sahada edinilen bilgi, net sorumluluklar ve uzun soluklu çalışma ilişkileriyle şekilleniyor.",
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
        { title: "Sahiplenmek", desc: "Bir işi üstlenen kişi, sonucunu da üstlenir. Sorumluluk iş bitene kadar başkasına devredilmez." },
        { title: "Sonuç Disiplini", desc: "Bir plana karar verildiğinde ona göre çalışılır; değişen koşullar mazeret değil, yeni bir çözüm arayışı doğurur." },
        { title: "Saygı", desc: "Depoda, sahada ya da ofiste; yapılan işin niteliği fark etmeksizin herkesin katkısı aynı ciddiyetle karşılanır." },
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
      desc: "Uzun vadeli kurumsal ilişkilerde çalışanların gelişimine yatırım yapıyoruz.",
      items: [
        { label: "Özel sağlık sigortası", sub: "Tüm çalışanlar için" },
        { label: "Yemek kartı katkısı", sub: "Her iş günü için sağlanır" },
        { label: "Esnek çalışma saatleri", sub: "Pozisyona göre uygulanır" },
        { label: "Ulaşım desteği", sub: "Servis hattı veya yol bedeli" },
        { label: "Sektörel eğitim bütçesi", sub: "Yıllık gelişim programı" },
        { label: "Yıllık kariyer görüşmesi", sub: "Şeffaf performans değerlendirmesi" },
        { label: "Marka ve ürün eğitimleri", sub: "Tedarikçi işbirliğiyle" },
        { label: "Mentorluk programı", sub: "Kıdemli çalışan rehberliği" },
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
      title: ["FIFTY YEARS", "OF EXPERTISE.", "ADD YOURS."],
      body: "Half a century in automotive parts distribution — built on knowledge earned in the field, clear responsibility, and working relationships that last.",
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
        { title: "Taking Ownership", desc: "Whoever takes on a task also takes on its outcome. Responsibility isn't handed off until the work is done." },
        { title: "Discipline in Execution", desc: "Once a plan is set, we work to it. Changing conditions are not an excuse — they call for a new solution." },
        { title: "Respect", desc: "In the warehouse, in the field or in the office, every contribution is met with the same seriousness, regardless of the nature of the work." },
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
      desc: "We invest in our employees' growth as part of long-term working relationships.",
      items: [
        { label: "Private health insurance", sub: "For all employees" },
        { label: "Meal card allowance", sub: "Provided for every working day" },
        { label: "Flexible working hours", sub: "Applied depending on the role" },
        { label: "Transportation support", sub: "Shuttle service or commuting allowance" },
        { label: "Industry training budget", sub: "Annual development program" },
        { label: "Annual career review", sub: "Transparent performance evaluation" },
        { label: "Brand and product training", sub: "Delivered in collaboration with suppliers" },
        { label: "Mentorship program", sub: "Guidance from senior colleagues" },
      ],
    },
  },
} satisfies Record<Lang, any>;

/**
 * Kültür bölümü — Görsel/UX Düzeltme Turu (§11-17, önceki tur): önceki
 * ince-ayraçlı düz metin listesi kullanıcı tarafından reddedildi ("sıkıcı,
 * düz metin, ucuz, okul projesi gibi"). İçerik (7 ilke) AYNI kaldı —
 * istenen sadece sunumun sıfırdan yeniden tasarlanmasıydı. "Kinetik
 * manifesto" konsepti (büyük gölge numaralar + oversized editorial
 * tipografi + solda ilerleme rayı) KORUNUYOR — bu turda değişen yalnızca
 * HANGİ maddenin "aktif" sayıldığını belirleyen mekanizma.
 *
 * Canlı İnceleme Turu (bu tur): önceki iki deneme de ("transit", sonra
 * "story" modu) bölümün TÜM YÜKSEKLİĞİNE yayılan TEK bir scroll-yüzdesi
 * hesaplayıp buradan "hangi madde aktif" çıkarımı yapıyordu — kullanıcının
 * kendi sözleriyle: "1'den itibaren ekrana gelmeden aslında
 * animasyonlanıyor... ekranın ortasına geldiğinde sırasıyla highlight
 * olmalı". Bölüm-geneli bir yüzde, HİÇBİR eşleştirmeyle "kullanıcının o an
 * gerçekten neyi okuduğu" ile birebir örtüşmüyor — yaklaşık bir tahmin.
 *
 * Kesin çözüm: useViewportFocusIndex (use-motion.ts) — artık madde-geneli
 * BİR yüzde yok; her maddenin KENDİ DOM konumu ölçülüyor, viewport'un dikey
 * ORTASINA (odak çizgisi, ~%50) en yakın MERKEZE sahip madde aktif olur.
 * "Ben şu an bunu okuyorum, o yüzden aktif oluyor" hissi — "bölüm-geneli
 * hesaplama bunun aktif olacağına önceden karar verdi" değil. Bir madde
 * viewport'tan (odak çizgisinden) çok uzaktaysa ADAY bile sayılmıyor
 * (maxDistanceFraction koruması) — bu, ilk maddenin daha bölüm ekrana
 * gelmeden "aktif" görünmesini engelliyor.
 *
 * Üç durum (§3, "keep the art direction, only change WHEN each state
 * fires"): UPCOMING (henüz sırası gelmedi, sakin) → ACTIVE (viewport
 * ortasına en yakın, en güçlü vurgu) → PASSED (geçildi, hâlâ okunur ama
 * ACTIVE'den sakin — ASLA kaybolmaz). activeIndex'ten türetilir:
 * i < activeIndex → passed, i === activeIndex → active, i > activeIndex
 * (veya activeIndex henüz hiç ayarlanmadıysa, -1) → upcoming.
 *
 * Numara rengi (§4): nötr gri yerine AYNI marka-mavisi ailesinin (#1B3A8F)
 * üç opaklık kademesi — upcoming/passed/active net ayrışıyor ama numara
 * hiçbir zaman başlığın (text-slate-900, en yüksek kontrast) önüne
 * geçmiyor.
 *
 * Reduced-motion: useViewportFocusIndex reduced-motion'da scroll
 * dinleyicisini HİÇ eklemez, activeIndex -1'de sabit kalır — bu component
 * o -1'i "scroll dinlemiyoruz" (reducedMotion true) ile "henüz odak
 * aralığına girmedi" (reducedMotion false, sayfa henüz kaydırılmadı) diye
 * AYIRT ediyor: reduced-motion'da her yedi madde ACTIVE muamelesi görür
 * (maksimum okunurluk, hiçbiri gizli/sönük değil); normal ilk karede ise
 * hepsi UPCOMING'de başlar (kullanıcı henüz bölümü görmedi demek doğru). */
function CultureManifesto({ items }: { items: { title: string; desc: string }[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const [setItemRef, activeIndex] = useViewportFocusIndex(items.length, 0.5, 0.4);

  const stateOf = (i: number): "upcoming" | "active" | "passed" => {
    if (reducedMotion) return "active";
    if (activeIndex < 0) return "upcoming";
    if (i === activeIndex) return "active";
    return i < activeIndex ? "passed" : "upcoming";
  };

  return (
    <div className="relative">
      {/* İlerleme rayı — yalnızca masaüstü; HakkimizdaPage zaman çizgisi
          nokta-navigasyonuyla aynı görsel dil (küçük/büyük nokta geçişi),
          şimdi üç durumlu (upcoming/active/passed) aynı renk kademesiyle. */}
      <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-1.5" aria-hidden="true">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200" />
        <div className="relative h-full flex flex-col justify-between py-1">
          {items.map((_, i) => {
            const state = stateOf(i);
            return (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  state === "active" ? "h-9 bg-[#1B3A8F]" : state === "passed" ? "h-2.5 bg-[#1B3A8F]/40" : "h-2.5 bg-slate-300"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="lg:pl-16 space-y-14 sm:space-y-16 md:space-y-20">
        {items.map((item, i) => {
          const state = stateOf(i);
          const isActive = state === "active";
          const isPassed = state === "passed";
          return (
            <div
              key={item.title}
              ref={setItemRef[i]}
              data-state={state}
              style={{ transform: isActive ? "scale(1.02)" : "scale(1)" }}
              className="origin-left transition-transform duration-300 ease-out"
            >
              <div className="flex items-start gap-5 sm:gap-8 md:gap-10">
                <span
                  aria-hidden="true"
                  className={`shrink-0 select-none font-black leading-none tabular-nums text-[56px] sm:text-[80px] md:text-[112px] transition-colors duration-300 ${
                    isActive ? "text-[#1B3A8F]/60" : isPassed ? "text-[#1B3A8F]/25" : "text-[#1B3A8F]/[0.08]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1 sm:pt-3 md:pt-6 min-w-0">
                  <h3
                    className={`font-black tracking-tight leading-[1.05] text-2xl sm:text-3xl md:text-5xl transition-colors duration-300 ${
                      isActive ? "text-slate-900" : isPassed ? "text-slate-600" : "text-slate-300"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-3 md:mt-4 max-w-xl leading-relaxed text-[14px] sm:text-[15px] transition-colors duration-300 ${
                      isActive ? "text-slate-600" : isPassed ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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

      {/* KÜLTÜR — light. Sunum tamamen yeniden tasarlandı (bkz. CultureManifesto
          bileşen yorumu) — 7 ilkenin İÇERİĞİ değişmedi. */}
      <section className="bg-white py-24 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-16 md:mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.culture.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.culture.heading}</h2>
            <p className="text-slate-500 mt-3 text-[15px] max-w-2xl">{t.culture.desc}</p>
          </div>
          <CultureManifesto items={t.culture.items} />
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
                  className={`${i === 0 ? "do-reveal-left" : "do-reveal-right"} group border border-slate-200 rounded-2xl p-8 hover:border-[#1B3A8F]/40 hover:shadow-xl transition-all block`}
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

      {/* YAN HAKLAR — navy. Tek sistem: eski "Yaşam Dengesi / Kariyer Yatırımı" iki panelli
          ayrım kaldırıldı. Aynı 8 gerçek hak, tek çerçeveli ızgarada iç kılcal çizgilerle
          bölünmüş — 8 ayrı kutu yerine tek bütün bir yapı. Kademeli (stagger) giriş, iki
          zıt kart değil, tek akışın parçaları olarak hissettiriyor. */}
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

          <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl border-t border-l border-white/10 overflow-hidden">
            {t.benefits.items.map((item, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <div
                  key={item.label}
                  ref={reveal}
                  className={`do-reveal do-d${(i % 4) + 1} border-r border-b border-white/10 p-6 md:p-7 transition-colors duration-300 hover:bg-white/[0.06]`}
                >
                  <Icon className="w-5 h-5 text-[#7d9bea] mb-4" />
                  <div className="text-[13px] md:text-[13.5px] font-bold text-white leading-snug">{item.label}</div>
                  <div className="text-white/55 text-[11.5px] mt-1.5 leading-snug">{item.sub}</div>
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

import React from "react";
import {
  ExternalLink,
  Quote,
  Linkedin,
  ChevronDown,
  Pause,
  Play,
} from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useReveal, useViewportFocusIndex, usePrefersReducedMotion } from "../hooks/use-motion";
import { useMeasuredMarquee } from "../hooks/use-measured-marquee";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useLang, type Lang } from "@/lib/i18n";
import { joinById } from "@/lib/join-by-id";

// Dil-bağımsız yapısal veri (ikon/URL/renk) — metinler content{} objesinde.
// İki dil dalı arasında ikon bileşenlerini tekrar etmemek için ayrı tutulur;
// sıralama content.*.benefits.items / content.*.platforms.items ile birebir eşleşir.
const JOB_PLATFORMS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/delta-oto-aksam%C4%B1-san-ve-tic-a-%C5%9F/?viewAsMember=true", Icon: Linkedin },
  { name: "Kariyer.net", url: "https://www.kariyer.net", Icon: ExternalLink },
];

// Yan Haklar — veri modeli ve görseller (Turu 7). Her hakkın YAPISAL alanları
// burada, dil-bağımsız (id/order/published/image/imageSmall/focalPoint); dile
// göre değişen METİN (label/sub/alt) content.*.benefits.items içinde AYNI
// `id` ile anahtarlanan bir sözlükte. İkisi `joinById` ile id üzerinden
// birleşir (src/lib/join-by-id.ts) — index/etiket metnine göre eşleme YOK;
// bir kart gizlenir/yeniden sıralanırsa görsel, başlık ve açıklama birlikte
// gider. (Eskiden React key'i etiket metniydi.)
//
// GÖRSELLER (dürüst durum): sekiz hakkın her biri için AYRI bir görsel var —
// public/images/benefits/<id>.webp (900×1200, 3:4) ve mobil için
// <id>-sm.webp (450×600; srcSet ile seçilir). Bunlar FOTOĞRAF DEĞİL: ortamın
// ağ politikası stok-foto sitelerine (unsplash/pexels/pixabay/wikimedia…)
// erişimi engellediğinden ve depoda/yüklemelerde hazır bir Yan Haklar
// görseli bulunmadığından, her kart için bu projede ÖZGÜN olarak üretilmiş,
// ortak sanat yönlü (lacivert kurumsal palet + tek sıcak ışık kaynağı)
// editoryal illüstrasyonlar hazırlandı ve WebP olarak eklendi — geçici
// SVG/degrade yedeği YOK. Gerçek fotoğraflar geldiğinde yalnızca bu
// kayıtlardaki `image`/`imageSmall` (ve dile göre `alt`) değişir.
// `alt` metinleri görselin TEMSİLİ bir illüstrasyon olduğunu söyler; Delta
// Oto'nun gerçek personeli/ofisi olduğunu iddia etmez.
const BENEFIT_META: {
  id: string;
  order: number;
  published: boolean;
  image: string;
  imageSmall: string;
  focalPoint: string;
}[] = [
  { id: "saglik-sigortasi", order: 1, published: true, image: "/images/benefits/saglik-sigortasi.webp", imageSmall: "/images/benefits/saglik-sigortasi-sm.webp", focalPoint: "50% 46%" },
  { id: "yemek-karti", order: 2, published: true, image: "/images/benefits/yemek-karti.webp", imageSmall: "/images/benefits/yemek-karti-sm.webp", focalPoint: "50% 40%" },
  { id: "ulasim-destegi", order: 3, published: true, image: "/images/benefits/ulasim-destegi.webp", imageSmall: "/images/benefits/ulasim-destegi-sm.webp", focalPoint: "50% 52%" },
  { id: "esnek-calisma", order: 4, published: true, image: "/images/benefits/esnek-calisma.webp", imageSmall: "/images/benefits/esnek-calisma-sm.webp", focalPoint: "50% 42%" },
  { id: "egitim-butcesi", order: 5, published: true, image: "/images/benefits/egitim-butcesi.webp", imageSmall: "/images/benefits/egitim-butcesi-sm.webp", focalPoint: "50% 50%" },
  { id: "kariyer-gorusmesi", order: 6, published: true, image: "/images/benefits/kariyer-gorusmesi.webp", imageSmall: "/images/benefits/kariyer-gorusmesi-sm.webp", focalPoint: "50% 48%" },
  { id: "urun-egitimleri", order: 7, published: true, image: "/images/benefits/urun-egitimleri.webp", imageSmall: "/images/benefits/urun-egitimleri-sm.webp", focalPoint: "50% 40%" },
  { id: "mentorluk", order: 8, published: true, image: "/images/benefits/mentorluk.webp", imageSmall: "/images/benefits/mentorluk-sm.webp", focalPoint: "50% 45%" },
];

type BenefitCopy = { label: string; sub: string; alt: string };

const content = {
  tr: {
    meta: {
      title: "Kariyer Fırsatları — İnsan Kaynakları | Delta Oto",
      description: "Delta Oto'da kariyer: kurumsal kültür değerlerimiz, çalışan deneyimlerimiz, açık pozisyonlarımız ve sunduğumuz yan haklar hakkında bilgi edinin.",
    },
    // Kariyer Hero Yeniden Yazım Turu 2: "50+ Yıllık Sektör Uzmanlığı" başlığı
    // hâlâ jenerik işe alım ilanı gibi okunuyordu (heritage mesajı zaten
    // sitenin başka yerlerinde veriliyor) — kullanıcı 50+'ı başlığa tekrar
    // zorlamadan, ortak uzmanlık/gelişim çerçevesine odaklanan daha kısa bir
    // başlık istedi. Hero mimarisi (3 satırlı başlık, tek CTA, mevcut hero
    // fotoğrafı) DEĞİŞMEDİ — yalnızca metin.
    hero: {
      eyebrow: "İnsan Kaynakları · Kariyer Fırsatları",
      title: ["BİRLİKTE", "UZMANLAŞIYOR,", "BİRLİKTE GELİŞİYORUZ."],
      body: "Delta Oto'da deneyim; sorumluluk, uzmanlık ve sürekli gelişim kültürüyle büyür.",
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
      pause: "Duraklat",
      resume: "Devam Et",
      items: {
        "saglik-sigortasi": { label: "Özel sağlık sigortası", sub: "Tüm çalışanlar için", alt: "Temsili illüstrasyon: gün doğumunda gölün kıyısında meditasyon yapan kişi" },
        "yemek-karti": { label: "Yemek kartı katkısı", sub: "Her iş günü için sağlanır", alt: "Temsili illüstrasyon: yukarıdan görünen öğle yemeği tabağı, çay ve yemek kartı" },
        "ulasim-destegi": { label: "Ulaşım desteği", sub: "Servis hattı veya yol bedeli", alt: "Temsili illüstrasyon: gün doğumunda otobüs durağında bekleyen çalışan ve şehir içi otobüs" },
        "esnek-calisma": { label: "Esnek çalışma saatleri", sub: "Pozisyona göre uygulanır", alt: "Temsili illüstrasyon: pencere önünde dizüstü bilgisayar, masa saati ve gündüzden geceye uzanan gökyüzü" },
        "egitim-butcesi": { label: "Sektörel eğitim bütçesi", sub: "Yıllık gelişim programı", alt: "Temsili illüstrasyon: lamba ışığında kitap yığını, açık kitap ve gözlük" },
        "kariyer-gorusmesi": { label: "Yıllık kariyer görüşmesi", sub: "Şeffaf performans değerlendirmesi", alt: "Temsili illüstrasyon: iki profesyonelin tablet üzerindeki grafiğe bakarak yaptığı birebir görüşme" },
        "urun-egitimleri": { label: "Marka ve ürün eğitimleri", sub: "Tedarikçi işbirliğiyle", alt: "Temsili illüstrasyon: fren diski sunumu yapan eğitmen ve izleyen katılımcılar" },
        "mentorluk": { label: "Mentorluk programı", sub: "Kıdemli çalışan rehberliği", alt: "Temsili illüstrasyon: merdivende genç çalışana elini uzatan kıdemli çalışan" },
      } as Record<string, BenefitCopy>,
    },
  },
  en: {
    meta: {
      title: "Careers — Human Resources | Delta Oto",
      description: "Careers at Delta Oto: learn about our workplace culture, employee experiences, open positions and the benefits we offer.",
    },
    hero: {
      eyebrow: "Human Resources · Career Opportunities",
      title: ["WE BUILD", "EXPERTISE", "TOGETHER."],
      body: "At Delta Oto, experience grows through responsibility, expertise and a culture of continuous development.",
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
      pause: "Pause",
      resume: "Resume",
      items: {
        "saglik-sigortasi": { label: "Private health insurance", sub: "For all employees", alt: "Representative illustration: a person meditating by a lake at sunrise" },
        "yemek-karti": { label: "Meal card allowance", sub: "Provided for every working day", alt: "Representative illustration: a lunch plate, tea and a meal card seen from above" },
        "ulasim-destegi": { label: "Transportation support", sub: "Shuttle service or commuting allowance", alt: "Representative illustration: a commuter waiting at a bus stop at sunrise with a city bus passing" },
        "esnek-calisma": { label: "Flexible working hours", sub: "Applied depending on the role", alt: "Representative illustration: a laptop and desk clock by a window, the sky moving from day to night" },
        "egitim-butcesi": { label: "Industry training budget", sub: "Annual development program", alt: "Representative illustration: a stack of books, an open book and glasses under a desk lamp" },
        "kariyer-gorusmesi": { label: "Annual career review", sub: "Transparent performance evaluation", alt: "Representative illustration: a one-to-one review between two professionals looking at a chart on a tablet" },
        "urun-egitimleri": { label: "Brand and product training", sub: "Delivered in collaboration with suppliers", alt: "Representative illustration: a trainer presenting a brake disc to an attentive audience" },
        "mentorluk": { label: "Mentorship program", sub: "Guidance from senior colleagues", alt: "Representative illustration: a senior colleague reaching a hand down to a junior colleague on a staircase" },
      } as Record<string, BenefitCopy>,
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

type BenefitItem = {
  id: string;
  label: string;
  sub: string;
  image: string;
  imageSmall: string;
  alt: string;
  focalPoint: string;
};

/**
 * Yan Haklar — tek bant. Yapı:
 *  - TEK yönlü (sağdan sola), TEK bant — ikinci sıra yok, grup pill'i yok.
 *  - Her kartın KENDİ görseli var (bkz. BENEFIT_META üstündeki not): ilk bakışta
 *    görsel + başlık görünür; açıklama KAPALI.
 *  - Metin bölgesinde KONTROLLÜ koyu gradyan: yalnızca kartın alt kısmı
 *    (kapalıyken ~%54, açıkken ~%72) lacivert-siyaha geçer; görselin geri
 *    kalanı doğal rengiyle görünür — düz renk bloğu hissi yok.
 *  - Hover/focus/tap: bant durur (useMeasuredMarquee pausedRef), görsel çok hafif
 *    büyür, gradyan yükselir, başlık yukarı kayar, açıklama grid-rows 0fr→1fr
 *    ile (layout'u itmeden, kendi katmanında) açılır.
 *  - Açık kart `id` ile tutulur (index değil).
 *  - Her benzersiz hak GERÇEK bir <button> (klavye odaklanabilir, görünür
 *    focus-visible ring); ikinci (görsel) kopya aria-hidden + tabIndex=-1 —
 *    ekran okuyucu sekiz hakkı iki kez duymaz, Tab asla görünmeyen kopyaya
 *    girmez. Fare her iki kopyada da çalışır (aria-hidden mouse'u etkilemez).
 *  - Klavye odağı bandı durdurur VE odaklanan kart kırpma penceresinin
 *    dışındaysa içine kaydırır (useMeasuredMarquee.focusItemIntoView).
 *  - Görsel `aria-hidden`: kartın erişilebilir adı başlık + açıklamadır;
 *    `alt` yine de dile göre kayıttan gelir (görsel yüklenemezse/arama
 *    motorları için) ve "temsili illüstrasyon" olduğunu söyler.
 *  - prefers-reduced-motion: otomatik akış tamamen kapalı; sekiz hak TEK
 *    kopya olarak yatay kaydırılabilir (overflow-x-auto) bir sırada.
 */
function BenefitCard({
  item,
  isOpen,
  accessible,
  onOpen,
  onClose,
  onFocusOpen,
  setRef,
}: {
  item: BenefitItem;
  isOpen: boolean;
  accessible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onFocusOpen?: () => void;
  setRef?: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      type="button"
      ref={setRef}
      data-benefit-id={item.id}
      tabIndex={accessible ? 0 : -1}
      aria-hidden={accessible ? undefined : true}
      aria-expanded={accessible ? isOpen : undefined}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={accessible ? onFocusOpen : undefined}
      onBlur={accessible ? onClose : undefined}
      onClick={onOpen}
      className="group relative shrink-0 w-[148px] sm:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden text-left appearance-none cursor-pointer bg-[#0b1230] ring-1 ring-white/15 shadow-[0_18px_40px_-18px_rgba(2,6,24,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d9bea] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A8F]"
    >
      {/* Kartın kendi görseli. Boyutlar (width/height) en-boy oranını (3:4)
          yüklenmeden önce de sabitler — görsel yüklemesi döngü ölçümünü
          etkilemez. srcSet: mobil kart (148px) 450w dosyayı, masaüstü (280px,
          2x ekranlarda 560px) 900w dosyayı seçer. `loading="lazy"` BİLİNÇLİ olarak
          YOK: bant `overflow-hidden` bir kırpma penceresinde akıyor ve tarayıcı
          lazy görselleri, kırpma alanının dışındaki kartlar için kök-marjla
          önceden YÜKLEMİYOR — kartlar pencereye girerken görsel sonradan
          "pop" ederdi (canlı QA'da: mobilde 8. kart, tablette 6–8. kartlar
          boş geliyordu). Sekiz görselin toplamı mobilde ~80KB, masaüstünde
          ~190KB — eager yükleme maliyeti ihmal edilebilir. */}
      <img
        src={item.image}
        srcSet={`${item.imageSmall} 450w, ${item.image} 900w`}
        sizes="(min-width: 640px) 280px, 148px"
        alt={item.alt}
        aria-hidden="true"
        width={900}
        height={1200}
        decoding="async"
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out ${isOpen ? "scale-[1.05]" : "scale-100"}`}
        style={{ objectPosition: item.focalPoint }}
      />
      {/* Kontrollü koyu gradyan — yalnızca metin bölgesinde (bkz. üstteki not). */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 transition-[height] duration-300 ease-out"
        style={{
          height: isOpen ? "72%" : "54%",
          background:
            "linear-gradient(to top, rgba(6,11,34,0.95) 0%, rgba(6,11,34,0.78) 36%, rgba(6,11,34,0.34) 70%, rgba(6,11,34,0) 100%)",
        }}
      />
      {/* Mobil Yoğunluk Turu: p-5→p-4 yalnızca <sm — kart genişliğiyle (148px)
          orantılı, açıklama açıldığında sabit (aspect-[3/4]) yükseklikte
          kesilme/taşma riskini azaltır. Font boyutları KORUNDU. */}
      <div className="relative h-full p-4 sm:p-5 flex flex-col justify-end">
        <h3
          className={`text-white font-bold text-[16px] leading-snug [text-shadow:0_1px_10px_rgba(2,6,24,0.7)] transition-transform duration-300 ease-out ${
            isOpen ? "-translate-y-1" : ""
          }`}
        >
          {item.label}
        </h3>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            isOpen ? "grid-rows-[1fr] mt-1.5" : "grid-rows-[0fr] mt-0"
          }`}
        >
          <p className="overflow-hidden text-white/85 text-[12.5px] leading-relaxed">{item.sub}</p>
        </div>
      </div>
    </button>
  );
}

/**
 * Tek yönlü sonsuz bant. Döngü mesafesi VARSAYILMAZ, ÖLÇÜLÜR (useMeasuredMarquee).
 *
 * Geniş ekran boşluğu düzeltmesi — kopya sayısı da ölçüme dayalı: eski sabit
 * "iki kopya" yalnızca görünür pencere ≤ döngü mesafesi (8 kart × 300px = 2400px)
 * iken boşluksuz kalırdı; ~2400px üstünde (2560/3440 vb.) sağda boşluk açılıyordu.
 * Artık `copies = max(2, ceil(pencereGenişliği / döngüMesafesi) + 1)`: bant sola
 * en fazla bir döngü mesafesi kaydığından (x ∈ (−D, 0]) toplam içerik
 * (copies − 1)·D ≥ pencere olmak zorunda. D = ilk özgün kart ile ikinci kopyanın
 * ilk kartı arasındaki gerçek `getBoundingClientRect().left` farkı; hesap kırpma
 * penceresi/iz boyutu değişince (resize, yönelim, geç yüklenen görsel/yazı tipi)
 * ResizeObserver ile yeniden yapılır. Kopya eklemek/çıkarmak D'yi ve bandın o anki
 * konumunu (x) değiştirmez — duraklatılmış/açık kart yerinde kalır.
 *
 * Birleşim: iz soldan yalnızca kart ARALIĞI kadar (`pl` = gap) boşluk taşır;
 * böylece son kart → ilk kart aralığı diğer tüm aralıklarla birebir aynıdır ve
 * desen tam D periyotludur (gap'ten büyük bir sol dolgu sarma anında sıçrama
 * yaratırdı — bkz. TedarikciPage ReasonsRail).
 *
 * Ekran okuyucu/klavye: yalnızca İLK kopya erişilebilir; diğer kopyalar
 * `aria-hidden` + `tabIndex=-1`. Açık kart `id` ile tutulur, kopyalar arasında
 * aynı id açılır (fare hangi kopyaya girerse girsin). Bu bandın duraklama/açık
 * durumu Neden Delta bandınınkinden BAĞIMSIZDIR (ayrı bileşen, ayrı state/ref).
 */
function BenefitsRail({
  items,
  pauseLabel,
  resumeLabel,
}: {
  items: BenefitItem[];
  pauseLabel: string;
  resumeLabel: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const count = items.length;
  const { cropRef, trackRef, setItemRef, setSeqBStart, setPaused, focusItemIntoView } = useMeasuredMarquee(count, 42);
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [manualPaused, setManualPaused] = React.useState(false);
  const [copies, setCopies] = React.useState(2);
  const firstA = React.useRef<HTMLElement | null>(null);
  const firstB = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    setPaused(manualPaused || openId !== null);
  }, [manualPaused, openId, setPaused]);

  // Kanca ilk özgün kartı ve ikinci kopyanın ilk kartını kendi ölçümü için
  // tutuyor; aynı iki öğeyi kopya-sayısı hesabı için de burada tutuyoruz.
  const setFirstA = React.useCallback((el: HTMLElement | null) => { firstA.current = el; setItemRef[0]?.(el); }, [setItemRef]);
  const setFirstB = React.useCallback((el: HTMLElement | null) => { firstB.current = el; setSeqBStart(el); }, [setSeqBStart]);

  React.useLayoutEffect(() => {
    const crop = cropRef.current;
    if (!crop || reducedMotion) return;
    const update = () => {
      const a = firstA.current;
      const b = firstB.current;
      if (!a || !b) return;
      const loop = b.getBoundingClientRect().left - a.getBoundingClientRect().left;
      const view = crop.clientWidth;
      if (loop > 0 && view > 0) setCopies(Math.max(2, Math.ceil(view / loop) + 1));
    };
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(crop);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [count, reducedMotion, cropRef, trackRef]);

  const close = (id: string) => setOpenId((cur) => (cur === id ? null : cur));

  if (reducedMotion) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-2 -mx-1 px-1">
          {items.map((item) => (
            <BenefitCard
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              accessible
              onOpen={() => setOpenId(item.id)}
              onClose={() => close(item.id)}
              onFocusOpen={() => setOpenId(item.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6 flex justify-end">
        <button
          type="button"
          onClick={() => setManualPaused((p) => !p)}
          aria-pressed={manualPaused}
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#7d9bea] hover:text-white transition-colors rounded-full border border-white/15 hover:border-white/30 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d9bea] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A8F]"
        >
          {manualPaused ? <Play className="w-3.5 h-3.5" strokeWidth={2} /> : <Pause className="w-3.5 h-3.5" strokeWidth={2} />}
          {manualPaused ? resumeLabel : pauseLabel}
        </button>
      </div>
      <div ref={cropRef} className="overflow-hidden">
        <div ref={trackRef} className="flex gap-3 sm:gap-5 pl-3 sm:pl-5 w-max">
          {Array.from({ length: copies }, (_, c) =>
            items.map((item, i) => (
              <BenefitCard
                key={`${c}-${item.id}`}
                item={item}
                isOpen={openId === item.id}
                accessible={c === 0}
                setRef={c === 0 ? (i === 0 ? setFirstA : setItemRef[i]) : c === 1 && i === 0 ? setFirstB : undefined}
                onOpen={() => setOpenId(item.id)}
                onClose={() => close(item.id)}
                onFocusOpen={c === 0 ? () => { setOpenId(item.id); focusItemIntoView(i); } : undefined}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}

export function KariyerPage() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);
  const reveal = useReveal();
  // Yan Haklar: yapısal kayıtlar (BENEFIT_META) + dile göre metin/alt `id` ile birleşir.
  const BENEFITS = joinById(BENEFIT_META, t.benefits.items);

  const scrollToPlatforms = () => {
    const target = document.getElementById("kariyer-platformlari");
    if (!target) return;
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO — kurumsal olarak sağlanan gerçek fotoğraf (bkz.
          public/images/kariyer-hero-team.webp, 2000×1349), Unsplash
          placeholder'ın yerine geçti. Kompozisyonun odağı (birleşen eller)
          kareye zaten yatay/dikey olarak yakın merkezli — bu yüzden hem
          masaüstünde (dikey kırpma) hem mobilde (yatay kırpma) tek bir
          object-position civarı yeterli, İletişim'in köprü fotoğrafındaki
          gibi keskin bir breakpoint ayrımı gerekmedi. İletişim hero'sundaki
          gibi opacity-20 soluk yerine tam görünürlük — kurumsal fotoğraf
          artık gerçek hero görseli, dekoratif placeholder değil. */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/kariyer-hero-team.webp"
            alt=""
            className="w-full h-full object-cover object-[center_50%] sm:object-[center_52%]"
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
            className="do-reveal do-d3 do-tap-target inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-6 py-2.5 text-[13.5px] rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            {t.hero.cta}
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
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
          {/* overflow-x-clip: bu iki kartın do-reveal-left/right pre-reveal
              durumu (opacity:0, translateX(±32px)) rest konumundan taşıyor —
              içerik hiçbir zaman görünür değil (opacity 0) ama sayfanın
              scrollWidth'ine katılıp mobilde ~8px yatay taşmaya yol açıyordu.
              .do-reveal-left/right SİTE GENELİNDE paylaşılan sınıflar (bkz.
              Hakkımızda/Spart/Anasayfa/İletişim) — bu yüzden fix o paylaşılan
              CSS'i DEĞİL, yalnızca bu grid'i kapsıyor; animasyonun kendisi
              (mesafe, süre, masaüstü davranışı) hiç değişmedi. */}
          <div className="grid md:grid-cols-2 gap-6 mb-10 overflow-x-clip">
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

      {/* YAN HAKLAR — tek yönlü, tek bant; sekiz hakkın HER BİRİ kendi
          görseliyle (public/images/benefits/, bkz. BENEFIT_META notu).
          Varsayılan görünüm görsel + başlık; açıklama yalnızca
          hover/focus/tap ile açılıyor. Sekiz gerçek hak aynen korundu. */}
      <section className="relative bg-[#1B3A8F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div ref={reveal} className="do-reveal mb-14 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">{t.benefits.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">{t.benefits.heading}</h2>
            <p className="text-white/60 mt-4 text-[15px] leading-relaxed max-w-xl">
              {t.benefits.desc}
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <BenefitsRail items={BENEFITS} pauseLabel={t.benefits.pause} resumeLabel={t.benefits.resume} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

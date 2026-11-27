import React, { useState } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Globe, ChevronRight, ArrowRight, Users, Package } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { RepresentativeFinderModal } from "@/components/shared/RepresentativeFinderModal";
import { GENERAL_CONTACT } from "@/lib/representatives";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { useReveal } from "@/hooks/use-motion";
import { useLang, routeFor, type Lang } from "@/lib/i18n";

// Departman kartlarının ikonları veriye değil DİZİN'e (index) bağlı — metin
// içeriği content.tr/content.en'de, ikon eşlemesi burada sabit (bkz.
// TedarikciPage.tsx'teki ADVANTAGE_ICONS ile aynı desen).
const DEPT_ICONS = [Package, Mail];

// Merkez Adres kartındaki satırların ikonları — aynı index-eşleme deseni.
const ADDRESS_ICONS = [MapPin, Phone, Mail, Globe];
const contactPhone = { text: GENERAL_CONTACT.phone, href: "tel:+902165266464" };
const contactEmail = { text: GENERAL_CONTACT.email, href: `mailto:${GENERAL_CONTACT.email}` };
const portal = { text: "Parçabul B2B", href: "https://b2b.parcabul.com.tr/login.aspx" };

// Sayfa Kısaltma Turu: eskiden burada "LOKASYON SIRASI" notuyla belgelenen
// "Bizi Nerede Bulabilirsiniz" / Operasyon Merkezlerimiz modülü TAMAMEN
// kaldırıldı (kullanıcı kararı — sayfa çok uzundu, bu modül gereksizdi).
// Gebze/İzmir/Ümraniye adresleri artık bu sayfada tekrarlanmıyor; aynı bilgi
// Operasyon sayfasının kendi depo modülünde zaten var. Ana Adres kartı
// (addressCard, aşağıda) — Ümraniye merkez ofis bilgisini taşıyan asıl genel
// iletişim bloğu — DOKUNULMADI.

const content = {
  tr: {
    meta: {
      title: "Bize Ulaşın — Satış, B2B ve Kurumsal İletişim | Delta Oto",
      description: "Satış, sipariş, Parçabul B2B desteği ve genel talepleriniz için Delta Oto ile iletişime geçin.",
    },
    hero: {
      eyebrow: "İletişim Kanallarımız · Ümraniye, İstanbul",
      title: ["BİZE", "ULAŞIN"],
      body: "Ürün sorguları, B2B portal erişimi veya kurumsal iletişim için size özel kanaldan ulaşın.",
      findRep: "Bölge Temsilcinizi Bulun",
      contactForm: "İletişim Formu",
      b2bPortal: "B2B Portal",
    },
    quickPaths: {
      eyebrow: "Nasıl Yardımcı Olabiliriz?",
      heading: "İki Hızlı Yol",
      general: {
        title: "Genel İletişim",
        desc: "Satış, Parçabul B2B ve kurumsal iletişim kanallarına ulaşın.",
        link: "İletişim kanallarını görün",
      },
      findRep: {
        title: "Bölge Temsilcinizi Bulun",
        desc: "Haritadan ilinizi seçerek satış temsilcilerimizin iletişim bilgilerine ulaşın.",
        link: "Haritayı Açın",
      },
    },
    departments: {
      eyebrow: "İletişim Kanalları",
      heading: "Doğru Birime Ulaşın",
      body: "Talebinize uygun iletişim kanalını seçin.",
      list: [
        {
          dept: "Satış, Sipariş ve Portal Desteği",
          links: [contactPhone, portal],
          info: "Ürün, fiyat ve sipariş sorularınız veya Parçabul’a giriş desteği için bizi arayın.",
        },
        {
          dept: "İletişim",
          links: [contactEmail],
          info: "Genel sorularınız ve talepleriniz için bize yazın.",
        },
      ],
    },
    addressCard: {
      eyebrow: "Merkez Adres",
      heading: "Genel İletişim",
      items: [
        { label: "Merkez Ofis", lines: ["Barbaros Cd. Beyit Sk. No:17,", "Yukarı Dudullu — Ümraniye / İstanbul"] as (string | { text: string; href: string })[] },
        { label: "Santral", lines: [contactPhone] as (string | { text: string; href: string })[] },
        { label: "Kurumsal E-posta", lines: [contactEmail] as (string | { text: string; href: string })[] },
        { label: "Dijital Kanallar", lines: [{ text: "b2b.parcabul.com.tr (B2B Portal)", href: "https://b2b.parcabul.com.tr/login.aspx" }] as (string | { text: string; href: string })[] },
      ],
    },
    form: {
      eyebrow: "Talep Formu",
      heading: "Bize Yazın",
      body: "Formu doldurun, hazırlanan mesajı e-posta uygulamanızdan bize gönderin.",
      fields: {
        ad: { label: "Ad Soyad", ph: "Adınız ve soyadınız" },
        telefon: { label: "Telefon", ph: "+90 5XX XXX XX XX" },
        email: { label: "E-posta", ph: "ornek@posta.com" },
      },
      subjectLabel: "Talep Konusu",
      subjectPlaceholder: "Konu",
      messageLabel: "Mesajınız",
      messagePlaceholder: "Talebinizi ve konuyu kısaca açıklayınız...",
      emailHint: "Mesajı göndermek için e-posta uygulamanızı kullanın. Açılmadıysa",
      submit: "E-posta Uygulamasını Aç",
      privacy: "Bu form, yazdıklarınızı cihazınızda e-posta taslağına aktarır.",
      privacyLinkLabel: "Gizlilik bilgileri",
    },
  },
  en: {
    meta: {
      title: "Contact Us — Sales, B2B and Corporate Contacts | Delta Oto",
      description: "Contact Delta Oto for sales, orders, Parçabul B2B support and general inquiries.",
    },
    hero: {
      eyebrow: "Contact Channels · Ümraniye, İstanbul",
      title: ["CONTACT", "US"],
      body: "Reach us through the right channel for product inquiries, B2B portal access, or corporate communications.",
      findRep: "Find Your Regional Representative",
      contactForm: "Contact Form",
      b2bPortal: "B2B Portal",
    },
    quickPaths: {
      eyebrow: "How Can We Help?",
      heading: "Two Quick Paths",
      general: {
        title: "General Contact",
        desc: "Find our sales, Parçabul B2B and corporate contact channels.",
        link: "View contact channels",
      },
      findRep: {
        title: "Find Your Regional Representative",
        desc: "Choose your province on the map to find contact details for your sales representatives.",
        link: "Open the Map",
      },
    },
    departments: {
      eyebrow: "Contact Channels",
      heading: "Reach the Right Department",
      body: "Choose the contact channel that matches your inquiry.",
      list: [
        {
          dept: "Sales, Orders and Portal Support",
          links: [contactPhone, portal],
          info: "Call us for product, pricing and order inquiries or help signing in to Parçabul.",
        },
        {
          dept: "Contact",
          links: [contactEmail],
          info: "Email us with general questions and inquiries.",
        },
      ],
    },
    addressCard: {
      eyebrow: "Head Office Address",
      heading: "General Contact",
      items: [
        { label: "Head Office", lines: ["Barbaros Cd. Beyit Sk. No:17,", "Yukarı Dudullu — Ümraniye / İstanbul"] as (string | { text: string; href: string })[] },
        { label: "Switchboard", lines: [contactPhone] as (string | { text: string; href: string })[] },
        { label: "Corporate Email", lines: [contactEmail] as (string | { text: string; href: string })[] },
        { label: "Digital Channels", lines: [{ text: "b2b.parcabul.com.tr (B2B Portal)", href: "https://b2b.parcabul.com.tr/login.aspx" }] as (string | { text: string; href: string })[] },
      ],
    },
    form: {
      eyebrow: "Request Form",
      heading: "Write to Us",
      body: "Fill out the form, then send the prepared message from your email app.",
      fields: {
        ad: { label: "Full Name", ph: "Your first and last name" },
        telefon: { label: "Phone", ph: "+90 5XX XXX XX XX" },
        email: { label: "Email", ph: "name@example.com" },
      },
      subjectLabel: "Subject",
      subjectPlaceholder: "Subject",
      messageLabel: "Your Message",
      messagePlaceholder: "Briefly describe your request and subject...",
      emailHint: "Send the message from your email app. If it did not open, write to",
      submit: "Open Email App",
      privacy: "This form prepares an email draft on your device.",
      privacyLinkLabel: "Privacy information",
    },
  },
} satisfies Record<Lang, any>;

export function IletisimPage() {
  const lang = useLang();
  const t = content[lang];
  useDocumentMeta(t.meta.title, t.meta.description);
  const [emailDraftOpened, setEmailDraftOpened] = useState(false);
  const [repModalOpen, setRepModalOpen] = useState(false);
  const reveal = useReveal();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const subject = String(fields.get("konu") ?? "").trim();
    const body = [
      `${t.form.fields.ad.label}: ${fields.get("ad")}`,
      `${t.form.fields.email.label}: ${fields.get("email")}`,
      fields.get("telefon") ? `${t.form.fields.telefon.label}: ${fields.get("telefon")}` : "",
      "",
      String(fields.get("mesaj") ?? "").trim(),
    ].join("\r\n");

    window.location.href = `${contactEmail.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setEmailDraftOpened(true);
  }

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO — kurumsal olarak sağlanan, lisansı belirsiz olmayan yeni bir
          Boğaz Köprüsü fotoğrafı (bkz. public/images/iletisim-hero-bosphorus.webp),
          eski GitHub-kaynaklı/lisansı doğrulanamayan 935×1400 dikey asset'in
          yerine geçti. Yeni kaynak 2000×903 YATAY — eski dikey kaynağın
          object-position mantığı burada geçerli değil, sıfırdan hesaplandı:
          masaüstünde (container kaynaktan çok daha geniş/kısa) dikey kırpma
          olur, tam genişlik korunur — object-[center_48%] köprü kulesi +
          güverte + su şeridini ortada tutar, boş gökyüzünün bir kısmı
          kırpılır. Mobilde (container kaynaktan çok daha dar/uzun) yatay
          kırpma olur.
          Fotoğraf Kalitesi Düzeltme Turu: mobilde eski min-h-[590px], 390px
          genişlikte 2.21:1 oranlı bu geniş fotoğrafın yalnızca ~%30'unu
          gösteriyordu — tek bir kule aşırı yakınlaştırılmış/kadraj taşmış
          gibi duruyordu. min-h düşürüldü (min-h, içerik daha uzunsa hâlâ
          büyüyebilir — metin hiçbir zaman kırpılmaz); aynı yükseklik/genişlik
          oranında container kısaldıkça object-cover görüntünün daha GENİŞ bir
          dilimini gösterir — kule + güverte + iki yakanın silueti artık
          birlikte okunuyor, çözünürlük hissi de aynı kaynağın daha az
          büyütülmesiyle toparlanıyor. Genişleyen kadrajla birlikte eski
          %64 yatay çapa da metnin üzerine kuleyi getiriyordu (okunabilirlik
          düşüyordu) — %50'ye çekilerek kule kadrajın sağına, metin ise
          kablo/gökyüzü gibi daha sakin bir zemine oturuyor. sm/lg
          değerlerine (tablet/masaüstü, zaten iyi kadrajlıydı) dokunulmadı.
          Fotoğraf Kalitesi Düzeltme Turu #2: min-h/object-position zaten
          doğruydu — asıl sorun, masaüstünde bile (1920'de object-cover
          gerçekte YATAYDA hiç kırpma yapmıyor, tam genişlik gösteriliyor)
          sol taraftaki köprünün UZAK/küçük ayağının okunabilirlik gradyanı
          altında neredeyse görünmez kalmasıydı — bu da fotoğrafı "tek bir
          kulenin yakın çekimi" gibi hissettiriyordu, halbuki köprünün tamamı
          zaten kadrajdaydı. Kaynak dosya (202KB, 2000×903, tek versiyon —
          git geçmişinde başka/daha yüksek çözünürlüklü bir öncülü yok)
          quality=95'te yeniden export edilip karşılaştırıldı: yalnızca
          ~%20 boyut farkı çıktı, yani zaten iyi kalitede kodlanmış —
          yeniden export'un görünür bir katkısı olmadığından asset
          değiştirilmedi. Asıl düzeltme: yatay gradyan biraz açıldı
          (from-90/via-50/to-10, önceden from-100/via-70/to-25) — metin hâlâ
          tam okunur kalıyor (üç viewport'ta da doğrulandı) ama uzak kule ve
          şehir silüeti artık seçilebiliyor; "tek kule" hissi yerini
          köprünün bütününe bırakıyor. */}
      <section className="relative min-h-[440px] sm:min-h-[650px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/iletisim-hero-bosphorus.webp"
            alt=""
            className="w-full h-full object-cover object-[50%_42%] sm:object-[center_48%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016]/90 via-[#0e1016]/50 to-[#0e1016]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-20" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-16 lg:py-24">
          <div ref={reveal} className="do-reveal flex items-center gap-3 mb-5 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">{t.hero.eyebrow}</span>
          </div>
          <h1 ref={reveal} className="do-reveal do-d1 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-5">
            <span className="do-hero-line">{t.hero.title[0]}</span><br />
            <span className="text-[#7d9bea]">{t.hero.title[1]}</span>
          </h1>
          <p ref={reveal} className="do-reveal do-d2 text-[17px] text-gray-300 max-w-xl font-light leading-[1.8] mb-6 lg:mb-9">
            {t.hero.body}
          </p>
          <div ref={reveal} className="do-reveal do-d3 flex flex-wrap gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setRepModalOpen(true)}
              className="do-tap-target bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white font-semibold px-6 py-2.5 rounded-md text-[13.5px] transition-all duration-200 flex items-center gap-2 shadow-[0_0_32px_rgba(27,58,143,0.3)] hover:shadow-[0_0_48px_rgba(27,58,143,0.45)]"
            >
              <MapPin className="w-4 h-4" />
              {t.hero.findRep}
            </button>
            <a
              href="#iletisim-formu"
              className="do-tap-target text-gray-200 hover:text-white active:scale-[0.98] text-[13.5px] font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-6 py-2.5 rounded-md transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              {t.hero.contactForm}
            </a>
            <a
              href="https://b2b.parcabul.com.tr/login.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="do-tap-target group text-gray-200 hover:text-white active:scale-[0.98] text-[13.5px] font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-6 py-2.5 rounded-md transition-all duration-200"
            >
              {t.hero.b2bPortal}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* NASIL YARDIMCI OLABİLİRİZ — iki net yol: genel iletişim / temsilci bul.
          Eski ince "Temsilcilerimiz sayfasına gidin" banner'ının yerine geçti —
          artık ayrı bir sayfaya değil, aynı sayfa içindeki modalı açıyor. */}
      <section className="bg-white py-16 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.quickPaths.eyebrow}</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">{t.quickPaths.heading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <a ref={reveal} href="#genel-iletisim" className="do-reveal-left do-card group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#1B3A8F]/[0.08] flex items-center justify-center mb-5 group-hover:bg-[#1B3A8F] transition-colors">
                <Users className="w-6 h-6 text-[#1B3A8F] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{t.quickPaths.general.title}</h3>
              <p className="text-slate-500 text-[13.5px] leading-relaxed mb-5 flex-1">{t.quickPaths.general.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1B3A8F]">
                {t.quickPaths.general.link} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
            <button ref={reveal} type="button" onClick={() => setRepModalOpen(true)} className="do-reveal-right do-card group bg-[#1B3A8F] rounded-2xl p-8 flex flex-col text-left">
              <div className="w-12 h-12 rounded-xl bg-white/[0.12] flex items-center justify-center mb-5 group-hover:bg-white transition-colors">
                <MapPin className="w-6 h-6 text-white group-hover:text-[#1B3A8F] transition-colors" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">{t.quickPaths.findRep.title}</h3>
              <p className="text-white/60 text-[13.5px] leading-relaxed mb-5 flex-1">{t.quickPaths.findRep.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white">
                {t.quickPaths.findRep.link} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* DEPARTMAN KİŞİ BİLGİLERİ — light */}
      <section id="genel-iletisim" className="scroll-mt-24 bg-[#f8fafc] py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={reveal} className="do-reveal mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.departments.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">{t.departments.heading}</h2>
            <p className="text-slate-500 mt-3 text-[15px]">{t.departments.body}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.departments.list.map(({ dept, links, info }, i) => {
              const Icon = DEPT_ICONS[i];
              return (
                <div key={dept} ref={reveal} className={`do-reveal do-d${i + 1} bg-white border border-slate-200 rounded-xl p-6 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all flex flex-col`}>
                  <div className="w-10 h-10 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#1B3A8F]" />
                  </div>
                  <h3 className="text-[14px] font-bold text-slate-900 mb-2 leading-snug">{dept}</h3>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed mb-3 flex-1">{info}</p>
                  <div className="border-t border-slate-100 pt-3 space-y-1.5">
                    {links.map(({ href, text }) => (
                      <a key={href} href={href} className="block text-[13px] text-[#1B3A8F] hover:underline font-medium">
                        {text}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM + ADRES — light. Lokasyonlar'dan önceye taşındı: footer'dan hemen önceki bölüm
          proje kuralı gereği navy olmalı, bu da yalnızca burada zaten navy olan Lokasyonlar'ı
          en sona almakla (bkz. CLAUDE.md §9.2) en az müdahaleyle sağlanıyor. */}
      <section id="iletisim-formu" className="scroll-mt-24 bg-[#f8fafc] py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12 items-start">

          <div ref={reveal} className="do-reveal-left lg:col-span-2">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.addressCard.eyebrow}</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">{t.addressCard.heading}</h2>
            </div>
            {/* Tek, yoğun özet kart — Departman İletişim'deki ikon-kart ızgarasının bir
                tekrarı olmasın diye satır bölmeli tek kart olarak tasarlandı. Doğal
                (zorlanmamış) yükseklik: içerik ne kadar yer kaplıyorsa o kadar —
                önceki versiyon sağdaki form kartıyla eşit yükseklik için satırlar
                arasına yapay boşluk ekliyordu, dağınık görünüyordu. */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
              {t.addressCard.items.map(({ label, lines }, i) => {
                const Icon = ADDRESS_ICONS[i];
                return (
                  <div key={label} className="flex items-center gap-3.5 px-5 py-4 hover:bg-slate-50 transition-colors">
                    <div className="shrink-0 w-8 h-8 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#1B3A8F]" />
                    </div>
                    <div>
                      <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">{label}</div>
                      {lines.map((l, idx) => {
                        const text = typeof l === "string" ? l : l.text;
                        const href = typeof l === "string" ? undefined : l.href;
                        const cls = `text-[12.5px] leading-snug ${idx === 0 ? "text-slate-900 font-semibold" : "text-slate-500"}`;
                        return href ? (
                          <a key={idx} href={href} target={href.startsWith("https:") ? "_blank" : undefined} rel="noopener noreferrer" className={`${cls} hover:text-[#1B3A8F] hover:underline transition-colors`}>{text}</a>
                        ) : (
                          <div key={idx} className={cls}>{text}</div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div ref={reveal} className="do-reveal-right lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">{t.form.eyebrow}</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">{t.form.heading}</h2>
              <p className="text-slate-500 mt-2 text-[14px]">{t.form.body}</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { id: "ad", label: t.form.fields.ad.label, ph: t.form.fields.ad.ph, type: "text", required: true, maxLength: 100 },
                  { id: "telefon", label: t.form.fields.telefon.label, ph: t.form.fields.telefon.ph, type: "tel", required: false, maxLength: 40 },
                  { id: "email", label: t.form.fields.email.label, ph: t.form.fields.email.ph, type: "email", required: true, maxLength: 254 },
                ].map(({ id, label, ph, type, required, maxLength }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
                    <input
                      id={id}
                      name={id}
                      autoComplete={id === "ad" ? "name" : id === "email" ? "email" : "tel"}
                      type={type}
                      required={required}
                      maxLength={maxLength}
                      placeholder={ph}
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <label htmlFor="konu" className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t.form.subjectLabel}</label>
                <input
                  id="konu"
                  name="konu"
                  required
                  maxLength={120}
                  placeholder={t.form.subjectPlaceholder}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 focus:outline-none focus:border-[#1B3A8F]"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="mesaj" className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t.form.messageLabel}</label>
                <textarea
                  id="mesaj"
                  name="mesaj"
                  required
                  rows={4}
                  maxLength={1500}
                  placeholder={t.form.messagePlaceholder}
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition resize-none"
                />
              </div>
              {emailDraftOpened && (
                <p className="mt-5 text-sm text-slate-700" role="status">
                  {t.form.emailHint} <a href={contactEmail.href} className="text-[#1B3A8F] underline">{contactEmail.text}</a>.
                </p>
              )}
              <button
                type="submit"
                className="mt-6 w-full bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {t.form.submit} <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[12px] text-slate-400 mt-4">
                {t.form.privacy}{" "}
                <Link href={routeFor("privacy", lang)} className="text-[#1B3A8F] font-medium hover:underline">
                  {t.form.privacyLinkLabel}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />

      <RepresentativeFinderModal open={repModalOpen} onClose={() => setRepModalOpen(false)} lang={lang} />
    </div>
  );
}

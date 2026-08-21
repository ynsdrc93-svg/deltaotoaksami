import React from "react";
import { Link } from "wouter";
import { MapPin, Mail, Phone, BadgeCheck, Linkedin, Instagram } from "lucide-react";
import { useLang, routeFor, type Lang, type RouteKey } from "@/lib/i18n";

// "Private Label" başlığı kaldırıldı (kullanıcı kararı, Content/UX Pass 01) —
// SPART kendi marka/ürün hedefi olarak kalıyor, yalnızca üst başlık gitti.
// GROUPAUTO Türkiye üyelik rozeti: "Groupauto Logo Types-01.png" kaynağından
// (kullanıcı sağladı) — trim edilip webp'e dönüştürüldü, sanat değiştirilmedi.
// Kendi ışık/koyu yarımlarıyla zaten görsel bir çerçeve taşıdığı için ek bir
// kutu/border eklenmedi; Sertifikalar sütununun sosyal medya bloğuyla aynı
// ayraçlı alt-bölümde, ondan hemen önce duruyor.
// "SPART" başlığı da kaldırıldı (Desktop Feedback Round) — logo tek başına,
// başlıksız duruyor; hedef/link (routeFor("spart")) DEĞİŞMEDİ.
//
// SOSYAL MEDYA: doğrulanmış resmi hesap URL'leri kullanıcı tarafından
// sağlandı (LinkedIn şirket sayfası + Instagram). Aynı LinkedIn URL'i
// KariyerPage.tsx'teki "LinkedIn'de Pozisyonları İnceleyin" CTA'sında da
// güncellendi — iki yerde farklı/eski bir bağlantı kalmasın diye.
// Konum: Footer Revizyonu talebiyle bottom legal bar'dan (kopuk/sonradan-
// eklenmiş görünüyordu) Sertifikalar kolonunun altına taşındı — aynı
// kolonun doğal akışında, ince bir ayraçla ayrılmış sessiz bir alt-blok;
// sertifika kutularıyla boyut/vurgu olarak yarışmıyor.
const SOCIAL_LINKS: { label: string; href: string; Icon: typeof Linkedin }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/delta-oto-aksam%C4%B1-san-ve-tic-a-%C5%9F/?viewAsMember=true", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/delta_oto/", Icon: Instagram },
];
const QUICK_LINKS: { key: RouteKey; label: Record<Lang, string> }[] = [
  { key: "about", label: { tr: "Hakkımızda", en: "About Us" } },
  { key: "partners", label: { tr: "İş Ortaklarımız", en: "Partners" } },
  { key: "operations", label: { tr: "Operasyon ve Lojistik", en: "Operations & Logistics" } },
  { key: "careers", label: { tr: "Kariyer", en: "Careers" } },
  { key: "contact", label: { tr: "İletişim", en: "Contact" } },
  { key: "representatives", label: { tr: "Temsilcilerimiz", en: "Representatives" } },
];

const CERTS: { label: Record<Lang, string> }[] = [
  { label: { tr: "OSS\nDerneği", en: "OSS\nAssociation" } },
  { label: { tr: "ISO\n9001", en: "ISO\n9001" } },
  { label: { tr: "TS\nEN", en: "TS\nEN" } },
];

const T = {
  quickLinks: { tr: "Hızlı Bağlantılar", en: "Quick Links" },
  certsHeading: { tr: "Sertifikalar & Üyelikler", en: "Certifications & Memberships" },
  certsBody: {
    tr: "Kalite standartlarımız ve sektörel üyeliklerimizle güvenilir iş ortaklığının güvencesini sunuyoruz.",
    en: "Our quality standards and industry memberships back every partnership we build.",
  },
  rights: { tr: "© 2026 Delta Oto. Tüm hakları saklıdır.", en: "© 2026 Delta Oto. All rights reserved." },
  established: { tr: "Delta Oto · Kuruluş 1976", en: "Delta Oto · Established 1976" },
  groupautoMember: { tr: "GROUPAUTO Türkiye Üyesi", en: "GROUPAUTO Türkiye Member" },
} satisfies Record<string, Record<Lang, string>>;

export function SiteFooter() {
  const lang = useLang();

  return (
    <footer className="bg-[#0a0c11] pt-16 md:pt-20 pb-10 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">

          <div>
            {/* Klasik (50. yıl kampanya etiketi eklenmeden önceki) Delta Oto
                logosu — header'daki yeni Delta 50 logosundan bilinçli olarak
                farklı, footer'a özel bir asset (origin/main / 700c053'ten
                alındı). Header'daki kampanya logosu DEĞİŞMEDİ. Boyut duyarlı:
                masaüstünde (md+, footer'ın kendi 3 kolonlu grid eşiğiyle
                aynı) 70px — birincil kurumsal marka olarak güçlü bir
                varlık. Mobilde aynı yükseklik genişlik/en-boy oranı
                nedeniyle (1152:240 ≈ 4.8:1) 390px'lik görünümü neredeyse
                uçtan uca kaplayıp orantısız dururdu — 59px'te kalıyor. */}
            <img
              src="/images/delta-oto-logo-classic.webp"
              alt="Delta Oto"
              width={1152}
              height={240}
              className="h-[59px] md:h-[70px] w-auto do-logo-invert mb-8 opacity-85"
            />
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 text-gray-500 mt-0.5" />
                <span className="leading-relaxed">Barbaros Cd. Beyit Sk. No:17,<br />Yukarı Dudullu - Ümraniye / İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-gray-500" />
                <a href="mailto:info@deltaoto.com" className="hover:text-white transition-colors">info@deltaoto.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-gray-500" />
                <span>0216 526 64 64 / 0216 526 33 44</span>
              </li>
            </ul>
          </div>

          <div className="md:pl-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">{T.quickLinks[lang]}</h4>
            <ul className="space-y-3.5">
              {QUICK_LINKS.map(({ key, label }) => (
                <li key={key}>
                  <Link href={routeFor(key, lang)} className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#1B3A8F] inline-block transition-all duration-200" />
                    {label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href={routeFor("spart", lang)}>
                <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-9 w-auto rounded-md opacity-90 hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">{T.certsHeading[lang]}</h4>
            <div className="flex gap-4 mb-8">
              {CERTS.map(({ label }) => (
                <div key={label.tr} className="w-20 h-16 border border-white/8 rounded-lg flex flex-col items-center justify-center gap-1 bg-white/3 hover:border-white/15 transition-colors">
                  <BadgeCheck className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[10px] text-gray-400 font-bold text-center whitespace-pre-line leading-tight">{label[lang]}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              {T.certsBody[lang]}
            </p>
            <div className="mt-7 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/images/groupauto-turkiye-badge.webp"
                  alt="GROUPAUTO Türkiye"
                  width={400}
                  height={199}
                  className="h-8 w-auto shrink-0 rounded-[3px]"
                />
                <span className="text-[12.5px] text-gray-300 font-semibold leading-tight">{T.groupautoMember[lang]}</span>
              </div>
              {SOCIAL_LINKS.length > 0 && (
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>{T.rights[lang]}</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1B3A8F] animate-pulse" />
            <span>{T.established[lang]}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

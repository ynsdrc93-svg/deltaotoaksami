import React from "react";
import { Link } from "wouter";
import { MapPin, Mail, Phone, BadgeCheck, Linkedin } from "lucide-react";
import { useLang, routeFor, type Lang, type RouteKey } from "@/lib/i18n";

// "Private Label" başlığı kaldırıldı (kullanıcı kararı, Content/UX Pass 01) —
// SPART kendi marka/ürün hedefi olarak kalıyor, yalnızca üst başlık gitti.
// GROUPAUTO Türkiye'ye ait resmi, temiz bir rozet/ikon asset'i repo'da
// bulunamadı (yalnızca etkinlik fotoğrafları mevcuttu) — bu yüzden
// eklenmedi; bkz. görev raporu "eksik asset" notu.
// "SPART" başlığı da kaldırıldı (Desktop Feedback Round) — logo tek başına,
// başlıksız duruyor; hedef/link (routeFor("spart")) DEĞİŞMEDİ.
//
// SOSYAL MEDYA: yalnızca kod tabanında ZATEN var olan, doğrulanmış resmi
// bağlantı eklendi — LinkedIn (KariyerPage.tsx'te "LinkedIn'de Pozisyonları
// İnceleyin" CTA'sı için önceden onaylanmış https://www.linkedin.com/company/delta-oto).
// Instagram ve YouTube için repo içinde HİÇBİR resmi URL bulunamadı — bu
// ikisi icat edilmedi, href="#" kullanılmadı, hiç render edilmiyor. Gerçek
// hesap URL'leri sağlandığında buraya aynı desenle eklenebilir.
const SOCIAL_LINKS: { label: string; href: string; Icon: typeof Linkedin }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/delta-oto", Icon: Linkedin },
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
} satisfies Record<string, Record<Lang, string>>;

export function SiteFooter() {
  const lang = useLang();

  return (
    <footer className="bg-[#0a0c11] pt-16 md:pt-20 pb-10 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">

          <div>
            <img
              src="/images/delta-oto-logo.webp"
              alt="Delta Oto"
              width={963}
              height={240}
              className="h-14 w-auto do-logo-invert mb-8 opacity-85"
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
            <div className="mt-10">
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
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>{T.rights[lang]}</span>
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1B3A8F] animate-pulse" />
              <span>{T.established[lang]}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

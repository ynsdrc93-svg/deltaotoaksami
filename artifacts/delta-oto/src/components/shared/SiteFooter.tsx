import { Link } from "wouter";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone, Printer } from "lucide-react";
import { useLang, routeFor, type Lang, type RouteKey } from "@/lib/i18n";

const HQ_ADDRESS = "Barbaros Caddesi Beyit Sokak No:17, Yukarı Dudullu, Ümraniye, İstanbul";
const HQ_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HQ_ADDRESS)}`;
const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/delta-oto-aksam%C4%B1-san-ve-tic-a-%C5%9F/?viewAsMember=true", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/delta_oto/", Icon: Instagram },
];
const QUICK_LINKS: { key: RouteKey; label: Record<Lang, string> }[] = [
  { key: "about", label: { tr: "Hakkımızda", en: "About Us" } },
  { key: "partners", label: { tr: "İş Ortaklarımız", en: "Partners" } },
  { key: "operations", label: { tr: "Operasyon ve Lojistik", en: "Operations & Logistics" } },
  { key: "careers", label: { tr: "Kariyer", en: "Careers" } },
  { key: "contact", label: { tr: "İletişim", en: "Contact" } },
];
const LEGAL_LINKS: { key: RouteKey; label: Record<Lang, string>; shortLabel: Record<Lang, string> }[] = [
  { key: "privacy", label: { tr: "Gizlilik Politikası", en: "Privacy Policy" }, shortLabel: { tr: "Gizlilik", en: "Privacy" } },
  { key: "cookies", label: { tr: "Çerez Politikası", en: "Cookie Policy" }, shortLabel: { tr: "Çerezler", en: "Cookies" } },
  { key: "kvkk", label: { tr: "İletişim Verileri Hakkında Bilgilendirme", en: "Contact Data Notice" }, shortLabel: { tr: "KVKK", en: "KVKK" } },
];

const T = {
  quickLinks: { tr: "Hızlı Bağlantılar", en: "Quick Links" },
  membershipsHeading: { tr: "Üyelikler ve Bayilikler", en: "Memberships and Dealerships" },
  rights: { tr: "© 2026 Delta Oto. Tüm hakları saklıdır.", en: "© 2026 Delta Oto. All rights reserved." },
  directions: { tr: "Yol Tarifi", en: "Directions" },
  fax: { tr: "Faks", en: "Fax" },
  groupautoMember: { tr: "GROUPAUTO Türkiye Üyesi", en: "GROUPAUTO Türkiye Member" },
  oparMember: { tr: "Opar Ege Bölge Bayiliği", en: "Opar Aegean Regional Dealership" },
  ossMember: { tr: "OSS Derneği Üyesi", en: "OSS Association Member" },
} satisfies Record<string, Record<Lang, string>>;

const heading = "mb-3 text-xs font-bold uppercase tracking-[0.15em] text-white";
const link = "rounded-sm transition-colors hover:text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9db7ff]";
const membershipRow = "grid min-h-12 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 py-2.5";

export function SiteFooter() {
  const lang = useLang();

  return (
    <footer className="border-t border-white/10 bg-[#0a0c11] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-x-10 gap-y-8 py-9 sm:grid-cols-2 md:grid-cols-[1.2fr_0.85fr_1.05fr] md:py-11 lg:gap-x-16">
          <div>
            <img
              src="/images/delta-oto-logo-classic.webp"
              alt="Delta Oto"
              width={918}
              height={222}
              className="do-logo-invert mb-4 block h-auto w-56 max-w-full lg:w-64"
            />
            <ul className="space-y-2.5 text-sm leading-relaxed">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <a
                  href={HQ_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${T.directions[lang]}: ${HQ_ADDRESS}`}
                  className={link}
                >
                  Barbaros Cd. Beyit Sk. No:17,<br />Yukarı Dudullu – Ümraniye / İstanbul
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <a href="mailto:info@deltaoto.com" className={link}>info@deltaoto.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <a href="tel:+902165266464" className={link}>0216 526 64 64</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Printer className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <span><span className="sr-only">{T.fax[lang]}: </span>0216 526 33 44</span>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`${link} inline-flex size-9 items-center justify-center rounded-md border border-white/15 hover:bg-white/10`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={T.quickLinks[lang]}>
            <h4 className={heading}>{T.quickLinks[lang]}</h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map(({ key, label }) => (
                <li key={key}>
                  <Link href={routeFor(key, lang)} className={link}>{label[lang]}</Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href={routeFor("spart", lang)} className={`${link} inline-flex`}>
                  <img src="/images/spart/logo.webp" alt="SPART Original Replacement" className="h-8 w-auto rounded-sm" />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="sm:col-span-2 md:col-span-1">
            <h4 className={heading}>{T.membershipsHeading[lang]}</h4>
            <ul className="divide-y divide-white/10 text-sm leading-snug">
              <li className={membershipRow}>
                <img src="/images/groupauto-turkiye-badge.webp" alt="" width={400} height={199}
                  className="h-8 w-auto rounded-sm" />
                <span>{T.groupautoMember[lang]}</span>
              </li>
              <li className={membershipRow}>
                <img src="/images/opar-logo-white.svg" alt="" width={849} height={341}
                  className="h-6 w-auto" />
                <span>{T.oparMember[lang]}</span>
              </li>
              <li>
                <a href="https://oss.org.tr/tr/uyeler/uyeler" className={`${link} ${membershipRow}`}>
                  <ArrowUpRight className="ml-5 size-4 text-slate-400" aria-hidden="true" />
                  <span>{T.ossMember[lang]}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>{T.rights[lang]}</span>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {LEGAL_LINKS.map(({ key, label, shortLabel }) => (
              <li key={key}>
                <Link href={routeFor(key, lang)} aria-label={label[lang]} className={link}>
                  {shortLabel[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

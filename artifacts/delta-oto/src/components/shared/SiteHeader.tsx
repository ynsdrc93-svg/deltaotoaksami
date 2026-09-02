import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEscapeKey, useScrolled } from "../../hooks/use-motion";
import { useLang, routeFor, type Lang } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Nav etiketleri: "Tedarikçiler" görünür kullanıcı terminolojisi olarak
// "İş Ortaklarımız" (nav'da kısaca "Partners"/"İş Ortaklarımız") oldu — route
// (/tedarikciler) bilinçli olarak DEĞİŞMEDİ, mevcut linkler kırılmasın diye
// (bkz. lib/i18n.ts routeFor). İç veri adı hâlâ "partners" (RouteKey).
const NAV: { key: "about" | "partners" | "operations" | "careers" | "contact"; label: Record<Lang, string> }[] = [
  { key: "about", label: { tr: "Hakkımızda", en: "About Us" } },
  { key: "partners", label: { tr: "İş Ortaklarımız", en: "Partners" } },
  { key: "operations", label: { tr: "Operasyon ve Lojistik", en: "Operations & Logistics" } },
  { key: "careers", label: { tr: "Kariyer", en: "Careers" } },
  { key: "contact", label: { tr: "İletişim", en: "Contact" } },
];

const B2B_LABEL: Record<Lang, string> = { tr: "B2B Portal", en: "B2B Portal" };
const MENU_OPEN_LABEL: Record<Lang, string> = { tr: "Menüyü aç", en: "Open menu" };
const MENU_CLOSE_LABEL: Record<Lang, string> = { tr: "Menüyü kapat", en: "Close menu" };

export function SiteHeader() {
  // Çift eşik (90 gir / 20 çık): header'ın kendi yükseklik geçişi scroll
  // pozisyonunu hafifçe kaydırabildiği (scroll anchoring) için tek eşik,
  // sınırda ileri-geri salınıma (jitter) yol açıyordu — bkz. useScrolled.
  const scrolled = useScrolled(90, 20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const lang = useLang();

  useEffect(() => { setMobileOpen(false); }, [location]);
  useEscapeKey(() => setMobileOpen(false), mobileOpen);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200"
        style={scrolled ? { background: "rgba(255,255,255,0.98)", borderColor: "rgba(15,23,42,0.1)", boxShadow: "0 4px 24px rgba(15,23,42,0.08)" } : {}}
      >
        <div className={`w-full px-6 lg:px-10 xl:px-16 flex items-center justify-between transition-[height] duration-300 ${scrolled ? "h-[59px] sm:h-[68px]" : "h-[88px] sm:h-28"}`}>

          {/* Logo — sabit solda. Mobilde (<sm) ~9-10% küçültüldü + 2px yukarı
              optik düzeltme (logo hafif alçak duruyordu) — sm ve üzeri (masaüstü)
              boyut/hizalama birebir korunuyor. Header/Supplier Assets Round:
              logo "Delta-50Yil-Header-Logo.png" kaynağına güncellendi (trim +
              küçük kenar boşluğu + webp, sanat değiştirilmedi) — eski
              delta-oto-logo.webp artık hiçbir yerde referans edilmiyor ama
              silinmedi. Yeni asset'in kırpılmış en-boy oranı (883:240 ≈
              3.68:1) eskisinden (963:240 ≈ 4.01:1) biraz daha dar olduğu için
              aynı yükseklik sınıflarında biraz daha az yatay yer kaplıyor —
              header taşması riski azaldı, ek bir boyut düzeltmesi gerekmedi.

              Görsel/UX Düzeltme Turu §1: scrolled (küçülmüş) durumda motto
              satırı ("Dünyanın Parçası 50 Yıldır...") okunmaz hâle geliyordu.
              Motto'yu CSS ile GİZLEMEK yerine (istenmedi), zaten var olan
              motto'suz "delta50.yıl" varyantı (delta-oto-logo-classic.webp —
              SiteFooter'da halihazırda kullanılıyor, aynı marka ailesinden
              doğrulanmış bir asset, yeniden kırpma/rekonstrüksiyon riski yok)
              scrolled durumda devreye giriyor. İki görselin doğal en-boy
              oranı FARKLI (883:240 vs 918:222) — düz bir src değişimi ani bir
              genişlik sıçraması (CLS) yaratırdı. Çözüm: sarmalayıcının
              yüksekliği VE genişliği birlikte, her iki görselin KENDİ gerçek
              oranına göre hesaplanmış hedef piksel değerlerine geçiş yapıyor
              (aşağıdaki w-[…] değerleri elle hesaplandı — bkz. görev raporu);
              içerideki iki <img> mutlak konumlu, object-contain ile bu kutuyu
              hizasını bozmadan dolduruyor ve opacity ile çapraz geçiş yapıyor.
              Sonuç: pürüzsüz crossfade, sıçrama/jitter/nav kayması yok. */}
          <Link href={routeFor("home", lang)} className="flex items-center shrink-0" aria-label="Delta Oto 50. Yıl">
            <span
              className={`relative inline-block shrink-0 transition-[height,width] duration-300 -mt-0.5 sm:mt-0 ${
                scrolled ? "h-9 sm:h-12 w-[133px] sm:w-[177px]" : "h-[58px] sm:h-20 w-[213px] sm:w-[294px]"
              }`}
            >
              <img
                src="/images/delta-oto-header-logo.webp"
                alt=""
                aria-hidden="true"
                width={883}
                height={240}
                className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`}
              />
              <img
                src="/images/delta-oto-logo-classic.webp"
                alt=""
                aria-hidden="true"
                width={918}
                height={222}
                className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
              />
            </span>
          </Link>

          {/* Sağ grup: nav + dil + B2B Portal butonu — Header Rebalance
              Round: eski gap-3/gap-4 sıkışık duruyordu (kullanıcı geri
              bildirimi), gap-4/gap-5'e çıkarıldı — daha kurumsal, daha az
              "yığılmış" bir sağ küme. */}
          <div className="flex items-center gap-4 xl:gap-6 shrink-0">
            <nav className="hidden xl:flex items-center gap-5 xl:gap-7 text-[13.5px] font-medium tracking-tight text-slate-600">
              {NAV.map(({ key, label }) => {
                const href = routeFor(key, lang);
                const isActive = location === href;
                return (
                  <Link
                    key={key}
                    href={href}
                    className={`do-nav-link whitespace-nowrap transition-colors duration-200 ${
                      isActive ? "text-[#1B3A8F] font-semibold do-active" : "hover:text-[#1B3A8F]"
                    }`}
                  >
                    {label[lang]}
                  </Link>
                );
              })}
            </nav>

            <span className="hidden xl:block w-px h-6 bg-slate-200 shrink-0" />

            <div className="hidden xl:block">
              <LanguageSwitcher />
            </div>

            {/* B2B Portal — Header/Supplier Assets Round: SPART tamamen
                header'dan kaldırıldı (kullanıcı kararı; SPART footer'da
                kalmaya devam ediyor). B2B artık paylaşılan bir çerçeve/stack
                içinde değil, kendi başına duran kompakt bir buton — SPART
                gittiği için boşta kalan dikey stack alanı da kaldırıldı,
                buton nav satırıyla aynı hizada tek satır olarak duruyor.
                Biraz büyütüldü (px-4 h-9, text-[11px]) çünkü artık yalnız
                başına daha "kasıtlı" görünmesi gerekiyordu — SPART'ın
                küçük ikinci öğesi olmadan eski 26px yükseklik fazla
                mütevazı/kayıp kalıyordu. */}
            <a
              href="https://b2b.parcabul.com.tr/login.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center justify-center gap-1.5 px-5 h-9 rounded-[4px] bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[11px] font-bold tracking-[0.03em] transition-colors group whitespace-nowrap shrink-0"
            >
              {B2B_LABEL[lang].toUpperCase()}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              type="button"
              aria-label={mobileOpen ? MENU_CLOSE_LABEL[lang] : MENU_OPEN_LABEL[lang]}
              aria-expanded={mobileOpen}
              aria-controls="do-site-mobile-nav"
              onClick={() => setMobileOpen(o => !o)}
              className="xl:hidden inline-flex items-center justify-center w-11 h-11 -mr-2.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile nav panel */}
        <div id="do-site-mobile-nav" className={`do-mobile-panel xl:hidden border-slate-200 ${mobileOpen ? "do-open border-t" : ""}`}>
          <div>
            <nav className="w-full px-6 py-3 flex flex-col">
              {NAV.map(({ key, label }) => {
                const href = routeFor(key, lang);
                const isActive = location === href;
                return (
                  <Link
                    key={key}
                    href={href}
                    className={`py-3 text-[15px] font-medium border-b border-slate-100 last:border-b-0 ${isActive ? "text-[#1B3A8F] font-semibold" : "text-slate-700 hover:text-[#1B3A8F]"}`}
                  >
                    {label[lang]}
                  </Link>
                );
              })}
              <div className="py-3 flex items-center justify-between border-t border-slate-100 mt-1 pt-4">
                <span className="text-[13px] font-medium text-slate-500">{lang === "tr" ? "Dil" : "Language"}</span>
                <LanguageSwitcher variant="mobile" />
              </div>
              <a
                href="https://b2b.parcabul.com.tr/login.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white text-[15px] font-semibold px-5 py-3 rounded-md transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                {B2B_LABEL[lang]}
                <ArrowRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

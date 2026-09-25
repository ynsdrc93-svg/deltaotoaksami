import React from "react";
import { Link } from "wouter";
import { MapPin, Mail, Phone, Printer, BadgeCheck, Linkedin, Instagram } from "lucide-react";
import { useLang, routeFor, type Lang, type RouteKey } from "@/lib/i18n";

// Google Maps Yol Tarifi Turu: koordinat UYDURULMADI — mevcut, tek adres
// metninden (aşağıdaki JSX'teki aynı satır) standart bir "directions" arama
// sorgusu kuruluyor; Google, adresi kendi tarafında çözümlüyor. Yalnızca bu
// footer'da kullanıldığı için tek bir sabitte tutuluyor.
const HQ_ADDRESS = "Barbaros Caddesi Beyit Sokak No:17, Yukarı Dudullu, Ümraniye, İstanbul";
const HQ_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HQ_ADDRESS)}`;

// "Private Label" başlığı kaldırıldı (kullanıcı kararı, Content/UX Pass 01) —
// SPART kendi marka/ürün hedefi olarak kalıyor, yalnızca üst başlık gitti.
// "SPART" başlığı da kaldırıldı (Desktop Feedback Round) — logo tek başına,
// başlıksız duruyor; hedef/link (routeFor("spart")) DEĞİŞMEDİ.
//
// SOSYAL MEDYA: doğrulanmış resmi hesap URL'leri kullanıcı tarafından
// sağlandı (LinkedIn şirket sayfası + Instagram). Aynı LinkedIn URL'i
// KariyerPage.tsx'teki "LinkedIn'de Pozisyonları İnceleyin" CTA'sında da
// güncellendi — iki yerde farklı/eski bir bağlantı kalmasın diye.
// Konum: Footer Revizyonu talebiyle bottom legal bar'dan (kopuk/sonradan-
// eklenmiş görünüyordu) Sertifikalar kolonunun altına taşındı.
//
// GROUPAUTO Türkiye üyelik rozeti: "Groupauto Logo Types-01.png" kaynağından
// (kullanıcı sağladı) — trim edilip webp'e dönüştürüldü, sanat değiştirilmedi.
// Header/Supplier Assets Round: sertifika/üyelik alt-bölümünün hiyerarşisi
// yeniden kuruldu — artık SOSYAL İKONLAR önce, tek bir ayraç, sonra GROUPAUTO
// Türkiye üyeliği EN SONDA (kullanıcı talimatı: üyelik mesajı bu alt-
// bölümün son öğesi olmalı). Rozet ölçülü şekilde büyütüldü (h-8 → h-10) —
// hâlâ ana Delta logosunun (59-70px) çok altında, baskın değil. Jenerik
// "Kalite standartlarımız..." açıklama metni tamamen kaldırıldı — sertifika
// kutuları kendi başına duruyor, gereksiz dolgu cümleye ihtiyaç yok.
const SOCIAL_LINKS: { label: string; href: string; Icon: typeof Linkedin }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/delta-oto-aksam%C4%B1-san-ve-tic-a-%C5%9F/?viewAsMember=true", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/delta_oto/", Icon: Instagram },
];
// Sıra Turu 3: "İletişim" artık son sırada, "Temsilcilerimiz"in HEMEN
// altında (görev talimatı) — yalnızca bu dizinin sırası değişti, header'ın
// kendi nav dizisi (SiteHeader.tsx'teki NAV) ve adres/iletişim bloğunun
// footer içindeki konumu DOKUNULMADI.
const QUICK_LINKS: { key: RouteKey; label: Record<Lang, string> }[] = [
  { key: "about", label: { tr: "Hakkımızda", en: "About Us" } },
  { key: "partners", label: { tr: "İş Ortaklarımız", en: "Partners" } },
  { key: "operations", label: { tr: "Operasyon ve Lojistik", en: "Operations & Logistics" } },
  { key: "careers", label: { tr: "Kariyer", en: "Careers" } },
  { key: "representatives", label: { tr: "Temsilcilerimiz", en: "Representatives" } },
  { key: "contact", label: { tr: "İletişim", en: "Contact" } },
];

// Yasal Belgeler satırı: telif/established rozet satırının HEMEN üzerine,
// aynı üst-ayraçlı bloğun içine ikinci bir satır olarak eklendi — mevcut
// satırın kendi içeriği/sırası DEĞİŞMEDİ (bkz. yukarıdaki hiyerarşi notu),
// yalnızca üstüne yeni bir satır kondu. Üç sayfa da henüz taslak (bkz.
// LegalPageLayout'taki uyarı) — bu yüzden burada da ayrı bir vurgu/rozet
// eklenmedi, diğer QUICK_LINKS ile aynı sade stil kullanıldı.
//
// Kısa Etiket Turu: uzun `label` (sayfa başlığı) DEĞİŞMEDİ — hâlâ linkin
// erişilebilir adı (aria-label) olarak ve sayfanın kendi başlığı olarak
// kullanılıyor. Görünür metin artık ayrı bir `shortLabel` alanından geliyor
// (yalnızca footer'ın kendi linki kısalıyor; sayfa içeriği/URL/MERSİS
// dokunulmadı). Uzun başlıklar 320px'te üç ayrı tam-genişlik satıra
// bölünmeye zorluyordu — kısa etiketlerle tek satırda ortalanıyor.
const LEGAL_LINKS: { key: RouteKey; label: Record<Lang, string>; shortLabel: Record<Lang, string> }[] = [
  { key: "privacy", label: { tr: "Gizlilik Politikası", en: "Privacy Policy" }, shortLabel: { tr: "Gizlilik", en: "Privacy" } },
  { key: "cookies", label: { tr: "Çerez Politikası", en: "Cookie Policy" }, shortLabel: { tr: "Çerezler", en: "Cookies" } },
  { key: "kvkk", label: { tr: "KVKK Aydınlatma Metni", en: "KVKK Notice" }, shortLabel: { tr: "KVKK", en: "KVKK" } },
];

const CERTS: { label: Record<Lang, string> }[] = [
  { label: { tr: "OSS\nDerneği", en: "OSS\nAssociation" } },
  { label: { tr: "ISO\n9001", en: "ISO\n9001" } },
  { label: { tr: "TS\nEN", en: "TS\nEN" } },
];

const T = {
  quickLinks: { tr: "Hızlı Bağlantılar", en: "Quick Links" },
  certsHeading: { tr: "Sertifikalar & Üyelikler", en: "Certifications & Memberships" },
  rights: { tr: "© 2026 Delta Oto. Tüm hakları saklıdır.", en: "© 2026 Delta Oto. All rights reserved." },
  // "Yol Tarifi" artık ayrı görünür bir bağlantı DEĞİL (bkz. adres <li>'si) —
  // yalnızca ekran okuyucular için o linkin AMACINI netleştiren bir
  // aria-label parçası olarak kullanılıyor, yeni bir görünür metin satırı
  // eklemiyor.
  directions: { tr: "Yol Tarifi", en: "Directions" },
  fax: { tr: "Faks", en: "Fax" },
  established: { tr: "Delta Oto · Kuruluş 1976", en: "Delta Oto · Established 1976" },
  groupautoMember: { tr: "GROUPAUTO Türkiye Üyesi", en: "GROUPAUTO Türkiye Member" },
} satisfies Record<string, Record<Lang, string>>;

export function SiteFooter() {
  const lang = useLang();

  return (
    <footer className="bg-[#0a0c11] pt-10 md:pt-14 pb-5 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Yükseklik Sıkılaştırma Turu: dış dolgu (pt-14/16→pt-10/14, pb-8→pb-5)
            ve gruplar arası boşluk (gap-12→gap-x-12 gap-y-7) azaltıldı. Mobilde
            (tek sütun) gap-12 (48px) her zaman sabitti — içeriğin gerçek
            yoğunluğundan bağımsız, yalnızca "üç ayrı bağımsız blok" hissi
            veriyordu; gap-y-7 (28px) aynı ayrımı, daha az boşlukla koruyor.
            Masaüstünde (md+, 3 sütun TEK satırda) gap-y hiç görünmez, yalnızca
            gap-x-12 (yatay oluk) etkili — o değer DEĞİŞMEDİ. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-7 mb-8">

          <div>
            {/* Klasik (50. yıl kampanya etiketi eklenmeden önceki) Delta Oto
                logosu — header'daki yeni Delta 50 logosundan bilinçli olarak
                farklı, footer'a özel bir asset (origin/main / 700c053'ten
                alındı). Header'daki kampanya logosu DEĞİŞMEDİ. Boyut duyarlı:
                masaüstünde (md+, footer'ın kendi 3 kolonlu grid eşiğiyle
                aynı) — birincil kurumsal marka olarak güçlü bir varlık.
                Header/Footer Design Pass: 70px → 76px, kompozisyonda daha
                güçlü dursun diye ölçülü bir artış (kullanıcı talebi) —
                opaklık da 85%→90%'a çıkarıldı, çok koyu zeminde biraz daha
                net okunsun diye. Mobilde aynı yükseklik genişlik/en-boy
                oranı nedeniyle (1152:240 ≈ 4.8:1) 390px'lik görünümü
                neredeyse uçtan uca kaplayıp orantısız dururdu — 64px'te
                (eskiden 59px) daha ölçülü bir artışla kalıyor.

                Hero/Footer Hizalama Turu bulgusu: kaynak dosyanın kendi
                içinde (canvas 1152×240) sağ/sol %10.68, üst/alt %6.25
                simetrik BOŞ (şeffaf) kenar boşluğu vardı — bu yüzden DOM
                kutusu aşağıdaki adres ikonuyla piksel piksel aynı x'te
                başlasa bile (doğrulandı), logonun GÖRÜNÜR çizimi ~39px
                sağda kalıyordu (canlı ekran görüntüsü + piksel tarama ile
                ölçüldü). Kalıcı çözüm: kaynak dosya kendisi, görünür
                çizginin gerçek sınırına (yalnızca 6px görsel pay
                bırakılarak, köşeli/çapraz kenarların anti-aliasing'i
                kırpılmasın diye) yeniden kırpıldı (1152×240 → 918×222) —
                CSS negatif margin gibi kırılgan bir "telafi" yerine kaynağı
                düzeltmek tercih edildi. Bu asset yalnızca burada kullanılıyor
                (grep ile doğrulandı), başka hiçbir sayfa/bileşen etkilenmedi. */}
            <img
              src="/images/delta-oto-logo-classic.webp"
              alt="Delta Oto"
              width={918}
              height={222}
              className="h-[64px] md:h-[76px] w-auto do-logo-invert mb-4 opacity-90"
            />
            <ul className="space-y-3 text-sm text-gray-500">
              {/* Footer İletişim Turu: ayrı "Yol Tarifi" bağlantısı kaldırıldı
                  — artık adres metninin TAMAMI (ikonuyla birlikte) tek bir
                  tıklanabilir alan, aynı Google Maps hedefine gidiyor. Görünür
                  metin hâlâ yalnızca adres; "Yol Tarifi" amacı yalnızca
                  aria-label'da (ekran okuyucu için netlik, yeni görünür satır
                  değil). */}
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 text-gray-500 mt-0.5" aria-hidden="true" />
                <a
                  href={HQ_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${T.directions[lang]}: Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu - Ümraniye / İstanbul`}
                  className="leading-relaxed hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d9bea]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c11]"
                >
                  Barbaros Cd. Beyit Sk. No:17,<br />Yukarı Dudullu - Ümraniye / İstanbul
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-gray-500" aria-hidden="true" />
                <a href="mailto:info@deltaoto.com" className="hover:text-white transition-colors">info@deltaoto.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-gray-500" aria-hidden="true" />
                <a href="tel:+902165266464" className="hover:text-white transition-colors">0216 526 64 64</a>
              </li>
              {/* Faks Turu 2: görünür "Faks" etiketi KALDIRILDI (kullanıcı bu
                  turda önceki kararı geri aldı) — satır artık yalnızca
                  [Printer ikonu] + numara, telefonun hemen altında ayrı bir
                  satır olarak duruyor (KORUNDU). Anlamı ekran okuyucu için
                  hâlâ taşınıyor — ikon `aria-hidden`, numaradan hemen önce
                  görsel olarak gizli (sr-only) bir "Faks:" ön eki var, bu
                  yüzden anlam kaybı yok, yalnızca görünür metin gitti. tel:
                  bağlantısı YOK (düz metin) — numara yine de seçilebilir/
                  kopyalanabilir. */}
              <li className="flex items-center gap-3">
                <Printer className="w-4 h-4 shrink-0 text-gray-500" aria-hidden="true" />
                <span>
                  <span className="sr-only">{T.fax[lang]}: </span>
                  0216 526 33 44
                </span>
              </li>
            </ul>
          </div>

          <div className="md:pl-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-4">{T.quickLinks[lang]}</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ key, label }) => (
                <li key={key}>
                  <Link href={routeFor(key, lang)} className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#1B3A8F] inline-block transition-all duration-200" />
                    {label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <Link href={routeFor("spart", lang)}>
                <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-9 w-auto rounded-md opacity-90 hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-4">{T.certsHeading[lang]}</h4>
            <div className="flex gap-4 mb-4">
              {CERTS.map(({ label }) => (
                <div key={label.tr} className="w-20 h-16 border border-white/8 rounded-lg flex flex-col items-center justify-center gap-1 bg-white/3 hover:border-white/15 transition-colors">
                  <BadgeCheck className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[10px] text-gray-400 font-bold text-center whitespace-pre-line leading-tight">{label[lang]}</span>
                </div>
              ))}
            </div>
            {/* Footer Revizyonu (bu tur): ikonlar w-8→w-9, w-4→w-[18px] —
                sertifika kutularının (w-20 h-16) hemen altında artık daha
                "kasıtlı" bir ağırlıkla duruyor, önceki boyut biraz fazla
                ürkek/silik kalıyordu. Konum/sıra DEĞİŞMEDİ — hiyerarşi hâlâ
                kullanıcının istediği gibi: sertifikalar → sosyal → ayraç →
                GroupAuto Türkiye üyeliği (en sonda). */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            )}
            {/* GroupAuto Türkiye rozeti — düzeltme turu: önceki sürüm rozet+
                metni yan yana (flex items-center) diziyordu; doğru hiyerarşi
                metin ÖNCE, rozet doğrudan ALTINDA (dikey yığın) olmalı —
                rozet metnin altına "asılı" duruyor, yan yana değil, ayrı
                yüzen bir ikon da değil. Rozetin kendisi büyütülmedi (h-12
                korunur), yalnızca dizilim dikeyleşti. */}
            <div className="mt-3.5 pt-3.5 border-t border-white/5">
              <span className="block text-[12.5px] text-gray-300 font-semibold leading-tight mb-2.5">{T.groupautoMember[lang]}</span>
              <img
                src="/images/groupauto-turkiye-badge.webp"
                alt="GROUPAUTO Türkiye"
                width={400}
                height={199}
                className="h-12 w-auto shrink-0 rounded-[3px]"
              />
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col gap-2.5">
          {/* Kısa Etiket Turu: üç yasal link artık TEK satırda, ortalanmış,
              aralarında yalnızca dekoratif (aria-hidden, odaklanamaz) bir
              nokta ayraçla — "Gizlilik · Çerezler · KVKK" tek bir okunabilir
              grup gibi duruyor. Görünür metin kısaldı ama erişilebilir isim
              (aria-label) hâlâ tam sayfa başlığı — ekran okuyucu belirsiz bir
              "Gizlilik" değil, "Gizlilik Politikası" duyar. Kısa etiketler
              320px'te bile tek satıra sığdığından (ölçümle doğrulandı) normal
              durum artık üç ayrı tam-genişlik satıra bölünme DEĞİL. */}
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5">
            {LEGAL_LINKS.map(({ key, label, shortLabel }, i) => (
              <React.Fragment key={key}>
                {i > 0 && <span aria-hidden="true" className="text-gray-700 select-none px-1.5 text-xs">·</span>}
                <Link
                  href={routeFor(key, lang)}
                  aria-label={label[lang]}
                  className="text-[12.5px] text-gray-500 hover:text-white transition-colors rounded-sm px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7d9bea]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c11]"
                >
                  {shortLabel[lang]}
                </Link>
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span>{T.rights[lang]}</span>
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

import { useLocation } from "wouter";

// Hafif, bağımlılıksız dil sistemi — çeviri kütüphanesi yerine sayfa
// başına birer `content: Record<Lang, {...}>` objesi kullanılır (bkz.
// sayfa dosyaları). Dil, URL'den türetilir (Context/Provider gerekmez):
// `/en` ile başlayan her yol EN, geri kalan her şey TR'dir. Bu; dil
// durumunun her zaman URL ile birebir tutarlı kalmasını (yenileme, doğrudan
// link, ileri/geri tuşu dahil) otomatik olarak garantiler.
export type Lang = "tr" | "en";

export function useLang(): Lang {
  const [location] = useLocation();
  return location === "/en" || location.startsWith("/en/") ? "en" : "tr";
}

export type RouteKey =
  | "home"
  | "about"
  | "partners"
  | "operations"
  | "representatives"
  | "careers"
  | "contact"
  | "spart"
  | "privacy"
  | "cookies"
  | "kvkk";

// TEK doğruluk kaynağı: mantıksal sayfa anahtarı -> her dildeki gerçek yol.
// Mevcut TR yolları BİREBİR korunur (link kırılması yok) — yeni EN yolları
// temiz bir /en/* isim alanı kullanır.
const ROUTES: Record<RouteKey, Record<Lang, string>> = {
  home: { tr: "/", en: "/en" },
  about: { tr: "/hakkimizda", en: "/en/about" },
  partners: { tr: "/tedarikciler", en: "/en/partners" },
  operations: { tr: "/operasyon", en: "/en/operations" },
  representatives: { tr: "/temsilcilerimiz", en: "/en/representatives" },
  careers: { tr: "/kariyer", en: "/en/careers" },
  contact: { tr: "/iletisim", en: "/en/contact" },
  spart: { tr: "/spart", en: "/en/spart" },
  privacy: { tr: "/gizlilik-politikasi", en: "/en/privacy-policy" },
  cookies: { tr: "/cerez-politikasi", en: "/en/cookie-policy" },
  kvkk: { tr: "/kvkk-aydinlatma-metni", en: "/en/kvkk-notice" },
};

export function routeFor(key: RouteKey, lang: Lang): string {
  return ROUTES[key][lang];
}

// Gündem detay sayfaları parametrik (:slug) olduğu için sabit ROUTES
// tablosuna sığmıyor — kendi küçük yardımcıları var. Anchor (gundem/agenda),
// Anasayfa'nın "Tüm Gündem" CTA'sının Hakkımızda'daki Gündem bölümüne
// zıplaması için (bkz. görev talimatı §7: "/hakkimizda#gundem" / "/en/about#agenda").
const GUNDEM_DETAIL_PREFIX: Record<Lang, string> = {
  tr: "/hakkimizda/gundem/",
  en: "/en/about/agenda/",
};

export function gundemAnchor(lang: Lang): string {
  return lang === "tr" ? "gundem" : "agenda";
}

export function gundemDetailRoute(slug: string, lang: Lang): string {
  return `${GUNDEM_DETAIL_PREFIX[lang]}${slug}`;
}

/** Dil değiştirici için: verilen mevcut yolun DİĞER dildeki karşılığı. */
export function otherLanguageHref(currentPath: string): string {
  const isEn = currentPath === "/en" || currentPath.startsWith("/en/");
  const targetLang: Lang = isEn ? "tr" : "en";
  // Gündem detay sayfaları parametrik olduğu için ROUTES tablosunda yok —
  // slug'ı koruyarak diğer dildeki karşılığını üret (aksi halde kullanıcı
  // dil değiştirince yanlışlıkla anasayfaya düşerdi).
  for (const lang of Object.keys(GUNDEM_DETAIL_PREFIX) as Lang[]) {
    const prefix = GUNDEM_DETAIL_PREFIX[lang];
    if (currentPath.startsWith(prefix)) {
      const slug = currentPath.slice(prefix.length);
      return gundemDetailRoute(slug, lang === "en" ? "tr" : "en");
    }
  }
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    if (ROUTES[key].tr === currentPath || ROUTES[key].en === currentPath) {
      return ROUTES[key][targetLang];
    }
  }
  // Bilinmeyen yol (ör. 404) — dili yalnızca kök sayfada değiştir.
  return targetLang === "en" ? "/en" : "/";
}

export function isEnglishPath(path: string): boolean {
  return path === "/en" || path.startsWith("/en/");
}

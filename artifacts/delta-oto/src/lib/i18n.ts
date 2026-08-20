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
  | "spart";

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
};

export function routeFor(key: RouteKey, lang: Lang): string {
  return ROUTES[key][lang];
}

/** Dil değiştirici için: verilen mevcut yolun DİĞER dildeki karşılığı. */
export function otherLanguageHref(currentPath: string): string {
  const isEn = currentPath === "/en" || currentPath.startsWith("/en/");
  const targetLang: Lang = isEn ? "tr" : "en";
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

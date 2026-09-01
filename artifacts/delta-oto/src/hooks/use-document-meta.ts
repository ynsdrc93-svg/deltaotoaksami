import { useEffect } from "react";

// Uygulama SPA olduğu için tek statik index.html <title>/<meta description>
// tüm rotalarda aynı kalıyordu (Content/UX Pass 01 öncesi) — artık 8 sayfa ×
// 2 dil = 16 rota var, her biri kendi dilinde doğru sekme başlığı/description
// göstermeli (SEO + bookmark/paylaşım kalitesi). Tam bir head-yönetim
// kütüphanesi (react-helmet vb.) yerine — "no heavy runtime dependency"
// kısıtına uyarak — doğrudan document.title ve mevcut meta[name=description]
// etiketini güncelleyen minimal bir hook. Sayfa değişince otomatik çalışır.
//
// robots (opsiyonel): yalnızca henüz hukuki incelemesi tamamlanmamış taslak
// sayfalar (KVKK/Gizlilik/Çerez) için "noindex, follow" geçilir — arama
// motorlarının incelenmemiş bir taslağı indekslemesini engeller. Sayfadan
// ayrılınca index.html'deki varsayılana ("index, follow") geri döner.
export function useDocumentMeta(title: string, description: string, robots?: string) {
  useEffect(() => {
    document.title = title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", description);

    if (!robots) return;
    const robotsEl = document.querySelector('meta[name="robots"]');
    const previous = robotsEl?.getAttribute("content") ?? "index, follow";
    robotsEl?.setAttribute("content", robots);
    return () => { robotsEl?.setAttribute("content", previous); };
  }, [title, description, robots]);
}

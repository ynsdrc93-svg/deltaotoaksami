import { useEffect } from "react";

// Uygulama SPA olduğu için tek statik index.html <title>/<meta description>
// tüm rotalarda aynı kalıyordu (Content/UX Pass 01 öncesi) — artık 8 sayfa ×
// 2 dil = 16 rota var, her biri kendi dilinde doğru sekme başlığı/description
// göstermeli (SEO + bookmark/paylaşım kalitesi). Tam bir head-yönetim
// kütüphanesi (react-helmet vb.) yerine — "no heavy runtime dependency"
// kısıtına uyarak — doğrudan document.title ve mevcut meta[name=description]
// etiketini güncelleyen minimal bir hook. Sayfa değişince otomatik çalışır.
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute("content", description);
  }, [title, description]);
}

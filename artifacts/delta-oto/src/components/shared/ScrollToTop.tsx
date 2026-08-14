import { useEffect } from "react";
import { useLocation } from "wouter";

// Route değiştiğinde sayfayı en başa alır — SPA'da tarayıcının native
// davranışı önceki sayfanın scroll pozisyonunu yeni sayfaya taşır, bu
// yanlış bir UX'tir. wouter'ın location'ı yalnızca pathname'i izler
// (hash'i değil), bu yüzden AYNI sayfada yalnızca #hash değişen gerçek
// çapa navigasyonunda (ör. IletisimPage içindeki <a href="#genel-iletisim">)
// bu effect zaten tetiklenmez. pathname DEĞİŞİP hedef URL'de hash de varsa
// (ör. /iletisim#genel-iletisim) yine zorla yukarı kaydırmayız — çapa
// davranışına karışmayız.
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // SPA'da tek bir HTML dokümanı olduğu için tarayıcının kendi geri/ileri
    // scroll restore'u yanlış konuma zıplatabilir — tek kaynak bu effect olsun.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

import { lazy, Suspense, useEffect } from "react";
import { Switch, Route } from "wouter";
import { LandingPage } from "@/components/LandingPage";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { useLang } from "@/lib/i18n";

// Ana sayfa dışındaki tüm rotalar lazy-load edilir — ilk yüklemede yalnızca
// LandingPage'in kodu indirilir, ziyaret edilmeyen sayfaların kodu asla
// istemciye gitmez (bkz. CLAUDE.md performans notları). Named export'lar
// React.lazy'nin beklediği { default } şekline sarılıyor; not-found zaten
// default export olduğu için doğrudan kullanılabiliyor.
const HakkimizdaPage = lazy(() => import("@/pages/HakkimizdaPage").then((m) => ({ default: m.HakkimizdaPage })));
const GundemDetailPage = lazy(() => import("@/pages/GundemDetailPage").then((m) => ({ default: m.GundemDetailPage })));
const TedarikciPage = lazy(() => import("@/pages/TedarikciPage").then((m) => ({ default: m.TedarikciPage })));
const OperasyonPage = lazy(() => import("@/pages/OperasyonPage").then((m) => ({ default: m.OperasyonPage })));
const KariyerPage = lazy(() => import("@/pages/KariyerPage").then((m) => ({ default: m.KariyerPage })));
const IletisimPage = lazy(() => import("@/pages/IletisimPage").then((m) => ({ default: m.IletisimPage })));
const TemsilcilerimizPage = lazy(() => import("@/pages/TemsilcilerimizPage").then((m) => ({ default: m.TemsilcilerimizPage })));
const SpartPage = lazy(() => import("@/pages/SpartPage").then((m) => ({ default: m.SpartPage })));
const GizlilikPolitikasiPage = lazy(() => import("@/pages/GizlilikPolitikasiPage").then((m) => ({ default: m.GizlilikPolitikasiPage })));
const CerezPolitikasiPage = lazy(() => import("@/pages/CerezPolitikasiPage").then((m) => ({ default: m.CerezPolitikasiPage })));
const KvkkAydinlatmaMetniPage = lazy(() => import("@/pages/KvkkAydinlatmaMetniPage").then((m) => ({ default: m.KvkkAydinlatmaMetniPage })));
const NotFound = lazy(() => import("@/pages/not-found"));

// Tüm iç sayfalar koyu (#0e1016) bir hero ile açılıyor — Suspense fallback'i
// aynı renkte, tam yükseklikte, boş/spinnersız bir yüzey: ne beyaz flaş ne de
// jenerik bir spinner. Sayfa hazır olduğunda içerik bu yüzeyin üstüne akar,
// CLS'e yol açacak bir sıçrama olmaz.
function RouteFallback() {
  return <div className="min-h-screen bg-[#0e1016]" aria-hidden="true" />;
}

function App() {
  // <html lang> her zaman gerçek görüntülenen dille eşleşsin — URL'den
  // türetilen useLang() ile senkron, ayrı bir Provider gerekmiyor.
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/en" component={LandingPage} />
          <Route path="/hakkimizda" component={HakkimizdaPage} />
          <Route path="/en/about" component={HakkimizdaPage} />
          <Route path="/hakkimizda/gundem/:slug" component={GundemDetailPage} />
          <Route path="/en/about/agenda/:slug" component={GundemDetailPage} />
          <Route path="/tedarikciler" component={TedarikciPage} />
          <Route path="/en/partners" component={TedarikciPage} />
          <Route path="/operasyon" component={OperasyonPage} />
          <Route path="/en/operations" component={OperasyonPage} />
          <Route path="/kariyer" component={KariyerPage} />
          <Route path="/en/careers" component={KariyerPage} />
          <Route path="/iletisim" component={IletisimPage} />
          <Route path="/en/contact" component={IletisimPage} />
          <Route path="/temsilcilerimiz" component={TemsilcilerimizPage} />
          <Route path="/en/representatives" component={TemsilcilerimizPage} />
          <Route path="/spart" component={SpartPage} />
          <Route path="/en/spart" component={SpartPage} />
          <Route path="/gizlilik-politikasi" component={GizlilikPolitikasiPage} />
          <Route path="/en/privacy-policy" component={GizlilikPolitikasiPage} />
          <Route path="/cerez-politikasi" component={CerezPolitikasiPage} />
          <Route path="/en/cookie-policy" component={CerezPolitikasiPage} />
          <Route path="/kvkk-aydinlatma-metni" component={KvkkAydinlatmaMetniPage} />
          <Route path="/en/kvkk-notice" component={KvkkAydinlatmaMetniPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <ScrollToTopButton />
    </>
  );
}

export default App;

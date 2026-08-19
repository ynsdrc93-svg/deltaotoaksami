import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { LandingPage } from "@/components/LandingPage";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

// Ana sayfa dışındaki tüm rotalar lazy-load edilir — ilk yüklemede yalnızca
// LandingPage'in kodu indirilir, ziyaret edilmeyen sayfaların kodu asla
// istemciye gitmez (bkz. CLAUDE.md performans notları). Named export'lar
// React.lazy'nin beklediği { default } şekline sarılıyor; not-found zaten
// default export olduğu için doğrudan kullanılabiliyor.
const HakkimizdaPage = lazy(() => import("@/pages/HakkimizdaPage").then((m) => ({ default: m.HakkimizdaPage })));
const TedarikciPage = lazy(() => import("@/pages/TedarikciPage").then((m) => ({ default: m.TedarikciPage })));
const OperasyonPage = lazy(() => import("@/pages/OperasyonPage").then((m) => ({ default: m.OperasyonPage })));
const KariyerPage = lazy(() => import("@/pages/KariyerPage").then((m) => ({ default: m.KariyerPage })));
const IletisimPage = lazy(() => import("@/pages/IletisimPage").then((m) => ({ default: m.IletisimPage })));
const TemsilcilerimizPage = lazy(() => import("@/pages/TemsilcilerimizPage").then((m) => ({ default: m.TemsilcilerimizPage })));
const SpartPage = lazy(() => import("@/pages/SpartPage").then((m) => ({ default: m.SpartPage })));
const NotFound = lazy(() => import("@/pages/not-found"));

// Tüm iç sayfalar koyu (#0e1016) bir hero ile açılıyor — Suspense fallback'i
// aynı renkte, tam yükseklikte, boş/spinnersız bir yüzey: ne beyaz flaş ne de
// jenerik bir spinner. Sayfa hazır olduğunda içerik bu yüzeyin üstüne akar,
// CLS'e yol açacak bir sıçrama olmaz.
function RouteFallback() {
  return <div className="min-h-screen bg-[#0e1016]" aria-hidden="true" />;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/hakkimizda" component={HakkimizdaPage} />
          <Route path="/tedarikciler" component={TedarikciPage} />
          <Route path="/operasyon" component={OperasyonPage} />
          <Route path="/kariyer" component={KariyerPage} />
          <Route path="/iletisim" component={IletisimPage} />
          <Route path="/temsilcilerimiz" component={TemsilcilerimizPage} />
          <Route path="/spart" component={SpartPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <ScrollToTopButton />
    </>
  );
}

export default App;

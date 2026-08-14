import { Switch, Route } from "wouter";
import { LandingPage } from "@/components/LandingPage";
import { HakkimizdaPage } from "@/pages/HakkimizdaPage";
import { TedarikciPage } from "@/pages/TedarikciPage";
import { OperasyonPage } from "@/pages/OperasyonPage";
import { KariyerPage } from "@/pages/KariyerPage";
import { IletisimPage } from "@/pages/IletisimPage";
import { TemsilcilerimizPage } from "@/pages/TemsilcilerimizPage";
import { SpartPage } from "@/pages/SpartPage";
import NotFound from "@/pages/not-found";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
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
      <ScrollToTopButton />
    </>
  );
}

export default App;

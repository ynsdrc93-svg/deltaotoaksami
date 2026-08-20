import { useEffect, useRef } from "react";
import TurkeyMap from "turkey-map-react";
import { cities as turkeyCities } from "turkey-map-react/lib/data";

// turkey-map-react (+ veri dosyası) LandingPage'in JS entry chunk'ının en
// büyük tek katkısıydı (performans denetimi Pass 02 bulgusu — bundle
// composition analizinde ~378KB render edilmiş / ~165KB gzip, react-dom'dan
// sonra ikinci en büyük paket). Bu yüzden bu bileşen LandingPage.tsx'ten
// ayrıldı ve orada React.lazy ile IntersectionObserver tetiklemeli olarak
// yükleniyor (bkz. LandingPage.tsx mapReady/mapSectionRef) — harita,
// kullanıcı Operasyon & Lojistik bölümüne yaklaşmadan hazır olacak şekilde
// önceden indiriliyor, boş bir bölüme scroll edilmiyor. Harita/rota/tooltip
// davranışı ve tasarımı BİREBİR aynı — yalnızca kod konumu değişti.

const OPS_HUB_PLATES = [34, 41, 35]; // İstanbul (Ümraniye), Kocaeli (Gebze), İzmir
const OPS_HUB_PATHS = turkeyCities.filter((c) => OPS_HUB_PLATES.includes(c.plateNumber));
const OPS_HUB_POINTS: [number, number][] = [
  [193.6, 211.0], // Ümraniye / İstanbul
  [241.0, 236.5], // Gebze / Kocaeli
  [96.7, 376.5],  // İzmir
];

// Dağıtım rotaları: 3 merkezden ülke geneline uzanan ok çizgileri.
// Uçlar turkey-map-react'in path verisinden hesaplanan yaklaşık il merkezleri
// (bounding-box centroid), haritayla aynı viewBox ("0 80 1050 585") üzerinde.
const DISTRIBUTION_ROUTES: { from: [number, number]; to: [number, number] }[] = [
  { from: [193.6, 211.0], to: [555.7, 218.6] }, // Ümraniye -> Samsun (Karadeniz)
  { from: [193.6, 211.0], to: [750.7, 246.5] }, // Ümraniye -> Trabzon (Doğu Karadeniz)
  { from: [193.6, 211.0], to: [911.6, 256.6] }, // Ümraniye -> Kars (uç kuzeydoğu)
  { from: [193.6, 211.0], to: [836.8, 293.1] }, // Ümraniye -> Erzurum (Doğu Anadolu)
  { from: [193.6, 211.0], to: [959.2, 387.8] }, // Ümraniye -> Van (uç doğu)
  { from: [193.6, 211.0], to: [365.1, 325.1] }, // Ümraniye -> Ankara (İç Anadolu)
  { from: [193.6, 211.0], to: [550.4, 406.2] }, // Ümraniye -> Kayseri (İç Anadolu)
  { from: [193.6, 211.0], to: [623.3, 336.2] }, // Ümraniye -> Sivas (İç/Doğu geçiş)
  { from: [193.6, 211.0], to: [621.8, 498.8] }, // Ümraniye -> Gaziantep (Güneydoğu Anadolu)
  { from: [193.6, 211.0], to: [780.0, 425.9] }, // Ümraniye -> Diyarbakır (Güneydoğu Anadolu)
  { from: [193.6, 211.0], to: [717.9, 480.5] }, // Ümraniye -> Şanlıurfa (Güneydoğu Anadolu)
  { from: [193.6, 211.0], to: [533.1, 476.7] }, // Ümraniye -> Adana (Akdeniz/Çukurova)
  { from: [241.0, 236.5], to: [195.1, 287.0] }, // Gebze -> Bursa (yakın Marmara)
  { from: [241.0, 236.5], to: [295.8, 323.5] }, // Gebze -> Eskişehir (İç Anadolu batı)
  { from: [241.0, 236.5], to: [437.4, 207.8] }, // Gebze -> Kastamonu (Batı Karadeniz)
  { from: [241.0, 236.5], to: [387.5, 437.6] }, // Gebze -> Konya (İç Anadolu güney)
  { from: [96.7, 376.5],  to: [277.6, 519.5] }, // İzmir -> Antalya (Akdeniz)
  { from: [96.7, 376.5],  to: [149.2, 495.1] }, // İzmir -> Muğla (Ege güney)
];

// Her rotaya hafif rastgele bir gecikme/süre ata — hepsi aynı anda değil,
// organik/dağınık bir ritimde art arda "uçar" gibi görünsün. Kısa gecikme +
// kısa döngü süresi = bölüm göründüğü anda hızla harekete geçen, dinamik bir his.
// NOT: modül-scope Math.random() — bu bileşen yalnızca istemci tarafında,
// lazy-import ile bir kez mount edildiğinde çalışır (SSR/prerender yok),
// bu yüzden hydration mismatch riski taşımaz (bkz. Pass 02 SSR/SSG
// fizibilite notu — ileride SSR eklenirse bu satırın taşınması gerekir).
const ROUTE_TIMING = DISTRIBUTION_ROUTES.map(() => ({
  delay: +(Math.random() * 1.8).toFixed(2),
  duration: +(3 + Math.random() * 1.5).toFixed(2),
}));

/** İki nokta arasında hafif yukarı kavisli bir uçuş-rotası eğrisi (quadratic bezier). */
function routeArcPath([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const candidates: [number, number][] = [[-dy / len, dx / len], [dy / len, -dx / len]];
  const [px, py] = candidates[0][1] < candidates[1][1] ? candidates[0] : candidates[1];
  const bow = len * 0.16;
  const mx = (x1 + x2) / 2 + px * bow;
  const my = (y1 + y2) / 2 + py * bow;
  return `M ${x1},${y1} Q ${mx.toFixed(1)},${my.toFixed(1)} ${x2},${y2}`;
}

export function LogisticsMap() {
  // Bu bileşen lazy-load edildiği için paylaşılan useReveal()'ın
  // IntersectionObserver'ı LandingPage mount olduğunda (bu SVG henüz DOM'da
  // yokken) BİR KEZ kurulup çalışıyor — sonradan mount olan bu elementi asla
  // gözlemlemiyor, bu yüzden .do-in hiç eklenmiyordu ve rotalar sonsuza kadar
  // opacity:0 kalıyordu (bkz. Pass 02 regresyon bulgusu). Çözüm: bu SVG için
  // kendi bağımsız/yerel gözlemcisini kur — paylaşılan useReveal semantiğiyle
  // birebir aynı eşik (threshold 0.12), aynı tek-seferlik do-in davranışı.
  const routeLayerRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const el = routeLayerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("do-in"); obs.unobserve(el); } },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Not: haritanın path verisinde birkaç ilde küçük iç-su (göl) boşlukları var
          (ör. Tuz Gölü) — arkaplana glow/gradient eklemek silüetin dışına taşıp
          bozuk görünüyordu, bu yüzden haritayı olduğu gibi (temiz) bırakıyoruz. */}
      <TurkeyMap
        hoverable
        showTooltip
        customStyle={{ idleColor: "#1B3A8F", hoverColor: "#4d74d6" }}
      />
      {/* turkey-map-react has no per-city color prop; overlay the 3 hub
          provinces' own path data (same viewBox) with the accent fill. */}
      <svg
        viewBox="0 80 1050 585"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        {OPS_HUB_PATHS.map((c) => (
          <path key={c.id} d={c.path} fill="#7d9bea" />
        ))}
      </svg>
      {/* 3 merkezden ülke geneline dağıtımı görselleştiren, scroll'da
          kendini çizen rota okları — "sadece batıda 3 nokta" algısını
          "buradan tüm ülkeye" hikayesine dönüştürür. */}
      <svg
        ref={routeLayerRef}
        viewBox="0 80 1050 585"
        className="do-route-layer absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <marker id="do-route-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" fill="#7d9bea" />
          </marker>
        </defs>
        {DISTRIBUTION_ROUTES.map((r, i) => (
          <path
            key={i}
            className="do-route-line"
            d={routeArcPath(r.from, r.to)}
            stroke="#7d9bea"
            strokeWidth={1.75}
            strokeDasharray={1400}
            markerEnd="url(#do-route-arrow)"
            style={{ animationDelay: `${ROUTE_TIMING[i].delay}s`, animationDuration: `${ROUTE_TIMING[i].duration}s` }}
          />
        ))}
        {DISTRIBUTION_ROUTES.map((r, i) => (
          <circle
            key={`d${i}`}
            className="do-route-dest"
            cx={r.to[0]}
            cy={r.to[1]}
            r={3.5}
            fill="#7d9bea"
            style={{ animationDelay: `${ROUTE_TIMING[i].delay}s`, animationDuration: `${ROUTE_TIMING[i].duration}s` }}
          />
        ))}
        {OPS_HUB_POINTS.map((p, i) => (
          <circle key={`h${i}`} cx={p[0]} cy={p[1]} r={4.5} fill="#7d9bea" stroke="#0e1016" strokeWidth={1.5} />
        ))}
      </svg>
    </>
  );
}

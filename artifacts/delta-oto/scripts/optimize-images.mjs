#!/usr/bin/env node
// Tek seferlik, geliştirme-zamanı görsel optimizasyon scripti (bkz. CLAUDE.md
// performans notları). Runtime'ın bir parçası değil — build veya sayfa hiç
// çalıştırmaz. Orijinal PNG/JPG kaynaklar diskte KALIR (kaynak-of-truth /
// gerekirse yeniden üretim için); yalnızca yeni .webp kardeşleri üretilir.
// Yeni bir marka logosu eklendiğinde tekrar çalıştırılabilir:
//   pnpm --filter @workspace/delta-oto run optimize-images
import sharp from "sharp";
import { stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BRANDS_DIR = path.join(ROOT, "public/images/brands");

// src/lib/brands.ts -> CLASSIFIED_BRANDS içinde hasVerifiedLogo:true VE
// logoFormat "svg" OLMAYAN 52 marka. SVG logolar (behr, beru, blueprint,
// ferodo, henkel, optima, silbak, supsan) kasıtlı olarak dışarıda — SVG'ler
// raster'a çevrilmiyor. taifun (hasVerifiedLogo:false) hiç asset içermiyor.
// UNCLASSIFIED_BRANDS (dormant, hiçbir sayfada render edilmiyor) kasıtlı
// olarak dışarıda — dönüştürülse bile hiçbir performans kazancı sağlamaz.
const BRAND_SLUGS = [
  "borgwarner", "bosch", "brembo", "cargo", "champion", "contitech", "corteco", "dayco",
  "delphi", "denso", "dolz", "elring", "era", "fag", "febi", "filtron", "frendi", "gates",
  "gkn", "hlmando", "hattat", "hella", "ina", "ioto", "kale", "kingpiston", "lemforder",
  "liquimoly", "luk", "mahle", "mannfilter", "monroe", "ngk", "nrf", "osram", "purflux",
  "rapro", "sachs", "segautomotive", "skf", "spart", "swag", "teknorot", "trw", "ucel",
  "ufifilters", "valeo", "vdo", "vitesco", "wolflubricants", "opar", "marelli",
];

// En büyük gerçek CSS render yüksekliği: BrandLogo.tsx "wall" boyutu
// (lg:max-h-14 = 56px). ~2.9x retina güvenlik payı ile hedef yükseklik —
// wall/gallery/strip'in HEPSİ bunun altında kalıyor, tek asset hepsine yeter.
const BRAND_LOGO_TARGET_HEIGHT = 160;

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

async function convertBrandLogos() {
  let totalBefore = 0, totalAfter = 0, converted = 0, skipped = 0;
  for (const slug of BRAND_SLUGS) {
    const src = path.join(BRANDS_DIR, `${slug}.png`);
    const dst = path.join(BRANDS_DIR, `${slug}.webp`);
    let before;
    try {
      before = (await stat(src)).size;
    } catch {
      console.warn(`SKIP (kaynak bulunamadı): ${slug}.png`);
      skipped++;
      continue;
    }
    await sharp(src)
      .resize({ height: BRAND_LOGO_TARGET_HEIGHT, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(dst);
    const after = (await stat(dst)).size;
    totalBefore += before;
    totalAfter += after;
    converted++;
    console.log(`  ${slug}: ${fmtKB(before)} -> ${fmtKB(after)}`);
  }
  console.log(`\nMarka logoları: ${converted} dönüştürüldü, ${skipped} atlandı`);
  console.log(`Toplam: ${fmtKB(totalBefore)} -> ${fmtKB(totalAfter)}\n`);
}

async function convertDeltaLogo() {
  const src = path.join(ROOT, "public/images/delta-oto-logo.png");
  const dst = path.join(ROOT, "public/images/delta-oto-logo.webp");
  const before = (await stat(src)).size;
  // En büyük kullanım: header'da sm:h-20 (80px, scroll öncesi) — ~3x retina hedef.
  await sharp(src).resize({ height: 240, withoutEnlargement: true }).webp({ quality: 92 }).toFile(dst);
  const after = (await stat(dst)).size;
  console.log(`Delta logo: ${fmtKB(before)} -> ${fmtKB(after)}\n`);
}

async function convertHero() {
  const src = path.join(ROOT, "public/images/delta-oto-depot.jpg");
  const dst = path.join(ROOT, "public/images/delta-oto-depot.webp");
  const before = (await stat(src)).size;
  // Boyut DEĞİŞMEDİ (1920x1072 zaten tam ekran hero arkaplanı için doğru
  // boyut) — yalnızca format/sıkıştırma kazancı için WebP'ye çevrildi.
  await sharp(src).webp({ quality: 82 }).toFile(dst);
  const after = (await stat(dst)).size;
  console.log(`Hero (delta-oto-depot): ${fmtKB(before)} -> ${fmtKB(after)}\n`);
}

await convertBrandLogos();
await convertDeltaLogo();
await convertHero();

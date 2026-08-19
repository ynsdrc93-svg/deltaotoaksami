import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

// Performans denetimi bulgusu: `pnpm run serve` (vite preview) production'da
// hiçbir Cache-Control header'ı ayarlamıyor (Lighthouse: "Cache TTL: None").
// Bu, yalnızca hash'li build çıktısı (/assets/index-XXXXXXXX.js|css — içerik
// değişince dosya adı da değişir, bu yüzden sonsuza kadar cache'lenmesi
// güvenlidir) için path-spesifik, katkı-only bir immutable cache ekler.
// index.html (SPA fallback) ve hash'siz /images/* buradan HİÇ etkilenmiyor —
// header eklenmiyor, mevcut davranış birebir korunuyor: bir versiyonlama
// stratejisi olmadan bunlara uzun/immutable cache vermek riskli olurdu
// (bkz. CLAUDE.md performans notları). Deployment production'da vite
// preview'dan FARKLI bir katman üzerinden serviyorsa bu middleware hiç
// devreye girmez — topolojiyi değiştirmez, yalnızca zaten var olan preview
// sunucusuna güvenli bir ek yapar.
function immutableAssetCachePlugin() {
  return {
    name: "delta-oto-immutable-asset-cache",
    configurePreviewServer(server: { middlewares: { use: (fn: (req: any, res: any, next: () => void) => void) => void } }) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.includes("/assets/")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    immutableAssetCachePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.API_SERVER_PORT ?? 8080}`,
        changeOrigin: true,
      },
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});

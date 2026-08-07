# Delta Oto — Claude Code Proje Hafızası

## 1. Proje Özeti

**Delta Oto**, 1976 kuruluşlu bir otomotiv yedek parça distribütörü için hazırlanmış Türkçe kurumsal landing page'dir. Tek artifact, tamamen statik/frontend — veritabanı yok, App Storage yok, backend yok.

- **Repo yolu:** `artifacts/delta-oto/`
- **Tech stack:** React 19 + Vite 7 + Tailwind CSS 4 + TypeScript
- **Router:** `wouter` (SPA, hash-free)
- **UI bileşenleri:** shadcn/ui (`src/components/ui/`) — aktif kullanım yok, temel altyapı olarak mevcut
- **Icon seti:** `lucide-react`
- **Animasyon:** Saf CSS + `IntersectionObserver` hooks (Framer Motion yüklü ama kullanılmıyor)
- **Dev komutu:** `pnpm --filter @workspace/delta-oto run dev`
- **Typecheck:** `pnpm --filter @workspace/delta-oto run typecheck`

---

## 2. Marka & Tasarım Sistemi

### Renkler
| Token | Hex | Kullanım |
|---|---|---|
| Navy (primary) | `#1B3A8F` | CTA butonlar, aksan çizgiler, section bg |
| Navy hover | `#2547B5` | Hover state |
| Navy light | `#4d74d6` | Dekoratif çizgiler |
| Mavi açık | `#7d9bea` | Başlık aksan, secondary text dark bg'de |
| Dark hero | `#0e1016` | Hero ve koyu section arkaplanı |
| Footer dark | `#0a0c11` | Footer arkaplanı |
| Light section | `#f8fafc` | Açık gri section bg |

### Tipografi
- **Font:** Inter (Google Fonts, 300–900)
- **Başlıklar:** `font-black` (900), `tracking-tight` veya `tracking-[-0.02em]`
- **Hero başlık büyüklük:** `text-5xl md:text-6xl lg:text-[72px]`
- **Body:** `text-[14px]`–`text-[17px]`, `leading-[1.8]`

### Section Renk Ritmini ("karma ritim")
Her sayfa şu sırayla alternates: `dark (#0e1016)` → `white` → `navy (#1B3A8F)` → `white` → `light (#f8fafc)` → `navy` (son CTA)

**Kural:** Footer'dan önce gelen son bölüm `bg-[#1B3A8F]` (navy) olmalı — footer `#0a0c11` siyahtır, ayrımı sağlamak için.

### CSS Utility Classes (global, `SiteHeader` style tag'inde tanımlı)
```css
.do-site            /* font-family: Inter */
.do-grid-bg         /* ince grid arka plan (koyu bg'lerde) */
.do-hero-line       /* gradient text: beyazdan yarı saydama */
.do-logo-invert     /* filter: brightness(0) invert(1) — logoyu koyu bg'de beyaza çevirir */
.do-reveal          /* scroll animasyonu: opacity 0 → 1, translateY 28px → 0 */
.do-reveal-left     /* soldan gelen reveal */
.do-reveal-right    /* sağdan gelen reveal */
.do-in              /* reveal'i tetikleyen class (IntersectionObserver ekler) */
.do-d1..d4          /* transition-delay: 80ms, 160ms, 240ms, 320ms */
.do-card            /* hover: translateY(-6px), shadow, border-top mavi */
.do-beam            /* sweep animasyon efekti */
.do-ticker-inner    /* yatay kayan ticker animasyonu */
```

**Kritik:** `@media (prefers-reduced-motion: reduce)` tüm animasyonlar disable edilmiş — bu kuralı koruyun.

---

## 3. Dosya Yapısı

```
artifacts/delta-oto/
├── public/
│   └── images/
│       ├── delta-oto-logo.png        # Ana logo (50. yıl versiyonu)
│       ├── spart-logo.png            # SPART sarı/koyu logo
│       ├── delta-oto-hero.png        # Landing hero arkaplanı
│       ├── delta-oto-ops.png         # Operasyon section arkaplanı
│       ├── delta-oto-depot.jpg       # Depo görseli
│       ├── spart-hero.jpg            # AI üretimi: karanlık stüdyo parça görseli
│       ├── spart-quality.jpg         # AI üretimi: kalite kontrol/fren diski makro
│       ├── spart-warehouse.jpg       # AI üretimi: modern parça deposu
│       ├── brake-systems.png         # Kategori görselleri (AI üretimi)
│       ├── suspension-steering.png
│       ├── engine-parts.png
│       ├── electrical-lighting.png
│       ├── filters.png
│       ├── oil-chemicals.png
│       ├── battery-energy.png
│       ├── heavy-duty.png
│       └── brands/                   # 34 marka logo (PNG, gri/renkli)
│           bosch, valeo, hella, brembo, ngk, sachs, denso, monroe,
│           trw, mahle, gates, skf, febi, osram, philips, delphi, ina,
│           contitech, luk, lemforder, fag, elring, corteco, filtron,
│           knecht, mannfilter, champion, borgwarner, swag, optimal,
│           kale, wahler, vdo, gunsan
├── src/
│   ├── App.tsx                       # Router
│   ├── main.tsx                      # Entry point
│   ├── index.css                     # Tailwind @import
│   ├── components/
│   │   ├── LandingPage.tsx           # Ana sayfa (754 satır, kendi header'ı var)
│   │   ├── shared/
│   │   │   ├── SiteHeader.tsx        # İç sayfalarda kullanılan header
│   │   │   └── SiteFooter.tsx        # Tüm iç sayfalarda kullanılan footer
│   │   └── ui/                       # shadcn/ui bileşenleri (54 dosya)
│   ├── pages/
│   │   ├── HakkimizdaPage.tsx        # /hakkimizda
│   │   ├── TedarikciPage.tsx         # /tedarikciler
│   │   ├── OperasyonPage.tsx         # /operasyon
│   │   ├── KariyerPage.tsx           # /kariyer
│   │   ├── IletisimPage.tsx          # /iletisim
│   │   ├── SpartPage.tsx             # /spart
│   │   └── not-found.tsx
│   ├── hooks/                        # shadcn hooks
│   └── lib/                          # shadcn utils
├── vite.config.ts
├── tsconfig.json
├── index.html
└── package.json
```

---

## 4. Route Yapısı

```tsx
// src/App.tsx
/ → LandingPage
/hakkimizda → HakkimizdaPage
/tedarikciler → TedarikciPage
/operasyon → OperasyonPage
/kariyer → KariyerPage
/iletisim → IletisimPage
/spart → SpartPage
* → NotFound
```

---

## 5. Header Mimarisi

**Önemli:** `LandingPage.tsx` kendi inline header'ını içeriyor (max-w-7xl kısıtlı, nav solda). İç sayfalar `SiteHeader` bileşenini kullanıyor.

### SiteHeader (iç sayfalar)
- **Layout:** Logo sabit solda, sağ grupta: nav linkleri + separator + SPART logo → `/spart` → + B2B Portal butonu
- **Genişlik:** `w-full px-6 lg:px-10 xl:px-16` (max-width yok — tam genişlik)
- **Aktif sayfa:** `border-b-2 border-[#1B3A8F]` ile vurgulanan link
- **Scroll:** Scroll > 30px'de `bg-white/0.98` + box-shadow
- **Nav öğeleri:** Hakkımızda · Tedarikçiler · Operasyon ve Lojistik · Kariyer · İletişim

### SiteFooter
- **Arkaplan:** `bg-[#0a0c11]` (footer siyahı)
- 3 kolon: Logo + iletişim | Hızlı bağlantılar + SPART private label | Sertifikalar & Üyelikler
- **Logo:** `do-logo-invert` filter ile beyaza çevrilmiş Delta Oto logosu

---

## 6. Sayfa İçerikleri

### LandingPage (`/`)
Kendi header'ı var (iç sayfaların SiteHeader'ından farklı).

**Bölümler:**
1. Ticker bar (navy, kayan metin)
2. Sticky header
3. **Hero** (dark `#0e1016`) — "50 YILDIR OTOMOTİV AFTERMARKET'İN KESİNTİSİZ GÜCÜ"
4. **Power Metrics** (light `#f4f6f9`) — 250+ Marka, 81+ İl, Kuruluş 1976 (CountUp animasyonu)
5. **Strategic Partnership** (navy gradient) — Groupauto International + Türkiye, 50+ Global Tedarikçi, 40+ Ülke
6. **Operations & Logistics** (dark) — "Üç Merkezden, 81 İle Kesintisiz." + 4 hover kart
7. **Agenda & Vision** (white) — 2 content kart (Mayıs 2026 haber + vizyon)
8. **Brands Marquee** (white) — 2 satır kayan marka logoları
9. **CTA band** (navy) — "Güçlü Ortaklık, Kesintisiz Tedarik"
10. Footer

**Özel hooks:**
- `useReveal()` — IntersectionObserver ile scroll animasyonu
- `useParallax()` — Hero ve ops görselleri için parallax
- `useCounter()` — Sayı sayma animasyonu
- `useScrollProgress()` — Üstteki mavi progress bar

### HakkimizdaPage (`/hakkimizda`)
1. Hero (dark) — "YARIM ASRIN KURUMSAL BİRİKİMİ"
2. Kurumsal rakamlar (white) — 1976, 40+ Ülke, 3.000+ Groupauto, 250+ Marka
3. Zaman Çizgisi (navy) — 1976, 1990, 2005, 2015, 2026 dönüm noktaları
4. Değer Çerçevemiz (white) — 4 kurumsal değer
5. **İş Birimleri** (navy) — Aftermarket Dağıtım, SPART Private Label, Ağır Vasıta, B2B Dijital Kanal
6. Groupauto International (dark `#0e1016`) — Üyelik detayları
7. Çevre & Sürdürülebilirlik (light) — 3 ESG maddesi
8. Footer

### TedarikciPage (`/tedarikciler`)
1. Hero (dark) — "GLOBAL KALİTE, TEK ÇATI, DERİN STOK"
2. **Marka Duvarı** (dark `#0e1016`) — ROW1 + ROW2 marquee animasyonu (34 marka logosu)
3. Kategori Kapsamı (light) — 6 kategori: Fren, Süspansiyon, Motor, Rulman, Filtre, Kaporta
4. Tedarikçi Kalite Kriterleri (navy) — 6 madde checklist
5. Neden Delta Oto (white) — 4 avantaj kartı
6. CTA (navy) — B2B portal yönlendirmesi
7. Footer

**BrandCard bileşeni:** `w-44 h-28`, `grayscale hover:grayscale-0`, `/images/brands/{slug}.png`

### OperasyonPage (`/operasyon`)
1. Hero (dark) — "ÜÇ MERKEZDEN 81 İLE KESİNTİSİZ" + 4 stat (3 merkez, 50K+ SKU, 14:00, Cumartesi)
2. Operasyonel Ağ (white) — 6 stat kutusu
3. **Teslimat Hız Güvencesi** (navy) — 3 kart: Aynı Gün (14:00), Ertesi Gün, Cumartesi
4. **Lojistik Merkezler** (white) — 3 depot kartı
5. Operasyonel Yetkinlikler (navy) — 8 feature grid
6. **Siparişten Teslimata Dört Adım** (navy, CTA) — 4 adım süreç
7. Footer

**Depot Adresleri:**
- Ümraniye: Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul
- Gebze: Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli
- İzmir (Opar Ege): Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir

### KariyerPage (`/kariyer`)
1. Hero (dark) — "GELECEĞİ BİZİMLE İNŞA EDİN"
2. Kurumsal Kültür (white) — 4 değer kartı
3. Çalışan Sesleri (navy) — 3 testimonial (anonim, departman bazlı)
4. **Kariyer Platformları** (white) — LinkedIn + Kariyer.net platform kartları + ik@deltaoto.com CTA
5. **Yan Haklar** (navy, son bölüm) — 8 fayda kartı
6. Footer

**Not:** Statik pozisyon listesi yok — dış platformlara yönlendirme.

### IletisimPage (`/iletisim`)
1. Hero (dark) — "BİZE ULAŞIN"
2. Departman İletişim (light) — 4 kart: Satış, B2B Portal, İK, İhracat
3. Lokasyonlar (navy) — 3 lokasyon: Ümraniye (tel var), Gebze (tel yok), İzmir (tel yok)
4. **Form + Adres** (light) — 5 kolon grid: sol 2 kolon genel iletişim, sağ 3 kolon form
5. Footer

**Form:** `useState` ile kontrol edilen, konu dropdown'u (7 seçenek). Gönderme butonu şu an pasif (backend yok).

**Departman iletişim:**
- Satış: 0216 526 64 64 / satis@deltaoto.com / Pzt–Cmt 08:30–18:00
- B2B: 0216 526 33 44 / b2b@deltaoto.com / Pzt–Cuma 09:00–17:30
- İK: (tel yok) / ik@deltaoto.com / Pzt–Cuma 09:00–17:00
- İhracat: (tel yok) / info@deltaoto.com / Pzt–Cuma 08:30–17:30

### SpartPage (`/spart`)
1. Hero (dark) — "ORİJİNAL KALİTE, AKILLI FİYAT." + AI görseli (`/images/spart-hero.jpg`)
2. Stat bar (navy) — 800+ Referans, 50+ Araç Markası, 2 Yıl Garanti, 3 Depo
3. Marka Hikayesi (white) — Sol metin + sağ AI görseli (`/images/spart-quality.jpg`)
4. **Ürün Kategorileri** (light, id="kategoriler") — 6 kart: Fren, Süspansiyon, Motor, Elektrik, Aktarma, Soğutma
5. Kalite Standartları (navy) — 4 madde (2x2 grid)
6. Dağıtım Altyapısı (white) — Sol AI görseli (`/images/spart-warehouse.jpg`) + sağ 3 depo listesi
7. CTA (navy, son bölüm) — "SPART Bayisi Olmak İster Misiniz?" + B2B Portal + Bize Ulaşın
8. Footer

---

## 7. Kurumsal Veri (Sabit İçerik)

### İletişim
- **Merkez:** Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul
- **Tel:** 0216 526 64 64 / 0216 526 33 44
- **E-posta:** info@deltaoto.com
- **Web:** www.deltaoto.com.tr
- **B2B:** b2b.deltaoto.com.tr

### Önemli Sayılar
- Kuruluş: 1976 (50. yıl: 2026)
- Aktif Marka: 250+
- Aktif SKU: 50.000+
- Dağıtım: 81 İl + İhracat
- Groupauto ülkesi: 40+
- Groupauto üye firma: 3.000+
- SPART referans: 800+
- SPART garanti: 2 yıl
- Aynı gün kesim saati: 14:00
- Çalışma günleri: Pazartesi–Cumartesi

### Çalışmayan / Placeholder Öğeler
- **B2B Portal butonu:** Tüm yerlerde `href="#"` — gerçek URL henüz yok
- **İletişim formu:** Submit mantığı yok (backend yok)
- **Footer "Sertifikalar":** OSS, ISO 9001, TS EN placeholder tile'ları — kullanıcı bunları kaldırmak isteyebilir

---

## 8. Veritabanı & Storage Durumu

- **PostgreSQL:** Bağlı (`DATABASE_URL` env var mevcut) ama **hiçbir tablo yok** — `\dt` → "Did not find any relations."
- **App Storage (Object Storage):** Kullanılmıyor
- **Session Secret:** `SESSION_SECRET` env var mevcut ama auth sistemi yok

**Sonuç: Tüm veriler kaynak kodunda hardcoded. DB veya storage'a aktarılacak veri yok.**

---

## 9. Önemli Kararlar & Kısıtlar

1. **Header Layout:** Logo solda tek başına; nav + SPART logo + B2B Portal sağ grupta sıralı (kullanıcı tercihi).
2. **Section ritmi:** Footer öncesi son section daima `bg-[#1B3A8F]` — `#0e1016` kullanılırsa footer ile kaynaşır.
3. **Groupauto framing:** International ve Türkiye **ayrı iki kart değil**, tek entegre ağ olarak sunulur.
4. **Aday Müşteri Formu:** Delta bayi onboardingı yapmadığı için **sitede yok** — CTA band yeterli.
5. **SPART pozisyonu:** Header logosunda (/spart linki) + Hakkımızda İş Birimleri'nde + footer Private Label'da. Ayrı sayfası mevcut (`/spart`).
6. **Depot telefon numaraları:** Gebze ve İzmir depolarının telefon numaraları **yok** (kullanıcı kararı).
7. **Kariyer:** Statik pozisyon listesi yok; LinkedIn ve Kariyer.net'e yönlendirme.
8. **prefers-reduced-motion:** Tüm CSS animasyonları media query ile disable edilmiş — koruyun.
9. **Görseller:** Unsplash stok fotoğraflar hero arkaplanlarında kullanılıyor. SPART sayfası AI üretimi görseller kullanıyor (`spart-hero.jpg`, `spart-quality.jpg`, `spart-warehouse.jpg`).
10. **LandingPage kendi header'ını içeriyor:** Refactor gerekiyorsa dikkat — SiteHeader ile ayrı tutulmuş.

---

## 10. Vite Konfigürasyonu

```typescript
// artifacts/delta-oto/vite.config.ts
base: process.env.BASE_PATH     // Replit artifact routing için zorunlu
port: process.env.PORT          // Replit port ataması için zorunlu
server.allowedHosts: true       // Proxy/iframe için
alias: "@" → "src/"
```

**HTML meta:** `<html lang="tr">`, tam OG/Twitter meta tags, favicon `/favicon.svg`

---

## 11. Monorepo Yapısı

```
workspace/
├── artifacts/
│   ├── delta-oto/          # Bu proje
│   ├── api-server/         # Boş API server (kullanılmıyor)
│   └── mockup-sandbox/     # Canvas mockup server
├── lib/
│   └── api-client-react/   # Shared API client
├── package.json            # Workspace root
└── pnpm-workspace.yaml
```

**Paket adı:** `@workspace/delta-oto`

---

## 12. Geliştirme Notları

### Yeni Section Eklerken
- Section ritmini koru: dark → white → navy → white → light → navy
- Footer öncesi bölüm: `bg-[#1B3A8F]`
- `max-w-7xl mx-auto px-6 lg:px-8` ile content sınırla
- Başlık öncesi mutlaka: `<span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Kategori</span>`

### Yeni Sayfa Eklerken
1. `src/pages/YeniPage.tsx` oluştur
2. `SiteHeader` ve `SiteFooter` import et
3. `App.tsx`'e route ekle
4. `SiteHeader.tsx`'teki `NAV` dizisine ekle (gerekiyorsa)

### Typecheck
Her değişiklik sonrası: `pnpm --filter @workspace/delta-oto run typecheck`

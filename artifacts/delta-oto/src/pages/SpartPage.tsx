import React from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import {
  ShieldCheck,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Package,
  TrendingUp,
  Award,
  FlaskConical,
  Layers,
} from "lucide-react";

const CATEGORIES = [
  {
    image: "/images/brake-systems.png",
    title: "Fren Sistemi",
    desc: "Balatalar, diskler, kampanalar ve hidrolik bileşenler. OEM toleranslarında üretim.",
    count: "200+",
    unit: "referans",
  },
  {
    image: "/images/suspension-steering.png",
    title: "Süspansiyon & Direksiyon",
    desc: "Amortisörler, rotiller, rot başları, salıncaklar. Sürüş güvenliğinde taviz yok.",
    count: "150+",
    unit: "referans",
  },
  {
    image: "/images/filters.png",
    title: "Motor & Filtreler",
    desc: "Yağ, hava, yakıt ve Polen filtreleri. Motor ömrünü koruyan doğru filtrasyon.",
    count: "120+",
    unit: "referans",
  },
  {
    image: "/images/electrical-lighting.png",
    title: "Elektrik & Ateşleme",
    desc: "Bujiler, bobinler, marş motorları, alternatörler. Güvenilir start, kesintisiz güç.",
    count: "180+",
    unit: "referans",
  },
  {
    image: "/images/heavy-duty.png",
    title: "Aktarma Organları",
    desc: "Debriyaj setleri, rot milleri, diferansiyel parçaları. Güç aktarımında dayanıklılık.",
    count: "90+",
    unit: "referans",
  },
  {
    image: "/images/engine-parts.png",
    title: "Soğutma Sistemi",
    desc: "Radyatörler, su pompaları, termostatlar, V-kayışları. Motorunuzu serin tutun.",
    count: "80+",
    unit: "referans",
  },
];

const QUALITIES = [
  {
    icon: ShieldCheck,
    title: "OEM Toleranslarında Üretim",
    desc: "Her parça, orijinal üretici spesifikasyonları esas alınarak üretilir. Boyutsal hassasiyet ve malzeme kalitesi orijinalle eşdeğerdir.",
  },
  {
    icon: FlaskConical,
    title: "Kapsamlı Test Süreçleri",
    desc: "Ürünler; yorulma, termal döngü, titreşim ve ömür testlerinden geçirilerek sahaya çıkar. Laboratuvar onaysız hiçbir referans raflara girmez.",
  },
  {
    icon: Layers,
    title: "Geniş Araç Kapsama Alanı",
    desc: "Binek ve hafif ticari araç pazarındaki başlıca marka ve modelleri kapsayan, sürekli büyüyen bir katalog. Doğru parçayı ilk seferinde bulun.",
  },
];

const ADVANTAGES = [
  { icon: <ShieldCheck className="w-5 h-5" />, text: "2 Yıl Ürün Garantisi" },
  { icon: <TrendingUp className="w-5 h-5" />, text: "Rekabetçi Bayi Fiyatları" },
  { icon: <Package className="w-5 h-5" />, text: "Hazır Stok, Hızlı Sevkiyat" },
  { icon: <Award className="w-5 h-5" />, text: "Sektör Onaylı Kalite" },
  { icon: <CheckCircle2 className="w-5 h-5" />, text: "Teknik Destek Hattı" },
  { icon: <Wrench className="w-5 h-5" />, text: "OEM Eşdeğer Performans" },
];

export function SpartPage() {
  return (
    <div className="do-site bg-white min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO (dark, split panel) */}
      <section className="relative overflow-hidden bg-[#0e1016] text-white">
        <div className="flex flex-col lg:flex-row lg:min-h-[80vh]">

          {/* LEFT — solid ink panel, real content */}
          <div className="relative lg:w-[57%] flex items-center px-6 sm:px-10 lg:pl-14 xl:pl-20 lg:pr-10 xl:pr-14 py-20 lg:py-28 overflow-hidden">
            <div className="do-grid-bg absolute inset-0 opacity-50"></div>
            <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60"></div>
            <div className="do-beam"></div>

            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-[#4d74d6]" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">
                  Delta Oto Özel Markası
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[64px] font-black leading-[1.05] tracking-tight mb-6 max-w-2xl">
                <span className="do-hero-line">ORİJİNAL KALİTE,</span>
                <br />
                <span className="do-hero-accent">AKILLI FİYAT.</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
                Delta Oto'nun 50 yıllık aftermarket deneyimiyle geliştirilen SPART;
                OEM eşdeğeri kaliteyi, bağımsız servis ve bayi ağına rekabetçi
                fiyatla sunar.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#kategoriler"
                  className="inline-flex items-center gap-2 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
                >
                  Ürün Kategorileri
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-md transition-colors"
                >
                  Bayi Bilgisi Al
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT — full-strength photography, not a dimmed backdrop */}
          <div className="relative lg:w-[43%] min-h-[320px] sm:min-h-[420px] lg:min-h-0 overflow-hidden">
            <img
              src="/images/spart-hero.jpg"
              alt="SPART yedek parça ürün grubu"
              className="w-full h-full object-cover"
              style={{ objectPosition: "60% 40%" }}
            />
            <div className="absolute inset-y-0 left-0 w-16 lg:w-28 bg-gradient-to-r from-[#0e1016] to-transparent hidden lg:block"></div>
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0e1016] to-transparent lg:hidden"></div>
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e1016]/80 to-transparent"></div>

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <div className="do-stat-tag bg-[#1B3A8F] shadow-2xl">
                <span className="flex items-baseline gap-2.5 px-5 py-3.5">
                  <span className="text-3xl font-black text-white leading-none tabular-nums">800+</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-100 max-w-[7rem] leading-tight">Aktif Referans</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT BAR — asymmetric: warranty claim leads, three supporting figures follow */}
      <section className="bg-[#1B3A8F] py-14 md:py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-[34%] text-center lg:text-left shrink-0">
              <div className="text-6xl sm:text-7xl font-black leading-none tracking-tighter tabular-nums">2 Yıl</div>
              <div className="text-white/70 text-[12.5px] font-bold tracking-[0.16em] uppercase mt-3 max-w-[220px] mx-auto lg:mx-0">
                Ürün Garantisi — Bayi ve Servis Güvencesi
              </div>
            </div>
            <div className="hidden lg:block w-px self-stretch bg-white/15"></div>
            <div className="w-full grid grid-cols-3 gap-6 sm:gap-10">
              {[
                { value: "800+", label: "Aktif Referans" },
                { value: "50+", label: "Araç Markası Kapsama" },
                { value: "3 Depo", label: "Hızlı Sevkiyat Merkezi" },
              ].map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-black tracking-tight mb-1.5">{s.value}</div>
                  <div className="text-[11px] text-white/60 font-semibold uppercase tracking-wider leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HAKKINDA */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Marka Hikayesi</span>
              <h2 className="text-3xl md:text-4xl font-black mt-3 mb-6 tracking-tight text-slate-900">
                Delta Oto Deneyiminin<br />Damgasını Taşıyan Marka
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                SPART, 1976'dan bu yana Türkiye aftermarket pazarının içinde büyümüş
                Delta Oto'nun öz markasıdır. Yıllar içinde edinilen tedarik zinciri
                bilgisi, kalite standartları ve saha geribildirimlerinin tamamı
                SPART ürünlerinin tasarım ve üretim süreçlerine aktarılmıştır.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                "Original Replacement" felsefesi basittir: parça değişimi için orijinal
                kaliteden taviz vermek zorunda değilsiniz. SPART, araç üreticisinin
                toleranslarını karşılarken servis karlılığını korur.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {ADVANTAGES.map((a) => (
                  <div key={a.text} className="flex items-center gap-3">
                    <span className="text-[#1B3A8F] shrink-0">{a.icon}</span>
                    <span className="text-[13.5px] text-slate-700 font-medium">{a.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="/images/spart-quality.jpg"
                  alt="SPART kalite kontrol"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-7 -left-7 sm:-bottom-8 sm:-left-8">
                <div className="do-stat-tag bg-[#1B3A8F] shadow-2xl">
                  <span className="flex items-baseline gap-3 px-6 py-4">
                    <span className="text-4xl sm:text-5xl font-black text-white leading-none tabular-nums">50</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-100 max-w-[6.5rem] leading-tight">Yıllık Sektör Deneyimi</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORİLER */}
      <section id="kategoriler" className="bg-[#f8fafc] py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Ürün Portföyü</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 tracking-tight text-slate-900">
              Geniş Kapsam, Tek Marka
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl">
              Binek ve hafif ticari araçların kritik sistemlerini kapsayan SPART
              katalogu, servisinizin ihtiyaç duyduğu her referansı tek çatı altında sunar.
            </p>
          </div>

          {/* Flagship category — Fren Sistemi carries real weight; the rest are supporting tiles */}
          <div className="do-entity-card relative rounded-2xl overflow-hidden mb-6 group">
            <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]">
              <img
                src={CATEGORIES[0].image}
                alt={`${CATEGORIES[0].title} — SPART ürün grubu`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-[#0e1016]/30 to-transparent"></div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <div className="max-w-md">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7d9bea]">En Geniş Kapsam</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-2 tracking-tight">{CATEGORIES[0].title}</h3>
                <p className="text-white/70 text-[13.5px] leading-relaxed">{CATEGORIES[0].desc}</p>
              </div>
              <div className="do-stat-tag bg-[#1B3A8F] shadow-2xl shrink-0">
                <span className="flex items-baseline gap-2 px-5 py-3">
                  <span className="text-3xl font-black text-white leading-none tabular-nums">{CATEGORIES[0].count}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-100">{CATEGORIES[0].unit}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {CATEGORIES.slice(1).map((cat, i) => (
              <div
                key={cat.title}
                className={`do-entity-card bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#1B3A8F]/30 hover:shadow-md group ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <div className="h-24 sm:h-28 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={`${cat.title} — SPART ürün grubu`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="font-bold text-slate-900 text-[12.5px] leading-snug mb-1">{cat.title}</h3>
                  <div className="text-[10.5px] text-[#1B3A8F] font-bold uppercase tracking-wide">{cat.count} {cat.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KALİTE STANDARTLARı */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
              Neden SPART?
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 tracking-tight">
              Kaliteyi Belirleyen Standartlar
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {QUALITIES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="do-entity-card bg-white/[0.07] border border-white/[0.12] rounded-xl p-7 hover:bg-white/[0.11]"
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#7d9bea]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/65 text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAĞITIM ALTYAPISI */}
      <section className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="/images/spart-warehouse.jpg"
                  alt="Delta Oto depo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Dağıtım Ağı</span>
                <div className="do-stat-tag bg-[#1B3A8F]">
                  <span className="flex items-baseline gap-1.5 px-3.5 py-1.5">
                    <span className="text-sm font-black text-white leading-none">81</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-100 leading-none">İl</span>
                  </span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-slate-900">
                Delta Oto Gücüyle<br />Her Yere Ulaşır
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                SPART ürünleri, Delta Oto'nun Ümraniye, Gebze ve İzmir'deki üç
                operasyon merkezinden stoklanır ve sevk edilir. Haftanın altı günü
                çalışan lojistik ağı, sipariş kesim saatine kadar verilen emirleri
                aynı gün veya ertesi gün teslim eder.
              </p>

              <div className="space-y-3">
                {[
                  "Ümraniye — İstanbul Merkez Depo",
                  "Gebze — Kocaeli Bölge Deposu",
                  "Opar Ege — Kemalpaşa / İzmir Deposu",
                ].map((loc) => (
                  <div key={loc} className="flex items-center gap-3 text-[14px] text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-[#1B3A8F] shrink-0" />
                    {loc}
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-[#1B3A8F] rounded-xl px-6 py-5 flex items-center gap-4 shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <p className="text-[13.5px] text-white font-medium">
                  Cumartesi operasyonu dahil — hafta sonunu beklemeyin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — navy, asymmetric with product photography */}
      <section className="relative bg-[#1B3A8F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-6">SPART Original Replacement</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                SPART Bayisi Olmak İster Misiniz?
              </h2>
              <p className="text-white/65 max-w-xl mx-auto lg:mx-0 mb-10 text-[15px] leading-relaxed">
                Delta Oto'nun B2B platformu üzerinden SPART ürünlerine erişin;
                rekabetçi fiyatları, anlık stok görünümünü ve online sipariş kolaylığını keşfedin.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-white text-[#1B3A8F] hover:bg-white/90 font-bold px-10 py-4 rounded-md transition-colors group"
                >
                  B2B Portala Giriş
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 text-white font-semibold px-10 py-4 rounded-md transition-colors"
                >
                  Bize Ulaşın
                </Link>
              </div>
            </div>

            <div className="hidden lg:block relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src="/images/brake-systems.png"
                alt="SPART fren sistemi ürün grubu"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A8F]/25 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

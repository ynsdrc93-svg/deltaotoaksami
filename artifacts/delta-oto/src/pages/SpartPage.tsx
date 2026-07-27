import React from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import {
  ShieldCheck,
  Gauge,
  Wrench,
  Zap,
  Droplets,
  Settings2,
  ArrowRight,
  CheckCircle2,
  Package,
  TrendingUp,
  Award,
} from "lucide-react";

const CATEGORIES = [
  {
    icon: <Gauge className="w-6 h-6" />,
    title: "Fren Sistemi",
    desc: "Balatalar, diskler, kampanalar ve hidrolik bileşenler. OEM toleranslarında üretim.",
    count: "200+",
    unit: "referans",
  },
  {
    icon: <Settings2 className="w-6 h-6" />,
    title: "Süspansiyon & Direksiyon",
    desc: "Amortisörler, rotiller, rot başları, salıncaklar. Sürüş güvenliğinde taviz yok.",
    count: "150+",
    unit: "referans",
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "Motor & Filtreler",
    desc: "Yağ, hava, yakıt ve Polen filtreleri. Motor ömrünü koruyan doğru filtrasyon.",
    count: "120+",
    unit: "referans",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Elektrik & Ateşleme",
    desc: "Bujiler, bobinler, marş motorları, alternatörler. Güvenilir start, kesintisiz güç.",
    count: "180+",
    unit: "referans",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Aktarma Organları",
    desc: "Debriyaj setleri, rot milleri, diferansiyel parçaları. Güç aktarımında dayanıklılık.",
    count: "90+",
    unit: "referans",
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Soğutma Sistemi",
    desc: "Radyatörler, su pompaları, termostatlar, V-kayışları. Motorunuzu serin tutun.",
    count: "80+",
    unit: "referans",
  },
];

const QUALITIES = [
  {
    title: "OEM Toleranslarında Üretim",
    desc: "Her parça, orijinal üretici spesifikasyonları esas alınarak üretilir. Boyutsal hassasiyet ve malzeme kalitesi orijinalle eşdeğerdir.",
  },
  {
    title: "Kapsamlı Test Süreçleri",
    desc: "Ürünler; yorulma, termal döngü, titreşim ve ömür testlerinden geçirilerek sahaya çıkar. Laboratuvar onaysız hiçbir referans raflara girmez.",
  },
  {
    title: "Geniş Araç Kapsama Alanı",
    desc: "Binek ve hafif ticari araç pazarındaki başlıca marka ve modelleri kapsayan, sürekli büyüyen bir katalog. Doğru parçayı ilk seferinde bulun.",
  },
  {
    title: "50 Yıllık Sektör Birikimi",
    desc: "Delta Oto'nun beş on yıllık aftermarket deneyimi, SPART'ın ürün seçimi ve kalite standartlarının temelidir. Bilgi, fiyattan önce gelir.",
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

      {/* HERO */}
      <section className="relative min-h-[580px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/90 to-[#0e1016]/60" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-20" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">
              Delta Oto Özel Markası
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6 max-w-2xl">
            <span className="do-hero-line">ORİJİNAL KALİTE,</span>
            <br />
            <span className="text-[#7d9bea]">AKILLI FİYAT.</span>
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
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-md transition-colors"
            >
              Bayi Bilgisi Al
            </Link>
          </div>
        </div>
      </section>

      {/* STAT BAR */}
      <section className="bg-[#1B3A8F] py-10 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "800+", label: "Aktif Referans" },
              { value: "50+", label: "Araç Markası Kapsama" },
              { value: "2 Yıl", label: "Ürün Garantisi" },
              { value: "3 Depo", label: "Hızlı Sevkiyat Merkezi" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black tracking-tight mb-1">{s.value}</div>
                <div className="text-[13px] text-white/65 font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
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
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
                  alt="SPART kalite kontrol"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#1B3A8F] text-white rounded-xl p-5 shadow-xl">
                <div className="text-2xl font-black">50 Yıl</div>
                <div className="text-[12px] text-white/75 mt-0.5">Sektör Deneyimi</div>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center text-[#1B3A8F] group-hover:bg-[#1B3A8F] group-hover:text-white transition-colors">
                    {cat.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-[#1B3A8F]">{cat.count}</span>
                    <div className="text-[11px] text-slate-400 font-medium">{cat.unit}</div>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{cat.title}</h3>
                <p className="text-[13.5px] text-slate-500 leading-relaxed">{cat.desc}</p>
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

          <div className="grid md:grid-cols-2 gap-6">
            {QUALITIES.map((q, i) => (
              <div
                key={q.title}
                className="bg-white/[0.07] border border-white/[0.12] rounded-xl p-7 hover:bg-white/[0.11] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-bold text-white/40 tabular-nums">
                    0{i + 1}
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <h3 className="font-bold text-lg mb-2">{q.title}</h3>
                <p className="text-white/65 text-[14px] leading-relaxed">{q.desc}</p>
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
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                  alt="Delta Oto depo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-5 -right-5 bg-white border border-slate-200 rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-black text-[#1B3A8F]">81 İl</div>
                <div className="text-[12px] text-slate-500 mt-0.5">Teslimat Ağı</div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Dağıtım Ağı</span>
              <h2 className="text-3xl md:text-4xl font-black mt-3 mb-6 tracking-tight text-slate-900">
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

              <div className="mt-8 bg-[#1B3A8F]/[0.05] border border-[#1B3A8F]/[0.12] rounded-xl px-6 py-4 flex items-center gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#1B3A8F] shrink-0" />
                <p className="text-[13.5px] text-slate-700">
                  Cumartesi operasyonu dahil — hafta sonunu beklemeyin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — navy */}
      <section className="relative bg-[#1B3A8F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-6">SPART Original Replacement</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            SPART Bayisi Olmak İster Misiniz?
          </h2>
          <p className="text-white/65 max-w-xl mx-auto mb-10 text-[15px] leading-relaxed">
            Delta Oto'nun B2B platformu üzerinden SPART ürünlerine erişin;
            rekabetçi fiyatları, anlık stok görünümünü ve online sipariş kolaylığını keşfedin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
      </section>

      <SiteFooter />
    </div>
  );
}

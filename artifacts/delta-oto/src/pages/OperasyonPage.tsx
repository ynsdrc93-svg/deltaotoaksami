import React, { useEffect, useRef, useState } from "react";
import { Truck, Shield, Zap, Network, PackageCheck, MapPin, BarChart3, ChevronRight, Calendar, ArrowRight, Handshake } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useReveal, useCounter } from "../hooks/use-motion";

/** Counts up from 0 once scrolled into view; snaps straight to target under prefers-reduced-motion (see useCounter). Adapted from LandingPage's CountUp. */
function CountUp({ target, suffix = "", duration = 1600, className = "" }: { target: number; suffix?: string; duration?: number; className?: string }) {
  const [started, setStarted] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const count = useCounter(target, duration, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.4 });
    if (spanRef.current) obs.observe(spanRef.current);
    return () => obs.disconnect();
  }, []);
  return <span ref={spanRef} className={className}>{(started ? count : 0).toLocaleString("tr-TR")}{suffix}</span>;
}

const HERO_STATS: { target?: number; suffix?: string; value?: string; label: string; sub: string }[] = [
  { target: 3,     label: "Operasyon Merkezi", sub: "Ümraniye · Gebze · İzmir" },
  { target: 50000, suffix: "+", label: "SKU",  sub: "Sürekli stok derinliği" },
  { value: "14:00", label: "Son Sipariş Saati", sub: "Aynı gün sevkiyat" },
  { target: 81,    label: "İl",                sub: "Ulusal dağıtım kapsamı" },
];

const INFRA_STATS: { target?: number; suffix?: string; value?: string; label: string; sub: string }[] = [
  { target: 50000, suffix: "+", label: "Aktif SKU", sub: "Sürekli güncellenen stok" },
  { value: "7/24", label: "B2B Erişimi",             sub: "Dijital sipariş kanalı" },
  { value: "WMS",  label: "Depo Yönetimi",           sub: "Yazılım destekli operasyon" },
];

const OPS_FEATURES = [
  { icon: Truck,        title: "Üç Merkezden Ulusal Dağıtım",    desc: "Ümraniye, Gebze ve İzmir'deki operasyon merkezlerimizden Türkiye'nin 81 iline anlaşmalı lojistik partnerleriyle düzenli teslimat gerçekleştiriyoruz." },
  { icon: Zap,         title: "Aynı Gün Sevkiyat Garantisi",     desc: "Saat 14:00'a kadar iletilen siparişler, stokta olan ürünler için aynı gün yüklenir. Acil ihtiyaçta servis sürekliliği önceliğimizdir." },
  { icon: Handshake,   title: "Opar Ege Bölge Bayiliği",         desc: "Opar'ın Ege bölgesi operasyonunu devralarak İzmir merkezli bölgesel stok derinliğimizi ve teslimat kapasitemizi genişlettik." },
  { icon: Shield,      title: "WMS Destekli Depo Yönetimi",      desc: "Ambar yönetim sistemi stok doğruluğunu ve sipariş hazırlık sürecini kontrol altında tutar; hata payı sistem düzeyinde sıfıra yakın tutulur." },
  { icon: BarChart3,   title: "Stok Derinliği & Planlama",       desc: "Talep bazlı envanter planlaması ve dönemsel analiz ile kritik ürünlerde yüksek doluluk oranı sürdürülür. Stokta yok cevabı istisnai kalır." },
  { icon: PackageCheck, title: "Sevkiyat Kalite Kontrolü",       desc: "Her sipariş çıkışı önce WMS kontrolünden, ardından fiziksel doğrulamadan geçer; hasarlı ve eksik gönderim oranı operasyonel sıfır hedefinde tutulur." },
  { icon: Network,     title: "İhracat & Bölgesel Erişim",       desc: "Groupauto International kanalları üzerinden Türkiye dışı pazarlara da ürün ihracatı gerçekleştirilmektedir." },
  { icon: Shield,      title: "Tek Tedarikçi Kolaylığı",         desc: "250'den fazla marka tek çatı altında. Çoklu tedarikçi yönetiminin operasyonel yükü ortadan kalkar, müşteri enerjisi satışa odaklanır." },
];

// Operasyonel Yetkinlikler'i iki tematik başlık altında sunmak için OPS_FEATURES'tan türetilen
// görünüm gruplaması — 8 yetkinliğin içeriği (title/desc) birebir korunur, yalnızca sunum kümeleniyor.
const OPS_GROUPS = [
  { label: "Dağıtım & Kapsama",        items: [OPS_FEATURES[0], OPS_FEATURES[1], OPS_FEATURES[2], OPS_FEATURES[6]] },
  { label: "Sistem, Kalite & Güvence", items: [OPS_FEATURES[3], OPS_FEATURES[4], OPS_FEATURES[5], OPS_FEATURES[7]] },
];

const PROCESS = [
  { num: "01", title: "Talep İletimi",              desc: "B2B portalı veya yetkili satış temsilcisi aracılığıyla sipariş kaydı oluşturulur." },
  { num: "02", title: "Anlık Stok Doğrulama",       desc: "Envanter sistemi ürün varlığını gerçek zamanlı teyit eder; alternatif ürün gerekiyorsa satış temsilcisi devreye girer." },
  { num: "03", title: "WMS Sevkiyat Hazırlığı",     desc: "Sistem talimatıyla depo personeli picking ve paketleme sürecini başlatır; her adım kayıt altına alınır." },
  { num: "04", title: "Sevk & Teslimat Takibi",     desc: "Anlaşmalı lojistik partnerleriyle sevkiyat gerçekleştirilir; kritik siparişlerde aynı gün teslimat hedeflenir." },
];

const DELIVERY_CARDS = [
  {
    Icon: Zap,
    title: "Aynı Gün Sevkiyat",
    highlight: "14:00 Son Sipariş Saati",
    desc: "Stokta olan ürünler için 14:00'a kadar iletilen siparişler, sipariş saatine bakılmaksızın aynı gün kargoya verilir. Acil ihtiyaçlarınızda net ve güvenilir bir taahhüt.",
    featured: true,
  },
  {
    Icon: Truck,
    title: "Ertesi Gün Teslimat",
    highlight: "İstanbul ve Çevre İller",
    desc: "Standart siparişlerde İstanbul ve yakın il müşterileriniz için ertesi iş günü teslimat hedeflenir. Güvenilir ve öngörülebilir bir deneyim.",
    featured: false,
  },
  {
    Icon: Calendar,
    title: "Cumartesi Operasyonu",
    highlight: "Hafta Sonu Kesintisiz",
    desc: "Cumartesi günleri de sevkiyat kapasitemiz açıktır. Hafta içi geç saatte gelen siparişler için Cumartesi yükleme seçeneğiyle müşterilerinizi korumuş olursunuz.",
    featured: false,
  },
];

export function OperasyonPage() {
  const ref = useReveal();

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/delta-oto-depot.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
            style={{ objectPosition: "center 42%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
        <div className="do-beam" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-16 lg:py-28">
          <div ref={ref} className="do-reveal flex items-center gap-3 mb-5 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Lojistik & Operasyon Altyapısı</span>
          </div>
          <h1 ref={ref} className="do-reveal do-d1 text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-6">
            <span className="do-hero-line">ÜÇ MERKEZDEN</span><br />
            <span className="text-white">81 İLE</span><br />
            <span className="text-[#7d9bea]">KESİNTİSİZ</span>
          </h1>
          <p ref={ref} className="do-reveal do-d2 text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-6 lg:mb-10 font-light">
            Ümraniye, Gebze ve İzmir'deki operasyon merkezlerimizden yönetilen lojistik ağımız; sipariş hazırlıktan son mile kadar her aşamada hız, güvenilirlik ve servis sürekliliği sağlar. Cumartesi dahil, kesintisiz.
          </p>
          <div ref={ref} className="do-reveal do-d3 flex flex-wrap border-t border-b border-white/15 divide-x divide-white/10">
            {HERO_STATS.map(({ target, suffix, value, label, sub }) => (
              <div key={label} className="px-6 py-5 first:pl-0 min-w-[132px]">
                <div className="text-3xl md:text-4xl font-black text-white tabular-nums leading-none">
                  {target !== undefined ? <CountUp target={target} suffix={suffix} /> : value}
                </div>
                <div className="text-[11px] font-bold text-[#7d9bea] uppercase tracking-[0.15em] mt-2.5">{label}</div>
                <div className="text-[11px] text-white/50 mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALTYAPI RAKAMLARI — light */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Altyapı Özeti</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Operasyonel Ağ Yapımız</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">Üç operasyon merkezinden yönetilen lojistik ağımız, bölgeden bölgeye değişen teslimat takvimi taahhütleriyle çalışır.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {INFRA_STATS.map(({ target, suffix, value, label, sub }) => (
              <div key={label} className="text-center p-6 rounded-xl border border-slate-200 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all">
                <div className="text-[22px] font-black text-[#1B3A8F] leading-tight tabular-nums">
                  {target !== undefined ? <CountUp target={target} suffix={suffix} /> : value}
                </div>
                <div className="text-[12px] font-bold text-slate-900 uppercase tracking-wide mt-1.5">{label}</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESLİMAT HIZ GÜVENCESİ — navy */}
      <section className="bg-[#1B3A8F] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">Teslimat Taahhüdü</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 leading-[1.1]">Müşterinize Söz Verebilirsiniz</h2>
            <p className="text-white/65 leading-[1.85] text-[15.5px] max-w-2xl">
              Stok derinliğimiz ve geniş lojistik ağımız; acil ihtiyaçta aynı gün, standart siparişlerde ertesi iş günü teslimatı mümkün kılar. Cumartesi sevkiyat kapasitemizle hafta sonu da yanınızdayız.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {DELIVERY_CARDS.map(({ Icon, title, highlight, desc, featured }) => (
              <div
                key={title}
                className={`relative flex flex-col gap-4 rounded-xl p-7 transition-colors ${
                  featured
                    ? "lg:col-span-2 border border-[#7d9bea]/50 bg-white/[0.12] hover:bg-white/[0.16] shadow-[0_20px_60px_rgba(125,155,234,0.18)]"
                    : "border border-white/[0.12] bg-white/[0.08] hover:bg-white/[0.14]"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-7 text-[10px] font-black uppercase tracking-widest text-[#0e1016] bg-[#7d9bea] px-3 py-1 rounded-full">
                    Öne Çıkan
                  </span>
                )}
                <div className="flex items-start justify-between">
                  <div className={`rounded-xl border flex items-center justify-center ${featured ? "w-12 h-12 bg-[#7d9bea]/20 border-[#7d9bea]/40" : "w-11 h-11 bg-white/10 border-white/15"}`}>
                    <Icon className={`${featured ? "w-6 h-6" : "w-5 h-5"} text-[#7d9bea]`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${featured ? "bg-[#7d9bea] text-[#0e1016]" : "text-[#7d9bea] bg-white/10 border border-white/15"}`}>{highlight}</span>
                </div>
                <div>
                  <h3 className={`font-bold mb-2 ${featured ? "text-[17px]" : "text-[15px]"}`}>{title}</h3>
                  <p className={`leading-relaxed ${featured ? "text-white/70 text-[14px]" : "text-white/60 text-[13.5px]"}`}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOJİSTİK MERKEZLERİMİZ — white */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Dağıtım Ağı</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Lojistik Merkezlerimiz</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-[15px]">Yanınızda ve yakınınızdayız. Üç operasyon merkezi üzerinden Türkiye'nin tamamına kesintisiz hizmet sunuyoruz.</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                label: "Merkez",
                name: "Ümraniye Merkez Depo",
                city: "İstanbul",
                address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul",
                kapsam: "İstanbul, Marmara, Trakya ve Türkiye geneli ulusal sevkiyat merkezi",
                hizlar: ["Aynı Gün Sevkiyat (14:00 son sipariş saati)","Ertesi Gün İstanbul İçi","Cumartesi Sevkiyat Kapasitesi","Tüm 81 İle Ulusal Dağıtım"],
                featured: true,
              },
              {
                label: "Kocaeli",
                name: "Gebze Deposu",
                city: "Kocaeli",
                address: "Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli",
                kapsam: "Doğu Marmara, Kocaeli, Sakarya ve İç Anadolu'ya erişim güzergahında stratejik stok noktası",
                hizlar: ["Bölgesel Stok Noktası","Doğu Marmara Öncelikli Teslimat","Aynı Gün Sevk Kapasitesi"],
                featured: false,
              },
              {
                label: "Ege Bölge",
                name: "Opar Ege Operasyonu",
                city: "İzmir",
                address: "Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir",
                kapsam: "İzmir, Manisa, Aydın, Muğla ve çevre iller bölgesel tedarik ve dağıtım üssü",
                hizlar: ["Bölgesel Stok Derinliği","Ege İlleri Öncelikli Teslimat","Groupauto Bölge Temsilciliği"],
                featured: false,
              },
            ].map(({ label, name, city, address, kapsam, hizlar, featured }) => (
              <div
                key={name}
                className={`rounded-xl p-7 transition-all ${
                  featured
                    ? "lg:col-span-2 border border-[#1B3A8F]/30 bg-[#1B3A8F]/[0.03] shadow-[0_20px_50px_rgba(27,58,143,0.12)] hover:border-[#1B3A8F]/50 hover:shadow-xl"
                    : "border border-slate-200 hover:border-[#1B3A8F]/30 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F]">{label} Operasyon</span>
                      {featured && (
                        <span className="text-[9px] font-black uppercase tracking-widest text-white bg-[#1B3A8F] px-2 py-0.5 rounded-full">Ana Depo</span>
                      )}
                    </div>
                    <h3 className={`font-black text-slate-900 mt-1 ${featured ? "text-[19px]" : "text-[17px]"}`}>{name}</h3>
                    <p className="text-slate-400 text-[13px] mt-0.5">{city}</p>
                  </div>
                  <div className={`rounded-xl border flex items-center justify-center shrink-0 ${featured ? "w-11 h-11 bg-[#1B3A8F] border-[#1B3A8F]" : "w-10 h-10 bg-[#1B3A8F]/[0.08] border-[#1B3A8F]/[0.12]"}`}>
                    <MapPin className={`w-5 h-5 ${featured ? "text-white" : "text-[#1B3A8F]"}`} />
                  </div>
                </div>
                <p className="text-slate-500 text-[13px] mb-4 leading-relaxed">{address}</p>
                <p className="text-slate-500 text-[13px] leading-relaxed mb-5 border-t border-slate-100 pt-4">{kapsam}</p>
                <div className="space-y-2">
                  {hizlar.map(h => (
                    <div key={h} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B3A8F] shrink-0" />
                      <span className="text-[13px] text-slate-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#1B3A8F]/[0.05] border border-[#1B3A8F]/[0.12] rounded-xl px-8 py-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Tüm Türkiye'ye Kesintisiz Erişim — Haftanın 6 Günü</div>
              <p className="text-slate-500 text-[13.5px] mt-1">Üç operasyon merkezimiz ve anlaşmalı lojistik partnerlerimiz aracılığıyla 81 ile düzenli teslimat.</p>
            </div>
            <div className="shrink-0 text-center">
              <div className="text-4xl font-black text-[#1B3A8F]">81</div>
              <div className="text-[11px] text-[#1B3A8F] font-bold uppercase tracking-wide mt-1">İl Kapsamı</div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERASYONEL GÜÇLER — dark (bir önceki ve sonraki bölüm navy; iki navy'nin arasına aynı tonu tekrarlamamak için koyu zemin) */}
      <section className="relative bg-[#0e1016] py-24 text-white overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Lojistik Altyapı</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Operasyonel Yetkinliklerimiz</h2>
            <p className="text-white/60 mt-3 max-w-2xl text-[15px]">Her operasyonel süreç, müşteri teslimat deneyimini optimize etmek amacıyla yapılandırılmıştır.</p>
          </div>
          {/* 8 yetkinlik, iki tematik başlık altında büyük indeks numaralı satırlar halinde —
              kart ızgarası yerine editoryal bir liste; içerik (title/desc) aynen korunuyor. */}
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-4">
            {OPS_GROUPS.map((group, gi) => (
              <div key={group.label} ref={ref} className={gi === 0 ? "do-reveal-left" : "do-reveal-right"}>
                <div className="flex items-center gap-3 pb-4 mb-1 border-b border-white/15">
                  <span className="text-[11px] font-black text-[#7d9bea] tabular-nums">{gi === 0 ? "01—04" : "05—08"}</span>
                  <span className="w-1 h-1 rounded-full bg-white/25" />
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.22em] text-white/85">{group.label}</h3>
                </div>
                {group.items.map((f, i) => (
                  <div
                    key={f.title}
                    className="group/row flex items-start gap-5 py-6 border-b border-white/10 last:border-b-0 hover:bg-white/[0.03] transition-colors rounded-lg -mx-3 px-3"
                  >
                    <span className="shrink-0 w-11 pt-0.5 text-4xl font-black text-white/[0.15] group-hover/row:text-[#7d9bea]/50 tabular-nums leading-none transition-colors">
                      {String(gi * 4 + i + 1).padStart(2, "0")}
                    </span>
                    <div className="shrink-0 w-10 h-10 mt-0.5 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover/row:bg-[#7d9bea]/15 group-hover/row:border-[#7d9bea]/30 transition-colors">
                      <f.icon className="w-[18px] h-[18px] text-[#7d9bea]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[15px] font-bold mb-1.5 leading-snug">{f.title}</h4>
                      <p className="text-white/60 text-[13.5px] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SİPARİŞ SÜRECİ — navy */}
      <section className="relative bg-[#1B3A8F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">İş Akışı</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Siparişten Teslimata Dört Adım</h2>
            <p className="text-white/70 mt-3 max-w-xl text-[15px]">Standartlaştırılmış süreç; her siparişte öngörülebilir, izlenebilir ve şeffaf bir deneyim sağlar.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS.map((s, i) => (
              <div key={s.num} className="relative">
                <div className="text-7xl font-black text-white/[0.07] mb-4 leading-none select-none">{s.num}</div>
                <h3 className="text-[15px] font-bold mb-2 leading-snug">{s.title}</h3>
                <p className="text-white/70 text-[13.5px] leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-white/15">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Kapanış CTA'sı — aynı navy section içinde ama kendi çerçeveli paneliyle net şekilde
              ayrışan, sayfanın son çağrı anını taşıyan bir alt-blok (bkz. TedarikciPage/SpartPage
              kapanış CTA deseni; burada ayrı bir navy section açmak yerine sub-block tercih edildi,
              çünkü bu section zaten navy ve hemen üstündeki bölüm de navy — iki navy section'ı
              art arda getirmek üstteki "OPERASYONEL GÜÇLER" dark ara-katmanının amacını bozardı). */}
          <div ref={ref} className="do-reveal mt-16 md:mt-20 relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-8 sm:p-10 md:p-12">
            <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#7d9bea]/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#7d9bea] mb-4">
                  <span className="w-6 h-[2px] bg-[#7d9bea] inline-block" />
                  Hemen Başlayın
                </span>
                <h3 className="text-2xl sm:text-[28px] md:text-3xl font-black tracking-tight leading-[1.15] mb-3">
                  Sipariş Sürecinizi Bugün Başlatın
                </h3>
                <p className="text-white/70 text-[15.5px] leading-relaxed">
                  B2B portalımız üzerinden anlık stok ve fiyat bilgisine ulaşın.
                </p>
              </div>
              <a href="https://b2b.parcabul.com.tr/login.aspx" target="_blank" rel="noopener noreferrer" className="shrink-0 bg-white text-[#1B3A8F] font-bold px-8 md:px-10 py-4 rounded-md hover:bg-gray-100 active:scale-[0.98] transition-colors text-sm flex items-center gap-2 group">
                B2B Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

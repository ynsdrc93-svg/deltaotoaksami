import React from "react";
import { Truck, Zap, PackageCheck, BarChart3, ChevronRight, Calendar, MapPinned, Warehouse, Globe, Handshake } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const NETWORK_METRICS = [
  { value: "50.000+", label: "Aktif SKU",     sub: "Sürekli güncellenen stok derinliği" },
  { value: "7/24",    label: "B2B Erişimi",   sub: "Kesintisiz dijital sipariş kanalı" },
  { value: "WMS",     label: "Depo Yönetimi", sub: "Yazılım destekli operasyon" },
];

const OPS_FEATURES = [
  { icon: Truck,        title: "Ulusal Dağıtım Ağı",             tag: "",            desc: "Anlaşmalı lojistik partnerlerimizle Türkiye geneline düzenli ve öngörülebilir bir teslimat takvimi sunuyoruz." },
  { icon: Warehouse,    title: "WMS Destekli Depo Yönetimi",     tag: "WMS",         desc: "Ambar yönetim sistemi stok doğruluğunu ve sipariş hazırlık sürecini kontrol altında tutar; hata payı sistem düzeyinde sıfıra yakın tutulur." },
  { icon: BarChart3,    title: "Stok Derinliği & Planlama",      tag: "50.000+ SKU", desc: "Talep bazlı envanter planlaması ve dönemsel analiz ile kritik ürünlerde yüksek doluluk oranı sürdürülür. Stokta yok cevabı istisnai kalır." },
  { icon: PackageCheck, title: "Sevkiyat Kalite Kontrolü",       tag: "",            desc: "Her sipariş çıkışı WMS kontrolünden ardından fiziksel doğrulamadan geçer; hasarlı ve eksik gönderim oranı operasyonel sıfır hedefinde tutulur." },
  { icon: Globe,        title: "İhracat & Bölgesel Erişim",      tag: "",            desc: "Groupauto International kanalları üzerinden Türkiye dışı pazarlara da ürün ihracatı gerçekleştirilmektedir." },
  { icon: Handshake,    title: "Tek Tedarikçi Kolaylığı",        tag: "",            desc: "250'den fazla marka tek çatı altında. Çoklu tedarikçi yönetiminin operasyonel yükü ortadan kalkar, müşteri enerjisi satışa odaklanır." },
];

const PROCESS = [
  { num: "01", title: "Talep İletimi",          desc: "B2B portalı veya yetkili satış temsilcisi aracılığıyla sipariş kaydı oluşturulur." },
  { num: "02", title: "Anlık Stok Doğrulama",   desc: "Envanter sistemi ürün varlığını gerçek zamanlı teyit eder; alternatif ürün gerekiyorsa satış temsilcisi devreye girer." },
  { num: "03", title: "WMS Sevkiyat Hazırlığı", desc: "Sistem talimatıyla depo personeli picking ve paketleme sürecini başlatır; her adım kayıt altına alınır." },
  { num: "04", title: "Sevk & Teslimat Takibi", desc: "Anlaşmalı lojistik partnerleriyle sevkiyat gerçekleştirilir; kritik siparişlerde aynı gün teslimat hedeflenir." },
];

const DELIVERY_CARDS = [
  {
    Icon: Zap,
    title: "Aynı Gün Sevkiyat",
    highlight: "14:00 Kesim Saati",
    desc: "Stokta olan ürünler için 14:00'a kadar iletilen siparişler aynı gün yüklenir. Sabahın erken saatlerinde sipariş verenler için en hızlı çözüm.",
  },
  {
    Icon: Truck,
    title: "Ertesi Gün Teslimat",
    highlight: "İstanbul ve Çevre İller",
    desc: "Standart siparişlerde İstanbul ve yakın il müşterilerimiz için ertesi iş günü teslimat hedeflenir. Güvenilir ve öngörülebilir bir deneyim.",
  },
  {
    Icon: Calendar,
    title: "Cumartesi Operasyonu",
    highlight: "Hafta Sonu Kesintisiz",
    desc: "Cumartesi günleri de sevkiyat kapasitemiz açıktır. Hafta içi geç saatte gelen siparişler için Cumartesi yükleme seçeneğiyle müşterilerinizi korumuş olursunuz.",
  },
];

const FLAGSHIP_DEPOT = {
  name: "Ümraniye Merkez Depo",
  city: "İstanbul",
  address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul",
  kapsam: "İstanbul, Marmara, Trakya ve Türkiye geneli ulusal sevkiyat merkezi",
  hizlar: ["Aynı Gün Sevkiyat (14:00 kesim saati)", "Ertesi Gün İstanbul İçi", "Cumartesi Sevkiyat Kapasitesi", "Tüm 81 İle Ulusal Dağıtım"],
};

const SATELLITE_DEPOTS = [
  {
    label: "Kocaeli",
    name: "Gebze Deposu",
    city: "Kocaeli",
    address: "Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli",
    kapsam: "Doğu Marmara, Kocaeli, Sakarya ve İç Anadolu'ya erişim güzergahında stratejik stok noktası",
    hizlar: ["Bölgesel Stok Noktası", "Doğu Marmara Öncelikli Teslimat", "Aynı Gün Sevk Kapasitesi"],
  },
  {
    label: "Ege Bölge",
    name: "Opar Ege Operasyonu",
    city: "İzmir",
    address: "Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir",
    kapsam: "İzmir, Manisa, Aydın, Muğla ve çevre iller bölgesel tedarik ve dağıtım üssü",
    hizlar: ["Bölgesel Stok Derinliği", "Ege İlleri Öncelikli Teslimat", "Groupauto Bölge Temsilciliği"],
  },
];

export function OperasyonPage() {
  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO (dark, split panel) */}
      <section className="relative overflow-hidden bg-[#0e1016] text-white">
        <div className="flex flex-col lg:flex-row lg:min-h-[620px]">

          {/* LEFT — solid ink panel, oversized "81" mark, real content */}
          <div className="relative lg:w-[57%] flex items-center px-6 sm:px-10 lg:pl-14 xl:pl-20 lg:pr-10 xl:pr-14 py-20 lg:py-28 overflow-hidden">
            <div
              aria-hidden
              className="absolute -left-6 -bottom-16 sm:-bottom-24 lg:-bottom-28 text-[220px] sm:text-[320px] lg:text-[380px] font-black leading-none text-white/[0.045] select-none pointer-events-none tracking-tighter"
            >
              81
            </div>
            <div className="do-grid-bg absolute inset-0 opacity-50" />
            <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
            <div className="do-beam" />

            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-[2px] bg-[#4d74d6]" />
                <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Lojistik & Operasyon Altyapısı</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[56px] xl:text-[68px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
                <span className="do-hero-line">ÜÇ MERKEZDEN</span><br />
                <span className="text-white">81 İLE</span><br />
                <span className="do-hero-accent">KESİNTİSİZ</span>
              </h1>
              <p className="text-[16px] sm:text-[17px] text-gray-300 leading-[1.8] max-w-lg mb-10 font-light">
                Ümraniye, Gebze ve İzmir'deki operasyon merkezlerimizden yönetilen lojistik ağımız; sipariş hazırlıktan son mile kadar her aşamada hız, güvenilirlik ve servis sürekliliği sağlar.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { Icon: Zap, text: "14:00 Kesim Saati" },
                  { Icon: Calendar, text: "Cumartesi Sevkiyat" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="do-stat-tag bg-white/[0.06] border border-white/15">
                    <span className="flex items-center gap-2 text-gray-200 text-[12.5px] font-medium px-4 py-2.5">
                      <Icon className="w-4 h-4 text-[#7d9bea]" />
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — full-strength photography, not a dimmed backdrop */}
          <div className="relative lg:w-[43%] min-h-[320px] sm:min-h-[420px] lg:min-h-0 overflow-hidden">
            <img
              src="/images/delta-oto-ops.png"
              alt="Delta Oto otomasyon destekli depo koridoru"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 35%" }}
            />
            <div className="absolute inset-y-0 left-0 w-16 lg:w-28 bg-gradient-to-r from-[#0e1016] to-transparent hidden lg:block" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0e1016] to-transparent lg:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e1016]/80 to-transparent" />

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <div className="do-stat-tag bg-[#1B3A8F] shadow-2xl">
                <span className="flex items-baseline gap-2.5 px-5 py-3.5">
                  <span className="text-3xl font-black text-white leading-none tabular-nums">81</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-100 max-w-[7rem] leading-tight">İl Kapsamında Dağıtım</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERASYONEL AĞ YAPIMIZ — white, numeral band (not a boxed icon grid) */}
      <section className="bg-white py-20 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Altyapı Özeti</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Operasyonel Ağ Yapımız</h2>
            <p className="text-slate-500 mt-3 text-[15px]">Stok derinliği, kesintisiz dijital erişim ve sistem destekli depo yönetimi — operasyonel altyapımızın üç taşıyıcı bileşeni.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-10 sm:gap-8 sm:divide-x sm:divide-slate-200">
            {NETWORK_METRICS.map(({ value, label, sub }) => (
              <div key={label} className="sm:px-8 first:pl-0">
                <div className="do-metric-num text-6xl sm:text-7xl font-black leading-none tracking-tighter tabular-nums">{value}</div>
                <div className="text-slate-900 text-[13px] font-bold uppercase tracking-wide mt-4">{label}</div>
                <div className="text-slate-400 text-[13px] mt-1.5 leading-snug">{sub}</div>
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
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Müşterinize Söz Verebilirsiniz</h2>
            <p className="text-white/65 leading-[1.85] text-[15.5px] max-w-2xl">
              Stok derinliğimiz ve geniş lojistik ağımız; acil ihtiyaçta aynı gün, standart siparişlerde ertesi iş günü teslimatı mümkün kılar. Cumartesi sevkiyat kapasitemizle hafta sonu da yanınızdayız.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {DELIVERY_CARDS.map(({ Icon, title, highlight, desc }) => (
              <div key={title} className="do-entity-card bg-white/[0.08] border border-white/[0.12] rounded-xl p-7 flex flex-col gap-5 hover:bg-white/[0.14]">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#7d9bea]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d9bea]">{title}</span>
                  <div className="text-[26px] sm:text-[28px] font-black text-white leading-[1.2] tracking-tight mt-2 tabular-nums">{highlight}</div>
                </div>
                <p className="text-white/60 text-[13.5px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOJİSTİK MERKEZLERİMİZ — white, flagship + 2 satellites (real hierarchy, not 3 equal siblings) */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Dağıtım Ağı</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Lojistik Merkezlerimiz</h2>
            <p className="text-slate-500 mt-3 text-[15px]">Yanınızda ve yakınınızdayız. Ümraniye merkez üssümüz Türkiye'nin tamamına, Gebze ve İzmir bölge depolarımız kendi coğrafyalarına hız katar.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* FLAGSHIP — Ümraniye, wide, real depot photography */}
            <div className="do-entity-card lg:col-span-3 border border-slate-200 rounded-2xl overflow-hidden hover:border-[#1B3A8F]/30 hover:shadow-xl">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src="/images/delta-oto-depot.jpg"
                  alt="Ümraniye merkez depo, yükleme rıhtımları ve sevkiyat filosu"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 62%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 w-9 h-9 bg-[#1B3A8F] rounded-lg flex items-center justify-center shadow-lg">
                  <MapPinned className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-4 left-5">
                  <div className="text-[32px] font-black text-white leading-none tabular-nums">3</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/75 mt-1">Operasyon Merkezi</div>
                </div>
              </div>
              <div className="p-7 sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F]">Merkez Operasyon</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{FLAGSHIP_DEPOT.name}</h3>
                <p className="text-slate-400 text-[13px] mt-0.5">{FLAGSHIP_DEPOT.city}</p>
                <p className="text-slate-500 text-[13.5px] mt-4 leading-relaxed">{FLAGSHIP_DEPOT.address}</p>
                <p className="text-slate-500 text-[13.5px] leading-relaxed mt-3 pt-4 border-t border-slate-100">{FLAGSHIP_DEPOT.kapsam}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-5">
                  {FLAGSHIP_DEPOT.hizlar.map(h => (
                    <div key={h} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B3A8F] shrink-0" />
                      <span className="text-[13px] text-slate-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SATELLITES — Gebze + İzmir, compact, secondary weight */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {SATELLITE_DEPOTS.map(({ label, name, city, address, kapsam, hizlar }) => (
                <div key={name} className="do-entity-card flex-1 border border-slate-200 rounded-xl p-6 hover:border-[#1B3A8F]/30 hover:shadow-md">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F]">{label} · Bölge Deposu</span>
                      <h3 className="text-[15px] font-black text-slate-900 mt-1">{name}</h3>
                      <p className="text-slate-400 text-[12px] mt-0.5">{city}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#1B3A8F]/[0.08] flex items-center justify-center shrink-0">
                      <MapPinned className="w-4 h-4 text-[#1B3A8F]" />
                    </div>
                  </div>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed">{address}</p>
                  <p className="text-slate-500 text-[12.5px] leading-relaxed mt-2.5 pt-3 border-t border-slate-100">{kapsam}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                    {hizlar.map(h => (
                      <div key={h} className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#1B3A8F] shrink-0" />
                        <span className="text-[11.5px] text-slate-600">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPERASYONEL YETKİNLİKLERİMİZ — light (rhythm fix: breaks up back-to-back navy sections) */}
      <section className="relative bg-[#f8fafc] py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg-light" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-14 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Lojistik Altyapı</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Operasyonel Yetkinliklerimiz</h2>
            <p className="text-slate-500 mt-3 text-[15px]">Her operasyonel süreç, müşteri teslimat deneyimini optimize etmek amacıyla yapılandırılmıştır.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPS_FEATURES.map((f) => (
              <div key={f.title} className="do-entity-card flex flex-col gap-4 p-7 rounded-xl border border-slate-200 bg-white hover:border-[#1B3A8F]/30 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="shrink-0 w-12 h-12 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-[#1B3A8F]" />
                  </div>
                  {f.tag && (
                    <span className="text-[10px] font-bold text-[#1B3A8F] bg-[#1B3A8F]/[0.07] px-2.5 py-1 rounded-md uppercase tracking-wider">{f.tag}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-snug">{f.title}</h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SİPARİŞ SÜRECİ — navy, last section before footer */}
      <section className="relative bg-[#1B3A8F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">İş Akışı</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Siparişten Teslimata Dört Adım</h2>
            <p className="text-white/55 mt-3 max-w-xl text-[15px]">Standartlaştırılmış süreç; her siparişte öngörülebilir, izlenebilir ve şeffaf bir deneyim sağlar.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS.map((s, i) => (
              <div key={s.num} className="relative">
                <div className="text-7xl sm:text-8xl font-black text-white/[0.18] mb-3 leading-none select-none">{s.num}</div>
                <h3 className="text-[15px] font-bold mb-2 leading-snug">{s.title}</h3>
                <p className="text-white/55 text-[13.5px] leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-white/35">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

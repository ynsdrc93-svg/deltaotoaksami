import React from "react";
import { Truck, Shield, Zap, Network, PackageCheck, BarChart3, ChevronRight, Calendar, MapPinned } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const INFRA_STATS = [
  { value: "Ümraniye", label: "Merkez Depo",      sub: "İstanbul — Marmara, Trakya ve ulusal sevkiyat merkezi" },
  { value: "Gebze",    label: "Kocaeli Depo",      sub: "Gebze — Doğu Marmara ve İç Anadolu erişim noktası" },
  { value: "İzmir",   label: "Ege Bölge Operasyonu", sub: "Opar Ege — İzmir, Ege ve çevre iller" },
  { value: "50.000+", label: "Aktif SKU",          sub: "Sürekli güncellenen stok" },
  { value: "7/24",    label: "B2B Erişimi",        sub: "Dijital sipariş kanalı" },
  { value: "WMS",     label: "Depo Yönetimi",      sub: "Yazılım destekli operasyon" },
];

const OPS_FEATURES = [
  { icon: Truck,        title: "Üç Merkezden Ulusal Dağıtım",    desc: "Ümraniye, Gebze ve İzmir'deki operasyon merkezlerimizden Türkiye'nin 81 iline anlaşmalı lojistik partnerleriyle düzenli teslimat." },
  { icon: Shield,      title: "WMS Destekli Depo Yönetimi",      desc: "Ambar yönetim sistemi stok doğruluğunu ve sipariş hazırlık sürecini kontrol altında tutar; hata payı sistem düzeyinde sıfıra yakın tutulur." },
  { icon: BarChart3,   title: "Stok Derinliği & Planlama",       desc: "Talep bazlı envanter planlaması ve dönemsel analiz ile kritik ürünlerde yüksek doluluk oranı sürdürülür. Stokta yok cevabı istisnai kalır." },
  { icon: PackageCheck, title: "Sevkiyat Kalite Kontrolü",       desc: "Her sipariş çıkışı WMS kontrolünden ardından fiziksel doğrulamadan geçer; hasarlı ve eksik gönderim oranı operasyonel sıfır hedefinde tutulur." },
  { icon: Network,     title: "İhracat & Bölgesel Erişim",       desc: "Groupauto International kanalları üzerinden Türkiye dışı pazarlara da ürün ihracatı gerçekleştirilmektedir." },
  { icon: Shield,      title: "Tek Tedarikçi Kolaylığı",         desc: "250'den fazla marka tek çatı altında. Çoklu tedarikçi yönetiminin operasyonel yükü ortadan kalkar, müşteri enerjisi satışa odaklanır." },
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

export function OperasyonPage() {
  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/delta-oto-ops.png"
            alt=""
            className="w-full h-full object-cover opacity-30"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-28">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Lojistik & Operasyon Altyapısı</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="do-hero-line">ÜÇ MERKEZDEN</span><br />
            <span className="text-white">81 İLE</span><br />
            <span className="do-hero-accent">KESİNTİSİZ</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
            Ümraniye, Gebze ve İzmir'deki operasyon merkezlerimizden yönetilen lojistik ağımız; sipariş hazırlıktan son mile kadar her aşamada hız, güvenilirlik ve servis sürekliliği sağlar. Cumartesi dahil, kesintisiz.
          </p>
          <div className="flex flex-wrap gap-5">
            {[["3","Operasyon Merkezi","Ümraniye · Gebze · İzmir"],["50.000+","SKU","Sürekli stok derinliği"],["14:00","Kesim Saati","Aynı gün sevkiyat"],["Cumartesi","Dahil","Hafta sonu operasyon"]].map(([n,l,d]) => (
              <div key={l} className="border border-white/15 rounded-xl px-6 py-4 bg-white/5">
                <div className="text-2xl font-black text-white">{n}</div>
                <div className="text-[12px] font-bold text-[#7d9bea] uppercase tracking-wide mt-0.5">{l}</div>
                <div className="text-[11px] text-gray-400 mt-1">{d}</div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INFRA_STATS.map(({ value, label, sub }) => (
              <div key={label} className="do-entity-card text-center p-6 rounded-xl border border-slate-200 hover:border-[#1B3A8F]/30 hover:shadow-md">
                <div className="text-[22px] font-black text-[#1B3A8F] leading-tight">{value}</div>
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
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Müşterinize Söz Verebilirsiniz</h2>
            <p className="text-white/65 leading-[1.85] text-[15.5px] max-w-2xl">
              Stok derinliğimiz ve geniş lojistik ağımız; acil ihtiyaçta aynı gün, standart siparişlerde ertesi iş günü teslimatı mümkün kılar. Cumartesi sevkiyat kapasitemizle hafta sonu da yanınızdayız.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {DELIVERY_CARDS.map(({ Icon, title, highlight, desc }) => (
              <div key={title} className="do-entity-card bg-white/[0.08] border border-white/[0.12] rounded-xl p-7 flex flex-col gap-4 hover:bg-white/[0.14]">
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#7d9bea]" />
                  </div>
                  <span className="do-stat-tag text-[10px] font-bold text-[#7d9bea] bg-white/10 border border-white/15 px-2.5 py-1 rounded-md uppercase tracking-wider"><span>{highlight}</span></span>
                </div>
                <div>
                  <h3 className="font-bold text-[15px] mb-2">{title}</h3>
                  <p className="text-white/60 text-[13.5px] leading-relaxed">{desc}</p>
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
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              {
                label: "Merkez",
                name: "Ümraniye Merkez Depo",
                city: "İstanbul",
                address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul",
                kapsam: "İstanbul, Marmara, Trakya ve Türkiye geneli ulusal sevkiyat merkezi",
                hizlar: ["Aynı Gün Sevkiyat (14:00 kesim saati)","Ertesi Gün İstanbul İçi","Cumartesi Sevkiyat Kapasitesi","Tüm 81 İle Ulusal Dağıtım"],
              },
              {
                label: "Kocaeli",
                name: "Gebze Deposu",
                city: "Kocaeli",
                address: "Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli",
                kapsam: "Doğu Marmara, Kocaeli, Sakarya ve İç Anadolu'ya erişim güzergahında stratejik stok noktası",
                hizlar: ["Bölgesel Stok Noktası","Doğu Marmara Öncelikli Teslimat","Aynı Gün Sevk Kapasitesi"],
              },
              {
                label: "Ege Bölge",
                name: "Opar Ege Operasyonu",
                city: "İzmir",
                address: "Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir",
                kapsam: "İzmir, Manisa, Aydın, Muğla ve çevre iller bölgesel tedarik ve dağıtım üssü",
                hizlar: ["Bölgesel Stok Derinliği","Ege İlleri Öncelikli Teslimat","Groupauto Bölge Temsilciliği"],
              },
            ].map(({ label, name, city, address, kapsam, hizlar }) => (
              <div key={name} className="do-entity-card border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-lg">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B3A8F]">{label} Operasyon</span>
                    <h3 className="text-[17px] font-black text-slate-900 mt-1">{name}</h3>
                    <p className="text-slate-400 text-[13px] mt-0.5">{city}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#1B3A8F]/[0.08] border border-[#1B3A8F]/[0.12] flex items-center justify-center shrink-0">
                    <MapPinned className="w-5 h-5 text-[#1B3A8F]" />
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
          <div className="do-entity-card bg-[#1B3A8F]/[0.05] border border-[#1B3A8F]/[0.12] rounded-xl px-8 py-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1B3A8F]/[0.1] border border-[#1B3A8F]/[0.15] flex items-center justify-center shrink-0">
                <Network className="w-5 h-5 text-[#1B3A8F]" />
              </div>
              <div>
                <div className="text-[15px] font-bold text-slate-900">Tüm Türkiye'ye Kesintisiz Erişim — Haftanın 6 Günü</div>
                <p className="text-slate-500 text-[13.5px] mt-1">Üç operasyon merkezimiz ve anlaşmalı lojistik partnerlerimiz aracılığıyla 81 ile düzenli teslimat. Cumartesi dahil.</p>
              </div>
            </div>
            <div className="shrink-0 text-center">
              <div className="text-4xl font-black text-[#1B3A8F]">81</div>
              <div className="text-[11px] text-[#1B3A8F] font-bold uppercase tracking-wide mt-1">İl Kapsamı</div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERASYONEL GÜÇLER — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Lojistik Altyapı</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Operasyonel Yetkinliklerimiz</h2>
            <p className="text-white/60 mt-3 max-w-2xl text-[15px]">Her operasyonel süreç, müşteri teslimat deneyimini optimize etmek amacıyla yapılandırılmıştır.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPS_FEATURES.map((f) => (
              <div key={f.title} className="do-entity-card flex flex-col gap-4 p-7 rounded-xl border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.10]">
                <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-[#7d9bea]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold mb-2 leading-snug">{f.title}</h3>
                  <p className="text-white/55 text-[13.5px] leading-relaxed">{f.desc}</p>
                </div>
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
            <p className="text-white/55 mt-3 max-w-xl text-[15px]">Standartlaştırılmış süreç; her siparişte öngörülebilir, izlenebilir ve şeffaf bir deneyim sağlar.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS.map((s, i) => (
              <div key={s.num} className="relative">
                <div className="text-7xl font-black text-white/[0.07] mb-4 leading-none select-none">{s.num}</div>
                <h3 className="text-[15px] font-bold mb-2 leading-snug">{s.title}</h3>
                <p className="text-white/55 text-[13.5px] leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-white/15">
                    <ChevronRight className="w-5 h-5" />
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

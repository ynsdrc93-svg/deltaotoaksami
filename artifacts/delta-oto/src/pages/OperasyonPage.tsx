import React from "react";
import { Truck, Shield, Zap, Network, PackageCheck, Clock, BarChart3, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const INFRA_STATS = [
  { value: "Ümraniye", label: "Merkez Depo", sub: "İstanbul lojistik merkezi" },
  { value: "Opar Ege", label: "Bölge Operasyonu", sub: "İzmir & Ege bölgesi" },
  { value: "50.000+", label: "Aktif SKU", sub: "Sürekli güncellenen stok" },
  { value: "7/24", label: "B2B Erişimi", sub: "Dijital sipariş kanalı" },
  { value: "81", label: "İle Teslimat", sub: "Türkiye genelinde" },
  { value: "WMS", label: "Depo Yönetimi", sub: "Yazılım destekli operasyon" },
];

const OPS_FEATURES = [
  { icon: Truck,        title: "Ulusal Dağıtım Ağı", desc: "Ümraniye merkez ve Opar Ege bölge operasyonuyla Türkiye'nin 81 iline anlaşmalı lojistik partnerleri üzerinden düzenli teslimat gerçekleştirilir." },
  { icon: Zap,         title: "Acil Sipariş Önceliği", desc: "B2B portalı üzerinden iletilen kritik talepler, stok varlığı halinde aynı gün sevk edilir. Servis sürekliliği öncelikli hedefimizdir." },
  { icon: Shield,      title: "WMS Destekli Depo", desc: "Ambar yönetim sistemi stok doğruluğunu ve sipariş hazırlık sürecini kontrol altında tutar; hata payı sistem düzeyinde minimize edilir." },
  { icon: BarChart3,   title: "Stok Derinliği & Planlama", desc: "Talep bazlı envanter planlaması ve dönemsel analiz ile kritik ürünlerde yüksek doluluk oranı sürdürülür." },
  { icon: PackageCheck, title: "Sevkiyat Kalite Kontrolü", desc: "Her sipariş çıkışı önce WMS kontrolünden, ardından fiziksel doğrulamadan geçer; hasarlı ve eksik gönderim oranı sıfıra yakın tutulur." },
  { icon: Network,     title: "İhracat & Bölgesel Erişim", desc: "Groupauto International kanalları üzerinden Türkiye dışı pazarlara da ürün ihracatı gerçekleştirilmektedir." },
];

const PROCESS = [
  { num: "01", title: "Talep İletimi", desc: "B2B portalı veya yetkili satış temsilcisi aracılığıyla sipariş kaydı oluşturulur." },
  { num: "02", title: "Anlık Stok Doğrulama", desc: "Envanter sistemi ürün varlığını gerçek zamanlı teyit eder; alternatif ürün gerekiyorsa satış temsilcisi devreye girer." },
  { num: "03", title: "WMS Sevkiyat Hazırlığı", desc: "Sistem talimatıyla depo personeli picking ve paketleme sürecini başlatır; her adım kayıt altına alınır." },
  { num: "04", title: "Sevk & Teslimat Takibi", desc: "Anlaşmalı lojistik partnerleriyle sevkiyat gerçekleştirilir; kritik siparişlerde aynı gün teslimat hedeflenir." },
];

const NIGHT_EXPRESS = [
  { title: "Aynı Gün Sevkiyat", desc: "Saat 14:00'a kadar iletilen acil siparişler, stokta olan ürünler için aynı gün sevk edilir." },
  { title: "Ertesi Gün Teslimat", desc: "İstanbul ve çevre iller için standart siparişlerde ertesi iş günü teslimat hedeflenir." },
  { title: "Hafta Sonu Operasyon", desc: "Cumartesi sevkiyat kapasitesiyle hizmet sürekliliği kritik dönemlerde de korunur." },
];

export function OperasyonPage() {
  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
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
            <span className="do-hero-line">81 İLE</span><br />
            <span className="text-white">KESİNTİSİZ</span><br />
            <span className="text-[#7d9bea]">TEDARİK GÜCÜ</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
            Ümraniye merkez depo ve Opar Ege bölge operasyonuyla desteklenen lojistik ağımız; sipariş hazırlıktan son mile kadar her aşamada performans ve güvenilirlik standartlarını korur.
          </p>
          <div className="flex flex-wrap gap-5">
            {[["81","İl","Türkiye geneli teslimat"],["50.000+","SKU","Sürekli stok derinliği"],["Aynı Gün","Sevkiyat","Kritik siparişler için"]].map(([n,l,d]) => (
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
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">İki operasyon merkezinden yönetilen lojistik ağımız, bölgeden bölgeye değişen teslimat takvimi taahhütleriyle çalışır.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INFRA_STATS.map(({ value, label, sub }) => (
              <div key={label} className="text-center p-6 rounded-xl border border-slate-200 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all">
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
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">Teslimat Hız Taahhüdü</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-5">En Kısa Yoldan Sizi Buluyoruz</h2>
              <p className="text-white/65 leading-[1.85] text-[15.5px]">
                Stok derinliğimiz ve lojistik partner ağımız; acil ihtiyaçta aynı gün, standart siparişlerde ertesi iş günü teslimatı mümkün kılar. İstanbul ve çevre illerde hizmet sürekliliği operasyonel önceliğimizdir.
              </p>
            </div>
            <div className="space-y-4">
              {NIGHT_EXPRESS.map((item) => (
                <div key={item.title} className="bg-white/[0.08] border border-white/[0.12] rounded-xl p-6 flex gap-4 items-start hover:bg-white/[0.14] transition-colors">
                  <Clock className="w-5 h-5 text-[#7d9bea] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-[15px] mb-1">{item.title}</h3>
                    <p className="text-white/60 text-[13.5px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPERASYONEL GÜÇLER — white */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Lojistik Altyapı</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Operasyonel Yetkinliklerimiz</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">Her operasyonel süreç, müşteri teslimat deneyimini optimize etmek amacıyla yapılandırılmıştır.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPS_FEATURES.map((f) => (
              <div key={f.title} className="flex gap-5 p-6 rounded-xl border border-slate-200 hover:border-[#1B3A8F]/30 hover:shadow-lg transition-all">
                <div className="shrink-0 w-11 h-11 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-[#1B3A8F]" />
                </div>
                <div>
                  <h3 className="text-[14.5px] font-bold text-slate-900 mb-1.5 leading-snug">{f.title}</h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOJİSTİK MERKEZLERİMİZ — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Dağıtım Ağı</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Lojistik Merkezlerimiz</h2>
            <p className="text-white/60 mt-3 max-w-xl text-[15px]">Yanınızda ve yakınınızdayız. İki operasyon merkezi üzerinden Türkiye'nin tamamına kesintisiz hizmet sunuyoruz.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                label: "Merkez",
                name: "Ümraniye Merkez Depo",
                city: "İstanbul",
                address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu – Ümraniye / İstanbul",
                phone: "0216 526 64 64 / 0216 526 33 44",
                kapsam: "İstanbul, Marmara, Trakya ve Türkiye geneli sevkiyat merkezi",
                hizlar: ["Aynı Gün Sevkiyat (14:00 kesim)","Ertesi Gün İstanbul İçi","Tüm 81 İle Dağıtım"],
              },
              {
                label: "Bölge",
                name: "Opar Ege Bölge Operasyonu",
                city: "İzmir",
                address: "İzmir – Ege Bölgesi Distribüsyon Merkezi",
                phone: "—",
                kapsam: "İzmir, Manisa, Aydın, Muğla ve çevre iller bölgesel tedarik üssü",
                hizlar: ["Bölgesel Stok Noktası","Ege İlleri Öncelikli Teslimat","Groupauto Bölge Temsilciliği"],
              },
            ].map(({ label, name, city, address, phone, kapsam, hizlar }) => (
              <div key={name} className="bg-white/[0.08] border border-white/[0.12] rounded-xl p-8 hover:bg-white/[0.14] transition-colors">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#7d9bea]">{label} Operasyon</span>
                    <h3 className="text-[17px] font-black mt-1">{name}</h3>
                    <p className="text-white/50 text-[13px] mt-0.5">{city}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#7d9bea]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                </div>
                <p className="text-white/55 text-[13px] mb-4">{address}</p>
                {phone !== "—" && <p className="text-white/70 text-[13px] font-semibold mb-4">{phone}</p>}
                <p className="text-white/60 text-[13px] leading-relaxed mb-5 border-t border-white/10 pt-4">{kapsam}</p>
                <div className="space-y-2">
                  {hizlar.map(h => (
                    <div key={h} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7d9bea] shrink-0" />
                      <span className="text-[13px] text-white/75">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white/[0.05] border border-white/[0.1] rounded-xl px-8 py-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div>
              <div className="text-[15px] font-bold">Tüm Türkiye'ye Kesintisiz Erişim</div>
              <p className="text-white/55 text-[13.5px] mt-1">İki operasyon merkezimiz ve anlaşmalı lojistik partnerlerimiz aracılığıyla 81 ile düzenli teslimat gerçekleştirilmektedir.</p>
            </div>
            <div className="shrink-0 text-center">
              <div className="text-4xl font-black text-white">81</div>
              <div className="text-[11px] text-[#7d9bea] font-bold uppercase tracking-wide mt-1">İl Kapsamı</div>
            </div>
          </div>
        </div>
      </section>

      {/* SİPARİŞ SÜRECİ — dark */}
      <section className="relative bg-[#0e1016] text-white py-24 overflow-hidden">
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

      {/* SPART — white */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F] block mb-4">Özel Dağıtım Markası</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-5">SPART Original Replacement</h2>
            <p className="text-slate-600 leading-[1.85] max-w-lg text-[15.5px] mb-6">
              SPART, Delta Oto'nun kendi dağıtım markasıdır. OEM eşdeğeri kalite standartlarını rekabetçi fiyat yapısıyla bir araya getirir. Fren, süspansiyon, motor ve kaporta kategorilerinde geniş SKU gamıyla bayilerin maliyet optimizasyonuna katkı sağlar.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Fren Sistemleri","Süspansiyon","Motor Parçaları","Kaporta & Aydınlatma","Filtre Grubu"].map(c => (
                <span key={c} className="text-[12px] bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-medium border border-slate-200">{c}</span>
              ))}
            </div>
          </div>
          <div className="shrink-0 flex items-center justify-center w-64 h-36 rounded-2xl bg-[#0a0c11] border border-slate-200 shadow-lg">
            <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-16 w-auto" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

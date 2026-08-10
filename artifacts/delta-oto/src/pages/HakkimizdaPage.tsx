import React from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, Globe, Award, Users, TrendingUp, Shield, BadgeCheck, Settings2, Package, MonitorSmartphone, Truck, Route, Recycle, Laptop } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const MILESTONES = [
  { year: "1976", label: "Kuruluş", desc: "Ümraniye'de temelleri atılan şirket, otomotiv aftermarket sektörünün kurucu distribütörleri arasında yerini aldı." },
  { year: "1990", label: "Portföy Genişlemesi", desc: "Tedarik ağının derinleşmesiyle birlikte İstanbul bölgesinde lider distribütör konumuna ulaşıldı; ürün kategorileri sistematik biçimde genişletildi." },
  { year: "2005", label: "Groupauto International Üyeliği", desc: "Avrupa merkezli bağımsız aftermarket ağına tam üye olunarak küresel tedarik kanallarına, üretici anlaşmalarına ve piyasa bilgisine erişim sağlandı." },
  { year: "2015", label: "Ulusal Lojistik Ağı", desc: "Türkiye'nin 81 iline kesintisiz teslimat kapasitesi kuruldu. Opar Ege bölge operasyonuyla dağıtım coğrafyası İzmir ve Ege'ye yayıldı; ihracat operasyonu faaliyete geçti." },
];

const FACT_STATS = [
  { icon: Award,     value: "1976", label: "Kuruluş Yılı",       sub: "50 yıl sektör deneyimi" },
  { icon: Globe,     value: "40+",  label: "Ülke Ağı",           sub: "Groupauto International" },
  { icon: Users,     value: "3.000+", label: "Groupauto Üyesi", sub: "Küresel distribütör ağı" },
  { icon: TrendingUp, value: "250+", label: "Aktif Marka",       sub: "Sürekli güncellenen portföy" },
];

const VALUES = [
  { icon: Shield,     title: "Kurumsal Güvenilirlik", desc: "Ticari ilişkilerde öngörülebilirlik ve taahhüt bütünlüğü, Delta Oto'nun temel kurumsal kimliğini oluşturur. Her sipariş ve her iş birliği bu güven çerçevesinde yürütülür." },
  { icon: BadgeCheck, title: "Ürün Kalite Güvencesi", desc: "Portföydeki her marka, denetimli kaynak doğrulamasından geçer. Kayıt dışı ve sahte ürün sıfır toleranstır; OEM ve OEM eşdeğeri standart zorunluluğu istisnasız uygulanır." },
  { icon: Settings2,  title: "Operasyonel Mükemmellik", desc: "Siparişten teslimata uzanan sürecin her halkasında performans standardı titizlikle korunur. WMS destekli süreçler, stok doğruluğunu ve hız taahhüdünü güvence altına alır." },
  { icon: TrendingUp, title: "Sürdürülebilir Büyüme", desc: "Müşteri portföyünün rekabet gücünü artırmak ve uzun vadeli iş ortaklıkları kurmak, Delta Oto'nun büyüme stratejisinin merkezindedir. Kısa vadeli kâr yerine ilişki kalitesi önceliklidir." },
];

const BUSINESS_UNITS = [
  { icon: Package, title: "Aftermarket Dağıtım", desc: "Binek ve hafif ticari araç kategorilerinde 250'den fazla küresel ve yerel marka distribütörlüğü. Türkiye'nin tamamına B2B kanalı üzerinden tedarik.", tags: ["250+ Marka", "50.000+ SKU", "B2B Portal"] },
  { icon: Award, title: "SPART Private Label", desc: "Delta Oto'nun özel dağıtım markası SPART; OEM eşdeğeri kaliteyi rekabetçi fiyat yapısıyla sunar. Fren, süspansiyon, motor ve kaporta kategorilerinde aktif portföy.", tags: ["OEM Eşdeğeri", "Rekabetçi Fiyat", "Geniş SKU Gamı"] },
  { icon: Truck, title: "Ağır Vasıta Grubu", desc: "Kamyon, otobüs ve iş makinesi kategorilerinde seçilmiş marka ve ürün gamıyla ağır vasıta segmentine özel tedarik hizmeti.", tags: ["Kamyon", "Otobüs", "İş Makinesi"] },
  { icon: MonitorSmartphone, title: "B2B Dijital Kanal", desc: "7/24 erişilebilen B2B portalı üzerinden anlık stok sorgulama, fiyat listeleri ve sipariş yönetimi. Müşteri operasyonlarına entegre dijital tedarik deneyimi.", tags: ["7/24 Erişim", "Anlık Stok", "Dijital Sipariş"] },
];

const ESG_ITEMS = [
  { icon: Route,   title: "Lojistik Optimizasyonu", desc: "Rota planlaması ve yük konsolidasyonuyla teslimat başına karbon ayak izinin azaltılması hedeflenmektedir." },
  { icon: Recycle, title: "Ambalaj ve Atık Yönetimi", desc: "Tedarikçilerle birlikte yürütülen ambalaj azaltım çalışmaları ile depo atık yönetimi süreçleri hayata geçirilmiştir." },
  { icon: Laptop,  title: "Sayısal Dönüşüm", desc: "Kağıtsız sipariş ve fatura süreçleri, B2B portal entegrasyonuyla müşteri operasyonlarına sunulmaktadır." },
];

export function HakkimizdaPage() {
  const [heroStat, ...restStats] = FACT_STATS;
  const [unitAftermarket, unitSpart, unitAgirVasita, unitB2B] = BUSINESS_UNITS;
  const AftermarketIcon = unitAftermarket.icon;

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO (dark, split panel) */}
      <section className="relative overflow-hidden bg-[#0e1016] text-white">
        <div className="flex flex-col lg:flex-row lg:min-h-[82vh]">

          {/* LEFT — ink panel, oversized "50" mark, real content */}
          <div className="relative lg:w-[57%] flex items-center px-6 sm:px-10 lg:pl-14 xl:pl-20 lg:pr-10 xl:pr-14 py-20 lg:py-28 overflow-hidden">
            <div
              aria-hidden
              className="absolute -left-6 -bottom-16 sm:-bottom-24 lg:-bottom-28 text-[220px] sm:text-[320px] lg:text-[380px] font-black leading-none text-white/[0.045] select-none pointer-events-none tracking-tighter"
            >
              50
            </div>
            <div className="do-grid-bg absolute inset-0 opacity-50" />
            <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
            <div className="do-beam" />

            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-[2px] bg-[#4d74d6]" />
                <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kuruluş 1976 · Delta Oto</span>
              </div>
              <h1 className="text-[34px] sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[68px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
                <span className="do-hero-line">YARIM ASRIN</span><br />
                <span className="text-white">KURUMSAL</span><br />
                <span className="do-hero-accent">BİRİKİMİ</span>
              </h1>
              <p className="text-[16px] sm:text-[17px] text-gray-300 leading-[1.8] max-w-lg mb-10 font-light">
                1976'dan bu yana otomotiv yedek parça dağıtım sektöründe faaliyet gösteren Delta Oto; güçlü tedarik altyapısı, geniş marka portföyü ve Groupauto International üyeliğiyle sektörün yapıcı güçlerinden biri olmaya devam etmektedir.
              </p>
              <Link
                href="/operasyon"
                className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
              >
                Operasyon Altyapımızı İnceleyin <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT — full-strength photography, not a dimmed backdrop */}
          <div className="relative lg:w-[43%] min-h-[320px] sm:min-h-[420px] lg:min-h-0 overflow-hidden">
            <img
              src="/images/delta-oto-depot.jpg"
              alt="Delta Oto dağıtım merkezi, 50. yıl cephesi"
              className="w-full h-full object-cover"
              style={{ objectPosition: "25% 40%" }}
            />
            <div className="absolute inset-y-0 left-0 w-16 lg:w-28 bg-gradient-to-r from-[#0e1016] to-transparent hidden lg:block" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0e1016] to-transparent lg:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e1016]/80 to-transparent" />

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <div className="do-stat-tag bg-[#1B3A8F] shadow-2xl">
                <span className="flex items-baseline gap-2.5 px-5 py-3.5">
                  <span className="text-3xl font-black text-white leading-none tabular-nums">1976</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-100 max-w-[7rem] leading-tight">Kuruluş Yılı</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KURUMSAL RAKAMLAR — white, 1976 as bold graphic mark + supporting rows */}
      <section className="bg-white py-20 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Rakamlarla Delta Oto</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Kurumsal Ölçek ve Erişim</h2>
          </div>
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-20 items-center">
            <div>
              <div className="do-metric-num text-[100px] sm:text-[130px] lg:text-[150px] font-black leading-[0.82] tracking-tighter">
                {heroStat.value}
              </div>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-[3px] bg-[#1B3A8F] shrink-0" />
                <div>
                  <div className="text-[13px] font-bold text-slate-900 uppercase tracking-[0.12em]">{heroStat.label}</div>
                  <div className="text-[12px] text-slate-400 mt-0.5">{heroStat.sub}</div>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200">
              {restStats.map(({ icon: Icon, value, label, sub }) => (
                <div key={label} className="flex items-center justify-between gap-6 py-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <Icon className="w-[18px] h-[18px] text-[#1B3A8F] shrink-0" />
                    <div>
                      <div className="text-[13.5px] font-bold text-slate-900 leading-snug">{label}</div>
                      <div className="text-[12px] text-slate-400 mt-0.5">{sub}</div>
                    </div>
                  </div>
                  <div className="text-[30px] md:text-[34px] font-black text-slate-900 tabular-nums shrink-0 leading-none">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ZAMAN ÇİZGİSİ — navy */}
      <section className="relative bg-[#1B3A8F] py-24 text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-10 -top-20 lg:-top-28 text-[260px] lg:text-[360px] font-black leading-none text-white/[0.05] select-none pointer-events-none tracking-tighter"
        >
          50
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Kurumsal Tarihçe</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">50 Yıllık Gelişim Kronolojisi</h2>
            <p className="text-white/60 mt-3 max-w-2xl text-[15px]">Kuruluştan bugüne kat edilen mesafe; stratejik kararların, güçlü ortaklıkların ve disiplinli operasyonun bir ürünüdür.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-white/15 hidden md:block" />
            <div className="space-y-10">
              {MILESTONES.map((m) => (
                <div key={m.year} className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
                  <div className="md:w-28 md:text-right shrink-0">
                    <span className="text-2xl font-black text-white">{m.year}</span>
                  </div>
                  <div className="relative pt-0 md:pt-1">
                    <div className="hidden md:block absolute -left-[1.65rem] top-2.5 w-3 h-3 rounded-full bg-[#7d9bea] border-2 border-[#1B3A8F] shadow" />
                    <h3 className="text-[16px] font-bold mb-1.5">{m.label}</h3>
                    <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">{m.desc}</p>
                  </div>
                </div>
              ))}

              {/* 2026 — anniversary peak, visually distinct */}
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
                <div className="md:w-28 md:text-right shrink-0">
                  <span className="text-3xl font-black do-hero-accent">2026</span>
                </div>
                <div className="relative pt-0 md:pt-1 flex-1">
                  <div className="hidden md:block absolute -left-[1.65rem] top-2 w-4 h-4 rounded-full bg-white border-2 border-[#7d9bea] shadow-[0_0_0_6px_rgba(125,155,234,0.25)]" />
                  <div className="bg-white/[0.08] border border-white/[0.15] rounded-xl p-6 max-w-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#7d9bea]">50. Kuruluş Yılı</span>
                    <p className="text-white text-[15px] leading-relaxed mt-2">
                      Geniş marka portföyü, güçlü müşteri ilişkileri ve yarım asrın kurumsal birikimiyle sektördeki yapıcı konumunu pekiştiriyor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEĞERLER — white, numbered list (distinct shape from stats + cards) */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14 lg:flex lg:items-end lg:justify-between lg:gap-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Kurumsal İlkeler</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Değer Çerçevemiz</h2>
            </div>
            <p className="text-slate-500 mt-3 lg:mt-0 max-w-sm text-[15px]">50 yıllık deneyim, dört temel kurumsal ilke üzerine inşa edilmiştir. Bu ilkeler her karar sürecinde referans alınır.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-14 gap-y-12">
            {VALUES.map(({ title, desc }, i) => (
              <div key={title} className="flex gap-6">
                <span className="do-metric-num text-5xl md:text-6xl font-black leading-none shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div className="pt-1">
                  <h3 className="text-[15.5px] font-bold text-slate-900 mb-2.5 leading-snug">{title}</h3>
                  <p className="text-slate-500 text-[13.5px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İŞ BİRİMLERİ — navy, unequal-weight bento: core business / featured SPART / compact pair */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Faaliyet Alanları</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">İş Birimlerimiz</h2>
            <p className="text-white/60 mt-3 max-w-xl text-[15px]">Delta Oto, birbirini tamamlayan iş kollarıyla otomotiv satış sonrası sektöründe kapsamlı bir tedarik gücü sunmaktadır.</p>
          </div>

          {/* Tier 1 — Aftermarket Dağıtım: the core business, full-width intro banner */}
          <div className="do-entity-card bg-white/[0.08] border border-white/[0.12] rounded-xl p-8 lg:p-9 mb-5 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="flex items-center gap-5 lg:w-[34%] shrink-0">
              <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <AftermarketIcon className="w-6 h-6 text-[#7d9bea]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7d9bea] block mb-1">Ana Faaliyet</span>
                <h3 className="text-xl font-black leading-snug">{unitAftermarket.title}</h3>
              </div>
            </div>
            <p className="text-white/65 text-[13.5px] leading-relaxed flex-1">{unitAftermarket.desc}</p>
            <div className="flex flex-wrap gap-1.5 lg:shrink-0 lg:max-w-[220px] lg:justify-end">
              {unitAftermarket.tags.map(t => <span key={t} className="text-[11px] bg-white/10 border border-white/15 text-white/70 px-2.5 py-1 rounded-full whitespace-nowrap">{t}</span>)}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Tier 2 — SPART Private Label: featured, photo-backed, links to its own page */}
            <Link
              href="/spart"
              className="do-entity-card group block lg:col-span-2 relative rounded-xl overflow-hidden min-h-[300px]"
            >
              <img
                src="/images/spart-quality.jpg"
                alt="SPART kalite kontrol ölçümü"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-[#0e1016]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016]/70 via-transparent to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-7 lg:p-8">
                <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-8 w-auto self-start rounded-md mb-4 shadow-lg" />
                <p className="text-white/80 text-[13.5px] leading-relaxed max-w-md mb-5">{unitSpart.desc}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {unitSpart.tags.map(t => <span key={t} className="text-[11px] bg-white/15 border border-white/20 text-white px-2.5 py-1 rounded-full">{t}</span>)}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[#7d9bea] text-[13px] font-semibold ml-auto group-hover:text-white transition-colors whitespace-nowrap">
                    SPART Sayfasını İnceleyin <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Tier 3 — Ağır Vasıta + B2B Dijital: compact, secondary */}
            <div className="flex flex-col gap-5">
              <div className="do-entity-card bg-white/[0.08] border border-white/[0.12] rounded-xl p-6 flex-1">
                <div className="w-12 h-12 rounded-lg overflow-hidden ring-1 ring-white/15 mb-4">
                  <img src="/images/heavy-duty.png" alt="Ağır vasıta yedek parçaları" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[14px] font-bold mb-2 leading-snug">{unitAgirVasita.title}</h3>
                <p className="text-white/60 text-[12.5px] leading-relaxed mb-4">{unitAgirVasita.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {unitAgirVasita.tags.map(t => <span key={t} className="text-[10.5px] bg-white/10 border border-white/15 text-white/70 px-2 py-0.5 rounded-full">{t}</span>)}
                </div>
              </div>
              <div className="do-entity-card bg-white/[0.08] border border-white/[0.12] rounded-xl p-6 flex-1">
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center mb-4">
                  <MonitorSmartphone className="w-[18px] h-[18px] text-[#7d9bea]" />
                </div>
                <h3 className="text-[14px] font-bold mb-2 leading-snug">{unitB2B.title}</h3>
                <p className="text-white/60 text-[12.5px] leading-relaxed mb-4">{unitB2B.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {unitB2B.tags.map(t => <span key={t} className="text-[10.5px] bg-white/10 border border-white/15 text-white/70 px-2 py-0.5 rounded-full">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GROUPAUTO — dark, big graphic numeral replaces the redundant stat-box trio */}
      <section className="relative bg-[#0e1016] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">Uluslararası Ağ</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Groupauto International Üyesi</h2>
              <p className="text-gray-300 leading-[1.85] text-[15.5px] mb-10 max-w-lg">
                Avrupa merkezli Groupauto International ağının Türkiye üyesi sıfatıyla, 40'tan fazla ülkedeki distribütörler ve küresel üreticilerle doğrudan bağlantı içindeyiz. Bu üyelik; ürün erişimini, tedarik koşullarını ve piyasa bilgisini rakiplerimizin önünde konumlandırır.
              </p>
              <div className="flex items-end gap-5 mb-10">
                <span className="text-white text-7xl md:text-8xl font-black tracking-tighter leading-[0.8] tabular-nums">3.000+</span>
                <div className="pb-1.5">
                  <div className="text-[13px] font-bold text-white uppercase tracking-wide">Üye Firma</div>
                  <div className="text-[12px] text-gray-400 mt-0.5">Küresel distribütör ağı · Top Tier erişim</div>
                </div>
              </div>
              <Link href="/tedarikciler" className="inline-flex items-center gap-2 text-[#7d9bea] text-[14px] font-semibold hover:text-white transition-colors group">
                Marka Portföyümüzü İnceleyin <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="space-y-4">
              <h3 className="text-[15px] font-bold text-white/80 uppercase tracking-widest mb-6">Üyeliğin Faydaları</h3>
              {[
                { t: "Küresel Satın Alma Gücü", d: "Ortak müzakere kapasitesiyle üreticilerden daha rekabetçi koşullar ve fiyatlar elde edilir." },
                { t: "Ürün Erişim Önceliği",     d: "Yeni model kapsamları ve tedarikçi başlatmaları Groupauto kanalı üzerinden öncelikli erişimle portföye eklenir." },
                { t: "Piyasa İstihbarat Ağı",    d: "Avrupa ve bölge pazarlarındaki talep trendleri, üretici haberleri ve fiyat hareketleri üye ağı üzerinden gerçek zamanlı takip edilir." },
                { t: "Kalite Protokolleri",       d: "Groupauto tedarikçi kalite standartları, ürün doğrulama ve katalog yönetim süreçlerine doğrudan entegre edilmektedir." },
              ].map(item => (
                <div key={item.t} className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-5 hover:bg-white/[0.1] transition-colors">
                  <h4 className="text-[14px] font-bold mb-1.5">{item.t}</h4>
                  <p className="text-white/55 text-[13px] leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SÜRDÜRÜLEBİLİRLİK — light, process-step shape (distinct from every card grid above) */}
      <section className="bg-[#f8fafc] py-20 md:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Kurumsal Sorumluluk</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Çevre ve Sürdürülebilirlik</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">Lojistik ve operasyon süreçlerimizde çevresel etkiyi azaltmaya yönelik uygulamalar hayata geçirilmektedir.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {ESG_ITEMS.map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <div className="w-12 h-12 rounded-full bg-white border-2 border-[#1B3A8F] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#1B3A8F]" />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — navy, closes the page before the footer per site rhythm rule */}
      <section className="relative bg-[#1B3A8F] text-white py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="absolute -right-16 top-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-3 text-blue-200 text-xs font-bold uppercase tracking-[0.3em] mb-5">
              <span className="w-8 h-[2px] bg-blue-300 hidden md:inline-block" />
              Bir Sonraki Adım
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 max-w-lg">50 Yıllık Deneyimi Sizinle Paylaşalım</h2>
            <p className="text-gray-300 max-w-xl text-[16px] font-light">Tedarik, lojistik ve iş ortaklığı süreçlerimiz hakkında detaylı bilgi almak için ekibimizle iletişime geçin.</p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/iletisim" className="bg-white text-[#1B3A8F] hover:bg-gray-100 font-bold px-8 py-4 rounded-md transition-colors inline-flex items-center gap-2 shadow-[0_0_32px_rgba(255,255,255,0.12)] group whitespace-nowrap">
              Bize Ulaşın <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/operasyon" className="border border-white/30 hover:border-white/60 text-white font-medium px-8 py-4 rounded-md transition-colors text-sm inline-flex items-center whitespace-nowrap">
              Operasyon Altyapımız
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

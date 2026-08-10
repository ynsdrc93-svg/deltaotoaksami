import React from "react";
import { Link } from "wouter";
import {
  ChevronRight,
  Globe,
  Award,
  Users,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  Gauge,
  Sprout,
  Package,
  Tag,
  Truck,
  Network,
  Route,
  Recycle,
  Laptop,
} from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { useCounter } from "../hooks/use-motion";

// `pending: true` kayıtlar gerçek bir tarih ama henüz yazılmamış içerik demektir —
// uydurma olay eklemek yerine dürüstçe "detaylar ekleniyor" olarak işaretlenir.
const MILESTONES = [
  { year: "1976", label: "Kuruluş", desc: "Ümraniye'de temelleri atılan şirket, otomotiv aftermarket sektörünün kurucu distribütörleri arasında yerini aldı.", pending: false },
  { year: "1990", label: "Portföy Genişlemesi", desc: "Tedarik ağının derinleşmesiyle birlikte İstanbul bölgesinde lider distribütör konumuna ulaşıldı; ürün kategorileri sistematik biçimde genişletildi.", pending: false },
  { year: "1998", label: "", desc: "", pending: true },
  { year: "2005", label: "Groupauto International Üyeliği", desc: "Avrupa merkezli bağımsız aftermarket ağına tam üye olunarak küresel tedarik kanallarına, üretici anlaşmalarına ve piyasa bilgisine erişim sağlandı.", pending: false },
  { year: "2010", label: "", desc: "", pending: true },
  { year: "2015", label: "Ulusal Lojistik Ağı", desc: "Türkiye'nin 81 iline kesintisiz teslimat kapasitesi kuruldu. Opar Ege bölge operasyonuyla dağıtım coğrafyası İzmir ve Ege'ye yayıldı; ihracat operasyonu faaliyete geçti.", pending: false },
  { year: "2020", label: "", desc: "", pending: true },
  { year: "2026", label: "50. Kuruluş Yılı", desc: "250'den fazla aktif marka, binlerce müşteri ilişkisi ve yarım asrın kurumsal birikimiyle sektördeki yapıcı konumunu pekiştiriyor.", pending: false },
];

// grouped: tr-TR binlik ayraç (nokta) uygulanır — sadece 1000 ve üzeri gerçek miktarlarda kullanılır (1976 bir yıl, ayraç almaz).
const FACT_STATS = [
  { icon: Award,      target: 1976, plus: false, grouped: false, label: "Kuruluş Yılı",     sub: "50 yıl sektör deneyimi" },
  { icon: Globe,      target: 40,   plus: true,  grouped: false, label: "Ülke Ağı",         sub: "Groupauto International" },
  { icon: Users,      target: 3000, plus: true,  grouped: true,  label: "Groupauto Üyesi",  sub: "Küresel distribütör ağı" },
  { icon: TrendingUp, target: 250,  plus: true,  grouped: false, label: "Aktif Marka",      sub: "Sürekli güncellenen portföy" },
];

const VALUES = [
  { icon: ShieldCheck, title: "Kurumsal Güvenilirlik", desc: "Ticari ilişkilerde öngörülebilirlik ve taahhüt bütünlüğü, Delta Oto'nun temel kurumsal kimliğini oluşturur. Her sipariş ve her iş birliği bu güven çerçevesinde yürütülür." },
  { icon: BadgeCheck,  title: "Ürün Kalite Güvencesi", desc: "Portföydeki her marka, denetimli kaynak doğrulamasından geçer. Kayıt dışı ve sahte ürün sıfır toleranstır; OEM ve OEM eşdeğeri standart zorunluluğu istisnasız uygulanır." },
  { icon: Gauge,       title: "Operasyonel Mükemmellik", desc: "Siparişten teslimata uzanan sürecin her halkasında performans standardı titizlikle korunur. WMS destekli süreçler, stok doğruluğunu ve hız taahhüdünü güvence altına alır." },
  { icon: Sprout,      title: "Sürdürülebilir Büyüme", desc: "Müşteri portföyünün rekabet gücünü artırmak ve uzun vadeli iş ortaklıkları kurmak, Delta Oto'nun büyüme stratejisinin merkezindedir. Kısa vadeli kâr yerine ilişki kalitesi önceliklidir." },
];

const BUSINESS_UNITS = [
  { icon: Package, title: "Aftermarket Dağıtım", desc: "Binek ve hafif ticari araç kategorilerinde 250'den fazla küresel ve yerel marka distribütörlüğü. Türkiye'nin tamamına B2B kanalı üzerinden tedarik.", tags: ["250+ Marka", "50.000+ SKU", "B2B Portal"] },
  { icon: Tag,     title: "SPART Private Label", desc: "Delta Oto'nun özel dağıtım markası SPART; OEM eşdeğeri kaliteyi rekabetçi fiyat yapısıyla sunar. Fren, süspansiyon, motor ve kaporta kategorilerinde aktif portföy.", tags: ["OEM Eşdeğeri", "Rekabetçi Fiyat", "Geniş SKU Gamı"] },
  { icon: Truck,   title: "Ağır Vasıta Grubu", desc: "Kamyon, otobüs ve iş makinesi kategorilerinde seçilmiş marka ve ürün gamıyla ağır vasıta segmentine özel tedarik hizmeti.", tags: ["Kamyon", "Otobüs", "İş Makinesi"] },
  { icon: Network, title: "B2B Dijital Kanal", desc: "7/24 erişilebilen B2B portalı üzerinden anlık stok sorgulama, fiyat listeleri ve sipariş yönetimi. Müşteri operasyonlarına entegre dijital tedarik deneyimi.", tags: ["7/24 Erişim", "Anlık Stok", "Dijital Sipariş"] },
];

const ESG_ITEMS = [
  { icon: Route,   title: "Lojistik Optimizasyonu", desc: "Rota planlaması ve yük konsolidasyonuyla teslimat başına karbon ayak izinin azaltılması hedeflenmektedir." },
  { icon: Recycle, title: "Ambalaj ve Atık Yönetimi", desc: "Tedarikçilerle birlikte yürütülen ambalaj azaltım çalışmaları ile depo atık yönetimi süreçleri hayata geçirilmiştir." },
  { icon: Laptop,  title: "Sayısal Dönüşüm", desc: "Kağıtsız sipariş ve fatura süreçleri, B2B portal entegrasyonuyla müşteri operasyonlarına sunulmaktadır." },
];

/** Kurumsal Rakamlar kartı: kart görünüre girince hedef değere sayarak ulaşır (LandingPage'deki MetricItem/CountUp desenine benzer, bu sayfaya özgü sadeleştirilmiş hali). */
function StatCard({ icon: Icon, target, plus, grouped, label, sub }: {
  icon: React.ElementType;
  target: number;
  plus: boolean;
  grouped: boolean;
  label: string;
  sub: string;
}) {
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const count = useCounter(target, 1600, started);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const display = grouped ? count.toLocaleString("tr-TR") : String(count);

  return (
    <div ref={ref} className="border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all group">
      <div className="w-11 h-11 bg-[#1B3A8F]/[0.07] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1B3A8F]/[0.12] transition-colors">
        <Icon className="w-5 h-5 text-[#1B3A8F]" />
      </div>
      <div className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tabular-nums">
        {display}{plus ? "+" : ""}
      </div>
      <div className="text-[12px] font-bold text-[#1B3A8F] uppercase tracking-wider mt-2">{label}</div>
      <div className="text-[12px] text-slate-400 mt-1 leading-snug">{sub}</div>
    </div>
  );
}

export function HakkimizdaPage() {
  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/delta-oto-hero.png"
            alt=""
            className="w-full h-full object-cover opacity-25"
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
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kuruluş 1976 · Delta Oto</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="do-hero-line">YARIM ASRIN</span><br />
            <span className="text-white">KURUMSAL</span><br />
            <span className="text-[#7d9bea]">BİRİKİMİ</span>
          </h1>
          <p className="text-base text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
            1976'dan bu yana otomotiv yedek parça dağıtım sektöründe faaliyet gösteren Delta Oto; güçlü tedarik altyapısı, geniş marka portföyü ve Groupauto International üyeliğiyle sektörün yapıcı güçlerinden biri olmaya devam etmektedir.
          </p>
          <Link
            href="/operasyon"
            className="inline-flex items-center gap-2.5 bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md transition-colors shadow-[0_0_32px_rgba(27,58,143,0.3)] group"
          >
            Operasyon Altyapımızı İnceleyin <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* KURUMSAL RAKAMLAR — light */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Rakamlarla Delta Oto</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Kurumsal Ölçek ve Erişim</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {FACT_STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ZAMAN ÇİZGİSİ — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Kurumsal Tarihçe</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">50 Yıllık Gelişim Kronolojisi</h2>
            <p className="text-white/75 mt-3 max-w-2xl text-[15px]">Kuruluştan bugüne kat edilen mesafe; stratejik kararların, güçlü ortaklıkların ve disiplinli operasyonun bir ürünüdür.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-white/15 hidden md:block" />
            {/* Basitleştirilmiş mobil rayı: masaüstündeki bağlantı çizgisi mobilde tamamen kaybolmasın diye küçük bir sol ray + nokta bırakılır. */}
            <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/15 md:hidden" />
            <div className="space-y-7">
              {MILESTONES.map((m) => (
                <div key={m.year} className={`relative flex flex-col md:flex-row md:items-start gap-2 md:gap-10 pl-6 md:pl-0 ${m.pending ? "opacity-60" : ""}`}>
                  <div className={`md:hidden absolute left-0 top-1 w-[11px] h-[11px] rounded-full ${m.pending ? "bg-transparent border-2 border-dashed border-white/40" : "bg-[#7d9bea] border-2 border-[#1B3A8F]"}`} />
                  <div className="md:w-28 md:text-right shrink-0">
                    <span className={`font-black ${m.pending ? "text-lg text-white/50" : "text-2xl text-white"}`}>{m.year}</span>
                  </div>
                  <div className="relative pt-0 md:pt-1">
                    <div className={`hidden md:block absolute -left-[1.65rem] top-2.5 w-3 h-3 rounded-full ${m.pending ? "bg-transparent border-2 border-dashed border-white/40" : "bg-[#7d9bea] border-2 border-[#1B3A8F] shadow"}`} />
                    {m.pending ? (
                      <p className="text-white/40 text-[13px] italic leading-relaxed">Bu döneme ait detaylar yakında eklenecek.</p>
                    ) : (
                      <>
                        <h3 className="text-[15px] font-bold mb-1.5">{m.label}</h3>
                        <p className="text-white/75 text-sm leading-relaxed max-w-2xl">{m.desc}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEĞERLER — white */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Kurumsal İlkeler</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Değer Çerçevemiz</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-[15px]">50 yıllık deneyim, dört temel kurumsal ilke üzerine inşa edilmiştir. Bu ilkeler her karar sürecinde referans alınır.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-lg transition-all">
                <div className="w-11 h-11 bg-[#1B3A8F]/[0.07] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#1B3A8F]/[0.12] transition-colors">
                  <Icon className="w-5 h-5 text-[#1B3A8F]" />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-snug">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İŞ BİRİMLERİ — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Faaliyet Alanları</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">İş Birimlerimiz</h2>
            <p className="text-white/75 mt-3 max-w-xl text-[15px]">Delta Oto, birbirini tamamlayan iş kollarıyla otomotiv satış sonrası sektöründe kapsamlı bir tedarik gücü sunmaktadır.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {BUSINESS_UNITS.map(({ icon: Icon, title, desc, tags }) => (
              <div key={title} className="group bg-white/[0.08] border border-white/[0.12] rounded-xl p-7 hover:bg-white/[0.14] transition-colors flex flex-col">
                <div className="w-11 h-11 bg-white/10 border border-white/15 rounded-xl flex items-center justify-center mb-5 group-hover:bg-white/[0.18] transition-colors">
                  <Icon className="w-5 h-5 text-[#7d9bea]" />
                </div>
                <h3 className="text-[15px] font-bold mb-3 leading-snug">{title}</h3>
                <p className="text-white/75 text-sm leading-relaxed flex-1">{desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {tags.map(t => <span key={t} className="text-[11px] bg-white/10 border border-white/15 text-white/70 px-2.5 py-1 rounded-full">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROUPAUTO — dark */}
      <section className="relative bg-[#0e1016] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/delta-oto-ops.png" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0e1016]/80" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">Uluslararası Ağ</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Groupauto International Üyesi</h2>
              <p className="text-gray-300 leading-[1.85] text-base mb-8 max-w-lg">
                Avrupa merkezli Groupauto International ağının Türkiye üyesi sıfatıyla, 40'tan fazla ülkedeki distribütörler ve küresel üreticilerle doğrudan bağlantı içindeyiz. Bu üyelik; ürün erişimini, tedarik koşullarını ve piyasa bilgisini rakiplerimizin önünde konumlandırır.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[["50+", "Global Tedarikçi"], ["Top Tier", "Tedarikçi Erişimi"], ["İhracat", "Kapasitesi"]].map(([n, l]) => (
                  <div key={l} className="bg-white/[0.06] border border-white/[0.1] rounded-xl p-5 text-center">
                    <div className="text-2xl font-black text-white mb-1">{n}</div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wide">{l}</div>
                  </div>
                ))}
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
                  <h4 className="text-[15px] font-bold mb-1.5">{item.t}</h4>
                  <p className="text-white/75 text-sm leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SÜRDÜRÜLEBİLİRLİK — light */}
      <section className="bg-[#f8fafc] py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Kurumsal Sorumluluk</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Çevre ve Sürdürülebilirlik</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">Lojistik ve operasyon süreçlerimizde çevresel etkiyi azaltmaya yönelik uygulamalar hayata geçirilmektedir.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {ESG_ITEMS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-white border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all">
                <div className="w-11 h-11 bg-[#1B3A8F]/[0.07] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#1B3A8F]/[0.12] transition-colors">
                  <Icon className="w-5 h-5 text-[#1B3A8F]" />
                </div>
                <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KAPANIŞ CTA — navy (footer öncesi son bölüm daima #1B3A8F olmalı; ESG'nin rengi değişmedi, araya yeni bant eklendi) */}
      <section className="bg-[#1B3A8F] py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Delta Oto ile İş Ortaklığına Başlayın</h2>
            <p className="text-white/75 text-sm mt-2 max-w-lg">50 yıllık kurumsal birikimimizle tanışın; B2B portalımızdan sipariş verin veya ekibimizle doğrudan iletişime geçin.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <a href="#" className="bg-white text-[#1B3A8F] font-bold px-7 py-3.5 rounded-md hover:bg-gray-100 transition-colors text-sm inline-flex items-center gap-2 group">
              B2B Portal
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link href="/iletisim" className="border border-white/30 hover:border-white/60 text-white font-medium px-7 py-3.5 rounded-md transition-colors text-sm">
              İletişim
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

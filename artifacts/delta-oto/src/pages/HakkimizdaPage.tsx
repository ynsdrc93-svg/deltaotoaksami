import React from "react";
import { Link } from "wouter";
import { ChevronRight, Globe, Award, Users, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const MILESTONES = [
  { year: "1976", label: "Kuruluş", desc: "Ümraniye'de temelleri atılan şirket, otomotiv aftermarket sektörünün kurucu distribütörleri arasında yerini aldı." },
  { year: "1990", label: "Portföy Genişlemesi", desc: "Tedarik ağının derinleşmesiyle birlikte İstanbul bölgesinde lider distribütör konumuna ulaşıldı; ürün kategorileri sistematik biçimde genişletildi." },
  { year: "2005", label: "Groupauto International Üyeliği", desc: "Avrupa merkezli bağımsız aftermarket ağına tam üye olunarak küresel tedarik kanallarına, üretici anlaşmalarına ve piyasa bilgisine erişim sağlandı." },
  { year: "2015", label: "Ulusal Lojistik Ağı", desc: "Türkiye'nin 81 iline kesintisiz teslimat kapasitesi kuruldu. Opar Ege bölge operasyonuyla dağıtım coğrafyası İzmir ve Ege'ye yayıldı; ihracat operasyonu faaliyete geçti." },
  { year: "2026", label: "50. Kuruluş Yılı", desc: "250'den fazla aktif marka, binlerce müşteri ilişkisi ve yarım asrın kurumsal birikimiyle sektördeki yapıcı konumunu pekiştiriyor." },
];

const FACT_STATS = [
  { icon: Award,     value: "1976", label: "Kuruluş Yılı",       sub: "50 yıl sektör deneyimi" },
  { icon: Globe,     value: "40+",  label: "Ülke Ağı",           sub: "Groupauto International" },
  { icon: Users,     value: "3.000+", label: "Groupauto Üyesi", sub: "Küresel distribütör ağı" },
  { icon: TrendingUp, value: "250+", label: "Aktif Marka",       sub: "Sürekli güncellenen portföy" },
];

const VALUES = [
  { title: "Kurumsal Güvenilirlik", desc: "Ticari ilişkilerde öngörülebilirlik ve taahhüt bütünlüğü, Delta Oto'nun temel kurumsal kimliğini oluşturur. Her sipariş ve her iş birliği bu güven çerçevesinde yürütülür." },
  { title: "Ürün Kalite Güvencesi", desc: "Portföydeki her marka, denetimli kaynak doğrulamasından geçer. Kayıt dışı ve sahte ürün sıfır toleranstır; OEM ve OEM eşdeğeri standart zorunluluğu istisnasız uygulanır." },
  { title: "Operasyonel Mükemmellik", desc: "Siparişten teslimata uzanan sürecin her halkasında performans standardı titizlikle korunur. WMS destekli süreçler, stok doğruluğunu ve hız taahhüdünü güvence altına alır." },
  { title: "Sürdürülebilir Büyüme", desc: "Müşteri portföyünün rekabet gücünü artırmak ve uzun vadeli iş ortaklıkları kurmak, Delta Oto'nun büyüme stratejisinin merkezindedir. Kısa vadeli kâr yerine ilişki kalitesi önceliklidir." },
];

const ESG_ITEMS = [
  { title: "Lojistik Optimizasyonu", desc: "Rota planlaması ve yük konsolidasyonuyla teslimat başına karbon ayak izinin azaltılması hedeflenmektedir." },
  { title: "Ambalaj ve Atık Yönetimi", desc: "Tedarikçilerle birlikte yürütülen ambalaj azaltım çalışmaları ile depo atık yönetimi süreçleri hayata geçirilmiştir." },
  { title: "Sayısal Dönüşüm", desc: "Kağıtsız sipariş ve fatura süreçleri, B2B portal entegrasyonuyla müşteri operasyonlarına sunulmaktadır." },
];

export function HakkimizdaPage() {
  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
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
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
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
            {FACT_STATS.map(({ icon: Icon, value, label, sub }) => (
              <div key={label} className="border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all group">
                <div className="w-11 h-11 bg-[#1B3A8F]/[0.07] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1B3A8F]/[0.12] transition-colors">
                  <Icon className="w-5 h-5 text-[#1B3A8F]" />
                </div>
                <div className="text-3xl font-black text-slate-900 leading-tight">{value}</div>
                <div className="text-[12px] font-bold text-[#1B3A8F] uppercase tracking-wider mt-1.5">{label}</div>
                <div className="text-[12px] text-slate-400 mt-1 leading-snug">{sub}</div>
              </div>
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
            {VALUES.map((v) => (
              <div key={v.title} className="border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-lg transition-all">
                <h3 className="text-[15px] font-bold text-slate-900 mb-3 leading-snug">{v.title}</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROUPAUTO — dark */}
      <section className="relative bg-[#0e1016] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0e1016]/80" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-4">Uluslararası Ağ</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Groupauto International Üyesi</h2>
              <p className="text-gray-300 leading-[1.85] text-[15.5px] mb-8 max-w-lg">
                Avrupa merkezli Groupauto International ağının Türkiye üyesi sıfatıyla, 40'tan fazla ülkedeki distribütörler ve küresel üreticilerle doğrudan bağlantı içindeyiz. Bu üyelik; ürün erişimini, tedarik koşullarını ve piyasa bilgisini rakiplerimizin önünde konumlandırır.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[["40+","Ülke"],["3.000+","Üye Firma"],["Top Tier","Tedarikçi Erişimi"]].map(([n,l]) => (
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
                  <h4 className="text-[14px] font-bold mb-1.5">{item.t}</h4>
                  <p className="text-white/55 text-[13px] leading-relaxed">{item.d}</p>
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
            {ESG_ITEMS.map(item => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all">
                <div className="w-3 h-3 rounded-full bg-[#1B3A8F] mb-5" />
                <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-snug">{item.title}</h3>
                <p className="text-slate-500 text-[13.5px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import { ChevronRight, Globe, Building2, MapPin, Mail, Phone } from "lucide-react";

// --- Hooks ---
function useIntersectionObserver(options = {}) {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, ...options });

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [options]);

  const setRef = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return setRef;
}

// --- Components ---
export function LandingPage() {
  const setRef = useIntersectionObserver();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="font-['Inter'] min-h-screen bg-[#f8f9fa] text-[#1a1d23] selection:bg-[#c8102e] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .reveal-element {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .reveal-element.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-100 { transition-delay: 100ms; }
        .reveal-delay-200 { transition-delay: 200ms; }
      `}} />

      {/* 1. STICKY HEADER / NAV */}
      <header className="sticky top-0 z-50 bg-[#1a1d23]/95 backdrop-blur-sm border-b border-white/5 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-2xl tracking-tight">DELTA OTO</span>
            <span className="bg-[#c8102e] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider">50. YIL</span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Hakkımızda</a>
            <a href="#" className="hover:text-white transition-colors">Tedarikçiler</a>
            <a href="#" className="hover:text-white transition-colors">Operasyon ve Lojistik</a>
            <a href="#" className="hover:text-white transition-colors">Kariyer</a>
            <a href="#" className="hover:text-white transition-colors">Groupauto</a>
            <a href="#" className="hover:text-white transition-colors">İletişim</a>
            <a href="#" className="text-[#d4af37] border border-[#d4af37]/30 bg-[#d4af37]/5 px-3 py-1 rounded-sm hover:bg-[#d4af37]/10 transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
              SPART
            </a>
          </nav>

          <button className="bg-white text-[#1a1d23] hover:bg-gray-100 px-6 py-2.5 rounded text-sm font-semibold transition-colors">
            B2B Portal
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/delta-oto-hero.png" 
            alt="Delta Oto Logistics" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1d23]/95 via-[#1a1d23]/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 ref={setRef} className="reveal-element text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              50 YILDIR OTOMOTİV AFTERMARKET'İN KESİNTİSİZ GÜCÜ
            </h1>
            <p ref={setRef} className="reveal-element reveal-delay-100 text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl font-light">
              Binek ve hafif ticari araç yedek parça pazarında, bağımsız yenileme sektörünü 1976'dan bugüne güçlü lojistik altyapımız ve küresel tedarik ağımızla yönlendiriyoruz.
            </p>
            <div ref={setRef} className="reveal-element reveal-delay-200">
              <button className="bg-[#c8102e] hover:bg-[#a00d25] text-white px-8 py-4 rounded font-semibold text-lg transition-colors flex items-center gap-2 group">
                Operasyon Gücümüzü İnceleyin
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POWER METRICS SECTION */}
      <section className="bg-[#1a1d23] py-24 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div ref={setRef} className="reveal-element text-center px-8 py-8 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-white mb-4">250+</div>
              <div className="text-gray-400 font-medium tracking-wide">Ulusal ve Uluslararası Marka Referansı</div>
            </div>
            <div ref={setRef} className="reveal-element reveal-delay-100 text-center px-8 py-8 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-white mb-4">81 İl + İhracat</div>
              <div className="text-gray-400 font-medium tracking-wide">Kesintisiz Dağıtım ve Lojistik Ağı</div>
            </div>
            <div ref={setRef} className="reveal-element reveal-delay-200 text-center px-8 py-8 md:py-0">
              <div className="text-5xl md:text-6xl font-bold text-white mb-4">1976</div>
              <div className="text-gray-400 font-medium tracking-wide">Kuruluş ve Sektörel Liderlik</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STRATEGIC PARTNERSHIP SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 ref={setRef} className="reveal-element text-4xl md:text-5xl font-bold text-[#1a1d23] mb-6 tracking-tight">
                Uluslararası Güç,<br/>Yerel Hakimiyet.
              </h2>
              <p ref={setRef} className="reveal-element reveal-delay-100 text-lg text-gray-600 leading-relaxed">
                Dünyanın en büyük yedek parça organizasyonlarından Groupauto'nun gücüyle, optimize edilmiş satın alma kapasitemizi birleştiriyoruz. Global vizyonumuzla, iş ortaklarımıza her geçen gün daha rekabetçi ve öncü çalışma olanakları sunuyoruz.
              </p>
            </div>
            <div className="lg:w-1/2 flex flex-col sm:flex-row gap-6 w-full">
              <div ref={setRef} className="reveal-element flex-1 border border-gray-200 rounded p-12 flex items-center justify-center bg-gray-50/50">
                <span className="font-bold text-xl text-gray-400 tracking-wider text-center">Groupauto<br/>International</span>
              </div>
              <div ref={setRef} className="reveal-element reveal-delay-100 flex-1 border border-gray-200 rounded p-12 flex items-center justify-center bg-gray-50/50">
                <span className="font-bold text-xl text-gray-400 tracking-wider text-center">Groupauto<br/>Türkiye</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OPERATIONS & LOGISTICS SECTION */}
      <section className="relative py-32 bg-[#1a1d23] overflow-hidden">
        <div className="absolute inset-0 w-full h-full lg:w-1/2">
          <img 
            src="/__mockup/images/delta-oto-ops.png" 
            alt="Delta Oto Operations" 
            className="w-full h-full object-cover opacity-50 lg:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a1d23]/80 to-[#1a1d23] lg:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1d23] hidden lg:block"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-end">
            <div className="lg:w-5/12">
              <h2 ref={setRef} className="reveal-element text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                Kesintisiz Tedarik.<br/>Sıfır Hata Toleransı.
              </h2>
              <p ref={setRef} className="reveal-element reveal-delay-100 text-lg text-gray-300 leading-relaxed mb-6">
                Otomotiv satış sonrası pazarında mazerete yer yoktur. Lojistiği sadece bir taşıma işlemi değil, iş ortaklarımız için stratejik bir rekabet avantajı olarak yönetiyoruz. Ümraniye'deki merkezimizden Türkiye'nin tamamına ve küresel pazarlara uzanan dağıtım ağımızla, binek ve hafif ticari araç gruplarında 250'den fazla markanın tedariğini sağlıyoruz. 
              </p>
              <p ref={setRef} className="reveal-element reveal-delay-200 text-lg text-gray-300 leading-relaxed">
                Yakın zamanda Otokoç İzmir Tofaş yedek parça bayiliğini de bünyemize katarak sahadaki gücümüzü pekiştirdik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AGENDA & VISION */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div ref={setRef} className="reveal-element group bg-white p-10 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#c8102e] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <h3 className="text-2xl font-bold text-[#1a1d23] mb-4">Otokoç İzmir Tofaş Operasyonu Başladı</h3>
              <p className="text-gray-600 leading-relaxed">
                Yarım asırlık büyüme ivmemizi sahada yeni yatırımlarla somutlaştırıyoruz. Mayıs 2026 itibarıyla Otokoç İzmir Tofaş yedek parça bayiliğini devralarak Ege bölgesindeki tedarik ağımızı doğrudan genişlettik. Hedefimiz net: İş ortaklarımıza her koşulda daha hızlı, daha geniş ve daha güçlü bir envanter sunmak.
              </p>
            </div>

            <div ref={setRef} className="reveal-element reveal-delay-100 group bg-white p-10 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#c8102e] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <h3 className="text-2xl font-bold text-[#1a1d23] mb-4">GROUPAUTO O2O Europe & O2O Heavy Duty Days 2026 in Mallorca</h3>
              <p className="text-gray-600 leading-relaxed">
                27-29 Mayıs tarihlerinde düzenlenen uluslararası zirvede Türkiye'yi ve yerel gücümüzü temsil ettik. İş ortaklarımızın pazar rekabetinde daha da güçlenmesi ve yeni fırsatlara erişimi için 35 farklı global üreticiyle kritik görüşmeler gerçekleştirdik. Sektörün geleceği yazılırken masadayız.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#1a1d23] pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            <div>
              <div className="text-white font-bold text-2xl tracking-tight mb-6 flex items-center gap-2">
                DELTA OTO <span className="bg-[#c8102e] text-[10px] px-1.5 py-0.5 rounded-sm">50. YIL</span>
              </div>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 text-gray-500" />
                  <span>Barbaros Cd. Beyit Sk. No:17,<br/>Yukarı Dudullu - Ümraniye / İstanbul</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 shrink-0 text-gray-500" />
                  <span>info@deltaoto.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-gray-500" />
                  <span>0216 526 64 64 / 0216 526 33 44</span>
                </li>
              </ul>
            </div>

            <div className="md:pl-12">
              <h4 className="text-white font-semibold mb-6">Hızlı Bağlantılar</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Kurumsal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">B2B Portal Girişi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-white font-semibold">Sertifikalar ve Üyelikler</h4>
              <div className="flex gap-4">
                <div className="w-24 h-16 border border-white/10 rounded flex items-center justify-center bg-white/5">
                  <span className="text-[10px] text-gray-500 font-bold text-center">OSS<br/>Derneği</span>
                </div>
                <div className="w-24 h-16 border border-white/10 rounded flex items-center justify-center bg-white/5">
                  <span className="text-[10px] text-gray-500 font-bold text-center">ISO<br/>9001</span>
                </div>
              </div>
            </div>

          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            © 2026 Delta Oto. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}

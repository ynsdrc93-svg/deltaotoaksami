import React, { useState } from "react";
import { ArrowRight, MapPin, Phone, Mail, Globe, ChevronRight } from "lucide-react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  .do-page { font-family: 'Inter', sans-serif; }
  .do-grid-bg {
    background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
`;

const NAV_LINKS = ["Hakkımızda", "Tedarikçiler", "Operasyon ve Lojistik", "Kariyer", "İletişim"];

export default function IletisimPage() {
  const [form, setForm] = useState({ ad: "", firma: "", telefon: "", email: "", konu: "", mesaj: "" });

  return (
    <div className="do-page bg-white min-h-screen">
      <style>{CSS}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="#" className="shrink-0">
              <img src="/images/delta-oto-logo.png" alt="Delta Oto 50. Yıl" className="h-16 w-auto" />
            </a>
            <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-slate-600">
              {NAV_LINKS.map(l => (
                <a key={l} href="#" className={`hover:text-[#1B3A8F] transition-colors whitespace-nowrap ${l === "İletişim" ? "text-[#1B3A8F] font-semibold" : ""}`}>{l}</a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[13px] font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center gap-1.5 group">
              B2B Portal <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO — dark */}
      <section className="relative bg-[#0e1016] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-50" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">İletişim</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-[-0.02em] mb-4">
            <span className="text-white">BİZE</span><br />
            <span className="text-[#7d9bea]">ULAŞIN</span>
          </h1>
          <p className="text-[16px] text-gray-300 max-w-xl font-light leading-relaxed">
            Sipariş, teknik bilgi, bayi başvurusu veya genel sorularınız için aşağıdaki kanalları kullanabilirsiniz.
          </p>
        </div>
      </section>

      {/* İLETİŞİM BİLGİLERİ + FORM — light */}
      <section className="bg-[#f8fafc] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12">

          {/* Left: contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Merkez Ofis</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2 mb-6">İletişim Bilgileri</h2>
            </div>

            {[
              {
                Icon: MapPin,
                label: "Adres",
                lines: ["Ümraniye, İstanbul", "Türkiye"],
              },
              {
                Icon: Phone,
                label: "Telefon",
                lines: ["+90 216 XXX XX XX", "Pazartesi–Cuma, 08:30–18:00"],
              },
              {
                Icon: Mail,
                label: "E-posta",
                lines: ["info@deltaoto.com.tr", "b2b@deltaoto.com.tr"],
              },
              {
                Icon: Globe,
                label: "Web",
                lines: ["www.deltaoto.com.tr", "B2B Portal: b2b.deltaoto.com.tr"],
              },
            ].map(({ Icon, label, lines }) => (
              <div key={label} className="flex gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="shrink-0 w-10 h-10 bg-[#1B3A8F]/8 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#1B3A8F]" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</div>
                  {lines.map((l, i) => (
                    <div key={i} className={`text-[14px] ${i === 0 ? "text-slate-900 font-semibold" : "text-slate-500"}`}>{l}</div>
                  ))}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="h-44 rounded-xl bg-slate-200 flex items-center justify-center border border-slate-300">
              <span className="text-slate-400 text-sm font-medium">Harita — Ümraniye, İstanbul</span>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Mesaj Gönderin</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Bize Yazın</h2>
              <p className="text-slate-500 mt-2 text-[14px]">En kısa sürede geri döneceğiz.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { id: "ad", label: "Ad Soyad", placeholder: "Adınız ve soyadınız" },
                { id: "firma", label: "Firma Adı", placeholder: "Firma ünvanı" },
                { id: "telefon", label: "Telefon", placeholder: "+90 5XX XXX XX XX" },
                { id: "email", label: "E-posta", placeholder: "ornek@firma.com" },
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition"
                    value={(form as any)[id]}
                    onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5">
              <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Konu</label>
              <select className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-700 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition bg-white">
                <option value="">Konu seçin</option>
                <option>Sipariş ve Teslimat</option>
                <option>Ürün ve Stok Bilgisi</option>
                <option>B2B Portal Erişimi</option>
                <option>Bayi Başvurusu</option>
                <option>Diğer</option>
              </select>
            </div>
            <div className="mt-5">
              <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Mesajınız</label>
              <textarea
                rows={4}
                placeholder="Mesajınızı buraya yazın..."
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition resize-none"
                value={form.mesaj}
                onChange={e => setForm(f => ({ ...f, mesaj: e.target.value }))}
              />
            </div>
            <button className="mt-6 w-full bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 group">
              Mesaj Gönder <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060810] text-white py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <img src="/images/delta-oto-logo.png" alt="Delta Oto" className="h-12 mx-auto mb-6 brightness-0 invert opacity-70" />
          <p className="text-gray-500 text-sm">© 2026 Delta Oto A.Ş. — Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

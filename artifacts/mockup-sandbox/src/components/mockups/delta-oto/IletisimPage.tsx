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
  .do-hero-line {
    background: linear-gradient(90deg, #fff 60%, rgba(255,255,255,0.55));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .do-input:focus { outline: none; border-color: #1B3A8F; box-shadow: 0 0 0 3px rgba(27,58,143,0.12); }
`;

const NAV = ["Hakkımızda", "Tedarikçiler", "Operasyon ve Lojistik", "Kariyer", "İletişim"];

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
              {NAV.map(l => (
                <a key={l} href="#" className={`hover:text-[#1B3A8F] transition-colors whitespace-nowrap ${l === "İletişim" ? "text-[#1B3A8F] font-semibold border-b-2 border-[#1B3A8F] pb-0.5" : ""}`}>{l}</a>
              ))}
            </nav>
          </div>
          <a href="#" className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white text-[13px] font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center gap-1.5 group">
            B2B Portal <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </header>

      {/* HERO — dark + Istanbul image */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
            style={{ objectPosition: "center 60%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-28">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kurumsal İletişim · Ümraniye, İstanbul</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[68px] font-black leading-[1.05] tracking-[-0.02em] mb-5">
            <span className="do-hero-line">BİZE</span><br />
            <span className="text-[#7d9bea]">ULAŞIN</span>
          </h1>
          <p className="text-[16px] text-gray-300 max-w-xl font-light leading-relaxed">
            Ürün ve stok sorguları, sipariş talepleri, B2B portal erişimi veya genel kurumsal iletişim için aşağıdaki kanalları kullanabilirsiniz.
          </p>
        </div>
      </section>

      {/* İLETİŞİM + FORM — light */}
      <section className="bg-[#f8fafc] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12 items-start">

          {/* Left: contact cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Merkez Ofis</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">İletişim Kanalları</h2>
            </div>

            {[
              { Icon: MapPin, label: "Adres", lines: ["Ümraniye, İstanbul", "Türkiye"] },
              { Icon: Phone, label: "Telefon", lines: ["+90 216 XXX XX XX", "Pazartesi–Cuma, 08:30–18:00"] },
              { Icon: Mail, label: "Kurumsal E-posta", lines: ["info@deltaoto.com.tr", "b2b@deltaoto.com.tr"] },
              { Icon: Globe, label: "Dijital Kanallar", lines: ["www.deltaoto.com.tr", "b2b.deltaoto.com.tr (Portal)"] },
            ].map(({ Icon, label, lines }) => (
              <div key={label} className="flex gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-[#1B3A8F]/30 transition-colors">
                <div className="shrink-0 w-10 h-10 bg-[#1B3A8F]/8 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#1B3A8F]" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{label}</div>
                  {lines.map((l, i) => (
                    <div key={i} className={`text-[13.5px] ${i === 0 ? "text-slate-900 font-semibold" : "text-slate-500"}`}>{l}</div>
                  ))}
                </div>
              </div>
            ))}

            <div className="h-44 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=70"
                alt="İstanbul harita"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-[13px] font-semibold text-slate-700 shadow-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1B3A8F]" /> Ümraniye, İstanbul
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Talep Formu</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Bize Yazın</h2>
              <p className="text-slate-500 mt-2 text-[14px]">Talebiniz en kısa sürede ilgili birime yönlendirilecektir.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                { id: "ad", label: "Ad Soyad", ph: "Adınız ve soyadınız" },
                { id: "firma", label: "Firma Ünvanı", ph: "Firma adı" },
                { id: "telefon", label: "Telefon", ph: "+90 5XX XXX XX XX" },
                { id: "email", label: "Kurumsal E-posta", ph: "ornek@firma.com.tr" },
              ].map(({ id, label, ph }) => (
                <div key={id}>
                  <label className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
                  <input
                    type="text"
                    placeholder={ph}
                    className="do-input w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 transition"
                    value={(form as any)[id]}
                    onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Talep Konusu</label>
              <select className="do-input w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-700 transition bg-white appearance-none">
                <option value="">Konu seçiniz</option>
                <option>Sipariş ve Teslimat Süreci</option>
                <option>Stok ve Ürün Bilgisi</option>
                <option>B2B Portal Erişimi ve Yetkilendirme</option>
                <option>Bayi / Distribütör Başvurusu</option>
                <option>Kurumsal İletişim</option>
                <option>Diğer</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mesajınız</label>
              <textarea
                rows={4}
                placeholder="Talebinizi ve konuyu kısaca açıklayınız..."
                className="do-input w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 transition resize-none"
                value={form.mesaj}
                onChange={e => setForm(f => ({ ...f, mesaj: e.target.value }))}
              />
            </div>

            <button className="mt-6 w-full bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 group shadow-[0_4px_16px_rgba(27,58,143,0.2)]">
              Talep Gönderin <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <p className="text-center text-[12px] text-slate-400 mt-4">Verileriniz yalnızca talebinizi karşılamak amacıyla kullanılır.</p>
          </div>
        </div>
      </section>

      <footer className="bg-[#060810] text-white py-14 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <img src="/images/delta-oto-logo.png" alt="Delta Oto" className="h-12 mx-auto mb-5 brightness-0 invert opacity-70" />
          <p className="text-gray-500 text-sm">© 2026 Delta Oto A.Ş. — Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from "react";
import { MapPin, Phone, Mail, Globe, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

export function IletisimPage() {
  const [form, setForm] = useState({ ad: "", firma: "", telefon: "", email: "", konu: "", mesaj: "" });

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
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

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-28">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kurumsal İletişim · Ümraniye, İstanbul</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-5">
            <span className="do-hero-line">BİZE</span><br />
            <span className="text-[#7d9bea]">ULAŞIN</span>
          </h1>
          <p className="text-[17px] text-gray-300 max-w-xl font-light leading-[1.8]">
            Ürün ve stok sorguları, sipariş talepleri, B2B portal erişimi veya genel kurumsal iletişim için aşağıdaki kanalları kullanabilirsiniz.
          </p>
        </div>
      </section>

      {/* İLETİŞİM + FORM — light */}
      <section className="bg-[#f8fafc] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12 items-start">

          <div className="lg:col-span-2 space-y-4">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Merkez Ofis</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">İletişim Kanalları</h2>
            </div>
            {[
              { Icon: MapPin, label: "Adres", lines: ["Barbaros Cd. Beyit Sk. No:17,", "Yukarı Dudullu - Ümraniye / İstanbul"] },
              { Icon: Phone, label: "Telefon", lines: ["0216 526 64 64 / 0216 526 33 44", "Pazartesi–Cuma, 08:30–18:00"] },
              { Icon: Mail, label: "Kurumsal E-posta", lines: ["info@deltaoto.com", "b2b@deltaoto.com"] },
              { Icon: Globe, label: "Dijital Kanallar", lines: ["www.deltaoto.com.tr", "b2b.deltaoto.com.tr (B2B Portal)"] },
            ].map(({ Icon, label, lines }) => (
              <div key={label} className="flex gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-[#1B3A8F]/30 transition-colors">
                <div className="shrink-0 w-10 h-10 bg-[#1B3A8F]/[0.08] rounded-lg flex items-center justify-center">
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
              <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=70" alt="İstanbul harita" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-[13px] font-semibold text-slate-700 shadow-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1B3A8F]" /> Ümraniye, İstanbul
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Talep Formu</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Bize Yazın</h2>
              <p className="text-slate-500 mt-2 text-[14px]">Talebiniz en kısa sürede ilgili birime yönlendirilecektir.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { id: "ad",      label: "Ad Soyad",        ph: "Adınız ve soyadınız"    },
                { id: "firma",   label: "Firma Ünvanı",     ph: "Firma adı"              },
                { id: "telefon", label: "Telefon",          ph: "+90 5XX XXX XX XX"      },
                { id: "email",   label: "Kurumsal E-posta", ph: "ornek@firma.com.tr"     },
              ].map(({ id, label, ph }) => (
                <div key={id}>
                  <label className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
                  <input
                    type="text"
                    placeholder={ph}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition"
                    value={(form as Record<string, string>)[id]}
                    onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5">
              <label className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Talep Konusu</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-700 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition bg-white"
                value={form.konu}
                onChange={e => setForm(f => ({ ...f, konu: e.target.value }))}
              >
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
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition resize-none"
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

      <SiteFooter />
    </div>
  );
}

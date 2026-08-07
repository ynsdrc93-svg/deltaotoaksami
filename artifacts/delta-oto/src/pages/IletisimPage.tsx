import React, { useState } from "react";
import { MapPin, Phone, Mail, Globe, Clock, ChevronRight, Users, Package, MonitorSmartphone } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const DEPT_CONTACTS = [
  {
    icon: Package,
    dept: "Satış & Sipariş",
    lines: ["0216 526 64 64"],
    info: "Ürün sorguları, sipariş ve fiyat bilgisi",
    hours: "Pazartesi – Cumartesi, 08:30 – 18:00",
    email: "satis@deltaoto.com",
  },
  {
    icon: MonitorSmartphone,
    dept: "B2B Portal Desteği",
    lines: ["0216 526 33 44"],
    info: "Portal erişimi, kullanıcı yetkilendirme, teknik destek",
    hours: "Pazartesi – Cuma, 09:00 – 17:30",
    email: "b2b@deltaoto.com",
  },
  {
    icon: Users,
    dept: "İnsan Kaynakları",
    lines: [],
    info: "Kariyer başvuruları ve staj talepleri",
    hours: "Pazartesi – Cuma, 09:00 – 17:00",
    email: "ik@deltaoto.com",
  },
  {
    icon: Globe,
    dept: "İhracat & Genel Kurumsal",
    lines: [],
    info: "Yurt dışı iş birlikleri ve kurumsal iletişim",
    hours: "Pazartesi – Cuma, 08:30 – 17:30",
    email: "info@deltaoto.com",
  },
];

const LOCATIONS = [
  {
    name: "Merkez Ofis & Depo",
    city: "Ümraniye, İstanbul",
    address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu — Ümraniye / İstanbul",
    phone: "0216 526 64 64 / 0216 526 33 44",
    type: "Merkez",
  },
  {
    name: "Gebze Deposu",
    city: "Gebze, Kocaeli",
    address: "Barış, 1804. Sk. No:4, 41400 Gebze / Kocaeli",
    phone: null,
    type: "Kocaeli",
  },
  {
    name: "Opar Ege Bölge Operasyonu",
    city: "Kemalpaşa, İzmir",
    address: "Kemalpaşa Kızılüzüm Kırovası Kümeevleri No: 12/1, Kemalpaşa / İzmir",
    phone: null,
    type: "Ege Bölge",
  },
];

export function IletisimPage() {
  const [form, setForm] = useState({ ad: "", firma: "", telefon: "", email: "", konu: "", mesaj: "" });

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[480px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="/images/delta-oto-depot.jpg"
            alt=""
            className="w-full h-full object-cover opacity-25"
            style={{ objectPosition: "center 65%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/85 to-[#0e1016]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-24">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kurumsal İletişim · Ümraniye, İstanbul</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-5">
            <span className="do-hero-line">BİZE</span><br />
            <span className="do-hero-accent">ULAŞIN</span>
          </h1>
          <p className="text-[17px] text-gray-300 max-w-xl font-light leading-[1.8]">
            Ürün sorguları, B2B portal erişimi veya kurumsal iletişim için size özel kanaldan ulaşın.
          </p>
        </div>
      </section>

      {/* DEPARTMAN KİŞİ BİLGİLERİ — light */}
      <section className="bg-[#f8fafc] py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Departman İletişim</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Doğru Birime Ulaşın</h2>
            <p className="text-slate-500 mt-3 text-[15px]">Her talep türü için ilgili departman doğrudan burada.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DEPT_CONTACTS.map(({ icon: Icon, dept, lines, info, hours, email }) => (
              <div key={dept} className="do-entity-card bg-white border border-slate-200 rounded-xl p-6 hover:border-[#1B3A8F]/30 hover:shadow-md flex flex-col">
                <div className="w-10 h-10 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#1B3A8F]" />
                </div>
                <h3 className="text-[14px] font-bold text-slate-900 mb-2 leading-snug">{dept}</h3>
                <p className="text-slate-400 text-[12.5px] leading-relaxed mb-3 flex-1">{info}</p>
                <div className="border-t border-slate-100 pt-3 space-y-1.5">
                  {lines.map(l => (
                    <div key={l} className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#1B3A8F] shrink-0" />
                      <span className="text-[13px] font-semibold text-slate-800">{l}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#1B3A8F] shrink-0" />
                    <a href={`mailto:${email}`} className="text-[13px] text-[#1B3A8F] hover:underline font-medium">{email}</a>
                  </div>
                  <div className="flex items-start gap-2 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-[11.5px] text-slate-400 leading-snug">{hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOKASYONLAR — navy */}
      <section className="bg-[#1B3A8F] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">Operasyon Merkezlerimiz</span>
            <h2 className="text-3xl font-black tracking-tight">Bizi Nerede Bulabilirsiniz</h2>
            <p className="text-white/55 mt-3 text-[15px]">Ümraniye, Gebze ve İzmir'deki üç merkezimizden Türkiye'nin tamamına hizmet veriyoruz.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {LOCATIONS.map((loc) => (
              <div key={loc.name} className="do-entity-card bg-white/[0.08] border border-white/[0.12] rounded-xl p-7 hover:bg-white/[0.14]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#7d9bea]">{loc.type}</span>
                    <h3 className="text-[16px] font-bold mt-1">{loc.name}</h3>
                    <p className="text-white/50 text-[12px] mt-0.5">{loc.city}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#7d9bea]" />
                  </div>
                </div>
                <p className="text-white/65 text-[13px] leading-relaxed mb-3">{loc.address}</p>
                {loc.phone && (
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-3.5 h-3.5 text-[#7d9bea] shrink-0" />
                    <span className="text-[13px] text-white/80">{loc.phone}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM — light */}
      <section className="bg-[#f8fafc] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12 items-start">

          <div className="lg:col-span-2 space-y-4">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Merkez Adres</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Genel İletişim</h2>
            </div>
            {[
              { Icon: MapPin, label: "Merkez Ofis",     lines: ["Barbaros Cd. Beyit Sk. No:17,", "Yukarı Dudullu — Ümraniye / İstanbul"] },
              { Icon: Phone,  label: "Santral",          lines: ["0216 526 64 64 / 0216 526 33 44", "Pazartesi – Cumartesi, 08:30 – 18:00"] },
              { Icon: Mail,   label: "Kurumsal E-posta", lines: ["info@deltaoto.com", "b2b@deltaoto.com"] },
              { Icon: Globe,  label: "Dijital Kanallar", lines: ["www.deltaoto.com.tr", "b2b.deltaoto.com.tr (B2B Portal)"] },
            ].map(({ Icon, label, lines }) => (
              <div key={label} className="do-entity-card flex gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-[#1B3A8F]/30">
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
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Talep Formu</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Bize Yazın</h2>
              <p className="text-slate-500 mt-2 text-[14px]">Talebiniz en kısa sürede ilgili birime yönlendirilecektir.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { id: "ad",      label: "Ad Soyad",        ph: "Adınız ve soyadınız" },
                { id: "firma",   label: "Firma Ünvanı",     ph: "Firma adı" },
                { id: "telefon", label: "Telefon",          ph: "+90 5XX XXX XX XX" },
                { id: "email",   label: "Kurumsal E-posta", ph: "ornek@firma.com.tr" },
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
                <option>İhracat Talebi</option>
                <option>Kurumsal İletişim</option>
                <option>İnsan Kaynakları & Kariyer</option>
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

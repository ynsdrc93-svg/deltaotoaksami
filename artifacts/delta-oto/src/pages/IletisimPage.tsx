import React, { useState } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Globe, Clock, ChevronRight, Users, Package, MonitorSmartphone, Truck } from "lucide-react";
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

function telHref(raw: string): string {
  return `tel:${raw.split("/")[0].trim().replace(/[^\d+]/g, "")}`;
}

export function IletisimPage() {
  const [form, setForm] = useState({ ad: "", firma: "", telefon: "", email: "", konu: "", mesaj: "" });

  const [satisDept, b2bDept, ...secondaryDepts] = DEPT_CONTACTS;
  const SatisIcon = satisDept.icon;
  const B2bIcon = b2bDept.icon;

  const [merkez, ...satellites] = LOCATIONS;
  const merkezPhone = merkez.phone ?? "";

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO (dark, split panel) */}
      <section className="relative overflow-hidden bg-[#0e1016] text-white">
        <div className="flex flex-col lg:flex-row lg:min-h-[600px]">

          {/* LEFT — solid ink panel, oversized "3" mark, real content */}
          <div className="relative lg:w-[56%] flex items-center px-6 sm:px-10 lg:pl-14 xl:pl-20 lg:pr-10 xl:pr-14 py-20 lg:py-24 overflow-hidden">
            <div
              aria-hidden
              className="absolute -left-4 -bottom-14 sm:-bottom-20 lg:-bottom-24 text-[220px] sm:text-[320px] lg:text-[380px] font-black leading-none text-white/[0.045] select-none pointer-events-none tracking-tighter"
            >
              3
            </div>
            <div className="do-grid-bg absolute inset-0 opacity-50" />
            <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-[2px] bg-[#4d74d6]" />
                <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Kurumsal İletişim</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[64px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
                <span className="do-hero-line">BİZE</span><br />
                <span className="do-hero-accent">ULAŞIN</span>
              </h1>

              <p className="text-[16px] sm:text-[17px] text-gray-300 max-w-md font-light leading-[1.8] mb-10">
                Ürün sorguları, B2B portal erişimi veya kurumsal iletişim için doğru kanaldan ekiplerimize ulaşın.
              </p>

              <div className="flex flex-wrap gap-4 items-center mb-11">
                <a
                  href={telHref(satisDept.lines[0])}
                  className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-8 py-4 rounded-md text-base transition-all duration-200 flex items-center gap-2.5 group shadow-[0_0_32px_rgba(27,58,143,0.3)] hover:shadow-[0_0_48px_rgba(27,58,143,0.45)]"
                >
                  <Phone className="w-4 h-4" />
                  Hemen Arayın
                </a>
                <a
                  href="#talep-formu"
                  className="text-gray-200 hover:text-white text-base font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-8 py-4 rounded-md transition-all duration-200 group"
                >
                  Formu Doldurun
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { Icon: Clock, text: "Pazartesi – Cumartesi Açık" },
                  { Icon: Globe, text: "81 İlde Sevkiyat Ağı" },
                  { Icon: Truck, text: "Aynı Gün Sevkiyat · 14:00" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="do-stat-tag bg-white/[0.06] border border-white/15">
                    <span className="flex items-center gap-2 text-gray-200 text-[12.5px] font-medium px-4 py-2.5">
                      <Icon className="w-4 h-4 text-[#7d9bea]" />
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — full-strength photography, not a dimmed backdrop */}
          <div className="relative lg:w-[44%] min-h-[320px] sm:min-h-[420px] lg:min-h-0 overflow-hidden">
            <img
              src="/images/delta-oto-depot.jpg"
              alt="Delta Oto Ümraniye lojistik merkezi ve yükleme rıhtımı"
              className="w-full h-full object-cover"
              style={{ objectPosition: "30% 58%" }}
            />
            <div className="absolute inset-y-0 left-0 w-16 lg:w-28 bg-gradient-to-r from-[#0e1016] to-transparent hidden lg:block" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0e1016] to-transparent lg:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e1016]/80 to-transparent" />

            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <div className="do-stat-tag bg-[#1B3A8F] shadow-2xl">
                <span className="flex items-baseline gap-2.5 px-5 py-3.5">
                  <span className="text-3xl font-black text-white leading-none tabular-nums">3</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-100 max-w-[7rem] leading-tight">Operasyon Merkezi</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMAN İLETİŞİM — light, tiered by channel weight */}
      <section className="bg-[#f8fafc] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Departman İletişim</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Doğru Birime Ulaşın</h2>
            <p className="text-slate-500 mt-3 text-[15px]">Sipariş ve portal talepleri için telefon hatlarımız açık; diğer konularda ilgili birime doğrudan yazabilirsiniz.</p>
          </div>

          {/* Tier 1 — primary phone channels, unequal weight */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
            <div className="do-entity-card lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 hover:border-[#1B3A8F]/30 hover:shadow-lg">
              <div className="flex items-start justify-between gap-4 mb-7">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center shrink-0">
                    <SatisIcon className="w-5 h-5 text-[#1B3A8F]" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-slate-900">{satisDept.dept}</h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed mt-1 max-w-[22rem]">{satisDept.info}</p>
                  </div>
                </div>
                <span className="shrink-0 text-[10.5px] font-bold uppercase tracking-widest text-[#1B3A8F] bg-[#1B3A8F]/[0.08] rounded-full px-3 py-1.5 hidden sm:inline-block">Öncelikli Hat</span>
              </div>
              <a href={telHref(satisDept.lines[0])} className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit">
                <Phone className="w-6 h-6 text-[#1B3A8F] shrink-0" />
                <span className="do-metric-num text-4xl md:text-[44px] font-black tracking-tight tabular-nums">{satisDept.lines[0]}</span>
              </a>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 pt-5 border-t border-slate-100">
                <a href={`mailto:${satisDept.email}`} className="text-[13px] text-[#1B3A8F] hover:underline font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> {satisDept.email}
                </a>
                <span className="text-[12px] text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {satisDept.hours}
                </span>
              </div>
            </div>

            <div className="do-entity-card lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-7 hover:border-[#1B3A8F]/30 hover:shadow-lg flex flex-col">
              <div className="w-10 h-10 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center mb-4">
                <B2bIcon className="w-5 h-5 text-[#1B3A8F]" />
              </div>
              <h3 className="text-[15px] font-bold text-slate-900">{b2bDept.dept}</h3>
              <p className="text-slate-500 text-[12.5px] leading-relaxed mt-1.5 flex-1">{b2bDept.info}</p>
              <a href={telHref(b2bDept.lines[0])} className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 hover:text-[#1B3A8F] transition-colors w-fit">
                <Phone className="w-4 h-4 text-[#1B3A8F] shrink-0" />
                <span className="text-[19px] font-black text-slate-900 tracking-tight tabular-nums">{b2bDept.lines[0]}</span>
              </a>
              <div className="flex items-center justify-between mt-3 flex-wrap gap-x-4 gap-y-1">
                <a href={`mailto:${b2bDept.email}`} className="text-[12.5px] text-[#1B3A8F] hover:underline font-medium">{b2bDept.email}</a>
                <span className="text-[11px] text-slate-400">{b2bDept.hours}</span>
              </div>
            </div>
          </div>

          {/* Tier 2 — secondary, email-first channels, condensed strip */}
          <div className="do-entity-card grid sm:grid-cols-2 bg-white border border-slate-200 rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-slate-100 hover:shadow-md">
            {secondaryDepts.map(({ icon: Icon, dept, info, hours, email }) => (
              <div key={dept} className="flex items-center gap-4 px-6 py-5">
                <div className="w-9 h-9 bg-[#1B3A8F]/[0.08] rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#1B3A8F]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 className="text-[13.5px] font-bold text-slate-900">{dept}</h3>
                    <span className="text-[11px] text-slate-400">· {hours}</span>
                  </div>
                  <p className="text-slate-400 text-[12px] mt-0.5">{info}</p>
                  <a href={`mailto:${email}`} className="text-[12.5px] text-[#1B3A8F] hover:underline font-medium">{email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOKASYONLAR — navy, flagship + satellite strip */}
      <section className="relative bg-[#1B3A8F] py-20 text-white overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-25" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">Operasyon Merkezlerimiz</span>
              <h2 className="text-3xl font-black tracking-tight">Bizi Nerede Bulabilirsiniz</h2>
              <p className="text-white/55 mt-3 text-[15px]">Ümraniye merkezimiz, Gebze deposu ve Ege Bölge operasyonumuzla Türkiye'nin tamamına hizmet veriyoruz.</p>
            </div>
            <div className="do-stat-tag bg-white/[0.08] border border-white/15 shrink-0">
              <span className="flex items-baseline gap-2 px-5 py-3">
                <span className="text-2xl font-black text-white leading-none tabular-nums">3</span>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-blue-100 max-w-[6rem] leading-tight">Şehirde Aktif Nokta</span>
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-5">
            {/* Flagship — Merkez, real photography */}
            <div className="do-entity-card group lg:col-span-3 relative rounded-2xl overflow-hidden min-h-[380px]">
              <img
                src="/images/delta-oto-ops.png"
                alt="Delta Oto merkez operasyon ve depo içi"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0e1016] via-[#0e1016]/55 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-7 sm:p-8">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#7d9bea] mb-2">{merkez.type} · {merkez.city}</span>
                <h3 className="text-2xl font-black mb-2">{merkez.name}</h3>
                <p className="text-white/70 text-[13.5px] leading-relaxed max-w-md mb-4">{merkez.address}</p>
                <a href={telHref(merkezPhone)} className="inline-flex items-center gap-2 text-[15px] font-bold text-white hover:text-[#7d9bea] transition-colors w-fit">
                  <Phone className="w-4 h-4 text-[#7d9bea]" />
                  {merkezPhone}
                </a>
              </div>
            </div>

            {/* Satellite strip — Gebze + İzmir, condensed */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {satellites.map((loc) => (
                <div key={loc.name} className="do-entity-card flex-1 bg-white/[0.07] border border-white/[0.12] rounded-2xl p-6 flex flex-col justify-center hover:bg-white/[0.11]">
                  <div className="flex items-start justify-between mb-2.5">
                    <span className="text-[10.5px] font-bold uppercase tracking-widest text-[#7d9bea]">{loc.type}</span>
                    <MapPin className="w-4 h-4 text-white/40 shrink-0" />
                  </div>
                  <h3 className="text-[14.5px] font-bold">{loc.name}</h3>
                  <p className="text-white/55 text-[12.5px] leading-relaxed mt-1.5">{loc.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GENEL İLETİŞİM + FORM — light */}
      <section id="talep-formu" className="bg-[#f8fafc] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-8 items-stretch">

          <div className="lg:col-span-2 relative bg-[#0e1016] text-white rounded-2xl overflow-hidden p-8 sm:p-10 flex flex-col">
            <div className="do-grid-bg absolute inset-0 opacity-40" />
            <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />
            <div className="relative z-10 flex flex-col h-full">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Dijital Kanallar</span>
              <h2 className="text-2xl font-black mt-2 mb-7 leading-tight">Çevrimiçi de Yanınızdayız</h2>

              <div className="space-y-5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-1.5">Kurumsal Web</div>
                  <div className="text-[15px] font-semibold text-white">www.deltaoto.com.tr</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-1.5">B2B Portal</div>
                  <div className="text-[15px] font-semibold text-white">b2b.deltaoto.com.tr</div>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10">
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-1.5">Genel Talepler</div>
                <a href="mailto:info@deltaoto.com" className="text-[16px] font-bold text-white hover:text-[#7d9bea] transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#7d9bea]" />
                  info@deltaoto.com
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10">
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

      {/* KEŞFEDİN — navy, closes section rhythm before footer */}
      <section className="relative bg-[#1B3A8F] py-14 md:py-16 text-white overflow-hidden">
        <div className="absolute inset-0 do-grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Delta Oto'yu Keşfedin</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-2">Aradığınızı Bulamadınız mı?</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Hakkımızda", href: "/hakkimizda" },
              { label: "Tedarikçilerimiz", href: "/tedarikciler" },
              { label: "Operasyon ve Lojistik", href: "/operasyon" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 hover:border-white/30 text-white font-semibold px-6 py-3.5 rounded-md text-[14px] transition-all duration-200 flex items-center gap-2 group"
              >
                {label}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

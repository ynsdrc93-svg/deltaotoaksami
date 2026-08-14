import React, { useState } from "react";
import { MapPin, Phone, Mail, Globe, Clock, ChevronRight, ArrowRight, Users, Package, MonitorSmartphone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { RepresentativeFinderModal } from "@/components/shared/RepresentativeFinderModal";
import { submitContactForm } from "@workspace/api-client-react";

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

const EMPTY_FORM = { ad: "", firma: "", telefon: "", email: "", konu: "", mesaj: "", website: "" };

export function IletisimPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [repModalOpen, setRepModalOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitContactForm(form);
      setForm(EMPTY_FORM);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-g4kNo754b7A?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-30"
            style={{ objectPosition: "center 60%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-16 lg:py-24">
          <div className="flex items-center gap-3 mb-5 lg:mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">İletişim Kanallarımız · Ümraniye, İstanbul</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-4 lg:mb-5">
            <span className="do-hero-line">BİZE</span><br />
            <span className="text-[#7d9bea]">ULAŞIN</span>
          </h1>
          <p className="text-[17px] text-gray-300 max-w-xl font-light leading-[1.8] mb-6 lg:mb-9">
            Ürün sorguları, B2B portal erişimi veya kurumsal iletişim için size özel kanaldan ulaşın.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setRepModalOpen(true)}
              className="bg-[#1B3A8F] hover:bg-[#2547B5] active:scale-[0.98] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-md text-[14px] sm:text-base transition-all duration-200 flex items-center gap-2 sm:gap-2.5 shadow-[0_0_32px_rgba(27,58,143,0.3)] hover:shadow-[0_0_48px_rgba(27,58,143,0.45)]"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              Bölge Temsilcinizi Bulun
            </button>
            <a
              href="#iletisim-formu"
              className="text-gray-200 hover:text-white active:scale-[0.98] text-[14px] sm:text-base font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-6 sm:px-8 py-3.5 sm:py-4 rounded-md transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              İletişim Formu
            </a>
            <a
              href="https://b2b.parcabul.com.tr/login.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-gray-200 hover:text-white active:scale-[0.98] text-[14px] sm:text-base font-medium flex items-center gap-2 border border-white/15 hover:border-white/30 px-6 sm:px-8 py-3.5 sm:py-4 rounded-md transition-all duration-200"
            >
              B2B Portal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* NASIL YARDIMCI OLABİLİRİZ — iki net yol: genel iletişim / temsilci bul.
          Eski ince "Temsilcilerimiz sayfasına gidin" banner'ının yerine geçti —
          artık ayrı bir sayfaya değil, aynı sayfa içindeki modalı açıyor. */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Nasıl Yardımcı Olabiliriz?</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">İki Hızlı Yol</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <a href="#genel-iletisim" className="do-card group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#1B3A8F]/[0.08] flex items-center justify-center mb-5 group-hover:bg-[#1B3A8F] transition-colors">
                <Users className="w-6 h-6 text-[#1B3A8F] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Genel İletişim</h3>
              <p className="text-slate-500 text-[13.5px] leading-relaxed mb-5 flex-1">Satış, B2B portal, İK ve ihracat ekiplerimize doğrudan ulaşın.</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1B3A8F]">
                Departmanları görün <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
            <button type="button" onClick={() => setRepModalOpen(true)} className="do-card group bg-[#1B3A8F] rounded-2xl p-8 flex flex-col text-left">
              <div className="w-12 h-12 rounded-xl bg-white/[0.12] flex items-center justify-center mb-5 group-hover:bg-white transition-colors">
                <MapPin className="w-6 h-6 text-white group-hover:text-[#1B3A8F] transition-colors" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Bölge Temsilcinizi Bulun</h3>
              <p className="text-white/60 text-[13.5px] leading-relaxed mb-5 flex-1">81 il, 7 bölge — haritadan ilinizi seçin, size özel temsilciyi görün.</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white">
                Haritayı Açın <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* DEPARTMAN KİŞİ BİLGİLERİ — light */}
      <section id="genel-iletisim" className="scroll-mt-24 bg-[#f8fafc] py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Departman İletişim</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Doğru Birime Ulaşın</h2>
            <p className="text-slate-500 mt-3 text-[15px]">Her talep türü için ilgili departman doğrudan burada.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DEPT_CONTACTS.map(({ icon: Icon, dept, lines, info, hours, email }) => (
              <div key={dept} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-[#1B3A8F]/30 hover:shadow-md transition-all flex flex-col">
                <div className="w-10 h-10 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#1B3A8F]" />
                </div>
                <h3 className="text-[14px] font-bold text-slate-900 mb-2 leading-snug">{dept}</h3>
                <p className="text-slate-500 text-[12.5px] leading-relaxed mb-3 flex-1">{info}</p>
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
                    <span className="text-[11.5px] text-slate-500 leading-snug">{hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + ADRES — light. Lokasyonlar'dan önceye taşındı: footer'dan hemen önceki bölüm
          proje kuralı gereği navy olmalı, bu da yalnızca burada zaten navy olan Lokasyonlar'ı
          en sona almakla (bkz. CLAUDE.md §9.2) en az müdahaleyle sağlanıyor. */}
      <section id="iletisim-formu" className="scroll-mt-24 bg-[#f8fafc] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12 items-start">

          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Merkez Adres</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Genel İletişim</h2>
            </div>
            {/* Tek, yoğun özet kart — Departman İletişim'deki ikon-kart ızgarasının bir
                tekrarı olmasın diye satır bölmeli tek kart olarak tasarlandı. Doğal
                (zorlanmamış) yükseklik: içerik ne kadar yer kaplıyorsa o kadar —
                önceki versiyon sağdaki form kartıyla eşit yükseklik için satırlar
                arasına yapay boşluk ekliyordu, dağınık görünüyordu. */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
              {[
                { Icon: MapPin, label: "Merkez Ofis",     lines: ["Barbaros Cd. Beyit Sk. No:17,", "Yukarı Dudullu — Ümraniye / İstanbul"] },
                { Icon: Phone,  label: "Santral",          lines: ["0216 526 64 64 / 0216 526 33 44", "Satış: Pzt–Cmt 08:30–18:00 · B2B: Pzt–Cuma 09:00–17:30"] },
                { Icon: Mail,   label: "Kurumsal E-posta", lines: ["info@deltaoto.com", "b2b@deltaoto.com"] },
                { Icon: Globe,  label: "Dijital Kanallar", lines: ["www.deltaoto.com.tr", { text: "b2b.parcabul.com.tr (B2B Portal)", href: "https://b2b.parcabul.com.tr/login.aspx" }] },
              ].map(({ Icon, label, lines }) => (
                <div key={label} className="flex items-center gap-3.5 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="shrink-0 w-8 h-8 bg-[#1B3A8F]/[0.08] rounded-xl flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#1B3A8F]" />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">{label}</div>
                    {lines.map((l, i) => {
                      const text = typeof l === "string" ? l : l.text;
                      const href = typeof l === "string" ? undefined : l.href;
                      const cls = `text-[12.5px] leading-snug ${i === 0 ? "text-slate-900 font-semibold" : "text-slate-500"}`;
                      return href ? (
                        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:text-[#1B3A8F] hover:underline transition-colors`}>{text}</a>
                      ) : (
                        <div key={i} className={cls}>{text}</div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Talep Formu</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Bize Yazın</h2>
              <p className="text-slate-500 mt-2 text-[14px]">Talebiniz en kısa sürede ilgili birime yönlendirilecektir.</p>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Honeypot — gerçek kullanıcılar görmez/doldurmaz; ekran okuyucudan da
                  aria-hidden ile tamamen gizli. Doluysa backend isteği bot kabul eder.
                  sr-only negatif offset kullanmadığı için sayfa genişliğini etkilemez. */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Web siteniz</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  maxLength={200}
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { id: "ad",      label: "Ad Soyad",        ph: "Adınız ve soyadınız", type: "text", required: true, maxLength: 100 },
                  { id: "firma",   label: "Firma Ünvanı",     ph: "Firma adı", type: "text", required: false, maxLength: 150 },
                  { id: "telefon", label: "Telefon",          ph: "+90 5XX XXX XX XX", type: "tel", required: false, maxLength: 40 },
                  { id: "email",   label: "Kurumsal E-posta", ph: "ornek@firma.com.tr", type: "email", required: true, maxLength: 254 },
                ].map(({ id, label, ph, type, required, maxLength }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
                    <input
                      id={id}
                      type={type}
                      required={required}
                      maxLength={maxLength}
                      placeholder={ph}
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition"
                      value={(form as Record<string, string>)[id]}
                      onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <label htmlFor="konu" className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Talep Konusu</label>
                <select
                  id="konu"
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
                <label htmlFor="mesaj" className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mesajınız</label>
                <textarea
                  id="mesaj"
                  rows={4}
                  maxLength={5000}
                  placeholder="Talebinizi ve konuyu kısaca açıklayınız..."
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A8F] focus:ring-1 focus:ring-[#1B3A8F]/20 transition resize-none"
                  value={form.mesaj}
                  onChange={e => setForm(f => ({ ...f, mesaj: e.target.value }))}
                />
              </div>
              {status === "success" && (
                <div className="mt-6 flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[13.5px] font-medium rounded-lg px-4 py-3.5">
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  Talebiniz alındı, en kısa sürede size dönüş yapacağız.
                </div>
              )}
              {status === "error" && (
                <div className="mt-6 flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-[13.5px] font-medium rounded-lg px-4 py-3.5">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                  Talebiniz gönderilemedi. Lütfen tekrar deneyin ya da bizi doğrudan arayın.
                </div>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-6 w-full bg-[#1B3A8F] hover:bg-[#2547B5] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 group shadow-[0_4px_16px_rgba(27,58,143,0.2)]"
              >
                {status === "submitting" ? (
                  <>Gönderiliyor... <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>Talep Gönderin <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                )}
              </button>
              <p className="text-center text-[12px] text-slate-400 mt-4">Verileriniz yalnızca talebinizi karşılamak amacıyla kullanılır.</p>
            </form>
          </div>
        </div>
      </section>

      {/* LOKASYONLAR — navy. Footer'dan hemen önceki bölüm olduğu için proje kuralı
          gereği navy (#1B3A8F) kalıyor; sırası Form+Adres ile değiştirildi. */}
      <section className="bg-[#1B3A8F] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea] block mb-3">Operasyon Merkezlerimiz</span>
            <h2 className="text-3xl font-black tracking-tight">Bizi Nerede Bulabilirsiniz</h2>
            <p className="text-white/55 mt-3 text-[15px]">Ümraniye, Gebze ve İzmir'deki üç merkezimizden Türkiye'nin tamamına hizmet veriyoruz.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {LOCATIONS.map((loc) => {
              const isPrimary = Boolean(loc.phone);
              return (
                <div
                  key={loc.name}
                  className={`do-card bg-white/[0.08] border rounded-xl p-7 ${isPrimary ? "border-[#7d9bea]/40" : "border-white/[0.12]"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#7d9bea]">{loc.type}</span>
                      <h3 className="text-[16px] font-bold mt-1">{loc.name}</h3>
                      <p className="text-white/70 text-[12px] mt-0.5">{loc.city}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0 mt-1">
                      {isPrimary && (
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#0e1016] bg-[#7d9bea] rounded-full px-2.5 py-1">
                          Santral Hattı
                        </span>
                      )}
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
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />

      <RepresentativeFinderModal open={repModalOpen} onClose={() => setRepModalOpen(false)} />
    </div>
  );
}

import React from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

const CATEGORIES = [
  { name: "Fren & Güvenlik Sistemleri", count: "45+ Marka", brands: ["Brembo", "ATE", "Bosch", "TRW", "Ferodo"] },
  { name: "Süspansiyon & Direksiyon", count: "38+ Marka", brands: ["Monroe", "Bilstein", "KYB", "Sachs", "Lemförder"] },
  { name: "Motor, Ateşleme & Elektrik", count: "52+ Marka", brands: ["Bosch", "Denso", "NGK", "Gates", "INA"] },
  { name: "Egzoz & Emisyon Yönetimi", count: "22+ Marka", brands: ["Walker", "Bosal", "Eberspächer", "Vegaz", "Klarius"] },
  { name: "Filtre & Periyodik Bakım", count: "30+ Marka", brands: ["Mann+Hummel", "Mahle", "Hengst", "Sogefi", "UFI"] },
  { name: "Kaporta & Aydınlatma", count: "35+ Marka", brands: ["Valeo", "Hella", "Osram", "Magneti Marelli", "Depo"] },
];

const ADVANTAGES = [
  { title: "Kapsamlı Ürün Gamı", desc: "250'den fazla markanın 50.000'i aşkın SKU'sundan oluşan portföy; tek tedarikçi ilişkisiyle uçtan uca karşılanır." },
  { title: "Groupauto Tedarik Ayrıcalığı", desc: "Groupauto International üyeliği, küresel üretici anlaşmaları ve hacim avantajlarına erişim imkânı sunar." },
  { title: "OEM Standart Kalite Güvencesi", desc: "Yalnızca orijinal ve OEM eşdeğeri ürün kategorilerinde faaliyet gösteriyoruz. Kayıt dışı ürün portföyde yer almaz." },
  { title: "Dinamik Katalog Yönetimi", desc: "Yeni araç modelleri ve marka genişlemeleri portföye sürekli eklenir. Güncel stok ve fiyat bilgisine B2B portalı üzerinden anlık erişilebilir." },
];

export function TedarikciPage() {
  return (
    <div className="do-site bg-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-[560px] flex items-center text-white overflow-hidden bg-[#0e1016]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-25"
            style={{ objectPosition: "center 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1016] via-[#0e1016]/80 to-[#0e1016]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1016] via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 do-grid-bg opacity-40" />
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#1B3A8F] to-transparent opacity-60" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-28">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-[2px] bg-[#4d74d6]" />
            <span className="text-[#7d9bea] text-xs font-bold uppercase tracking-[0.3em]">Ürün Portföyü · 250+ Marka</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
            <span className="do-hero-line">KAPSAMLI PORTFÖY,</span><br />
            <span className="text-white">DERİN STOK,</span><br />
            <span className="text-[#7d9bea]">REKABET ÜSTÜNLÜĞÜ</span>
          </h1>
          <p className="text-[17px] text-gray-300 leading-[1.8] max-w-2xl mb-10 font-light">
            Binek ve hafif ticari araç kategorilerinde 250'den fazla marka ve 50.000'i aşkın SKU; tek tedarikçi ilişkisiyle eksiksiz karşılanır.
          </p>
          <div className="flex flex-wrap gap-5">
            {[["250+", "Aktif Marka", "Sürekli güncellenen portföy"], ["50.000+", "Aktif SKU", "Geniş stok derinliği"], ["OEM", "Kalite Standardı", "Kayıt dışı ürün yok"]].map(([n, l, d]) => (
              <div key={l} className="border border-white/15 rounded-xl px-6 py-4 bg-white/5">
                <div className="text-2xl font-black text-white">{n}</div>
                <div className="text-[12px] font-bold text-[#7d9bea] uppercase tracking-wide mt-0.5">{l}</div>
                <div className="text-[11px] text-gray-400 mt-1">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KATEGORİLER — light */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1B3A8F]">Ürün Kategorileri</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">Uçtan Uca Kategori Kapsamı</h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-[15px]">
              Her kategoride birden fazla marka alternatifi sunarak müşterilerimize tercih esnekliği ve maliyet optimizasyon imkânı sağlıyoruz.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="border border-slate-200 rounded-xl p-7 hover:border-[#1B3A8F]/40 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{cat.name}</h3>
                  <span className="shrink-0 ml-3 text-[11px] font-bold text-[#1B3A8F] bg-[#1B3A8F]/[0.08] border border-[#1B3A8F]/[0.15] px-2.5 py-1 rounded">{cat.count}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.brands.map(b => (
                    <span key={b} className="text-[12px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-medium">{b}</span>
                  ))}
                  <span className="text-[12px] text-[#1B3A8F] font-semibold px-2.5 py-1">+ daha fazla</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANTAJLAR — navy */}
      <section className="bg-[#1B3A8F] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7d9bea]">Tedarik Üstünlüğü</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">Neden Delta Oto?</h2>
            <p className="text-white/60 mt-3 max-w-xl text-[15px]">50 yılın birikimi ve Groupauto International üyeliğinin sağladığı avantajlar, müşterilerimizin pazar rekabetini doğrudan güçlendirir.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="bg-white/[0.08] border border-white/[0.12] rounded-xl p-8 hover:bg-white/[0.14] transition-colors">
                <h3 className="text-[15px] font-bold mb-3 leading-snug">{a.title}</h3>
                <p className="text-white/65 text-[14px] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="relative bg-[#0e1016] text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[#0e1016]/85" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Stok Sorgulama ve Sipariş için B2B Portal</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-[16px] font-light">Anlık stok durumu, fiyat listesi ve sipariş yönetimi; B2B portalımız üzerinden 7/24 erişilebilir.</p>
          <button className="bg-[#1B3A8F] hover:bg-[#2547B5] text-white font-semibold px-10 py-4 rounded-md transition-colors inline-flex items-center gap-2 shadow-[0_0_32px_rgba(27,58,143,0.3)]">
            Portala Giriş Yapın <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

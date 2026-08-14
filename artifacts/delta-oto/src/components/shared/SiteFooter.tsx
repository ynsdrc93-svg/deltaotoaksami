import React from "react";
import { Link } from "wouter";
import { MapPin, Mail, Phone, BadgeCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#0a0c11] pt-16 md:pt-20 pb-10 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">

          <div>
            <img
              src="/images/delta-oto-logo.png"
              alt="Delta Oto"
              className="h-14 do-logo-invert mb-8 opacity-85"
            />
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 text-gray-500 mt-0.5" />
                <span className="leading-relaxed">Barbaros Cd. Beyit Sk. No:17,<br />Yukarı Dudullu - Ümraniye / İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-gray-500" />
                <a href="mailto:info@deltaoto.com" className="hover:text-white transition-colors">info@deltaoto.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-gray-500" />
                <span>0216 526 64 64 / 0216 526 33 44</span>
              </li>
            </ul>
          </div>

          <div className="md:pl-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">Hızlı Bağlantılar</h4>
            <ul className="space-y-3.5">
              {[
                { label: "Hakkımızda",           href: "/hakkimizda"  },
                { label: "Tedarikçiler",          href: "/tedarikciler" },
                { label: "Operasyon ve Lojistik", href: "/operasyon"    },
                { label: "Kariyer",               href: "/kariyer"     },
                { label: "İletişim",              href: "/iletisim"    },
                { label: "Temsilcilerimiz",       href: "/temsilcilerimiz" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#1B3A8F] inline-block transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <h4 className="text-white text-xs font-bold tracking-[0.2em] mb-5">Private Label</h4>
              <img src="/images/spart-logo.png" alt="SPART Original Replacement" className="h-9 w-auto rounded-md opacity-90 hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-7">Sertifikalar & Üyelikler</h4>
            <div className="flex gap-4 mb-8">
              {["OSS\nDerneği", "ISO\n9001", "TS\nEN"].map(cert => (
                <div key={cert} className="w-20 h-16 border border-white/8 rounded-lg flex flex-col items-center justify-center gap-1 bg-white/3 hover:border-white/15 transition-colors">
                  <BadgeCheck className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[10px] text-gray-400 font-bold text-center whitespace-pre-line leading-tight">{cert}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Kalite standartlarımız ve sektörel üyeliklerimizle güvenilir iş ortaklığının güvencesini sunuyoruz.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>© 2026 Delta Oto. Tüm hakları saklıdır.</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1B3A8F] animate-pulse" />
            <span>Delta Oto · Kuruluş 1976</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

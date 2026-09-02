import type { Lang } from "@/lib/i18n";

// GÜNDEM — TEK doğruluk kaynağı. Eskiden LandingPage.tsx içinde
// content.agenda.card1/card2 olarak yaşayan iki gerçek gelişim burada
// merkezi bir listeye taşındı (Sitewide Editorial/Art Direction Turu, §5-10)
// — Anasayfa'daki önizleme VE Hakkımızda'daki tam Gündem bölümü artık AYNI
// veriyi okuyor, kopya içerik yok. Sıra ÖNEMLİDİR: dizi en-yeniden-en-eskiye
// sıralı tutulur (sort alanı eklemeden index-tabanlı "en son N öğe" seçimini
// basit tutmak için) — yeni bir gelişim eklenirken dizinin BAŞINA eklenir.
//
// sourceType "social" alanı, ileride onaylı bir LinkedIn/Instagram
// paylaşımı eklenmek istendiğinde kullanılmak üzere MİMARİ olarak
// destekleniyor (bkz. GundemCard bileşenindeki platform ikonu/harici link
// dalı) — şu an hiçbir öğe bu türde değil, uydurma bir sosyal medya
// gönderisi EKLENMEDİ. Yalnızca zaten doğrulanmış iki "article" öğesi var.
export interface AgendaItem {
  slug: string;
  date: Record<Lang, string>;
  category: Record<Lang, string>;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  body: Record<Lang, string[]>;
  sourceType: "article" | "social";
  sourceUrl?: string;
  platform?: "linkedin" | "instagram";
  featured: boolean;
}

export const AGENDA_ITEMS: AgendaItem[] = [
  {
    slug: "opar-ege-bolge-bayiligi",
    date: { tr: "Mayıs 2026", en: "May 2026" },
    category: { tr: "Yeni Operasyon", en: "New Operation" },
    title: {
      tr: "Opar Ege Bölge Bayiliği Operasyonu Başladı",
      en: "Opar Aegean Regional Dealership Operations Begin",
    },
    summary: {
      tr: "Mayıs 2026 itibarıyla Opar Ege Bölge Bayiliği operasyonunu devralarak Ege bölgesindeki tedarik ağımızı doğrudan genişlettik.",
      en: "As of May 2026, we took over the Opar Aegean Regional Dealership operation, directly expanding our supply network in the Aegean region.",
    },
    body: {
      tr: [
        "Mayıs 2026 itibarıyla Opar Ege Bölge Bayiliği operasyonunu devralarak Ege bölgesindeki tedarik ağımızı doğrudan genişlettik. Bu adımla birlikte bölgeye yönelik ürün çeşitliliğimiz ve teslimat kapasitemiz önemli ölçüde güçlendi.",
      ],
      en: [
        "As of May 2026, we took over the Opar Aegean Regional Dealership operation, directly expanding our supply network in the Aegean region. This step significantly strengthened our product range and delivery capacity for the region.",
      ],
    },
    sourceType: "article",
    featured: true,
  },
  {
    slug: "dubai-o2o-tedarikci-gunleri",
    date: { tr: "2025 · Dubai", en: "2025 · Dubai" },
    category: { tr: "Küresel Zirve", en: "Global Summit" },
    title: {
      tr: "Dubai O2O Tedarikçi Günleri 2025",
      en: "Dubai O2O Supplier Days 2025",
    },
    summary: {
      tr: "Dubai'de düzenlenen O2O Tedarikçi Günleri'nde Türkiye'yi ve Delta Oto'yu temsil ettik.",
      en: "We represented Türkiye and Delta Oto at the O2O Supplier Days held in Dubai.",
    },
    body: {
      tr: [
        "Dubai'de düzenlenen O2O Tedarikçi Günleri'nde Türkiye'yi ve Delta Oto'yu temsil ettik. 35'ten fazla global üreticiyle gerçekleştirilen görüşmelerde tedarik portföyümüzü ve piyasa trendlerini ele aldık.",
      ],
      en: [
        "We represented Türkiye and Delta Oto at the O2O Supplier Days held in Dubai. In meetings with more than 35 global manufacturers, we discussed our supply portfolio and market trends.",
      ],
    },
    sourceType: "article",
    featured: false,
  },
];

export function agendaItemBySlug(slug: string): AgendaItem | undefined {
  return AGENDA_ITEMS.find((item) => item.slug === slug);
}

/** Anasayfa önizlemesi: en yeni N öğe (dizi zaten en-yeniden-en-eskiye sıralı). */
export function latestAgendaItems(count: number): AgendaItem[] {
  return AGENDA_ITEMS.slice(0, count);
}

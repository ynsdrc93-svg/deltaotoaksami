/**
 * Id-anahtarlı içerik birleştirme (Turu 6 — CMS Hazırlık, kırılgan index
 * eşleşmesinin kaldırılması).
 *
 * ESKİ SORUN: yapısal kayıtlar (`*_META`: id/order/published/image…) ile dile
 * göre değişen metin dizisi `.filter().sort().map((m, i) => ({ ...m,
 * ...content.items[i] }))` ile birleştiriliyordu. `i`, FİLTRE + SIRALAMA
 * SONRASINDAKİ konumdur; metin dizisi ise orijinal (sabit) sıradadır. Bir kayıt
 * gizlenince ya da `order` değişince her kart bir başkasının metnini/görselini
 * alırdı — id'nin var olması tek başına bunu çözmüyordu, çünkü id birleştirmede
 * hiç kullanılmıyordu.
 *
 * YENİ MODEL: dile göre değişen metinler (`title/desc/label/alt…`) bir DİZİ
 * değil, kaydın kendi `id`'siyle anahtarlanan bir SÖZLÜKTÜR. Görsel, başlık,
 * açıklama, sıra ve yayın durumu hep aynı id'ye bağlı; bir kaydın hangi metni
 * aldığı ne konumundan, ne sırasından, ne de görünen yıl/değer metninden
 * etkilenir. Sözlükte karşılığı olmayan kayıt (ör. bir dilin çevirisi henüz
 * girilmemiş) YANLIŞ METİNLE GÖSTERİLMEZ — atlanır ve geliştirmede uyarılır.
 */
export interface MetaRecord {
  /** Kararlı kayıt kimliği — yıl/değer/başlık metninden BAĞIMSIZ. */
  id: string
  /** Görüntüleme sırası (dizideki konumdan bağımsız). */
  order: number
  /** false → kayıt silinmeden yayından kalkar. */
  published: boolean
}

export function joinById<M extends MetaRecord, C extends object>(
  meta: readonly M[],
  copy: Readonly<Record<string, C>>,
): (M & C)[] {
  return meta
    .filter((m) => m.published)
    .sort((a, b) => a.order - b.order)
    .flatMap((m) => {
      const c = copy[m.id]
      if (!c) {
        if (import.meta.env.DEV) console.warn(`[joinById] "${m.id}" için içerik yok — kayıt atlandı.`)
        return []
      }
      return [{ ...m, ...c }]
    })
}

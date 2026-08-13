// Temsilcilerimiz sayfasının TEK veri kaynağı. DOĞRULANMAMIŞ hiçbir temsilci
// kaydı (isim, telefon, e-posta, bölge, il ataması) buraya eklenmez — bkz.
// proje talimatı: legacy deltaoto.com/temsilcilerimiz bu ortamın ağ
// politikası nedeniyle erişilemiyor, bu yüzden gerçek/doğrulanmış veri
// sağlanana kadar dizi kasıtlı olarak boş kalır. Sayfa bileşenleri bu
// boşluğu "geliştirme hatası" gibi değil, haritada tıklanan her il için
// zarif bir genel iletişim fallback'ine sorunsuzca düşen normal bir durum
// olarak ele alır (bkz. TemsilcilerimizPage.tsx). Gerçek kayıtlar geldiğinde
// yalnızca bu diziye eklenir — sayfa/harita/bileşen kodunda değişiklik
// gerekmez.
export interface Representative {
  id: string;
  name: string;
  title?: string;
  region: string;
  /** turkey-regions.ts'teki TURKEY_PROVINCES ile aynı plaka numarası sistemi
   * — il adı yazım/aksan hatalarına karşı sağlam, tek doğruluk kaynağıyla
   * (plaka kodu) birebir eşleşir. */
  provinces?: number[];
  phone?: string;
  email?: string;
  photo?: string;
  order?: number;
  active: boolean;
}

export const REPRESENTATIVES: Representative[] = [];

export const ACTIVE_REPRESENTATIVES: Representative[] = [...REPRESENTATIVES]
  .filter((r) => r.active)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

// Yalnızca gerçekten atanmış temsilcisi olan bölgeler listelenir — veri
// yoksa bu dizi de boş kalır, hiçbir bölge etiketi "varmış gibi" gösterilmez.
export const REPRESENTATIVE_REGIONS: string[] = Array.from(
  new Set(ACTIVE_REPRESENTATIVES.map((r) => r.region)),
);

const BY_PROVINCE: Map<number, Representative> = new Map();
for (const rep of ACTIVE_REPRESENTATIVES) {
  for (const plate of rep.provinces ?? []) {
    if (!BY_PROVINCE.has(plate)) BY_PROVINCE.set(plate, rep);
  }
}

/** Verilen plaka koduna (ile) atanmış temsilciyi döndürür; henüz atama yoksa undefined. */
export function representativeForProvince(plate: number): Representative | undefined {
  return BY_PROVINCE.get(plate);
}

// Doğrulanmış (deltaoto.com kurumsal iletişim sayfasından) genel şirket
// bilgisi — bireysel bir temsilcinin kişisel iletişim bilgisi DEĞİLDİR,
// yalnızca genel/fallback iletişim kanalı olarak kullanılır.
export const GENERAL_CONTACT = {
  companyName: "Delta Oto Aksamı San. ve Tic. A.Ş.",
  address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu / Ümraniye / İstanbul",
  phone: "0216 526 64 64",
  fax: "0216 526 33 44",
  email: "info@deltaoto.com",
};

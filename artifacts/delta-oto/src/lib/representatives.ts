export interface Representative {
  id: string;
  name: string;
  channel: string;
  provinces: number[];
  phone: string;
  email: string;
  side?: "Avrupa" | "Anadolu";
  general?: boolean;
}

const representatives: Representative[] = [
  {
    "id": "ahmet-batuhan-cindil",
    "name": "Ahmet Batuhan Cındıl",
    "channel": "Aftermarket",
    "provinces": [
      34
    ],
    "phone": "0538 685 57 81",
    "email": "batuhancindil@deltaoto.com",
    "side": "Anadolu"
  },
  {
    "id": "ahmet-yavuzata",
    "name": "Ahmet Yavuzata",
    "channel": "Opar",
    "provinces": [
      16,
      10,
      17
    ],
    "phone": "0535 876 17 32",
    "email": "ahmetyavuzata@deltaoto.com"
  },
  {
    "id": "alper-allin",
    "name": "Alper Allın",
    "channel": "Aftermarket",
    "provinces": [
      7,
      32,
      15,
      64,
      3,
      20
    ],
    "phone": "0533 020 52 77",
    "email": "alperallin@deltaoto.com"
  },
  {
    "id": "arif-tekemen",
    "name": "Arif Tekemen",
    "channel": "Aftermarket",
    "provinces": [
      34
    ],
    "phone": "0533 305 95 54",
    "email": "ariftekemen@deltaoto.com",
    "side": "Avrupa"
  },
  {
    "id": "cafer-kantekin",
    "name": "Cafer Kantekin",
    "channel": "Aftermarket",
    "provinces": [],
    "phone": "0533 305 95 67",
    "email": "caferkantekin@deltaoto.com",
    "general": true
  },
  {
    "id": "cengizhan-tasdelen",
    "name": "Cengizhan Taşdelen",
    "channel": "Aftermarket",
    "provinces": [
      6
    ],
    "phone": "0538 685 57 70",
    "email": "cengizhantasdelen@deltaoto.com"
  },
  {
    "id": "emre-arici",
    "name": "Emre Arıcı",
    "channel": "Aftermarket",
    "provinces": [
      7
    ],
    "phone": "0533 598 95 58",
    "email": "emrearici@deltaoto.com"
  },
  {
    "id": "erencan-guler",
    "name": "Erencan Güler",
    "channel": "Opar",
    "provinces": [
      35,
      45
    ],
    "phone": "0537 959 76 09",
    "email": "erencanguler@deltaoto.com"
  },
  {
    "id": "ertan-senyurt",
    "name": "Ertan Şenyurt",
    "channel": "Aftermarket",
    "provinces": [
      34
    ],
    "phone": "0535 876 16 84",
    "email": "ertansenyurt@deltaoto.com",
    "side": "Avrupa"
  },
  {
    "id": "fehmi-biyik",
    "name": "Fehmi Bıyık",
    "channel": "Aftermarket",
    "provinces": [
      53,
      8,
      61,
      52,
      28,
      55
    ],
    "phone": "0533 278 31 57",
    "email": "fehmibiyik@deltaoto.com"
  },
  {
    "id": "ferdi-deniz-dursun",
    "name": "Ferdi Deniz Dursun",
    "channel": "Aftermarket",
    "provinces": [
      34
    ],
    "phone": "0533 020 52 78",
    "email": "ferdidenizdursun@deltaoto.com",
    "side": "Anadolu"
  },
  {
    "id": "ferdi-gorur",
    "name": "Ferdi Görür",
    "channel": "Aftermarket",
    "provinces": [
      1,
      33,
      31,
      80
    ],
    "phone": "0537 959 76 08",
    "email": "ferdigorur@deltaoto.com"
  },
  {
    "id": "fethi-gokhan-yagci",
    "name": "Fethi Gökhan Yağcı",
    "channel": "Opar",
    "provinces": [
      35
    ],
    "phone": "0535 876 17 45",
    "email": "gokhanyagci@deltaoto.com"
  },
  {
    "id": "huseyin-kaya",
    "name": "Hüseyin Kaya",
    "channel": "Aftermarket",
    "provinces": [
      61,
      24,
      25,
      29
    ],
    "phone": "0530 153 34 29",
    "email": "huseyinkaya@deltaoto.com"
  },
  {
    "id": "ismail-baysal",
    "name": "İsmail Baysal",
    "channel": "Aftermarket",
    "provinces": [
      43,
      26,
      11
    ],
    "phone": "0538 685 54 96",
    "email": "ismailbaysal@deltaoto.com"
  },
  {
    "id": "ismet-genc",
    "name": "İsmet Genç",
    "channel": "Aftermarket",
    "provinces": [
      65,
      4,
      13
    ],
    "phone": "0535 973 10 70",
    "email": "ismetgenc@deltaoto.com"
  },
  {
    "id": "murat-tahta",
    "name": "Murat Tahta",
    "channel": "Aftermarket",
    "provinces": [
      35,
      20,
      48,
      9
    ],
    "phone": "0533 598 95 63",
    "email": "murattahta@deltaoto.com"
  },
  {
    "id": "musa-bozdemir",
    "name": "Musa Bozdemir",
    "channel": "Aftermarket",
    "provinces": [
      42,
      68
    ],
    "phone": "0531 105 50 67",
    "email": "musabozdemir@deltaoto.com"
  },
  {
    "id": "mustafa-aydogan",
    "name": "Mustafa Aydoğan",
    "channel": "Aftermarket",
    "provinces": [
      44,
      63,
      2,
      23
    ],
    "phone": "0533 305 95 56",
    "email": "mustafaaydogan@deltaoto.com"
  },
  {
    "id": "nurettin-bakici",
    "name": "Nurettin Bakıcı",
    "channel": "Aftermarket",
    "provinces": [
      21,
      47,
      65,
      72
    ],
    "phone": "0533 305 95 55",
    "email": "nurettinbakici@deltaoto.com"
  },
  {
    "id": "okan-demir",
    "name": "Okan Demir",
    "channel": "Aftermarket",
    "provinces": [
      6
    ],
    "phone": "0538 432 37 71",
    "email": "okandemir@deltaoto.com"
  },
  {
    "id": "olgun-ozdemir",
    "name": "Olgun Özdemir",
    "channel": "Aftermarket",
    "provinces": [
      34
    ],
    "phone": "0533 598 95 54",
    "email": "olgunozdemir@deltaoto.com",
    "side": "Anadolu"
  },
  {
    "id": "onur-kursun",
    "name": "Onur Kurşun",
    "channel": "Aftermarket",
    "provinces": [
      34
    ],
    "phone": "0533 305 95 68",
    "email": "onurkursun@deltaoto.com",
    "side": "Anadolu"
  },
  {
    "id": "omer-yildirim",
    "name": "Ömer Yıldırım",
    "channel": "Aftermarket",
    "provinces": [
      55,
      60,
      19,
      58,
      28
    ],
    "phone": "0533 305 95 51",
    "email": "omeryildirim@deltaoto.com"
  },
  {
    "id": "resul-gunes",
    "name": "Resul Güneş",
    "channel": "Aftermarket",
    "provinces": [
      6,
      71
    ],
    "phone": "0533 305 95 63",
    "email": "resulgunes@deltaoto.com"
  },
  {
    "id": "serkan-baris-yildirim",
    "name": "Serkan Barış Yıldırım",
    "channel": "Opar",
    "provinces": [
      35,
      20,
      48
    ],
    "phone": "0538 685 54 97",
    "email": "barisyildirim@deltaoto.com"
  },
  {
    "id": "suleyman-calisan",
    "name": "Süleyman Çalışan",
    "channel": "Aftermarket",
    "provinces": [
      22,
      39,
      59
    ],
    "phone": "0538 685 57 84",
    "email": "suleymancalisan@deltaoto.com"
  },
  {
    "id": "suleyman-tasgin",
    "name": "Süleyman Taşgın",
    "channel": "Aftermarket",
    "provinces": [
      34
    ],
    "phone": "0533 305 95 58",
    "email": "suleymantasgin@deltaoto.com",
    "side": "Avrupa"
  },
  {
    "id": "unal-celik",
    "name": "Ünal Çelik",
    "channel": "Aftermarket",
    "provinces": [
      5,
      60,
      58,
      66
    ],
    "phone": "0535 876 17 40",
    "email": "unalcelik@deltaoto.com"
  },
  {
    "id": "unal-petekal",
    "name": "Ünal Petekal",
    "channel": "Opar",
    "provinces": [
      35,
      9,
      48
    ],
    "phone": "0535 876 16 95",
    "email": "unalpetekal@deltaoto.com"
  },
  {
    "id": "volkan-keser",
    "name": "Volkan Keser",
    "channel": "Aftermarket",
    "provinces": [
      16,
      77,
      10
    ],
    "phone": "0531 546 04 67",
    "email": "volkankeser@deltaoto.com"
  },
  {
    "id": "yusuf-kurtkara",
    "name": "Yusuf Kurtkara",
    "channel": "Aftermarket",
    "provinces": [
      35,
      45
    ],
    "phone": "0533 305 95 64",
    "email": "yusufkurtkara@deltaoto.com"
  },
  {
    "id": "zafer-yilmaz",
    "name": "Zafer Yılmaz",
    "channel": "Aftermarket",
    "provinces": [
      6,
      14
    ],
    "phone": "0538 685 57 64",
    "email": "zaferyilmaz@deltaoto.com"
  },
  {
    "id": "zekeriya-tepetam",
    "name": "Zekeriya Tepetam",
    "channel": "Aftermarket",
    "provinces": [
      6
    ],
    "phone": "0538 685 55 07",
    "email": "zekeriyatepetam@deltaoto.com"
  },
  {
    "id": "cengiz-simsek",
    "name": "Cengiz Şimşek",
    "channel": "Opar",
    "provinces": [
      35
    ],
    "phone": "0535 876 16 88",
    "email": "cengizsimsek@deltaoto.com"
  }
];

const generalSales = representatives.filter((rep) => rep.general);

export function representativesForProvince(plate: number): Representative[] {
  const matches = representatives.filter((rep) => rep.provinces.includes(plate));
  return matches.length > 0 ? matches : generalSales;
}

export const GENERAL_CONTACT = {
  companyName: "Delta Oto Aksamı San. ve Tic. A.Ş.",
  address: "Barbaros Cd. Beyit Sk. No:17, Yukarı Dudullu / Ümraniye / İstanbul",
  phone: "0216 526 64 64",
  fax: "0216 526 33 44",
  email: "info@deltaoto.com",
};

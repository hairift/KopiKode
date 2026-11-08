// Registry data teknologi terpusat untuk kemudahan ekspansi platform KopiKode

export type KategoriTeknologi =
  "markup_styling" | "bahasa_pemrograman" | "framework_web" | "mobile";

export interface ItemBabMateri {
  judul: string;
  slug: string;
  deskripsi: string;
  ringkasan: string;
  estimasiMenit: number;
}

export interface KategoriMateri {
  namaKategori: string;
  daftarMateri: ItemBabMateri[];
}

export interface ItemTeknologi {
  id: string;
  nama: string;
  slug: string;
  kategori: KategoriTeknologi;
  deskripsiSingkat: string;
  deskripsiLengkap: string;
  ikonNama: string;
  status: "tersedia" | "segera_hadir";
  versi: string;
  warnaAksen: string;
  babMateri?: KategoriMateri[];
}

export const labelKategoriTeknologi: Record<KategoriTeknologi, string> = {
  markup_styling: "Bahasa Markup dan Styling",
  bahasa_pemrograman: "Bahasa Pemrograman",
  framework_web: "Framework Web",
  mobile: "Pengembangan Mobile",
};

export const daftarTeknologi: ItemTeknologi[] = [
  {
    id: "html",
    nama: "HTML",
    slug: "html",
    kategori: "markup_styling",
    deskripsiSingkat: "Fondasi struktur dan konten semantik web modern.",
    deskripsiLengkap:
      "Pelajari cara menyusun kerangka website yang kokoh, aksesibel, dan ramah mesin pencari menggunakan standar HTML5 terbaru.",
    ikonNama: "FileCode2",
    status: "tersedia",
    versi: "HTML5 Living Standard",
    warnaAksen: "#0284C7",
    babMateri: [
      {
        namaKategori: "Dasar HTML",
        daftarMateri: [
          {
            judul: "Pengantar dan Struktur Dokumen",
            slug: "pengantar-dan-struktur",
            deskripsi:
              "Memahami deklarasi doctype, elemen html, head, dan body.",
            ringkasan:
              "Struktur dasar dokumen HTML5 dan peran penting elemen kerangka.",
            estimasiMenit: 10,
          },
          {
            judul: "Teks dan Konten Dasar",
            slug: "teks-dan-konten",
            deskripsi:
              "Penggunaan heading, paragraf, list, link, kutipan, dan entitas karakter.",
            ringkasan:
              "Mengorganisir hierarki tulisan dan informasi agar terbaca dengan nyaman.",
            estimasiMenit: 12,
          },
        ],
      },
      {
        namaKategori: "Struktur Semantik dan Tata Letak",
        daftarMateri: [
          {
            judul: "Elemen Semantik Modern",
            slug: "elemen-semantik",
            deskripsi:
              "Panduan lengkap header, nav, main, section, article, aside, dan footer.",
            ringkasan:
              "Memilih elemen yang tepat untuk memperkuat SEO dan navigasi pembaca layar.",
            estimasiMenit: 15,
          },
          {
            judul: "Tabel Data Terstruktur",
            slug: "tabel-data",
            deskripsi:
              "Menyajikan informasi tabular dengan table, thead, tbody, th, dan caption.",
            ringkasan:
              "Struktur tabel yang mudah dibaca oleh manusia maupun teknologi asistif.",
            estimasiMenit: 12,
          },
        ],
      },
      {
        namaKategori: "Formulir dan Interaktivitas",
        daftarMateri: [
          {
            judul: "Formulir dan Tipe Input",
            slug: "formulir-dan-input",
            deskripsi:
              "Eksplorasi tipe input teks, email, number, date, checkbox, select, dan validasi bawaan.",
            ringkasan:
              "Membangun antarmuka pengumpulan data yang valid dan ramah pengguna.",
            estimasiMenit: 18,
          },
          {
            judul: "Komponen Dialog dan Interaktivitas Modern",
            slug: "dialog-dan-komponen-interaktif",
            deskripsi:
              "Penerapan dialog modal asli, popover API, template, dan slot web components.",
            ringkasan:
              "Interaksi tingkat lanjut menggunakan kemampuan murni elemen HTML5.",
            estimasiMenit: 16,
          },
        ],
      },
      {
        namaKategori: "Media dan Aksesibilitas",
        daftarMateri: [
          {
            judul: "Media Gambar, Audio, dan Video",
            slug: "media-dan-gambar",
            deskripsi:
              "Penerapan img responsif dengan srcset, picture, audio, dan video.",
            ringkasan:
              "Menyematkan media berkinerja tinggi tanpa memperlambat loading halaman.",
            estimasiMenit: 14,
          },
          {
            judul: "Aksesibilitas dan Atribut Global",
            slug: "aksesibilitas-dan-aria",
            deskripsi:
              "Peran atribut ARIA, navigasi keyboard, urutan fokus, dan atribut data-*",
            ringkasan:
              "Memastikan website dapat diakses oleh semua pengguna tanpa hambatan.",
            estimasiMenit: 15,
          },
          {
            judul: "Meta Tag, SEO Modern, dan Keamanan Dokumen",
            slug: "meta-tag-dan-seo-modern",
            deskripsi:
              "Open Graph, Twitter Cards, canonical link, optimasi crawler, dan header keamanan.",
            ringkasan:
              "Standar konfigurasi head untuk kesiapan produksi dan mesin pencari.",
            estimasiMenit: 14,
          },
        ],
      },
    ],
  },
  {
    id: "css",
    nama: "CSS",
    slug: "css",
    kategori: "markup_styling",
    deskripsiSingkat:
      "Seni mengatur tata letak, warna, tipografi, dan estetika visual.",
    deskripsiLengkap:
      "Kuasai cascade, box model, tata letak modern Flexbox dan CSS Grid, hingga animasi dan variabel CSS.",
    ikonNama: "Palette",
    status: "tersedia",
    versi: "CSS3 / CSS Modern Specs",
    warnaAksen: "#D97706",
    babMateri: [
      {
        namaKategori: "Fondasi CSS",
        daftarMateri: [
          {
            judul: "Selector, Specificity, dan Cascade",
            slug: "selector-dan-cascade",
            deskripsi:
              "Cara kerja hierarki aturan CSS, perhitungan spesifisitas, dan inheritance.",
            ringkasan:
              "Menulis aturan CSS yang terprediksi tanpa benturan class.",
            estimasiMenit: 12,
          },
          {
            judul: "Box Model dan Dimensi",
            slug: "box-model-dan-dimensi",
            deskripsi:
              "Membedah margin, border, padding, content box, dan border-box.",
            ringkasan:
              "Fondasi penting perhitungan ukuran elemen dalam browser.",
            estimasiMenit: 12,
          },
        ],
      },
      {
        namaKategori: "Tata Letak Modern",
        daftarMateri: [
          {
            judul: "Flexbox Layout",
            slug: "flexbox-layout",
            deskripsi:
              "Sistem tata letak satu dimensi untuk distribusi ruang dan perataan elemen.",
            ringkasan:
              "Mengatur navigasi, kartu, dan komponen fleksibel dengan mudah.",
            estimasiMenit: 16,
          },
          {
            judul: "CSS Grid Layout",
            slug: "css-grid-layout",
            deskripsi:
              "Tata letak dua dimensi baris dan kolom untuk tata letak halaman yang kompleks.",
            ringkasan:
              "Membangun grid responsif berkekuatan penuh tanpa framework tambahan.",
            estimasiMenit: 18,
          },
          {
            judul: "Posisi Elemen dan Stacking Context",
            slug: "posisi-dan-stacking-context",
            deskripsi:
              "Position static, relative, absolute, fixed, sticky, dan manajemen z-index.",
            ringkasan:
              "Mengatur koordinat tumpukan elemen secara akurat tanpa kekacauan visual.",
            estimasiMenit: 16,
          },
        ],
      },
      {
        namaKategori: "Desain Responsif dan Fitur Modern",
        daftarMateri: [
          {
            judul: "Desain Responsif dan Media Query",
            slug: "desain-responsif",
            deskripsi: "Breakpoint, fungsi clamp, min, max, dan viewport unit.",
            ringkasan:
              "Menjamin tampilan optimal dari layar smartphone hingga monitor ultra-wide.",
            estimasiMenit: 15,
          },
          {
            judul: "CSS Variables dan Selektor Modern",
            slug: "variabel-dan-selektor-modern",
            deskripsi:
              "Penggunaan Custom Properties, :has(), :is(), :where(), dan nesting alami.",
            ringkasan:
              "Memanfaatkan kemampuan CSS modern tanpa memerlukan preprosesor rumit.",
            estimasiMenit: 15,
          },
          {
            judul: "Transisi, Transformasi, dan Animasi CSS",
            slug: "transisi-transformasi-dan-animasi",
            deskripsi:
              "Animasi keyframes, transisi halus, transform 2D/3D, dan optimasi performa gpu.",
            ringkasan:
              "Menghadirkan gerak antarmuka yang elegan dengan efisiensi rendering tinggi.",
            estimasiMenit: 16,
          },
          {
            judul: "Pseudo-class dan Pseudo-element Lengkap",
            slug: "pseudo-class-dan-pseudo-element",
            deskripsi:
              "Selektor status :hover, :focus-visible, :nth-child, dan elemen tiruan ::before/::after.",
            ringkasan:
              "Menargetkan keadaan dinamis elemen dan mempercantik tipografi tanpa tag tambahan.",
            estimasiMenit: 16,
          },
        ],
      },
    ],
  },
  {
    id: "javascript",
    nama: "JavaScript",
    slug: "javascript",
    kategori: "bahasa_pemrograman",
    deskripsiSingkat:
      "Logika, interaktivitas dinamis, dan manipulasi data di browser.",
    deskripsiLengkap:
      "Pelajari dasar sintaks, struktur data, fungsi modern, asinkronisasi Promise, dan manipulasi DOM secara langsung.",
    ikonNama: "Terminal",
    status: "tersedia",
    versi: "ECMAScript 2024+",
    warnaAksen: "#0284C7",
    babMateri: [
      {
        namaKategori: "Dasar Bahasa",
        daftarMateri: [
          {
            judul: "Variabel, Tipe Data, dan Operator",
            slug: "variabel-dan-tipe-data",
            deskripsi:
              "Deklarasi let, const, tipe primitif, konversi tipe, dan operator logika.",
            ringkasan: "Langkah pertama mengolah data dan logika pemrograman.",
            estimasiMenit: 12,
          },
          {
            judul: "Percabangan dan Perulangan",
            slug: "kondisi-dan-perulangan",
            deskripsi:
              "Struktur if-else, switch, perulangan for, while, for...of, dan for...in.",
            ringkasan:
              "Mengendalikan alur eksekusi kode sesuai kondisi yang diinginkan.",
            estimasiMenit: 14,
          },
        ],
      },
      {
        namaKategori: "Fungsi dan Struktur Data",
        daftarMateri: [
          {
            judul: "Fungsi, Arrow Function, dan Scope",
            slug: "fungsi-dan-lingkup",
            deskripsi:
              "Deklarasi fungsi, parameter default, arrow function, closure, dan lexical scope.",
            ringkasan:
              "Membungkus logika yang dapat digunakan kembali secara rapi.",
            estimasiMenit: 16,
          },
          {
            judul: "Array dan Metode Manipulasi",
            slug: "array-dan-metode",
            deskripsi:
              "Operasi array modern: map, filter, reduce, find, slice, dan destructuring.",
            ringkasan: "Mengolah daftar data secara deklaratif dan efisien.",
            estimasiMenit: 18,
          },
          {
            judul: "Objek dan Struktur Data Modern",
            slug: "objek-dan-struktur-data",
            deskripsi:
              "Properti objek, method, Map, Set, spread operator, dan penggabungan objek.",
            ringkasan:
              "Menyusun model data yang terstruktur dan mudah diakses.",
            estimasiMenit: 16,
          },
          {
            judul: "Pemrograman Berorientasi Objek dan Prototype",
            slug: "oop-class-dan-prototype",
            deskripsi:
              "Class ES6, constructor, pewarisan extends, field privat, dan rantai prototype.",
            ringkasan:
              "Membangun arsitektur perangkat lunak berbasis objek yang kokoh dan terstruktur.",
            estimasiMenit: 20,
          },
          {
            judul: "Modul ES, Iterator, dan Generator",
            slug: "modul-iterator-dan-generator",
            deskripsi:
              "Pemisahan kode dengan import/export, protokol iterasi, dan fungsi generator yield.",
            ringkasan:
              "Arsitektur modular tingkat perusahaan dan pemrosesan aliran data bertahap.",
            estimasiMenit: 16,
          },
        ],
      },
      {
        namaKategori: "Asinkron dan DOM Browser",
        daftarMateri: [
          {
            judul: "Asinkron: Promise dan Async/Await",
            slug: "asinkron-dan-fetch",
            deskripsi:
              "Pola asinkron, Promise, async/await, penanganan error, dan fetch data API.",
            ringkasan:
              "Mengambil data dari server tanpa membekukan antarmuka pengguna.",
            estimasiMenit: 20,
          },
          {
            judul: "Manipulasi DOM dan Event Handling",
            slug: "dom-dan-event",
            deskripsi:
              "querySelector, manipulasi elemen, event listener, delegation, dan form event.",
            ringkasan:
              "Menghidupkan halaman web melalui interaksi responsif terhadap aksi user.",
            estimasiMenit: 20,
          },
          {
            judul: "Penanganan Error, Regular Expression, dan Date",
            slug: "penanganan-error-dan-regex",
            deskripsi:
              "Try-catch-finally, custom Error, pola regex, parsing tanggal, dan validasi data.",
            ringkasan:
              "Membangun kode yang tangguh terhadap kesalahan dan memvalidasi string kompleks.",
            estimasiMenit: 18,
          },
          {
            judul: "Web Storage dan Modern Browser APIs",
            slug: "web-storage-dan-api-browser",
            deskripsi:
              "LocalStorage, sessionStorage, timer, History API, dan IntersectionObserver.",
            ringkasan:
              "Memanfaatkan kemampuan tingkat lanjut peramban untuk performa dan persistensi.",
            estimasiMenit: 18,
          },
        ],
      },
    ],
  },
  {
    id: "typescript",
    nama: "TypeScript",
    slug: "typescript",
    kategori: "bahasa_pemrograman",
    deskripsiSingkat:
      "JavaScript dengan sistem tipe data statis yang aman dan teruji.",
    deskripsiLengkap:
      "Rencana kurikulum mencakup tipe dasar, interface, generics, utility types, dan konfigurasi compiler untuk proyek berskala besar.",
    ikonNama: "FileCode",
    status: "segera_hadir",
    versi: "TypeScript 5.x",
    warnaAksen: "#2563EB",
  },
  {
    id: "vue",
    nama: "Vue.js",
    slug: "vue",
    kategori: "framework_web",
    deskripsiSingkat:
      "Framework progresif yang intuitif untuk antarmuka pengguna modern.",
    deskripsiLengkap:
      "Rencana kurikulum mencakup Composition API, reaktivitas, sistem komponen SFC, routing, dan manajemen state terpusat.",
    ikonNama: "Layers",
    status: "segera_hadir",
    versi: "Vue 3.5+",
    warnaAksen: "#059669",
  },
  {
    id: "react",
    nama: "React",
    slug: "react",
    kategori: "framework_web",
    deskripsiSingkat:
      "Pustaka berbasis komponen deklaratif untuk web dan aplikasi.",
    deskripsiLengkap:
      "Rencana kurikulum mencakup JSX, React Hooks, manajemen state, efek samping, dan pola arsitektur komponen modular.",
    ikonNama: "Atom",
    status: "segera_hadir",
    versi: "React 19",
    warnaAksen: "#0284C7",
  },
  {
    id: "python",
    nama: "Python",
    slug: "python",
    kategori: "bahasa_pemrograman",
    deskripsiSingkat:
      "Sintaks sederhana dengan ekosistem luas untuk backend dan data.",
    deskripsiLengkap:
      "Rencana kurikulum mencakup sintaks dasar, struktur data, object-oriented programming, modul standar, dan penanganan berkas.",
    ikonNama: "Binary",
    status: "segera_hadir",
    versi: "Python 3.12+",
    warnaAksen: "#D97706",
  },
  {
    id: "flutter",
    nama: "Flutter",
    slug: "flutter",
    kategori: "mobile",
    deskripsiSingkat:
      "Framework multiplatform Dart untuk aplikasi mobile dan desktop.",
    deskripsiLengkap:
      "Rencana kurikulum mencakup hierarki widget, stateful widget, navigasi layar, layout responsif, dan konsumsi API pada gawai.",
    ikonNama: "Smartphone",
    status: "segera_hadir",
    versi: "Flutter 3.x",
    warnaAksen: "#0284C7",
  },
];

// Fungsi pencari teknologi berdasarkan slug
export function cariTeknologiDenganSlug(
  slugTarget: string,
): ItemTeknologi | undefined {
  return daftarTeknologi.find((item) => item.slug === slugTarget);
}

// Menghitung statistik ringkas
export function ambilStatistikTeknologi() {
  const totalTersedia = daftarTeknologi.filter(
    (item) => item.status === "tersedia",
  ).length;
  const totalSegera = daftarTeknologi.filter(
    (item) => item.status === "segera_hadir",
  ).length;
  const totalTopik = daftarTeknologi.reduce((total, item) => {
    if (!item.babMateri) return total;
    return (
      total +
      item.babMateri.reduce(
        (subtotal, bab) => subtotal + bab.daftarMateri.length,
        0,
      )
    );
  }, 0);

  return {
    totalTersedia,
    totalSegera,
    totalTopik,
  };
}

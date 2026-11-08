---
title: "Modul ES, Iterator, dan Generator dalam JavaScript"
description: "Arsitektur modular dengan import dan export ES Modules, pemahaman protokol iterasi Symbol.iterator, serta fungsi generator dan kata kunci yield."
kategori: "Fungsi dan Struktur Data"
---

## Ringkasan Konsep

Dalam rekayasa aplikasi JavaScript skala menengah hingga besar, menuliskan seluruh kode di dalam satu berkas raksasa adalah resep menuju bencana pemeliharaan (_unmaintainable codebase_). Standar ECMAScript resmi menyediakan **ES Modules (ESM)** sebagai mekanisme baku untuk memecah logika program ke dalam berkas-berkas terisolasi yang saling berkomunikasi melalui perintah `export` dan `import`. Di samping pemisahan modul, JavaScript menyediakan protokol tingkat lanjut: **Iterators** untuk mengatur bagaimana struktur data dapat dijelajahi, serta **Generators** (`function*`) yang mampu menjeda (_pause_) dan melanjutkan (_resume_) eksekusi fungsi menggunakan kata kunci `yield`, menghasilkan penanganan aliran data (_streaming_) yang sangat hemat memori.

## Sintaks Dasar

Format ekspor-impor modul ES dan pembuatan fungsi generator bertahap:

```javascript
// Berkas: matematikaKopi.js
export const PI = 3.14159;
export function hitungKeliling(jariJari) {
  return 2 * PI * jariJari;
}
export default class Kalkulator {}

// Berkas utama: aplikasi.js
import Kalkulator, { PI, hitungKeliling } from "./matematikaKopi.js";

// Fungsi Generator Penghasil Nomor Urut Dinamis
function* generatorIdAnggota(awalan = "KSM") {
  let nomor = 1;
  while (true) {
    yield `${awalan}-${String(nomor).padStart(3, "0")}`;
    nomor++;
  }
}
```

## Penjelasan Bagian per Bagian

1. **Sistem Modul ES (ES Modules)**:
   - _Named Export_: Mengekspor beberapa fungsi atau variabel dengan nama spesifik (`export const a = 1;`). Saat diimpor, namanya harus dicantumkan di dalam kurung kurawal `{ a }`.
   - _Default Export_: Menetapkan satu entitas utama sebagai ekspor default per berkas (`export default fungsiUtama;`). Dapat diimpor dengan nama bebas tanpa kurung kurawal.
   - _Dynamic Import_ (`import('./modul.js')`): Memuat berkas modul secara asinkron berbasis Promise sesuai kebutuhan (_lazy loading / code splitting_), sangat penting untuk mempercepat waktu muat awal website.
   - Sifat Alami Modul: Seluruh modul ES selalu berjalan dalam mode ketat (_strict mode_) dan memiliki lingkup berkas terisolasi tanpa mencemari objek `window` global.
2. **Protokol Iterasi (_Iterable Protocol_)**:
   Agar sebuah objek dapat dijelajahi menggunakan perulangan `for...of` atau operator spread `...`, objek tersebut wajib mengimplementasikan metode khusus bertanda kunci `[Symbol.iterator]()`. Metode ini mengembalikan objek iterator yang memiliki fungsi `.next()` yang menghasilkan objek berbentuk `{ value: data, done: boolean }`.
3. **Fungsi Generator (`function*`)**:
   Fungsi istimewa yang dideklarasikan dengan tanda bintang `*`. Berbeda dengan fungsi biasa yang berjalan tuntas dari atas ke bawah hingga `return`, fungsi generator dapat menghentikan eksekusinya sementara di titik kata kunci `yield` dan mengembalikan nilai ke pemanggil. Saat `.next()` dipanggil kembali, eksekusi dilanjutkan tepat dari baris setelah `yield` terakhir.
4. **Instruksi `yield*`**:
   Mendelegasikan proses iterasi ke generator lain atau objek iterabel lain (seperti array).

## Contoh Kode Interaktif

Pelajari bagaimana protokol iterator dan fungsi generator memproduksi urutan data bertahap pada playground interaktif berikut:

<code-playground
id-contoh="demo-generator-js"
judul="Simulasi Generator dan Protokol Iterasi"
:tab-tersedia="['js']"
kode-js="// Fungsi Generator: Memproduksi materi belajar bertahap
function* generatorKurikulum() {
console.log('Tahap 1 dimulai: Menyiapkan materi dasar.');
yield 'Modul 1: HTML5 Semantik';

console.log('Tahap 2 dimulai: Melanjutkan ke tata letak.');
yield 'Modul 2: CSS3 Modern & Flexbox';

console.log('Tahap 3 dimulai: Logika pemrograman.');
yield 'Modul 3: JavaScript ES6+';

return 'Seluruh kurikulum telah tuntas dipelajari!';
}

// Inisialisasi generator
const kurikulumKopi = generatorKurikulum();

// Mengeksekusi langkah demi langkah dengan .next()
console.log('Langkah pertama:', kurikulumKopi.next());
console.log('Langkah kedua:', kurikulumKopi.next());
console.log('Langkah ketiga:', kurikulumKopi.next());
console.log('Langkah keempat (Selesai):', kurikulumKopi.next());

// Contoh Generator Rentang Angka Fleksibel
function* rentangAngka(awal, akhir, langkah = 1) {
for (let i = awal; i <= akhir; i += langkah) {
yield i;
}
}

console.log('\n--- Hasil Generator Rentang Angka ---');
const angkaGenap = [...rentangAngka(2, 10, 2)];
console.log('Array angka genap via spread generator:', angkaGenap);"

>

</code-playground>

## Tabel Perbandingan Modul dan Generator

<tabel-parameter>

| Fitur              | Kata Kunci                | Karakteristik Utama                                               |
| :----------------- | :------------------------ | :---------------------------------------------------------------- |
| Named Export       | `export { a, b }`         | Mengharuskan nama impor sama persis dengan nama berkas asal       |
| Default Export     | `export default Komponen` | Memberikan satu nilai primer yang mudah diimpor dengan nama bebas |
| Dynamic Import     | `import('url')`           | Memuat modul secara asinkron saat fungsi tertentu dipicu          |
| Generator Function | `function* ()`            | Fungsi yang dapat dijeda eksekusinya di tengah jalan              |
| Penjeda Generator  | `yield nilai`             | Mengembalikan nilai parsial dan membekukan status memori fungsi   |
| Delegasi Generator | `yield* generatorLain`    | Mengalirkan iterasi dari sub-generator secara langsung            |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Jebakan Modul dan Generator">

- **Lupa menambahkan atribut `type="module"` pada tag skrip HTML**: Menyematkan berkas JavaScript yang memiliki perintah `import` atau `export` tanpa `<script type="module" src="...">` akan langsung memicu error peramban: `SyntaxError: Cannot use import statement outside a module`.
- **Ketergantungan Siklus Modul (_Circular Dependency_)**: Berkas A mengimpor berkas B, sementara berkas B juga mengimpor berkas A. Pola ini membuat salah satu modul menghasilkan nilai `undefined` saat inisialisasi. Selalu pisahkan definisi data bersama ke dalam berkas ketiga.
- **Mengira memanggil generator otomatis menjalankan kodenya**: Menuliskan `const gen = fungsiGenerator();` tidak langsung menjalankan baris kode pertama di dalamnya. Pemanggilan tersebut hanya mengembalikan objek generator. Kode baru bergerak saat metode `.next()` dipanggil.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Arsitektur Modular Skala Perusahaan">

1. Terapkan pola _Barrel Export_ (`index.js`): Kumpulkan ekspor dari puluhan sub-berkas di dalam satu folder ke dalam satu berkas `index.js`, sehingga pemanggil cukup mengimpor dari satu titik gerbang utama.
2. Gunakan generator untuk memproses data berukuran gigabita secara bertahap (_batch streaming_) tanpa perlu menampung seluruh larik data ke memori RAM komputer sekaligus.
3. Manfaatkan Dynamic Import (`await import(...)`) untuk memisahkan pustaka grafis atau visualisasi yang berat agar hanya diunduh ketika pengguna membuka tab halaman terkait.

</kotak-peringatan>

## Dukungan Browser

Sistem modul ES Modules (`import`/`export`), dynamic import, protokol iterasi, dan fungsi generator didukung penuh 100% oleh seluruh peramban web modern sejak rilis standar ES6 tahun 2015.

## Topik Terkait

- [Fungsi, Arrow Function, dan Scope](/javascript/fungsi-dan-lingkup) - Dasar fungsi dan closure.
- [Array dan Metode Manipulasi](/javascript/array-dan-metode) - Objek iterabel pada array.
- [Pemrograman Berorientasi Objek](/javascript/oop-class-dan-prototype) - Mengorganisir kelas ke dalam modul.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah fungsi generator bernama `generatorHitungMundur` yang menerima angka awal `3`, lalu melakukan `yield` angka `3`, `2`, `1` secara berurutan.

<code-playground
id-contoh="latihan-generator-dasar"
judul="Latihan Mandiri: Generator Hitung Mundur"
:tab-tersedia="['js']"
kode-js="// Tuliskan definisi function* generatorHitungMundur di bawah ini

// Uji coba generator
const hitungMundur = generatorHitungMundur();
console.log(hitungMundur.next().value);
console.log(hitungMundur.next().value);
console.log(hitungMundur.next().value);
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)_

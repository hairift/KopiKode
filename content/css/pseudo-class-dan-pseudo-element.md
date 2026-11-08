---
title: "Pseudo-class dan Pseudo-element Lengkap dalam CSS"
description: "Menargetkan keadaan dinamis elemen dengan pseudo-class :hover, :focus-visible, :nth-child, dan menyisipkan konten dekoratif dengan pseudo-element ::before, ::after."
kategori: "Desain Responsif dan Fitur Modern"
---

## Ringkasan Konsep

Dalam penataan gaya web, tampilan visual sebuah elemen sering kali harus berubah menyesuaikan aksi pengguna (seperti saat tombol ditekan atau input menerima fokus keyboard) maupun posisi strukturnya di dalam dokumen (seperti mewarnai baris genap pada tabel). CSS menyediakan **Pseudo-class** (diawali tanda titik dua tunggal `:`) untuk menargetkan keadaan dinamis elemen tanpa perlu menambah class baru di HTML. Di samping itu, CSS menyediakan **Pseudo-element** (diawali tanda titik dua ganda `::`) untuk menata gaya bagian tertentu dari elemen atau menyisipkan elemen tiruan dekoratif murni dari lembar gaya (_stylesheet_).

## Sintaks Dasar

Format penulisan pseudo-class dan pseudo-element modern:

```css
/* Pseudo-class: Menargetkan elemen input yang sedang menerima fokus dari keyboard */
input:focus-visible {
  outline: 2px solid #0284c7;
  outline-offset: 2px;
}

/* Pseudo-class Struktural: Mewarnai setiap baris bernomor genap */
table tbody tr:nth-child(even) {
  background-color: #faf8f5;
}

/* Pseudo-element: Menyisipkan ikon dekoratif sebelum teks */
.tautan-eksternal::after {
  content: "↗";
  margin-left: 4px;
  font-size: 0.8em;
  color: #0284c7;
}
```

## Penjelasan Bagian per Bagian

1. **Perbedaan Mendasar**:
   - `Pseudo-class` (Satu titik dua `:`): Menargetkan **status** khusus dari elemen yang sudah ada (contoh: `:hover`, `:disabled`, `:nth-child`).
   - `Pseudo-element` (Dua titik dua `::`): Menciptakan atau menargetkan **sub-bagian** abstrak dari elemen (contoh: `::before`, `::after`, `::placeholder`, `::selection`).
2. **Pseudo-class Aksi Pengguna**:
   - `:hover`: Aktif saat kursor mouse melayang di atas elemen.
   - `:active`: Aktif saat elemen sedang dalam keadaan ditekan (klik mouse sedang ditahan).
   - `:focus`: Aktif saat elemen menerima fokus (baik melalui klik maupun keyboard).
   - `:focus-visible`: Hanya aktif jika elemen menerima fokus melalui navigasi keyboard (menjaga estetika bagi pengguna mouse tanpa merusak aksesibilitas).
   - `:focus-within`: Aktif pada elemen induk jika salah satu elemen anak di dalamnya sedang menerima fokus.
3. **Pseudo-class Struktural (_Tree-structural_)**:
   - `:first-child` / `:last-child`: Elemen anak pertama atau terakhir di dalam induknya.
   - `:nth-child(an + b)`: Rumus matematika untuk memilih anak secara berkala (misal: `:nth-child(2n)` untuk genap, atau `:nth-child(3n+1)` untuk kelipatan tiga).
   - `:empty`: Menargetkan elemen yang sama sekali tidak memiliki anak maupun teks spasi.
4. **Pseudo-class Formulir**:
   - `:checked`: Menargetkan checkbox atau radio yang sedang tercentang.
   - `:disabled`: Menargetkan tombol atau input yang dinonaktifkan.
   - `:user-invalid`: Standar modern yang hanya memunculkan tanda error setelah pengguna selesai berinteraksi dan berpindah kolom, bukan sejak awal halaman dibuka.
5. **Pseudo-element Terpenting**:
   - `::before` dan `::after`: Menghasilkan elemen anak tiruan pertama atau terakhir di dalam kontainer. Wajib menyertakan properti `content: ""`.
   - `::marker`: Mengatur warna dan ukuran tanda peluru (_bullet_) pada daftar `<li>`.
   - `::selection`: Mengubah warna latar dan warna teks saat pengguna menyorot blok tulisan dengan mouse.
   - `::first-letter`: Memberi gaya huruf pembuka besar (_drop cap_) pada awal artikel.

## Contoh Kode Interaktif

Pelajari bagaimana pseudo-class dan pseudo-element merias antarmuka tanpa menambah tag HTML tambahan pada playground berikut:

<code-playground
id-contoh="demo-pseudoclass-css"
judul="Eksplorasi Pseudo-class dan Elemen Tiruan"
:tab-tersedia="['html', 'css']"
kode-html="<div class='wadah-contoh'>
  <ul class='daftar-belajar'>
    <li>Modul HTML5 Semantik</li>
    <li>Modul CSS3 Modern</li>
    <li>Modul JavaScript Inti</li>
    <li>Modul TypeScript Lanjutan</li>
  </ul>

  <div class='bidang-formulir'>
    <label for='input-cek'>Uji Fokus Keyboard:</label>
    <input type='text' id='input-cek' placeholder='Klik atau tekan tab ke sini...'>
  </div>
</div>"
  kode-css=".wadah-contoh {
  font-family: system-ui, sans-serif;
  color: #221c18;
}
/* Kustomisasi warna sorotan teks seleksi mouse */
::selection {
  background-color: #0284c7;
  color: #ffffff;
}
.daftar-belajar {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
}
.daftar-belajar li {
  padding: 8px 12px;
  border: 1px solid #e5ddd3;
  margin-bottom: 4px;
  border-radius: 6px;
  position: relative;
  padding-left: 28px;
}
/* Menargetkan baris ganjil dengan :nth-child */
.daftar-belajar li:nth-child(odd) {
  background-color: #faf8f5;
}
/* Menyisipkan nomor lingkaran via ::before */
.daftar-belajar li::before {
  content: '>';
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #0284c7;
  font-weight: bold;
}
.bidang-formulir {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #5c5249;
}
input {
  padding: 8px 12px;
  border: 1px solid #e5ddd3;
  border-radius: 6px;
  font-size: 0.85rem;
  transition: all 0.2s;
}
/* Pseudo-class focus-visible untuk aksesibilitas */
input:focus-visible {
  outline: none;
  border-color: #0284c7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.2);
}"
>
</code-playground>

## Tabel Ragam Pseudo-class dan Pseudo-element

<tabel-parameter>

| Selektor               | Jenis          | Kapan Terpicu / Digunakan                                             |
| :--------------------- | :------------- | :-------------------------------------------------------------------- |
| `:focus-visible`       | Pseudo-class   | Elemen aktif menerima fokus dari papan ketik (Keyboard)               |
| `:focus-within`        | Pseudo-class   | Salah satu elemen anak di dalam kontainer sedang aktif menerima fokus |
| `:nth-child(even)`     | Pseudo-class   | Menargetkan baris bernomor genap pada tabel atau daftar               |
| `:not(.nonaktif)`      | Pseudo-class   | Menargetkan elemen yang tidak memiliki class atau status tertentu     |
| `::before` / `::after` | Pseudo-element | Menyisipkan ornamen grafis atau lencana tanpa tag HTML ekstra         |
| `::marker`             | Pseudo-element | Mengubah bentuk dan warna tanda bullet pada list item                 |
| `::selection`          | Pseudo-element | Mengubah warna sorotan saat teks diblok oleh kursor pengguna          |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Penggunaan Pseudo">

- **Lupa properti `content: ""` pada `::before` atau `::after`**: Tanpa properti `content`, peramban tidak akan pernah merender pseudo-element tersebut ke layar meskipun Anda sudah memberi nilai `width`, `height`, dan `background`.
- **Menyisipkan teks informasi vital melalui `content`**: Pembaca layar (_screen reader_) terkadang mengabaikan atau salah melafalkan teks yang digenerasi melalui CSS `content`. Gunakan pseudo-element hanya untuk ornamen dekoratif murni, bukan teks data inti.
- **Menghilangkan garis fokus dengan `:focus { outline: none; }`**: Selalu gantikan dengan `:focus-visible` yang dipadukan dengan efek `box-shadow` atau `outline` kontras agar pengguna tunanetra dan disabilitas motorik tetap bisa bernavigasi.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Penataan Tipografi dan Formulir">

1. Gunakan pseudo-class modern `:user-invalid` alih-alih `:invalid` agar formulir tidak langsung memerah sebelum pengguna sempat mengetikkan alamat email mereka.
2. Manfaatkan `:is()` atau `:where()` untuk menggabungkan status pseudo yang panjang: `button:is(:hover, :focus-visible) { ... }`.
3. Gunakan `::marker` untuk mempercantik daftar peluru HTML secara murni tanpa perlu mengganti tag `ul` menjadi tumpukan `div` buatan.

</kotak-peringatan>

## Dukungan Browser

Seluruh pseudo-class standar (`:hover`, `:focus-visible`, `:nth-child`) dan pseudo-element (`::before`, `::after`, `::marker`, `::selection`) didukung 100% oleh semua peramban desktop dan seluler modern di seluruh dunia.

## Topik Terkait

- [Selector, Specificity, dan Cascade](/css/selector-dan-cascade) - Teori dasar selektor CSS.
- [Variabel dan Selektor Modern](/css/variabel-dan-selektor-modern) - Selektor fungsional :is() dan :where().
- [Transisi, Transformasi, dan Animasi](/css/transisi-transformasi-dan-animasi) - Menganimasikan pseudo-element.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah aturan CSS menggunakan pseudo-class `:nth-child(2)` pada daftar `.daftar-latihan li` untuk memberi warna teks `#d97706` dan cetak tebal khusus pada butir kedua saja.

<code-playground
id-contoh="latihan-pseudo-dasar"
judul="Latihan Mandiri: Menargetkan Anak Kedua"
:tab-tersedia="['html', 'css']"
kode-html="<ul class='daftar-latihan'>
  <li>Langkah Pertama: Kerangka HTML</li>
  <li>Langkah Kedua: Penataan Gaya CSS</li>
  <li>Langkah Ketiga: Interaktivitas JavaScript</li>
</ul>"
  kode-css=".daftar-latihan {
  font-family: system-ui, sans-serif;
  color: #221c18;
}
/* Tuliskan selektor :nth-child(2) di bawah ini */
"
>
</code-playground>

---

_Referensi resmi: [MDN Web Docs: Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)_

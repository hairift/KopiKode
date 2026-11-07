---
title: "Selector, Specificity, dan Cascade dalam CSS"
description: "Memahami cara kerja algoritma cascade CSS, hierarki selektor, kalkulasi nilai spesifisitas, prinsip pewarisan, dan lapisan layer."
kategori: "Fondasi CSS"
---

## Ringkasan Konsep

CSS (Cascading Style Sheets) adalah bahasa penataan gaya deklaratif yang menentukan bagaimana dokumen HTML disajikan secara visual. Kata kunci terpenting dalam CSS adalah _Cascade_ (air terjun), yaitu algoritma penentu aturan mana yang akan dimenangkan ketika ada beberapa deklarasi gaya yang saling bertabrakan pada elemen yang sama. Memahami cara kerja selektor dan perhitungan spesifisitas adalah fondasi mutlak bagi setiap programmer web agar tidak terjebak dalam perangkap menulis aturan `!important` secara serampangan.

## Sintaks Dasar

Format umum blok aturan CSS dan selektor:

```css
/* Selektor elemen dan class */
article.ringkasan-kopi {
  background-color: var(--latar-kartu);
  color: var(--teks-utama);
  line-height: 1.6;
}

/* Selektor turunan dan pseudo-class */
nav ul li a:hover {
  color: #0284c7;
  text-decoration: underline;
}
```

## Penjelasan Bagian per Bagian

1. **Jenis Selektor Dasar**:
   - Selektor Tipe Elemen: Menargetkan tag HTML langsung, misalnya `h1`, `p`, `table`.
   - Selektor Class: Diawali tanda titik (`.kartu`), dapat digunakan kembali di banyak elemen.
   - Selektor ID: Diawali tanda pagar (`#header-utama`), harus unik satu per halaman.
   - Selektor Universal: Tanda bintang (`*`), menargetkan semua elemen.
   - Selektor Atribut: Contoh `input[type="email"]` untuk menargetkan input berdasarkan atributnya.
2. **Kalkulasi Spesifisitas (Specificity)**:
   Peramban menghitung bobot spesifisitas dalam sistem tiga kolom numerik `(A, B, C)`:
   - Kolom A (Nilai Tertinggi): Jumlah selektor ID (bobot 1-0-0).
   - Kolom B (Nilai Menengah): Jumlah selektor Class, selektor atribut, dan pseudo-class (bobot 0-1-0).
   - Kolom C (Nilai Terendah): Jumlah selektor Elemen dan pseudo-element (bobot 0-0-1).
3. **Aturan Cascade**:
   Jika dua aturan memiliki spesifisitas yang identik, peramban akan memenangkan deklarasi yang ditulis paling akhir di dalam berkas (_source order_).
4. **Pewarisan (Inheritance)**:
   Sebagian properti CSS otomatis diwariskan dari elemen induk ke elemen anak (seperti `color`, `font-family`, `line-height`), sementara properti lain tidak diwariskan (seperti `margin`, `padding`, `border`).
5. **Cascade Layers (`@layer`)**:
   Fitur modern CSS untuk mengelompokkan aturan gaya ke dalam lapisan terstruktur, di mana urutan layer mengalahkan spesifisitas selektor biasa.

## Contoh Kode Interaktif

Amati bagaimana peramban menentukan warna teks berdasarkan bobot spesifisitas pada playground interaktif di bawah ini:

<code-playground
id-contoh="demo-cascade-css"
judul="Eksperimen Spesifisitas dan Cascade"
:tab-tersedia="['html', 'css']"
kode-html="<div id='wadah-konten'>
  <p class='teks-spesial pengantar'>
    Paragraf ini memenangkan aturan warna dari selektor dengan spesifisitas tertinggi.
  </p>
</div>"
  kode-css="/* Spesifisitas: 0-0-1 (Elemen saja) */
p {
  color: #8c8075;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
}

/* Spesifisitas: 0-1-0 (Satu class) */
.pengantar {
color: #d97706;
}

/* Spesifisitas: 0-2-0 (Dua class) */
.teks-spesial.pengantar {
color: #15803d;
}

/* Spesifisitas: 1-0-1 (Satu ID + satu elemen) -> MENANG */
#wadah-konten p {
color: #0284c7;
font-weight: 600;
}"

>

</code-playground>

## Tabel Perhitungan Bobot Spesifisitas

<tabel-parameter>

| Selektor Contoh       | ID (A) | Class/Attr/Pseudo (B) | Elemen (C) | Skor Total  | Pemenang Relatif |
| :-------------------- | :----- | :-------------------- | :--------- | :---------- | :--------------- |
| `p`                   | 0      | 0                     | 1          | `(0, 0, 1)` | Terendah         |
| `.menu-link`          | 0      | 1                     | 0          | `(0, 1, 0)` | Menengah         |
| `ul.nav > li a:hover` | 0      | 2                     | 3          | `(0, 2, 3)` | Kuat             |
| `#sidebar`            | 1      | 0                     | 0          | `(1, 0, 0)` | Sangat Kuat      |
| `#sidebar .widget h3` | 1      | 1                     | 1          | `(1, 1, 1)` | Tertinggi        |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Jebakan Cascade dan Spesifisitas">

- **Kecanduan memakai `!important`**: Menggunakan `!important` merusak hierarki alami cascade dan membuat kode sangat sulit di-override di masa depan. Gunakan refactoring selektor yang lebih spesifik atau manfaatkan fitur modern `@layer`.
- **Rantai selektor terlalu panjang (`div#app main.content section.card p.text`)**: Selektor yang berlebihan memperberat proses kalkulasi gaya oleh browser dan menurunkan kemudahan pemeliharaan kode (_maintainability_). Pertahankan selektor sesederhana mungkin (cukup 1 atau 2 level class).
- **Mengira ID bisa ditimpa oleh 100 buah Class**: Dalam spesifikasi CSS, berapa pun banyaknya class tidak akan pernah bisa mengalahkan satu buah ID, karena ID berada pada kolom nilai pangkat yang lebih tinggi.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Strategi Penataan Arsitektur CSS">

1. Gunakan metodologi penamaan berbasis komponen (seperti BEM: Block, Element, Modifier) untuk menjaga seluruh selektor berada pada tingkat spesifisitas datar `(0, 1, 0)`.
2. Gunakan kata kunci `inherit`, `initial`, atau `unset` untuk mengendalikan perilaku pewarisan properti secara eksplisit tanpa trik hack.
3. Manfaatkan `@layer` untuk memisahkan gaya reset, komponen, dan utility: `@layer reset, komponen, utilitas;`.

</kotak-peringatan>

## Dukungan Browser

Prinsip dasar selector, cascade, dan kalkulasi spesifisitas didukung oleh 100% peramban. Fitur modern Cascade Layers (`@layer`) telah didukung secara penuh dan stabil di semua browser sejak awal 2022.

## Topik Terkait

- [Box Model dan Dimensi](/css/box-model-dan-dimensi) - Ukuran fisik elemen di peramban.
- [Variabel dan Selektor Modern](/css/variabel-dan-selektor-modern) - Selektor :has() dan nesting.
- [Flexbox Layout](/css/flexbox-layout) - Tata letak modern satu dimensi.

## Latihan Singkat

Ujilah pemahaman Anda: ubah kode di bawah ini sehingga teks paragraf berubah menjadi warna hijau `#15803d` tanpa menghapus selektor yang sudah ada dan tanpa menggunakan kata kunci `!important`.

<code-playground
id-contoh="latihan-cascade-dasar"
judul="Latihan Mandiri: Mengalahkan Spesifisitas"
:tab-tersedia="['html', 'css']"
kode-html="<div class='kotak-latihan'>
  <p class='teks-latihan'>Teks ini harus berwarna hijau tanpa menggunakan important.</p>
</div>"
  kode-css="/* Selektor saat ini */
.teks-latihan {
  color: #b91c1c;
  font-family: system-ui, sans-serif;
}

/* Tambahkan selektor dengan bobot lebih tinggi di bawah ini */
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)_

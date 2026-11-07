---
title: "Elemen Semantik Modern HTML5"
description: "Panduan lengkap pemilihan elemen header, nav, main, section, article, aside, footer, figure, details, dan dampaknya pada SEO serta aksesibilitas."
kategori: "Struktur Semantik dan Tata Letak"
---

## Ringkasan Konsep

Elemen semantik adalah elemen HTML yang secara gamblang mendeskripsikan arti dan tujuannya kepada peramban dan pengembang, bukan sekadar berfungsi sebagai wadah visual kosong seperti `<div>` atau `<span>`. HTML5 memperkenalkan serangkaian elemen semantik tingkat tinggi yang memungkinkan pembuatan struktur dokumen web yang memiliki makna jelas. Memanfaatkan elemen semantik merupakan syarat mutlak untuk membangun website yang ramah mesin pencari (SEO) dan dapat diakses dengan mudah oleh pengguna yang mengandalkan alat bantu pembaca layar (_screen reader_).

## Sintaks Dasar

Susunan struktur tata letak web semantik modern umumnya dirancang dengan pola berikut:

```html
<header>
  <nav aria-label="Navigasi Utama">...</nav>
</header>

<main>
  <article>
    <header>...</header>
    <section>...</section>
    <footer>...</footer>
  </article>

  <aside>...</aside>
</main>

<footer>...</footer>
```

## Penjelasan Bagian per Bagian

Berikut adalah fungsi spesifik dari masing-masing elemen semantik modern:

1. `<header>`: Mewakili area pembuka atau pengantar untuk keseluruhan dokumen atau untuk bagian tertentu (seperti header artikel). Biasanya memuat logo, judul topik, dan navigasi.
2. `<nav>`: Mengelompokkan blok tautan navigasi penting. Jangan membungkus semua tautan dengan `nav`, cukup gunakan untuk navigasi utama situs, rekam jejak (_breadcrumb_), atau navigasi halaman.
3. `<main>`: Membungkus konten utama dan paling dominan dari dokumen. Hanya boleh ada satu elemen `<main>` per halaman yang terlihat.
4. `<article>`: Membungkus komposisi konten mandiri yang dapat didistribusikan ulang atau berdiri sendiri tanpa kehilangan konteks, contohnya: posting blog, berita, kartu produk, atau ulasan komentar.
5. `<section>`: Mengelompokkan konten yang memiliki satu kesatuan tema spesifik di dalam dokumen, umumnya selalu diawali dengan heading tersendiri.
6. `<aside>`: Memuat konten pendukung atau informasi terkait secara tidak langsung dengan materi utama, misalnya sidebar artikel, kutipan pelengkap (_pull quote_), atau daftar artikel terkait.
7. `<footer>`: Area penutup untuk halaman atau artikel, umumnya memuat informasi hak cipta, penulis, tautan kebijakan privasi, atau tautan media sosial.
8. `<figure>` dan `<figcaption>`: Membungkus media mandiri (gambar, diagram, potongan kode) beserta keterangan penjelasnya.
9. `<details>` dan `<summary>`: Komponen bawaan HTML5 untuk membuat akordeon lipat buka-tutup interaktif tanpa perlu menulis satu baris pun kode JavaScript.
10. `<time>`: Menandai tanggal atau waktu yang dapat dibaca manusia sekaligus dipahami oleh mesin komputer lewat atribut `datetime`.
11. `<mark>`: Menyorot teks penting dalam konteks tertentu (seperti hasil pencarian).
12. `<address>`: Menyediakan informasi kontak penulis dokumen atau penanggung jawab halaman.

## Contoh Kode Interaktif

Pelajari bagaimana elemen semantik membentuk kerangka halaman blog yang kaya konteks dan rapi melalui contoh berikut:

<code-playground
id-contoh="demo-semantik-html"
judul="Tata Letak Semantik Berita KopiKode"
:tab-tersedia="['html', 'css']"
kode-html="<main>
  <article>
    <header>
      <h2>Tips Memilih Elemen Semantik</h2>
      <p>Dipublikasikan pada <time datetime='2026-03-15'>15 Maret 2026</time></p>
    </header>

    <section>
      <p>Elemen semantik membuat kode Anda lebih mudah dirawat oleh tim pengembang lain.</p>

      <figure>
        <blockquote cite='https://w3.org'>
          HTML semantik bukan hanya tentang gaya visual, melainkan makna informasi.
        </blockquote>
        <figcaption>Prinsip Utama Konsorsium Web W3C</figcaption>
      </figure>
    </section>

    <section>
      <details>
        <summary>Kapan memilih article dibanding section?</summary>
        <p>Gunakan <code>article</code> jika konten tersebut masuk akal jika dibaca terpisah di luar halaman ini (misalnya di RSS feed). Gunakan <code>section</code> jika ia hanya bagian dari bab dokumen.</p>
      </details>
    </section>

  </article>
</main>"
  kode-css="article {
  font-family: system-ui, sans-serif;
  color: #221c18;
  border: 1px solid #e5ddd3;
  padding: 20px;
  border-radius: 12px;
  background: #ffffff;
}
header h2 {
  margin: 0;
  color: #0284c7;
}
header p {
  color: #8c8075;
  font-size: 0.85rem;
  margin-top: 4px;
}
figure {
  margin: 16px 0;
  padding: 12px 16px;
  background: #f4efea;
  border-left: 4px solid #0284c7;
  border-radius: 4px;
}
figcaption {
  font-size: 0.8rem;
  color: #5c5249;
  margin-top: 6px;
  font-style: italic;
}
details {
  border: 1px solid #e5ddd3;
  border-radius: 8px;
  padding: 10px 14px;
  background: #faf8f5;
  cursor: pointer;
}
summary {
  font-weight: 600;
  color: #0284c7;
}"
>
</code-playground>

## Tabel Perbandingan Elemen Semantik

<tabel-parameter>

| Elemen Semantik | Peran Aksesibilitas (ARIA Landmark) | Kapan Harus Memilih                            | Kapan Harus Menghindari                                  |
| :-------------- | :---------------------------------- | :--------------------------------------------- | :------------------------------------------------------- |
| `<header>`      | `banner` (bila tingkat atas)        | Bagian pengantar halaman atau artikel          | Jangan jadikan pembungkus seluruh navigasi halaman saja  |
| `<nav>`         | `navigation`                        | Kumpulan tautan navigasi utama atau sekunder   | Hindari untuk daftar tautan di dalam paragraf isi        |
| `<main>`        | `main`                              | Konten unik terpenting dokumen                 | Hindari lebih dari satu elemen main di layar             |
| `<article>`     | `article`                           | Konten mandiri yang bisa didistribusikan ulang | Hindari untuk pembungkus murni tata letak grid           |
| `<section>`     | `region` (jika diberi label)        | Bagian tematik dokumen yang memiliki heading   | Hindari jika hanya membutuhkan kontainer penata gaya CSS |
| `<aside>`       | `complementary`                     | Informasi sampingan atau pelengkap             | Hindari untuk bagian navigasi utama                      |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Semantik Sering Terjadi">

- **Penyakit _Div-soup_**: Membungkus seluruh layout hanya dengan tag `<div>` bertingkat (`div class="header"`, `div class="nav"`). Ini membuat mesin peramban dan pembaca layar kehilangan petunjuk struktur dokumen.
- **Menggunakan `<section>` tanpa heading**: Standar spesifikasi W3C menyarankan setiap `<section>` idealnya memiliki elemen judul (`<h2>` sampai `<h6>`) agar landmark dokumen terdefinisi dengan jelas.
- **Menukar fungsi `<article>` dan `<section>`**: Ingat pedoman sederhana: jika konten dapat dipotong dan ditempel ke situs lain tanpa kehilangan maknanya, gunakan `<article>`. Jika hanya merupakan sub-bab pembahasan internal, gunakan `<section>`.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Dampak Positif pada Aksesibilitas dan SEO">

1. Pengguna pembaca layar dapat melompat langsung antar bagian penting website menggunakan tombol pintas _Landmarks_ (`main`, `nav`, `header`). Penggunaan elemen semantik otomatis menyediakan landmark ini tanpa perlu menambahkan atribut `role` manual.
2. Bot mesin pencari (seperti Googlebot) memberikan bobot relevansi kata kunci lebih tinggi pada teks di dalam elemen `<main>` dan `<article>` dibandingkan teks di dalam `<aside>` atau `<footer>`.
3. Selalu cantumkan atribut `aria-label` jika terdapat lebih dari satu elemen `<nav>` dalam satu halaman, misalnya `<nav aria-label="Navigasi Utama">` dan `<nav aria-label="Navigasi Footer">`.

</kotak-peringatan>

## Dukungan Browser

Semua elemen semantik HTML5 didukung penuh oleh seluruh peramban modern di desktop dan gawai bergerak. Komponen interaktif `<details>` dan `<summary>` telah didukung secara luas dan stabil di semua browser modern sejak tahun 2020.

## Topik Terkait

- [Teks dan Konten Dasar](/html/teks-dan-konten) - Heading dan paragraf di dalam section.
- [Aksesibilitas dan ARIA](/html/aksesibilitas-dan-aria) - Meningkatkan semantik dengan ARIA label.
- [Pengantar dan Struktur Dokumen](/html/pengantar-dan-struktur) - Kerangka utama HTML5.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah elemen `<details>` yang memuat `<summary>` bertuliskan "Lihat Jam Belajar KSM", lalu di dalamnya letakkan sebuah elemen `<time>` dengan waktu `19:00 WIB`.

<code-playground
id-contoh="latihan-semantik-dasar"
judul="Latihan Mandiri: Akordeon Bawaan HTML5"
:tab-tersedia="['html']"
kode-html="<!-- Tuliskan komponen details di bawah ini -->
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: HTML semantic elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)_

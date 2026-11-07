---
title: "Pengantar dan Struktur Dokumen HTML"
description: "Memahami deklarasi doctype, kerangka dokumen HTML5, elemen head, meta tag penting, dan struktur body."
kategori: "Dasar HTML"
---

## Ringkasan Konsep

HTML (HyperText Markup Language) adalah bahasa standar yang digunakan untuk menyusun kerangka dan struktur konten sebuah halaman web. Dokumen HTML memberitahu peramban (browser) bagaimana sebuah informasi harus dikelompokkan, apakah sebagai judul, paragraf, daftar berurutan, gambar, atau formulir interaktif. Setiap halaman web modern selalu berakar pada satu kerangka dokumen baku yang mendefinisikan tipe dokumen, bahasa dokumen, serta informasi metadata teknis sebelum menyajikan konten yang dapat dilihat pengguna.

## Sintaks Dasar

Struktur paling mendasar dari sebuah dokumen HTML5 dituliskan dengan format berikut:

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Judul Halaman Web</title>
  </head>
  <body>
    <h1>Selamat Datang di KopiKode</h1>
    <p>Ini adalah konten pertama yang tampil pada layar browser.</p>
  </body>
</html>
```

## Penjelasan Bagian per Bagian

Kerangka dokumen di atas tersusun atas beberapa elemen vital:

1. `<!DOCTYPE html>`: Deklarasi penentu tipe dokumen. Pada standar HTML5, deklarasi ini dibuat sangat ringkas untuk memastikan browser beralih ke _standards mode_, bukan _quirks mode_ lama.
2. `<html lang="id">`: Elemen akar (root element) yang membungkus seluruh konten halaman. Atribut `lang="id"` secara tegas menginformasikan bahwa bahasa utama dokumen adalah Bahasa Indonesia.
3. `<head>`: Wadah data internal halaman (metadata) yang tidak langsung dirender sebagai teks di halaman web, melainkan dibaca oleh mesin pencari, browser, dan media sosial.
4. `<meta charset="UTF-8">`: Penentu pengkodean karakter. UTF-8 mendukung hampir semua karakter tulisan dan simbol di dunia tanpa risiko teks rusak (_mojibake_).
5. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Konfigurasi wajib viewport agar layout halaman dapat menyesuaikan proporsi layar ponsel dan desktop secara proporsional (responsif).
6. `<title>`: Menentukan judul tab browser dan teks utama yang muncul pada halaman hasil pencarian (SERP).
7. `<body>`: Area dokumen yang memuat seluruh elemen visual yang dilihat dan diinteraksikan langsung oleh pengguna web.

## Contoh Kode Interaktif

Coba amati dan ubah isi teks serta judul di bawah ini untuk melihat bagaimana browser langsung merender perubahan struktur dokumen HTML:

<code-playground
id-contoh="demo-struktur-html"
judul="Struktur Dokumen HTML5 Dasar"
:tab-tersedia="['html', 'css']"
kode-html="<header>
  <h1>KopiKode Edukasi</h1>
  <p>Platform dokumentasi praktis untuk programmer.</p>
</header>

<main>
  <h2>Memulai Langkah Pertama</h2>
  <p>HTML menyusun kerangka, CSS memberi gaya visual, dan JavaScript memberikan aksi interaktif.</p>
</main>

<footer>
  <small>&copy; 2026 KopiKode Kampus</small>
</footer>"
  kode-css="body {
  font-family: system-ui, sans-serif;
  color: #221c18;
  line-height: 1.6;
}
header {
  border-bottom: 2px solid #0284c7;
  padding-bottom: 8px;
  margin-bottom: 16px;
}
h1 {
  margin: 0;
  color: #0284c7;
  font-size: 1.5rem;
}
footer {
  margin-top: 24px;
  border-top: 1px solid #e5ddd3;
  padding-top: 8px;
  color: #8c8075;
}"
>
</code-playground>

## Tabel Atribut dan Elemen Penting

<tabel-parameter>

| Elemen / Atribut  | Jenis Nilai             | Nilai Bawaan | Keterangan                                                                         |
| :---------------- | :---------------------- | :----------- | :--------------------------------------------------------------------------------- |
| `lang`            | Kode bahasa (ISO 639-1) | Kosong       | Wajib pada elemen `html` untuk aksesibilitas pembaca layar dan penerjemah otomatis |
| `charset`         | Nama encoding           | `UTF-8`      | Wajib diletakkan sedini mungkin di dalam elemen `head`                             |
| `name="viewport"` | Konfigurasi tampilan    | Layar fisik  | Menentukan skala rendering dokumen pada perangkat bergerak                         |
| `title`           | Teks judul              | Nama berkas  | Judul unik dokumen yang tampil pada tab peramban dan bookmark                      |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kesalahan Penulisan Dokumen Pemula">

- **Lupa menyertakan deklarasi `<!DOCTYPE html>`**: Menyebabkan browser merender dokumen dalam mode kompatibilitas usang (_quirks mode_), yang membuat styling CSS modern bekerja tidak terduga.
- **Menghilangkan atribut `lang` pada `<html>`**: Berakibat pembaca layar (screen reader) membaca teks Bahasa Indonesia menggunakan pelafalan fonetik bahasa Inggris, sehingga menyulitkan tunanetra.
- **Lupa meta viewport**: Halaman web akan tampil sangat kecil seperti versi desktop yang diperkecil (_zoomed-out_) saat dibuka melalui ponsel cerdas.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Rekomendasi Aksesibilitas dan Performa">

1. Letakkan `<meta charset="UTF-8">` tepat pada baris pertama setelah pembuka `<head>`, sebelum elemen title dan stylesheet eksternal.
2. Setiap halaman harus memiliki elemen `<title>` yang spesifik dan unik, misalnya: `Judul Topik - KopiKode`.
3. Hindari menaruh konten visual pengguna di luar tag `<body>`. Elemen visual yang diletakkan di dalam `<head>` melanggar spesifikasi web dan berisiko diabaikan mesin peramban.

</kotak-peringatan>

## Dukungan Browser

Deklarasi `<!DOCTYPE html>` dan struktur dasar HTML5 didukung penuh 100% oleh semua peramban modern (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, Opera) tanpa membutuhkan konfigurasi tambahan.

## Topik Terkait

- [Teks dan Konten Dasar](/html/teks-dan-konten) - Mengelola paragraf, heading, daftar, dan tautan.
- [Elemen Semantik Modern](/html/elemen-semantik) - Membedah struktur header, nav, main, dan footer.
- [Aksesibilitas dan ARIA](/html/aksesibilitas-dan-aria) - Standar aksesibilitas pembaca layar.

## Latihan Singkat

Ujilah pemahaman Anda dengan melengkapi kode latihan berikut: tambahkan sebuah elemen heading level 2 dengan teks "Target Belajar Minggu Ini" dan buat sebuah paragraf di bawahnya yang menjelaskan target Anda belajar HTML.

<code-playground
id-contoh="latihan-struktur-dasar"
judul="Latihan Mandiri: Kerangka Konten"
:tab-tersedia="['html']"
kode-html="<!-- Tambahkan h2 dan p di bawah komentar ini -->
<h1>Rencana Belajar KSM</h1>
"
>
</code-playground>

---

_Referensi resmi: [MDN Web Docs: The Anatomy of an HTML document](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started)_

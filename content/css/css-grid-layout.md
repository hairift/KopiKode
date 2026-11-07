---
title: "CSS Grid Layout: Tata Letak Dua Dimensi"
description: "Membangun struktur tata letak baris dan kolom yang tangguh dengan fr unit, repeat, minmax, auto-fit, dan area template bernama."
kategori: "Tata Letak Modern"
---

## Ringkasan Konsep

CSS Grid Layout adalah sistem tata letak paling perkasa di peramban web modern karena beroperasi pada dua dimensi (baris dan kolom secara bersamaan). Berbeda dengan Flexbox yang fokus pada satu arah aliran (hanya baris atau hanya kolom), CSS Grid memberikan kendali penuh terhadap penempatan elemen pada koordinat kisi yang presisi. Fitur ini memungkinkan pembuatan tata letak halaman yang rumit (seperti dashboard majalah, galeri kartu responsif otomatis, atau struktur layout aplikasi web) secara bersih tanpa memerlukan pembungkus `div` berlebihan.

## Sintaks Dasar

Format tata letak kartu otomatis responsif tanpa memerlukan satu baris pun media query:

```css
.wadah-kisi {
  display: grid;
  /* Responsif alami: kolom otomatis bertambah atau berkurang sesuai lebar kontainer */
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}
```

## Penjelasan Bagian per Bagian

1. `display: grid`: Mengubah elemen menjadi kontainer kisi dua dimensi.
2. `grid-template-columns` dan `grid-template-rows`: Mendefinisikan jumlah dan ukuran kolom serta baris.
3. Satuan Fraksional (`fr`): Satuan khusus CSS Grid yang mewakili satu bagian dari sisa ruang bebas (_fraction of free space_). Nilai `1fr 2fr` membagi ruang menjadi sepertiga dan dua pertiga.
4. Fungsi `repeat()`: Menyingkat penulisan definisi kolom yang seragam, contoh: `repeat(3, 1fr)` sama artinya dengan `1fr 1fr 1fr`.
5. Fungsi `minmax(min, max)`: Menentukan rentang ukuran fleksibel. Misalnya `minmax(200px, 1fr)` berarti kolom tidak akan pernah lebih sempit dari 200px, tetapi dapat melebar menyerap sisa ruang.
6. `auto-fit` vs `auto-fill`: Kata kunci otomatisasi jumlah kolom. `auto-fit` meregangkan kolom yang ada agar memenuhi seluruh lebar kontainer saat ruang berlebih, sedangkan `auto-fill` tetap mempertahankan ruang kosong untuk kolom tak terlihat berikutnya.
7. `gap`: Menentukan jarak pemisah antar-jalur baris dan kolom.
8. Penempatan Item Kisi:
   - `grid-column: 1 / 3`: Membentangkan item dari garis kolom ke-1 sampai garis kolom ke-3 (melebar 2 kolom). Notasi singkat: `grid-column: span 2`.
   - `grid-row: span 2`: Membentangkan item setinggi 2 baris.
9. `grid-template-areas`: Menyusun layout secara visual menggunakan peta kata kunci string (seperti peta ASCII).

## Contoh Kode Interaktif

Pelajari bagaimana CSS Grid menyusun layout kartu dengan ukuran berbeda secara harmonis melalui contoh interaktif berikut:

<code-playground
id-contoh="demo-grid-css"
judul="Galeri Tata Letak Dua Dimensi CSS Grid"
:tab-tersedia="['html', 'css']"
kode-html="<div class='wadah-grid'>
  <div class='item unggulan'>
    <h3>Materi Utama</h3>
    <p>Kartu ini membentang 2 kolom penuh.</p>
  </div>
  <div class='item'>
    <h3>Topik A</h3>
    <p>HTML Semantik</p>
  </div>
  <div class='item'>
    <h3>Topik B</h3>
    <p>CSS Flexbox</p>
  </div>
  <div class='item'>
    <h3>Topik C</h3>
    <p>CSS Grid</p>
  </div>
  <div class='item'>
    <h3>Topik D</h3>
    <p>JavaScript DOM</p>
  </div>
</div>"
  kode-css=".wadah-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  font-family: system-ui, sans-serif;
  color: #221c18;
}
.item {
  background-color: #faf8f5;
  border: 1px solid #e5ddd3;
  padding: 16px;
  border-radius: 8px;
}
.item.unggulan {
  grid-column: span 2;
  background-color: #e0f2fe;
  border-color: #0284c7;
}
h3 {
  margin: 0 0 6px 0;
  color: #0284c7;
  font-size: 1rem;
}
p {
  margin: 0;
  font-size: 0.8rem;
  color: #5c5249;
}"
>
</code-playground>

## Tabel Properti CSS Grid

<tabel-parameter>

| Properti                | Nilai Populer                          | Fungsi dan Hasil Visual                                                 |
| :---------------------- | :------------------------------------- | :---------------------------------------------------------------------- |
| `grid-template-columns` | `repeat(auto-fit, minmax(200px, 1fr))` | Membuat galeri kartu yang otomatis responsif tanpa media query          |
| `grid-column`           | `1 / -1`                               | Membentangkan elemen penuh dari garis pertama hingga garis paling akhir |
| `grid-column`           | `span 2`                               | Membentangkan elemen selebar 2 kolom bertetangga                        |
| `gap`                   | `16px 24px`                            | Nilai baris (vertikal) 16px dan nilai kolom (horizontal) 24px           |
| `grid-template-areas`   | `"header header" "sidebar main"`       | Mendefinisikan template area layout semantik secara visual              |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Mendesain CSS Grid">

- **Menggunakan persentase kaku (`width: 33.333%`) di dalam Grid**: Hindari persentase manual karena akan bertabrakan dengan perhitungan `gap`. Selalu gunakan satuan fraksional `1fr`.
- **Salah memahami nomor garis kisi (_grid line_)**: Garis kisi dihitung mulai dari angka 1 di tepi paling luar, bukan 0. Kotak dengan 3 kolom memiliki 4 garis pemisah (garis 1, 2, 3, dan 4).
- **Lupa menentukan batas `minmax()`**: Jika hanya menulis `repeat(auto-fit, 1fr)`, peramban akan memaksakan semua kolom berada di satu baris yang sama persis dan membuat konten di layar ponsel menjadi terlalu rapat.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Pola Desain Responsif Masa Depan">

1. Kuasai rumus sakti galeri responsif: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`. Rumus ini mengeliminasi puluhan baris media query ponsel dan tablet.
2. Gunakan `grid-template-areas` untuk tata letak halaman induk (Header, Sidebar, Main, Footer) agar perpindahan susunan di layar mobile cukup dengan mengubah beberapa baris template area saja.
3. Padukan CSS Grid untuk kerangka halaman makro (luar) dan Flexbox untuk komponen mikro (di dalam kartu, navbar, grup tombol).

</kotak-peringatan>

## Dukungan Browser

CSS Grid Layout dan satuan `fr` didukung penuh 100% oleh semua peramban desktop dan seluler modern di seluruh dunia.

## Topik Terkait

- [Flexbox Layout](/css/flexbox-layout) - Perbandingan tata letak satu dimensi.
- [Desain Responsif dan Media Query](/css/desain-responsif) - Adaptasi tata letak perangkat bergerak.
- [Box Model dan Dimensi](/css/box-model-dan-dimensi) - Satuan ukuran modern CSS.

## Latihan Singkat

Ujilah pemahaman Anda: ubah kode kontainer kisi di bawah ini agar menampilkan tepat 2 kolom yang sama besar (`repeat(2, 1fr)`) dengan jarak antar-kartu (`gap`) sebesar `16px`.

<code-playground
id-contoh="latihan-grid-dasar"
judul="Latihan Mandiri: Membuat Grid 2 Kolom"
:tab-tersedia="['html', 'css']"
kode-html="<div class='area-kisi'>
  <div class='kotak'>Kolom Kiri</div>
  <div class='kotak'>Kolom Kanan</div>
</div>"
  kode-css=".area-kisi {
  /* Tuliskan deklarasi display grid, kolom, dan gap di sini */
}
.kotak {
  background-color: #faf8f5;
  border: 1px solid #e5ddd3;
  padding: 16px;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
  color: #221c18;
  font-weight: 600;
}"
>
</code-playground>

---

_Referensi resmi: [MDN Web Docs: Basic concepts of grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout)_

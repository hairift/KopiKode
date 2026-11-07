---
title: "CSS Box Model dan Satuan Dimensi"
description: "Membedah margin, padding, border, content box, border-box, fenomena margin collapse, serta perbandingan satuan absolut dan relatif."
kategori: "Fondasi CSS"
---

## Ringkasan Konsep

Dalam peramban web, setiap elemen HTML dimodelkan sebagai sebuah kotak empat persegi panjang. Konsep ini dikenal sebagai CSS Box Model. Box model menentukan bagaimana lebar (_width_), tinggi (_height_), bantalan ruang dalam (_padding_), garis pembatas (_border_), dan jarak luar (_margin_) dihitung bersama untuk menghasilkan ukuran fisik total elemen di atas layar. Kesalahan dalam memahami box model adalah penyebab nomor satu terjadinya tata letak yang jebol, pergeseran garis tepi yang tidak diinginkan, serta _horizontal scrollbar_ tak terduga pada halaman web.

## Sintaks Dasar

Penerapan reset universal box model yang menjadi standar wajib seluruh proyek web profesional:

```css
/* Reset universal agar padding dan border tidak menambah ukuran elemen */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Penerapan box model pada komponen kartu */
.kartu-artikel {
  width: 320px;
  padding: 24px;
  border: 1px solid var(--pembatas);
  margin-bottom: 16px;
}
```

## Penjelasan Bagian per Bagian

Box Model tersusun atas empat lapisan konsentris dari dalam ke luar:

1. **Content**: Area inti tempat teks, gambar, atau elemen anak ditampilkan. Ukurannya diatur dengan properti `width` dan `height`.
2. **Padding**: Ruang transparan di sekeliling konten (jarak bantalan dalam). Latar belakang elemen (`background-color`) meluas ke area padding ini.
3. **Border**: Garis tepi pembatas yang membungkus padding dan konten. Dapat diatur ketebalan, gaya garis (`solid`, `dashed`), dan warnanya.
4. **Margin**: Ruang transparan di luar border yang berfungsi memisahkan elemen ini dari elemen tetangga di sekitarnya.
5. **Perbedaan `box-sizing`**:
   - `content-box` (Bawaan peramban lama): Lebar total = `width` + `padding` + `border`. Jika Anda menentukan `width: 300px` lalu memberi `padding: 20px`, ukuran fisik elemen membengkak menjadi 340px!
   - `border-box` (Standar modern): Lebar total = `width` yang ditentukan. Padding dan border ditampung di dalam batas lebar tersebut tanpa menambah dimensi luar kotak.
6. **Margin Collapse**: Perilaku alami CSS di mana margin vertikal atas dan bawah dari dua elemen bertetangga akan melebur menjadi satu nilai terbesar, bukan dijumlahkan.
7. **Satuan Ukuran Modern**:
   - `px`: Satuan piksel layar absolut yang statis.
   - `rem`: Relatif terhadap ukuran font elemen akar (`html`), standar utama untuk tipografi dan jarak aksesibel.
   - `em`: Relatif terhadap ukuran font elemen induk saat ini.
   - `ch`: Relatif terhadap lebar karakter angka 0 pada font yang aktif, sangat ideal untuk menentukan batas lebar baca teks (panjang ideal 65ch sampai 75ch).
   - `vh`, `vw`, `dvh`: Relatif terhadap proporsi tinggi dan lebar jendela viewport peramban.

## Contoh Kode Interaktif

Bandingkan secara langsung bagaimana properti `box-sizing` memengaruhi lebar fisik elemen pada playground berikut:

<code-playground
id-contoh="demo-boxmodel-css"
judul="Perbandingan content-box vs border-box"
:tab-tersedia="['html', 'css']"
kode-html="<div class='wadah'>
  <div class='kotak tipe-content-box'>
    <strong>content-box</strong>
    <p>Lebar asli 240px + padding 20px + border 4px = Total Fisik 288px!</p>
  </div>

  <div class='kotak tipe-border-box'>
    <strong>border-box</strong>
    <p>Lebar total tetap presisi 240px termasuk padding dan border.</p>
  </div>
</div>"
  kode-css=".wadah {
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #221c18;
}
.kotak {
  width: 240px;
  padding: 20px;
  border: 4px solid #0284c7;
  border-radius: 8px;
}
.tipe-content-box {
  box-sizing: content-box;
  background-color: #fef3c7;
}
.tipe-border-box {
  box-sizing: border-box;
  background-color: #e0f2fe;
}
p {
  margin: 6px 0 0 0;
  font-size: 0.8rem;
  color: #5c5249;
}"
>
</code-playground>

## Tabel Properti Box Model

<tabel-parameter>

| Properti CSS   | Nilai Contoh                | Keterangan Arah Singkat (Shorthand)                          |
| :------------- | :-------------------------- | :----------------------------------------------------------- |
| `box-sizing`   | `border-box`, `content-box` | Menentukan rumus perhitungan dimensi lebar dan tinggi kotak  |
| `padding`      | `12px 16px`                 | 2 nilai: Vertikal (atas-bawah) dan Horizontal (kiri-kanan)   |
| `margin`       | `10px 20px 15px 5px`        | 4 nilai berurutan searah jarum jam: Atas, Kanan, Bawah, Kiri |
| `margin: auto` | `0 auto`                    | Memusatkan elemen blok secara horizontal di tengah kontainer |
| `clamp()`      | `clamp(1rem, 2.5vw, 2rem)`  | Nilai fleksibel berbatas: Minimum, Nilai Ideal, dan Maksimum |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Jebakan Box Model yang Kerap Membingungkan">

- **Lupa menambahkan reset `box-sizing: border-box` di awal proyek**: Mengakibatkan tata letak grid sering patah karena penambahan padding selebar 1px saja membuat kolom melebihi 100% lebar layar.
- **Menggunakan satuan piksel (`px`) untuk seluruh ukuran font**: Mengunci ukuran font dengan piksel statis membuat fitur perbesaran teks (_font scaling_) pada pengaturan sistem peramban pengguna lanjut usia atau disabilitas netra tidak berfungsi. Selalu gunakan satuan `rem`.
- **Bingung saat margin atas elemen anak tembus ke luar induk**: Fenomena ini adalah _collapsing margins_ antara induk dan anak. Cara mengatasinya: tambahkan `padding-top: 1px;` atau `overflow: hidden;` pada elemen induk.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Rekomendasi Skala dan Dimensi">

1. Pasang aturan universal berikut di baris pertama CSS proyek Anda: `*, *::before, *::after { box-sizing: border-box; }`.
2. Gunakan fungsi `clamp(min, val, max)` untuk ukuran font responsif alami tanpa perlu menulis banyak baris media query terpisah.
3. Batasi lebar maksimal paragraf teks bacaan menggunakan satuan karakter: `max-width: 70ch;` untuk kenyamanan retina mata pembaca.

</kotak-peringatan>

## Dukungan Browser

Box Model standar dan nilai `box-sizing: border-box` didukung penuh 100% oleh seluruh peramban web modern sejak lebih dari satu dekade yang lalu.

## Topik Terkait

- [Selector dan Cascade](/css/selector-dan-cascade) - Hierarki aturan penataan gaya.
- [Flexbox Layout](/css/flexbox-layout) - Menata distribusi kotak secara fleksibel.
- [CSS Grid Layout](/css/css-grid-layout) - Sistem tata letak kotak dua dimensi.

## Latihan Singkat

Ujilah pemahaman Anda: ubah kotak latihan berikut agar memiliki lebar `200px`, bantalan dalam (padding) `16px`, garis batas (border) solid `2px` warna `#d97706`, dan pastikan menggunakan `box-sizing: border-box`.

<code-playground
id-contoh="latihan-boxmodel-dasar"
judul="Latihan Mandiri: Kotak Sempurna"
:tab-tersedia="['html', 'css']"
kode-html="<div class='kotak-uji'>
Kotak Uji Dimensi
</div>"
  kode-css="/* Lengkapi aturan CSS di bawah ini */
.kotak-uji {
  background-color: #faf8f5;
  font-family: system-ui, sans-serif;
  color: #221c18;
}
"
>
</code-playground>

---

_Referensi resmi: [MDN Web Docs: The box model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)_

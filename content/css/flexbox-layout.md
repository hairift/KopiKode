---
title: "Tata Letak Flexbox Modern CSS"
description: "Sistem tata letak satu dimensi untuk distribusi ruang, perataan sumbu utama dan silang, navigasi responsif, dan pengaturan kartu fleksibel."
kategori: "Tata Letak Modern"
---

## Ringkasan Konsep

CSS Flexible Box Module (Flexbox) adalah modul tata letak satu dimensi yang dirancang untuk mendistribusikan ruang kosong di antara elemen-elemen anak secara dinamis, bahkan ketika ukuran aslinya tidak diketahui atau berubah secara reaktif. Flexbox sangat unggul dalam menyelesaikan masalah tata letak klasik yang dulunya sulit, seperti memusatkan elemen tepat di tengah layar vertikal dan horizontal, meratakan tinggi kartu di dalam satu baris, serta menyusun navigasi yang menyesuaikan ruang layar ponsel maupun monitor komputer.

## Sintaks Dasar

Format deklarasi kontainer Flexbox dan perataan sumbu:

```css
/* Kontainer Fleksibel */
.bilah-navigasi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* Item Fleksibel di dalamnya */
.item-pencarian {
  flex-grow: 1; /* Mengisi sisa ruang kosong yang tersedia */
}
```

## Penjelasan Bagian per Bagian

Flexbox bekerja berdasarkan sistem dua sumbu koordinat:

1. **Sumbu Utama (_Main Axis_)**: Ditentukan oleh `flex-direction` (bawaannya adalah horizontal dari kiri ke kanan: `row`).
2. **Sumbu Silang (_Cross Axis_)**: Sumbu tegak lurus terhadap sumbu utama (bawaannya adalah vertikal dari atas ke bawah: `column`).

### Properti Kontainer Induk (Flex Container):

- `display: flex`: Mengaktifkan konteks pemformatan fleksibel pada seluruh anak langsungnya.
- `flex-direction`: Mengatur orientasi aliran item: `row`, `row-reverse`, `column`, atau `column-reverse`.
- `flex-wrap`: Menentukan apakah item dipaksa dalam satu baris (`nowrap`) atau boleh terlipat ke baris baru jika ruang habis (`wrap`).
- `gap`: Jarak pemisah antar-item tanpa perlu trik manipulasi margin negatif.
- `justify-content`: Mengatur perataan item di sepanjang **Sumbu Utama**:
  - `flex-start` / `flex-end`: Merapat ke pangkal atau ujung.
  - `center`: Merapat ke tengah.
  - `space-between`: Menempel ke tepi kiri dan kanan dengan jarak seragam di antaranya.
  - `space-around` / `space-evenly`: Memberikan bantalan ruang rata di sekeliling item.
- `align-items`: Mengatur perataan item di sepanjang **Sumbu Silang**:
  - `stretch` (bawaan): Menyamakan tinggi seluruh item sesuai item tertinggi.
  - `center`: Memusatkan item secara vertikal.
  - `flex-start` / `flex-end`: Merapat ke atas atau bawah sumbu silang.

### Properti Elemen Anak (Flex Item):

- `flex-grow`: Bobot kemampuan item untuk meregang menyerap sisa ruang kosong (contoh: `flex-grow: 1`).
- `flex-shrink`: Bobot kemampuan item untuk menyusut saat ruang kontainer menyempit.
- `flex-basis`: Ukuran dimensi dasar item sebelum sisa ruang didistribusikan.
- `flex`: Notasi singkat terpadu: `flex: <grow> <shrink> <basis>`, misalnya `flex: 1 1 0%`.
- `align-self`: Menimpa aturan `align-items` dari induk khusus untuk satu elemen anak tertentu.

## Contoh Kode Interaktif

Eksperimen langsung dengan pengatur perataan Flexbox dan lihat bagaimana kartu otomatis mengisi ruang pada playground di bawah ini:

<code-playground
id-contoh="demo-flexbox-css"
judul="Distribusi Kartu dengan Flexbox"
:tab-tersedia="['html', 'css']"
kode-html="<div class='wadah-flex'>
  <div class='kartu'>
    <h4>Modul HTML</h4>
    <p>Kerangka dokumen semantik.</p>
  </div>
  <div class='kartu utama'>
    <h4>Modul CSS</h4>
    <p>Tata letak fleksibel dan estetika modern.</p>
  </div>
  <div class='kartu'>
    <h4>Modul JS</h4>
    <p>Interaktivitas logika web.</p>
  </div>
</div>"
  kode-css=".wadah-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 12px;
  font-family: system-ui, sans-serif;
  color: #221c18;
}
.kartu {
  flex: 1;
  background-color: #faf8f5;
  border: 1px solid #e5ddd3;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
}
.kartu.utama {
  border-color: #0284c7;
  background-color: #e0f2fe;
}
h4 {
  margin: 0 0 6px 0;
  color: #0284c7;
}
p {
  margin: 0;
  font-size: 0.825rem;
  color: #5c5249;
}"
>
</code-playground>

## Tabel Nilai Perataan Flexbox

<tabel-parameter>

| Properti            | Nilai Populer    | Efek pada Tampilan                                                   |
| :------------------ | :--------------- | :------------------------------------------------------------------- |
| `justify-content`   | `space-between`  | Memisahkan item ke ujung kiri dan kanan secara maksimal              |
| `justify-content`   | `center`         | Memusatkan semua anak di tengah sumbu utama                          |
| `align-items`       | `center`         | Memusatkan anak tepat di tengah sumbu silang vertikal                |
| `align-items`       | `stretch`        | Menyamakan tinggi seluruh kartu anak secara otomatis                 |
| `flex`              | `1`              | Notasi singkat agar semua item memiliki porsi lebar yang sama persis |
| `margin-left: auto` | (Pada item anak) | Mendorong item tersebut merapat ke ujung kanan kontainer             |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Penggunaan Flexbox">

- **Menggunakan Flexbox untuk tata letak kisi dua dimensi**: Jika Anda membutuhkan baris dan kolom yang sejajar secara vertikal sekaligus horizontal, gunakan CSS Grid. Flexbox hanya beroperasi pada satu sumbu dalam satu waktu.
- **Lupa menambahkan `flex-wrap: wrap` pada wadah kartu responsif**: Tanpa `flex-wrap`, item akan dipaksa menyusut atau meluap ke luar layar ponsel hingga merusak tampilan.
- **Menggunakan margin kaku alih-alih `gap`**: Menggunakan margin kanan pada anak menyisakan margin kosong di anak terakhir yang harus diatasi dengan `:last-child`. Selalu utamakan properti `gap`.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Pola Klasik Flexbox Andalan">

1. **Pemutusan Sempurna di Tengah Layar**: Cukup gunakan `display: flex; justify-content: center; align-items: center;` pada induk.
2. **Navigasi Rapat Kanan Alami**: Berikan properti `margin-left: auto;` pada tombol profil atau login di dalam bilah navbar, maka tombol tersebut otomatis terdorong ke ujung kanan tanpa perlu perhitungan persentase.
3. Selalu sediakan nilai `flex-basis: 0` atau gunakan `min-width: 0` jika mendapati elemen teks panjang menolak untuk menyusut di dalam kontainer flex.

</kotak-peringatan>

## Dukungan Browser

Modul Flexbox dan properti `gap` pada Flexbox didukung penuh 100% oleh semua peramban desktop dan seluler modern.

## Topik Terkait

- [CSS Grid Layout](/css/css-grid-layout) - Sistem tata letak dua dimensi baris dan kolom.
- [Box Model dan Dimensi](/css/box-model-dan-dimensi) - Perhitungan dimensi kotak.
- [Desain Responsif dan Media Query](/css/desain-responsif) - Adaptasi tampilan pada layar kecil.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah kontainer flex yang memusatkan satu buah kotak teks tepat di tengah-tengah area baik secara horizontal maupun vertikal menggunakan kombinasi `justify-content` dan `align-items`.

<code-playground
id-contoh="latihan-flexbox-dasar"
judul="Latihan Mandiri: Pemusatan Sempurna"
:tab-tersedia="['html', 'css']"
kode-html="<div class='area-luar'>
  <div class='kotak-tengah'>Tepat di Tengah</div>
</div>"
  kode-css=".area-luar {
  height: 200px;
  background-color: #faf8f5;
  border: 1px dashed #e5ddd3;
  border-radius: 8px;
  /* Tambahkan aturan display flex dan perataan di sini */
}
.kotak-tengah {
  background-color: #0284c7;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-family: system-ui, sans-serif;
  font-weight: 600;
}"
>
</code-playground>

---

_Referensi resmi: [MDN Web Docs: Basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)_

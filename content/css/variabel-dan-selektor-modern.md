---
title: "CSS Variables dan Selektor Modern: :has(), :is(), :where()"
description: "Menerapkan Custom Properties untuk sistem tema, selektor relasional mutakhir :has(), penyederhanaan spesifisitas dengan :where(), serta nesting alami CSS."
kategori: "Desain Responsif dan Fitur Modern"
---

## Ringkasan Konsep

CSS berkembang dengan pesat dalam beberapa tahun terakhir. Fitur-fitur yang dulunya membutuhkan preprosesor eksternal (seperti Sass atau Less) atau trik manipulasi JavaScript kini telah menjadi kemampuan bawaan resmi di peramban web modern. Penggunaan CSS Variables (_Custom Properties_) memungkinkan pengelolaan design tokens warna dan tema terang/gelap secara dinamis. Di samping itu, kehadiran selektor revolusioner `:has()` ("selektor induk yang telah dinanti puluhan tahun") serta fitur _native nesting_ menyederhanakan penulisan aturan kode menjadi jauh lebih ekspresif dan ringkas.

## Sintaks Dasar

Format penulisan CSS Variables, selektor relasional `:has()`, dan nesting alami:

```css
/* Mendefinisikan design tokens pada lingkup akar */
:root {
  --warna-aksen: #0284c7;
  --ruang-dasar: 16px;
}

/* Selektor relasional :has() menargetkan induk yang memiliki anak tertentu */
.kartu-artikel:has(img) {
  grid-template-columns: 120px 1fr;
}

/* Nesting alami murni CSS tanpa preprosesor */
.tombol-primer {
  background-color: var(--warna-aksen);
  color: white;

  &:hover {
    opacity: 0.9;
  }
}
```

## Penjelasan Bagian per Bagian

1. **CSS Custom Properties (CSS Variables)**:
   - Dideklarasikan diawali dua tanda hubung: `--nama-variabel: nilai;`.
   - Dipanggil menggunakan fungsi `var()`: `color: var(--warna-aksen, #000000);`. Nilai kedua adalah _fallback_ jika variabel tidak ditemukan.
   - Bersifat mewaris (_cascading_ dan _inheritable_). Jika diubah di dalam class tertentu (seperti `.dark`), semua elemen anak di dalamnya otomatis berganti warna.
2. **Selektor Relasional `:has()`**:
   Memungkinkan pemilihan elemen berdasarkan apa yang ada di dalamnya atau saudara yang mengikutinya. Contoh: `h2:has(+ p)` menargetkan heading yang tepat diikuti oleh paragraf.
3. **Selektor Pengelompokan `:is()` dan `:where()`**:
   - `:is(header, main, footer) p`: Menyingkat penulisan berulang. Memiliki bobot spesifisitas selektor terberat di dalam daftarnya.
   - `:where(header, main, footer) p`: Berperilaku sama persis seperti `:is()`, namun bobot spesifisitasnya selalu **nol (0-0-0)**. Sangat ideal untuk pustaka komponen atau gaya reset dasar yang mudah ditimpa.
4. **Nesting Alami (Native Nesting)**:
   Menuliskan aturan anak langsung di dalam kurung kurawal induknya menggunakan simbol ampersand (`&`), membuat struktur kode selaras dengan hierarki DOM HTML.
5. **Logical Properties**:
   Menggantikan orientasi fisik kaku (kiri/kanan/atas/bawah) dengan orientasi berbasis arah baca teks:
   - `padding-inline`: Mengatur bantalan kiri dan kanan (searah baris).
   - `padding-block`: Mengatur bantalan atas dan bawah (searah tumpukan).

## Contoh Kode Interaktif

Pelajari keajaiban selektor `:has()` dan pergantian variabel warna pada playground di bawah ini:

<code-playground
id-contoh="demo-modern-css"
judul="Selektor :has() dan Variabel Tema"
:tab-tersedia="['html', 'css']"
kode-html="<div class='wadah-tema'>
  <div class='kartu-kopi'>
    <h3>Kopi Robusta</h3>
    <p>Kartu teks standar tanpa badge.</p>
  </div>

  <div class='kartu-kopi'>
    <span class='lencana-favorit'>Pilihan Barista</span>
    <h3>Kopi Arabika</h3>
    <p>Kartu ini memiliki badge, sehingga selektor :has() otomatis memberi aksen border kuning!</p>
  </div>
</div>"
  kode-css=".wadah-tema {
  --warna-kartu-latar: #faf8f5;
  --warna-kartu-teks: #221c18;
  --warna-sorot: #d97706;

font-family: system-ui, sans-serif;
display: flex;
flex-direction: column;
gap: 12px;
}
.kartu-kopi {
background-color: var(--warna-kartu-latar);
color: var(--warna-kartu-teks);
border: 1px solid #e5ddd3;
padding: 16px;
border-radius: 8px;
transition: all 0.2s;
}
/* Menargetkan kartu yang memiliki elemen .lencana-favorit di dalamnya */
.kartu-kopi:has(.lencana-favorit) {
border: 2px solid var(--warna-sorot);
background-color: #fef3c7;
}
.lencana-favorit {
display: inline-block;
background-color: var(--warna-sorot);
color: white;
padding: 2px 8px;
border-radius: 4px;
font-size: 0.75rem;
font-weight: bold;
margin-bottom: 8px;
}
h3 {
margin: 0 0 6px 0;
font-size: 1rem;
}
p {
margin: 0;
font-size: 0.825rem;
color: #5c5249;
}"

>

</code-playground>

## Tabel Fitur CSS Modern

<tabel-parameter>

| Fitur Modern       | Contoh Penggunaan                                   | Manfaat Utama                                                    |
| :----------------- | :-------------------------------------------------- | :--------------------------------------------------------------- |
| Custom Properties  | `--warna-teks: #221c18;`                            | Sentralisasi palet warna dan penataan mode gelap tanpa duplikasi |
| `:has()`           | `form:has(:invalid) button { opacity: 0.5; }`       | Menyesuaikan tampilan induk jika input formulir belum valid      |
| `:where()`         | `:where(h1, h2, h3) { margin: 0; }`                 | Menerapkan gaya reset dengan spesifisitas nol mutlak             |
| `:focus-visible`   | `button:focus-visible { outline: 2px solid blue; }` | Hanya memunculkan ring fokus saat dinavigasi dengan keyboard     |
| Logical Properties | `margin-inline: auto;`                              | Memusatkan elemen secara horizontal pada teks LTR maupun RTL     |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Fitur Modern">

- **Mengabaikan nilai _fallback_ pada `var()`**: Jika variabel yang dipanggil salah ketik atau belum terdefinisi, peramban akan menggunakan nilai bawaan spesifikasi (`initial`), yang sering kali membuat teks menghilang atau transparan. Selalu sertakan nilai cadangan jika memungkinkan: `var(--warna, #0284c7)`.
- **Menulis selektor `:has()` yang terlalu berat**: Meskipun sangat berguna, penggunaan selektor kompleks seperti `body:has(div:has(p > a))` di seluruh halaman dapat menurunkan performa rendering (_re-paint_) peramban. Batasi jangkauan `:has()` pada komponen terdekat.
- **Nesting terlalu dalam**: Fitur native nesting menggoda pengembang untuk menumpuk aturan hingga 5 atau 6 level. Hindari nesting lebih dari 3 tingkat agar kode tetap mudah dibaca dan tidak menghasilkan selektor yang kaku.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Membangun Sistem Tema Terang dan Gelap">

1. Kumpulkan seluruh palet warna dalam blok `:root` dan timpa nilainya di dalam blok `html.dark`. Komponen Anda cukup memanggil `var(--warna-latar)` tanpa perlu tahu tema apa yang sedang aktif.
2. Manfaatkan `:has()` untuk mendesain formulir yang interaktif, misalnya memberi garis merah pada kotak pembungkus input saat elemen di dalamnya berada dalam status `:user-invalid`.
3. Gunakan properti logis `padding-inline` dan `margin-block` untuk menyiapkan website Anda menyambut pelokalan bahasa Arab atau Ibrani (Right-to-Left / RTL).

</kotak-peringatan>

## Dukungan Browser

CSS Custom Properties dan selektor `:is()` didukung oleh 100% peramban modern. Selektor relasional `:has()` dan fitur _Native Nesting_ telah didukung secara penuh dan stabil di seluruh peramban utama (Chrome, Edge, Firefox, Safari) sejak akhir tahun 2023.

## Topik Terkait

- [Selector, Specificity, dan Cascade](/css/selector-dan-cascade) - Teori dasar hierarki gaya.
- [Desain Responsif dan Media Query](/css/desain-responsif) - Variabel CSS untuk breakpoint.
- [Box Model dan Dimensi](/css/box-model-dan-dimensi) - Satuan ukuran modern rem dan ch.

## Latihan Singkat

Ujilah pemahaman Anda: deklarasikan sebuah variabel CSS bernama `--warna-aksen-latihan` dengan nilai `#0284c7` pada selektor `.kotak-latihan`, lalu gunakan variabel tersebut untuk mewarnai teks judul `h4` di dalamnya menggunakan fungsi `var()`.

<code-playground
id-contoh="latihan-modern-dasar"
judul="Latihan Mandiri: Penerapan CSS Variables"
:tab-tersedia="['html', 'css']"
kode-html="<div class='kotak-latihan'>
  <h4>Judul Berwarna Aksen Variabel</h4>
  <p>Teks penjelasan pendamping.</p>
</div>"
  kode-css=".kotak-latihan {
  /* Deklarasikan variabel CSS di sini */
  padding: 16px;
  background-color: #faf8f5;
  border: 1px solid #e5ddd3;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
}

h4 {
/* Panggil variabel CSS untuk properti color di sini */
margin: 0 0 6px 0;
}

p {
margin: 0;
font-size: 0.85rem;
color: #5c5249;
}"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)_

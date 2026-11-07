---
title: "Desain Responsif, Media Query, dan Container Query"
description: "Prinsip desain mobile-first, media query modern dengan sintaks rentang, container query berbasis komponen, serta tipografi dinamis fluid clamp."
kategori: "Desain Responsif dan Fitur Modern"
---

## Ringkasan Konsep

Desain Responsif (Responsive Web Design / RWD) adalah pendekatan arsitektur web yang memastikan konten dan tata letak visual sebuah situs dapat beradaptasi secara mulus terhadap berbagai ukuran layar, orientasi gawai, dan kerapatan piksel peramban tanpa memerlukan pembuatan berkas HTML terpisah. Di era web modern, desain responsif telah berevolusi dari sekadar mengandalkan media query berbasis ukuran layar global (viewport) menuju desain modular berbasis komponen menggunakan fitur mutakhir Container Queries (`@container`) dan fungsi kalkulasi fluida `clamp()`.

## Sintaks Dasar

Perbandingan sintaks media query klasik dan sintaks rentang modern beserta container query:

```css
/* Pendekatan Mobile-First dengan Media Query Rentang Modern */
@media (width >= 768px) {
  .tata-letak-halaman {
    grid-template-columns: 240px 1fr;
  }
}

/* Container Query: Beradaptasi terhadap lebar induk kartu, bukan layar! */
.wadah-kartu {
  container-type: inline-size;
}

@container (width > 420px) {
  .kartu-artikel {
    display: flex;
    flex-direction: row;
  }
}
```

## Penjelasan Bagian per Bagian

1. **Filosofi Mobile-First**: Menuliskan aturan dasar CSS untuk tampilan layar kecil (ponsel) terlebih dahulu tanpa media query, lalu menggunakan `@media (min-width: ...)` untuk menambahkan fitur tata letak yang lebih kompleks saat ruang layar membesar di tablet dan monitor desktop.
2. **Sintaks Rentang Media Query Modern**: CSS modern mengizinkan operator perbandingan matematika alami:
   - Sintaks lama: `@media (min-width: 640px) and (max-width: 1024px)`
   - Sintaks modern: `@media (640px <= width <= 1024px)`
3. **Container Queries (`@container`)**: Lompatan terbesar dalam sejarah penataan komponen web. Daripada memeriksa ukuran seluruh layar browser, komponen dapat memeriksa berapa lebar wadah pembungkus langsungnya (`inline-size`). Kartu yang sama dapat otomatis tampil vertikal di sidebar yang sempit, namun otomatis tampil horizontal ketika ditaruh di area konten utama yang luas.
4. **Tipografi Fluida (`clamp`)**: Menghasilkan ukuran font yang membesar dan mengecil secara proporsional sesuai lebar layar tanpa lonjakan patah (_breakpoint step_):
   - `font-size: clamp(1rem, 2.5vw, 2.25rem);`
   - Keterangan: batas paling kecil 1rem (16px), ukuran dinamis proporsional 2.5vw, dan batas maksimal berhenti di 2.25rem (36px).
5. **Satuan Viewport Dinamis (`dvh`, `svh`, `lvh`)**: Menyelesaikan masalah klasik di ponsel saat bilah alamat peramban (URL bar) muncul atau menyusut saat pengguna menggulir layar. Satuan `100dvh` (_dynamic viewport height_) selalu menghitung tinggi layar aktif secara akurat secara _real-time_.

## Contoh Kode Interaktif

Ujilah fleksibilitas ukuran teks dan komponen kartu adaptif pada playground interaktif berikut:

<code-playground
id-contoh="demo-responsif-css"
judul="Tipografi Fluida dan Kartu Adaptif"
:tab-tersedia="['html', 'css']"
kode-html="<div class='wadah-responsif'>
  <div class='kartu-profil'>
    <div class='foto-placeholder'>Foto</div>
    <div class='info'>
      <h3 class='judul-fluida'>Belajar Desain Responsif</h3>
      <p>Ukuran judul di atas menggunakan fungsi clamp() yang menghitung proporsi layar secara mulus.</p>
    </div>
  </div>
</div>"
  kode-css=".wadah-responsif {
  font-family: system-ui, sans-serif;
  color: #221c18;
}
.kartu-profil {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: #faf8f5;
  border: 1px solid #e5ddd3;
  border-radius: 10px;
}
@media (width >= 480px) {
  .kartu-profil {
    flex-direction: row;
    align-items: center;
  }
}
.foto-placeholder {
  width: 64px;
  height: 64px;
  background-color: #0284c7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.8rem;
  flex-shrink: 0;
}
.judul-fluida {
  margin: 0 0 6px 0;
  color: #0284c7;
  /* Tipografi dinamis dengan batas minimum dan maksimum */
  font-size: clamp(1rem, 4vw, 1.35rem);
}
p {
  margin: 0;
  font-size: 0.825rem;
  color: #5c5249;
  line-height: 1.5;
}"
>
</code-playground>

## Tabel Breakpoint Standar Industri

<tabel-parameter>

| Nama Breakpoint | Ukuran Min-Width | Target Perangkat Tipikal                                 |
| :-------------- | :--------------- | :------------------------------------------------------- |
| `sm`            | `640px`          | Ponsel lanskap dan ponsel layar lebar                    |
| `md`            | `768px`          | Komputer tablet (iPad) dalam mode potret                 |
| `lg`            | `1024px`         | Tablet lanskap, laptop layar kecil, dan komputer desktop |
| `xl`            | `1280px`         | Monitor desktop resolusi standar Full HD                 |
| `2xl`           | `1536px`         | Monitor desktop ukuran besar dan resolusi 2K/4K          |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Strategi Desain Responsif">

- **Merancang Desktop-First**: Menuliskan ratusan baris gaya untuk desktop layar besar terlebih dahulu, lalu menambal aturan dengan puluhan `@media (max-width: ...)` untuk mematikan fitur di ponsel. Pendekatan ini membuat kode membengkak dan lambat di ponsel. Terapkan prinsip Mobile-First dengan `min-width`.
- **Menetapkan breakpoint berdasarkan merek gawai tertentu**: Jangan membuat breakpoint spesifik untuk resolusi ponsel tertentu seperti `iPhone 14 Pro Max (430px)`. Buatlah breakpoint alami di mana tata letak konten Anda mulai terasa sesak atau pecah.
- **Lupa menyertakan meta viewport**: Desain CSS responsif tidak akan bekerja pada peramban ponsel jika Anda lupa menambahkan `<meta name="viewport" content="width=device-width, initial-scale=1.0">` di dokumen HTML.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Standar Kinerja dan Pengalaman Pengguna">

1. Gunakan satuan `ch` untuk membatasi panjang baris paragraf agar tidak terlalu lebar pada layar ultra-wide: `max-width: 68ch;`.
2. Hormati kenyamanan pengguna yang menyalakan opsi hemat gerakan pada sistem operasi mereka dengan menyertakan media fitur: `@media (prefers-reduced-motion: reduce)`.
3. Manfaatkan satuan `dvh` (_dynamic viewport height_) untuk modal popover layar penuh di ponsel agar tidak terpotong oleh bilah navigasi bawah peramban.

</kotak-peringatan>

## Dukungan Browser

Sintaks media query klasik dan fungsi `clamp()` didukung 100% oleh semua peramban. Fitur sintaks rentang modern (`width >= 768px`) dan Container Queries (`@container`) telah didukung secara stabil di seluruh peramban utama (Chrome, Edge, Firefox, Safari) sejak akhir 2022.

## Topik Terkait

- [Flexbox Layout](/css/flexbox-layout) - Perataan satu dimensi yang fleksibel.
- [CSS Grid Layout](/css/css-grid-layout) - Rumus auto-fit responsif tanpa media query.
- [Variabel dan Selektor Modern](/css/variabel-dan-selektor-modern) - Variabel tema adaptif.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah aturan media query yang hanya aktif ketika lebar layar minimal `600px` (`width >= 600px`), lalu di dalamnya ubah warna latar `.kotak-responsif` menjadi `#0284c7` dan warna teksnya menjadi putih.

<code-playground
id-contoh="latihan-responsif-dasar"
judul="Latihan Mandiri: Media Query Perubahan Warna"
:tab-tersedia="['html', 'css']"
kode-html="<div class='kotak-responsif'>
Lebarkan jendela editor untuk melihat perubahan warna!
</div>"
  kode-css=".kotak-responsif {
  padding: 16px;
  background-color: #faf8f5;
  color: #221c18;
  border: 1px solid #e5ddd3;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
  text-align: center;
}

/* Tuliskan media query Anda di bawah ini */
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)_

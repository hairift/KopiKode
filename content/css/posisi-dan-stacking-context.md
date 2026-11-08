---
title: "Posisi Elemen dan Stacking Context dalam CSS"
description: "Memahami position static, relative, absolute, fixed, sticky, pengaturan koordinat offset inset, hierarki z-index, dan fenomena stacking context."
kategori: "Tata Letak Modern"
---

## Ringkasan Konsep

Properti `position` dalam CSS menentukan skema penempatan elemen di dalam alur dokumen (_normal document flow_) atau mengangkatnya ke luar alur agar dapat diposisikan secara presisi menggunakan koordinat offset. Di samping memindahkan elemen secara horizontal dan vertikal, properti posisi memicu terbentuknya lapisan tumpukan sumbu Z (_Stacking Context_). Memahami aturan pembentukan stacking context adalah kunci utama untuk memecahkan misteri klasik pengembang web: mengapa sebuah elemen ber-`z-index: 99999` terkadang tetap berada di bawah elemen lain yang hanya ber-`z-index: 1`.

## Sintaks Dasar

Format deklarasi skema posisi dan koordinat offset:

```css
/* Elemen melayang relatif terhadap induk terdekat yang diposisikan */
.kartu-wadah {
  position: relative; /* Menjadi titik acuan bagi elemen anak absolut */
}

.lencana-status {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
}

/* Bilah navigasi yang menempel di bagian atas saat halaman digulir */
.bilah-navigasi-lekat {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

## Penjelasan Bagian per Bagian

1. **Lima Nilai Properti `position`**:
   - `static` (Bawaan peramban): Elemen mengikuti alur dokumen normal. Nilai offset (`top`, `left`, `z-index`) tidak memiliki efek apa pun pada elemen statis.
   - `relative`: Elemen tetap menempati ruang aslinya dalam alur dokumen, tetapi dapat digeser tampilannya secara visual relatif terhadap posisi aslinya. Elemen ini juga bertindak sebagai titik acuan bagi anak bertipe `absolute`.
   - `absolute`: Elemen dicopot sepenuhnya dari alur dokumen (tidak memakan ruang fisik) dan diposisikan relatif terhadap leluhur terdekat yang memiliki posisi non-statis.
   - `fixed`: Elemen dicopot dari alur dokumen dan dikunci posisinya relatif terhadap area pandang peramban (_viewport_), sehingga tidak bergerak saat halaman di-scroll.
   - `sticky`: Perpaduan antara `relative` dan `fixed`. Elemen berperilaku relatif hingga mencapai ambang batas offset tertentu (misal `top: 0`), lalu berubah menjadi menempel (_stick_) selama masih berada di dalam batas kontainer induknya.
2. **Properti Koordinat Offset**:
   - `top`, `right`, `bottom`, `left`: Jarak pergeseran dari tepi acuan.
   - `inset`: Notasi singkat modern untuk keempat sisi sekaligus (`inset: 0` sama artinya dengan `top: 0; right: 0; bottom: 0; left: 0`).
3. **Misteri Stacking Context (Konteks Tumpukan)**:
   Lapisan visual peramban tempat elemen digambar secara tiga dimensi. Stacking context baru tercipta jika elemen memiliki:
   - `position` non-statis yang dikombinasikan dengan nilai `z-index` selain `auto`.
   - `opacity` kurang dari 1.
   - Properti `transform`, `filter`, `perspective`, atau `clip-path` aktif.
   - Properti `will-change` disetel untuk properti yang memicu rendering terpisah.
     **Aturan Kunci**: Elemen anak di dalam satu stacking context yang rendah tidak akan pernah bisa melompati elemen di stacking context yang lebih tinggi, berapa pun besarnya nilai `z-index` anak tersebut!

## Contoh Kode Interaktif

Pelajari bagaimana `position: relative`, `position: absolute`, dan `z-index` berinteraksi secara visual pada playground berikut:

<code-playground
id-contoh="demo-posisi-css"
judul="Simulasi Positioning dan Stacking Order"
:tab-tersedia="['html', 'css']"
kode-html="<div class='area-kerja'>
  <div class='kartu-induk'>
    <h4>Kartu Induk (Relative)</h4>
    <p>Elemen ini menjadi jangkar penempatan koordinat anak.</p>

    <!-- Elemen absolut terikat pada kartu induk -->
    <span class='badge-status'>Absolut di Pojok</span>

  </div>

  <div class='panel-mengambang'>
    Elemen Fixed / Mengambang
  </div>
</div>"
  kode-css=".area-kerja {
  font-family: system-ui, sans-serif;
  color: #221c18;
  height: 220px;
  position: relative;
  background-color: #faf8f5;
  border: 1px dashed #e5ddd3;
  padding: 16px;
  border-radius: 8px;
}
.kartu-induk {
  position: relative;
  width: 260px;
  background-color: #ffffff;
  border: 1px solid #e5ddd3;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.kartu-induk h4 {
  margin: 0 0 6px 0;
  color: #0284c7;
}
.kartu-induk p {
  margin: 0;
  font-size: 0.8rem;
  color: #5c5249;
}
.badge-status {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #d97706;
  color: white;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: bold;
}
.panel-mengambang {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: #0284c7;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}"
>
</code-playground>

## Tabel Nilai Properti Posisi

<tabel-parameter>

| Nilai Position | Di Luar Alur Dokumen? | Titik Acuan Offset          | Kasus Penggunaan Khas                                |
| :------------- | :-------------------- | :-------------------------- | :--------------------------------------------------- |
| `static`       | Tidak                 | Tidak berlaku               | Alur teks dan paragraf standar                       |
| `relative`     | Tidak                 | Posisi aslinya sendiri      | Induk kontainer untuk anak bertipe absolute          |
| `absolute`     | **Ya**                | Leluhur non-statis terdekat | Badge notifikasi, tooltip, ikon tombol hapus         |
| `fixed`        | **Ya**                | Jendela viewport layar      | Bilah navigasi tetap, tombol chat bantuan mengambang |
| `sticky`       | Bersyarat             | Kontainer induk langsung    | Judul bab yang menempel saat artikel di-scroll       |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Jebakan Positioning dan Z-Index">

- **Lupa memberikan `position: relative` pada elemen induk**: Jika elemen anak diberi `position: absolute` tanpa ada induk yang berposisi non-statis, anak tersebut akan melayang merapat ke pojok layar seluruh dokumen (`<body>`).
- **Posisi `sticky` gagal menempel karena `overflow: hidden`**: Jika salah satu kontainer leluhur di atas elemen sticky memiliki properti `overflow: hidden`, `overflow: auto`, atau `overflow: scroll`, efek menempel dari `position: sticky` otomatis mati.
- **Perang angka Z-Index (Z-Index War)**: Menuliskan nilai acak seperti `z-index: 9999999` di berbagai tempat akan mengacaukan arsitektur kode. Buatlah skala terpusat, misalnya: dropdown = 10, modal = 50, tooltip = 100.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Pola Desain Layout Presisi">

1. **Trik Pemusatan Absolut Elegan**: Gabungkan `position: absolute; inset: 0; margin: auto;` pada elemen berukuran pasti untuk memusatkannya tepat di tengah induk tanpa perlu perhitungan matematika manual.
2. Gunakan notasi modern `inset-block` dan `inset-inline` untuk mendukung adaptasi arah baca multi-bahasa secara logis.
3. Hindari menaruh terlalu banyak elemen `fixed` yang berukuran tebal di ponsel cerdas agar tidak mempersempit area baca layar pengguna.

</kotak-peringatan>

## Dukungan Browser

Semua nilai posisi (`static`, `relative`, `absolute`, `fixed`, `sticky`) serta properti `z-index` dan `inset` didukung penuh 100% oleh semua peramban desktop dan seluler modern di seluruh dunia.

## Topik Terkait

- [CSS Box Model dan Dimensi](/css/box-model-dan-dimensi) - Dimensi dasar elemen.
- [Flexbox Layout](/css/flexbox-layout) - Alternatif modern untuk perataan elemen.
- [Transisi, Transformasi, dan Animasi](/css/transisi-transformasi-dan-animasi) - Pemusatan dengan transform translate.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah elemen `.badge-latihan` berada di posisi pojok kanan bawah (`bottom: 8px; right: 8px;`) dari kontainer `.kotak-induk-latihan` menggunakan kombinasi `position: relative` dan `position: absolute`.

<code-playground
id-contoh="latihan-posisi-dasar"
judul="Latihan Mandiri: Menempatkan Badge Absolut"
:tab-tersedia="['html', 'css']"
kode-html="<div class='kotak-induk-latihan'>
  <p>Isi Kotak Latihan</p>
  <span class='badge-latihan'>Pojok Kanan Bawah</span>
</div>"
  kode-css=".kotak-induk-latihan {
  /* Berikan properti posisi acuan di sini */
  height: 120px;
  background-color: #faf8f5;
  border: 1px solid #e5ddd3;
  padding: 12px;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
}
.badge-latihan {
  /* Terapkan posisi absolut dan koordinat di sini */
  background-color: #0284c7;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}"
>
</code-playground>

---

_Referensi resmi: [MDN Web Docs: CSS layout - Positioning](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning)_

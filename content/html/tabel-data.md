---
title: "Tabel Data Terstruktur HTML"
description: "Menyajikan informasi tabular dengan elemen table, caption, thead, tbody, th, td, colspan, rowspan, dan aturan aksesibilitas."
kategori: "Struktur Semantik dan Tata Letak"
---

## Ringkasan Konsep

Tabel dalam HTML dirancang secara eksklusif untuk menyajikan data tabular, yaitu informasi yang memiliki hubungan relasional dua dimensi berbasis baris (horizontal) dan kolom (vertikal). Contoh penggunaan tabel yang tepat meliputi jadwal perkuliahan, daftar perbandingan spesifikasi komputer, rekapitulasi nilai mahasiswa, dan daftar harga paket langganan. HTML menyediakan elemen struktural khusus seperti kepala tabel, badan tabel, dan kaki tabel guna memastikan data mudah dicerna oleh manusia sekaligus dapat dinavigasi sel per sel oleh peranti pembaca layar.

## Sintaks Dasar

Format standar penulisan tabel data yang aksesibel dan lengkap:

```html
<table>
  <caption>
    Jadwal Pertemuan Mingguan KSM KopiKode
  </caption>
  <thead>
    <tr>
      <th scope="col">Hari</th>
      <th scope="col">Materi Pembahasan</th>
      <th scope="col">Waktu Pelaksanaan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Senin</th>
      <td>HTML Semantik dan Aksesibilitas</td>
      <td>19:00 - 21:00 WIB</td>
    </tr>
    <tr>
      <th scope="row">Rabu</th>
      <td>CSS Flexbox dan Tata Letak Grid</td>
      <td>19:00 - 21:00 WIB</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">
        Seluruh sesi diselenggarakan di Ruang Lab Komputer Kampus.
      </td>
    </tr>
  </tfoot>
</table>
```

## Penjelasan Bagian per Bagian

1. `<table>`: Elemen pembungkus seluruh struktur tabel.
2. `<caption>`: Judul atau ringkasan penjelasan isi tabel. Wajib diletakkan tepat setelah tag pembuka `<table>`. Elemen ini sangat penting untuk aksesibilitas pengguna disabilitas netra.
3. `<thead>`: Mengelompokkan satu atau beberapa baris kepala tabel yang mendefinisikan label judul kolom.
4. `<tbody>`: Membungkus baris-baris data inti dari tabel.
5. `<tfoot>`: Mengelompokkan baris penutup atau ringkasan tabel (misalnya total penjumlahan atau catatan kaki tabel).
6. `<tr>` (_table row_): Mendefinisikan satu baris horizontal di dalam tabel.
7. `<th>` (_table header_): Sel penanda judul kolom atau baris. Teks di dalam sel ini otomatis dicetak tebal oleh peramban. Wajib dilengkapi atribut `scope`.
8. `<td>` (_table data_): Sel penyimpan nilai data umum.
9. Atribut `scope`: Menjelaskan orientasi sel header (`scope="col"` untuk judul kolom ke bawah, atau `scope="row"` untuk judul baris ke kanan).
10. `colspan` dan `rowspan`: Menggabungkan beberapa sel kolom menjadi satu (`colspan="2"`) atau beberapa baris menjadi satu (`rowspan="2"`).

## Contoh Kode Interaktif

Pelajari cara kerja penyusunan tabel data yang rapi dan elegan dengan menggabungkan baris dan kolom pada contoh di bawah ini:

<code-playground
id-contoh="demo-tabel-html"
judul="Rekapitulasi Modul Belajar Anggota"
:tab-tersedia="['html', 'css']"
kode-html="<table>
  <caption>Daftar Modul Belajar KSM KopiKode</caption>
  <thead>
    <tr>
      <th scope='col'>Teknologi</th>
      <th scope='col'>Topik Bahasan</th>
      <th scope='col'>Durasi</th>
      <th scope='col'>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope='row' rowspan='2'>HTML5</th>
      <td>Pengantar Dokumen & Semantik</td>
      <td>15 Menit</td>
      <td>Tersedia</td>
    </tr>
    <tr>
      <td>Formulir dan Validasi Bawaan</td>
      <td>18 Menit</td>
      <td>Tersedia</td>
    </tr>
    <tr>
      <th scope='row'>CSS3</th>
      <td>Flexbox dan Tata Letak Grid</td>
      <td>20 Menit</td>
      <td>Tersedia</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan='4'>Total modul yang aktif pada Fase 1: 3 Modul Inti.</td>
    </tr>
  </tfoot>
</table>"
  kode-css="table {
  width: 100%;
  border-collapse: collapse;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  color: #221c18;
}
caption {
  font-weight: 700;
  font-size: 1rem;
  color: #0284c7;
  margin-bottom: 8px;
  text-align: left;
}
th, td {
  border: 1px solid #e5ddd3;
  padding: 10px 12px;
  text-align: left;
}
thead th {
  background-color: #f4efea;
  font-weight: 600;
  color: #221c18;
}
tbody th {
  background-color: #faf8f5;
  font-weight: 600;
}
tfoot td {
  background-color: #f4efea;
  font-size: 0.8rem;
  color: #5c5249;
  font-style: italic;
}"
>
</code-playground>

## Tabel Atribut Tabel

<tabel-parameter>

| Atribut   | Elemen Sasaran | Nilai yang Valid                     | Penjelasan Fungsi                                                 |
| :-------- | :------------- | :----------------------------------- | :---------------------------------------------------------------- |
| `scope`   | `<th>`         | `col`, `row`, `colgroup`, `rowgroup` | Mengasosiasikan sel data dengan judul kolom atau baris yang tepat |
| `colspan` | `<th>`, `<td>` | Angka positif (misal `2`, `3`)       | Melebarkan sel horizontal melintasi beberapa kolom                |
| `rowspan` | `<th>`, `<td>` | Angka positif (misal `2`, `3`)       | Melebarkan sel vertikal melintasi beberapa baris                  |
| `headers` | `<td>`         | ID dari satu atau lebih elemen `th`  | Menautkan sel data secara eksplisit pada tabel multidimensi rumit |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Mendesain Tabel Data">

- **Menggunakan tabel untuk tata letak halaman (_table layout_)**: Praktik era tahun 1990-an ini sangat dilarang dalam standar web modern. Untuk tata letak halaman, selalu gunakan CSS Grid atau Flexbox. Tabel hanya boleh dipakai untuk data bertipe baris dan kolom.
- **Lupa menyertakan elemen `<caption>`**: Tanpa caption, pengguna tunanetra yang mengarahkan fokus ke tabel tidak akan tahu konteks tabel tersebut sebelum membaca seluruh isinya sel per sel.
- **Menggunakan `<td>` untuk judul kolom**: Menggunakan `td` dengan styling font tebal alih-alih `th scope="col"` merusak navigasi peranti pembaca layar.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Tabel Responsif dan Aksesibilitas">

1. Selalu bungkus tabel dengan kontainer `div class="overflow-x-auto"` pada layout web responsif agar pengguna ponsel dapat menggeser tabel ke samping tanpa memotong layout utama halaman.
2. Manfaatkan properti CSS `border-collapse: collapse;` agar garis batas sel menyatu rapi tanpa ada celah dobel.
3. Berikan warna latar zebra yang lembut (`tr:nth-child(even)`) untuk mempermudah mata membaca data yang memiliki banyak baris.

</kotak-peringatan>

## Dukungan Browser

Semua elemen tabel (`table`, `thead`, `tbody`, `tfoot`, `th`, `td`, `caption`) merupakan bagian dari standar HTML paling awal dan didukung 100% oleh seluruh peramban di dunia.

## Topik Terkait

- [Teks dan Konten Dasar](/html/teks-dan-konten) - Elemen teks dan daftar informasi.
- [Elemen Semantik Modern](/html/elemen-semantik) - Pengelompokan bagian dokumen.
- [Aksesibilitas dan ARIA](/html/aksesibilitas-dan-aria) - Standar aksesibilitas pembaca layar.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah tabel sederhana yang memuat perbandingan harga 2 varian menu minuman kopi ("Espresso" seharga "18.000" dan "Caffe Latte" seharga "24.000") lengkap dengan elemen `caption` dan `th scope="col"`.

<code-playground
id-contoh="latihan-tabel-dasar"
judul="Latihan Mandiri: Tabel Menu Kopi"
:tab-tersedia="['html']"
kode-html="<!-- Tuliskan tabel perbandingan harga di bawah ini -->
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: HTML table basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics)_

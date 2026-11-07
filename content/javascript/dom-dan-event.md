---
title: "Manipulasi DOM dan Penanganan Event (Event Handling)"
description: "Memilih elemen dengan querySelector, memanipulasi teks dan class CSS, menangani interaksi event listener, bubbling, dan delegasi event."
kategori: "Asinkron dan DOM Browser"
---

## Ringkasan Konsep

Document Object Model (DOM) adalah representasi pohon objek (_node tree_) yang dibuat oleh peramban setelah mem-parsing kode HTML halaman web. Melalui API DOM, JavaScript memperoleh akses penuh untuk membaca, mengubah struktur elemen, mengganti warna gaya visual, dan merespons aksi nyata yang dilakukan pengguna seperti klik mouse, ketikan keyboard, pergeseran scroll, atau pengiriman formulir. Kemampuan memanipulasi DOM dan menangani _Event_ adalah esensi utama yang membuat halaman web statis bertransformasi menjadi aplikasi web interaktif yang dinamis.

## Sintaks Dasar

Format umum pemilihan elemen DOM dan penambahan pendengar event (_event listener_):

```javascript
// Memilih elemen target berdasarkan selektor CSS
const tombolAksi = document.querySelector("#tombol-simpan");
const kotakStatus = document.querySelector(".status-teks");

// Mendaftarkan fungsi pendengar event klik
tombolAksi.addEventListener("click", (event) => {
  event.preventDefault(); // Mencegah aksi bawaan peramban

  // Memanipulasi teks dan class elemen DOM
  kotakStatus.textContent = "Materi berhasil disimpan!";
  kotakStatus.classList.add("aktif");
});
```

## Penjelasan Bagian per Bagian

1. **Pemilihan Elemen DOM Modern**:
   - `document.querySelector(selektorCss)`: Mengembalikan satu elemen pertama yang cocok dengan selektor CSS yang diberikan (atau `null` jika tidak ditemukan).
   - `document.querySelectorAll(selektorCss)`: Mengembalikan koleksi NodeList dari seluruh elemen yang cocok, yang dapat langsung diiterasi dengan `.forEach()`.
2. **Memanipulasi Konten dan Atribut**:
   - `textContent`: Membaca atau mengisi teks polos secara aman tanpa risiko keamanan XSS. Wajib diutamakan dibanding `innerHTML`.
   - `innerHTML`: Mengurai teks menjadi elemen HTML. Hanya gunakan jika Anda yakin sumber teks benar-benar bersih dan tepercaya.
   - `classList`: API terbaik untuk memanipulasi class CSS elemen (`.add()`, `.remove()`, `.toggle()`, `.contains()`).
   - `setAttribute()` / `getAttribute()`: Mengelola atribut HTML elemen secara langsung.
3. **Mekanisme Event Listener**:
   - Metode `addEventListener(tipeEvent, fungsiCallback)`: Cara baku mendaftarkan penanganan aksi. Memungkinkan penambahan beberapa listener berbeda pada satu elemen yang sama tanpa saling menimpa.
   - Jenis Event Umum: `click`, `input`, `change`, `submit`, `keydown`, `keyup`, `mouseenter`.
4. **Objek Event (`event`)**:
   Objek otomatis yang dikirimkan peramban ke dalam fungsi callback:
   - `event.target`: Elemen fisik spesifik tempat aksi mula-mula terjadi.
   - `event.preventDefault()`: Menghentikan perilaku bawaan peramban (misalnya mencegah halaman refresh saat tombol submit formulir ditekan).
   - `event.stopPropagation()`: Menghentikan perambatan event ke elemen leluhur (_bubbling_).
5. **Konsep Event Delegation**:
   Teknik cerdas di mana alih-alih memasang ratusan event listener pada setiap tombol di dalam daftar, Anda cukup memasang satu event listener pada elemen induknya, lalu memeriksa `event.target` untuk mengetahui tombol mana yang diklik.

## Contoh Kode Interaktif

Pelajari bagaimana JavaScript merespons ketikan teks dan klik tombol secara real-time pada playground di bawah ini:

<code-playground
id-contoh="demo-dom-js"
judul="Aplikasi Catatan Mini: Manipulasi DOM"
:tab-tersedia="['html', 'css', 'js']"
kode-html="<div class='wadah-aplikasi'>
  <h3>Daftar Rencana Belajar KSM</h3>

  <div class='baris-input'>
    <input type='text' id='input-topik' placeholder='Ketik topik baru...'>
    <button type='button' id='tombol-tambah'>Tambah</button>
  </div>

  <ul id='daftar-topik'>
    <li class='item-materi'>HTML Semantik Dasar</li>
    <li class='item-materi'>CSS Box Model</li>
  </ul>

  <p id='pesan-info' class='info'>Klik pada materi untuk menandainya selesai.</p>
</div>"
  kode-css=".wadah-aplikasi {
  font-family: system-ui, sans-serif;
  color: #221c18;
  max-width: 380px;
}
h3 {
  margin: 0 0 12px 0;
  color: #0284c7;
  font-size: 1.1rem;
}
.baris-input {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e5ddd3;
  border-radius: 6px;
  font-size: 0.85rem;
}
button {
  background: #0284c7;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
}
li {
  padding: 8px 12px;
  background: #faf8f5;
  border: 1px solid #e5ddd3;
  border-radius: 6px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}
li.selesai {
  text-decoration: line-through;
  color: #8c8075;
  background: #f4efea;
}
.info {
  margin: 0;
  font-size: 0.75rem;
  color: #8c8075;
  font-style: italic;
}"
  kode-js="const inputTopik = document.getElementById('input-topik');
const tombolTambah = document.getElementById('tombol-tambah');
const daftarTopik = document.getElementById('daftar-topik');

// Menambahkan materi baru ke dalam DOM
tombolTambah.addEventListener('click', () => {
const teks = inputTopik.value.trim();
if (!teks) return;

const elemenBaru = document.createElement('li');
elemenBaru.className = 'item-materi';
elemenBaru.textContent = teks;

daftarTopik.appendChild(elemenBaru);
inputTopik.value = '';
console.log('Topik baru ditambahkan ke DOM:', teks);
});

// Event Delegation: Menangani klik selesai pada seluruh item li melalui induk ul
daftarTopik.addEventListener('click', (event) => {
if (event.target.tagName === 'LI') {
event.target.classList.toggle('selesai');
console.log('Status topik diubah:', event.target.textContent);
}
});"

>

</code-playground>

## Tabel Metode DOM dan Event Listener

<tabel-parameter>

| Metode / Properti    | Jenis Objek      | Tujuan Fungsional                                                  |
| :------------------- | :--------------- | :----------------------------------------------------------------- |
| `querySelector()`    | Dokumen / Elemen | Menemukan satu elemen pertama berbasis selektor CSS                |
| `textContent`        | Properti Elemen  | Membaca atau mengisi teks aman tanpa risiko eksekusi HTML          |
| `classList.toggle()` | Properti Elemen  | Menambahkan class jika belum ada, atau menghapusnya jika sudah ada |
| `createElement()`    | Dokumen          | Menciptakan elemen baru di memori sebelum ditempelkan ke DOM       |
| `appendChild()`      | Elemen Induk     | Menempelkan elemen anak baru di urutan paling akhir                |
| `preventDefault()`   | Objek Event      | Membatalkan aksi default peramban (seperti navigasi tautan)        |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Manipulasi DOM">

- **Menggunakan `innerHTML` untuk memasukkan input dari pengguna**: Memasukkan teks pengguna mentah ke dalam `innerHTML` membuka celah celaka keamanan _Cross-Site Scripting_ (XSS) di mana peretas dapat menyisipkan skrip pencuri cookie. Selalu gunakan `textContent` untuk teks murni.
- **Memasang ratusan event listener secara individual di dalam perulangan**: Menempelkan listener pada setiap baris dari tabel 1.000 baris memboroskan memori peramban. Terapkan teknik _Event Delegation_ pada elemen pembungkus tabel.
- **Mencoba memilih elemen sebelum DOM selesai dimuat**: Memanggil `document.querySelector` di bagian `<head>` sebelum HTML selesai dibaca akan mengembalikan nilai `null`. Pastikan skrip berada di akhir `<body>` atau beri atribut `defer`.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Kinerja dan Keamanan DOM">

1. Kumpulkan modifikasi elemen berulang ke dalam `document.createDocumentFragment()` terlebih dahulu sebelum ditempelkan ke DOM, guna menghindari _layout thrashing_ dan _reflow_ berlebihan.
2. Manfaatkan atribut data kustom (`data-*`) untuk menyimpan ID atau status yang dapat dibaca dengan mudah lewat properti `element.dataset`.
3. Bersihkan listener event (`removeEventListener`) jika Anda membuat aplikasi Single Page Application (SPA) yang membongkar-pasang komponen agar terhindar dari kebocoran memori (_memory leaks_).

</kotak-peringatan>

## Dukungan Browser

Semua metode API DOM standar (`querySelector`, `addEventListener`, `classList`, `createElement`) didukung penuh 100% oleh semua peramban web modern tanpa membutuhkan pustaka tambahan seperti jQuery.

## Topik Terkait

- [Teks dan Konten Dasar](/html/teks-dan-konten) - Struktur elemen dasar web.
- [Formulir dan Tipe Input](/html/formulir-dan-input) - Menangani event submit formulir.
- [Asinkron: Promise dan Fetch](/javascript/asinkron-dan-fetch) - Memperbarui DOM setelah data fetch tiba.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah kode JavaScript yang memilih elemen tombol `#tombol-ubah` dan saat tombol tersebut diklik, ubah teks elemen paragraf `#teks-target` menjadi "Teks Berhasil Diperbarui!".

<code-playground
id-contoh="latihan-dom-dasar"
judul="Latihan Mandiri: Manipulasi Teks DOM Sederhana"
:tab-tersedia="['html', 'js']"
kode-html="<button type='button' id='tombol-ubah'>Ubah Teks</button>
<p id='teks-target'>Teks Awal Belum Berubah</p>"
  kode-js="// Tuliskan penanganan event klik tombol di bawah ini
const tombol = document.getElementById('tombol-ubah');
const target = document.getElementById('teks-target');

tombol.addEventListener('click', () => {
// Ubah isi textContent dari elemen target di sini

});
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)_

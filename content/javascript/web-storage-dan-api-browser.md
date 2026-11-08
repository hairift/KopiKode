---
title: "Web Storage, Observer, dan Modern Browser APIs"
description: "Penyimpanan data sisi klien dengan localStorage dan sessionStorage, timer presisi, History API, serta pengamat elemen via IntersectionObserver."
kategori: "Asinkron dan DOM Browser"
---

## Ringkasan Konsep

Peramban web modern bukan lagi sekadar penampil dokumen teks, melainkan sistem operasi mini yang menyediakan serangkaian Application Programming Interfaces (Web APIs) canggih untuk menghadirkan pengalaman aplikasi berkualitas tinggi. Melalui **Web Storage API**, data pengguna seperti preferensi tema gelap dan status bookmark dapat disimpan secara persisten di peranti lokal pengguna tanpa membebani lalu lintas server. Selain itu, kehadiran API modern seperti **IntersectionObserver** memungkinkan pemantauan posisi elemen secara efisien demi optimasi pemuatan gambar lambat (_lazy loading_) dan pendeteksian daftar isi aktif (_scroll spy_) tanpa mengorbankan performa gulir layar.

## Sintaks Dasar

Format penyimpanan data lokal dan pemantauan viewport dengan IntersectionObserver:

```javascript
// Menyimpan preferensi pengguna ke dalam localStorage
const preferensiPengguna = {
  tema: "gelap",
  ukuranFont: "sedang",
};
localStorage.setItem("kopikode_pengaturan", JSON.stringify(preferensiPengguna));

// Membaca data tersimpan
const dataMentah = localStorage.getItem("kopikode_pengaturan");
const dataHasil = dataMentah ? JSON.parse(dataMentah) : null;

// Mengamati elemen yang masuk ke area layar (IntersectionObserver)
const pengamat = new IntersectionObserver(
  (daftarEntri) => {
    for (const entri of daftarEntri) {
      if (entri.isIntersecting) {
        console.log("Elemen mulai terlihat di layar:", entri.target.id);
      }
    }
  },
  { threshold: 0.5 },
);
```

## Penjelasan Bagian per Bagian

1. **Web Storage API (`localStorage` vs `sessionStorage`)**:
   - `localStorage`: Menyimpan data permanen di peramban pengguna tanpa batas waktu kedaluwarsa, bahkan setelah tab atau seluruh aplikasi peramban ditutup. Kapasitas rata-rata sekitar 5MB per domain.
   - `sessionStorage`: Menyimpan data sementara yang hanya hidup selama tab browser yang bersangkutan masih terbuka. Data otomatis terhapus seketika saat tab ditutup.
   - Metode Utama: `setItem(kunci, nilai)`, `getItem(kunci)`, `removeItem(kunci)`, dan `clear()`.
   - Batasan Data: Hanya dapat menyimpan string. Data berupa objek atau array wajib diubah ke JSON terlebih dahulu menggunakan `JSON.stringify()`.
2. **Timer dan Penjadwalan Frame**:
   - `setTimeout(fn, ms)` dan `clearTimeout(id)`: Menjalankan fungsi satu kali setelah jeda milidetik tertentu.
   - `setInterval(fn, ms)` dan `clearInterval(id)`: Menjalankan fungsi secara berulang secara periodik.
   - `requestAnimationFrame(fn)`: Menjadwalkan pembaruan animasi visual tepat sebelum peramban menggambar frame berikutnya di layar (60-120 FPS), jauh lebih hemat daya baterai dibanding `setInterval`.
3. **IntersectionObserver API**:
   Standar performa tinggi untuk mendeteksi apakah suatu elemen DOM sedang berada di dalam area pandang (_viewport_) pengguna atau terhalang elemen lain. Tidak memicu _reflow_ peramban, sangat ideal untuk _infinite scrolling_ dan penanda heading aktif.
4. **History API**:
   Mengelola riwayat navigasi peramban tanpa memicu muat ulang halaman (_full page reload_): `history.pushState(state, '', '/url-baru')` dan `history.replaceState()`, menjadi pilar utama sistem routing framework Single Page Application (SPA).
5. **Navigator Clipboard API**:
   API modern asinkron berbasis Promise untuk menyalin teks ke papan klip secara aman: `await navigator.clipboard.writeText('Teks');`.

## Contoh Kode Interaktif

Pelajari bagaimana data disimpan ke dalam localStorage dan dibaca kembali secara dinamis pada playground interaktif berikut:

<code-playground
id-contoh="demo-storage-js"
judul="Simulasi LocalStorage dan Manajemen Bookmark"
:tab-tersedia="['html', 'js']"
kode-html="<div class='wadah-storage'>
  <h3>Daftar Bookmark Materi Anggota</h3>

  <div class='baris-kendali'>
    <input type='text' id='input-materi' placeholder='Nama materi favorit...'>
    <button type='button' id='btn-simpan'>Simpan</button>
    <button type='button' id='btn-hapus' class='btn-bahaya'>Hapus Semua</button>
  </div>

  <ul id='daftar-bookmark'>
    <!-- Dirender oleh skrip -->
  </ul>
</div>"
  kode-css=".wadah-storage {
  font-family: system-ui, sans-serif;
  color: #221c18;
}
h3 {
  margin: 0 0 10px 0;
  color: #0284c7;
}
.baris-kendali {
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
  background-color: #0284c7;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.btn-bahaya {
  background-color: #b91c1c;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  padding: 8px 12px;
  background-color: #faf8f5;
  border: 1px solid #e5ddd3;
  border-radius: 6px;
  margin-bottom: 6px;
  font-size: 0.85rem;
}"
  kode-js="const inputMateri = document.getElementById('input-materi');
const btnSimpan = document.getElementById('btn-simpan');
const btnHapus = document.getElementById('btn-hapus');
const daftarUl = document.getElementById('daftar-bookmark');

const KUNCI_STORAGE = 'kopikode_demo_bookmark';

// Membaca data awal
function muatData() {
daftarUl.innerHTML = '';
const dataMentah = localStorage.getItem(KUNCI_STORAGE);
const daftar = dataMentah ? JSON.parse(dataMentah) : [];

if (daftar.length === 0) {
daftarUl.innerHTML = '<li style=\"color: #8c8075; font-style: italic;\">Belum ada materi yang dibookmark.</li>';
return;
}

daftar.forEach((judul) => {
const li = document.createElement('li');
li.textContent = `[Tersimpan] ${judul}`;
daftarUl.appendChild(li);
});
}

// Menyimpan materi baru
btnSimpan.addEventListener('click', () => {
const teks = inputMateri.value.trim();
if (!teks) return;

const dataMentah = localStorage.getItem(KUNCI_STORAGE);
const daftar = dataMentah ? JSON.parse(dataMentah) : [];

daftar.push(teks);
localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftar));

inputMateri.value = '';
muatData();
console.log('Bookmark berhasil disimpan ke localStorage:', teks);
});

// Menghapus seluruh data
btnHapus.addEventListener('click', () => {
localStorage.removeItem(KUNCI_STORAGE);
muatData();
console.log('Seluruh bookmark di localStorage telah dibersihkan.');
});

// Inisialisasi awal
muatData();"

>

</code-playground>

## Tabel Perbandingan Web Storage API

<tabel-parameter>

| Fitur               | `localStorage`                    | `sessionStorage`                  | Cookies                                         |
| :------------------ | :-------------------------------- | :-------------------------------- | :---------------------------------------------- |
| Durasi Penyimpanan  | Permanen hingga dihapus eksplisit | Terhapus saat tab browser ditutup | Ditentukan oleh atribut `Expires` / `Max-Age`   |
| Batas Kapasitas     | ~5 Megabita (MB) per asal domain  | ~5 Megabita (MB) per asal domain  | Sangat kecil: ~4 Kilobita (KB)                  |
| Dikirim ke Server   | **Tidak pernah**                  | **Tidak pernah**                  | Otomatis ikut di setiap HTTP Request header     |
| Aksesibilitas Skrip | Melalui `window.localStorage`     | Melalui `window.sessionStorage`   | Melalui `document.cookie` (jika tidak HttpOnly) |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Jebakan Web Storage dan Timer">

- **Menyimpan Token Sensitif / Kata Sandi di LocalStorage**: Data di dalam `localStorage` dapat dibaca oleh skrip JavaScript apa pun yang berjalan di halaman Anda. Jika situs Anda terserang celah XSS, token tersebut dapat dicuri peretas. Gunakan cookie bertanda `HttpOnly` untuk otentikasi penting.
- **Lupa menangani `JSON.parse` dengan try-catch**: Jika data di localStorage pernah rusak atau diedit secara manual oleh pengguna, memanggil `JSON.parse()` akan langsung melempar error `SyntaxError` yang dapat menghentikan seluruh aplikasi.
- **Menggunakan `setInterval` untuk animasi fisik**: `setInterval` tidak sinkron dengan laju penyegaran monitor (_refresh rate_). Menggerakkan elemen visual dengan interval dapat menyebabkan animasi tampak tersendat (_stuttering_). Selalu gunakan `requestAnimationFrame()`.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Kinerja dan Sinkronisasi Antar-Tab">

1. Dengarkan event jendela `window.addEventListener('storage', (e) => { ... })` untuk menyinkronkan perubahan preferensi (seperti pergantian tema gelap) secara seketika di seluruh tab browser lain yang sedang terbuka bersamaan.
2. Selalu gunakan `IntersectionObserver` untuk memuat gambar berat (_lazy loading_) saat gambar mulai berjarak 200px dari layar bawah pengguna: `{ rootMargin: '200px' }`.
3. Selalu bersihkan interval atau timeout yang sedang berjalan menggunakan `clearInterval(id)` saat komponen dilepas dari DOM untuk mencegah kebocoran memori.

</kotak-peringatan>

## Dukungan Browser

API `localStorage`, `sessionStorage`, `requestAnimationFrame`, `IntersectionObserver`, dan `History API` didukung penuh 100% oleh semua peramban desktop dan seluler modern di seluruh dunia.

## Topik Terkait

- [Variabel dan Tipe Data](/javascript/variabel-dan-tipe-data) - Serialisasi data JSON.
- [Manipulasi DOM dan Event Handling](/javascript/dom-dan-event) - Interaksi event peramban.
- [Asinkron: Promise dan Fetch](/javascript/asinkron-dan-fetch) - Pengambilan data asinkron.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah kode JavaScript sederhana yang menyimpan nilai string `'kopi-arabika'` ke dalam `localStorage` dengan nama kunci `'minuman_favorit'`, lalu baca kembali nilai tersebut menggunakan `localStorage.getItem()` dan cetak ke console.

<code-playground
id-contoh="latihan-storage-dasar"
judul="Latihan Mandiri: Menulis dan Membaca LocalStorage"
:tab-tersedia="['js']"
kode-js="// Tuliskan perintah setItem dan getItem di bawah ini
localStorage.setItem('minuman_favorit', 'kopi-arabika');

const tersimpan = localStorage.getItem('minuman_favorit');
console.log('Nilai yang terbaca dari storage:', tersimpan);
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)_

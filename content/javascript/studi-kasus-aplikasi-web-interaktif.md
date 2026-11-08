---
title: "Studi Kasus: Aplikasi Pengelola Data Interaktif dengan LocalStorage"
description: "Membangun aplikasi manajemen catatan dan tugas interaktif berbasis vanilla JavaScript, memanfaatkan arsitektur state terpusat, event delegation, dan persistensi LocalStorage."
kategori: "Studi Kasus dan Proyek Nyata"
---

## Ringkasan Konsep

Memahami sintaks dasar JavaScript adalah satu hal, tetapi merajut variabel, fungsi, event listener, manipulasi DOM, dan penyimpanan peramban menjadi satu kesatuan aplikasi yang bekerja utuh adalah tolok ukur kompetensi seorang pengembang frontend. Studi kasus ini menuntun Anda membangun aplikasi pengelola target belajar mandiri (Learning Goal Tracker). Aplikasi ini mendukung penambahan data secara dinamis, penandaan status selesai, penghapusan item, filter kategori, penghitungan progres otomatis, dan penyimpanan persisten di LocalStorage sehingga data tidak hilang saat halaman dimuat ulang.

## Sintaks Dasar

Pola arsitektur manajemen state terpusat (single state object) dalam vanilla JavaScript:

```javascript
// 1. Deklarasi State Terpusat
const stateAplikasi = {
  daftarTugas: JSON.parse(localStorage.getItem("kopi_tugas") || "[]"),
  filterAktif: "semua",
};

// 2. Fungsi Simpan State ke LocalStorage
function simpanKePenyimpanan() {
  localStorage.setItem("kopi_tugas", JSON.stringify(stateAplikasi.daftarTugas));
}

// 3. Fungsi Render Antarmuka Berdasarkan State (Data-Driven UI)
function renderDaftar() {
  const kontainer = document.getElementById("wadah-tugas");
  kontainer.innerHTML = "";

  const tugasTersaring = stateAplikasi.daftarTugas.filter((item) => {
    if (stateAplikasi.filterAktif === "selesai") return item.selesai;
    if (stateAplikasi.filterAktif === "belum") return !item.selesai;
    return true;
  });

  tugasTersaring.forEach((item) => {
    const el = document.createElement("li");
    el.className = item.selesai ? "item-selesai" : "item-aktif";
    el.dataset.id = item.id;
    el.innerHTML = `
      <input type="checkbox" ${item.selesai ? "checked" : ""} class="centang-status">
      <span>${item.judul}</span>
      <button type="button" class="tombol-hapus">Hapus</button>
    `;
    kontainer.appendChild(el);
  });
}
```

## Penjelasan Bagian per Bagian

1. `stateAplikasi`: Objek tunggal yang bertindak sebagai sumber kebenaran (single source of truth). Antarmuka pengguna (UI) hanyalah refleksi dari isi state ini. Setiap perubahan data dilakukan pada state terlebih dahulu sebelum memanggil fungsi `render()`.
2. `JSON.parse` dan `JSON.stringify`: Format pertukaran data yang wajib digunakan saat berinteraksi dengan `localStorage`, karena Web Storage API hanya mampu menyimpan nilai bertipe string teks murni.
3. Pola Render Murni (Data-driven rendering): Alih-alih memanipulasi elemen DOM satu per satu secara manual saat ada aksi pengguna, kita cukup memperbarui array data lalu memanggil fungsi `renderDaftar()`. Pendekatan ini adalah cikal bakal cara kerja framework modern seperti Vue dan React.
4. `Event Delegation`: Memasang satu event listener pada elemen kontainer induk `<ul>` alih-alih memasang puluhan listener pada setiap baris item baru. Ketika elemen anak di dalam kontainer diklik, kita memeriksa target klik menggunakan properti `e.target.classList`. Pendekatan ini sangat hemat alokasi memori peramban.
5. `dataset.id`: Mengaitkan identifier unik (timestamp `Date.now()`) pada setiap elemen HTML, memudahkan pencarian item yang bersangkutan di dalam array data saat tombol aksi ditekan.

## Contoh Kode Interaktif

Coba langsung aplikasi pengelola target belajar di bawah ini. Tambahkan tugas baru, centang untuk menandai selesai, beralih antar-filter, lalu perhatikan bagaimana ringkasan statistik diperbarui secara langsung:

<code-playground
id-contoh="demo-aplikasi-tugas"
judul="Aplikasi Pengelola Target Belajar KopiKode"
:tab-tersedia="['html', 'css', 'js']"
kode-html="<div class='aplikasi-wadah'>
  <div class='kepala-aplikasi'>
    <h2>Target Belajar Pemrograman</h2>
    <p>Kelola materi yang ingin Anda kuasai minggu ini.</p>
  </div>

  <!-- Form Tambah Target -->
  <form id='form-tugas' class='baris-input-tugas'>
    <input
      type='text'
      id='input-judul'
      placeholder='Contoh: Kuasai CSS Grid Layout...'
      required
    />
    <button type='submit' class='btn-tambah'>Tambah</button>
  </form>

  <!-- Baris Filter dan Statistik -->
  <div class='bilah-kontrol'>
    <div class='grup-filter'>
      <button type='button' class='btn-filter aktif' data-filter='semua'>Semua</button>
      <button type='button' class='btn-filter' data-filter='belum'>Belum</button>
      <button type='button' class='btn-filter' data-filter='selesai'>Selesai</button>
    </div>
    <span id='info-progres' class='teks-progres'>0 dari 0 selesai</span>
  </div>

  <!-- Daftar Target -->
  <ul id='daftar-target' class='daftar-tugas'></ul>

  <div id='pesan-kosong' class='kotak-kosong' style='display: none;'>
    Belum ada target di kategori ini. Tambahkan target baru di atas!
  </div>
</div>"
  kode-css="body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #faf8f5;
  color: #221c18;
  padding: 16px;
  margin: 0;
}
.aplikasi-wadah {
  max-width: 440px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #e5ddd3;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(34, 28, 24, 0.05);
}
.kepala-aplikasi h2 {
  margin: 0 0 4px 0;
  font-size: 1.25rem;
}
.kepala-aplikasi p {
  margin: 0 0 16px 0;
  font-size: 0.85rem;
  color: #5c5249;
}
.baris-input-tugas {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.baris-input-tugas input {
  flex-grow: 1;
  padding: 9px 12px;
  border: 1px solid #e5ddd3;
  border-radius: 8px;
  font-size: 0.875rem;
  background: #faf8f5;
}
.baris-input-tugas input:focus {
  outline: none;
  border-color: #0284c7;
  background: #ffffff;
}
.btn-tambah {
  padding: 9px 16px;
  background: #0284c7;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
}
.btn-tambah:hover {
  background: #0369a1;
}
.bilah-kontrol {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5ddd3;
  margin-bottom: 12px;
}
.grup-filter {
  display: flex;
  gap: 4px;
}
.btn-filter {
  padding: 4px 10px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #5c5249;
  cursor: pointer;
}
.btn-filter.aktif {
  background: #e0f2fe;
  color: #0369a1;
  border-color: #bae6fd;
}
.teks-progres {
  font-size: 0.75rem;
  font-weight: 600;
  color: #5c5249;
}
.daftar-tugas {
  list-style: none;
  padding: 0;
  margin: 0;
}
.item-tugas {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid #e5ddd3;
  border-radius: 8px;
  margin-bottom: 8px;
  background: #faf8f5;
  transition: background 0.15s ease;
}
.item-tugas:hover {
  background: #f5ede4;
}
.area-konten-tugas {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
}
.area-konten-tugas input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.teks-judul {
  font-size: 0.875rem;
  color: #221c18;
}
.item-tugas.selesai .teks-judul {
  text-decoration: line-through;
  color: #8c827a;
}
.btn-hapus {
  padding: 4px 8px;
  background: transparent;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.btn-hapus:hover {
  background: #fee2e2;
}
.kotak-kosong {
  padding: 24px 12px;
  text-align: center;
  font-size: 0.85rem;
  color: #8c827a;
  background: #faf8f5;
  border: 1px dashed #e5ddd3;
  border-radius: 8px;
}"
  kode-js="// Inisialisasi State Aplikasi
const state = {
  tugas: [
    { id: 1, judul: 'Pelajari Flexbox dan CSS Grid', selesai: true },
    { id: 2, judul: 'Pahami Alur Event Loop JavaScript', selesai: false },
    { id: 3, judul: 'Buat Formulir Aksesibel Standar WCAG', selesai: false }
  ],
  filter: 'semua'
};

const formTugas = document.getElementById('form-tugas');
const inputJudul = document.getElementById('input-judul');
const wadahDaftar = document.getElementById('daftar-target');
const infoProgres = document.getElementById('info-progres');
const pesanKosong = document.getElementById('pesan-kosong');
const tombolFilter = document.querySelectorAll('.btn-filter');

// Fungsi Render Berdasarkan State
function perbaruiTampilan() {
wadahDaftar.innerHTML = '';

const tersaring = state.tugas.filter((item) => {
if (state.filter === 'selesai') return item.selesai;
if (state.filter === 'belum') return !item.selesai;
return true;
});

if (tersaring.length === 0) {
pesanKosong.style.display = 'block';
} else {
pesanKosong.style.display = 'none';
tersaring.forEach((item) => {
const li = document.createElement('li');
li.className = 'item-tugas' + (item.selesai ? ' selesai' : '');
li.dataset.id = item.id;

      li.innerHTML = `
        <div class='area-konten-tugas'>
          <input type='checkbox' class='centang-item' ${item.selesai ? 'checked' : ''} />
          <span class='teks-judul'>${item.judul}</span>
        </div>
        <button type='button' class='btn-hapus'>Hapus</button>
      `;

      wadahDaftar.appendChild(li);
    });

}

// Hitung Statistik
const total = state.tugas.length;
const tuntas = state.tugas.filter((i) => i.selesai).length;
infoProgres.textContent = `${tuntas} dari ${total} selesai`;
}

// Tambah Tugas Baru
formTugas.addEventListener('submit', (e) => {
e.preventDefault();
const teks = inputJudul.value.trim();
if (!teks) return;

const tugasBaru = {
id: Date.now(),
judul: teks,
selesai: false
};

state.tugas.push(tugasBaru);
inputJudul.value = '';
perbaruiTampilan();
console.log('Target baru ditambahkan:', teks);
});

// Event Delegation untuk Centang dan Hapus
wadahDaftar.addEventListener('click', (e) => {
const itemLi = e.target.closest('.item-tugas');
if (!itemLi) return;
const idTarget = Number(itemLi.dataset.id);

if (e.target.classList.contains('centang-item')) {
const item = state.tugas.find((t) => t.id === idTarget);
if (item) {
item.selesai = e.target.checked;
perbaruiTampilan();
console.log('Status diubah:', item.judul, item.selesai);
}
} else if (e.target.classList.contains('btn-hapus')) {
state.tugas = state.tugas.filter((t) => t.id !== idTarget);
perbaruiTampilan();
console.log('Target dihapus dengan ID:', idTarget);
}
});

// Pergantian Filter
tombolFilter.forEach((btn) => {
btn.addEventListener('click', () => {
tombolFilter.forEach((b) => b.classList.remove('aktif'));
btn.classList.add('aktif');
state.filter = btn.dataset.filter;
perbaruiTampilan();
console.log('Filter aktif:', state.filter);
});
});

// Render awal
perbaruiTampilan();"
/>

## Atribut dan Metode Penting yang Digunakan

<tabel-parameter
  judul="Kompilasi Metode Manipulasi DOM dan Event"
  :daftar-kolom="['Metode / Properti', 'Deskripsi Operasi', 'Tujuan Teknis']"
  :data-baris="[
    ['e.target.closest(selektor)', 'Mencari leluhur terdekat yang cocok.', 'Mendapatkan elemen <li> induk saat tombol hapus atau checkbox diklik.'],
    ['element.dataset.id', 'Mengakses atribut data-id kustom.', 'Menghubungkan elemen antarmuka dengan identifier item pada array data.'],
    ['Array.prototype.filter()', 'Menyaring array tanpa memutasi array asli.', 'Menghasilkan daftar tugas yang sesuai dengan tab filter yang aktif.'],
    ['Date.now()', 'Menghasilkan timestamp milidetik.', 'Membuat ID unik yang sederhana tanpa membutuhkan pustaka UUID pihak ketiga.'],
    ['Array.prototype.find()', 'Mencari satu objek pertama yang cocok.', 'Menemukan item tugas tertentu untuk mengubah status selesainya.']
  ]"
/>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="bahaya" judul="Memasang Event Listener di Dalam Perulangan Render">
Jika Anda memasang `btn.addEventListener('click', ...)` di dalam perulangan fungsi `renderDaftar()`, maka setiap kali daftar dirender ulang, event listener baru akan ditambahkan berulang kali (memory leak). Hal ini dapat menyebabkan satu klik tombol memicu aksi berkali-kali. Gunakan teknik **Event Delegation** dengan memasang satu listener pada elemen kontainer induk `<ul>`.
</kotak-peringatan>

<kotak-peringatan tipe="peringatan" judul="Menyimpan Objek Langsung ke LocalStorage Tanpa Stringify">
LocalStorage hanya menerima tipe data string teks. Jika Anda menulis `localStorage.setItem('kunci', objek)`, peramban akan menyimpan string teks `[object Object]` yang tidak dapat dipulihkan kembali. Selalu gunakan `JSON.stringify(objek)` saat menyimpan, dan `JSON.parse(string)` saat membaca kembali.
</kotak-peringatan>

## Praktik Terbaik

1. **Pemisahan State dan Tampilan**: Jangan jadikan elemen DOM sebagai tempat penyimpanan data aplikasi Anda. Simpan data di variabel array objek JavaScript (State), lalu biarkan fungsi render menggambar ulang antarmuka berdasarkan kondisi state tersebut.
2. **Validasi Input**: Selalu bersihkan spasi kosong dengan `.trim()` sebelum menambahkan teks baru ke daftar, untuk mencegah penambahan item kosong tanpa judul.
3. **Aksesibilitas**: Pastikan elemen checkbox dapat difokuskan menggunakan tombol Tab dan dapat dicentang menggunakan tombol Spasi pada keyboard.

## Dukungan Browser

Semua metode yang digunakan (`closest()`, `dataset`, `JSON`, `localStorage`, metode array modern) beroperasi secara stabil di 100% peramban desktop dan seluler modern tanpa memerlukan pustaka eksternal.

## Topik Terkait

- [Array dan Metode Manipulasi](/javascript/array-dan-metode)
- [Manipulasi DOM dan Event Handling](/javascript/dom-dan-event)
- [Web Storage dan Modern Browser APIs](/javascript/web-storage-dan-api-browser)

## Latihan Mandiri

Buka playground di atas dan cobalah modifikasi berikut:

1. Hubungkan variabel `state.tugas` dengan `localStorage` sehingga ketika halaman di-refresh, daftar tugas yang telah ditambahkan atau dihapus tetap tersimpan.
2. Tambahkan tombol "Hapus Semua yang Selesai" (Clear Completed) di sebelah kanan baris filter.
3. Tambahkan fitur edit teks tugas saat teks judul diklik ganda (double click).

---

### Referensi Resmi

- [MDN Web Docs: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN Web Docs: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

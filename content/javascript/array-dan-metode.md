---
title: "Array dan Metode Manipulasi Data Modern"
description: "Operasi array deklaratif dengan map, filter, reduce, find, teknik destructuring, spread operator, dan prinsip immutability."
kategori: "Fungsi dan Struktur Data"
---

## Ringkasan Konsep

Array dalam JavaScript adalah struktur data berbasis daftar berindeks numerik yang digunakan untuk menyimpan kumpulan nilai dalam satu variabel tunggal. Pada pengembangan web modern, penanganan data daftar (seperti daftar produk e-commerce, daftar pengguna aktif, atau riwayat transaksi) hampir selalu bertumpu pada metode bawaan array tingkat tinggi (_Higher-Order Array Methods_). Metode modern seperti `map`, `filter`, dan `reduce` memungkinkan manipulasi data dilakukan secara deklaratif, ringkas, dan mematuhi prinsip imutabilitas (_immutability_) tanpa memodifikasi array aslinya.

## Sintaks Dasar

Format penulisan metode array modern yang paling sering digunakan dalam proyek:

```javascript
const daftarNilai = [70, 85, 90, 65, 95];

// Menyaring hanya nilai yang lulus (>= 75)
const nilaiLulus = daftarNilai.filter((nilai) => nilai >= 75);

// Mengubah setiap angka menjadi format string predikat
const labelPredikat = nilaiLulus.map((nilai) => `Nilai: ${nilai}`);

// Menghitung total rata-rata dengan reduce
const totalNilai = daftarNilai.reduce(
  (akumulator, nilai) => akumulator + nilai,
  0,
);
```

## Penjelasan Bagian per Bagian

1. **Prinsip Imutabilitas (_Immutability_)**:
   - Metode Non-Mutasi (Aman): `map`, `filter`, `reduce`, `slice`, `concat`. Metode ini menghasilkan array baru tanpa merusak array sumber.
   - Metode Mutasi (Mengubah Data Asli): `push`, `pop`, `shift`, `unshift`, `splice`. Berhati-hatilah saat menggunakan metode mutasi agar tidak memicu bug state tersembunyi.
2. **Metode Inti Paling Populer**:
   - `.map(fn)`: Mentransformasi setiap elemen menjadi bentuk data baru dengan panjang array yang tetap sama persis.
   - `.filter(fn)`: Menyaring elemen berdasarkan fungsi predikat yang mengembalikan nilai boolean (`true` untuk disimpan, `false` untuk disingkirkan).
   - `.reduce(fn, nilaiAwal)`: Menggulung seluruh elemen array menjadi satu nilai tunggal akumulasi (angka total, string, atau objek rangkuman).
   - `.find(fn)`: Mengembalikan butir elemen pertama yang memenuhi syarat (atau `undefined` jika tidak ada yang cocok).
   - `.some(fn)` dan `.every(fn)`: Memeriksa apakah minimal ada satu elemen (`some`) atau seluruh elemen (`every`) memenuhi kriteria kondisi.
3. **Destrukturisasi Array (_Array Destructuring_)**:
   Mengekstrak nilai array ke dalam variabel mandiri secara ringkas: `const [pertama, kedua] = daftar;`.
4. **Spread Operator (`...`)**:
   Membongkar elemen array untuk disalin (_shallow copy_) atau digabungkan: `const gabung = [...daftarA, ...daftarB];`.

## Contoh Kode Interaktif

Pelajari bagaimana metode array dapat dirangkai berantai (_method chaining_) untuk menyaring dan menghitung data pada playground berikut:

<code-playground
id-contoh="demo-array-js"
judul="Pengolahan Data Anggota dengan Map dan Filter"
:tab-tersedia="['js']"
kode-js="// Data anggota KSM kampus
const daftarMahasiswa = [
{ nama: 'Budi Santoso', skor: 88, jurusan: 'Informatika' },
{ nama: 'Siti Aminah', skor: 94, jurusan: 'Sistem Informasi' },
{ nama: 'Rian Pratama', skor: 62, jurusan: 'Informatika' },
{ nama: 'Dewi Lestari', skor: 78, jurusan: 'Teknik Komputer' }
];

console.log('--- Mahasiswa Informatika yang Lulus ---');

// Rangkaian filter dan map
const hasilSaring = daftarMahasiswa
.filter((mhs) => mhs.jurusan === 'Informatika' && mhs.skor >= 75)
.map((mhs) => `${mhs.nama} (Skor: ${mhs.skor})`);

console.log(hasilSaring);

// Menghitung rata-rata skor seluruh anggota dengan reduce
const totalSkorSemua = daftarMahasiswa.reduce((total, mhs) => total + mhs.skor, 0);
const rataRata = totalSkorSemua / daftarMahasiswa.length;

console.log('\nRata-rata skor seluruh anggota:', rataRata);

// Menemukan mahasiswa dengan nilai tertinggi
const mahasiswaTerbaik = daftarMahasiswa.find((mhs) => mhs.skor > 90);
console.log('Peraih skor di atas 90:', mahasiswaTerbaik?.nama);"

>

</code-playground>

## Tabel Metode Array Populer

<tabel-parameter>

| Metode       | Nilai Kembali                 | Apakah Mengubah Array Asli? | Fungsi Utama                                         |
| :----------- | :---------------------------- | :-------------------------- | :--------------------------------------------------- |
| `map()`      | Array baru hasil transformasi | Tidak                       | Mengubah bentuk seluruh data satu per satu           |
| `filter()`   | Array baru hasil penyaringan  | Tidak                       | Memilih data yang lolos kondisi logika               |
| `find()`     | Satu elemen atau `undefined`  | Tidak                       | Mengambil elemen pertama yang cocok                  |
| `reduce()`   | Nilai tunggal apa pun         | Tidak                       | Mengakumulasikan nilai dari kiri ke kanan            |
| `includes()` | Boolean (`true` / `false`)    | Tidak                       | Memeriksa keberadaan suatu nilai sederhana           |
| `splice()`   | Array elemen yang terhapus    | **Ya (Mutasi)**             | Menghapus atau menyisipkan elemen di posisi tertentu |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Mengolah Array">

- **Menggunakan `map` tanpa nilai balik (_return_)**: Jika Anda hanya ingin mengeksekusi instruksi per elemen tanpa butuh array hasil baru, gunakan `forEach` atau loop `for...of`. Menggunakan `map` tanpa return menghasilkan array berisi `undefined`.
- **Lupa memberikan nilai awal pada `reduce`**: Jika nilai awal (`initialValue`) ditiadakan, `reduce` akan memakai elemen indeks ke-0 sebagai akumulator awal. Ini dapat memicu error `TypeError` jika array ternyata dalam keadaan kosong.
- **Mengira metode `sort()` mengurutkan angka secara numerik**: Bawaan dari `[10, 5, 20].sort()` adalah konversi ke string, sehingga hasilnya adalah `[10, 20, 5]`! Selalu sediakan fungsi pembanding numerik: `.sort((a, b) => a - b)`.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Immutability dan Kinerja">

1. Selalu utamakan metode non-mutasi agar state aplikasi terhindar dari bug tersembunyi. Jika harus mengurutkan, gunakan metode modern `.toSorted()` atau salin dulu dengan spread: `[...data].sort()`.
2. Gunakan _Method Chaining_ secara teratur: `.filter().map()` untuk membuat alur transformasi data terbaca seperti kalimat bahasa manusia.
3. Manfaatkan _destructuring_ array untuk menukar posisi dua variabel tanpa penampung sementara: `[a, b] = [b, a];`.

</kotak-peringatan>

## Dukungan Browser

Semua metode array ES6 (`map`, `filter`, `reduce`, `find`, spread operator) didukung penuh 100% oleh seluruh peramban web modern.

## Topik Terkait

- [Fungsi dan Lingkup](/javascript/fungsi-dan-lingkup) - Arrow function sebagai argumen callback.
- [Objek dan Struktur Data](/javascript/objek-dan-struktur-data) - Array of objects dan Map.
- [Percabangan dan Perulangan](/javascript/kondisi-dan-perulangan) - Loop tradisional vs metode array.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah operasi `.filter()` pada array `daftarHarga` di bawah ini untuk hanya mengambil harga yang bernilai di bawah `25000`, lalu cetak hasilnya ke console.

<code-playground
id-contoh="latihan-array-dasar"
judul="Latihan Mandiri: Menyaring Menu Terjangkau"
:tab-tersedia="['js']"
kode-js="const daftarHarga = [18000, 32000, 22000, 45000, 15000];

// Tuliskan filter untuk harga < 25000 di bawah ini
const menuTerjangkau = daftarHarga; // Ganti bagian ini dengan .filter()

console.log('Daftar harga terjangkau:', menuTerjangkau);
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)_

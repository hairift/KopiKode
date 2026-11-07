---
title: "Percabangan dan Perulangan dalam JavaScript"
description: "Struktur kendali alur if-else, switch, operator ternary, perulangan for, while, for...of untuk koleksi data, serta instruksi break dan continue."
kategori: "Dasar Bahasa"
---

## Ringkasan Konsep

Program komputer menjadi bertenaga karena kemampuannya mengambil keputusan logis dan mengeksekusi serangkaian tugas berulang secara otomatis tanpa lelah. Dalam JavaScript, percabangan (_conditional branching_) memungkinkan skrip memilih jalur eksekusi kode yang berbeda berdasarkan terpenuhi atau tidaknya suatu syarat kondisi. Sementara itu, struktur perulangan (_loops_) bertugas mengulangi blok instruksi selama kondisi yang ditentukan masih bernilai benar, misalnya memproses ratusan data anggota kampus atau merender daftar kartu artikel web.

## Sintaks Dasar

Format penulisan percabangan `if-else` dan perulangan modern `for...of`:

```javascript
// Percabangan kondisi ganda
const nilaiUjian = 85;

if (nilaiUjian >= 90) {
  console.log("Predikat: Sangat Memuaskan");
} else if (nilaiUjian >= 75) {
  console.log("Predikat: Memuaskan");
} else {
  console.log("Predikat: Perlu Pendampingan Belajar");
}

// Perulangan modern melintasi elemen array
const daftarJalur = ["HTML", "CSS", "JavaScript"];
for (const jalur of daftarJalur) {
  console.log(`Mempelajari modul: ${jalur}`);
}
```

## Penjelasan Bagian per Bagian

1. **Percabangan `if`, `else if`, dan `else`**: Mengevaluasi ekspresi di dalam kurung menjadi nilai boolean. Blok kode di dalam kurung kurawal hanya dieksekusi jika kondisi tersebut bernilai _truthy_.
2. **Operator Ternary (`? :`)**: Notasi ringkas untuk percabangan dua arah satu baris. Format: `kondisi ? hasilJikaBenar : hasilJikaSalah`.
3. **Pernyataan `switch`**: Pilihan ideal jika Anda memiliki banyak cabang kondisi yang membandingkan satu variabel yang sama terhadap nilai-nilai diskret. Selalu sertakan `break` di akhir setiap cabang kasus agar tidak terjadi _fall-through_.
4. **Perulangan Klasik `for`**: Menggunakan penghitung (_counter_) dengan format tiga bagian: inisialisasi, syarat penghenti, dan inkremen penambahan: `for (let i = 0; i < batas; i++)`.
5. **Perulangan `while` dan `do...while`**: `while` memeriksa kondisi di awal sebelum eksekusi, sedangkan `do...while` menjamin blok kode dijalankan minimal satu kali sebelum kondisi diperiksa.
6. **Perulangan Modern `for...of`**: Cara paling bersih untuk mengulang butir elemen dari array, string, atau koleksi iterabel tanpa perlu repot mencatat indeks angka manual.
7. **Perulangan `for...in`**: Mengulang kunci (_keys/properties_) dari sebuah objek JavaScript.
8. **Instruksi `break` dan `continue`**:
   - `break`: Menghentikan seluruh proses perulangan seketika dan melompat ke luar loop.
   - `continue`: Melewati sisa instruksi pada putaran saat ini dan langsung melompat ke putaran perulangan berikutnya.

## Contoh Kode Interaktif

Coba langsung logika penyaringan nilai dan perulangan data anggota pada playground di bawah ini:

<code-playground
id-contoh="demo-kondisi-js"
judul="Logika Percabangan dan Iterasi Data"
:tab-tersedia="['js']"
kode-js="// Data nilai anggota KSM
const nilaiAnggota = [82, 65, 94, 70, 88];
let totalLulus = 0;

console.log('--- Evaluasi Nilai Anggota ---');

for (const nilai of nilaiAnggota) {
// Evaluasi menggunakan ternary operator
const status = nilai >= 75 ? 'Lulus' : 'Belum Lulus';

if (nilai >= 75) {
totalLulus++;
console.log(`Nilai ${nilai}: ${status}`);
} else {
console.warn(`Nilai ${nilai}: ${status} (Perlu remidi)`);
}
}

console.log(`\nTotal anggota yang lulus: ${totalLulus} dari ${nilaiAnggota.length} orang.`);"

>

</code-playground>

## Tabel Perbandingan Struktur Kendali

<tabel-parameter>

| Struktur      | Kapan Paling Tepat Digunakan                                    | Contoh Kasus Nyata                       |
| :------------ | :-------------------------------------------------------------- | :--------------------------------------- |
| `if-else`     | Kondisi dengan rentang nilai atau logika majemuk (`&&`, `\|\|`) | Menentukan kategori predikat nilai ujian |
| `switch-case` | Memeriksa kecocokan nilai pasti dari satu variabel              | Menangani pilihan aksi navigasi menu     |
| `for...of`    | Membaca seluruh elemen array dari awal hingga akhir             | Menampilkan daftar nama mahasiswa        |
| `for` klasik  | Membutuhkan nomor indeks atau melompat dengan langkah khusus    | Mengambil setiap data urutan genap       |
| `while`       | Jumlah perulangan tidak diketahui pasti sejak awal              | Membaca antrean pesan hingga kosong      |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Jebakan Perulangan dan Kondisi">

- **Perulangan Tanpa Akhir (_Infinite Loop_)**: Lupa menambahkan penambahan nilai counter (`i++`) pada loop `while` atau kondisi penghenti loop `for` yang tidak pernah bernilai false. Ini akan membekukan tab peramban pengguna (_hang/crash_).
- **Lupa Kata Kunci `break` pada `switch`**: Mengakibatkan peramban tetap mengeksekusi semua blok `case` di bawahnya meskipun nilainya tidak cocok (_unintended fall-through_).
- **Menggunakan `for...in` untuk membaca elemen Array**: `for...in` menghasilkan indeks bertipe string dan dapat mengulang properti prototipe yang tidak diinginkan. Untuk array, selalu gunakan `for...of` atau metode `.forEach()`.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Keterbacaan Alur Logika">

1. Gunakan pola _Guard Clauses_ (kembali lebih awal / early return): jika kondisi tidak valid, langsung keluar menggunakan `return` daripada menumpuk blok `if` bersarang hingga 4 tingkat.
2. Batasi penggunaan operator ternary hanya untuk satu baris ekspresi sederhana. Hindari menumpuk ternary berantai (_nested ternary_) karena sangat membingungkan rekan tim pembaca kode.
3. Selalu sediakan cabang `default` pada setiap pernyataan `switch` untuk menangani nilai masukan yang tidak terduga.

</kotak-peringatan>

## Dukungan Browser

Semua struktur percabangan dan perulangan standar ES6 (`for...of`, `switch`, ternary) didukung 100% oleh semua peramban web modern.

## Topik Terkait

- [Variabel dan Tipe Data](/javascript/variabel-dan-tipe-data) - Evaluasi truthy dan falsy.
- [Fungsi dan Lingkup](/javascript/fungsi-dan-lingkup) - Membungkus alur logika dalam fungsi.
- [Array dan Metode Manipulasi](/javascript/array-dan-metode) - Alternatif loop dengan map dan filter.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah perulangan `for` dari angka `1` sampai `5`. Jika angka saat ini bernilai `3`, lewati angka tersebut menggunakan instruksi `continue`, lalu cetak angka lainnya ke console.

<code-playground
id-contoh="latihan-kondisi-dasar"
judul="Latihan Mandiri: Perulangan dengan Continue"
:tab-tersedia="['js']"
kode-js="// Tuliskan perulangan for dengan continue di bawah ini
for (let angka = 1; angka <= 5; angka++) {
// Tambahkan pemeriksaan kondisi di sini
console.log('Angka:', angka);
}
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Making decisions in your code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals)_

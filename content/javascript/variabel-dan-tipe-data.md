---
title: "Variabel, Tipe Data, dan Operator JavaScript"
description: "Deklarasi let, const, var, tujuh tipe data primitif, konversi tipe otomatis, operator perbandingan presisi, dan operator logika."
kategori: "Dasar Bahasa"
---

## Ringkasan Konsep

JavaScript adalah bahasa pemrograman dinamis berpengetikan fleksibel (_dynamically typed language_) yang menjadi otak di balik interaktivitas peramban web modern. Memahami cara menyimpan informasi dalam variabel, mengenali karakteristik tipe data primitif dan referensi, serta menguasai logika operator adalah gerbang pertama dalam membangun alur program yang bebas dari bug. Standar ECMAScript modern (ES6+) menetapkan deklarasi `const` dan `let` sebagai standar mutlak guna menggantikan perilaku usang dari `var`.

## Sintaks Dasar

Format penulisan deklarasi variabel dan operasi dasar:

```javascript
// Deklarasi nilai konstan yang tidak boleh diubah
const namaSitus = "KopiKode";
const tahunBerdiri = 2026;

// Deklarasi variabel yang nilainya dapat dimutasi
let totalPengunjung = 120;
totalPengunjung += 1; // Nilai berubah menjadi 121

// Perbandingan kesetaraan presisi
const apakahSama = totalPengunjung === 121; // Menghasilkan boolean true
```

## Penjelasan Bagian per Bagian

1. **Aturan Deklarasi Variabel**:
   - `const`: Digunakan untuk nilai yang tidak akan pernah di-assign ulang. Wajib diutamakan sebagai pilihan default demi mencegah perubahan data yang tidak disengaja.
   - `let`: Digunakan jika nilai variabel memang direncanakan untuk diubah di masa mendatang (seperti counter perulangan atau penampung akumulasi). Memiliki lingkup blok (_block scope_).
   - `var`: Cara lama sebelum ES6. Memiliki lingkup fungsi (_function scope_) dan rentan masalah _hoisting_. Hindari penggunaan `var` pada proyek modern.
2. **Tujuh Tipe Data Primitif**:
   - `String`: Teks berkarakter, ditulis dengan tanda kutip tunggal (`'...'`), kutip ganda (`"..."`), atau backtick template literal (`` `...` ``).
   - `Number`: Angka bulat maupun desimal (contoh: `42`, `3.14`).
   - `BigInt`: Bilangan bulat sangat besar di luar batas `Number.MAX_SAFE_INTEGER`.
   - `Boolean`: Nilai logika kebenaran (`true` atau `false`).
   - `Undefined`: Variabel yang telah dideklarasikan namun belum pernah diberi nilai.
   - `Null`: Representasi sengaja dari ketiadaan nilai objek (_intentional absence of value_).
   - `Symbol`: Nilai unik yang tidak dapat diduplikasi, biasa dipakai sebagai kunci properti objek tersembunyi.
3. **Operator Perbandingan**:
   - Kesetaraan Ketat (`===` dan `!==`): Memeriksa nilai sekaligus tipe datanya tanpa konversi otomatis. Selalu gunakan operator ini.
   - Kesetaraan Longgar (`==` dan `!=`): Melakukan pemaksaan tipe (_type coercion_) otomatis yang sering menghasilkan perilaku janggal (contoh: `0 == ''` bernilai `true`).
4. **Operator Logika**:
   - Dan (`&&`): Bernilai `true` hanya jika kedua belah kondisi bernilai benar.
   - Atau (`||`): Bernilai `true` jika salah satu kondisi bernilai benar.
   - Bukan / Negasi (`!`): Membalikkan nilai boolean.
   - _Nullish Coalescing_ (`??`): Mengembalikan nilai kanan hanya jika sisi kiri bernilai `null` atau `undefined`.

## Contoh Kode Interaktif

Coba langsung manipulasi variabel dan amati pesan log yang dicetak ke panel Console terintegrasi di bawah ini:

<code-playground
id-contoh="demo-variabel-js"
judul="Eksplorasi Variabel dan Operator"
:tab-tersedia="['js']"
kode-js="// Deklarasi data anggota KSM
const namaAnggota = 'Budi Santoso';
const usiaAnggota = 20;
const statusAktif = true;

// Operasi matematika dan template literal
const tahunLahir = 2026 - usiaAnggota;
const pesanSapaan = `Halo ${namaAnggota}, Anda lahir sekitar tahun ${tahunLahir}.`;

console.log(pesanSapaan);
console.log('Tipe data namaAnggota:', typeof namaAnggota);
console.log('Tipe data usiaAnggota:', typeof usiaAnggota);
console.log('Apakah usia dewasa (>= 18):', usiaAnggota >= 18 && statusAktif);

// Uji coba kesetaraan ketat vs longgar
console.log('Perbandingan longgar (5 == \"5\"):', 5 == '5');
console.log('Perbandingan ketat (5 === \"5\"):', 5 === '5');"

>

</code-playground>

## Tabel Operator JavaScript

<tabel-parameter>

| Operator           | Simbol | Contoh Kode                        | Hasil Evaluasi |
| :----------------- | :----- | :--------------------------------- | :------------- |
| Penjumlahan String | `+`    | `'Kopi' + 'Kode'`                  | `'KopiKode'`   |
| Modulo (Sisa Bagi) | `%`    | `10 % 3`                           | `1`            |
| Pangkat            | `**`   | `2 ** 3`                           | `8`            |
| Kesetaraan Ketat   | `===`  | `'10' === 10`                      | `false`        |
| Operator Ternary   | `? :`  | `nilai >= 75 ? 'Lulus' : 'Remidi'` | `'Lulus'`      |
| Nullish Coalescing | `??`   | `null ?? 'Bawaan'`                 | `'Bawaan'`     |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Jebakan Tipe Data Pemula">

- **Menggunakan perbandingan longgar `==`**: Mengizinkan konversi tipe implisit peramban sering memicu kesalahan fatal, seperti `false == '0'` bernilai `true` atau `null == undefined` bernilai `true`. Selalu gunakan `===`.
- **Menetapkan ulang variabel `const`**: Mencoba menulis `const pi = 3.14; pi = 3.15;` akan langsung melempar galat `TypeError: Assignment to constant variable`. Jika nilainya harus berubah, gunakan `let`.
- **Salah memahami sifat `const` pada objek dan array**: Kata kunci `const` hanya mengunci referensi variabel, bukan isinya. Anda tetap bisa mengubah properti objek atau menambah isi array yang dideklarasikan dengan `const`.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Clean Code JavaScript">

1. Terapkan prinsip: gunakan `const` untuk 90% variabel Anda. Hanya beralih ke `let` jika Anda memang perlu melakukan re-assignment nilai (misalnya di dalam loop `for`).
2. Selalu gunakan _template literals_ (tanda backtick `` `Teks ${variabel}` ``) daripada penggabungan string bertingkat dengan tanda tambah (`"Teks " + variabel`) demi keterbacaan kode.
3. Hindari mendeklarasikan variabel tanpa kata kunci (`nama = 'Ali'`), karena tindakan ini otomatis menciptakan variabel global bocor (_leaked global_) yang merusak stabilitas aplikasi.

</kotak-peringatan>

## Dukungan Browser

Semua fitur dasar ES6+ seperti `let`, `const`, _template literals_, operator `**`, dan `??` didukung penuh oleh 100% peramban web modern tanpa memerlukan compiler Babel tambahan.

## Topik Terkait

- [Percabangan dan Perulangan](/javascript/kondisi-dan-perulangan) - Alur logika percabangan.
- [Fungsi dan Lingkup](/javascript/fungsi-dan-lingkup) - Lingkup variabel dan closure.
- [Array dan Metode Manipulasi](/javascript/array-dan-metode) - Mengolah kumpulan data.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah variabel konstan `hargaKopi` dengan nilai `18000` dan variabel `jumlahCangkir` dengan nilai `3`. Hitung total bayar dan cetak hasilnya ke console menggunakan `console.log` dan template literal.

<code-playground
id-contoh="latihan-variabel-dasar"
judul="Latihan Mandiri: Kalkulasi Total Pesanan"
:tab-tersedia="['js']"
kode-js="// Tuliskan kode perhitungan harga kopi di bawah ini
const hargaKopi = 18000;
const jumlahCangkir = 3;

// Hitung total dan cetak ke console
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)_

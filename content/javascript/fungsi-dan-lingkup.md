---
title: "Fungsi, Arrow Function, Scope, dan Closure"
description: "Deklarasi fungsi, arrow function modern, parameter default, lexical scope, konsep closure, serta pemahaman mekanisme hoisting."
kategori: "Fungsi dan Struktur Data"
---

## Ringkasan Konsep

Fungsi (_functions_) adalah blok pembangun fundamental dalam JavaScript yang mengemas serangkaian instruksi komputasi ke dalam satu wadah bernama agar dapat dipanggil berulang kali dari bagian mana pun dalam program. Di samping mengorganisir kode secara modular, fungsi di JavaScript berstatus sebagai _First-Class Citizens_, yang berarti fungsi dapat disimpan ke dalam variabel, dikirimkan sebagai argumen fungsi lain (_callback_), dan dikembalikan sebagai hasil eksekusi. Konsep lingkup variabel (_scope_) dan penguncian lingkungan leksikal (_closure_) adalah pilar paling krusial untuk menguasai arsitektur kode JavaScript tingkat lanjut.

## Sintaks Dasar

Perbandingan penulisan deklarasi fungsi tradisional dan _arrow function_ modern:

```javascript
// Deklarasi fungsi tradisional dengan parameter default
function hitungLuasPersegi(panjang = 0, lebar = 0) {
  return panjang * lebar;
}

// Arrow function modern dengan pengembalian nilai implisit
const kalikanDua = (angka) => angka * 2;

// Fungsi yang menghasilkan closure
function buatPencatatSkor(skorAwal = 0) {
  let skor = skorAwal;
  return () => {
    skor += 10;
    return skor;
  };
}
```

## Penjelasan Bagian per Bagian

1. **Deklarasi Fungsi (_Function Declaration_)**:
   - Ditulis diawali kata kunci `function namaFungsi()`.
   - Mengalami _hoisting_ penuh: Anda dapat memanggil fungsi di baris 1 meskipun fungsi tersebut baru dideklarasikan di baris 50 pada berkas yang sama.
2. **Ekspresi Fungsi dan Arrow Function (_Arrow Function_)**:
   - Diperkenalkan pada ES6: `const nama = (param) => { ... }`.
   - Jika fungsi hanya memiliki satu baris ekspresi pengembalian nilai, tanda kurung kurawal dan kata kunci `return` dapat dihilangkan (_implicit return_).
   - Mengikat nilai `this` secara leksikal dari lingkungan sekitarnya (tidak membuat konteks `this` sendiri).
3. **Parameter Default dan Rest Parameter**:
   - Parameter Default (`panjang = 10`): Memberikan nilai cadangan otomatis jika pemanggil fungsi tidak menyertakan argumen tersebut.
   - Rest Parameter (`...daftarArgumen`): Menampung sejumlah argumen tak terbatas ke dalam satu variabel bertipe array.
4. **Hierarki Lingkup Variabel (_Scope_)**:
   - Lingkup Global (_Global Scope_): Variabel dapat diakses dari mana saja.
   - Lingkup Fungsi (_Function Scope_): Variabel di dalam fungsi hanya hidup selama fungsi tersebut dieksekusi.
   - Lingkup Blok (_Block Scope_): Variabel `let` dan `const` hanya dapat diakses di dalam kurung kurawal `{}` tempat ia diciptakan (seperti di dalam blok `if` atau `for`).
5. **Konsep Closure**:
   Kemampuan sebuah fungsi anak untuk tetap mengingat dan mengakses variabel dari lingkup leksikal fungsi induknya, bahkan setelah fungsi induk tersebut telah selesai dieksekusi dan keluar dari tumpukan memori (_call stack_).

## Contoh Kode Interaktif

Pelajari bagaimana closure menyimpan status memori privat secara aman pada playground interaktif berikut:

<code-playground
id-contoh="demo-fungsi-js"
judul="Penerapan Arrow Function dan Closure"
:tab-tersedia="['js']"
kode-js="// Arrow function kalkulasi diskon
const hitungHargaAkhir = (hargaAsli, persenDiskon = 10) => {
const potongan = (hargaAsli * persenDiskon) / 100;
return hargaAsli - potongan;
};

console.log('Harga setelah diskon 10%:', hitungHargaAkhir(50000));
console.log('Harga setelah diskon 25%:', hitungHargaAkhir(50000, 25));

// Contoh Praktis Closure: Generator Penghitung Kopi
function buatKasirKopi() {
let jumlahCangkirTerjual = 0; // Variabel privat terkunci dalam closure

return {
tambahPesanan: () => {
jumlahCangkirTerjual++;
console.log(`Pesanan dicatat! Total cangkir saat ini: ${jumlahCangkirTerjual}`);
},
ambilTotal: () => jumlahCangkirTerjual
};
}

const kasirKSM = buatKasirKopi();
kasirKSM.tambahPesanan();
kasirKSM.tambahPesanan();
console.log('Rekapitulasi akhir cangkir:', kasirKSM.ambilTotal());"

>

</code-playground>

## Tabel Karakteristik Fungsi

<tabel-parameter>

| Fitur                        | Function Declaration                             | Arrow Function (`=>`)                          |
| :--------------------------- | :----------------------------------------------- | :--------------------------------------------- |
| Kenaikan Posisi (_Hoisting_) | Ya, dapat dipanggil sebelum baris deklarasi      | Tidak, harus dideklarasikan terlebih dahulu    |
| Konteks Kata Kunci `this`    | Dinamis, tergantung siapa pemanggilnya           | Leksikal, mewarisi `this` dari lingkungan luar |
| Pengembalian Implisit        | Tidak bisa, wajib menuliskan kata kunci `return` | Bisa, cukup `(a, b) => a + b`                  |
| Konstruktor Objek (`new`)    | Bisa dijadikan fungsi konstruktor                | Tidak bisa digunakan bersama kata kunci `new`  |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Menulis Fungsi">

- **Menggunakan arrow function untuk method objek yang butuh `this`**: Karena arrow function tidak memiliki konteks `this` sendiri, menulis `const user = { nama: 'Ali', sapa: () => console.log(this.nama) };` akan menghasilkan `undefined`. Gunakan sintaks method standar: `sapa() { console.log(this.nama); }`.
- **Lupa mengembalikan nilai (_return statement_)**: Fungsi yang tidak menuliskan `return` otomatis mengembalikan nilai `undefined`.
- **Memodifikasi variabel luar tanpa sengaja (_Impure Function_)**: Mengubah variabel global di dalam fungsi membuat kode sulit diuji dan memicu efek samping yang tak terduga (_side effects_). Usahakan fungsi bersifat murni (_pure function_).

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Clean Code Penulisan Fungsi">

1. Terapkan prinsip satu tanggung jawab (_Single Responsibility Principle_): satu fungsi sebaiknya hanya mengerjakan satu tugas spesifik dengan baik.
2. Manfaatkan parameter default daripada melakukan pengecekan manual dengan `if (!param)`.
3. Beri nama fungsi menggunakan kata kerja yang jelas dan deskriptif, contohnya: `hitungTotalHarga()`, `validasiEmailAnggota()`, bukan sekadar kata benda generik.

</kotak-peringatan>

## Dukungan Browser

Arrow functions, parameter default, dan rest parameters didukung penuh 100% oleh semua peramban web modern sejak rilis standar ES6 tahun 2015.

## Topik Terkait

- [Variabel dan Tipe Data](/javascript/variabel-dan-tipe-data) - Variabel let dan const dalam block scope.
- [Array dan Metode Manipulasi](/javascript/array-dan-metode) - Mengirim fungsi sebagai callback map dan filter.
- [Asinkron: Promise dan Async/Await](/javascript/asinkron-dan-fetch) - Fungsi asinkron modern.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah arrow function bernama `hitungPajak` yang menerima satu parameter `harga` dan mengembalikan nilai pajak sebesar 11% dari harga tersebut (`harga * 0.11`).

<code-playground
id-contoh="latihan-fungsi-dasar"
judul="Latihan Mandiri: Arrow Function Pajak"
:tab-tersedia="['js']"
kode-js="// Tuliskan arrow function hitungPajak di bawah ini

// Uji fungsi dengan nilai harga 100000
const hasilPajak = hitungPajak(100000);
console.log('Pajak PPN 11%:', hasilPajak);
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)_

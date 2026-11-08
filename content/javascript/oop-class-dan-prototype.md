---
title: "Pemrograman Berorientasi Objek dan Prototype JavaScript"
description: "Paradigma OOP di JavaScript, kata kunci this, pewarisan prototipe, sintaks class modern, konstruktor, pewarisan extends, dan field privat."
kategori: "Fungsi dan Struktur Data"
---

## Ringkasan Konsep

Pemrograman Berorientasi Objek (_Object-Oriented Programming_ / OOP) adalah paradigma rekayasa perangkat lunak yang mengorganisir logika program ke dalam bentuk objek yang menggabungkan status data (_properties_) dan perilaku aksi (_methods_). Di bawah kap mesinnya, JavaScript menerapkan sistem pewarisan berbasis prototipe (_Prototypal Inheritance_), di mana setiap objek terhubung ke rantai prototipe induknya. Standar modern ECMAScript (ES6+) melengkapinya dengan sintaks `class` yang elegan, memudahkan pengembang membangun struktur pewarisan (_extends_), polimorfisme, dan enkapsulasi privat (_private fields_) berskala perusahaan (_enterprise_).

## Sintaks Dasar

Format penulisan kelas modern dengan konstruktor, metode pewarisan, dan bidang privat:

```javascript
// Definisi kelas induk dengan field privat (#)
class AnggotaKSM {
  #nomorInduk; // Enkapsulasi privat: tidak bisa diakses dari luar kelas

  constructor(nama, nomorInduk) {
    this.nama = nama;
    this.#nomorInduk = nomorInduk;
    this.statusAktif = true;
  }

  // Getter publik
  get nomorIdentitas() {
    return this.#nomorInduk;
  }

  // Metode publik
  tampilkanProfil() {
    return `${this.nama} (${this.#nomorInduk})`;
  }
}

// Pewarisan kelas anak dengan extends dan super
class PengurusKSM extends AnggotaKSM {
  constructor(nama, nomorInduk, jabatan) {
    super(nama, nomorInduk); // Memanggil konstruktor kelas induk
    this.jabatan = jabatan;
  }

  tampilkanProfil() {
    return `${super.tampilkanProfil()} bertugas sebagai ${this.jabatan}`;
  }
}
```

## Penjelasan Bagian per Bagian

1. **Kata Kunci `this`**:
   Merujuk pada konteks objek yang sedang mengeksekusi metode saat ini:
   - Pada pemanggilan metode objek (`objek.metode()`): `this` merujuk pada `objek` tersebut.
   - Pada pemanggilan eksplisit: Kita dapat mengikat konteks `this` menggunakan `.bind()`, `.call()`, atau `.apply()`.
   - Pada arrow function: `this` diikat secara leksikal dari lingkungan luar tempat fungsi diciptakan.
2. **Rantai Prototipe (_Prototype Chain_)**:
   Setiap fungsi dan objek JavaScript memiliki properti tersembunyi `[[Prototype]]`. Saat Anda memanggil properti atau metode pada sebuah objek, peramban akan mencarinya pada objek itu sendiri terlebih dahulu. Jika tidak ditemukan, peramban akan menaiki rantai prototipe hingga mencapai `Object.prototype` sebelum mengembalikan `undefined`.
3. **Kelas Modern (_ES6 Classes_)**:
   - `constructor()`: Metode spesial yang otomatis dijalankan saat instansiasi objek baru menggunakan kata kunci `new`.
   - `extends`: Kata kunci untuk mewarisi seluruh properti dan metode dari kelas induk.
   - `super()`: Wajib dipanggil pada baris pertama konstruktor kelas turunan untuk menginisialisasi kelas induk.
4. **Enkapsulasi Privat (`#properti`)**:
   Fitur resmi modern JavaScript di mana penamaan properti yang diawali tanda pagar `#` menjamin data tersebut terisolasi murni di dalam tubuh kelas, mencegah manipulasi tak sengaja dari luar instansiasi.
5. **Metode Statis (_Static Methods_)**:
   Dideklarasikan diawali kata kunci `static`. Metode ini menempel langsung pada nama Kelas itu sendiri, bukan pada instansiasi objek (`Kelas.metodeBantu()`), sangat ideal untuk fungsi pembantu murni.

## Contoh Kode Interaktif

Pelajari bagaimana kelas turunan, pemanggilan `super()`, dan enkapsulasi privat berjalan pada playground interaktif berikut:

<code-playground
id-contoh="demo-oop-js"
judul="Simulasi OOP dan Hierarki Kelas Mahasiswa"
:tab-tersedia="['js']"
kode-js="// Kelas Induk: Mahasiswa
class Mahasiswa {
#kataSandi; // Privat

constructor(nama, nim, kataSandiAwal) {
this.nama = nama;
this.nim = nim;
this.#kataSandi = kataSandiAwal;
this.daftarNilai = [];
}

tambahNilai(nilai) {
this.daftarNilai.push(nilai);
console.log(`Nilai ${nilai} ditambahkan untuk ${this.nama}.`);
}

hitungRataRata() {
if (this.daftarNilai.length === 0) return 0;
const total = this.daftarNilai.reduce((acc, n) => acc + n, 0);
return Math.round(total / this.daftarNilai.length);
}

verifikasiAkses(sandiUji) {
return this.#kataSandi === sandiUji;
}
}

// Kelas Turunan: AsistenPraktikum
class AsistenPraktikum extends Mahasiswa {
constructor(nama, nim, kataSandi, laboratorium) {
super(nama, nim, kataSandi);
this.laboratorium = laboratorium;
}

beriTugas(judulTugas) {
console.log(`Asisten ${this.nama} (${this.laboratorium}) menerbitkan tugas: ${judulTugas}`);
}
}

// Instansiasi Objek
const asistenKopi = new AsistenPraktikum('Rian Pratama', '20260101', 'rahasia123', 'Lab Pemrograman Web');
asistenKopi.tambahNilai(85);
asistenKopi.tambahNilai(95);

console.log('Nama Asisten:', asistenKopi.nama);
console.log('Rata-rata Nilai:', asistenKopi.hitungRataRata());
asistenKopi.beriTugas('Membuat Layout CSS Grid');
console.log('Uji verifikasi sandi:', asistenKopi.verifikasiAkses('rahasia123'));"

>

</code-playground>

## Tabel Fitur Pemrograman Berorientasi Objek

<tabel-parameter>

| Fitur Kelas        | Sintaks                    | Peran Arsitektur                                                       |
| :----------------- | :------------------------- | :--------------------------------------------------------------------- |
| Konstruktor        | `constructor(p1, p2)`      | Menginisialisasi nilai properti awal instans baru                      |
| Pewarisan          | `class Anak extends Induk` | Mewarisi status dan method untuk efisiensi penggunaan ulang kode       |
| Konstruktor Induk  | `super(argumen)`           | Meneruskan argumen wajib ke konstruktor kelas leluhur                  |
| Enkapsulasi Privat | `#fieldPrivat`             | Mencegah modifikasi data sensitif dari luar modul                      |
| Metode Statis      | `static buatAkun()`        | Menyediakan fungsi utilitas tanpa perlu membuat objek instans baru     |
| Pengecekan Tipe    | `objek instanceof Kelas`   | Memverifikasi apakah objek merupakan turunan dari suatu kelas tertentu |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Jebakan OOP dan Konteks This">

- **Kehilangan konteks `this` saat mengirimkan method sebagai callback**: Menulis `tombol.addEventListener('click', objek.metode);` akan membuat `this` di dalam metode merujuk pada elemen tombol HTML, bukan objek aslinya. Solusi: ikat konteks dengan `.bind(this)` atau gunakan arrow function: `() => objek.metode()`.
- **Lupa memanggil `super()` pada kelas turunan**: Mencoba mengakses `this` di dalam konstruktor kelas turunan sebelum memanggil `super()` akan memicu galat kritis `ReferenceError: Must call super constructor in derived class before accessing 'this'`.
- **Mencoba membaca properti privat `#` dari luar**: Mengakses `instans.#field` secara langsung dari luar kelas akan memicu galat kompilasi sintaks (_SyntaxError_). Gunakan getter publik untuk membuka akses yang terkontrol.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Desain Pola Objek Bersih">

1. Utamakan komposisi dibanding pewarisan bertingkat (_Favor Composition over Inheritance_): Hindari membuat hierarki kelas anak yang terlalu dalam (> 3 tingkat) karena akan membuat kode rapuh terhadap perubahan.
2. Manfaatkan metode statis sebagai pabrik pembuatan objek (_Factory Pattern_), misalnya `Mahasiswa.dariDataJson(jsonString)` agar validasi data terpusat rapi.
3. Gunakan kata kunci `get` dan `set` untuk memvalidasi nilai masukan secara transparan saat properti diubah.

</kotak-peringatan>

## Dukungan Browser

Sintaks `class`, `extends`, dan `super` didukung penuh 100% oleh seluruh peramban modern. Fitur Private Class Fields (`#`) telah didukung secara stabil di semua browser utama (Chrome, Firefox, Safari, Edge) sejak tahun 2020.

## Topik Terkait

- [Fungsi, Arrow Function, dan Scope](/javascript/fungsi-dan-lingkup) - Konsep this dan arrow functions.
- [Objek dan Struktur Data Modern](/javascript/objek-dan-struktur-data) - Pembuatan objek literal.
- [Modul ES, Iterator, dan Generator](/javascript/modul-iterator-dan-generator) - Ekspor dan impor kelas antar berkas.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah kelas bernama `Persegi` dengan konstruktor yang menerima `sisi`, serta satu metode bernama `hitungLuas()` yang mengembalikan hasil perkalian `this.sisi * this.sisi`.

<code-playground
id-contoh="latihan-oop-dasar"
judul="Latihan Mandiri: Membuat Kelas Persegi"
:tab-tersedia="['js']"
kode-js="// Tuliskan definisi class Persegi di bawah ini

// Uji kelas
const kotak = new Persegi(6);
console.log('Luas persegi (sisi 6):', kotak.hitungLuas());
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Classes in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)_

---
title: "Objek, Map, Set, dan Struktur Data Modern"
description: "Pengelolaan objek JavaScript, akses properti dinamis, destrukturisasi, optional chaining, nullish coalescing, serta struktur data Map dan Set."
kategori: "Fungsi dan Struktur Data"
---

## Ringkasan Konsep

Objek (_Objects_) adalah struktur data paling serbaguna dalam JavaScript yang digunakan untuk memodelkan entitas dunia nyata melalui pasangan kunci dan nilai (_key-value pairs_). Berbeda dengan array yang diakses menggunakan indeks angka urut, properti objek diakses melalui nama kunci deskriptif. Di samping objek reguler, standar JavaScript modern melengkapinya dengan struktur data khusus: `Map` untuk pemetaan kunci berkinerja tinggi dengan tipe data bebas, serta `Set` untuk menampung kumpulan nilai unik tanpa duplikasi.

## Sintaks Dasar

Format deklarasi objek modern, destrukturisasi, dan penggunaan operator _optional chaining_:

```javascript
// Deklarasi objek literal
const profilPengguna = {
  nama: "Rian Pratama",
  posisi: "Koordinator Materi",
  sosial: {
    github: "rian-kopi",
  },
  sapaan() {
    return `Halo, saya ${this.nama}.`;
  },
};

// Destrukturisasi dengan nilai default
const { nama, posisi, status = "Aktif" } = profilPengguna;

// Akses aman dengan Optional Chaining (?.)
const akunTwitter = profilPengguna.sosial?.twitter ?? "Belum ditautkan";
```

## Penjelasan Bagian per Bagian

1. **Akses Properti**:
   - Notasi Titik (_Dot Notation_): `objek.namaProperti`, sangat nyaman dan ringkas jika nama kunci berupa identifier baku.
   - Notasi Kurung Siku (_Bracket Notation_): `objek['namaProperti']` atau `objek[variabelDinamis]`, wajib digunakan jika kunci properti memuat spasi, tanda hubung, atau berasal dari variabel dinamis.
2. **Destrukturisasi Objek (_Object Destructuring_)**:
   Mengekstrak properti objek langsung menjadi variabel lokal. Anda juga dapat mengubah nama variabelnya (_aliasing_): `const { nama: namaLengkap } = objek;`.
3. **Spread Operator Objek (`{ ...objek }`)**:
   Menyalin properti objek secara dangkal (_shallow copy_) atau menggabungkan beberapa objek sekaligus menimpa properti tertentu dengan elegan.
4. **Fitur Modern Penyelamat Galat**:
   - _Optional Chaining_ (`?.`): Mencegah terjadinya error fatal `Cannot read properties of undefined` saat mengakses properti bersarang yang belum tentu ada.
   - _Nullish Coalescing_ (`??`): Memberikan nilai alternatif cadangan hanya jika nilai yang diperiksa adalah `null` atau `undefined`.
5. **Metode Statis Objek**:
   - `Object.keys(obj)`: Mengembalikan array berisi seluruh nama kunci properti.
   - `Object.values(obj)`: Mengembalikan array berisi seluruh nilai data properti.
   - `Object.entries(obj)`: Mengembalikan array pasangan `[kunci, nilai]`.
6. **Struktur Data Khusus Modern**:
   - `Set`: Kumpulan nilai di mana setiap nilai dijamin unik 100%. Sangat populer untuk menghapus duplikasi dari array: `const arrayUnik = [...new Set(arrayDuplikat)];`.
   - `Map`: Pasangan kunci-nilai seperti objek, namun kuncinya boleh bertipe data apa pun (bahkan fungsi atau objek lain) serta urutan penambahannya terjamin presisi.

## Contoh Kode Interaktif

Pelajari cara kerja objek, manipulasi nilai, dan penghapusan duplikasi data menggunakan `Set` pada playground di bawah ini:

<code-playground
id-contoh="demo-objek-js"
judul="Eksplorasi Objek dan Koleksi Unik Set"
:tab-tersedia="['js']"
kode-js="// Objek data modul belajar
const modulBelajar = {
id: 'mod-01',
judul: 'Dasar Pemrograman Web',
mentor: {
nama: 'Budi Santoso',
kontak: {
email: 'budi@kampus.ac.id'
}
},
pesertaTerdaftar: 45
};

// Akses aman dengan optional chaining
const nomorTelepon = modulBelajar.mentor.kontak?.telepon ?? 'Tidak dicantumkan';
console.log('Email mentor:', modulBelajar.mentor.kontak.email);
console.log('Telepon mentor:', nomorTelepon);

// Iterasi properti objek dengan Object.entries
console.log('\n--- Daftar Properti Utama ---');
for (const [kunci, nilai] of Object.entries(modulBelajar)) {
if (typeof nilai !== 'object') {
console.log(`${kunci}: ${nilai}`);
}
}

// Menghapus data duplikat menggunakan Set
const daftarHadir = ['Budi', 'Siti', 'Budi', 'Rian', 'Siti', 'Dewi'];
const daftarHadirUnik = [...new Set(daftarHadir)];

console.log('\nDaftar Asli (Ada duplikat):', daftarHadir);
console.log('Daftar Bersih (Unik via Set):', daftarHadirUnik);"

>

</code-playground>

## Tabel Perbandingan Objek vs Map

<tabel-parameter>

| Kriteria                       | Objek Biasa (`{}`)                        | Struktur Data `Map` (`new Map()`)                      |
| :----------------------------- | :---------------------------------------- | :----------------------------------------------------- |
| Tipe Kunci (_Key Type_)        | Hanya String atau Symbol                  | Bebas tipe apa pun (Objek, Fungsi, Angka)              |
| Mengetahui Ukuran Data         | Harus manual lewat `Object.keys().length` | Langsung otomatis lewat properti `.size`               |
| Kinerja Penambahan/Penghapusan | Standar untuk data terstruktur            | Sangat cepat dan teroptimasi untuk sering tambah/hapus |
| Akses Nilai                    | `objek.kunci` atau `objek['kunci']`       | `map.get(kunci)` dan `map.set(kunci, nilai)`           |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Mengelola Objek">

- **Mengira penyalinan objek dengan tanda sama dengan (`b = a`) menghasilkan salinan baru**: Objek di JavaScript bersifat referensi memori (_reference type_). Jika Anda menulis `b = a; b.nama = 'Baru';`, maka nilai `a.nama` juga akan ikut berubah! Gunakan spread `{ ...a }` atau `structuredClone(a)`.
- **Lupa Optional Chaining pada data respons API**: Mengakses `data.pengguna.alamat.jalan` akan merusak seluruh aplikasi peramban jika server mengirimkan objek tanpa properti `alamat`. Selalu tulis `data.pengguna?.alamat?.jalan`.
- **Menghapus properti dengan memberi nilai `undefined`**: Menulis `obj.usia = undefined` tidak menghapus kunci `usia` dari objek. Kunci tersebut tetap ada di dalam `Object.keys()`. Gunakan kata kunci `delete obj.usia;`.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Arsitektur Data Objek">

1. Gunakan _Shallow Copy_ via spread `{ ...objekLama, modifikasi: baru }` untuk memperbarui state aplikasi secara imutabel.
2. Gunakan `structuredClone(objek)` jika Anda membutuhkan kloning objek bersarang secara mendalam (_deep clone_) tanpa pustaka tambahan.
3. Manfaatkan `Set` saat Anda butuh mengecek keberadaan suatu data bernilai jutaan baris menggunakan metode `.has()`, karena operasi tersebut berkecepatan instan O(1) dibanding array `.includes()` yang memakan waktu O(n).

</kotak-peringatan>

## Dukungan Browser

Destrukturisasi objek, spread operator, `Set`, dan `Map` didukung 100% oleh semua peramban modern. Fitur _Optional Chaining_ (`?.`) dan _Nullish Coalescing_ (`??`) telah stabil di seluruh browser sejak awal 2020.

## Topik Terkait

- [Variabel dan Tipe Data](/javascript/variabel-dan-tipe-data) - Tipe data primitif vs referensi.
- [Array dan Metode Manipulasi](/javascript/array-dan-metode) - Koleksi objek dalam array.
- [Manipulasi DOM dan Event Handling](/javascript/dom-dan-event) - Objek elemen dokumen web.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah objek `bukuCatatan` dengan properti `judul: 'Belajar JavaScript'` dan `halaman: 120`. Lakukan destrukturisasi untuk mengambil properti `judul` ke dalam variabel dan cetak hasilnya ke console.

<code-playground
id-contoh="latihan-objek-dasar"
judul="Latihan Mandiri: Destrukturisasi Objek"
:tab-tersedia="['js']"
kode-js="// Tuliskan deklarasi objek dan destrukturisasi di bawah ini
const bukuCatatan = {
judul: 'Belajar JavaScript',
halaman: 120
};

// Ambil judul dengan destrukturisasi dan cetak ke console
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)_

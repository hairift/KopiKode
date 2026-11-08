---
title: "Penanganan Error, Regular Expression, dan Objek Date"
description: "Membangun aplikasi tangguh dengan try-catch-finally, validasi pola string tingkat lanjut dengan Regex, serta manipulasi tanggal via Objek Date."
kategori: "Asinkron dan DOM Browser"
---

## Ringkasan Konsep

Dalam rekayasa perangkat lunak standar produksi, aplikasi tidak boleh tumbang atau menampilkan layar kosong saat terjadi kegagalan jaringan atau format input yang tidak diharapkan. Penanganan galat terstruktur (_Error Handling_) melalui blok `try...catch...finally` dan pembuatan kelas error kustom menjamin program dapat memulihkan diri secara anggun. Di samping itu, validasi data teks yang rumit (seperti format email kampus, kata sandi kuat, atau nomor telepon) diselesaikan secara efisien menggunakan **Regular Expression (Regex)**, sementara pencatatan linimasa waktu dikelola secara presisi oleh **Objek Date** bawaan peramban.

## Sintaks Dasar

Format penanganan error kustom, pengujian pola Regex, dan pembacaan tanggal:

```javascript
// Penanganan Error Terstruktur dengan try-catch
try {
  validasiKredensial(inputPengguna);
} catch (galat) {
  console.error(`[${galat.name}]: ${galat.message}`);
} finally {
  console.log("Pemeriksaan kredensial selesai dievaluasi.");
}

// Pola Regular Expression: Validasi email kampus
const polaEmailKampus = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.ac\.id$/;
const apakahValid = polaEmailKampus.test("mahasiswa@kampus.ac.id"); // true

// Objek Date dengan pelokalan Indonesia
const sekarang = new Date();
const formatTanggal = sekarang.toLocaleDateString("id-ID", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
```

## Penjelasan Bagian per Bagian

1. **Struktur Penanganan Error**:
   - `try`: Blok kode berisiko yang diawasi kemungkinan terjadinya kegagalan.
   - `catch (error)`: Blok yang otomatis dieksekusi jika terjadi pengecualian (_exception_) di dalam blok `try`. Objek error memuat properti `name`, `message`, dan `stack`.
   - `finally`: Blok yang dijamin **selalu dieksekusi** tanpa peduli apakah terjadi error atau sukses, sangat ideal untuk membersihkan koneksi atau mematikan indikator loading.
   - `throw new Error('Pesan')`: Memicu pengecualian secara sengaja saat validasi bisnis tidak terpenuhi.
2. **Kelas Galat Kustom (_Custom Error Class_)**:
   Mewarisi kelas bawaan `Error` (`class ValidasiInputError extends Error`) untuk membedakan galat validasi pengguna dari galat sistem server.
3. **Komponen Regular Expression (Regex)**:
   - Jangkar: `^` (awal teks) dan `$` (akhir teks).
   - Karakter Spesial: `\d` (angka), `\w` (alfanumerik), `\s` (spasi).
   - Kuantor: `+` (satu atau lebih), `*` (nol atau lebih), `?` (opsional nol atau satu), `{min,max}` (rentang jumlah).
   - Flag Populer: `i` (_case-insensitive_ abaikan huruf besar/kecil), `g` (_global_ temukan semua kecocokan).
   - Metode Pengujian:
     - `regex.test(string)`: Mengembalikan boolean `true` atau `false`.
     - `string.replace(regex, pengganti)`: Mengganti potongan pola teks.
     - `string.match(regex)`: Mengembalikan larik potongan teks yang cocok.
4. **Objek Date dan Waktu**:
   - `new Date()`: Mengambil waktu saat ini sesuai zona waktu komputer pengguna.
   - `Date.now()`: Mengembalikan cap waktu (_timestamp_) numerik dalam satuan milidetik sejak 1 Januari 1970 (Unix Epoch).
   - `toISOString()`: Format tanggal standar pertukaran data ISO 8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`).
   - `toLocaleDateString('id-ID')`: Memformat tanggal ke dalam Bahasa Indonesia resmi.

## Contoh Kode Interaktif

Pelajari bagaimana validasi regex, penangkapan error, dan manipulasi tanggal berkolaborasi pada playground interaktif berikut:

<code-playground
id-contoh="demo-regex-js"
judul="Validasi Formulir dan Pengolahan Waktu"
:tab-tersedia="['js']"
kode-js="// Kelas Error Khusus Aplikasi KopiKode
class ValidasiFormulirError extends Error {
constructor(pesan) {
super(pesan);
this.name = 'ValidasiFormulirError';
}
}

// Fungsi validasi email anggota
function periksaPendaftaran(nama, email) {
// Regex: Wajib format email valid
const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!nama || nama.trim().length < 3) {
throw new ValidasiFormulirError('Nama anggota minimal harus 3 karakter.');
}

if (!polaEmail.test(email)) {
throw new ValidasiFormulirError('Format alamat email yang dimasukkan tidak valid.');
}

return {
status: 'Valid',
nama: nama.trim(),
email: email.toLowerCase(),
waktuDaftar: new Date().toLocaleTimeString('id-ID')
};
}

// Uji kasus validasi dengan try-catch
console.log('--- Uji Kasus 1: Input Valid ---');
try {
const hasilSukses = periksaPendaftaran('Budi Santoso', 'budi@kampus.ac.id');
console.log('Pendaftaran Berhasil:', hasilSukses);
} catch (galat) {
console.error(`Peringatan: ${galat.message}`);
}

console.log('\n--- Uji Kasus 2: Email Tidak Valid ---');
try {
periksaPendaftaran('Rian', 'bukan-email-valid');
} catch (galat) {
console.error(`Tertangkap [${galat.name}]: ${galat.message}`);
} finally {
console.log('Siklus audit formulir tuntas dijalankan.');
}"

>

</code-playground>

## Tabel Ragam Karakter Khusus Regex

<tabel-parameter>

| Pola Regex    | Arti Simbol                                               | Contoh yang Cocok                               |
| :------------ | :-------------------------------------------------------- | :---------------------------------------------- |
| `^\d{4}$`     | Tepat 4 digit angka dari awal hingga akhir                | `'2026'`                                        |
| `[a-zA-Z]`    | Satu karakter huruf latin besar atau kecil                | `'K'` atau `'k'`                                |
| `[0-9]+`      | Satu atau lebih angka berurutan                           | `'12345'`                                       |
| `(?:...)`     | Grup pengelompokan non-capturing                          | Mengelompokkan tanpa menyimpan memori           |
| `(?=.*[A-Z])` | Positive Lookahead: Wajib memuat minimal satu huruf besar | Validasi aturan kata sandi kuat                 |
| `\b`          | Batas kata (_Word boundary_)                              | Menemukan kata utuh tanpa bagian dari kata lain |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Jebakan Error Handling dan Tanggal">

- **Menelan Error Secara Senyap (_Silent Failure_)**: Menuliskan blok `catch (e) {}` tanpa mencatat log atau memberi umpan balik kepada pengguna adalah praktik berbahaya yang membuat bug sulit dilacak. Minimal catat selalu dengan `console.error(e)`.
- **Bulan pada Objek Date Dimulai dari Angka Nol (0-Indexed)**: Di JavaScript, bulan Januari bernilai `0` dan Desember bernilai `11`. Menuliskan `new Date(2026, 5, 1)` berarti tanggal 1 **Juni** 2026, bukan Mei!
- **Regex Catastrophic Backtracking**: Menuliskan pola regex yang memuat kuantor bersarang seperti `(a+)+$` pada teks panjang dapat menyebabkan peramban macet total akibat kalkulasi eksponensial. Uji pola regex Anda secara seksama.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Validasi dan Waktu Produksi">

1. Selalu gunakan format waktu standar ISO 8601 (`date.toISOString()`) saat menyimpan atau mengirimkan tanggal ke server database untuk menghindari kerancuan zona waktu global.
2. Manfaatkan opsi `{ timeZone: 'Asia/Jakarta' }` pada `Intl.DateTimeFormat` atau `toLocaleDateString` untuk memastikan format waktu konsisten di peramban pengguna mana pun.
3. Selalu bersihkan teks masukan pengguna (_sanitize/trim_) sebelum mengujinya dengan ekspresi reguler.

</kotak-peringatan>

## Dukungan Browser

Blok penanganan error `try...catch...finally`, ekspresi reguler Regex, serta Objek Date dan API `Intl` didukung penuh 100% oleh seluruh peramban web modern di seluruh dunia.

## Topik Terkait

- [Variabel dan Tipe Data](/javascript/variabel-dan-tipe-data) - Tipe data primitif dan penulisan string.
- [Formulir dan Tipe Input Modern](/html/formulir-dan-input) - Validasi atribut pattern di HTML.
- [Asinkron: Promise dan Async/Await](/javascript/asinkron-dan-fetch) - Menangkap error jaringan fetch.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah pola Regular Expression bernama `polaHanyaAngka` yang memeriksa apakah sebuah string hanya terdiri dari digit angka saja dari awal hingga akhir (`^\d+$`), lalu uji teks `'2026'` dengan metode `.test()`.

<code-playground
id-contoh="latihan-regex-dasar"
judul="Latihan Mandiri: Validasi Angka dengan Regex"
:tab-tersedia="['js']"
kode-js="// Tuliskan pola regex di bawah ini
const polaHanyaAngka = /placeholder/; // Ganti dengan pola ^\\d+$

// Uji coba pola
const uji1 = polaHanyaAngka.test('2026');
const uji2 = polaHanyaAngka.test('Kopi2026');

console.log('Apakah \"2026\" hanya angka?:', uji1);
console.log('Apakah \"Kopi2026\" hanya angka?:', uji2);
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)_

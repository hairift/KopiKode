---
title: "Asinkron: Promise, Async/Await, dan Fetch API"
description: "Pola asinkron JavaScript, siklus Event Loop, manajemen Promise, penanganan galat try-catch dengan async/await, serta pengambilan data via Fetch API."
kategori: "Asinkron dan DOM Browser"
---

## Ringkasan Konsep

Secara arsitektur bawaan, mesin JavaScript adalah lingkungan eksekusi berulir tunggal (_single-threaded_), yang berarti ia hanya dapat menjalankan satu baris instruksi komputasi dalam satu waktu pada _Call Stack_. Apabila operasi yang membutuhkan waktu lama (seperti mengunduh data dari server atau membaca basis data) dijalankan secara sinkron, seluruh antarmuka peramban akan membeku dan tidak merespons klik pengguna. Untuk mengatasinya, JavaScript menerapkan pola eksekusi asinkron (_asynchronous_) berbasis _Event Loop_, di mana tugas yang memakan waktu didelegasikan ke latar belakang dan hasilnya ditangani melalui mekanisme modern `Promise` serta kata kunci elegan `async/await`.

## Sintaks Dasar

Pola modern pengambilan data API menggunakan kombinasi `async/await`, `fetch`, dan blok penanganan error `try...catch`:

```javascript
// Fungsi asinkron untuk mengambil data dari server
async function ambilDataMateri(slugMateri) {
  try {
    const respon = await fetch(`https://api.example.com/materi/${slugMateri}`);

    // Periksa status keberhasilan HTTP (kode 200-299)
    if (!respon.ok) {
      throw new Error(`Permintaan gagal dengan status: ${respon.status}`);
    }

    const dataJson = await respon.json();
    return dataJson;
  } catch (galat) {
    console.error("Terjadi kendala saat memuat materi:", galat.message);
    return null;
  } finally {
    console.log("Operasi fetch selesai dievaluasi.");
  }
}
```

## Penjelasan Bagian per Bagian

1. **Bagaimana Asinkron Bekerja (Event Loop)**:
   Instruksi asinkron (seperti `setTimeout` atau `fetch`) dialihkan dari Call Stack menuju Web APIs peramban. Begitu tugas selesai, fungsi balikan dimasukkan ke dalam _Microtask Queue_ (untuk Promise) atau _Task Queue_. Saat Call Stack dalam keadaan kosong, _Event Loop_ akan memindahkan fungsi tersebut kembali ke Call Stack untuk dieksekusi.
2. **Evolusi Promise**:
   Promise adalah objek yang mewakili penyelesaian atau kegagalan dari sebuah operasi asinkron di masa depan. Memiliki tiga status:
   - `Pending`: Status awal, operasi sedang berlangsung di latar belakang.
   - `Fulfilled` (Terpenuhi): Operasi sukses, menghasilkan nilai melalui panggilan `resolve(data)`.
   - `Rejected` (Ditolak): Operasi gagal, menghasilkan pesan galat melalui panggilan `reject(error)`.
3. **Async / Await (Gula Sintaksis Modern)**:
   - Kata kunci `async`: Diletakkan sebelum deklarasi fungsi, otomatis mengubah fungsi tersebut agar selalu mengembalikan sebuah objek Promise.
   - Kata kunci `await`: Hanya boleh dipakai di dalam fungsi `async`. Menginstruksikan JavaScript untuk menjeda eksekusi baris berikutnya hingga Promise selesai, membuat kode asinkron tampak bersih seperti kode sinkron berurutan.
4. **Fetch API Bawaan**:
   Antarmuka standar peramban untuk melakukan permintaan jaringan HTTP.
   - Mengembalikan Promise yang menghasilkan objek `Response`.
   - Mengubah biner respons menjadi objek JavaScript menggunakan `await respon.json()`.
5. **Eksekusi Asinkron Paralel (`Promise.all`)**:
   Menjalankan beberapa operasi fetch secara serentak bersamaan untuk memangkas waktu tunggu secara drastis dibanding memanggilnya satu per satu secara berurutan.

## Contoh Kode Interaktif

Coba langsung simulasi eksekusi Promise bertahap dan amati urutan waktu log di panel Console pada playground berikut:

<code-playground
id-contoh="demo-asinkron-js"
judul="Simulasi Async/Await dan Promise"
:tab-tersedia="['js']"
kode-js="// Fungsi simulasi jeda waktu berbasis Promise
const tungguDetik = (detik) => {
return new Promise((resolve) => setTimeout(resolve, detik * 1000));
};

// Fungsi simulasi pemanggilan data asinkron
async function simulasiMuatData() {
console.log('1. Memulai proses permintaan data materi...');

// Menunggu 1 detik di latar belakang tanpa membekukan antarmuka
await tungguDetik(1);
console.log('2. Server berhasil merespons paket data.');

// Menunggu pemrosesan parsing JSON selama 0.5 detik
await tungguDetik(0.5);
const dataHasil = {
id: 'html-01',
judul: 'Elemen Semantik HTML5',
status: 'Tersedia'
};

console.log('3. Data berhasil diuraikan:', dataHasil);
return dataHasil;
}

// Menjalankan fungsi asinkron
console.log('Instruksi sebelum fungsi asinkron dipanggil.');
simulasiMuatData().then(() => {
console.log('4. Seluruh alur asinkron selesai sepenuhnya.');
});
console.log('Instruksi sinkron setelahnya langsung dieksekusi tanpa menunggu!');"

>

</code-playground>

## Tabel Perbandingan Pola Asinkron

<tabel-parameter>

| Pola Asinkron            | Kelebihan Utama                                                 | Kelemahan Utama                                                      |
| :----------------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------- |
| Callback Tradisional     | Bawaan fungsi paling sederhana sejak awal JS                    | Memicu piramida kode bertingkat yang sulit dibaca (_Callback Hell_)  |
| Promise (`.then/.catch`) | Menghubungkan alur secara berantai (_chaining_)                 | Sintaks masih rentan berbelit jika terdapat banyak kondisi bersarang |
| `async` / `await`        | Kode terbaca lurus dan bersih, penanganan error via `try-catch` | Membutuhkan fungsi pembungkus bertanda `async`                       |
| `Promise.all()`          | Memanggil banyak request sekaligus secara paralel               | Jika ada satu saja yang gagal, seluruh kelompok dianggap rejected    |
| `Promise.allSettled()`   | Mengembalikan hasil seluruh request tanpa takut ada yang gagal  | Membutuhkan penyaringan manual atas status masing-masing hasil       |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Jebakan Asinkron dan Fetch API">

- **Lupa bahwa `fetch()` tidak menolak Promise pada status error 404 atau 500**: Peramban hanya menganggap `fetch()` gagal (_reject_) jika terjadi kendala fisik jaringan (seperti koneksi terputus). Error status HTTP 404 atau 500 tetap dianggap sukses (_resolve_). Selalu periksa `if (!respon.ok) throw new Error(...)`.
- **Lupa menambahkan kata kunci `await`**: Menulis `const data = respon.json();` tanpa `await` akan menyimpan objek Promise yang masih mentah, bukan data objek aslinya.
- **Menggunakan `await` di dalam loop `forEach`**: Metode array bawaan `.forEach()` tidak dirancang untuk menunggu operasi `await`. Gunakan perulangan modern `for...of` jika Anda perlu menjalankan `await` satu per satu di dalam loop.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Menangani Permintaan Jaringan">

1. Selalu bungkus pemanggilan `await` di dalam blok `try...catch` agar kegagalan jaringan tertangkap dengan anggun tanpa memicu _Uncaught Promise Rejection_ di console peramban.
2. Gunakan `Promise.all([fetchA(), fetchB()])` jika Anda membutuhkan dua data yang tidak saling bergantung agar kedua permintaan berjalan serentak.
3. Selalu tampilkan indikator visual status muat (_loading state_) pada antarmuka web selama operasi asinkron berlangsung demi kenyamanan pengguna.

</kotak-peringatan>

## Dukungan Browser

Objek `Promise`, kata kunci `async/await`, dan antarmuka `fetch()` didukung penuh 100% oleh semua peramban desktop dan seluler modern.

## Topik Terkait

- [Fungsi dan Lingkup](/javascript/fungsi-dan-lingkup) - Arrow function dan penanganan callback.
- [Manipulasi DOM dan Event Handling](/javascript/dom-dan-event) - Merender data hasil fetch ke layar.
- [Variabel dan Tipe Data](/javascript/variabel-dan-tipe-data) - Pengolahan objek JSON.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah fungsi asinkron bernama `ambilPesanRahasia` yang menunggu selama `1` detik menggunakan `new Promise(r => setTimeout(r, 1000))`, lalu mengembalikan teks string "KopiKode Siap Beraksi!".

<code-playground
id-contoh="latihan-asinkron-dasar"
judul="Latihan Mandiri: Membuat Fungsi Async Sederhana"
:tab-tersedia="['js']"
kode-js="// Tuliskan fungsi async ambilPesanRahasia di bawah ini

// Uji fungsi
ambilPesanRahasia().then((pesan) => {
console.log('Hasil pesan:', pesan);
});
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: How to use promises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)_

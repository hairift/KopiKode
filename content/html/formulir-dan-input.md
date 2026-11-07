---
title: "Formulir dan Tipe Input Modern HTML5"
description: "Panduan membangun antarmuka formulir interaktif dengan form, label, beragam tipe input, select, textarea, fieldset, dan validasi bawaan."
kategori: "Formulir dan Interaktivitas"
---

## Ringkasan Konsep

Formulir HTML adalah komponen utama yang menghubungkan interaksi pengguna dengan server atau logika aplikasi JavaScript. Melalui formulir, pengguna dapat memasukkan data seperti teks pendaftaran, memilih opsi tanggal, mengunggah berkas portofolio, hingga mengirimkan survei masukan. Standar HTML5 memperkaya formulir dengan serangkaian tipe input khusus dan mesin validasi otomatis di sisi klien (client-side validation), sehingga peramban dapat mencegah pengiriman data yang salah sebelum menyentuh sisi server.

## Sintaks Dasar

Contoh struktur formulir pendaftaran anggota dengan pengelompokan semantik yang aman:

```html
<form action="/api/daftar" method="POST">
  <fieldset>
    <legend>Informasi Akun</legend>

    <div class="bidang-input">
      <label for="nama-lengkap">Nama Lengkap:</label>
      <input type="text" id="nama-lengkap" name="nama" required minlength="3" />
    </div>

    <div class="bidang-input">
      <label for="email-anggota">Alamat Email:</label>
      <input
        type="email"
        id="email-anggota"
        name="email"
        required
        placeholder="nama@kampus.ac.id"
      />
    </div>

    <div class="bidang-input">
      <label for="minat-jalur">Pilihan Jalur Belajar:</label>
      <select id="minat-jalur" name="jalur" required>
        <option value="" disabled selected>Pilih salah satu jalur...</option>
        <option value="frontend">Frontend Web Development</option>
        <option value="backend">Backend Engineering</option>
      </select>
    </div>
  </fieldset>

  <button type="submit">Kirim Pendaftaran</button>
</form>
```

## Penjelasan Bagian per Bagian

1. `<form>`: Pembungkus seluruh kontrol formulir. Atribut `action` menentukan URL tujuan pengiriman data, sedangkan `method` menentukan metode HTTP yang dipakai (`GET` atau `POST`).
2. `<label>`: Label teks yang mendeskripsikan tujuan dari suatu input. Atribut `for` pada label wajib memiliki nilai yang sama persis dengan atribut `id` pada elemen input pasangannya.
3. `<input>`: Elemen serbaguna untuk menerima input. Karakteristik perilakunya ditentukan oleh atribut `type`:
   - `type="text"`: Input teks satu baris standar.
   - `type="email"`: Otomatis memvalidasi format alamat surel yang benar.
   - `type="password"`: Menyembunyikan karakter yang diketikkan pengguna demi privasi.
   - `type="number"`: Hanya menerima angka, dilengkapi tombol panah nilai naik-turun.
   - `type="date"`: Menampilkan komponen pemilih kalender interaktif bawaan peramban.
   - `type="checkbox"`: Pilihan kotak centang mandiri (dapat memilih lebih dari satu).
   - `type="radio"`: Pilihan tunggal dari sekelompok opsi (semua tombol berbagi nilai `name` yang sama).
   - `type="file"`: Mengunggah berkas lokal dari komputer atau ponsel pengguna.
4. `<select>` dan `<option>`: Menu daftar pilihan dropdown yang hemat ruang.
5. `<textarea>`: Bidang input teks multibaris untuk pesan panjang atau deskripsi.
6. `<fieldset>` dan `<legend>`: Mengelompokkan bidang formulir yang saling berkaitan secara visual dan semantik.
7. `<button type="submit">`: Tombol resmi untuk memicu validasi dan pengiriman formulir.

## Contoh Kode Interaktif

Coba langsung formulir pendaftaran anggota KSM di bawah ini. Ujilah fitur validasi bawaan dengan mengosongkan nama atau mengisi email yang salah:

<code-playground
id-contoh="demo-form-html"
judul="Formulir Pendaftaran Interaktif KopiKode"
:tab-tersedia="['html', 'css']"
kode-html="<form onsubmit='event.preventDefault(); alert(\"Data valid dan siap diproses!\");'>
  <div class='grup'>
    <label for='nama'>Nama Lengkap</label>
    <input type='text' id='nama' name='nama' required minlength='3' placeholder='Contoh: Budi Santoso'>
  </div>

  <div class='grup'>
    <label for='email'>Email Kampus</label>
    <input type='email' id='email' name='email' required placeholder='budi@mahasiswa.ac.id'>
  </div>

  <div class='grup'>
    <label for='pengalaman'>Tingkat Pemahaman Web</label>
    <select id='pengalaman' name='pengalaman' required>
      <option value=''>Pilih level...</option>
      <option value='pemula'>Pemula (Baru mulai)</option>
      <option value='menengah'>Menengah (Paham dasar HTML/CSS)</option>
    </select>
  </div>

  <div class='grup-centang'>
    <input type='checkbox' id='setuju' name='setuju' required>
    <label for='setuju'>Saya bersedia mengikuti jadwal latihan mingguan.</label>
  </div>

<button type='submit'>Kirim Formulir</button>
</form>"
  kode-css="form {
  font-family: system-ui, sans-serif;
  max-width: 400px;
  color: #221c18;
}
.grup {
  margin-bottom: 14px;
}
label {
  display: block;
  font-size: 0.825rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #5c5249;
}
input[type='text'],
input[type='email'],
select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e5ddd3;
  border-radius: 6px;
  font-size: 0.875rem;
  background: #faf8f5;
  box-sizing: border-box;
}
input:focus, select:focus {
  outline: none;
  border-color: #0284c7;
  background: #ffffff;
}
.grup-centang {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.grup-centang label {
  margin-bottom: 0;
  font-weight: normal;
  font-size: 0.8rem;
}
button {
  background: #0284c7;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}"
>
</code-playground>

## Tabel Atribut Validasi Formulir

<tabel-parameter>

| Atribut Validasi          | Tipe Input yang Mendukung               | Arti dan Perilaku                                                                        |
| :------------------------ | :-------------------------------------- | :--------------------------------------------------------------------------------------- |
| `required`                | Semua input umum, select, textarea      | Kolom tidak boleh dikirimkan dalam keadaan kosong                                        |
| `minlength` / `maxlength` | `text`, `email`, `password`, `textarea` | Menentukan batas minimum dan maksimum jumlah karakter                                    |
| `min` / `max`             | `number`, `date`, `range`               | Menentukan batas nilai numerik atau rentang tanggal yang diizinkan                       |
| `pattern`                 | `text`, `email`, `tel`, `password`      | Pola regular expression (Regex) yang wajib dipenuhi oleh nilai input                     |
| `placeholder`             | `text`, `email`, `password`, `textarea` | Teks contoh petunjuk sementara di dalam kotak sebelum diketik                            |
| `autocomplete`            | Hampir semua input                      | Memberikan instruksi kepada peramban cara mengisi otomatis (`email`, `current-password`) |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Desain Formulir">

- **Mengganti `<label>` dengan `placeholder`**: Placeholder akan lenyap seketika begitu pengguna mulai mengetik, sehingga pengguna lupa apa yang sedang mereka isi. Selain itu, pembaca layar sering mengabaikan placeholder. Selalu sediakan elemen `<label>` yang eksplisit.
- **Lupa menghubungkan atribut `for` dan `id`**: Jika Anda tidak memasangkan `<label for="x">` dengan `<input id="x">`, mengeklik teks label tidak akan mengarahkan kursor ke dalam kotak input, yang sangat menyulitkan pengguna gawai berlayar sentuh.
- **Hanya mengandalkan validasi HTML**: Validasi di browser mudah dimatikan atau dilewati oleh pengguna jahat. Validasi sisi klien HTML hanya untuk kenyamanan pengguna (UX), sedangkan validasi sisi server tetap wajib ada.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Aksesibilitas dan Pengalaman Pengguna">

1. Saat membuat formulir unggah berkas (`type="file"`), jangan lupa menambahkan atribut `enctype="multipart/form-data"` pada tag pembuka `<form>` agar biner berkas terkirim dengan benar ke server.
2. Manfaatkan atribut `inputmode="numeric"` jika Anda ingin memunculkan keypad angka di ponsel untuk input kode OTP tanpa memicu tombol panah dari `type="number"`.
3. Kelompokkan tombol radio dengan `name` yang sama agar pengguna hanya bisa memilih satu opsi secara otomatis.

</kotak-peringatan>

## Dukungan Browser

Semua tipe input HTML5 dan atribut validasi didukung penuh oleh peramban modern di desktop maupun platform seluler (Android dan iOS).

## Topik Terkait

- [Teks dan Konten Dasar](/html/teks-dan-konten) - Heading dan paragraf pengantar form.
- [Elemen Semantik Modern](/html/elemen-semantik) - Pengelompokan bagian dengan section.
- [Aksesibilitas dan ARIA](/html/aksesibilitas-dan-aria) - Atribut aria-required dan aria-invalid.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah formulir sederhana yang memuat sebuah input nomor telepon (`type="tel"`) dengan atribut `required` dan sebuah label yang terhubung rapi dengan atribut `for`.

<code-playground
id-contoh="latihan-form-dasar"
judul="Latihan Mandiri: Input Nomor Telepon"
:tab-tersedia="['html']"
kode-html="<!-- Tuliskan formulir nomor kontak di bawah ini -->
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Your first HTML form](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_form)_

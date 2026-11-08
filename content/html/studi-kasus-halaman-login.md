---
title: "Studi Kasus: Formulir Login dan Registrasi Aksesibel"
description: "Panduan membangun antarmuka autentikasi lengkap dengan semantik HTML5, pengelolaan autofill, validasi interaktif, dan standar aksesibilitas peramban."
kategori: "Studi Kasus dan Proyek Nyata"
---

## Ringkasan Konsep

Halaman login dan pendaftaran akun merupakan gerbang utama antarmuka pengguna pada hampir seluruh produk digital di industri perangkat lunak. Meskipun tampak sederhana, formulir autentikasi yang buruk sering kali membingungkan pengguna, memicu kegagalan pengisian otomatis (password manager autofill), dan tidak ramah bagi pengguna teknologi asistif (screen reader). Studi kasus ini merangkum teknik perancangan formulir autentikasi standar industri yang aman, nyaman digunakan di layar ponsel, memiliki struktur semantik yang benar, dan memenuhi kriteria WCAG AA.

## Sintaks Dasar

Struktur kerangka semantik untuk formulir login lengkap dengan penanda autofill:

```html
<main class="wadah-autentikasi">
  <section class="kartu-login" aria-labelledby="judul-login">
    <h1 id="judul-login">Masuk ke Akun Anda</h1>
    <p>Gunakan kredensial kampus untuk mengakses portal belajar.</p>

    <form action="/api/login" method="POST" novalidate>
      <div class="bidang-input">
        <label for="input-surel">Alamat Surel atau Nama Pengguna</label>
        <input
          type="email"
          id="input-surel"
          name="username"
          autocomplete="username"
          inputmode="email"
          autocapitalize="none"
          spellcheck="false"
          required
          aria-describedby="petunjuk-surel"
        />
        <span id="petunjuk-surel" class="pesan-petunjuk">
          Contoh: nama@kampus.ac.id
        </span>
      </div>

      <div class="bidang-input">
        <div class="baris-label">
          <label for="input-sandi">Kata Sandi</label>
          <a href="/lupa-sandi" class="tautan-bantuan">Lupa kata sandi?</a>
        </div>
        <div class="bungkus-sandi">
          <input
            type="password"
            id="input-sandi"
            name="password"
            autocomplete="current-password"
            required
            minlength="8"
          />
          <button
            type="button"
            id="tombol-intip-sandi"
            aria-label="Tampilkan kata sandi"
            aria-pressed="false"
          >
            Lihat
          </button>
        </div>
      </div>

      <div class="bidang-centang">
        <input type="checkbox" id="ingat-saya" name="remember" />
        <label for="ingat-saya">Ingat sesi saya di perangkat ini</label>
      </div>

      <button type="submit" class="tombol-primer">Masuk Sekarang</button>
    </form>
  </section>
</main>
```

## Penjelasan Bagian per Bagian

1. `<main>` dan `<section aria-labelledby="judul-login">`: Membungkus konten autentikasi sebagai area utama halaman. Penggunaan `aria-labelledby` menghubungkan kontainer section dengan heading utama `<h1>` secara eksplisit bagi screen reader.
2. `novalidate`: Atribut opsional pada form jika validasi interaktif dikendalikan oleh skrip JavaScript khusus, mencegah tooltip balon bawaan peramban yang sering kali sulit disesuaikan gayanya.
3. `autocomplete="username"` dan `autocomplete="current-password"`: Atribut krusial yang memberi sinyal pada pengelola kata sandi (seperti Bitwarden, 1Password, atau Google Password Manager) untuk mengisi data secara otomatis dan akurat.
4. `inputmode="email"` dan `autocapitalize="none"`: Memastikan keyboard virtual pada ponsel pintar menampilkan tombol "@" dan mencegah huruf pertama otomatis menjadi kapital.
5. `spellcheck="false"`: Mencegah garis merah pemeriksa ejaan peramban muncul di bawah alamat surel atau nama pengguna unik.
6. `aria-describedby="petunjuk-surel"`: Menghubungkan elemen input dengan pesan bantuan atau pesan kesalahan di bawahnya, sehingga screen reader membacakan petunjuk tersebut tepat setelah label dibacakan.
7. Tombol Intip Sandi (`aria-pressed` dan `aria-label`): Tombol bertipe `type="button"` (bukan submit) untuk mengubah tipe input antara `password` dan `text`. Atribut `aria-pressed` memberi tahu screen reader apakah mode lihat sandi sedang aktif atau tidak.

## Contoh Kode Interaktif

Berikut adalah implementasi langsung formulir login interaktif lengkap dengan fitur intip kata sandi, indikator pesan kesalahan validasi, dan penanganan pengiriman formulir:

<code-playground
id-contoh="demo-login-lengkap"
judul="Implementasi Formulir Login Standar Industri"
:tab-tersedia="['html', 'css', 'js']"
kode-html="<div class='wadah-kartu'>
  <div class='header-kartu'>
    <div class='ikon-logo'>KK</div>
    <h2>Masuk ke KopiKode</h2>
    <p>Masukkan kredensial Anda untuk melanjutkan belajar.</p>
  </div>

  <form id='form-login' novalidate>
    <div class='grup-input'>
      <label for='surel-masuk'>Alamat Surel</label>
      <input
        type='email'
        id='surel-masuk'
        name='email'
        autocomplete='username'
        placeholder='nama@domain.com'
        required
      />
      <span id='error-surel' class='pesan-error' aria-live='polite'></span>
    </div>

    <div class='grup-input'>
      <div class='baris-sandi'>
        <label for='sandi-masuk'>Kata Sandi</label>
        <a href='#' class='tautan-lupa' onclick='alert(\"Tautan reset sandi telah dikirim!\"); return false;'>Lupa?</a>
      </div>
      <div class='kotak-sandi'>
        <input
          type='password'
          id='sandi-masuk'
          name='password'
          autocomplete='current-password'
          placeholder='Minimal 8 karakter'
          required
          minlength='8'
        />
        <button
          type='button'
          id='btn-toggle-sandi'
          class='btn-intip'
          aria-label='Tampilkan kata sandi'
        >
          Lihat
        </button>
      </div>
      <span id='error-sandi' class='pesan-error' aria-live='polite'></span>
    </div>

    <div class='grup-ingat'>
      <input type='checkbox' id='centang-ingat' name='remember' />
      <label for='centang-ingat'>Ingat sesi saya</label>
    </div>

    <button type='submit' id='btn-submit' class='btn-masuk'>
      Masuk ke Dashboard
    </button>

  </form>

  <div id='notifikasi-sukses' class='notif-sukses' style='display: none;'>
    Kredensial valid. Mengalihkan ke halaman beranda...
  </div>
</div>"
  kode-css="body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #faf8f5;
  color: #221c18;
  padding: 16px;
  margin: 0;
}
.wadah-kartu {
  max-width: 380px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #e5ddd3;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(34, 28, 24, 0.05);
}
.header-kartu {
  text-align: center;
  margin-bottom: 20px;
}
.ikon-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #0284c7;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 8px;
}
.header-kartu h2 {
  margin: 0 0 6px 0;
  font-size: 1.3rem;
  color: #221c18;
}
.header-kartu p {
  margin: 0;
  font-size: 0.85rem;
  color: #5c5249;
}
.grup-input {
  margin-bottom: 16px;
}
.grup-input label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #221c18;
}
.baris-sandi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.baris-sandi label {
  margin-bottom: 0;
}
.tautan-lupa {
  font-size: 0.8rem;
  color: #0284c7;
  text-decoration: none;
}
.tautan-lupa:hover {
  text-decoration: underline;
}
.grup-input input[type='email'],
.kotak-sandi input {
  width: 100%;
  padding: 10px 12px;
  font-size: 0.9rem;
  border: 1px solid #e5ddd3;
  border-radius: 8px;
  background: #faf8f5;
  box-sizing: border-box;
  color: #221c18;
  transition: border-color 0.15s ease;
}
.grup-input input:focus,
.kotak-sandi input:focus {
  outline: none;
  border-color: #0284c7;
  background: #ffffff;
}
.grup-input input.input-salah {
  border-color: #dc2626;
  background: #fff8f8;
}
.kotak-sandi {
  position: relative;
  display: flex;
  align-items: center;
}
.kotak-sandi input {
  padding-right: 64px;
}
.btn-intip {
  position: absolute;
  right: 6px;
  padding: 5px 10px;
  background: #e5ddd3;
  color: #5c5249;
  border: none;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.btn-intip:hover {
  background: #d4c8bc;
}
.pesan-error {
  display: block;
  font-size: 0.75rem;
  color: #dc2626;
  margin-top: 4px;
  min-height: 16px;
}
.grup-ingat {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
}
.grup-ingat input {
  cursor: pointer;
}
.grup-ingat label {
  font-size: 0.85rem;
  color: #5c5249;
  cursor: pointer;
}
.btn-masuk {
  width: 100%;
  padding: 12px;
  background: #0284c7;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}
.btn-masuk:hover {
  background: #0369a1;
}
.notif-sukses {
  margin-top: 16px;
  padding: 12px;
  background: #ecfdf5;
  border: 1px solid #10b981;
  color: #065f46;
  border-radius: 8px;
  font-size: 0.85rem;
  text-align: center;
}"
  kode-js="// Logika Interaktivitas Formulir Login
const form = document.getElementById('form-login');
const inputSurel = document.getElementById('surel-masuk');
const inputSandi = document.getElementById('sandi-masuk');
const btnToggleSandi = document.getElementById('btn-toggle-sandi');
const errorSurel = document.getElementById('error-surel');
const errorSandi = document.getElementById('error-sandi');
const notifSukses = document.getElementById('notifikasi-sukses');

// Fitur Intip Kata Sandi
btnToggleSandi.addEventListener('click', () => {
const sedangSandi = inputSandi.type === 'password';
inputSandi.type = sedangSandi ? 'text' : 'password';
btnToggleSandi.textContent = sedangSandi ? 'Tutup' : 'Lihat';
btnToggleSandi.setAttribute('aria-label', sedangSandi ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
console.log('Mode lihat kata sandi:', sedangSandi ? 'Aktif' : 'Nonaktif');
});

// Penanganan Validasi dan Pengiriman Formulir
form.addEventListener('submit', (e) => {
e.preventDefault();
let valid = true;

// Bersihkan status error sebelumnya
errorSurel.textContent = '';
errorSandi.textContent = '';
inputSurel.classList.remove('input-salah');
inputSandi.classList.remove('input-salah');
notifSukses.style.display = 'none';

// Validasi Alamat Surel
if (!inputSurel.value.trim()) {
errorSurel.textContent = 'Alamat surel wajib diisi.';
inputSurel.classList.add('input-salah');
valid = false;
} else if (!inputSurel.value.includes('@') || !inputSurel.value.includes('.')) {
errorSurel.textContent = 'Format surel tidak valid (contoh: user@mail.com).';
inputSurel.classList.add('input-salah');
valid = false;
}

// Validasi Kata Sandi
if (!inputSandi.value) {
errorSandi.textContent = 'Kata sandi tidak boleh kosong.';
inputSandi.classList.add('input-salah');
valid = false;
} else if (inputSandi.value.length < 8) {
errorSandi.textContent = 'Kata sandi minimal 8 karakter.';
inputSandi.classList.add('input-salah');
valid = false;
}

if (valid) {
console.log('Proses autentikasi:', inputSurel.value);
notifSukses.style.display = 'block';
form.style.opacity = '0.7';
} else {
console.warn('Formulir gagal divalidasi. Periksa input pengguna.');
}
});"
/>

## Atribut Kunci pada Formulir Autentikasi

<tabel-parameter
  judul="Atribut Kunci Pengalaman Autentikasi Modern"
  :daftar-kolom="['Nama Atribut', 'Nilai Contoh', 'Tujuan dan Manfaat Aksesibilitas']"
  :data-baris="[
    ['autocomplete', 'username / current-password / new-password', 'Membantu password manager mengisi kredensial tanpa salah sasaran.'],
    ['inputmode', 'email / numeric / tel', 'Memilih tata letak keyboard ponsel yang paling nyaman untuk input tersebut.'],
    ['autocapitalize', 'none', 'Mencegah ponsel mengkapitalkan huruf pertama surel atau nama akun.'],
    ['spellcheck', 'false', 'Menonaktifkan koreksi kata otomatis untuk bidang nama pengguna dan kode sandi.'],
    ['aria-describedby', 'id-elemen-pesan', 'Membacakan pesan instruksi atau galat tepat saat fokus berada di dalam input.'],
    ['novalidate', 'novalidate (boolean)', 'Menonaktifkan tooltip validasi bawaan jika ditangani skrip khusus.']
  ]"
/>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="bahaya" judul="Menghilangkan Elemen Label Asli">
Banyak pengembang pemula hanya mengandalkan atribut placeholder tanpa menulis elemen `<label>`. Hal ini berbahaya karena saat pengguna mulai mengetik, teks placeholder akan lenyap dan pengguna bisa kehilangan konteks. Selain itu, pembaca layar (screen reader) sering kali mengabaikan placeholder sehingga pengguna tunanetra tidak mengetahui maksud kolom input tersebut. Selalu pasang elemen `<label for='id-input'>` yang jelas.
</kotak-peringatan>

<kotak-peringatan tipe="peringatan" judul="Tombol Intip Sandi Memicu Submit Tidak Sengaja">
Secara default, elemen `<button>` di dalam `<form>` memiliki perilaku bawaan `type="submit"`. Jika Anda membuat tombol intip kata sandi tanpa menuliskan atribut `type="button"`, maka setiap kali pengguna mengeklik tombol intip, formulir akan terkirim secara prematur. Pastikan selalu menulis atribut `type="button"` secara eksplisit.
</kotak-peringatan>

## Praktik Terbaik

1. **Aksesibilitas (a11y)**: Gunakan penanda kontras warna yang memenuhi rasio minimal 4.5:1 untuk teks label dan tombol. Pastikan status fokus (`:focus-visible`) terlihat terang dan jelas saat pengguna bernavigasi menggunakan tombol Tab pada keyboard.
2. **Keamanan**: Saat merancang form registrasi, sertakan petunjuk kriteria sandi sebelum pengguna mengirim formulir. Jangan pernah mematikan fitur copy-paste pada kolom kata sandi, karena pengguna yang sadar keamanan mengandalkan password manager untuk menempelkan sandi acak yang kuat.
3. **Ponsel Pintar**: Gunakan ukuran target sentuh minimal 44 x 44 piksel untuk seluruh tombol kontrol dan kotak centang, agar jari pengguna tidak salah menekan tombol yang berdekatan.

## Dukungan Browser

Semua atribut dan elemen standar formulir autentikasi (`autocomplete`, `inputmode`, `novalidate`, `aria-describedby`) didukung secara penuh dan stabil di seluruh peramban modern (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, dan peramban mobile).

## Topik Terkait

- [Formulir dan Tipe Input Modern](/html/formulir-dan-input)
- [Aksesibilitas dan Atribut Global](/html/aksesibilitas-dan-aria)
- [Manipulasi DOM dan Event Handling](/javascript/dom-dan-event)

## Latihan Mandiri

Buka playground di atas dan cobalah modifikasi berikut:

1. Tambahkan bidang input ketiga untuk "Konfirmasi Kata Sandi" dengan atribut `autocomplete="new-password"`.
2. Modifikasi kode JavaScript agar memeriksa apakah kata sandi pertama dan kata sandi konfirmasi cocok sebelum menampilkan pesan sukses.
3. Tambahkan teks penghitung kekuatan sandi (lemah, sedang, kuat) berdasarkan jumlah karakter yang diketikkan pengguna.

---

### Referensi Resmi

- [MDN Web Docs: Sign-in Form Best Practices](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sign-in_form_best_practices)
- [W3C WAI Web Accessibility Tutorials: Forms](https://www.w3.org/WAI/tutorials/forms/)

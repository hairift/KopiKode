---
title: "Aksesibilitas Web, Atribut ARIA, dan Atribut Global"
description: "Prinsip aksesibilitas WCAG, peran atribut ARIA, navigasi fokus keyboard, atribut data kustom, serta daftar elemen usang yang harus dihindari."
kategori: "Media dan Aksesibilitas"
---

## Ringkasan Konsep

Aksesibilitas web (sering disingkat a11y) adalah praktik merancang dan membangun situs web agar dapat digunakan oleh semua orang tanpa terkecuali, termasuk penyandang disabilitas penglihatan, pendengaran, motorik, maupun kognitif. HTML memegang peranan paling penting dalam aksesibilitas karena merupakan fondasi yang dibaca langsung oleh teknologi asistif seperti pembaca layar (_screen reader_). Ketika elemen semantik bawaan HTML belum mencukupi untuk menggambarkan pola interaksi khusus yang rumit, WAI-ARIA (_Accessible Rich Internet Applications_) melengkapinya dengan atribut peran dan status agar informasi tetap dapat diakses dengan setara.

## Sintaks Dasar

Penerapan atribut ARIA dan atribut global untuk komponen tombol akordeon yang aksesibel:

```html
<button
  type="button"
  id="tombol-menu"
  aria-expanded="false"
  aria-controls="panel-menu"
  class="tombol-navigasi"
  data-posisi="atas"
>
  Pilihan Pengaturan
</button>

<div id="panel-menu" role="region" aria-labelledby="tombol-menu" hidden>
  <p>Isi panel pengaturan akun anggota KopiKode.</p>
</div>
```

## Penjelasan Bagian per Bagian

1. Aturan Emas ARIA: _"No ARIA is better than bad ARIA"_. Jangan pernah menggunakan atribut ARIA jika peramban sudah menyediakan elemen semantik asli HTML yang memiliki fungsi serupa (misalnya: gunakan `<button>` asli daripada `<div role="button">`).
2. `aria-label`: Memberikan label suara pembaca layar pada elemen yang tidak memiliki teks visual (contohnya tombol ikon silang untuk menutup modal).
3. `aria-labelledby`: Mengaitkan elemen dengan elemen lain yang menjadi judulnya melalui ID.
4. `aria-describedby`: Menautkan elemen input dengan teks keterangan instruksi atau pesan error di bawahnya.
5. `aria-expanded`: Menginformasikan status buka atau tutup pada komponen dinamis (akordeon, dropdown menu).
6. `aria-hidden="true"`: Memerintahkan pembaca layar untuk mengabaikan elemen visual tertentu (misalnya ikon hiasan murni yang sudah memiliki teks pendamping).
7. `tabindex`: Mengatur urutan navigasi tombol Tab keyboard:
   - `tabindex="0"`: Memasukkan elemen ke dalam urutan tab navigasi keyboard alami.
   - `tabindex="-1"`: Elemen bisa difokuskan melalui kode JavaScript (`element.focus()`), tetapi tidak tersentuh oleh tombol Tab berurutan.
8. Atribut Global: Atribut yang sah disematkan pada elemen HTML apa pun: `id`, `class`, `title`, `hidden`, `dir`, dan atribut data kustom `data-*`.
9. Atribut Data Kustom (`data-*`): Menyimpan data metadata privat pada elemen HTML yang dapat dibaca dan dimanipulasi dengan mudah melalui JavaScript (`dataset`).

## Contoh Kode Interaktif

Pelajari cara kerja tombol pengalih tema yang aksesibel dengan atribut ARIA status langsung di bawah ini:

<code-playground
id-contoh="demo-aria-html"
judul="Komponen Pengalih Status Aksesibel"
:tab-tersedia="['html', 'css', 'js']"
kode-html="<div class='wadah-komponen'>
<button
id='tombol-notifikasi'
type='button'
aria-pressed='false'
data-aksi='toggle-notif'
class='tombol-status'

>

    Langganan Notifikasi Materi

  </button>

  <p id='status-keterangan' class='keterangan' aria-live='polite'>
    Status saat ini: Notifikasi materi baru dinonaktifkan.
  </p>
</div>"
  kode-css=".wadah-komponen {
  font-family: system-ui, sans-serif;
  color: #221c18;
}
.tombol-status {
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #e5ddd3;
  background: #faf8f5;
  color: #5c5249;
  transition: all 0.2s;
}
.tombol-status:focus-visible {
  outline: 3px solid #0284c7;
  outline-offset: 2px;
}
.tombol-status[aria-pressed='true'] {
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
}
.keterangan {
  margin-top: 12px;
  font-size: 0.85rem;
  color: #5c5249;
}"
  kode-js="const tombol = document.getElementById('tombol-notifikasi');
const statusTeks = document.getElementById('status-keterangan');

tombol.addEventListener('click', () => {
const aktif = tombol.getAttribute('aria-pressed') === 'true';
const statusBaru = !aktif;

tombol.setAttribute('aria-pressed', String(statusBaru));
if (statusBaru) {
statusTeks.textContent = 'Status saat ini: Notifikasi materi baru aktif.';
} else {
statusTeks.textContent = 'Status saat ini: Notifikasi materi baru dinonaktifkan.';
}
console.log('Status aria-pressed diperbarui:', statusBaru);
});"

>

</code-playground>

## Tabel Atribut ARIA dan Global

<tabel-parameter>

| Atribut         | Jenis Nilai                  | Tujuan Aksesibilitas                                                      |
| :-------------- | :--------------------------- | :------------------------------------------------------------------------ |
| `aria-label`    | Teks string                  | Memberikan nama yang dapat dibaca pembaca layar pada elemen grafis/ikon   |
| `aria-live`     | `polite`, `assertive`, `off` | Mengumumkan pembaruan konten dinamis secara otomatis kepada pembaca layar |
| `aria-expanded` | `true`, `false`              | Menunjukkan apakah kontrol popover, menu, atau akordeon sedang terbuka    |
| `aria-hidden`   | `true`, `false`              | Menyembunyikan elemen visual murni dekoratif dari pohon aksesibilitas     |
| `tabindex`      | `-1`, `0`                    | Mengendalikan kemampuan elemen menerima fokus keyboard secara presisi     |
| `data-*`        | String bebas                 | Menyimpan parameter konfigurasi untuk dibaca oleh skrip JavaScript        |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Praktek Buruk Aksesibilitas Web">

- **Menggunakan `tabindex` positif (`tabindex="1"`, `tabindex="2"`)**: Nilai positif merusak urutan tab alami seluruh halaman web dan membingungkan pengguna disabilitas motorik. Hanya gunakan `tabindex="0"` atau `tabindex="-1"`.
- **Menghapus indikator fokus keyboard (`outline: none`) tanpa pengganti**: Jangan pernah mematikan outline fokus kecuali Anda telah menyiapkan pengganti visual yang tegas (`:focus-visible`) agar pengguna navigasi keyboard dapat melihat posisi kursor mereka.
- **Menggunakan elemen usang (_deprecated_)**: Hindari penggunaan tag usang era HTML4 seperti `<font>`, `<center>`, `<marquee>`, `<big>`, dan `<strike>`. Semua penataan gaya wajib didelegasikan ke CSS.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Kaidah Standar WCAG AA">

1. Selalu sediakan tautan loncat navigasi (_skip link_) di bagian paling atas halaman sebelum header, contohnya: `<a href="#konten-utama" class="sr-only focus:not-sr-only">Loncat ke konten utama</a>` agar pengguna keyboard tidak perlu menekan tombol tab puluhan kali melewati menu navigasi.
2. Pastikan rasio kontras teks terhadap warna latar memenuhi standar WCAG AA (minimal rasio 4.5:1 untuk teks normal dan 3:1 untuk teks berukuran besar).
3. Gunakan `aria-live="polite"` pada wadah notifikasi atau pencarian agar pembaca layar mengumumkan hasil baru saat pengguna sedang tidak berbicara atau membaca paragraf lain.

</kotak-peringatan>

## Dukungan Browser

Atribut ARIA standar dan atribut global didukung oleh 100% peramban web modern serta diselaraskan dengan berbagai peranti pembaca layar populer seperti NVDA, JAWS, VoiceOver (Apple), dan TalkBack (Android).

## Topik Terkait

- [Pengantar dan Struktur Dokumen](/html/pengantar-dan-struktur) - Pengaturan bahasa lang dan viewport.
- [Formulir dan Tipe Input](/html/formulir-dan-input) - Menghubungkan label dan input.
- [Elemen Semantik Modern](/html/elemen-semantik) - Peran penting landmark semantik.

## Latihan Singkat

Ujilah pemahaman Anda: buatlah sebuah elemen `<button>` yang memuat atribut `aria-label="Tutup jendela modal"` dan atribut data kustom `data-tindakan="tutup"` dengan teks visual berupa sebuah huruf `X`.

<code-playground
id-contoh="latihan-aria-dasar"
judul="Latihan Mandiri: Tombol Tutup Aksesibel"
:tab-tersedia="['html']"
kode-html="<!-- Tuliskan elemen button aksesibel di bawah ini -->
"

>

</code-playground>

---

_Referensi resmi: [W3C WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)_

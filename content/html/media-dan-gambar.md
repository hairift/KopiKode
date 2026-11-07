---
title: "Media Gambar, Audio, dan Video HTML5"
description: "Penerapan gambar responsif dengan srcset dan picture, pemutar audio dan video bawaan, iframe berpenjaga aman, serta grafis SVG dan Canvas."
kategori: "Media dan Aksesibilitas"
---

## Ringkasan Konsep

Halaman web modern tidak hanya mengandalkan teks, tetapi juga diperkaya oleh beragam media seperti foto berkualitas tinggi, ilustrasi vektor SVG, klip video tutorial, serta rekaman siniar audio. HTML5 menyediakan elemen media bawaan yang beroperasi langsung di dalam peramban tanpa memerlukan plugin pihak ketiga seperti Flash. Pengelolaan media yang tepat sangat penting: selain membuat halaman lebih menarik, optimasi media menjamin kecepatan memuat halaman (_loading performance_) dan efisiensi konsumsi kuota pengguna.

## Sintaks Dasar

Format umum penulisan gambar responsif dan pemutar video HTML5:

```html
<!-- Gambar responsif dengan elemen picture -->
<picture>
  <source
    srcset="banner-besar.webp"
    media="(min-width: 800px)"
    type="image/webp"
  />
  <source srcset="banner-kecil.webp" type="image/webp" />
  <img
    src="banner-fallback.jpg"
    alt="Suasana ruang lab komputer KSM KopiKode"
    width="800"
    height="400"
    loading="lazy"
  />
</picture>

<!-- Pemutar video dengan subtitle aksesibel -->
<video controls width="640" height="360" poster="sampul-video.jpg">
  <source src="tutorial.mp4" type="video/mp4" />
  <track
    src="subtitle-id.vtt"
    kind="subtitles"
    srclang="id"
    label="Bahasa Indonesia"
  />
  Peramban Anda tidak mendukung pemutar video HTML5.
</video>
```

## Penjelasan Bagian per Bagian

1. `<img>`: Elemen dasar penampil gambar. Wajib menyertakan atribut `src` (alamat berkas) dan `alt` (teks alternatif penjelas). Selalu sertakan atribut `width` dan `height` numerik untuk mencegah pergeseran tata letak halaman yang mengganggu (_Cumulative Layout Shift_ / CLS).
2. `loading="lazy"`: Menginstruksikan peramban agar hanya mengunduh gambar saat posisi gambar mendekati layar viewport pengguna, sangat menghemat kuota dan mempercepat skor Lighthouse.
3. `<picture>` dan `<source>`: Solusi seni pengarahan gambar (_art direction_) dan negosiasi format berkas modern (misalnya menyajikan WebP atau AVIF jika peramban mendukung, lalu mundur ke JPEG biasa jika tidak).
4. `srcset` dan `sizes`: Mengizinkan peramban memilih resolusi gambar yang paling pas secara otomatis berdasarkan kerapatan piksel layar (DPR) gawai pengguna.
5. `<video>` dan `<audio>`: Pemutar media bawaan dengan atribut `controls` untuk memunculkan tombol putar, volume, dan bilah durasi.
6. `<track>`: Menyematkan teks takarir (_subtitles_) atau deskripsi audio menggunakan format berkas WebVTT (`.vtt`) untuk aksesibilitas teman tuli.
7. `<iframe>`: Membingkai halaman web lain ke dalam dokumen. Selalu sertakan atribut `sandbox` untuk membatasi hak akses skrip eksternal.
8. `<svg>`: Format grafis vektor berbasis kode XML yang sangat tajam di segala resolusi layar dan dapat diwarnai langsung menggunakan properti CSS.

## Contoh Kode Interaktif

Pelajari bagaimana elemen SVG mandiri dan media audio dirangkai secara interaktif di bawah ini:

<code-playground
id-contoh="demo-media-html"
judul="Sematkan Ikon Vektor SVG dan Kontrol Audio"
:tab-tersedia="['html', 'css']"
kode-html="<div class='wadah-media'>
  <figure>
    <!-- Ikon Vektor SVG Murni -->
    <svg width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='#0284c7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
      <path d='M18 8h1a4 4 0 0 1 0 8h-1'/>
      <path d='M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z'/>
      <line x1='6' y1='1' x2='6' y2='4'/>
      <line x1='10' y1='1' x2='10' y2='4'/>
      <line x1='14' y1='1' x2='14' y2='4'/>
    </svg>
    <figcaption>Logo Vektor KopiKode (Format SVG Murni)</figcaption>
  </figure>

  <div class='kotak-audio'>
    <h4>Siniar Pembahasan HTML5</h4>
    <!-- Pemutar Audio HTML5 -->
    <audio controls>
      <source src='https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' type='audio/mpeg'>
      Peramban tidak mendukung audio.
    </audio>
  </div>
</div>"
  kode-css=".wadah-media {
  font-family: system-ui, sans-serif;
  color: #221c18;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
figure {
  margin: 0;
  text-align: center;
  padding: 16px;
  background: #faf8f5;
  border: 1px solid #e5ddd3;
  border-radius: 8px;
}
figcaption {
  margin-top: 8px;
  font-size: 0.825rem;
  color: #5c5249;
}
.kotak-audio {
  padding: 16px;
  border: 1px solid #e5ddd3;
  border-radius: 8px;
  background: #ffffff;
}
.kotak-audio h4 {
  margin: 0 0 8px 0;
  color: #0284c7;
}
audio {
  width: 100%;
}"
>
</code-playground>

## Tabel Atribut Media Penting

<tabel-parameter>

| Atribut Media    | Elemen Sasaran       | Fungsi Teknis                                                         |
| :--------------- | :------------------- | :-------------------------------------------------------------------- |
| `alt`            | `<img>`, `<area>`    | Teks alternatif wajib untuk pembaca layar jika gambar gagal dimuat    |
| `loading="lazy"` | `<img>`, `<iframe>`  | Menunda muat berkas hingga dekat dengan viewport pengguna             |
| `controls`       | `<video>`, `<audio>` | Menampilkan kendali antarmuka bawaan (putar, jeda, volume)            |
| `poster`         | `<video>`            | Gambar cuplikan layar sebelum tombol putar ditekan                    |
| `sandbox`        | `<iframe>`           | Menerapkan pembatasan izin keamanan ketat pada konten yang disematkan |
| `muted`          | `<video>`, `<audio>` | Mematikan audio bawaan (wajib jika ingin mengaktifkan `autoplay`)     |

</tabel-parameter>

## Kesalahan Umum dan Cara Menghindarinya

<kotak-peringatan tipe="peringatan" judul="Kekeliruan Pengelolaan Media">

- **Mengosongkan teks `alt` tanpa tujuan**: Jika gambar memuat informasi penting, hilangnya atribut `alt` membuat tunanetra tidak mendapatkan informasi sama sekali. Jika gambar murni untuk hiasan dekoratif, gunakan `alt=""` agar pembaca layar mengabaikannya secara senyap.
- **Mengabaikan dimensi `width` dan `height` pada gambar**: Saat browser mengunduh gambar besar tanpa dimensi awal yang jelas, teks di sekitarnya akan terdorong ke bawah secara mendadak begitu gambar selesai diunduh (_layout shift_).
- **Menggunakan autoplay bersuara**: Kebijakan peramban modern otomatis memblokir pemutaran video otomatis (`autoplay`) yang bersuara karena mengganggu kenyamanan pengguna. Jika harus autoplay, sertakan selalu atribut `muted`.

</kotak-peringatan>

## Praktik Terbaik

<kotak-peringatan tipe="tips" judul="Strategi Format dan Performa Media">

1. Konversikan foto fotografi ke format modern `WebP` atau `AVIF` yang menghasilkan ukuran berkas 30% hingga 50% lebih kecil dibandingkan format lama `JPEG` dan `PNG` pada kualitas visual setara.
2. Untuk grafik ikonografi, gunakan format `SVG` inline atau berkas eksternal karena ukuran kodenya sangat kecil dan tidak akan pecah saat di-zoom pada monitor resolusi tinggi (_Retina Display_).
3. Selalu tambahkan elemen `<track>` pada video instruksional untuk menyediakan teks takarir agar materi dapat dipelajari di tempat bising atau tanpa pengeras suara.

</kotak-peringatan>

## Dukungan Browser

Format video MP4 (H.264), format audio MP3 dan AAC, serta elemen `picture` dan SVG didukung penuh oleh 100% peramban desktop dan seluler modern di seluruh dunia.

## Topik Terkait

- [Teks dan Konten Dasar](/html/teks-dan-konten) - Gambar di dalam artikel.
- [Aksesibilitas dan ARIA](/html/aksesibilitas-dan-aria) - Standar deskripsi media alternatif.
- [Pengantar dan Struktur Dokumen](/html/pengantar-dan-struktur) - Meta tag pendukung media.

## Latihan Singkat

Ujilah pemahaman Anda: tuliskan satu elemen `<img>` yang memuat tautan gambar bebas, lengkap dengan atribut `alt` yang deskriptif dan atribut `loading="lazy"`.

<code-playground
id-contoh="latihan-media-dasar"
judul="Latihan Mandiri: Gambar Aksesibel"
:tab-tersedia="['html']"
kode-html="<!-- Tuliskan elemen img responsif di bawah ini -->
"

>

</code-playground>

---

_Referensi resmi: [MDN Web Docs: Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)_

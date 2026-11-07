<script setup lang="ts">
import {
  Code2,
  Compass,
  GitPullRequest,
  Sparkles,
  Terminal,
  Users,
  BookOpen,
} from "lucide-vue-next";

useHead({
  title: "Tentang KopiKode - Pusat Dokumentasi Programmer",
  meta: [
    {
      name: "description",
      content:
        "Mengenal KopiKode: inisiatif dokumentasi pemrograman terbuka yang dirintis oleh ketua KSM kampus untuk media belajar anggota dan komunitas.",
    },
  ],
});
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
      <!-- Judul Halaman -->
      <header class="space-y-4 border-b border-[var(--pembatas)] pb-8">
        <span
          class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--aksen-primer-lembut)] text-[var(--aksen-primer)]"
        >
          Inisiatif Komunitas Kampus
        </span>
        <h1
          class="text-3xl sm:text-5xl font-bold font-judul text-[var(--teks-utama)] tracking-tight"
        >
          Tentang KopiKode
        </h1>
        <p
          class="text-lg sm:text-xl text-[var(--teks-sekunder)] leading-relaxed"
        >
          Media belajar dokumentasi pemrograman yang lengkap, terstruktur rapi,
          dan menyediakan playground interaktif untuk langsung menguji kode di
          peramban.
        </p>
      </header>

      <!-- Bagian Latar Belakang dan Masalah -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold font-judul text-[var(--teks-utama)]">
          Latar Belakang dan Masalah yang Diselesaikan
        </h2>
        <div
          class="space-y-3 text-sm sm:text-base text-[var(--teks-sekunder)] leading-relaxed"
        >
          <p>
            KopiKode berawal dari kebutuhan nyata di lingkungan kampus. Saat
            mendampingi anggota baru di Kelompok Studi Mahasiswa (KSM), kami
            berulang kali mendapati kendala yang sama: dokumentasi resmi
            berbahasa asing kerap terasa intimidatif bagi pemula, sementara
            tutorial umum di internet sering kali terfragmentasi, usang, atau
            tidak menyediakan sarana praktis untuk langsung mencoba sintaks.
          </p>
          <p>
            Akibatnya, proses belajar menjadi lambat karena pemula harus
            bolak-balik menyetel teks editor lokal hanya untuk menguji satu
            baris kode HTML atau selektor CSS sederhana. KopiKode hadir sebagai
            solusi satu pintu: menyajikan kurikulum fundamental yang solid,
            ditulis dalam Bahasa Indonesia yang lugas dan natural, tanpa
            menghilangkan istilah teknis baku industri.
          </p>
        </div>
      </section>

      <!-- Bagian Visi Jangka Panjang -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold font-judul text-[var(--teks-utama)]">
          Visi Jangka Panjang dan Tahapan Pengembangan
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            class="p-5 rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] space-y-2"
          >
            <span
              class="text-xs font-mono font-bold text-[var(--aksen-primer)] uppercase"
              >Fase 1 (Saat Ini)</span
            >
            <h3 class="text-base font-bold text-[var(--teks-utama)]">
              Fondasi Tiga Pilar Web
            </h3>
            <p class="text-sm text-[var(--teks-sekunder)] leading-relaxed">
              Fokus mendalam pada HTML5 Semantik, CSS Modern (Flexbox, Grid,
              Variabel), dan JavaScript Inti (DOM, Asinkron, Struktur Data).
              Setiap materi dilengkapi editor langsung CodeMirror 6 dan isolasi
              pratinjau yang aman.
            </p>
          </div>

          <div
            class="p-5 rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] space-y-2"
          >
            <span
              class="text-xs font-mono font-bold text-[var(--aksen-hangat)] uppercase"
              >Visi Masa Depan</span
            >
            <h3 class="text-base font-bold text-[var(--teks-utama)]">
              Pusat Dokumentasi Terpadu Semua Teknologi
            </h3>
            <p class="text-sm text-[var(--teks-sekunder)] leading-relaxed">
              Arsitektur KopiKode dirancang modular berbasis registry. Di masa
              depan, platform ini akan memperluas cakupan ke TypeScript, Python,
              Framework Web (Vue, React), hingga teknologi Mobile (Flutter).
            </p>
          </div>
        </div>
      </section>

      <!-- Bagian Panduan Kontribusi -->
      <section
        id="kontribusi"
        class="space-y-4 pt-4 border-t border-[var(--pembatas)]"
      >
        <h2 class="text-2xl font-bold font-judul text-[var(--teks-utama)]">
          Cara Berkontribusi
        </h2>
        <p
          class="text-sm sm:text-base text-[var(--teks-sekunder)] leading-relaxed"
        >
          KopiKode adalah proyek terbuka. Anggota KSM dan rekan programmer di
          seluruh Indonesia diundang untuk menyempurnakan kualitas materi:
        </p>
        <div class="space-y-3">
          <div
            class="flex items-start gap-3 p-4 rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)]"
          >
            <BookOpen
              class="h-5 w-5 mt-0.5 text-[var(--aksen-primer)] shrink-0"
            />
            <div class="space-y-1">
              <h4 class="text-sm font-semibold text-[var(--teks-utama)]">
                Menambah atau Memperbaiki Materi
              </h4>
              <p class="text-xs sm:text-sm text-[var(--teks-sekunder)]">
                Cukup tambahkan berkas Markdown di dalam folder
                <code
                  class="px-1.5 py-0.5 bg-[var(--latar-sekunder)] border border-[var(--pembatas)] rounded text-xs font-mono"
                  >content/[teknologi]/</code
                >
                dan cantumkan dalam
                <code
                  class="px-1.5 py-0.5 bg-[var(--latar-sekunder)] border border-[var(--pembatas)] rounded text-xs font-mono"
                  >data/teknologiRegistry.ts</code
                >. Ikuti pola standar 10 bagian materi agar konsisten.
              </p>
            </div>
          </div>

          <div
            class="flex items-start gap-3 p-4 rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)]"
          >
            <Code2 class="h-5 w-5 mt-0.5 text-[var(--aksen-hangat)] shrink-0" />
            <div class="space-y-1">
              <h4 class="text-sm font-semibold text-[var(--teks-utama)]">
                Menyumbang Contoh Playground
              </h4>
              <p class="text-xs sm:text-sm text-[var(--teks-sekunder)]">
                Bantu membuat contoh kasus nyata pada komponen
                <code
                  class="px-1.5 py-0.5 bg-[var(--latar-sekunder)] border border-[var(--pembatas)] rounded text-xs font-mono"
                  >&lt;code-playground&gt;</code
                >
                sehingga anggota lain dapat langsung bereksperimen dengan mudah.
              </p>
            </div>
          </div>

          <div
            class="flex items-start gap-3 p-4 rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)]"
          >
            <Users
              class="h-5 w-5 mt-0.5 text-[var(--status-sukses)] shrink-0"
            />
            <div class="space-y-1">
              <h4 class="text-sm font-semibold text-[var(--teks-utama)]">
                Melaporkan Kesalahan Teks atau Bug Teknis
              </h4>
              <p class="text-xs sm:text-sm text-[var(--teks-sekunder)]">
                Jika menemukan penjelasan yang kurang tepat, tautan rusak, atau
                kendala performa pada peramban tertentu, laporkan melalui
                repositori GitHub resmi kami.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

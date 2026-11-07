<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  FileCode2,
  Palette,
  Terminal,
  Search,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Code2,
  Layers,
  Sparkles,
  Clock,
  Compass
} from 'lucide-vue-next'
import { daftarTeknologi } from '~/data/teknologiRegistry'
import { useBelajarStore } from '~/stores/belajarStore'

const belajarStore = useBelajarStore()

const teknologiTersedia = computed(() =>
  daftarTeknologi.filter((item) => item.status === 'tersedia')
)

const teknologiRoadmap = computed(() =>
  daftarTeknologi.filter((item) => item.status === 'segera_hadir')
)

// Shortcut Ctrl/Cmd + K
const teksShortcut = ref('Ctrl+K')
onMounted(() => {
  if (typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)) {
    teksShortcut.value = 'Cmd+K'
  }
})

const bukaPencarian = () => {
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true
    })
  )
}
</script>

<template>
  <div class="space-y-16 sm:space-y-24 py-10 sm:py-16">
    <!-- Hero Section: Penjelasan Singkat, Visi KSM, & Pencarian Menonjol -->
    <section class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--pembatas)] bg-[var(--latar-kartu)] text-xs font-medium text-[var(--teks-sekunder)] shadow-xs">
        <span class="h-2 w-2 rounded-full bg-[var(--aksen-primer)] animate-pulse"></span>
        <span>Fase 1: Tiga Pilar Web (HTML, CSS, JavaScript)</span>
      </div>

      <div class="space-y-4 max-w-3xl mx-auto">
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold font-judul tracking-tight text-[var(--teks-utama)] leading-tight">
          Pusat Dokumentasi Terpadu untuk Programmer
        </h1>
        <p class="text-base sm:text-xl text-[var(--teks-sekunder)] leading-relaxed">
          KopiKode dibangun oleh ketua KSM kampus untuk menjawab kendala belajar anggota: dokumentasi yang lengkap, ditulis dalam Bahasa Indonesia yang natural, dan dilengkapi editor kode interaktif yang bisa langsung dicoba di tempat.
        </p>
      </div>

      <!-- Kotak Pencarian Menonjol di Hero -->
      <div class="max-w-2xl mx-auto">
        <button
          type="button"
          class="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] text-sm sm:text-base text-[var(--teks-tersier)] hover:border-[var(--aksen-primer)] hover:shadow-md transition-all cursor-pointer group"
          @click="bukaPencarian"
        >
          <span class="flex items-center gap-3">
            <Search class="h-5 w-5 text-[var(--aksen-primer)] group-hover:scale-110 transition-transform" />
            <span class="group-hover:text-[var(--teks-utama)] transition-colors">
              Cari sintaks, elemen semantik, atau konsep JavaScript...
            </span>
          </span>
          <kbd class="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-mono font-semibold bg-[var(--latar-sekunder)] text-[var(--teks-sekunder)] border border-[var(--pembatas)] rounded-md shadow-xs">
            {{ teksShortcut }}
          </kbd>
        </button>
      </div>
    </section>

    <!-- Tiga Jalur Belajar Utama Fase 1 -->
    <section class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--pembatas)] pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--aksen-primer)] font-mono">
            Kurikulum Fundamental
          </span>
          <h2 class="text-2xl sm:text-3xl font-bold font-judul text-[var(--teks-utama)] mt-1">
            Tiga Jalur Belajar Inti
          </h2>
        </div>
        <p class="text-sm text-[var(--teks-tersier)] max-w-sm sm:text-right">
          Setiap materi disusun runtut dari fondasi dasar, studi kasus nyata, hingga latihan mandiri.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Kartu Jalur HTML -->
        <div class="flex flex-col justify-between p-6 rounded-2xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] hover:border-[var(--aksen-primer)] hover:shadow-lg transition-all space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="p-3 rounded-xl bg-[var(--aksen-primer-lembut)] text-[var(--aksen-primer)]">
                <FileCode2 class="h-6 w-6" />
              </div>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--latar-sekunder)] text-[var(--teks-sekunder)]">
                6 Materi Lengkap
              </span>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-bold font-judul text-[var(--teks-utama)]">
                HTML5 Semantik & Struktur
              </h3>
              <p class="text-sm text-[var(--teks-sekunder)] leading-relaxed">
                Struktur dokumen, elemen semantik (header, nav, main, article), formulir modern, tabel data, media responsif, dan standar aksesibilitas ARIA.
              </p>
            </div>
          </div>

          <div class="pt-4 border-t border-[var(--pembatas)]">
            <NuxtLink
              to="/html/pengantar-dan-struktur"
              class="inline-flex items-center justify-between w-full text-sm font-semibold text-[var(--aksen-primer)] hover:underline"
            >
              <span>Mulai Belajar HTML</span>
              <ArrowRight class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>

        <!-- Kartu Jalur CSS -->
        <div class="flex flex-col justify-between p-6 rounded-2xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] hover:border-[var(--aksen-hangat)] hover:shadow-lg transition-all space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="p-3 rounded-xl bg-[var(--aksen-hangat-lembut)] text-[var(--aksen-hangat)]">
                <Palette class="h-6 w-6" />
              </div>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--latar-sekunder)] text-[var(--teks-sekunder)]">
                6 Materi Lengkap
              </span>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-bold font-judul text-[var(--teks-utama)]">
                CSS Modern & Tata Letak
              </h3>
              <p class="text-sm text-[var(--teks-sekunder)] leading-relaxed">
                Cascade, specificity, box model, tata letak modern Flexbox dan CSS Grid, responsif dengan media query dan clamp, hingga custom properties CSS variables.
              </p>
            </div>
          </div>

          <div class="pt-4 border-t border-[var(--pembatas)]">
            <NuxtLink
              to="/css/selector-dan-cascade"
              class="inline-flex items-center justify-between w-full text-sm font-semibold text-[var(--aksen-hangat)] hover:underline"
            >
              <span>Mulai Belajar CSS</span>
              <ArrowRight class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>

        <!-- Kartu Jalur JavaScript -->
        <div class="flex flex-col justify-between p-6 rounded-2xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] hover:border-[var(--aksen-primer)] hover:shadow-lg transition-all space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="p-3 rounded-xl bg-[var(--aksen-primer-lembut)] text-[var(--aksen-primer)]">
                <Terminal class="h-6 w-6" />
              </div>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--latar-sekunder)] text-[var(--teks-sekunder)]">
                7 Materi Lengkap
              </span>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-bold font-judul text-[var(--teks-utama)]">
                JavaScript & DOM Interaktif
              </h3>
              <p class="text-sm text-[var(--teks-sekunder)] leading-relaxed">
                Variabel, logika alur percabangan, fungsi dan closure, manipulasi array dan objek, pola asinkron Promise dan Fetch API, serta manipulasi DOM browser.
              </p>
            </div>
          </div>

          <div class="pt-4 border-t border-[var(--pembatas)]">
            <NuxtLink
              to="/javascript/variabel-dan-tipe-data"
              class="inline-flex items-center justify-between w-full text-sm font-semibold text-[var(--aksen-primer)] hover:underline"
            >
              <span>Mulai Belajar JavaScript</span>
              <ArrowRight class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Fitur Inti: Playground Interaktif Langsung di Dokumen -->
    <section class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="p-8 sm:p-10 rounded-2xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] space-y-6">
        <div class="max-w-2xl space-y-2">
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--aksen-hangat)] font-mono">
            Pengalaman Belajar Praktis
          </span>
          <h2 class="text-2xl sm:text-3xl font-bold font-judul text-[var(--teks-utama)]">
            Setiap Konsep Langsung Dibuktikan dengan Kode
          </h2>
          <p class="text-sm sm:text-base text-[var(--teks-sekunder)] leading-relaxed">
            Tidak ada lagi tebak-tebakan hasil tampilan. Di KopiKode, setiap contoh kode dapat langsung diedit di editor CodeMirror dan dipratinjau secara instan melalui sandbox yang aman.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="p-4 rounded-xl bg-[var(--latar-sekunder)] space-y-1">
            <h4 class="text-sm font-bold text-[var(--teks-utama)]">Editor Tiga Tab</h4>
            <p class="text-xs text-[var(--teks-sekunder)] leading-relaxed">
              Beralih antara tab HTML, CSS, dan JavaScript secara fleksibel sesuai kebutuhan contoh materi.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-[var(--latar-sekunder)] space-y-1">
            <h4 class="text-sm font-bold text-[var(--teks-utama)]">Panel Console Terpadu</h4>
            <p class="text-xs text-[var(--teks-sekunder)] leading-relaxed">
              Keluaran console.log, warning, dan error dari skrip Anda ditampilkan rapi tanpa perlu membuka inspect element.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-[var(--latar-sekunder)] space-y-1">
            <h4 class="text-sm font-bold text-[var(--teks-utama)]">Isolasi Iframe Aman</h4>
            <p class="text-xs text-[var(--teks-sekunder)] leading-relaxed">
              Kode pengguna berjalan di dalam sandbox berpenjaga ketat tanpa risiko memengaruhi halaman dokumentasi utama.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bagian Roadmap: Teknologi yang Akan Datang (Jujur dan Transparan) -->
    <section id="roadmap" class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--pembatas)] pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--teks-tersier)] font-mono">
            Peta Jalan Platform
          </span>
          <h2 class="text-2xl sm:text-3xl font-bold font-judul text-[var(--teks-utama)] mt-1">
            Teknologi yang Akan Datang
          </h2>
        </div>
        <p class="text-sm text-[var(--teks-tersier)] max-w-md sm:text-right">
          Kami menolak janji berlebihan. Berikut adalah daftar teknologi yang telah disiapkan arsitektur registry-nya dan sedang dalam tahap penulisan kurikulum.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="item in teknologiRoadmap"
          :key="item.id"
          class="p-5 rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] space-y-3"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--latar-sekunder)] text-[var(--teks-tersier)] font-mono">
              {{ item.versi }}
            </span>
            <span class="inline-flex items-center gap-1 text-[11px] text-[var(--aksen-hangat)] font-medium">
              <Clock class="h-3 w-3" />
              <span>Segera Hadir</span>
            </span>
          </div>

          <div>
            <h4 class="text-base font-bold text-[var(--teks-utama)]">{{ item.nama }}</h4>
            <p class="text-xs text-[var(--teks-sekunder)] mt-1 line-clamp-2 leading-relaxed">
              {{ item.deskripsiSingkat }}
            </p>
          </div>

          <div class="text-[11px] text-[var(--teks-tersier)] pt-2 border-t border-[var(--pembatas)]">
            Tahap perancangan materi KSM
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
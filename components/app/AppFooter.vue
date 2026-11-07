<script setup lang="ts">
import { BookOpen, Code2, Heart, ShieldCheck, Sparkles } from "lucide-vue-next";
</script>

<template>
  <footer
    class="w-full border-t border-[var(--pembatas)] bg-[var(--latar-kartu)] mt-auto transition-colors"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Kolom 1: Profil KopiKode -->
        <div class="md:col-span-2 space-y-3">
          <div class="flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="Logo KopiKode"
              class="h-8 w-8 rounded-lg object-contain"
            />
            <span class="font-bold text-lg text-[var(--teks-utama)]"
              >KopiKode</span
            >
          </div>
          <p
            class="text-sm text-[var(--teks-sekunder)] max-w-md leading-relaxed"
          >
            Pusat dokumentasi terpadu untuk programmer yang dikembangkan oleh
            ketua KSM kampus sebagai media belajar bersama. Menyajikan materi
            HTML, CSS, dan JavaScript secara praktis, terstruktur, dan dapat
            langsung diuji coba.
          </p>
          <div class="text-xs text-[var(--teks-tersier)] pt-1">
            Fase 1: HTML, CSS, dan JavaScript murni. Arsitektur modular siap
            diperluas ke berbagai bahasa pemrograman lainnya.
          </div>
        </div>

        <!-- Kolom 2: Jalur Belajar Tersedia -->
        <div class="space-y-3">
          <h4
            class="text-xs font-semibold uppercase tracking-wider text-[var(--teks-tersier)]"
          >
            Jalur Belajar
          </h4>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink
                to="/html/pengantar-dan-struktur"
                class="text-[var(--teks-sekunder)] hover:text-[var(--aksen-primer)] transition-colors"
              >
                HTML Semantik & Struktur
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/css/selector-dan-cascade"
                class="text-[var(--teks-sekunder)] hover:text-[var(--aksen-primer)] transition-colors"
              >
                CSS Modern & Tata Letak
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/javascript/variabel-dan-tipe-data"
                class="text-[var(--teks-sekunder)] hover:text-[var(--aksen-primer)] transition-colors"
              >
                JavaScript & DOM Interaktif
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Kolom 3: Navigasi Platform -->
        <div class="space-y-3">
          <h4
            class="text-xs font-semibold uppercase tracking-wider text-[var(--teks-tersier)]"
          >
            Informasi
          </h4>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink
                to="/tentang"
                class="text-[var(--teks-sekunder)] hover:text-[var(--aksen-primer)] transition-colors"
              >
                Tentang & Misi KSM
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/tentang#kontribusi"
                class="text-[var(--teks-sekunder)] hover:text-[var(--aksen-primer)] transition-colors"
              >
                Panduan Kontribusi
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#roadmap"
                class="text-[var(--teks-sekunder)] hover:text-[var(--aksen-primer)] transition-colors"
              >
                Peta Jalan Teknologi
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Garis Pemisah & Hak Cipta -->
      <div
        class="mt-8 pt-6 border-t border-[var(--pembatas)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--teks-tersier)]"
      >
        <div>
          &copy; {{ new Date().getFullYear() }} KopiKode. Dibangun untuk
          kemajuan belajar anggota KSM dan komunitas developer.
        </div>
        <div class="flex items-center gap-4">
          <span>Standar Aksesibilitas WCAG AA</span>
          <span>&middot;</span>
          <span>Bebas Pelacak</span>
        </div>
      </div>
    </div>
  </footer>
</template>

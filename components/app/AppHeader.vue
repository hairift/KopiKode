<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  Search,
  Sun,
  Moon,
  Laptop,
  Menu,
  Bookmark,
  CheckCircle2,
  ExternalLink,
} from "lucide-vue-next";
import { usePreferensiStore } from "~/stores/preferensiStore";
import { useBelajarStore } from "~/stores/belajarStore";

const router = useRouter();
const preferensiStore = usePreferensiStore();
const belajarStore = useBelajarStore();

// State shortcut OS (Ctrl vs Cmd)
const teksShortcut = ref("Ctrl+K");

onMounted(() => {
  if (
    typeof navigator !== "undefined" &&
    /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)
  ) {
    teksShortcut.value = "Cmd+K";
  }
});

// Memicu modal pencarian global dengan event buatan
const bukaPencarianGlobal = () => {
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      bubbles: true,
    }),
  );
};
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-[var(--pembatas)] bg-[var(--latar-kartu)]/90 backdrop-blur-md transition-colors"
  >
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <!-- Sisi Kiri: Tombol Hamburger Mobile & Logo -->
      <div class="flex items-center gap-3">
        <!-- Tombol Buka Drawer Sidebar Mobile -->
        <button
          type="button"
          class="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-[var(--teks-sekunder)] hover:bg-[var(--latar-sekunder)] hover:text-[var(--teks-utama)] transition-colors"
          aria-label="Buka navigasi materi"
          @click="preferensiStore.toggleDrawerMobile(true)"
        >
          <Menu class="h-5 w-5" />
        </button>

        <!-- Brand Identitas Utama -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img
            src="/Logo.png"
            alt="Logo KopiKode"
            class="h-9 w-9 rounded-lg object-contain transition-transform group-hover:scale-105"
          />
          <div class="flex flex-col">
            <span
              class="font-bold tracking-tight text-base sm:text-lg text-[var(--teks-utama)]"
            >
              KopiKode
            </span>
            <span
              class="text-[10px] text-[var(--teks-tersier)] -mt-1 hidden sm:inline"
            >
              Pusat Dokumentasi KSM
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Sisi Tengah: Kotak Pencarian Global yang Menonjol -->
      <div class="flex-1 max-w-md mx-4 hidden md:block">
        <button
          type="button"
          class="w-full flex items-center justify-between rounded-lg border border-[var(--pembatas)] bg-[var(--latar-sekunder)] px-3.5 py-2 text-sm text-[var(--teks-tersier)] hover:border-[var(--pembatas-kuat)] hover:text-[var(--teks-utama)] transition-colors"
          @click="bukaPencarianGlobal"
        >
          <span class="flex items-center gap-2">
            <Search class="h-4 w-4 text-[var(--teks-tersier)]" />
            <span>Cari topik, elemen, atau konsep...</span>
          </span>
          <kbd
            class="px-2 py-0.5 text-xs bg-[var(--latar-kartu)] text-[var(--teks-sekunder)] border border-[var(--pembatas)] rounded font-mono"
          >
            {{ teksShortcut }}
          </kbd>
        </button>
      </div>

      <!-- Sisi Kanan: Menu Navigasi, Status Belajar, & Tombol Tema -->
      <div class="flex items-center gap-1.5 sm:gap-2">
        <!-- Tombol Pencarian untuk Mobile -->
        <button
          type="button"
          class="md:hidden p-2 rounded-lg text-[var(--teks-sekunder)] hover:bg-[var(--latar-sekunder)] hover:text-[var(--teks-utama)] transition-colors"
          aria-label="Buka pencarian"
          @click="bukaPencarianGlobal"
        >
          <Search class="h-5 w-5" />
        </button>

        <!-- Navigasi Teks Desktop -->
        <nav class="hidden lg:flex items-center gap-1 text-sm font-medium">
          <NuxtLink
            to="/html/pengantar-dan-struktur"
            class="px-3 py-1.5 rounded-lg text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)] hover:bg-[var(--latar-sekunder)] transition-colors"
            active-class="text-[var(--aksen-primer)] bg-[var(--latar-sekunder)]"
          >
            HTML
          </NuxtLink>
          <NuxtLink
            to="/css/selector-dan-cascade"
            class="px-3 py-1.5 rounded-lg text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)] hover:bg-[var(--latar-sekunder)] transition-colors"
            active-class="text-[var(--aksen-primer)] bg-[var(--latar-sekunder)]"
          >
            CSS
          </NuxtLink>
          <NuxtLink
            to="/javascript/variabel-dan-tipe-data"
            class="px-3 py-1.5 rounded-lg text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)] hover:bg-[var(--latar-sekunder)] transition-colors"
            active-class="text-[var(--aksen-primer)] bg-[var(--latar-sekunder)]"
          >
            JavaScript
          </NuxtLink>
          <NuxtLink
            to="/tentang"
            class="px-3 py-1.5 rounded-lg text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)] hover:bg-[var(--latar-sekunder)] transition-colors"
            active-class="text-[var(--aksen-primer)] bg-[var(--latar-sekunder)]"
          >
            Tentang
          </NuxtLink>
        </nav>

        <div class="h-4 w-px bg-[var(--pembatas)] mx-1 hidden sm:block"></div>

        <!-- Indikator Belajar Ringkas -->
        <div
          v-if="belajarStore.totalSelesai > 0"
          class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[var(--status-sukses)] bg-[var(--status-sukses-lembut)] rounded-full"
          title="Jumlah materi yang sudah Anda pelajari"
        >
          <CheckCircle2 class="h-3.5 w-3.5" />
          <span>{{ belajarStore.totalSelesai }} selesai</span>
        </div>

        <!-- Tombol Ganti Tema (Terang / Gelap / Sistem) -->
        <button
          type="button"
          class="relative p-2 rounded-lg text-[var(--teks-sekunder)] hover:bg-[var(--latar-sekunder)] hover:text-[var(--teks-utama)] transition-colors"
          :title="`Mode tema saat ini: ${preferensiStore.tema}. Klik untuk beralih.`"
          aria-label="Ganti mode tema tampilan"
          @click="preferensiStore.gantiTema()"
        >
          <Sun
            v-if="preferensiStore.tema === 'terang'"
            class="h-5 w-5 text-[var(--aksen-hangat)]"
          />
          <Moon
            v-else-if="preferensiStore.tema === 'gelap'"
            class="h-5 w-5 text-[var(--aksen-primer)]"
          />
          <Laptop v-else class="h-5 w-5" />
        </button>
      </div>
    </div>
  </header>
</template>

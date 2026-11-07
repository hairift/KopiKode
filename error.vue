<script setup lang="ts">
import { Home, ArrowLeft, Search } from "lucide-vue-next";

defineProps<{
  error: {
    statusCode?: number;
    statusMessage?: string;
    message?: string;
  };
}>();

const tanganiBersihkanError = () => {
  clearError({ redirect: "/" });
};

const bukaPencarian = () => {
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
  <div
    class="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--latar-utama)] text-[var(--teks-utama)] text-center"
  >
    <div class="max-w-md space-y-6">
      <div class="space-y-2">
        <span
          class="text-xs font-mono font-bold uppercase tracking-widest text-[var(--aksen-primer)]"
        >
          Kode Status {{ error.statusCode || 404 }}
        </span>
        <h1 class="text-3xl sm:text-4xl font-bold font-judul">
          Halaman Tidak Ditemukan
        </h1>
        <p class="text-sm text-[var(--teks-sekunder)] leading-relaxed">
          Materi atau tautan yang Anda tuju mungkin telah diperbarui jalurnya
          atau belum dipublikasikan di KopiKode.
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--aksen-primer)] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
          @click="tanganiBersihkanError"
        >
          <Home class="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--pembatas)] bg-[var(--latar-kartu)] text-sm font-medium text-[var(--teks-utama)] hover:bg-[var(--latar-sekunder)] transition-colors cursor-pointer"
          @click="bukaPencarian"
        >
          <Search class="h-4 w-4 text-[var(--teks-tersier)]" />
          <span>Cari Materi (Ctrl+K)</span>
        </button>
      </div>
    </div>
  </div>
</template>

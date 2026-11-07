<script setup lang="ts">
import { ChevronRight, Home } from "lucide-vue-next";

interface ItemJejak {
  label: string;
  tautan?: string;
}

defineProps<{
  daftarJejak: ItemJejak[];
}>();
</script>

<template>
  <nav
    aria-label="Jejak Navigasi"
    class="flex items-center text-xs text-[var(--teks-tersier)] mb-6 overflow-x-auto whitespace-nowrap pb-1"
  >
    <ol class="flex items-center gap-1.5 list-none p-0 m-0">
      <li class="flex items-center gap-1.5">
        <NuxtLink
          to="/"
          class="flex items-center gap-1 text-[var(--teks-tersier)] hover:text-[var(--teks-utama)] transition-colors"
          title="Kembali ke Beranda"
        >
          <Home class="h-3.5 w-3.5" />
          <span class="sr-only">Beranda</span>
        </NuxtLink>
      </li>

      <li
        v-for="(item, indeks) in daftarJejak"
        :key="indeks"
        class="flex items-center gap-1.5"
      >
        <ChevronRight class="h-3 w-3 text-[var(--pembatas-kuat)] shrink-0" />
        <NuxtLink
          v-if="item.tautan && indeks < daftarJejak.length - 1"
          :to="item.tautan"
          class="text-[var(--teks-sekunder)] hover:text-[var(--aksen-primer)] transition-colors"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="text-[var(--teks-utama)] font-medium truncate max-w-[200px] sm:max-w-none"
          :aria-current="indeks === daftarJejak.length - 1 ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

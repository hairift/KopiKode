<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

export interface ItemTautanNavigasi {
  judul: string;
  tautan: string;
}

defineProps<{
  sebelumnya?: ItemTautanNavigasi | null;
  selanjutnya?: ItemTautanNavigasi | null;
}>();
</script>

<template>
  <div
    class="mt-12 pt-8 border-t border-[var(--pembatas)] grid grid-cols-1 sm:grid-cols-2 gap-4"
  >
    <!-- Tombol Materi Sebelumnya -->
    <div>
      <NuxtLink
        v-if="sebelumnya"
        :to="sebelumnya.tautan"
        class="group flex flex-col items-start p-4 rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] hover:border-[var(--aksen-primer)] hover:shadow-xs transition-all h-full"
      >
        <span
          class="flex items-center gap-1 text-xs text-[var(--teks-tersier)] mb-1 group-hover:text-[var(--aksen-primer)]"
        >
          <ChevronLeft
            class="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
          />
          <span>Sebelumnya</span>
        </span>
        <span
          class="text-sm font-semibold text-[var(--teks-utama)] line-clamp-1"
        >
          {{ sebelumnya.judul }}
        </span>
      </NuxtLink>
    </div>

    <!-- Tombol Materi Selanjutnya -->
    <div>
      <NuxtLink
        v-if="selanjutnya"
        :to="selanjutnya.tautan"
        class="group flex flex-col items-end text-right p-4 rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] hover:border-[var(--aksen-primer)] hover:shadow-xs transition-all h-full ml-auto w-full"
      >
        <span
          class="flex items-center gap-1 text-xs text-[var(--teks-tersier)] mb-1 group-hover:text-[var(--aksen-primer)]"
        >
          <span>Selanjutnya</span>
          <ChevronRight
            class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </span>
        <span
          class="text-sm font-semibold text-[var(--teks-utama)] line-clamp-1"
        >
          {{ selanjutnya.judul }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

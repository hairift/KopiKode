<script setup lang="ts">
import { AlertTriangle, Lightbulb, Info, CheckCircle2 } from "lucide-vue-next";

interface PropsKotak {
  tipe?: "info" | "tips" | "peringatan" | "bahaya";
  judul?: string;
}

const props = withDefaults(defineProps<PropsKotak>(), {
  tipe: "info",
  judul: "",
});
</script>

<template>
  <aside
    class="my-6 rounded-xl border p-4 text-sm transition-colors"
    :class="[
      tipe === 'peringatan'
        ? 'border-[var(--status-peringatan)] bg-[var(--status-peringatan-lembut)]/40 text-[var(--teks-utama)]'
        : tipe === 'bahaya'
          ? 'border-[var(--status-bahaya)] bg-[var(--status-bahaya-lembut)]/40 text-[var(--teks-utama)]'
          : tipe === 'tips'
            ? 'border-[var(--aksen-hangat)] bg-[var(--aksen-hangat-lembut)]/40 text-[var(--teks-utama)]'
            : 'border-[var(--aksen-primer)] bg-[var(--aksen-primer-lembut)]/40 text-[var(--teks-utama)]',
    ]"
  >
    <div class="flex items-start gap-3">
      <!-- Ikon Representatif Sesuai Tipe Callout -->
      <div class="shrink-0 mt-0.5">
        <AlertTriangle
          v-if="tipe === 'peringatan' || tipe === 'bahaya'"
          class="h-5 w-5"
          :class="[
            tipe === 'bahaya'
              ? 'text-[var(--status-bahaya)]'
              : 'text-[var(--status-peringatan)]',
          ]"
        />
        <Lightbulb
          v-else-if="tipe === 'tips'"
          class="h-5 w-5 text-[var(--aksen-hangat)]"
        />
        <Info v-else class="h-5 w-5 text-[var(--aksen-primer)]" />
      </div>

      <!-- Konten Peringatan / Tips -->
      <div class="flex-1 min-w-0 space-y-1">
        <h5
          v-if="judul"
          class="font-semibold text-sm leading-snug"
          :class="[
            tipe === 'bahaya'
              ? 'text-[var(--status-bahaya)]'
              : tipe === 'peringatan'
                ? 'text-[var(--status-peringatan)]'
                : tipe === 'tips'
                  ? 'text-[var(--aksen-hangat)]'
                  : 'text-[var(--aksen-primer)]',
          ]"
        >
          {{ judul }}
        </h5>
        <div class="prose-sm leading-relaxed text-[var(--teks-utama)]">
          <slot />
        </div>
      </div>
    </div>
  </aside>
</template>

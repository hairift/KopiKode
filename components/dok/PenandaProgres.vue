<script setup lang="ts">
import { computed } from "vue";
import { Bookmark, CheckCircle2, Share2, Check } from "lucide-vue-next";
import { useBelajarStore } from "~/stores/belajarStore";

const props = defineProps<{
  pathMateri: string;
  judulMateri: string;
  namaTeknologi: string;
}>();

const belajarStore = useBelajarStore();

const statusBookmark = computed(() =>
  belajarStore.apakahBookmark(props.pathMateri),
);
const statusSelesai = computed(() =>
  belajarStore.apakahSelesai(props.pathMateri),
);

const sudahDisalin = ref(false);

const toggleBookmark = () => {
  belajarStore.toggleBookmark(props.pathMateri);
};

const toggleSelesai = () => {
  belajarStore.toggleSelesai(props.pathMateri);
};

const salinTautan = async () => {
  if (typeof window === "undefined") return;
  try {
    await navigator.clipboard.writeText(window.location.href);
    sudahDisalin.value = true;
    setTimeout(() => {
      sudahDisalin.value = false;
    }, 2000);
  } catch (err) {
    // Abaikan kegagalan salin
  }
};
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 pt-2 pb-4">
    <!-- Tombol Sudah Dipelajari -->
    <button
      type="button"
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer"
      :class="[
        statusSelesai
          ? 'bg-[var(--status-sukses-lembut)] border-[var(--status-sukses)] text-[var(--status-sukses)]'
          : 'bg-[var(--latar-kartu)] border-[var(--pembatas)] text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)] hover:border-[var(--pembatas-kuat)]',
      ]"
      @click="toggleSelesai"
    >
      <CheckCircle2 class="h-4 w-4" />
      <span>{{ statusSelesai ? "Sudah Dipelajari" : "Tandai Selesai" }}</span>
    </button>

    <!-- Tombol Bookmark -->
    <button
      type="button"
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer"
      :class="[
        statusBookmark
          ? 'bg-[var(--aksen-hangat-lembut)] border-[var(--aksen-hangat)] text-[var(--aksen-hangat)]'
          : 'bg-[var(--latar-kartu)] border-[var(--pembatas)] text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)] hover:border-[var(--pembatas-kuat)]',
      ]"
      @click="toggleBookmark"
    >
      <Bookmark class="h-4 w-4" :class="{ 'fill-current': statusBookmark }" />
      <span>{{ statusBookmark ? "Tersimpan" : "Bookmark" }}</span>
    </button>

    <!-- Tombol Salin Tautan -->
    <button
      type="button"
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--pembatas)] bg-[var(--latar-kartu)] text-[var(--teks-tersier)] hover:text-[var(--teks-utama)] hover:border-[var(--pembatas-kuat)] transition-colors cursor-pointer"
      @click="salinTautan"
    >
      <Check v-if="sudahDisalin" class="h-4 w-4 text-[var(--status-sukses)]" />
      <Share2 v-else class="h-4 w-4" />
      <span>{{ sudahDisalin ? "Tersalin" : "Bagikan" }}</span>
    </button>
  </div>
</template>

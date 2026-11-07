<script setup lang="ts">
import { onMounted } from "vue";
import { usePreferensiStore } from "~/stores/preferensiStore";
import { useBelajarStore } from "~/stores/belajarStore";
import ModalPencarian from "~/components/pencarian/ModalPencarian.vue";

const preferensiStore = usePreferensiStore();
const belajarStore = useBelajarStore();

onMounted(() => {
  preferensiStore.inisialisasiPreferensi();
  belajarStore.inisialisasiDataBelajar();
});

useHead({
  script: [
    {
      // Skrip pencegah flicker tema saat inisialisasi halaman
      innerHTML: `(function(){try{const t=localStorage.getItem('kopikode_tema');const d=t==='gelap'||(!t||t==='sistem')&&window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
      tagPosition: "bodyOpen",
    },
  ],
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-[var(--latar-utama)] text-[var(--teks-utama)] transition-colors"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Modal Pencarian Global (Ctrl+K) -->
    <ModalPencarian />
  </div>
</template>

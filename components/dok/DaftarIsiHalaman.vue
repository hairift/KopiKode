<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { AlignLeft, ArrowUp } from "lucide-vue-next";

export interface ItemToc {
  id: string;
  text: string;
  depth: number;
  children?: ItemToc[];
}

const props = defineProps<{
  daftarTautan: ItemToc[];
}>();

const idAktif = ref<string>("");

// Mengamati heading yang sedang berada dalam viewport
let observer: IntersectionObserver | null = null;

const inisialisasiObserver = () => {
  if (typeof window === "undefined") return;

  if (observer) {
    observer.disconnect();
  }

  const elemenHeadings = document.querySelectorAll("article h2, article h3");
  if (elemenHeadings.length === 0) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          idAktif.value = entry.target.id;
          break;
        }
      }
    },
    {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    },
  );

  elemenHeadings.forEach((el) => {
    observer?.observe(el);
  });
};

const gulirKeAtas = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

watch(
  () => props.daftarTautan,
  () => {
    setTimeout(inisialisasiObserver, 200);
  },
  { deep: true },
);

onMounted(() => {
  setTimeout(inisialisasiObserver, 300);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <nav
    v-if="daftarTautan && daftarTautan.length > 0"
    aria-label="Daftar Isi Halaman Ini"
    class="space-y-4 text-xs"
  >
    <div
      class="flex items-center gap-2 font-semibold uppercase tracking-wider text-[var(--teks-tersier)]"
    >
      <AlignLeft class="h-3.5 w-3.5" />
      <span>Di Halaman Ini</span>
    </div>

    <ul class="space-y-2 border-l border-[var(--pembatas)] pl-3 list-none">
      <li
        v-for="tautan in daftarTautan"
        :key="tautan.id"
        class="transition-colors"
        :class="[tautan.depth === 3 ? 'pl-3' : '']"
      >
        <a
          :href="`#${tautan.id}`"
          class="block py-0.5 leading-snug transition-colors"
          :class="[
            idAktif === tautan.id
              ? 'font-semibold text-[var(--aksen-primer)] -ml-[13px] pl-3 border-l-2 border-[var(--aksen-primer)]'
              : 'text-[var(--teks-tersier)] hover:text-[var(--teks-utama)]',
          ]"
        >
          {{ tautan.text }}
        </a>

        <!-- Subheading level 3 jika ada -->
        <ul
          v-if="tautan.children && tautan.children.length > 0"
          class="mt-1 space-y-1 pl-3 list-none"
        >
          <li v-for="anak in tautan.children" :key="anak.id">
            <a
              :href="`#${anak.id}`"
              class="block py-0.5 transition-colors"
              :class="[
                idAktif === anak.id
                  ? 'font-semibold text-[var(--aksen-primer)]'
                  : 'text-[var(--teks-tersier)] hover:text-[var(--teks-utama)]',
              ]"
            >
              {{ anak.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>

    <!-- Tombol Kembali ke Atas Halaman -->
    <button
      type="button"
      class="inline-flex items-center gap-1.5 pt-2 text-[var(--teks-tersier)] hover:text-[var(--teks-utama)] transition-colors cursor-pointer"
      @click="gulirKeAtas"
    >
      <ArrowUp class="h-3.5 w-3.5" />
      <span>Kembali ke atas</span>
    </button>
  </nav>
</template>

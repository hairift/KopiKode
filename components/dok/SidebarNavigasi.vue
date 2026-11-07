<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Bookmark,
  FileCode2,
  Palette,
  Terminal,
  X,
} from "lucide-vue-next";
import { daftarTeknologi, type ItemTeknologi } from "~/data/teknologiRegistry";
import { useBelajarStore } from "~/stores/belajarStore";
import { usePreferensiStore } from "~/stores/preferensiStore";

const route = useRoute();
const belajarStore = useBelajarStore();
const preferensiStore = usePreferensiStore();

// Menentukan teknologi aktif berdasarkan segmen URL pertama
const teknologiAktif = computed(() => {
  const segmen = route.path.split("/")[1];
  const temukan = daftarTeknologi.find(
    (t) => t.slug === segmen && t.status === "tersedia",
  );
  return temukan || daftarTeknologi[0];
});

// Melacak status buka/tutup setiap bab materi
const statusBabTerbuka = ref<Record<string, boolean>>({});

// Inisialisasi bab agar terbuka secara default
watch(
  teknologiAktif,
  (tekBaru) => {
    if (!tekBaru?.babMateri) return;
    tekBaru.babMateri.forEach((bab) => {
      if (statusBabTerbuka.value[bab.namaKategori] === undefined) {
        statusBabTerbuka.value[bab.namaKategori] = true;
      }
    });
  },
  { immediate: true },
);

const toggleBab = (namaBab: string) => {
  statusBabTerbuka.value[namaBab] = !statusBabTerbuka.value[namaBab];
};

// Menghitung progres untuk teknologi aktif
const statistikProgres = computed(() => {
  if (!teknologiAktif.value?.babMateri)
    return { persen: 0, selesai: 0, total: 0 };
  const daftarSemuaSlug: string[] = [];
  for (const bab of teknologiAktif.value.babMateri) {
    for (const materi of bab.daftarMateri) {
      daftarSemuaSlug.push(`/${teknologiAktif.value.slug}/${materi.slug}`);
    }
  }
  return belajarStore.hitungProgres(daftarSemuaSlug);
});

const tutupDrawerJikaMobile = () => {
  preferensiStore.toggleDrawerMobile(false);
};
</script>

<template>
  <aside
    class="w-full flex flex-col h-full bg-[var(--latar-kartu)] border-r border-[var(--pembatas)]"
  >
    <!-- Header Sidebar: Pemilih Teknologi & Tombol Tutup Mobile -->
    <div class="p-4 border-b border-[var(--pembatas)] space-y-3">
      <div class="flex items-center justify-between">
        <span
          class="text-xs font-semibold tracking-wider uppercase text-[var(--teks-tersier)]"
        >
          Jalur Belajar
        </span>
        <!-- Tombol Tutup Khusus Drawer Mobile -->
        <button
          type="button"
          class="lg:hidden p-1 text-[var(--teks-tersier)] hover:text-[var(--teks-utama)] rounded"
          aria-label="Tutup navigasi"
          @click="tutupDrawerJikaMobile"
        >
          <X class="h-4 w-4" />
        </button>
      </div>

      <!-- Tab Pemilih Teknologi (HTML, CSS, JS) -->
      <div
        class="grid grid-cols-3 gap-1 p-1 bg-[var(--latar-sekunder)] rounded-lg text-xs font-medium"
      >
        <NuxtLink
          to="/html/pengantar-dan-struktur"
          class="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md transition-colors"
          :class="[
            route.path.startsWith('/html')
              ? 'bg-[var(--latar-kartu)] text-[var(--aksen-primer)] shadow-xs font-semibold'
              : 'text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)]',
          ]"
          @click="tutupDrawerJikaMobile"
        >
          <FileCode2 class="h-3.5 w-3.5" />
          <span>HTML</span>
        </NuxtLink>

        <NuxtLink
          to="/css/selector-dan-cascade"
          class="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md transition-colors"
          :class="[
            route.path.startsWith('/css')
              ? 'bg-[var(--latar-kartu)] text-[var(--aksen-hangat)] shadow-xs font-semibold'
              : 'text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)]',
          ]"
          @click="tutupDrawerJikaMobile"
        >
          <Palette class="h-3.5 w-3.5" />
          <span>CSS</span>
        </NuxtLink>

        <NuxtLink
          to="/javascript/variabel-dan-tipe-data"
          class="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md transition-colors"
          :class="[
            route.path.startsWith('/javascript')
              ? 'bg-[var(--latar-kartu)] text-[var(--aksen-primer)] shadow-xs font-semibold'
              : 'text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)]',
          ]"
          @click="tutupDrawerJikaMobile"
        >
          <Terminal class="h-3.5 w-3.5" />
          <span>JS</span>
        </NuxtLink>
      </div>

      <!-- Bilah Progres Belajar -->
      <div class="space-y-1.5 pt-1">
        <div
          class="flex items-center justify-between text-xs text-[var(--teks-sekunder)]"
        >
          <span>Progres {{ teknologiAktif?.nama }}</span>
          <span class="font-semibold text-[var(--teks-utama)]">
            {{ statistikProgres.selesai }}/{{ statistikProgres.total }} ({{
              statistikProgres.persen
            }}%)
          </span>
        </div>
        <div
          class="h-1.5 w-full bg-[var(--latar-sekunder)] rounded-full overflow-hidden"
        >
          <div
            class="h-full bg-[var(--aksen-primer)] transition-all duration-300"
            :style="{ width: `${statistikProgres.persen}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Daftar Bab dan Materi (Navigasi Bertingkat) -->
    <nav
      class="flex-1 overflow-y-auto p-3 space-y-4 text-sm"
      aria-label="Navigasi Dokumentasi"
    >
      <div
        v-for="bab in teknologiAktif?.babMateri"
        :key="bab.namaKategori"
        class="space-y-1"
      >
        <!-- Judul Bab Bertingkat (Collapsible) -->
        <button
          type="button"
          class="w-full flex items-center justify-between py-1.5 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--teks-tersier)] hover:text-[var(--teks-utama)] rounded transition-colors text-left"
          @click="toggleBab(bab.namaKategori)"
        >
          <span>{{ bab.namaKategori }}</span>
          <ChevronDown
            v-if="statusBabTerbuka[bab.namaKategori]"
            class="h-3.5 w-3.5 transition-transform"
          />
          <ChevronRight v-else class="h-3.5 w-3.5 transition-transform" />
        </button>

        <!-- Daftar Tautan Materi di Bawah Bab -->
        <div
          v-show="statusBabTerbuka[bab.namaKategori]"
          class="space-y-0.5 pl-1 border-l border-[var(--pembatas)] ml-2"
        >
          <NuxtLink
            v-for="materi in bab.daftarMateri"
            :key="materi.slug"
            :to="`/${teknologiAktif.slug}/${materi.slug}`"
            class="group flex items-center justify-between py-1.5 px-2.5 rounded-md text-xs sm:text-sm transition-colors"
            :class="[
              route.path === `/${teknologiAktif.slug}/${materi.slug}`
                ? 'bg-[var(--latar-sorot)] text-[var(--aksen-primer)] font-semibold border-l-2 border-[var(--aksen-primer)] -ml-[2px]'
                : 'text-[var(--teks-sekunder)] hover:bg-[var(--latar-sekunder)] hover:text-[var(--teks-utama)]',
            ]"
            @click="tutupDrawerJikaMobile"
          >
            <span class="truncate pr-2">{{ materi.judul }}</span>

            <!-- Indikator Status Materi (Selesai / Bookmark) -->
            <span class="flex items-center gap-1 shrink-0">
              <Bookmark
                v-if="
                  belajarStore.apakahBookmark(
                    `/${teknologiAktif.slug}/${materi.slug}`,
                  )
                "
                class="h-3 w-3 text-[var(--aksen-hangat)] fill-[var(--aksen-hangat)]"
              />
              <CheckCircle2
                v-if="
                  belajarStore.apakahSelesai(
                    `/${teknologiAktif.slug}/${materi.slug}`,
                  )
                "
                class="h-3.5 w-3.5 text-[var(--status-sukses)]"
              />
            </span>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </aside>
</template>

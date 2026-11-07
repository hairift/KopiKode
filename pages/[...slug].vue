<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  daftarTeknologi,
  cariTeknologiDenganSlug,
} from "~/data/teknologiRegistry";
import { useBelajarStore } from "~/stores/belajarStore";
import AppBreadcrumb from "~/components/app/AppBreadcrumb.vue";
import PenandaProgres from "~/components/dok/PenandaProgres.vue";
import TombolNavigasi from "~/components/dok/TombolNavigasi.vue";
import DaftarIsiHalaman from "~/components/dok/DaftarIsiHalaman.vue";

definePageMeta({
  layout: "dokumentasi",
});

const route = useRoute();
const belajarStore = useBelajarStore();

// Path materi aktif
const pathAktif = computed(() => {
  const p = route.path;
  return p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;
});

// Ambil dokumen markdown melalui Nuxt Content
const { data: dokumen, error } = await useAsyncData(
  `konten-${pathAktif.value}`,
  () => queryContent(pathAktif.value).findOne(),
);

// Ambil metadata teknologi aktif dari registry
const segmenTeknologi = computed(() => pathAktif.value.split("/")[1] || "html");
const dataTeknologi = computed(() =>
  cariTeknologiDenganSlug(segmenTeknologi.value),
);

// Menyusun daftar jejak navigasi (Breadcrumb)
const daftarJejak = computed(() => {
  const jejak = [
    {
      label: dataTeknologi.value?.nama || "Dokumentasi",
      tautan: `/${segmenTeknologi.value}`,
    },
  ];

  if (dokumen.value?.kategori) {
    jejak.push({ label: dokumen.value.kategori });
  }

  if (dokumen.value?.title) {
    jejak.push({ label: dokumen.value.title });
  }

  return jejak;
});

// Menghitung materi sebelumnya dan materi selanjutnya
const navigasiSebelumSesudah = computed(() => {
  if (!dataTeknologi.value?.babMateri) {
    return { sebelumnya: null, selanjutnya: null };
  }

  const semuaMateri: { judul: string; tautan: string }[] = [];
  for (const bab of dataTeknologi.value.babMateri) {
    for (const m of bab.daftarMateri) {
      semuaMateri.push({
        judul: m.judul,
        tautan: `/${dataTeknologi.value.slug}/${m.slug}`,
      });
    }
  }

  const indeksSekarang = semuaMateri.findIndex(
    (m) => m.tautan === pathAktif.value,
  );
  if (indeksSekarang === -1) {
    return { sebelumnya: null, selanjutnya: null };
  }

  return {
    sebelumnya: indeksSekarang > 0 ? semuaMateri[indeksSekarang - 1] : null,
    selanjutnya:
      indeksSekarang < semuaMateri.length - 1
        ? semuaMateri[indeksSekarang + 1]
        : null,
  };
});

// Catat kunjungan ke store
onMounted(() => {
  if (dokumen.value?.title && dataTeknologi.value?.nama) {
    belajarStore.catatKunjungan(
      pathAktif.value,
      dokumen.value.title,
      dataTeknologi.value.nama,
    );
  }
});

// Metadata SEO halaman
useHead(() => ({
  title: dokumen.value?.title
    ? `${dokumen.value.title} - Dokumentasi ${dataTeknologi.value?.nama || ""} KopiKode`
    : "Dokumentasi KopiKode",
  meta: [
    {
      name: "description",
      content:
        dokumen.value?.description ||
        "Dokumentasi materi pemrograman terstruktur dan interaktif di KopiKode.",
    },
    {
      property: "og:title",
      content: dokumen.value?.title
        ? `${dokumen.value.title} - KopiKode`
        : "Dokumentasi KopiKode",
    },
    {
      property: "og:description",
      content:
        dokumen.value?.description ||
        "Panduan praktis dan playground kode langsung.",
    },
  ],
}));
</script>

<template>
  <div class="flex items-start gap-8">
    <!-- Konten Utama Dokumen -->
    <article class="flex-1 min-w-0 max-w-3xl">
      <!-- Jejak Breadcrumb -->
      <AppBreadcrumb :daftar-jejak="daftarJejak" />

      <!-- Judul & Keterangan Materi -->
      <header class="mb-8 pb-6 border-b border-[var(--pembatas)]">
        <div class="flex items-center gap-2 mb-2">
          <span
            class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--aksen-primer-lembut)] text-[var(--aksen-primer)]"
          >
            {{ dataTeknologi?.nama }}
          </span>
          <span
            v-if="dokumen?.kategori"
            class="text-xs text-[var(--teks-tersier)]"
          >
            &middot; {{ dokumen.kategori }}
          </span>
        </div>

        <h1
          class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--teks-utama)] font-judul mb-3"
        >
          {{ dokumen?.title }}
        </h1>

        <p
          v-if="dokumen?.description"
          class="text-base sm:text-lg text-[var(--teks-sekunder)] leading-relaxed"
        >
          {{ dokumen.description }}
        </p>

        <!-- Penanda Progres (Selesai / Simpan Bookmark) -->
        <PenandaProgres
          :path-materi="pathAktif"
          :judul-materi="dokumen?.title || ''"
          :nama-teknologi="dataTeknologi?.nama || ''"
        />
      </header>

      <!-- Renderer Konten Markdown & Komponen Interaktif -->
      <div class="konten-markdown">
        <ContentRenderer v-if="dokumen" :value="dokumen">
          <template #empty>
            <div class="py-12 text-center text-sm text-[var(--teks-tersier)]">
              Materi ini sedang dalam tahap penyusunan.
            </div>
          </template>
        </ContentRenderer>

        <!-- Tampilan Jika Rute Tidak Ditemukan -->
        <div v-else-if="error" class="py-16 text-center space-y-4">
          <h2 class="text-xl font-bold text-[var(--teks-utama)]">
            Materi Tidak Ditemukan
          </h2>
          <p class="text-sm text-[var(--teks-sekunder)]">
            Halaman yang Anda tuju belum tersedia atau telah berpindah alamat.
          </p>
          <NuxtLink
            to="/"
            class="inline-block px-4 py-2 rounded-lg bg-[var(--aksen-primer)] text-white text-sm font-medium hover:opacity-90"
          >
            Kembali ke Beranda
          </NuxtLink>
        </div>
      </div>

      <!-- Tombol Navigasi Sebelumnya / Selanjutnya -->
      <TombolNavigasi
        :sebelumnya="navigasiSebelumSesudah.sebelumnya"
        :selanjutnya="navigasiSebelumSesudah.selanjutnya"
      />
    </article>

    <!-- Panel Kanan: Daftar Isi "Di Halaman Ini" (Sticky pada Desktop Besar) -->
    <aside
      class="hidden xl:block w-60 shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto"
    >
      <DaftarIsiHalaman :daftar-tautan="dokumen?.body?.toc?.links || []" />
    </aside>
  </div>
</template>

<style>
/* Penataan tipografi konten markdown agar nyaman dibaca dan elegan */
.konten-markdown {
  line-height: 1.75;
  color: var(--teks-utama);
}

.konten-markdown h2 {
  font-family: "Newsreader", Georgia, serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--pembatas);
  scroll-margin-top: 5rem;
  color: var(--teks-utama);
}

.konten-markdown h3 {
  font-family: "Newsreader", Georgia, serif;
  font-size: 1.35rem;
  font-weight: 600;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  scroll-margin-top: 5rem;
  color: var(--teks-utama);
}

.konten-markdown h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.konten-markdown p {
  margin-top: 0.75rem;
  margin-bottom: 1rem;
  color: var(--teks-utama);
}

.konten-markdown ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.konten-markdown ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.konten-markdown li {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.konten-markdown strong {
  font-weight: 600;
  color: var(--teks-utama);
}

.konten-markdown a {
  color: var(--aksen-primer);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 500;
}

.konten-markdown a:hover {
  opacity: 0.85;
}

.konten-markdown blockquote {
  border-left: 3px solid var(--aksen-primer);
  padding-left: 1rem;
  font-style: italic;
  color: var(--teks-sekunder);
  margin: 1.25rem 0;
}

.konten-markdown code:not(pre code) {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85em;
  padding: 0.15rem 0.35rem;
  border-radius: 0.35rem;
  background-color: var(--latar-sekunder);
  color: var(--aksen-primer);
  border: 1px solid var(--pembatas);
}

.konten-markdown pre {
  margin: 1.25rem 0;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: var(--latar-kartu);
  border: 1px solid var(--pembatas);
  overflow-x: auto;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

.konten-markdown table {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.konten-markdown th {
  background-color: var(--latar-sekunder);
  border: 1px solid var(--pembatas);
  padding: 0.65rem 0.85rem;
  text-align: left;
  font-weight: 600;
}

.konten-markdown td {
  border: 1px solid var(--pembatas);
  padding: 0.65rem 0.85rem;
  color: var(--teks-sekunder);
}
</style>

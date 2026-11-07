<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  Search,
  X,
  CornerDownLeft,
  FileText,
  ChevronRight,
} from "lucide-vue-next";
import {
  usePencarian,
  type ItemHasilPencarian,
} from "~/composables/usePencarian";

const router = useRouter();
const {
  kataKunci,
  modalTerbuka,
  indeksTerpilih,
  hasilPencarian,
  hasilTerkelompok,
  bukaPencarian,
  tutupPencarian,
} = usePencarian();

const inputRef = ref<HTMLInputElement | null>(null);

// Navigasi ke tautan materi yang dipilih
const pilihItem = (item: ItemHasilPencarian) => {
  tutupPencarian();
  router.push(item.slug);
};

// Menangani shortcut keyboard global Ctrl/Cmd + K
const tanganiKeydownGlobal = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (modalTerbuka.value) {
      tutupPencarian();
    } else {
      bukaPencarian();
      setTimeout(() => inputRef.value?.focus(), 50);
    }
  } else if (event.key === "Escape" && modalTerbuka.value) {
    tutupPencarian();
  }
};

// Navigasi keyboard di dalam daftar hasil
const tanganiKeydownModal = (event: KeyboardEvent) => {
  const totalItem = hasilPencarian.value.length;
  if (totalItem === 0) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    indeksTerpilih.value = (indeksTerpilih.value + 1) % totalItem;
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    indeksTerpilih.value = (indeksTerpilih.value - 1 + totalItem) % totalItem;
  } else if (event.key === "Enter") {
    event.preventDefault();
    const itemTarget = hasilPencarian.value[indeksTerpilih.value];
    if (itemTarget) {
      pilihItem(itemTarget);
    }
  }
};

watch(modalTerbuka, (terbuka) => {
  if (terbuka) {
    setTimeout(() => inputRef.value?.focus(), 50);
  }
});

onMounted(() => {
  window.addEventListener("keydown", tanganiKeydownGlobal);
});

onUnmounted(() => {
  window.removeEventListener("keydown", tanganiKeydownGlobal);
});

// Ekspor fungsi agar bisa dipicu tombol luar
defineExpose({
  buka: bukaPencarian,
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modalTerbuka"
        class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/50 backdrop-blur-xs"
        @click.self="tutupPencarian"
      >
        <div
          class="w-full max-w-2xl overflow-hidden rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] shadow-2xl transition-all"
          @keydown="tanganiKeydownModal"
        >
          <!-- Bagian Input Pencarian -->
          <div
            class="flex items-center gap-3 border-b border-[var(--pembatas)] px-4 py-3"
          >
            <Search class="h-5 w-5 text-[var(--teks-tersier)] shrink-0" />
            <input
              ref="inputRef"
              v-model="kataKunci"
              type="text"
              placeholder="Cari dokumentasi materi, konsep, atau sintaks..."
              class="w-full bg-transparent text-sm sm:text-base text-[var(--teks-utama)] placeholder-[var(--teks-tersier)] outline-none"
            />
            <button
              v-if="kataKunci"
              type="button"
              class="p-1 text-[var(--teks-tersier)] hover:text-[var(--teks-utama)] rounded"
              @click="kataKunci = ''"
            >
              <X class="h-4 w-4" />
            </button>
            <kbd
              class="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs text-[var(--teks-tersier)] bg-[var(--latar-sekunder)] border border-[var(--pembatas)] rounded"
            >
              ESC
            </kbd>
          </div>

          <!-- Bagian Hasil Pencarian -->
          <div class="max-h-[60vh] overflow-y-auto p-2">
            <div
              v-if="hasilPencarian.length === 0"
              class="py-12 text-center text-sm text-[var(--teks-tersier)]"
            >
              Tidak ditemukan materi untuk "{{ kataKunci }}". Coba cari kata
              kunci lain seperti "flexbox", "doctypes", atau "promise".
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="(daftarItem, namaGrup) in hasilTerkelompok"
                :key="namaGrup"
                class="space-y-1"
              >
                <div
                  class="px-3 pt-2 pb-1 text-xs font-semibold tracking-wider uppercase text-[var(--teks-tersier)]"
                >
                  {{ namaGrup }}
                </div>

                <div
                  v-for="item in daftarItem"
                  :key="item.id"
                  class="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors"
                  :class="[
                    hasilPencarian.indexOf(item) === indeksTerpilih
                      ? 'bg-[var(--latar-sorot)] text-[var(--teks-utama)] font-medium'
                      : 'text-[var(--teks-sekunder)] hover:bg-[var(--latar-sekunder)] hover:text-[var(--teks-utama)]',
                  ]"
                  @click="pilihItem(item)"
                  @mouseenter="indeksTerpilih = hasilPencarian.indexOf(item)"
                >
                  <div class="flex items-start gap-3 min-w-0 pr-2">
                    <FileText
                      class="h-4 w-4 mt-0.5 shrink-0 text-[var(--aksen-primer)]"
                    />
                    <div class="min-w-0">
                      <div class="truncate text-[var(--teks-utama)]">
                        {{ item.judul }}
                      </div>
                      <div class="text-xs text-[var(--teks-tersier)] truncate">
                        {{ item.kategoriMateri }} &middot; {{ item.ringkasan }}
                      </div>
                    </div>
                  </div>

                  <div
                    class="shrink-0 flex items-center gap-1.5 text-xs text-[var(--teks-tersier)] opacity-0 group-hover:opacity-100"
                  >
                    <span>Buka</span>
                    <ChevronRight class="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bagian Footer Modal -->
          <div
            class="flex items-center justify-between border-t border-[var(--pembatas)] bg-[var(--latar-sekunder)] px-4 py-2.5 text-xs text-[var(--teks-tersier)]"
          >
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <kbd
                  class="px-1 py-0.5 bg-[var(--latar-kartu)] border border-[var(--pembatas)] rounded text-[10px]"
                  >↑</kbd
                >
                <kbd
                  class="px-1 py-0.5 bg-[var(--latar-kartu)] border border-[var(--pembatas)] rounded text-[10px]"
                  >↓</kbd
                >
                <span>Pilih</span>
              </span>
              <span class="flex items-center gap-1">
                <kbd
                  class="px-1 py-0.5 bg-[var(--latar-kartu)] border border-[var(--pembatas)] rounded text-[10px]"
                >
                  <CornerDownLeft class="h-2.5 w-2.5 inline" />
                </kbd>
                <span>Buka</span>
              </span>
            </div>
            <span>{{ hasilPencarian.length }} topik tersedia</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

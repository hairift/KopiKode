<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Columns,
  Rows,
  Terminal,
  Trash2,
  Code2,
  Eye,
  FileCode2,
  Palette,
} from "lucide-vue-next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { usePreferensiStore } from "~/stores/preferensiStore";

interface PropsPlayground {
  idContoh?: string;
  judul?: string;
  modeTampilan?: "berdampingan" | "atas_bawah" | "hanya_output";
  tabTersedia?: ("html" | "css" | "js")[];
  kodeHtml?: string;
  kodeCss?: string;
  kodeJs?: string;
  tinggiEditor?: string;
  sembunyikanConsole?: boolean;
}

const props = withDefaults(defineProps<PropsPlayground>(), {
  idContoh: () => `contoh-${Math.random().toString(36).substring(2, 9)}`,
  judul: "",
  modeTampilan: "berdampingan",
  tabTersedia: () => ["html", "css", "js"],
  kodeHtml: "",
  kodeCss: "",
  kodeJs: "",
  tinggiEditor: "280px",
  sembunyikanConsole: false,
});

const preferensiStore = usePreferensiStore();

// State kode internal yang dapat diedit pengguna
const teksHtml = ref(props.kodeHtml);
const teksCss = ref(props.kodeCss);
const teksJs = ref(props.kodeJs);

// Tab editor yang aktif (html, css, js)
const tabAktif = ref<"html" | "css" | "js">(
  props.tabTersedia.includes("html")
    ? "html"
    : props.tabTersedia.includes("css")
      ? "css"
      : "js",
);

// Pilihan fokus tampilan: 'semua' | 'kode' | 'output'
const fokusTampilan = ref<"semua" | "kode" | "output">("semua");

// Tata letak lokal (bisa diubah pengguna)
const tataLetakLokal = ref<"berdampingan" | "atas_bawah">(
  props.modeTampilan === "atas_bawah" ? "atas_bawah" : "berdampingan",
);

const modeLayarPenuh = ref(false);
const statusTersalin = ref(false);
const panelConsoleTerbuka = ref(false);

// Penampung log konsol dari dalam iframe
interface ItemLogConsole {
  id: number;
  tipe: "log" | "info" | "warn" | "error";
  pesan: string;
  waktu: string;
}
const daftarLogConsole = ref<ItemLogConsole[]>([]);

// Elemen DOM & CodeMirror
const wadahEditorRef = ref<HTMLDivElement | null>(null);
let tampilanEditor: EditorView | null = null;
const kompartemenBahasa = new Compartment();
const kompartemenTema = new Compartment();

// Konten sumber iframe sandboxed
const srcdocIframe = ref("");
let timerDebounce: any = null;

// Menghasilkan dokumen HTML lengkap dan aman untuk iframe
const buatDokumenPratinjau = () => {
  const kodeHtmlBersih = teksHtml.value;
  const kodeCssBersih = teksCss.value;
  const kodeJsBersih = teksJs.value;
  const idUnik = props.idContoh;

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #221c18;
      background-color: #ffffff;
      line-height: 1.5;
    }
    ${kodeCssBersih}
  </style>
  <script>
    (function() {
      const kirimPesanKeInduk = function(tipe, args) {
        try {
          const pesanGabung = Array.prototype.slice.call(args).map(function(item) {
            if (typeof item === 'object' && item !== null) {
              try { return JSON.stringify(item, null, 2); } catch(e) { return String(item); }
            }
            return String(item);
          }).join(' ');

          window.parent.postMessage({
            sumber: 'kopikode-sandbox',
            idContoh: '${idUnik}',
            tipe: tipe,
            pesan: pesanGabung,
            waktu: new Date().toLocaleTimeString('id-ID', { hour12: false })
          }, '*');
        } catch(e) {}
      };

      console.log = function() { kirimPesanKeInduk('log', arguments); };
      console.info = function() { kirimPesanKeInduk('info', arguments); };
      console.warn = function() { kirimPesanKeInduk('warn', arguments); };
      console.error = function() { kirimPesanKeInduk('error', arguments); };

      window.onerror = function(pesan, sumber, baris) {
        kirimPesanKeInduk('error', [pesan + ' (baris ' + baris + ')']);
        return false;
      };
    })();
  <\/script>
</head>
<body>
  ${kodeHtmlBersih}
  <script>
    try {
      ${kodeJsBersih}
    } catch(galat) {
      console.error(galat.message);
    }
  <\/script>
</body>
</html>`;
};

// Perbarui iframe dengan debounce 350ms
const jadwalkanPembaruanPratinjau = () => {
  clearTimeout(timerDebounce);
  timerDebounce = setTimeout(() => {
    srcdocIframe.value = buatDokumenPratinjau();
  }, 350);
};

// Inisialisasi ekstensi bahasa CodeMirror
const ambilEkstensiBahasa = (jenis: "html" | "css" | "js") => {
  if (jenis === "html") return html();
  if (jenis === "css") return css();
  return javascript();
};

// Inisialisasi editor CodeMirror 6
const pasangEditor = () => {
  if (!wadahEditorRef.value) return;

  if (tampilanEditor) {
    tampilanEditor.destroy();
  }

  const kodeAwal =
    tabAktif.value === "html"
      ? teksHtml.value
      : tabAktif.value === "css"
        ? teksCss.value
        : teksJs.value;

  const listenerPembaruan = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      const nilaiBaru = update.state.doc.toString();
      if (tabAktif.value === "html") teksHtml.value = nilaiBaru;
      else if (tabAktif.value === "css") teksCss.value = nilaiBaru;
      else if (tabAktif.value === "js") teksJs.value = nilaiBaru;

      jadwalkanPembaruanPratinjau();
    }
  });

  const temaEditorKustom = EditorView.theme({
    "&": {
      fontSize: "13px",
      fontFamily: "'JetBrains Mono', monospace",
    },
    ".cm-scroller": {
      overflow: "auto",
      maxHeight: modeLayarPenuh.value ? "70vh" : props.tinggiEditor,
      minHeight: "160px",
    },
    ".cm-content": {
      padding: "12px 0",
    },
    ".cm-line": {
      padding: "0 12px",
    },
  });

  const stateAwal = EditorState.create({
    doc: kodeAwal,
    extensions: [
      basicSetup,
      kompartemenBahasa.of(ambilEkstensiBahasa(tabAktif.value)),
      kompartemenTema.of(preferensiStore.tema === "gelap" ? oneDark : []),
      temaEditorKustom,
      listenerPembaruan,
    ],
  });

  tampilanEditor = new EditorView({
    state: stateAwal,
    parent: wadahEditorRef.value,
  });
};

// Ganti tab editor (HTML, CSS, JS)
const beralihTab = (tabBaru: "html" | "css" | "js") => {
  if (tabAktif.value === tabBaru || !tampilanEditor) return;
  tabAktif.value = tabBaru;

  const kodeTarget =
    tabBaru === "html"
      ? teksHtml.value
      : tabBaru === "css"
        ? teksCss.value
        : teksJs.value;

  tampilanEditor.dispatch({
    changes: {
      from: 0,
      to: tampilanEditor.state.doc.length,
      insert: kodeTarget,
    },
    effects: kompartemenBahasa.reconfigure(ambilEkstensiBahasa(tabBaru)),
  });
};

// Jalankan ulang pratinjau secara langsung
const jalankanUlang = () => {
  srcdocIframe.value = buatDokumenPratinjau();
};

// Reset kode ke nilai default
const resetKode = () => {
  teksHtml.value = props.kodeHtml;
  teksCss.value = props.kodeCss;
  teksJs.value = props.kodeJs;
  daftarLogConsole.value = [];

  if (tampilanEditor) {
    const kodeTarget =
      tabAktif.value === "html"
        ? teksHtml.value
        : tabAktif.value === "css"
          ? teksCss.value
          : teksJs.value;

    tampilanEditor.dispatch({
      changes: {
        from: 0,
        to: tampilanEditor.state.doc.length,
        insert: kodeTarget,
      },
    });
  }

  jalankanUlang();
};

// Salin seluruh kode ke papan klip
const salinSeluruhKode = async () => {
  let teksGabung = "";
  if (teksHtml.value.trim())
    teksGabung += `<!-- HTML -->\n${teksHtml.value.trim()}\n\n`;
  if (teksCss.value.trim())
    teksGabung += `/* CSS */\n${teksCss.value.trim()}\n\n`;
  if (teksJs.value.trim())
    teksGabung += `// JavaScript\n${teksJs.value.trim()}`;

  try {
    await navigator.clipboard.writeText(teksGabung.trim());
    statusTersalin.value = true;
    setTimeout(() => {
      statusTersalin.value = false;
    }, 2000);
  } catch (err) {
    // Abaikan kegagalan salin
  }
};

// Bersihkan daftar log console
const bersihkanConsole = () => {
  daftarLogConsole.value = [];
};

// Tangkap pesan log dari iframe melalui postMessage
const tanganiPesanIframe = (event: MessageEvent) => {
  if (!event.data || event.data.sumber !== "kopikode-sandbox") return;
  if (event.data.idContoh !== props.idContoh) return;

  daftarLogConsole.value.push({
    id: Date.now() + Math.random(),
    tipe: event.data.tipe || "log",
    pesan: event.data.pesan || "",
    waktu: event.data.waktu || "",
  });

  // Buka panel otomatis jika ada error pada JS
  if (event.data.tipe === "error") {
    panelConsoleTerbuka.value = true;
  }
};

// Siklus hidup
onMounted(() => {
  window.addEventListener("message", tanganiPesanIframe);
  srcdocIframe.value = buatDokumenPratinjau();
  nextTick(() => {
    pasangEditor();
  });
});

onUnmounted(() => {
  window.removeEventListener("message", tanganiPesanIframe);
  if (timerDebounce) clearTimeout(timerDebounce);
  if (tampilanEditor) tampilanEditor.destroy();
});

// Sinkronisasi tema editor dengan preferensi global
watch(
  () => preferensiStore.tema,
  () => {
    if (!tampilanEditor) return;
    const gunakanGelap =
      preferensiStore.tema === "gelap" ||
      (preferensiStore.tema === "sistem" &&
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    tampilanEditor.dispatch({
      effects: kompartemenTema.reconfigure(gunakanGelap ? oneDark : []),
    });
  },
);
</script>

<template>
  <div
    class="my-8 rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] shadow-sm transition-all overflow-hidden"
    :class="[
      modeLayarPenuh
        ? 'fixed inset-4 z-50 flex flex-col bg-[var(--latar-kartu)] shadow-2xl m-0'
        : '',
    ]"
  >
    <!-- Bar Atas Playground: Judul, Tab Bahasa, & Alat Kontrol -->
    <div
      class="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--pembatas)] bg-[var(--latar-sekunder)] px-3 py-2 text-xs"
    >
      <!-- Sisi Kiri: Judul dan Tab Bahasa Editor -->
      <div class="flex items-center gap-2">
        <span
          v-if="judul"
          class="font-semibold text-[var(--teks-utama)] pr-2 hidden sm:inline"
        >
          {{ judul }}
        </span>

        <!-- Pilihan Tab Bahasa (Hanya yang relevan) -->
        <div
          v-if="tabTersedia.length > 1 && fokusTampilan !== 'output'"
          class="flex items-center gap-1 bg-[var(--latar-kartu)] p-0.5 rounded-lg border border-[var(--pembatas)]"
        >
          <button
            v-if="tabTersedia.includes('html')"
            type="button"
            class="px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            :class="[
              tabAktif === 'html'
                ? 'bg-[var(--aksen-primer)] text-white shadow-xs'
                : 'text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)]',
            ]"
            @click="beralihTab('html')"
          >
            <FileCode2 class="h-3 w-3" />
            <span>HTML</span>
          </button>

          <button
            v-if="tabTersedia.includes('css')"
            type="button"
            class="px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            :class="[
              tabAktif === 'css'
                ? 'bg-[var(--aksen-hangat)] text-white shadow-xs'
                : 'text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)]',
            ]"
            @click="beralihTab('css')"
          >
            <Palette class="h-3 w-3" />
            <span>CSS</span>
          </button>

          <button
            v-if="tabTersedia.includes('js')"
            type="button"
            class="px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            :class="[
              tabAktif === 'js'
                ? 'bg-[var(--aksen-primer)] text-white shadow-xs'
                : 'text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)]',
            ]"
            @click="beralihTab('js')"
          >
            <Terminal class="h-3 w-3" />
            <span>JS</span>
          </button>
        </div>

        <span
          v-else-if="tabTersedia.length === 1 && fokusTampilan !== 'output'"
          class="px-2 py-0.5 font-mono text-[10px] uppercase font-bold text-[var(--teks-tersier)] bg-[var(--latar-kartu)] rounded border border-[var(--pembatas)]"
        >
          {{ tabTersedia[0] }}
        </span>
      </div>

      <!-- Sisi Kanan: Tab Tampilan (Kode/Output) & Tombol Kontrol -->
      <div class="flex items-center gap-1 ml-auto">
        <!-- Pengalih Fokus (Semua / Kode / Output) untuk layar kecil -->
        <div
          class="flex items-center bg-[var(--latar-kartu)] p-0.5 rounded-lg border border-[var(--pembatas)] sm:hidden"
        >
          <button
            type="button"
            class="p-1 rounded text-xs"
            :class="[
              fokusTampilan === 'kode'
                ? 'bg-[var(--latar-sorot)] text-[var(--teks-utama)] font-bold'
                : 'text-[var(--teks-tersier)]',
            ]"
            title="Tampilkan Kode Saja"
            @click="fokusTampilan = 'kode'"
          >
            <Code2 class="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            class="p-1 rounded text-xs"
            :class="[
              fokusTampilan === 'semua'
                ? 'bg-[var(--latar-sorot)] text-[var(--teks-utama)] font-bold'
                : 'text-[var(--teks-tersier)]',
            ]"
            title="Tampilkan Berdampingan"
            @click="fokusTampilan = 'semua'"
          >
            <Columns class="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            class="p-1 rounded text-xs"
            :class="[
              fokusTampilan === 'output'
                ? 'bg-[var(--latar-sorot)] text-[var(--teks-utama)] font-bold'
                : 'text-[var(--teks-tersier)]',
            ]"
            title="Tampilkan Output Saja"
            @click="fokusTampilan = 'output'"
          >
            <Eye class="h-3.5 w-3.5" />
          </button>
        </div>

        <!-- Tombol Jalankan -->
        <button
          type="button"
          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--aksen-primer-lembut)] text-[var(--aksen-primer)] hover:opacity-90 transition-opacity cursor-pointer"
          title="Jalankan Ulang Kode"
          @click="jalankanUlang"
        >
          <Play class="h-3 w-3 fill-current" />
          <span class="hidden sm:inline">Jalankan</span>
        </button>

        <!-- Tombol Reset -->
        <button
          type="button"
          class="p-1.5 rounded-lg text-[var(--teks-tersier)] hover:text-[var(--teks-utama)] hover:bg-[var(--latar-kartu)] transition-colors cursor-pointer"
          title="Reset ke Kode Awal"
          @click="resetKode"
        >
          <RotateCcw class="h-3.5 w-3.5" />
        </button>

        <!-- Tombol Salin Kode -->
        <button
          type="button"
          class="p-1.5 rounded-lg text-[var(--teks-tersier)] hover:text-[var(--teks-utama)] hover:bg-[var(--latar-kartu)] transition-colors cursor-pointer"
          :title="statusTersalin ? 'Kode Tersalin!' : 'Salin Kode'"
          @click="salinSeluruhKode"
        >
          <Check
            v-if="statusTersalin"
            class="h-3.5 w-3.5 text-[var(--status-sukses)]"
          />
          <Copy v-else class="h-3.5 w-3.5" />
        </button>

        <!-- Tombol Pengatur Tata Letak (Berdampingan vs Atas-Bawah) -->
        <button
          v-if="!modeLayarPenuh"
          type="button"
          class="hidden md:inline-flex p-1.5 rounded-lg text-[var(--teks-tersier)] hover:text-[var(--teks-utama)] hover:bg-[var(--latar-kartu)] transition-colors cursor-pointer"
          :title="
            tataLetakLokal === 'berdampingan'
              ? 'Ubah ke Tata Letak Atas-Bawah'
              : 'Ubah ke Tata Letak Berdampingan'
          "
          @click="
            tataLetakLokal =
              tataLetakLokal === 'berdampingan' ? 'atas_bawah' : 'berdampingan'
          "
        >
          <Rows v-if="tataLetakLokal === 'berdampingan'" class="h-3.5 w-3.5" />
          <Columns v-else class="h-3.5 w-3.5" />
        </button>

        <!-- Tombol Layar Penuh -->
        <button
          type="button"
          class="p-1.5 rounded-lg text-[var(--teks-tersier)] hover:text-[var(--teks-utama)] hover:bg-[var(--latar-kartu)] transition-colors cursor-pointer"
          :title="
            modeLayarPenuh ? 'Keluar dari Layar Penuh' : 'Buka Layar Penuh'
          "
          @click="modeLayarPenuh = !modeLayarPenuh"
        >
          <Minimize2 v-if="modeLayarPenuh" class="h-3.5 w-3.5" />
          <Maximize2 v-else class="h-3.5 w-3.5" />
        </button>
      </div>
    </div>

    <!-- Badan Utama: Area Editor & Panel Output Pratinjau -->
    <div
      class="grid transition-all"
      :class="[
        modeLayarPenuh ? 'flex-1 overflow-hidden' : '',
        fokusTampilan === 'kode'
          ? 'grid-cols-1'
          : fokusTampilan === 'output'
            ? 'grid-cols-1'
            : tataLetakLokal === 'berdampingan'
              ? 'grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--pembatas)]'
              : 'grid-cols-1 divide-y divide-[var(--pembatas)]',
      ]"
    >
      <!-- Panel Kiri/Atas: Editor CodeMirror -->
      <div
        v-show="fokusTampilan !== 'output'"
        class="flex flex-col bg-[var(--latar-kartu)] overflow-hidden"
      >
        <div ref="wadahEditorRef" class="w-full flex-1 overflow-auto"></div>
      </div>

      <!-- Panel Kanan/Bawah: Output Live Iframe + Panel Console -->
      <div
        v-show="fokusTampilan !== 'kode'"
        class="flex flex-col bg-white overflow-hidden"
        :class="[modeLayarPenuh ? 'flex-1' : '']"
      >
        <!-- Header Output Label -->
        <div
          class="flex items-center justify-between px-3 py-1.5 border-b border-[var(--pembatas)] bg-[var(--latar-sekunder)] text-[11px] text-[var(--teks-tersier)]"
        >
          <span
            class="font-medium flex items-center gap-1.5 text-[var(--teks-utama)]"
          >
            <Eye class="h-3 w-3 text-[var(--aksen-primer)]" />
            <span>Hasil Pratinjau</span>
          </span>
          <span class="font-mono text-[10px]">sandbox terisolasi</span>
        </div>

        <!-- Iframe Pratinjau Interaktif -->
        <div class="relative flex-1 min-h-[180px] bg-white">
          <iframe
            :srcdoc="srcdocIframe"
            sandbox="allow-scripts"
            title="Pratinjau Kode KopiKode"
            class="w-full h-full border-0 block"
            :style="{ height: modeLayarPenuh ? '100%' : tinggiEditor }"
          ></iframe>
        </div>

        <!-- Panel Console Terintegrasi -->
        <div
          v-if="!sembunyikanConsole"
          class="border-t border-[var(--pembatas)] bg-[var(--latar-sekunder)] text-xs font-mono"
        >
          <!-- Tombol Pembuka Panel Console -->
          <div
            class="flex items-center justify-between px-3 py-1.5 bg-[var(--latar-kartu)] border-b border-[var(--pembatas)]"
          >
            <button
              type="button"
              class="flex items-center gap-1.5 text-[var(--teks-sekunder)] hover:text-[var(--teks-utama)] transition-colors cursor-pointer"
              @click="panelConsoleTerbuka = !panelConsoleTerbuka"
            >
              <Terminal class="h-3.5 w-3.5" />
              <span>Console</span>
              <span
                v-if="daftarLogConsole.length > 0"
                class="px-1.5 py-0.2 rounded-full text-[10px] bg-[var(--latar-sorot)] text-[var(--teks-utama)] font-bold"
              >
                {{ daftarLogConsole.length }}
              </span>
            </button>

            <button
              v-if="daftarLogConsole.length > 0"
              type="button"
              class="p-1 text-[var(--teks-tersier)] hover:text-[var(--status-bahaya)] rounded cursor-pointer"
              title="Bersihkan Console"
              @click="bersihkanConsole"
            >
              <Trash2 class="h-3 w-3" />
            </button>
          </div>

          <!-- Isi Log Console -->
          <div
            v-show="panelConsoleTerbuka"
            class="max-h-36 overflow-y-auto p-2 space-y-1 bg-[var(--latar-kartu)] border-b border-[var(--pembatas)] text-[11px]"
          >
            <div
              v-if="daftarLogConsole.length === 0"
              class="text-[var(--teks-tersier)] italic py-1 px-2"
            >
              Belum ada keluaran console.log, warning, atau error.
            </div>

            <div
              v-for="log in daftarLogConsole"
              :key="log.id"
              class="flex items-start gap-2 px-2 py-1 rounded"
              :class="[
                log.tipe === 'error'
                  ? 'bg-[var(--status-bahaya-lembut)] text-[var(--status-bahaya)]'
                  : log.tipe === 'warn'
                    ? 'bg-[var(--status-peringatan-lembut)] text-[var(--status-peringatan)]'
                    : 'text-[var(--teks-utama)] hover:bg-[var(--latar-sekunder)]',
              ]"
            >
              <span class="text-[var(--teks-tersier)] shrink-0 text-[10px]">{{
                log.waktu
              }}</span>
              <span
                class="font-bold shrink-0 uppercase text-[10px]"
                :class="[
                  log.tipe === 'error'
                    ? 'text-[var(--status-bahaya)]'
                    : 'text-[var(--teks-tersier)]',
                ]"
              >
                [{{ log.tipe }}]
              </span>
              <span class="whitespace-pre-wrap break-all flex-1">{{
                log.pesan
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

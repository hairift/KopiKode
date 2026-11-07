import { defineStore } from "pinia";

export type PilihanTema = "terang" | "gelap" | "sistem";
export type PilihanTataLetakPlayground = "berdampingan" | "atas_bawah";

export const usePreferensiStore = defineStore("preferensi", {
  state: () => ({
    tema: "sistem" as PilihanTema,
    sidebarTerbuka: true,
    drawerMobileTerbuka: false,
    tataLetakPlayground: "berdampingan" as PilihanTataLetakPlayground,
  }),

  actions: {
    inisialisasiPreferensi() {
      if (typeof window === "undefined") return;

      const temaTersimpan = localStorage.getItem(
        "kopikode_tema",
      ) as PilihanTema | null;
      if (
        temaTersimpan &&
        ["terang", "gelap", "sistem"].includes(temaTersimpan)
      ) {
        this.tema = temaTersimpan;
      }

      const tataLetakTersimpan = localStorage.getItem(
        "kopikode_tataletak_editor",
      ) as PilihanTataLetakPlayground | null;
      if (
        tataLetakTersimpan &&
        ["berdampingan", "atas_bawah"].includes(tataLetakTersimpan)
      ) {
        this.tataLetakPlayground = tataLetakTersimpan;
      }

      this.terapkanTemaKeDokumen();
    },

    aturTema(temaBaru: PilihanTema) {
      this.tema = temaBaru;
      if (typeof window !== "undefined") {
        localStorage.setItem("kopikode_tema", temaBaru);
      }
      this.terapkanTemaKeDokumen();
    },

    gantiTema() {
      const temaBerikutnya: Record<PilihanTema, PilihanTema> = {
        terang: "gelap",
        gelap: "sistem",
        sistem: "terang",
      };
      this.aturTema(temaBerikutnya[this.tema]);
    },

    terapkanTemaKeDokumen() {
      if (typeof window === "undefined") return;

      const elemenHtml = document.documentElement;
      let gunakanGelap = false;

      if (this.tema === "gelap") {
        gunakanGelap = true;
      } else if (this.tema === "terang") {
        gunakanGelap = false;
      } else {
        gunakanGelap = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
      }

      if (gunakanGelap) {
        elemenHtml.classList.add("dark");
      } else {
        elemenHtml.classList.remove("dark");
      }
    },

    toggleSidebar() {
      this.sidebarTerbuka = !this.sidebarTerbuka;
    },

    toggleDrawerMobile(status?: boolean) {
      if (typeof status === "boolean") {
        this.drawerMobileTerbuka = status;
      } else {
        this.drawerMobileTerbuka = !this.drawerMobileTerbuka;
      }
    },

    aturTataLetakPlayground(tataLetak: PilihanTataLetakPlayground) {
      this.tataLetakPlayground = tataLetak;
      if (typeof window !== "undefined") {
        localStorage.setItem("kopikode_tataletak_editor", tataLetak);
      }
    },
  },
});

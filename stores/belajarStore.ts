import { defineStore } from "pinia";

export interface RiwayatTerakhir {
  slug: string;
  judul: string;
  namaTeknologi: string;
  waktuKunjung: number;
}

export const useBelajarStore = defineStore("belajar", {
  state: () => ({
    daftarBookmark: [] as string[],
    daftarSelesai: [] as string[],
    riwayatKunjungan: [] as RiwayatTerakhir[],
  }),

  getters: {
    totalBookmark: (state) => state.daftarBookmark.length,
    totalSelesai: (state) => state.daftarSelesai.length,
  },

  actions: {
    inisialisasiDataBelajar() {
      if (typeof window === "undefined") return;

      try {
        const dataBookmark = localStorage.getItem("kopikode_bookmark");
        if (dataBookmark) {
          this.daftarBookmark = JSON.parse(dataBookmark);
        }

        const dataSelesai = localStorage.getItem("kopikode_selesai");
        if (dataSelesai) {
          this.daftarSelesai = JSON.parse(dataSelesai);
        }

        const dataRiwayat = localStorage.getItem("kopikode_riwayat");
        if (dataRiwayat) {
          this.riwayatKunjungan = JSON.parse(dataRiwayat);
        }
      } catch (kesalahan) {
        // Abaikan kesalahan pembacaan penyimpanan lokal
      }
    },

    toggleBookmark(slugMateri: string) {
      const indeks = this.daftarBookmark.indexOf(slugMateri);
      if (indeks >= 0) {
        this.daftarBookmark.splice(indeks, 1);
      } else {
        this.daftarBookmark.push(slugMateri);
      }
      this.simpanKeLocalStorage();
    },

    apakahBookmark(slugMateri: string): boolean {
      return this.daftarBookmark.includes(slugMateri);
    },

    toggleSelesai(slugMateri: string) {
      const indeks = this.daftarSelesai.indexOf(slugMateri);
      if (indeks >= 0) {
        this.daftarSelesai.splice(indeks, 1);
      } else {
        this.daftarSelesai.push(slugMateri);
      }
      this.simpanKeLocalStorage();
    },

    apakahSelesai(slugMateri: string): boolean {
      return this.daftarSelesai.includes(slugMateri);
    },

    catatKunjungan(slug: string, judul: string, namaTeknologi: string) {
      this.riwayatKunjungan = this.riwayatKunjungan.filter(
        (item) => item.slug !== slug,
      );
      this.riwayatKunjungan.unshift({
        slug,
        judul,
        namaTeknologi,
        waktuKunjung: Date.now(),
      });
      if (this.riwayatKunjungan.length > 8) {
        this.riwayatKunjungan = this.riwayatKunjungan.slice(0, 8);
      }
      this.simpanKeLocalStorage();
    },

    hitungProgres(daftarSlugSemua: string[]): {
      persen: number;
      selesai: number;
      total: number;
    } {
      if (daftarSlugSemua.length === 0) {
        return { persen: 0, selesai: 0, total: 0 };
      }
      const selesai = daftarSlugSemua.filter((slug) =>
        this.daftarSelesai.includes(slug),
      ).length;
      const persen = Math.round((selesai / daftarSlugSemua.length) * 100);
      return { persen, selesai, total: daftarSlugSemua.length };
    },

    simpanKeLocalStorage() {
      if (typeof window === "undefined") return;
      try {
        localStorage.setItem(
          "kopikode_bookmark",
          JSON.stringify(this.daftarBookmark),
        );
        localStorage.setItem(
          "kopikode_selesai",
          JSON.stringify(this.daftarSelesai),
        );
        localStorage.setItem(
          "kopikode_riwayat",
          JSON.stringify(this.riwayatKunjungan),
        );
      } catch (kesalahan) {
        // Abaikan kegagalan penulisan penyimpanan lokal
      }
    },
  },
});

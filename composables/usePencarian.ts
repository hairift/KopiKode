import MiniSearch from "minisearch";
import { daftarTeknologi } from "~/data/teknologiRegistry";

export interface ItemHasilPencarian {
  id: string;
  judul: string;
  slug: string;
  teknologiSlug: string;
  namaTeknologi: string;
  kategoriMateri: string;
  deskripsi: string;
  ringkasan: string;
}

let mesinPencari: MiniSearch<ItemHasilPencarian> | null = null;

export function inisialisasiMesinPencari(): MiniSearch<ItemHasilPencarian> {
  if (mesinPencari) return mesinPencari;

  const daftarDokumen: ItemHasilPencarian[] = [];

  // Menyiapkan indeks dari registry materi
  for (const tek of daftarTeknologi) {
    if (!tek.babMateri) continue;

    for (const bab of tek.babMateri) {
      for (const materi of bab.daftarMateri) {
        daftarDokumen.push({
          id: `${tek.slug}-${materi.slug}`,
          judul: materi.judul,
          slug: `/${tek.slug}/${materi.slug}`,
          teknologiSlug: tek.slug,
          namaTeknologi: tek.nama,
          kategoriMateri: bab.namaKategori,
          deskripsi: materi.deskripsi,
          ringkasan: materi.ringkasan,
        });
      }
    }
  }

  mesinPencari = new MiniSearch<ItemHasilPencarian>({
    fields: [
      "judul",
      "namaTeknologi",
      "kategoriMateri",
      "deskripsi",
      "ringkasan",
    ],
    storeFields: [
      "id",
      "judul",
      "slug",
      "teknologiSlug",
      "namaTeknologi",
      "kategoriMateri",
      "deskripsi",
      "ringkasan",
    ],
    searchOptions: {
      boost: { judul: 3, namaTeknologi: 2, deskripsi: 1 },
      prefix: true,
      fuzzy: 0.2,
    },
  });

  mesinPencari.addAll(daftarDokumen);
  return mesinPencari;
}

export function usePencarian() {
  const kataKunci = ref("");
  const modalTerbuka = ref(false);
  const indeksTerpilih = ref(0);

  const mesin = inisialisasiMesinPencari();

  const hasilPencarian = computed(() => {
    const kataBersih = kataKunci.value.trim();
    if (!kataBersih) {
      // Jika kosong, tampilkan daftar rekomendasi topik awal
      const hasilAwal: ItemHasilPencarian[] = [];
      for (const tek of daftarTeknologi) {
        if (!tek.babMateri) continue;
        for (const bab of tek.babMateri) {
          for (const materi of bab.daftarMateri.slice(0, 2)) {
            hasilAwal.push({
              id: `${tek.slug}-${materi.slug}`,
              judul: materi.judul,
              slug: `/${tek.slug}/${materi.slug}`,
              teknologiSlug: tek.slug,
              namaTeknologi: tek.nama,
              kategoriMateri: bab.namaKategori,
              deskripsi: materi.deskripsi,
              ringkasan: materi.ringkasan,
            });
          }
        }
      }
      return hasilAwal;
    }

    const hasilRaw = mesin.search(kataBersih);
    return hasilRaw.map((item) => ({
      id: item.id,
      judul: item.judul,
      slug: item.slug,
      teknologiSlug: item.teknologiSlug,
      namaTeknologi: item.namaTeknologi,
      kategoriMateri: item.kategoriMateri,
      deskripsi: item.deskripsi,
      ringkasan: item.ringkasan,
    }));
  });

  // Dikelompokkan berdasarkan nama teknologi
  const hasilTerkelompok = computed(() => {
    const petaKelompok: Record<string, ItemHasilPencarian[]> = {};
    for (const item of hasilPencarian.value) {
      if (!petaKelompok[item.namaTeknologi]) {
        petaKelompok[item.namaTeknologi] = [];
      }
      petaKelompok[item.namaTeknologi].push(item);
    }
    return petaKelompok;
  });

  const bukaPencarian = () => {
    modalTerbuka.value = true;
    indeksTerpilih.value = 0;
  };

  const tutupPencarian = () => {
    modalTerbuka.value = false;
    kataKunci.value = "";
    indeksTerpilih.value = 0;
  };

  return {
    kataKunci,
    modalTerbuka,
    indeksTerpilih,
    hasilPencarian,
    hasilTerkelompok,
    bukaPencarian,
    tutupPencarian,
  };
}

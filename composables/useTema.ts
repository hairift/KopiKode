import { usePreferensiStore, type PilihanTema } from "~/stores/preferensiStore";

// Composable untuk mengelola tema terang dan gelap tanpa flicker
export function useTema() {
  const preferensiStore = usePreferensiStore();

  const temaAktif = computed(() => preferensiStore.tema);

  const gantiModeTema = () => {
    preferensiStore.gantiTema();
  };

  const aturModeTema = (temaBaru: PilihanTema) => {
    preferensiStore.aturTema(temaBaru);
  };

  return {
    temaAktif,
    gantiModeTema,
    aturModeTema,
  };
}

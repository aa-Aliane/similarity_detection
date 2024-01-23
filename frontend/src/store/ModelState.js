import { create } from "zustand";

export const useModel = create((set) => ({
  multiLang: true,
  suspicious: "",
  setSuspicious: (text) => set(() => ({ suspicious: text })),
  results: [],
  set_results: (results) => set(() => ({ results: results })),
  switchMultiLang: (value) => set(() => ({ multiLang: value })),
}));

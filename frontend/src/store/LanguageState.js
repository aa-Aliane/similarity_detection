import { create } from "zustand";
import { TextPerLang } from "../constants";

export const useLanguage = create((set) => ({
  languages: { en: "english", fr: "français", ar: "عربية" },
  current_language: "en",
  vocab: TextPerLang,
  text: TextPerLang.en,
  change_language: (lang) =>
    set((state) => ({ text: state.vocab[lang], current_language: lang })),
}));

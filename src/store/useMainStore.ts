import { create } from "zustand";
import type * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import type { Theme } from "~/types";

export interface MainStoreState {
  language: monaco.languages.ILanguageExtensionPoint["id"];
  languages: monaco.languages.ILanguageExtensionPoint[];
  theme: Theme;
  renderSideBySide: boolean;
}

export interface MainStoreActions {
  setLanguage: (language: MainStoreState["language"]) => void;
  setLanguages: (languages: MainStoreState["languages"]) => void;
  setTheme: (theme: MainStoreState["theme"]) => void;
  setRenderSideBySide: (
    renderSideBySide: MainStoreState["renderSideBySide"]
  ) => void;
}

// TODO add persist use next.js
const useMainStore = create<MainStoreState & MainStoreActions>()((set) => ({
  language: "plaintext",
  languages: [],
  theme: "light",
  renderSideBySide: true,

  setLanguage: (language) => set({ language }),
  setLanguages: (languages) => set({ languages }),
  setTheme: (theme) => set({ theme }),
  setRenderSideBySide: (renderSideBySide) => set({ renderSideBySide }),
}));

export default useMainStore;

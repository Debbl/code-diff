import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { languages } from "monaco-editor/esm/vs/editor/editor.api";
import type { Theme } from "~/types";

export interface MainStoreState {
  originalValue: string;
  modifiedValue: string;
  language: languages.ILanguageExtensionPoint["id"];
  languages: languages.ILanguageExtensionPoint[];
  theme: Theme;
  renderSideBySide: boolean;
}

export interface MainStoreActions {
  setOriginalValue: (originalValue: MainStoreState["originalValue"]) => void;
  setModifiedValue: (modifiedValue: MainStoreState["modifiedValue"]) => void;
  setLanguage: (language: MainStoreState["language"]) => void;
  setLanguages: (languages: MainStoreState["languages"]) => void;
  setTheme: (theme: MainStoreState["theme"]) => void;
  setRenderSideBySide: (
    renderSideBySide: MainStoreState["renderSideBySide"]
  ) => void;
}

const useMainStore = create<MainStoreState & MainStoreActions>()(
  persist(
    (set) => ({
      originalValue: "",
      modifiedValue: "",
      language: "plaintext",
      languages: [],
      theme: "light",
      renderSideBySide: true,

      setOriginalValue: (originalValue) => set({ originalValue }),
      setModifiedValue: (modifiedValue) => set({ modifiedValue }),
      setLanguage: (language) => set({ language }),
      setLanguages: (languages) => set({ languages }),
      setTheme: (theme) => set({ theme }),
      setRenderSideBySide: (renderSideBySide) => set({ renderSideBySide }),
    }),
    {
      name: "code-diff-main-store",
      version: 1,
    }
  )
);

export default useMainStore;

import type { languages } from "monaco-editor/esm/vs/editor/editor.api";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

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
    renderSideBySide: MainStoreState["renderSideBySide"],
  ) => void;
}

const useMainStoreAtom = atomWithStorage<MainStoreState>(
  "code-diff-main-store",
  {
    originalValue: "",
    modifiedValue: "",
    language: "plaintext",
    languages: [],
    theme: "light",
    renderSideBySide: true,
  },
);

export function useMainStore() {
  const [state, set] = useAtom(useMainStoreAtom);

  return {
    ...state,
    setOriginalValue: (originalValue) => set((s) => ({ ...s, originalValue })),
    setModifiedValue: (modifiedValue) => set((s) => ({ ...s, modifiedValue })),
    setLanguage: (language) => set((s) => ({ ...s, language })),
    setLanguages: (languages) => set((s) => ({ ...s, languages })),
    setTheme: (theme) => set((s) => ({ ...s, theme })),
    setRenderSideBySide: (renderSideBySide) =>
      set((s) => ({ ...s, renderSideBySide })),
  } as MainStoreActions & MainStoreState;
}

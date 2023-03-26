import type {
  DiffEditorProps,
  DiffOnMount,
  Monaco,
} from "@monaco-editor/react";
import type * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import type { ChangeEventHandler } from "react";
import { useState } from "react";

export type Theme = "light" | "vs-dark";

function useDiffEditor() {
  const [language, setLanguage] = useState("plaintext");
  const [languages, setLanguages] = useState<
    monaco.languages.ILanguageExtensionPoint[]
  >([]);
  const [theme, setTheme] = useState<Theme>("light");

  const handleOnMount: DiffOnMount = (
    editor: monaco.editor.IStandaloneDiffEditor,
    monaco: Monaco
  ) => {
    setLanguages(monaco.languages.getLanguages());
  };

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setLanguage(e.target.value);
  };

  return [
    {
      language,
      languages,
      theme,
    },
    {
      setLanguage,
      setLanguages,
      setTheme,
      handleOnMount,
      handleChange,
    },
  ] as const;
}

export default useDiffEditor;

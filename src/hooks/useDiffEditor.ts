import type { DiffOnMount, Monaco } from "@monaco-editor/react";
import type * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import type { ChangeEventHandler } from "react";
import { useMemo, useState } from "react";

export type Theme = "light" | "vs-dark";

function useDiffEditor() {
  const [language, setLanguage] = useState("plaintext");
  const [languages, setLanguages] = useState<
    monaco.languages.ILanguageExtensionPoint[]
  >([]);

  const [theme, setTheme] = useState<Theme>("light");
  const [renderSideBySide, setRenderSideBySide] = useState(true);

  const actions = useMemo(() => {
    const handleOnMount: DiffOnMount = (
      editor: monaco.editor.IStandaloneDiffEditor,
      monaco: Monaco
    ) => {
      setLanguages(monaco.languages.getLanguages());
    };

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
      setLanguage(e.target.value);
    };

    return {
      handleOnMount,
      handleChange,
    };
  }, []);

  return [
    {
      language,
      languages,
      theme,
      renderSideBySide,
    },
    {
      setLanguage,
      setLanguages,
      setTheme,
      setRenderSideBySide,
      ...actions,
    },
  ] as const;
}

export default useDiffEditor;

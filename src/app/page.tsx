"use client";
import type { DiffOnMount } from "@monaco-editor/react";
import { DiffEditor } from "@monaco-editor/react";
import { basePath } from "../../next.config";
import useMainStore from "~/store/useMainStore";
import Header from "~/components/Header";
import useTheme from "~/hooks/useTheme";

export default function Page() {
  useTheme();

  const [
    { originalValue, modifiedValue, language, theme, renderSideBySide },
    { setOriginalValue, setModifiedValue, setLanguages },
  ] = useMainStore((s) => [
    {
      originalValue: s.originalValue,
      modifiedValue: s.modifiedValue,
      language: s.language,
      theme: s.theme,
      renderSideBySide: s.renderSideBySide,
    },
    {
      setLanguages: s.setLanguages,
      setOriginalValue: s.setOriginalValue,
      setModifiedValue: s.setModifiedValue,
    },
  ]);

  const handleOnMount: DiffOnMount = (editor, monaco) => {
    setLanguages(monaco.languages.getLanguages());

    editor.onDidUpdateDiff(() => {
      setOriginalValue(editor.getModel()?.original.getValue() || "");
      setModifiedValue(editor.getModel()?.modified.getValue() || "");
    });
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center">
        <h1 className="my-2 cursor-pointer text-center text-xl font-medium">
          <a href={basePath}>Code Diff</a>
        </h1>
        <Header />

        <main className="h-full w-full">
          <DiffEditor
            options={{
              originalEditable: true,
              renderSideBySide,
            }}
            original={originalValue}
            modified={modifiedValue}
            onMount={handleOnMount}
            height="100%"
            theme={theme}
            language={language}
          />
        </main>
      </div>
    </>
  );
}

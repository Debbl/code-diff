"use client";
import type { DiffOnMount } from "@monaco-editor/react";
import { DiffEditor } from "@monaco-editor/react";
import hljs from "highlight.js";
import type { ElementRef } from "react";
import { useRef } from "react";
import { basePath } from "../../next.config";
import useMainStore from "~/store/useMainStore";
import Header from "~/components/Header";
import useTheme from "~/hooks/useTheme";
import Alert from "~/components/Alert";

export default function Page() {
  const alertRef = useRef<ElementRef<typeof Alert>>(null);
  useTheme();

  const [
    {
      originalValue,
      modifiedValue,
      language,
      languages,
      theme,
      renderSideBySide,
    },
    { setOriginalValue, setModifiedValue, setLanguage, setLanguages },
  ] = useMainStore((s) => [
    {
      originalValue: s.originalValue,
      modifiedValue: s.modifiedValue,
      language: s.language,
      languages: s.languages,
      theme: s.theme,
      renderSideBySide: s.renderSideBySide,
    },
    {
      setLanguage: s.setLanguage,
      setLanguages: s.setLanguages,
      setOriginalValue: s.setOriginalValue,
      setModifiedValue: s.setModifiedValue,
    },
  ]);

  const handleOnMount: DiffOnMount = (editor, monaco) => {
    setLanguages(monaco.languages.getLanguages());

    editor.onDidUpdateDiff(() => {
      const ov = editor.getModel()?.original.getValue() || "";
      const mv = editor.getModel()?.modified.getValue() || "";

      const guessLanguage = hljs.highlightAuto(ov).language;
      const languagesId = languages.map((v) => v.id);

      if (guessLanguage && languagesId.includes(guessLanguage)) {
        alertRef?.current?.showAlert(`已自动检测到语言 ${guessLanguage}`);
        setLanguage(guessLanguage);
      }

      setOriginalValue(ov);
      setModifiedValue(mv);
    });
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center">
        <h1 className="my-2 cursor-pointer text-center text-xl font-medium">
          <a href={basePath}>Code Diff</a>
        </h1>
        <Alert ref={alertRef} />

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

"use client";
import type { DiffOnMount, Monaco } from "@monaco-editor/react";
import { DiffEditor } from "@monaco-editor/react";
import hljs from "highlight.js";
import type { ElementRef } from "react";
import { useRef } from "react";
import { basePath } from "../../next.config";
import useMainStore from "~/store/useMainStore";
import Header from "~/components/Header";
import useTheme from "~/hooks/useTheme";
import Alert from "~/components/Alert";
import useLatest from "~/hooks/useLatest";

export default function Page() {
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

  useTheme();
  const alertRef = useRef<ElementRef<typeof Alert>>(null);
  const monacoRef = useRef<Monaco>();
  const languageRef = useLatest(language);

  const handleOnMount: DiffOnMount = (editor, monaco) => {
    monacoRef.current = monaco;

    setLanguages(monaco.languages.getLanguages());
    editor.getOriginalEditor().setValue(originalValue);
    editor.getModifiedEditor().setValue(modifiedValue);

    editor.onDidUpdateDiff(() => {
      const ov = editor.getModel()?.original.getValue() || "";
      const mv = editor.getModel()?.modified.getValue() || "";

      const guessLanguage = hljs.highlightAuto(ov).language;
      const languagesId = languages.map((v) => v.id);

      if (
        guessLanguage &&
        guessLanguage !== languageRef.current &&
        languagesId.includes(guessLanguage)
      ) {
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

        <Header monaco={monacoRef.current} />

        <main className="h-full w-full">
          <DiffEditor
            options={{
              originalEditable: true,
              renderSideBySide,
            }}
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

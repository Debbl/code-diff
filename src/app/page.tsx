"use client";
import type { DiffOnMount, Monaco } from "@monaco-editor/react";
import { DiffEditor } from "@monaco-editor/react";
import hljs from "highlight.js";
import { useRef } from "react";
import { useHydrated, useLatest } from "@debbl/ahooks";
import nextConfig from "../../next.config.mjs";
import Header from "~/components/Header";
import useTheme from "~/hooks/useTheme";
import useToast from "~/hooks/useToast";
import { useMainStore } from "~/store/useMainStore";

const { basePath } = nextConfig;

export default function Page() {
  const {
    originalValue,
    modifiedValue,
    language,
    languages,
    theme,
    renderSideBySide,
    setOriginalValue,
    setModifiedValue,
    setLanguage,
    setLanguages,
  } = useMainStore();

  useTheme();
  const { Toast, showToast } = useToast();
  const monacoRef = useRef<Monaco>();
  const languageRef = useLatest(language);
  const { isHydrated } = useHydrated();

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
        showToast(`已自动检测到语言 ${guessLanguage}`);
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

        <Toast />

        <Header monaco={monacoRef.current} />

        <main className="size-full">
          {isHydrated && (
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
          )}
        </main>
      </div>
    </>
  );
}

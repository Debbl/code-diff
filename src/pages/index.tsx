import type { DiffOnMount, Monaco } from "@monaco-editor/react";
import { DiffEditor } from "@monaco-editor/react";
import Head from "next/head";
import { basePath } from "../../next.config";
import useMainStore from "~/store/useMainStore";
import Header from "~/components/Header";
import useTheme from "~/hooks/useTheme";

export default function Index() {
  useTheme();

  const [{ language, theme, renderSideBySide }, { setLanguages }] =
    useMainStore((s) => [
      {
        language: s.language,
        theme: s.theme,
        renderSideBySide: s.renderSideBySide,
      },
      {
        setLanguages: s.setLanguages,
      },
    ]);

  const handleOnMount: DiffOnMount = (_, monaco: Monaco) => {
    setLanguages(monaco.languages.getLanguages());
  };

  return (
    <>
      <Head>
        <title>code-diff</title>
        <link
          rel="shortcut icon"
          href={`${basePath}/logo.svg`}
          type="image/x-icon"
        />
      </Head>

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

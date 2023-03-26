import { DiffEditor } from "@monaco-editor/react";
import Head from "next/head";
import nextConfig from "../../next.config";
import Footer from "~/components/Footer";
import type { Theme } from "~/hooks/useDiffEditor";
import useDiffEditor from "~/hooks/useDiffEditor";

export default function Index() {
  const [
    { language, languages, theme, renderSideBySide },
    { setTheme, setRenderSideBySide, handleChange, handleOnMount },
  ] = useDiffEditor();

  return (
    <>
      <Head>
        <title>code-diff</title>
        <link
          rel="shortcut icon"
          href={`${nextConfig.basePath}/logo.svg`}
          type="image/x-icon"
        />
      </Head>
      <div className="h-screen flex flex-col">
        <h1 className="text-center my-2 text-xl font-medium">Code Diff</h1>

        <div className="p-3 flex gap-x-3">
          <div>
            <label>
              选择语言：
              <select
                value={language}
                onChange={handleChange}
                className="border ml-3 w-60"
              >
                {languages.map((lang) => (
                  <option value={lang.id} key={lang.id}>
                    {lang.id}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              选择主题：
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as Theme)}
                className="border ml-3 w-60"
              >
                <option value="light">light</option>
                <option value="vs-dark">vs-dark</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              并排显示：
              <input
                className="ml-3"
                type="checkbox"
                checked={renderSideBySide}
                onChange={(e) => setRenderSideBySide(e.target.checked)}
              />
            </label>
          </div>
        </div>

        <div className="h-full">
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
        </div>

        <Footer />
      </div>
    </>
  );
}

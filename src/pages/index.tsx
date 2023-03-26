import { DiffEditor } from "@monaco-editor/react";
import type { Theme } from "~/hooks/useDiffEditor";
import useDiffEditor from "~/hooks/useDiffEditor";

export default function Index() {
  const [
    { language, languages, theme, renderSideBySide },
    { setTheme, setRenderSideBySide, handleChange, handleOnMount },
  ] = useDiffEditor();

  return (
    <div className="h-screen">
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
    </div>
  );
}

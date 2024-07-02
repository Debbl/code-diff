import { Icon } from "@iconify/react";
import closeFilled from "@iconify/icons-carbon/close-filled";

import type { Monaco } from "@monaco-editor/react";
import { useGitHubInfo, useHydrated } from "@debbl/ahooks";
import useMainStore from "~/store/useMainStore";
import type { GetStoreState, Theme } from "~/types";

interface IProps {
  monaco?: Monaco;
}

const selector = (s: GetStoreState<typeof useMainStore>) =>
  [
    {
      language: s.language,
      languages: s.languages,
      theme: s.theme,
      renderSideBySide: s.renderSideBySide,
    },
    {
      setLanguage: s.setLanguage,
      setLanguages: s.setLanguages,
      setTheme: s.setTheme,
      setRenderSideBySide: s.setRenderSideBySide,
    },
  ] as const;

const Header = ({ monaco }: IProps) => {
  const [
    { language, languages, theme, renderSideBySide },
    { setLanguage, setTheme, setRenderSideBySide },
  ] = useMainStore(selector);

  const { isHydrated } = useHydrated();

  const { GitHubInfo } = useGitHubInfo("https://github.com/Debbl/code-diff");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };
  const handleRenderSideBySideChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRenderSideBySide(e.target.checked);
  };

  return (
    <header className="flex items-center gap-x-3 p-3">
      <div className="flex items-center">
        <label>
          选择语言：
          <select
            value={language}
            onChange={handleLanguageChange}
            className="select select-bordered select-xs ml-3 w-60 border"
          >
            {isHydrated &&
              languages.map((lang) => (
                <option value={lang.id} key={lang.id}>
                  {lang.id}
                </option>
              ))}
          </select>
        </label>
      </div>

      <div className="flex items-center">
        <label>
          选择主题：
          <select
            value={theme}
            onChange={handleThemeChange}
            className="select select-bordered select-xs ml-3 w-60 border"
          >
            <option value="light">light</option>
            <option value="vs-dark">vs-dark</option>
          </select>
        </label>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">并排显示：</span>
          <input
            className="checkbox checkbox-xs ml-3"
            type="checkbox"
            checked={renderSideBySide}
            onChange={handleRenderSideBySideChange}
          />
        </label>
      </div>

      <div
        className="btn btn-circle btn-xs"
        onClick={() => {
          monaco?.editor.getModels().forEach((model) => {
            model.setValue("");
          });
        }}
      >
        <Icon className="size-[18px] cursor-pointer" icon={closeFilled} />
      </div>

      <GitHubInfo className="ml-8 flex size-[18px] justify-center" />
    </header>
  );
};

export default Header;

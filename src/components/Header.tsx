import { Icon } from "@iconify/react";
import closeFilled from "@iconify/icons-carbon/close-filled";

import GitHubInfo from "./GitHubInfo";
import useHasHydrated from "~/hooks/useHasHydrated";
import useMainStore from "~/store/useMainStore";
import type { Theme } from "~/types";

const Header: React.FC = () => {
  const [
    { language, languages, theme, renderSideBySide },
    {
      setOriginalValue,
      setModifiedValue,
      setLanguage,
      setTheme,
      setRenderSideBySide,
    },
  ] = useMainStore((s) => [
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
      setOriginalValue: s.setOriginalValue,
      setModifiedValue: s.setModifiedValue,
    },
  ]);

  const hasHydrated = useHasHydrated();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };
  const handleRenderSideBySideChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
            {hasHydrated &&
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
          setOriginalValue("");
          setModifiedValue("");
        }}
      >
        <Icon className="h-[18px] w-[18px] cursor-pointer" icon={closeFilled} />
      </div>

      <GitHubInfo />
    </header>
  );
};

export default Header;

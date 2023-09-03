import { useEffect } from "react";
import useMainStore from "~/store/useMainStore";

const useTheme = () => {
  const theme = useMainStore((s) => (s.theme === "vs-dark" ? "dark" : "light"));

  useEffect(() => {
    const html = document.querySelector("html");
    html!.dataset.theme = theme;
  }, [theme]);
};

export default useTheme;

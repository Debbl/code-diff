import { useEffect } from "react";
import { useMainStore } from "~/store/useMainStore";

const useTheme = () => {
  const { theme } = useMainStore();

  useEffect(() => {
    const html = document.querySelector("html");
    html!.dataset.theme = theme;
  }, [theme]);
};

export default useTheme;

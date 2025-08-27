import { useCallback, useEffect, useState } from "react";

export default function useDaisyTheme() {
  const [theme, setTheme] = useState("light");
  const [isDark, setIsDark] = useState(false);

  /** 更新主題狀態 */
  const updateTheme = useCallback(() => {
    const dataTheme = document.documentElement.dataset.theme;
    const newTheme = dataTheme ?? (getMediaDark().matches ? "dark" : "light");
    setTheme(newTheme);
    setIsDark(newTheme === "dark");
  }, []);

  useEffect(() => {
    updateTheme();

    // 監聽 DaisyUI data-theme 變化
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // 監聽瀏覽器深色模式變化
    const mediaQuery = getMediaDark();
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, [updateTheme]);

  return { theme, isDark };
}

function getMediaDark() {
  return window.matchMedia("(prefers-color-scheme: dark)");
}

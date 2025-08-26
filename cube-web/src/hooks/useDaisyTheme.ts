import { useCallback, useEffect, useState } from "react";

export default function useDaisyTheme() {
  const [theme, setTheme] = useState("light");
  const [isDark, setIsDark] = useState(false);

  /** 更新主題狀態 */
  const updateTheme = useCallback(() => {
    const dataTheme = document.documentElement.dataset.theme;
    const newTheme =
      dataTheme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const newIsDark = newTheme === "dark";

    setTheme(newTheme);
    setIsDark(newIsDark);
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    updateTheme();

    // 監聽 DaisyUI data-theme 變化
    const observer = new MutationObserver(updateTheme);
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // 監聽瀏覽器深色模式變化
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, [updateTheme]);

  return { theme, isDark };
}

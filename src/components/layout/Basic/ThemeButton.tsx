"use client";

import { useTheme } from "next-themes";

import cn from "@/utils/cn";
import { options } from "@/data/options/theme";
import useMounted from "@/hooks/useMounted";

import ThemeIcon from "@/components/ThemeIcon";

/**
 * 切換網站主題模式的按鈕
 * - `system`: 跟隨瀏覽器 / 作業系統
 * - `light`: 強制亮色
 * - `dark`: 強制暗色
 */
export default function ThemeToggleButton() {
  const mounted = useMounted();
  const { theme, setTheme, themes } = useTheme();

  /** 循環切換 theme */
  function handleToggleTheme() {
    setTheme((current) => {
      const index = themes.indexOf(current);
      const nextIndex = (index + 1) % themes.length;
      return themes[nextIndex];
    });
  }

  if (!mounted) {
    return (
      <div className="btn btn-square btn-ghost">
        <span className="loading loading-ring" aria-hidden />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      title="切換網站配色模式"
      className="btn btn-square btn-ghost swap swap-active swap-rotate"
    >
      <span className="sr-only">切換網站配色模式</span>
      {/* 使用 DaisyUI swap class 控制切換動畫 */}
      {options.map(({ id, value }) => (
        <ThemeIcon
          key={id}
          theme={value}
          className={cn("size-6", theme === value ? "swap-on" : "swap-off")}
        />
      ))}
    </button>
  );
}

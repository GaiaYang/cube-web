"use client";

import { useTheme } from "@wrksz/themes/client";

import ThemeIcon from "@/components/ThemeIcon";
import { options } from "@/data/options/theme";
import { Themes } from "@/enums/theme";
import useMounted from "@/hooks/useMounted";
import cn from "@/utils/cn";

/** 循環順序（含 system；hook 的 themes 不含） */
const THEME_CYCLE = Object.values(Themes);

/**
 * 切換網站主題模式的按鈕
 * - `system`: 跟隨瀏覽器 / 作業系統
 * - `light`: 強制亮色
 * - `dark`: 強制暗色
 */
export default function ThemeToggleButton() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  function handleToggleTheme() {
    setTheme((current) => {
      const index = THEME_CYCLE.indexOf(current as Themes);
      return THEME_CYCLE[(index + 1) % THEME_CYCLE.length];
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

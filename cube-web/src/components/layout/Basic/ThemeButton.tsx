"use client";

import React, { useCallback } from "react";
import { LucideProps, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

import cn from "@/utils/cn";
import useMounted from "@/hooks/useMounted";

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
  const handleToggleTheme = useCallback(() => {
    setTheme((current) => {
      const index = themes.indexOf(current);
      const nextIndex = (index + 1) % themes.length;
      return themes[nextIndex];
    });
  }, [setTheme, themes]);

  function renderIcons() {
    if (!mounted) {
      return <span className="loading loading-spinner" aria-hidden />;
    }

    // 使用 DaisyUI swap class 控制切換動畫
    return themeIcons.map(({ id, Icon }) => (
      <Icon
        key={id}
        className={cn("size-6", theme === id ? "swap-on" : "swap-off")}
      />
    ));
  }

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      disabled={!mounted}
      title="切換網站配色模式"
      className={cn("btn btn-square btn-ghost swap swap-active swap-rotate")}
    >
      <span className="sr-only">切換網站配色模式</span>
      {renderIcons()}
    </button>
  );
}

/** 所有主題對應的 icon */
const themeIcons: {
  id: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  { id: "system", Icon: SunMoonIcon },
  { id: "light", Icon: SunIcon },
  { id: "dark", Icon: MoonIcon },
];

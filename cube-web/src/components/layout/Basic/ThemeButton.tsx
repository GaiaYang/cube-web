"use client";

import React, { useCallback } from "react";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

import useMounted from "@/hooks/useMounted";

export default function ThemeButton() {
  const mounted = useMounted();
  const { theme, setTheme, themes } = useTheme();

  // 循環切換 (system → light → dark → system ...)
  const toggleTheme = useCallback(() => {
    setTheme((value) => {
      const index = themes.indexOf(value);
      const nextIndex = (index + 1) % themes.length;
      return themes[nextIndex];
    });
  }, [setTheme, themes]);

  // 按鈕顯示模式
  function _renderIcon() {
    if (!mounted) {
      return <span className="loading loading-spinner" aria-hidden />;
    }

    switch (theme) {
      case "dark":
        return <MoonIcon />;
      case "light":
        return <SunIcon />;
      case "system":
        return <SunMoonIcon />;
      default:
        return null;
    }
  }

  return (
    <button
      type="button"
      title="切換網站配色模式"
      onClick={toggleTheme}
      disabled={!mounted}
      className="btn btn-square btn-ghost"
    >
      <span className="sr-only">切換網站配色模式</span>
      {_renderIcon()}
    </button>
  );
}

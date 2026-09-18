"use client";

import { useTheme } from "@wrksz/themes/client";
import { cn } from "cn";

import { Button, buttonVariants } from "@/components/daisy-ui/button";
import { Loading } from "@/components/daisy-ui/loading";
import { swapVariants } from "@/components/daisy-ui/swap";
import ThemeIcon from "@/components/ThemeIcon";
import { options } from "@/data/options/theme";
import { Themes } from "@/enums/theme";
import useMounted from "@/hooks/useMounted";

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
      <div className={buttonVariants({ shape: "square", variant: "ghost" })}>
        <Loading variant="ring" aria-hidden />
      </div>
    );
  }

  return (
    <Button
      type="button"
      onClick={handleToggleTheme}
      title="切換網站配色模式"
      shape="square"
      variant="ghost"
      className={swapVariants({ rotate: true, active: true })}
    >
      <span className="sr-only">切換網站配色模式</span>
      {/* 同一組件只改 class，才能觸發 swap CSS transition；勿在 SwapOn／SwapOff 間條件切換 */}
      {options.map(({ id, value }) => (
        <ThemeIcon
          key={id}
          theme={value}
          className={cn("size-6", theme === value ? "swap-on" : "swap-off")}
        />
      ))}
    </Button>
  );
}

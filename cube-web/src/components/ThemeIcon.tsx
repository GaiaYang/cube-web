import React, { createElement, useMemo } from "react";
import { LucideProps, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

import type { Theme } from "@/types/theme";
import { Themes } from "@/enums/theme";

export interface ThemeIconProps
  extends Omit<LucideProps, "ref">,
    React.RefAttributes<SVGSVGElement> {
  theme?: Theme;
}

/** 網站主題圖標 */
export default function ThemeIcon({ theme, ...props }: ThemeIconProps) {
  const tag = useMemo(() => {
    switch (theme) {
      case Themes.LIGHT:
        return SunIcon;
      case Themes.DARK:
        return MoonIcon;
      case Themes.SYSTEM:
      default:
        return SunMoonIcon;
    }
  }, [theme]);

  return createElement(tag, props);
}

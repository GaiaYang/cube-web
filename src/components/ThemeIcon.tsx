import { forwardRef } from "react";

import { LucideProps, MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

import type { Theme } from "@/types/theme";
import { Themes } from "@/enums/theme";

export interface ThemeIconProps
  extends Omit<LucideProps, "ref">, React.RefAttributes<SVGSVGElement> {
  theme?: Theme;
}

/** 網站主題圖標 */
export default forwardRef<SVGSVGElement, ThemeIconProps>(function ThemeIcon(
  { theme, ...props },
  ref,
) {
  switch (theme) {
    case Themes.LIGHT:
      return <SunIcon {...props} ref={ref} />;
    case Themes.DARK:
      return <MoonIcon {...props} ref={ref} />;
    case Themes.SYSTEM:
    default:
      return <SunMoonIcon {...props} ref={ref} />;
  }
});

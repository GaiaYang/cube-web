export interface Theme {
  primary: string;
  primaryContent: string;
  secondary: string;
  secondaryContent: string;
  accent: string;
  accentContent: string;
  neutral: string;
  neutralContent: string;
  base100: string;
  base200: string;
  base300: string;
  baseContent: string;
  info: string;
  infoContent: string;
  success: string;
  successContent: string;
  warning: string;
  warningContent: string;
  error: string;
  errorContent: string;
}

/** daisyUI v5 預設主題色票 */
const daisyTheme: Record<"light" | "dark", Theme> = {
  light: {
    primary: "oklch(45% .24 277.023)",
    primaryContent: "oklch(93% .034 272.788)",
    secondary: "oklch(65% .241 354.308)",
    secondaryContent: "oklch(94% .028 342.258)",
    accent: "oklch(77% .152 181.912)",
    accentContent: "oklch(38% .063 188.416)",
    neutral: "oklch(14% .005 285.823)",
    neutralContent: "oklch(92% .004 286.32)",
    base100: "oklch(100% 0 0)",
    base200: "oklch(98% 0 0)",
    base300: "oklch(95% 0 0)",
    baseContent: "oklch(21% .006 285.885)",
    info: "oklch(74% .16 232.661)",
    infoContent: "oklch(29% .066 243.157)",
    success: "oklch(76% .177 163.223)",
    successContent: "oklch(37% .077 168.94)",
    warning: "oklch(82% .189 84.429)",
    warningContent: "oklch(41% .112 45.904)",
    error: "oklch(71% .194 13.428)",
    errorContent: "oklch(27% .105 12.094)",
  },
  dark: {
    primary: "oklch(45% .24 277.023)",
    primaryContent: "oklch(93% .034 272.788)",
    secondary: "oklch(65% .241 354.308)",
    secondaryContent: "oklch(94% .028 342.258)",
    accent: "oklch(77% .152 181.912)",
    accentContent: "oklch(38% .063 188.416)",
    neutral: "oklch(14% .005 285.823)",
    neutralContent: "oklch(92% .004 286.32)",
    base100: "oklch(25.33% .016 252.42)",
    base200: "oklch(23.26% .014 253.1)",
    base300: "oklch(21.15% .012 254.09)",
    baseContent: "oklch(97.807% .029 256.847)",
    info: "oklch(74% .16 232.661)",
    infoContent: "oklch(29% .066 243.157)",
    success: "oklch(76% .177 163.223)",
    successContent: "oklch(37% .077 168.94)",
    warning: "oklch(82% .189 84.429)",
    warningContent: "oklch(41% .112 45.904)",
    error: "oklch(71% .194 13.428)",
    errorContent: "oklch(27% .105 12.094)",
  },
};

export default daisyTheme;

import colors from "tailwindcss/colors";

interface Theme {
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

// daisyUI v5 預設主題色票
const daisyTheme: { light: Theme; dark: Theme } = {
  light: {
    primary: colors.indigo[500],
    primaryContent: colors.indigo[50],
    secondary: colors.pink[500],
    secondaryContent: colors.pink[100],
    accent: colors.teal[400],
    accentContent: colors.teal[900],
    neutral: colors.zinc[950],
    neutralContent: colors.zinc[200],
    base100: colors.white,
    base200: colors.zinc[50],
    base300: "oklch(95% 0 0)",
    baseContent: colors.zinc[900],
    info: colors.sky[400],
    infoContent: colors.sky[950],
    success: colors.emerald[400],
    successContent: colors.emerald[900],
    warning: colors.amber[400],
    warningContent: colors.amber[900],
    error: colors.rose[400],
    errorContent: colors.rose[950],
  },
  dark: {
    primary: colors.indigo[500],
    primaryContent: colors.indigo[50],
    secondary: colors.pink[500],
    secondaryContent: colors.pink[100],
    accent: colors.teal[400],
    accentContent: colors.teal[900],
    neutral: colors.zinc[950],
    neutralContent: colors.zinc[200],
    base100: "oklch(25.33% 0.016 252.42)",
    base200: "oklch(23.26% 0.014 253.1)",
    base300: "oklch(21.15% 0.012 254.09)",
    baseContent: "oklch(97.807% 0.029 256.847)",
    info: colors.sky[400],
    infoContent: colors.sky[950],
    success: colors.emerald[400],
    successContent: colors.emerald[900],
    warning: colors.amber[400],
    warningContent: colors.amber[900],
    error: colors.rose[400],
    errorContent: colors.rose[950],
  },
};

export default daisyTheme;

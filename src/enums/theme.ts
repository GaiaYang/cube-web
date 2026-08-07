/** 網站主題列舉 */
export const Themes = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark",
} as const;

export type Themes = (typeof Themes)[keyof typeof Themes];

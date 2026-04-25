import { Option } from "./types";

import enumToOptions from "@/data/options/enumToOptions";
import { Themes } from "@/enums/theme";

const { labels, options } = enumToOptions(Themes, {
  [Themes.SYSTEM]: "系統",
  [Themes.LIGHT]: "亮色",
  [Themes.DARK]: "深色",
});

export type OptionType = Option<Themes>;

export { labels, options };

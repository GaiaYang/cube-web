import enumToOptions from "@/data/options/enumToOptions";
import { Themes } from "@/enums/theme";
import { Option } from "./types";

const { labels, options } = enumToOptions(Themes, {
  [Themes.SYSTEM]: "系統",
  [Themes.LIGHT]: "亮色",
  [Themes.DARK]: "深色",
});

export type OptionType = Option<Themes>;

export { labels, options };

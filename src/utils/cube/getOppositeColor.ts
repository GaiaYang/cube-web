import type { CubeFaceColor } from "@/types/cube/color";

/** 對面顏色對照表 */
const OPPOSITE = {
  none: "none",
  white: "yellow",
  yellow: "white",
  green: "blue",
  blue: "green",
  red: "orange",
  orange: "red",
} as const satisfies Record<CubeFaceColor, CubeFaceColor>;

/** 取得指定顏色的對面顏色 */
export default function getOppositeColor(color: CubeFaceColor): CubeFaceColor {
  return OPPOSITE[color];
}

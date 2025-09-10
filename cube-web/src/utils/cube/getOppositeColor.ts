import type { CubeFaceColor } from "@/types/cube/color";

/** 方塊顏色對照表 */
const map: Record<CubeFaceColor, CubeFaceColor> = {
  none: "none",
  white: "yellow",
  yellow: "white",
  green: "blue",
  blue: "green",
  red: "orange",
  orange: "red",
};

/** 取得指定顏色的對面顏色 */
export default function getOppositeColor(
  color: CubeFaceColor,
): CubeFaceColor | null {
  return map[color] ?? null;
}

import type { FaceletColor } from "@/types/cube/333";

const map: Record<FaceletColor, FaceletColor> = {
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
  color: FaceletColor,
): FaceletColor | null {
  return map[color] ?? null;
}

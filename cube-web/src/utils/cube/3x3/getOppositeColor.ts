import type { FaceletColor } from "@/types/cube/333";

type Face = Exclude<FaceletColor, "none">;

const map: Record<Face, Face> = {
  white: "yellow",
  yellow: "white",
  green: "blue",
  blue: "green",
  red: "orange",
  orange: "red",
};

/** 取得指定顏色的對面顏色 */
export default function getOppositeColor(color: Face): Face | null {
  return map[color] ?? null;
}

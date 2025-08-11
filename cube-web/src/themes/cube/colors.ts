import type { CubeFaceColor } from "@/types/cube/color";

/** 填滿顏色 */
export const fillColors: Record<CubeFaceColor, string> = {
  red: "fill-red-500",
  orange: "fill-orange-400",
  white: "fill-white",
  yellow: "fill-yellow-300",
  blue: "fill-blue-500",
  green: "fill-green-500",
  none: "fill-gray-300 dark:fill-gray-500",
};

/** 取得填滿顏色 */
export function getFillColor(params?: CubeFaceColor | null) {
  return fillColors[params ?? "none"] ?? fillColors.none;
}

/** 線條顏色 */
export const strokeColors: Record<CubeFaceColor, string> = {
  red: "stroke-red-500",
  orange: "stroke-orange-400",
  white: "stroke-white",
  yellow: "stroke-yellow-300",
  blue: "stroke-blue-500",
  green: "stroke-green-500",
  none: "stroke-gray-300 dark:stroke-gray-500",
};

/** 取得線條顏色 */
export function getStrokeColor(params?: CubeFaceColor | null) {
  return strokeColors[params ?? "none"] ?? strokeColors.none;
}

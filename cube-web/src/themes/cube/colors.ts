import type { CubeFaceColor } from "@/types/cube/color";
import cn from "@/utils/cn";

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

/** 背景顏色 */
export const bgColors: Record<CubeFaceColor, string> = {
  red: "bg-red-500",
  orange: "bg-orange-400",
  white: "bg-white",
  yellow: "bg-yellow-300",
  blue: "bg-blue-500",
  green: "bg-green-500",
  none: "bg-gray-300 dark:bg-gray-500",
};

/** 取得背景顏色 */
export function getBgColor(params?: CubeFaceColor | null) {
  return bgColors[params ?? "none"] ?? bgColors.none;
}

/** 外框顏色 */
export const outlineColors: Record<CubeFaceColor, string> = {
  red: "outline-red-500",
  orange: "outline-orange-400",
  white: "outline-white",
  yellow: "outline-yellow-300",
  blue: "outline-blue-500",
  green: "outline-green-500",
  none: "outline-gray-300 dark:outline-gray-500",
};

/** 取得外框顏色 */
export function getOutlineColor(params?: CubeFaceColor | null) {
  return outlineColors[params ?? "none"] ?? bgColors.none;
}

export type CubeColorType = "fill" | "bg" | "stroke" | "outline";

export function getCubeColor(
  params: CubeFaceColor | null,
  types: CubeColorType[],
) {
  const _types = Array.from(new Set(types));
  const result = [];
  for (const type of _types) {
    switch (type) {
      case "bg":
        result.push(getBgColor(params));
        break;
      case "fill":
        result.push(getFillColor(params));
        break;
      case "stroke":
        result.push(getStrokeColor(params));
        break;
      case "outline":
        result.push(getOutlineColor(params));
        break;
      default:
        break;
    }
  }
  return cn(result);
}

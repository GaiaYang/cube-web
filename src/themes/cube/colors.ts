import clsx from "clsx";
import { uniq } from "es-toolkit";

import type { CubeFaceColor } from "@/types/cube/color";

import getOrDefault from "@/utils/getOrDefault";

/** 魔方顏色物件 */
export type CubeFaceColorObject = Record<CubeFaceColor, string>;

/** 退回預設選項 */
function fallback(obj: CubeFaceColorObject, key?: CubeFaceColor | null) {
  return getOrDefault(obj, "none", key);
}

/** 填滿顏色 */
export const fillColors: CubeFaceColorObject = {
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
  return fallback(fillColors, params);
}

/** 線條顏色 */
export const strokeColors: CubeFaceColorObject = {
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
  return fallback(strokeColors, params);
}

/** 背景顏色 */
export const bgColors: CubeFaceColorObject = {
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
  return fallback(bgColors, params);
}

/** 外框顏色 */
export const outlineColors: CubeFaceColorObject = {
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
  return fallback(outlineColors, params);
}

/** 魔方顏色類型 */
export type CubeColorType = "fill" | "bg" | "stroke" | "outline";

/**
 * 取得魔方顏色列表
 * @param params 魔方顏色
 * @param types 顏色類型
 * @returns 魔方顏色class
 */
export default function getCubeColor(
  params: CubeFaceColor | null | undefined,
  types: CubeColorType[] | CubeColorType,
) {
  if (!params || !types) {
    return "";
  }

  const result: string[] = [];

  for (const type of uniq(typeof types === "string" ? [types] : types)) {
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
  return clsx(result);
}

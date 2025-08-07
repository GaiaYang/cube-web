import type { FaceletColor } from "@/types/cube/333";
import getOppositeColor from "./getOppositeColor";
import getLeftRightColors from "./getLeftRightColors";

/** 方塊六面 */
export type Direction = "U" | "D" | "F" | "B" | "L" | "R";
/** 方塊六面顏色 */
export type CubeColorMap = Record<Direction, FaceletColor>;

/**
 * 根據指定的 U（上）與 F（前）顏色，回傳完整六面顏色映射
 * 若輸入無效或互為對面顏色，回傳 null
 */
export default function getCubeColorMap(
  u?: FaceletColor,
  f?: FaceletColor,
): CubeColorMap | null {
  if (!u || !f || u === f) {
    return null;
  }

  const D = getOppositeColor(u);
  const B = getOppositeColor(f);

  if (!D || !B) {
    return null;
  }

  const lr = getLeftRightColors(u, f);

  if (!lr) {
    return null;
  }

  return {
    U: u,
    D,
    F: f,
    B,
    L: lr.left,
    R: lr.right,
  };
}

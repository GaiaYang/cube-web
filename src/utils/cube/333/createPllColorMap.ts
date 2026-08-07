import { isPlainObject } from "es-toolkit";

import getCubeColorMap from "../getCubeColorMap";

import {
  createEmptyColorMap,
  FACE_POSITIONS,
  FACELET_POSITIONS,
  SIDE_POSITIONS,
} from "./colorMap";

import type { CubeFaceColors } from "@/enums/cube/color";
import type { CubeFaceletPosition2D, PLLDefinition } from "@/types/cube/333";

export type PLLColorMap = Record<CubeFaceletPosition2D, CubeFaceColors>;

/** 建立PLL顏色地圖 */
export default function createPllColorMap(
  pattern?: PLLDefinition["pattern"],
  topColor?: CubeFaceColors,
  frontColor?: CubeFaceColors,
): PLLColorMap | undefined {
  if (!isPlainObject(pattern)) return;
  const faceColors = getCubeColorMap(topColor, frontColor);
  if (!faceColors) return;

  const colorMap = createEmptyColorMap(FACELET_POSITIONS);
  for (const item of FACE_POSITIONS) {
    colorMap[item] = faceColors.U;
  }

  for (const item of SIDE_POSITIONS) {
    const face = pattern[item];
    if (face) colorMap[item] = faceColors[face];
  }

  return colorMap;
}

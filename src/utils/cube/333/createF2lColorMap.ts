import { isPlainObject } from "es-toolkit";

import getCubeColorMap from "../getCubeColorMap";

import { BLOCK_POSITIONS, createEmptyColorMap } from "./colorMap";

import type { CubeBlockPosition3D, F2LDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";

export type F2LColorMap = Record<CubeBlockPosition3D, CubeFaceColor>;

export default function createF2lColorMap(
  pattern?: F2LDefinition["pattern"],
  topColor?: CubeFaceColor,
  frontColor?: CubeFaceColor,
): F2LColorMap | undefined {
  if (!isPlainObject(pattern)) return;
  const faceColors = getCubeColorMap(topColor, frontColor);
  if (!faceColors) return;

  const colorMap = createEmptyColorMap(BLOCK_POSITIONS);
  for (const [key, value] of Object.entries(pattern)) {
    colorMap[key as CubeBlockPosition3D] = faceColors[value];
  }

  return colorMap;
}

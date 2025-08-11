import { isPlainObject } from "es-toolkit";

import type { CubeFaceletPosition2D, PLLDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";

import getCubeColorMap from "./getCubeColorMap";

/** 建立PLL顏色地圖 */
export default function createPllColorMap(
  pattern?: PLLDefinition["pattern"],
  topColor?: CubeFaceColor,
  frontColor?: CubeFaceColor,
) {
  if (!isPlainObject(pattern)) {
    return;
  }

  const colorMap: Partial<Record<CubeFaceletPosition2D, CubeFaceColor>> = {
    TL: "none",
    TC: "none",
    TR: "none",
    CL: "none",
    CR: "none",
    CC: "none",
    BL: "none",
    BC: "none",
    BR: "none",
    "S-TL": "none",
    "S-TC": "none",
    "S-TR": "none",
    "S-BL": "none",
    "S-BC": "none",
    "S-BR": "none",
    "S-RT": "none",
    "S-RC": "none",
    "S-RB": "none",
    "S-LT": "none",
    "S-LC": "none",
    "S-LB": "none",
  };

  const faceColors = getCubeColorMap(topColor, frontColor);

  if (faceColors) {
    // 填入頂層顏色
    for (const item of ["TL", "TC", "TR", "CL", "CR", "CC", "BL", "BC", "BR"]) {
      colorMap[item as CubeFaceletPosition2D] = faceColors.U;
    }

    // 填入側面顏色
    for (const item of [
      "S-TL",
      "S-TC",
      "S-TR",
      "S-BL",
      "S-BC",
      "S-BR",
      "S-RT",
      "S-RC",
      "S-RB",
      "S-LT",
      "S-LC",
      "S-LB",
    ]) {
      const cubePos = pattern?.[item as CubeFaceletPosition2D];
      if (cubePos) {
        colorMap[item as CubeFaceletPosition2D] = faceColors[cubePos];
      }
    }
  }

  return colorMap;
}

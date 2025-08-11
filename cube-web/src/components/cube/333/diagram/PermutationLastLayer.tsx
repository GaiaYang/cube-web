import React from "react";
import { isPlainObject } from "es-toolkit";

import {
  CubeFaceletPosition2D,
  CubeFaceColor,
  PLLDefinition,
} from "@/types/cube/333";

import LastLayer, { type LastLayerDiagramProps } from "./LastLayerDiagram";
import getCubeColorMap from "@/utils/cube/3x3/getCubeColorMap";

export interface PermutationLastLayerProps
  extends Omit<LastLayerDiagramProps, "colorMap">,
    Partial<Pick<PLLDefinition, "pattern">> {
  /** 頂層顏色 */
  topColor?: CubeFaceColor;
  /** 前層顏色 */
  frontColor?: CubeFaceColor;
}

/** PLL顯示圖案 */
export default function PermutationLastLayer({
  pattern,
  topColor = "yellow",
  frontColor = "green",
  ...props
}: PermutationLastLayerProps) {
  return (
    <LastLayer
      {...props}
      colorMap={createPllColorMap(pattern, topColor, frontColor)}
    />
  );
}

export function createPllColorMap(
  pattern?: PLLDefinition["pattern"],
  topColor?: CubeFaceColor,
  frontColor?: CubeFaceColor,
) {
  if (!isPlainObject(pattern)) {
    return;
  }

  const colorMap: LastLayerDiagramProps["colorMap"] = {
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

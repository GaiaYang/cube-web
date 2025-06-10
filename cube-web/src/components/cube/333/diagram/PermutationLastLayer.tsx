import React from "react";

import { CubePosition, FaceletPosition, FaceletColor } from "@/schema/cube/333";

import LastLayer, { type LastLayerDiagramProps } from "./LastLayerDiagram";
import getCubeColorMap from "@/utils/cube/3x3/getCubeColorMap";

export interface PermutationLastLayerProps
  extends Omit<LastLayerDiagramProps, "colorMap"> {
  /** 圖案 */
  pattern?: Partial<Record<FaceletPosition, CubePosition>>;
  /** 頂層顏色 */
  topColor?: FaceletColor;
  /** 前層顏色 */
  frontColor?: FaceletColor;
}

export default function PermutationLastLayer({
  pattern,
  topColor = "yellow",
  frontColor = "green",
  ...props
}: PermutationLastLayerProps) {
  return (
    <LastLayer
      {...props}
      colorMap={createColorMap(pattern, topColor, frontColor)}
    />
  );
}

function createColorMap(
  pattern?: Partial<Record<FaceletPosition, CubePosition>>,
  topColor?: FaceletColor,
  frontColor?: FaceletColor,
) {
  // 初始化所有面為 "none"
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
      colorMap[item as FaceletPosition] = faceColors.U;
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
      const cubePos = pattern?.[item as FaceletPosition];
      if (cubePos) {
        colorMap[item as FaceletPosition] = faceColors[cubePos];
      }
    }
  }

  return colorMap;
}

import React from "react";
import { isPlainObject } from "es-toolkit";

import type {
  CubeBlockPosition3D,
  CubeFaceColor,
  F2LDefinition,
} from "@/types/cube/333";

import CubeDiagram, { type CubeDiagramProps } from "./CubeDiagram";
import getCubeColorMap from "@/utils/cube/3x3/getCubeColorMap";

export interface FirstTwoLayersProps
  extends Omit<CubeDiagramProps, "colorMap">,
    Partial<Pick<F2LDefinition, "pattern">> {
  /** 頂層顏色 */
  topColor?: CubeFaceColor;
  /** 前層顏色 */
  frontColor?: CubeFaceColor;
}

/** F2L顯示圖案 */
export default function FirstTwoLayers({
  pattern,
  topColor = "yellow",
  frontColor = "green",
  ...props
}: FirstTwoLayersProps) {
  return (
    <CubeDiagram
      {...props}
      colorMap={createColorMap(pattern, topColor, frontColor)}
    />
  );
}

function createColorMap(
  pattern?: F2LDefinition["pattern"],
  topColor?: CubeFaceColor,
  frontColor?: CubeFaceColor,
) {
  if (!isPlainObject(pattern)) {
    return;
  }

  const colorMap: CubeDiagramProps["colorMap"] = {
    "U-TL": "none",
    "U-TC": "none",
    "U-TR": "none",
    "U-CL": "none",
    "U-CR": "none",
    "U-CC": "none",
    "U-BL": "none",
    "U-BC": "none",
    "U-BR": "none",
    "F-TL": "none",
    "F-TC": "none",
    "F-TR": "none",
    "F-CL": "none",
    "F-CR": "none",
    "F-CC": "none",
    "F-BL": "none",
    "F-BC": "none",
    "F-BR": "none",
    "S-TL": "none",
    "S-TC": "none",
    "S-TR": "none",
    "S-CL": "none",
    "S-CR": "none",
    "S-CC": "none",
    "S-BL": "none",
    "S-BC": "none",
    "S-BR": "none",
  };

  const faceColors = getCubeColorMap(topColor, frontColor);

  if (faceColors) {
    for (const [key, value] of Object.entries(pattern)) {
      colorMap[key as CubeBlockPosition3D] = faceColors[value];
    }
  }

  return colorMap;
}

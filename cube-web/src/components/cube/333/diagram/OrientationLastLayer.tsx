import React from "react";

import { CubeFaceletPosition2D, CubeFaceColor } from "@/types/cube/333";

import LastLayer, { type LastLayerDiagramProps } from "./LastLayerDiagram";

export interface OrientationLastLayerProps
  extends Omit<LastLayerDiagramProps, "colorMap"> {
  /** 圖案 */
  pattern?: CubeFaceletPosition2D[];
  /** 頂層顏色 */
  topColor?: CubeFaceColor;
}

/** OLL顯示圖案組件 */
export default function OrientationLastLayer({
  pattern,
  topColor = "yellow",
  ...props
}: OrientationLastLayerProps) {
  return <LastLayer {...props} colorMap={createColorMap(pattern, topColor)} />;
}

function createColorMap(
  array?: CubeFaceletPosition2D[],
  color?: CubeFaceColor,
) {
  const result: LastLayerDiagramProps["colorMap"] = {
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

  if (!Array.isArray(array)) {
    return result;
  }

  for (const item of array) {
    result[item] = color;
  }

  return result;
}

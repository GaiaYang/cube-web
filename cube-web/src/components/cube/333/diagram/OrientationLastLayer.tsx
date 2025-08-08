import React from "react";

import { CubeFaceColor, OLLDefinition } from "@/types/cube/333";

import LastLayer, { type LastLayerDiagramProps } from "./LastLayerDiagram";

export interface OrientationLastLayerProps
  extends Omit<LastLayerDiagramProps, "colorMap">,
    Partial<Pick<OLLDefinition, "pattern">> {
  /** 頂層顏色 */
  topColor?: CubeFaceColor;
}

/** OLL圖案 */
export default function OrientationLastLayer({
  pattern,
  topColor = "yellow",
  ...props
}: OrientationLastLayerProps) {
  return <LastLayer {...props} colorMap={createColorMap(pattern, topColor)} />;
}

function createColorMap(
  pattern?: OLLDefinition["pattern"],
  color?: CubeFaceColor,
) {
  if (!Array.isArray(pattern)) {
    return;
  }

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

  for (const item of pattern) {
    result[item] = color;
  }

  return result;
}

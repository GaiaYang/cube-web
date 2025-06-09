import React from "react";

import { FaceletPosition, FaceletColor } from "@/schema/cube/333";

import LastLayer, { type LastLayerDiagramProps } from "./LastLayerDiagram";

export interface OrientationLastLayerProps extends LastLayerDiagramProps {
  /** 圖案代號 */
  pattern?: FaceletPosition[];
  /** 主要顏色 */
  mainColor?: FaceletColor;
}

export default function OrientationLastLayer({
  pattern,
  mainColor = "yellow",
  ...props
}: OrientationLastLayerProps) {
  return <LastLayer {...props} colorMap={createColorMap(pattern, mainColor)} />;
}

function createColorMap(array?: FaceletPosition[], color?: FaceletColor) {
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

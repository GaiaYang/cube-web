import React from "react";

import type { F2LDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";

import CubeDiagram, { type CubeDiagramProps } from "./CubeDiagram";
import createF2lColorMap from "@/utils/cube/333/createF2lColorMap";

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
      colorMap={createF2lColorMap(pattern, topColor, frontColor)}
    />
  );
}

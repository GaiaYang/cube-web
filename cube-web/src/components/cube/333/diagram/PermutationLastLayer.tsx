"use client";

import React from "react";

import type { PLLDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";

import createPllColorMap from "@/utils/cube/333/createPllColorMap";
import useCubeFaceColor from "./useCubeFaceColor";

import LastLayer, { type LastLayerDiagramProps } from "./LastLayerDiagram";

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
  topColor,
  frontColor,
  ...props
}: PermutationLastLayerProps) {
  const cubeFaceColor = useCubeFaceColor();

  return (
    <LastLayer
      {...props}
      colorMap={createPllColorMap(
        pattern,
        topColor ?? cubeFaceColor.top,
        frontColor ?? cubeFaceColor.front,
      )}
    />
  );
}

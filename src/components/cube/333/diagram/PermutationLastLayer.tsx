"use client";
import { useMemo } from "react";

import type { PLLDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";

import createPllColorMap from "@/utils/cube/333/createPllColorMap";
import useCubeFaceColor from "./useCubeFaceColor";

import LastLayer, { type LastLayerDiagramProps } from "./LastLayerDiagram";

export interface PermutationLastLayerProps
  extends
    Omit<LastLayerDiagramProps, "colorMap">,
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
  const _colorMap = useMemo(
    () =>
      createPllColorMap(
        pattern,
        topColor ?? cubeFaceColor.top,
        frontColor ?? cubeFaceColor.front,
      ),
    [pattern, topColor, frontColor, cubeFaceColor.top, cubeFaceColor.front],
  );

  return <LastLayer {...props} colorMap={_colorMap} />;
}

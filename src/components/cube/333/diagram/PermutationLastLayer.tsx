"use client";

import LastLayerDiagram, {
  type LastLayerDiagramProps,
} from "./LastLayerDiagram";
import useCubeFaceColor from "./useCubeFaceColor";

import type { PLLDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";
import createPllColorMap from "@/utils/cube/333/createPllColorMap";

export interface PermutationLastLayerProps
  extends
    Omit<LastLayerDiagramProps, "colorMap">,
    Partial<Pick<PLLDefinition, "pattern">> {
  /** 頂層顏色 */
  topColor?: CubeFaceColor;
  /** 前層顏色 */
  frontColor?: CubeFaceColor;
}

/** PLL 顯示圖案 */
export default function PermutationLastLayer({
  pattern,
  topColor,
  frontColor,
  ...props
}: PermutationLastLayerProps) {
  const { top, front } = useCubeFaceColor({ topColor, frontColor });

  return (
    <LastLayerDiagram
      {...props}
      colorMap={createPllColorMap(pattern, top, front)}
    />
  );
}

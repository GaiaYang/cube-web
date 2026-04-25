"use client";

import LastLayer, { type LastLayerDiagramProps } from "./LastLayerDiagram";
import useCubeFaceColor from "./useCubeFaceColor";

import type { OLLDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";
import createOllColorMap from "@/utils/cube/333/createOllColorMap";

export interface OrientationLastLayerProps
  extends
    Omit<LastLayerDiagramProps, "colorMap">,
    Partial<Pick<OLLDefinition, "pattern">> {
  /** 頂層顏色 */
  topColor?: CubeFaceColor;
}

/** OLL圖案 */
export default function OrientationLastLayer({
  pattern,
  topColor,
  ...props
}: OrientationLastLayerProps) {
  const cubeFaceColor = useCubeFaceColor();

  return (
    <LastLayer
      {...props}
      colorMap={createOllColorMap(pattern, topColor ?? cubeFaceColor.top)}
    />
  );
}

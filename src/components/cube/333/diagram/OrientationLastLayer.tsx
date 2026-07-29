"use client";

import LastLayerDiagram, {
  type LastLayerDiagramProps,
} from "./LastLayerDiagram";
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

/** OLL 圖案 */
export default function OrientationLastLayer({
  pattern,
  topColor,
  ...props
}: OrientationLastLayerProps) {
  const { top } = useCubeFaceColor({ topColor });

  return (
    <LastLayerDiagram
      {...props}
      colorMap={createOllColorMap(pattern, top)}
    />
  );
}

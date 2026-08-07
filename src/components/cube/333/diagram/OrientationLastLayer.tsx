"use client";

import LastLayerDiagram, {
  type LastLayerDiagramProps,
} from "./LastLayerDiagram";
import useCubeFaceColor from "./useCubeFaceColor";

import type { CubeFaceColors } from "@/enums/cube/color";
import type { OLLDefinition } from "@/types/cube/333";
import createOllColorMap from "@/utils/cube/333/createOllColorMap";

export interface OrientationLastLayerProps
  extends
    Omit<LastLayerDiagramProps, "colorMap">,
    Partial<Pick<OLLDefinition, "pattern">> {
  /** 頂層顏色 */
  topColor?: CubeFaceColors;
}

/** OLL 圖案 */
export default function OrientationLastLayer({
  pattern,
  topColor,
  ...props
}: OrientationLastLayerProps) {
  const { top } = useCubeFaceColor({ topColor });

  return (
    <LastLayerDiagram {...props} colorMap={createOllColorMap(pattern, top)} />
  );
}

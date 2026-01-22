"use client";
import { memo, useMemo } from "react";

import type { OLLDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";

import createOllColorMap from "@/utils/cube/333/createOllColorMap";
import useCubeFaceColor from "./useCubeFaceColor";
import deepEqualForKeys from "@/utils/deepEqualForKeys";

import LastLayer, { type LastLayerDiagramProps } from "./LastLayerDiagram";

export interface OrientationLastLayerProps
  extends
    Omit<LastLayerDiagramProps, "colorMap">,
    Partial<Pick<OLLDefinition, "pattern">> {
  /** 頂層顏色 */
  topColor?: CubeFaceColor;
}

/** OLL圖案 */
const OrientationLastLayer = memo(
  function OrientationLastLayer({
    pattern,
    topColor,
    ...props
  }: OrientationLastLayerProps) {
    const cubeFaceColor = useCubeFaceColor();
    const _colorMap = useMemo(
      () => createOllColorMap(pattern, topColor ?? cubeFaceColor.top),
      [pattern, topColor, cubeFaceColor.top],
    );

    return <LastLayer {...props} colorMap={_colorMap} />;
  },
  deepEqualForKeys(["pattern"]),
);

export default OrientationLastLayer;

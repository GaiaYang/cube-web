"use client";
import { memo, useMemo } from "react";

import type { F2LDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";

import createF2lColorMap from "@/utils/cube/333/createF2lColorMap";
import useCubeFaceColor from "./useCubeFaceColor";
import deepEqualForKeys from "@/utils/deepEqualForKeys";

import CubeDiagram, { type CubeDiagramProps } from "./CubeDiagram";

export interface FirstTwoLayersProps
  extends
    Omit<CubeDiagramProps, "colorMap">,
    Partial<Pick<F2LDefinition, "pattern">> {
  /** 頂層顏色 */
  topColor?: CubeFaceColor;
  /** 前層顏色 */
  frontColor?: CubeFaceColor;
}

/** F2L顯示圖案 */
const FirstTwoLayers = memo(
  function FirstTwoLayers({
    pattern,
    topColor,
    frontColor,
    ...props
  }: FirstTwoLayersProps) {
    const cubeFaceColor = useCubeFaceColor();
    const _colorMap = useMemo(
      () =>
        createF2lColorMap(
          pattern,
          topColor ?? cubeFaceColor.top,
          frontColor ?? cubeFaceColor.front,
        ),
      [pattern, topColor, frontColor, cubeFaceColor.top, cubeFaceColor.front],
    );

    return <CubeDiagram {...props} colorMap={_colorMap} />;
  },
  deepEqualForKeys(["pattern"]),
);

export default FirstTwoLayers;

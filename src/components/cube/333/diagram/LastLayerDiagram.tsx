"use client";

import { memo, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import cn from "@/utils/cn";

import type { CubeFaceletPosition2D } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";
import type { CommonDiagramProps } from "./type";
import getCubeColor from "@/themes/cube/colors";
import deepEqualForKeys from "@/utils/deepEqualForKeys";
import { mergeRefs } from "@/utils/mergeRefs";

export interface LastLayerDiagramProps extends CommonDiagramProps {
  colorMap?: Partial<Record<CubeFaceletPosition2D, CubeFaceColor>>;
}

/** 最後一層圖案 */
const LastLayerDiagram = memo(
  function LastLayerDiagram({
    size,
    colorMap,
    loading = "eager",
    placeholder = "empty",
    unmountOnExit = false,
    // 原生屬性
    ref,
    className,
    ...props
  }: LastLayerDiagramProps) {
    const { ref: inViewRef, inView } = useInView({
      triggerOnce: loading === "lazy" && !unmountOnExit,
      skip: loading === "eager",
    });
    /** 是否顯示元素 */
    const shouldRender = loading === "eager" || inView;
    const refs = useMemo(() => mergeRefs([ref, inViewRef]), [ref, inViewRef]);

    function _renderItem(item: RectItem) {
      const faceColor = colorMap?.[item.id];
      return (
        <rect
          {...item}
          key={item.id}
          className={cn(getCubeColor(faceColor, "fill"), {
            "stroke-slate-300 stroke-[0.25] dark:stroke-slate-500":
              faceColor !== "none",
          })}
        />
      );
    }

    return (
      <svg
        width={size}
        height={size}
        {...props}
        ref={refs}
        viewBox="0 0 56 56"
        aria-hidden
        pointerEvents="none"
        className={cn(
          { skeleton: !shouldRender && placeholder === "skeleton" },
          className,
        )}
      >
        {shouldRender ? rectangles.map(_renderItem) : null}
      </svg>
    );
  },
  deepEqualForKeys(["colorMap"]),
);

export default LastLayerDiagram;

interface RectItem extends React.SVGProps<SVGRectElement> {
  id: CubeFaceletPosition2D;
}

const rectangles: RectItem[] = [
  { id: "BR", width: 12, height: 12, x: 36, y: 36, rx: 1, ry: 1 },
  { id: "BC", width: 12, height: 12, x: 22, y: 36, rx: 1, ry: 1 },
  { id: "BL", width: 12, height: 12, x: 8, y: 36, rx: 1, ry: 1 },
  { id: "CR", width: 12, height: 12, x: 36, y: 22, rx: 1, ry: 1 },
  { id: "CC", width: 12, height: 12, x: 22, y: 22, rx: 1, ry: 1 },
  { id: "CL", width: 12, height: 12, x: 8, y: 22, rx: 1, ry: 1 },
  { id: "TR", width: 12, height: 12, x: 36, y: 8, rx: 1, ry: 1 },
  { id: "TC", width: 12, height: 12, x: 22, y: 8, rx: 1, ry: 1 },
  { id: "TL", width: 12, height: 12, x: 8, y: 8, rx: 1, ry: 1 },
  { id: "S-TL", width: 12, height: 4, x: 8, y: 2, rx: 1, ry: 1 },
  { id: "S-TC", width: 12, height: 4, x: 22, y: 2, rx: 1, ry: 1 },
  { id: "S-TR", width: 12, height: 4, x: 36, y: 2, rx: 1, ry: 1 },
  { id: "S-BL", width: 12, height: 4, x: 8, y: 50, rx: 1, ry: 1 },
  { id: "S-BC", width: 12, height: 4, x: 22, y: 50, rx: 1, ry: 1 },
  { id: "S-BR", width: 12, height: 4, x: 36, y: 50, ry: 1 },
  { id: "S-LT", width: 4, height: 12, x: 2, y: 8, rx: 1, ry: 1 },
  { id: "S-LC", width: 4, height: 12, x: 2, y: 22, rx: 1, ry: 1 },
  { id: "S-LB", width: 4, height: 12, x: 2, y: 36, rx: 1, ry: 1 },
  { id: "S-RT", width: 4, height: 12, x: 50, y: 8, rx: 1, ry: 1 },
  { id: "S-RC", width: 4, height: 12, x: 50, y: 22, rx: 1, ry: 1 },
  { id: "S-RB", width: 4, height: 12, x: 50, y: 36, rx: 1, ry: 1 },
];

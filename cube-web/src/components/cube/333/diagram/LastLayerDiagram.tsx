"use client";
import type { SVGProps } from "react";
import { memo } from "react";

import { deepEqual } from "fast-equals";
import { useInView } from "react-intersection-observer";

import cn from "@/utils/cn";

import type { CubeFaceletPosition2D } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";
import { getFillColor } from "@/themes/cube/colors";

export interface LastLayerDiagramProps extends SVGProps<SVGSVGElement> {
  size?: number;
  colorMap?: Partial<Record<CubeFaceletPosition2D, CubeFaceColor>>;
}

/** 最後一層圖案 */
export default memo(function LastLayerDiagram({
  size,
  colorMap,
  ...props
}: LastLayerDiagramProps) {
  const { ref, inView } = useInView({ triggerOnce: true });

  function _renderItem(item: RectItem) {
    return (
      <rect
        {...item}
        key={item.id}
        vectorEffect="non-scaling-stroke"
        className={cn(
          "stroke-1",
          "drak:stroke-slate-300 stroke-slate-400",
          getFillColor(colorMap?.[item.id]),
        )}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      {...props}
      ref={ref}
      viewBox="0 0 56 56"
      aria-hidden
      className={cn({ skeleton: !inView }, props.className)}
    >
      {inView ? rectangles.map(_renderItem) : null}
    </svg>
  );
}, deepEqual);

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

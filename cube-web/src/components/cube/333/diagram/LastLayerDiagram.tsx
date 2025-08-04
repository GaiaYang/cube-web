import React, { memo, type SVGProps } from "react";
import { deepEqual } from "fast-equals";

import cn from "@/utils/cn";

import type { FaceletPosition, FaceletColor } from "@/types/cube/333";
import { fillColors } from "@/themes/cube/colors";

export interface LastLayerDiagramProps extends SVGProps<SVGSVGElement> {
  size?: number;
  colorMap?: Partial<Record<FaceletPosition, FaceletColor>>;
}

/** 最後一層圖案 */
export default memo(function LastLayerDiagram({
  size,
  colorMap,
  ...props
}: LastLayerDiagramProps) {
  function _renderItem(item: RectItem) {
    return (
      <rect
        {...item}
        key={item.id}
        vectorEffect="non-scaling-stroke"
        className={cn(
          "stroke-1",
          "stroke-neutral-300",
          fillColors[colorMap?.[item.id] ?? "none"] ?? fillColors.none,
        )}
      />
    );
  }

  return (
    <svg width={size} height={size} {...props} viewBox="0 0 56 56">
      {rectangles.map(_renderItem)}
    </svg>
  );
}, deepEqual);

interface RectItem extends React.SVGProps<SVGRectElement> {
  id: FaceletPosition;
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

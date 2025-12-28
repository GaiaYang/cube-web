import React, { useMemo } from "react";

import type { CubeFaceCode } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";
import cn from "@/utils/cn";
import getCubeColor from "@/themes/cube/colors";
import scramblePreview, {
  type ScramblePreviewResult,
  type ScramblePreviewID,
} from "@/utils/cube/333/scramblePreview";

export interface ScramblePreviewProps {
  size?: number;
  scramble?: string;
}

export default function ScramblePreview({ scramble }: ScramblePreviewProps) {
  const sc = useMemo(() => scramblePreview(scramble), [scramble]);
  return (
    <div className="grid w-60 grid-cols-4 grid-rows-3 gap-1 p-1">
      <EmptyFace />
      <SingleFace id="U" colorMap={sc.U} />
      <EmptyFace />
      <EmptyFace />
      <SingleFace id="L" colorMap={sc.L} />
      <SingleFace id="F" colorMap={sc.F} />
      <SingleFace id="R" colorMap={sc.R} />
      <SingleFace id="B" colorMap={sc.B} />
      <EmptyFace />
      <SingleFace id="D" colorMap={sc.D} />
      <EmptyFace />
      <EmptyFace />
    </div>
  );
}

function EmptyFace() {
  return <div />;
}

interface SingleFaceProps {
  id: CubeFaceCode;
  colorMap: ScramblePreviewResult[CubeFaceCode];
}

const defaultColorMap: Record<CubeFaceCode, CubeFaceColor> = {
  U: "white",
  D: "yellow",
  L: "orange",
  R: "red",
  F: "green",
  B: "blue",
};

function SingleFace({ id, colorMap }: SingleFaceProps) {
  function _renderRect(item: RectItem) {
    return (
      <rect
        {...item}
        key={item.id}
        vectorEffect="non-scaling-stroke"
        width={12}
        height={12}
        rx={1}
        ry={1}
        className={cn(
          "stroke-1",
          "drak:stroke-slate-300 stroke-slate-400",
          getCubeColor(defaultColorMap[colorMap[item.id]], "fill"),
        )}
      />
    );
  }
  return (
    <svg
      // width={48}
      // height={48}
      viewBox="0 0 48 48"
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      // {...props}
    >
      {rects.map(_renderRect)}
    </svg>
  );
}

interface RectItem extends React.SVGProps<SVGRectElement> {
  id: ScramblePreviewID;
}

const rects: RectItem[] = [
  { id: "BR", x: 32, y: 32 },
  { id: "BC", x: 18, y: 32 },
  { id: "BL", x: 4, y: 32 },
  { id: "CR", x: 32, y: 18 },
  { id: "CC", x: 18, y: 18 },
  { id: "CL", x: 4, y: 18 },
  { id: "TR", x: 32, y: 4 },
  { id: "TC", x: 18, y: 4 },
  { id: "TL", x: 4, y: 4 },
];

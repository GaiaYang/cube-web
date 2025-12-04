import React, { useMemo } from "react";

import type { CubeFaceCode } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";
import cn from "@/utils/cn";
import { getFillColor } from "@/themes/cube/colors";
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
  function _renderPath(item: PathItem) {
    return (
      <path
        {...item}
        key={item.id}
        vectorEffect="non-scaling-stroke"
        className={cn(
          "stroke-1",
          "drak:stroke-slate-300 stroke-slate-400",
          getFillColor(defaultColorMap[colorMap[item.id]]),
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
      {paths.map(_renderPath)}
    </svg>
  );
}

interface PathItem extends React.SVGProps<SVGPathElement> {
  id: ScramblePreviewID;
}

const paths: PathItem[] = [
  {
    id: "TL",
    d: "m 1.9999992,1.9999991 v 3.4136885 6.8273754 3.413688 h 4.1939601 6.0471037 2.633416 c 0.432295,0 0.780271,-0.348 0.780271,-0.780272 V 6.1939593 1.9999991 h -3.413687 z",
  },
  {
    id: "TC",
    d: "M 17.172621,1.9999991 V 12.241063 c 0,1.891182 1.522508,3.413688 3.41369,3.413688 H 24 27.413689 c 1.891182,0 3.413685,-1.522506 3.413685,-3.413688 V 8.8273751 1.9999991 h -3.413685 z",
  },
  {
    id: "TR",
    d: "m 32.345245,1.9999991 v 4.1939602 6.0471037 2.633416 c 0,0.432272 0.347993,0.780272 0.780272,0.780272 h 2.633417 6.047102 4.193963 V 5.4136876 2.7802713 c 0,-0.4322718 -0.347981,-0.7802722 -0.780272,-0.7802722 h -2.633419 z",
  },
  {
    id: "CL",
    d: "m 1.9999992,17.172623 v 3.413688 6.827376 3.413688 h 6.8273763 3.4136875 c 1.891182,0 3.413687,-1.522506 3.413687,-3.413688 v -3.413688 -3.413688 c 0,-1.891182 -1.522505,-3.413688 -3.413687,-3.413688 z",
  },
  {
    id: "CC",
    d: "m 20.586311,17.172623 c -1.891182,0 -3.41369,1.522506 -3.41369,3.413688 v 3.413688 3.413688 c 0,1.891182 1.522508,3.413688 3.41369,3.413688 H 24 27.413689 c 1.891182,0 3.413685,-1.522506 3.413685,-3.413688 v -3.413688 -3.413688 c 0,-1.891182 -1.522503,-3.413688 -3.413685,-3.413688 H 24 Z",
  },
  {
    id: "CR",
    d: "m 35.758934,17.172623 c -1.891181,0 -3.413689,1.522506 -3.413689,3.413688 v 3.413688 3.413688 c 0,1.891182 1.522508,3.413688 3.413689,3.413688 h 3.413689 6.827376 V 20.586311 17.952895 c 0,-0.432272 -0.347981,-0.780272 -0.780272,-0.780272 h -6.047104 z",
  },
  {
    id: "BL",
    d: "m 1.9999992,32.345246 v 3.413688 6.827374 3.413691 H 5.4136876 12.241063 15.65475 V 35.758934 c 0,-1.891181 -1.522505,-3.413688 -3.413687,-3.413688 z",
  },
  {
    id: "BC",
    d: "m 20.586311,32.345246 c -1.891182,0 -3.41369,1.522507 -3.41369,3.413688 v 3.413689 6.827376 h 3.41369 6.827378 3.413685 V 35.758934 c 0,-1.891181 -1.522503,-3.413688 -3.413685,-3.413688 H 24 Z",
  },
  {
    id: "BR",
    d: "m 33.125517,32.345246 c -0.432248,0 -0.780272,0.348 -0.780272,0.780271 v 8.680519 4.193963 h 3.413689 6.827374 3.413691 v -4.193963 -6.047102 -2.633417 c 0,-0.432267 -0.347981,-0.780271 -0.780272,-0.780271 h -3.413691 z",
  },
];

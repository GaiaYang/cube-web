import getOppositeColor from "./getOppositeColor";

import type { CubeFaceCode } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";

/** 方塊六面顏色 */
export type CubeColorMap = Record<CubeFaceCode, CubeFaceColor>;

type Face = Exclude<CubeFaceColor, "none">;
type Vec3 = readonly [number, number, number];

/** 六面顏色對應的三維單位向量（右手坐標系） */
const VECTORS = {
  white: [0, 1, 0],
  yellow: [0, -1, 0],
  green: [0, 0, 1],
  blue: [0, 0, -1],
  red: [1, 0, 0],
  orange: [-1, 0, 0],
} as const satisfies Record<Face, Vec3>;

const FACE_BY_VEC = new Map<string, Face>(
  (Object.entries(VECTORS) as [Face, Vec3][]).map(([face, [x, y, z]]) => [
    `${x},${y},${z}`,
    face,
  ]),
);

/** U × F → R（平行或對面時無解） */
function rightOf(up: Face, front: Face): Face | undefined {
  const [ax, ay, az] = VECTORS[up];
  const [bx, by, bz] = VECTORS[front];
  return FACE_BY_VEC.get(
    `${ay * bz - az * by},${az * bx - ax * bz},${ax * by - ay * bx}`,
  );
}

/**
 * 根據指定的 U（上）與 F（前）顏色，回傳完整六面顏色映射
 * 若輸入無效或互為對面顏色，回傳 null
 */
export default function getCubeColorMap(
  u?: CubeFaceColor,
  f?: CubeFaceColor,
): CubeColorMap | null {
  if (!u || !f || u === "none" || f === "none" || u === f) {
    return null;
  }

  const R = rightOf(u, f);
  if (!R) return null;

  return {
    U: u,
    D: getOppositeColor(u),
    F: f,
    B: getOppositeColor(f),
    L: getOppositeColor(R),
    R,
  };
}

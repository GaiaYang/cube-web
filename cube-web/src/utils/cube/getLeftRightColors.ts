import type { CubeFaceColor } from "@/types/cube/color";

/** 六面顏色 */
export type Face = Exclude<CubeFaceColor, "none">;

/** 魔術方塊六面顏色對應的三維單位向量（右手坐標系）*/
const faceVectors = {
  white: [0, 1, 0],
  yellow: [0, -1, 0],
  green: [0, 0, 1],
  blue: [0, 0, -1],
  red: [1, 0, 0],
  orange: [-1, 0, 0],
} satisfies Record<Face, [number, number, number]>;

/** 建立向量到 `Face` 的查找表 */
const vectorToFaceMap = new Map<string, Face>(
  Object.entries(faceVectors).map(([face, vec]) => [
    vec.join(","),
    face as Face,
  ]),
);

/** 向量對應顏色 */
function vectorToFace(vec: [number, number, number]): Face | null {
  return vectorToFaceMap.get(vec.join(",")) ?? null;
}

/** 向量叉積 */
function cross(
  [ax, ay, az]: [number, number, number],
  [bx, by, bz]: [number, number, number],
): [number, number, number] {
  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

/**
 * 取得左右顏色
 */
export default function getLeftRightColors(
  up: CubeFaceColor,
  front: CubeFaceColor,
): { left: Face; right: Face } | null {
  // invalid input
  if (up === "none" || front === "none") return null;

  const rightVec = cross(faceVectors[up], faceVectors[front]);

  // 若上下相反或平行 → 叉積為零向量
  if (rightVec.every((v) => v === 0)) return null;

  const right = vectorToFace(rightVec);
  if (!right) return null;

  const left = vectorToFace(
    rightVec.map((v) => -v) as [number, number, number],
  );
  if (!left) return null;

  return { left, right };
}

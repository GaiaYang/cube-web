import type { FaceletColor } from "@/types/cube/333";

type Face = Exclude<FaceletColor, "none">;

/**
 * 魔術方塊六面顏色對應的三維單位向量（右手坐標系）
 */
const faceVectors: Record<Face, [number, number, number]> = {
  white: [0, 1, 0],
  yellow: [0, -1, 0],
  green: [0, 0, 1],
  blue: [0, 0, -1],
  red: [1, 0, 0],
  orange: [-1, 0, 0],
};

/**
 * 建立向量到 Face 的查找表，用逗號連接做為 key
 */
const vectorToFaceMap: Map<string, Face> = new Map(
  Object.entries(faceVectors).map(([face, vec]) => [
    vec.join(","),
    face as Face,
  ]),
);

/**
 * 將三維向量對應回 Face 顏色
 */
function vectorToFace(vec: [number, number, number]): Face | null {
  return vectorToFaceMap.get(vec.join(",")) ?? null;
}

/**
 * 向量叉積計算，用於取得右手坐標系的右方向向量
 */
function cross(
  [ax, ay, az]: [number, number, number],
  [bx, by, bz]: [number, number, number],
): [number, number, number] {
  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

/**
 * 根據上面與前面顏色取得左右顏色
 * @param up 上方顏色
 * @param front 前方顏色
 */
export default function getLeftRightColors(
  up: FaceletColor,
  front: FaceletColor,
): { left: FaceletColor; right: FaceletColor } | null {
  if (up === "none" || front === "none") {
    return null;
  }

  const rightVec = cross(faceVectors[up], faceVectors[front]);

  if (rightVec.every((v) => v === 0)) {
    return null;
  }

  const right = vectorToFace(rightVec);
  const left = vectorToFace(
    rightVec.map((v) => -v) as [number, number, number],
  );

  if (!right || !left) {
    return null;
  }

  return { left, right };
}

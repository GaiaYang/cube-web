import type { FaceletColor } from "@/types/cube/333";

type Face = Exclude<FaceletColor, "none">;

/**
 * 魔術方塊六面顏色對應的三維單位向量
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
 * 向量叉積計算，用於取得右手坐標系的右方向向量
 */
function cross(
  [ax, ay, az]: [number, number, number],
  [bx, by, bz]: [number, number, number],
): [number, number, number] {
  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

/**
 * 將三維向量對應回 Face 顏色
 */
function vectorToFace(vec: [number, number, number]): Face | null {
  for (const [face, v] of Object.entries(faceVectors)) {
    if (v[0] === vec[0] && v[1] === vec[1] && v[2] === vec[2]) {
      return face as Face;
    }
  }
  return null;
}

/**
 * 根據上面與前面顏色取得左右顏色
 * @param up 上方顏色
 * @param front 前方顏色
 */
export default function getLeftRightColors(
  up: Face,
  front: Face,
): { left: Face; right: Face } | null {
  const upVec = faceVectors[up];
  const frontVec = faceVectors[front];
  const rightVec = cross(upVec, frontVec);

  if (rightVec.every((v) => v === 0)) {
    return null;
  }

  const right = vectorToFace(rightVec);
  const left = vectorToFace(
    rightVec.map((v) => -v) as [number, number, number],
  );

  if (!left || !right) {
    return null;
  }

  return { left, right };
}

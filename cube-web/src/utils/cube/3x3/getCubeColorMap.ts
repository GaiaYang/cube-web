type Face = "white" | "yellow" | "green" | "blue" | "red" | "orange";
type Direction = "u" | "d" | "f" | "b" | "l" | "r";
type CubeColorMap = Record<Direction, Face>;

const opposites: Record<Face, Face> = {
  white: "yellow",
  yellow: "white",
  green: "blue",
  blue: "green",
  red: "orange",
  orange: "red",
};

// 定義魔術方塊上所有面對應的三維方向向量（x, y, z）
const faceVectors: Record<Face, [number, number, number]> = {
  white: [0, 1, 0], // +Y
  yellow: [0, -1, 0], // -Y
  green: [0, 0, 1], // +Z
  blue: [0, 0, -1], // -Z
  red: [1, 0, 0], // +X
  orange: [-1, 0, 0], // -X
};

// 向量叉積，用來算右手定則得出右方
function cross(
  a: [number, number, number],
  b: [number, number, number]
): [number, number, number] {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

// 根據向量找出對應顏色
function vectorToFace(vec: [number, number, number]): Face | undefined {
  for (const [face, v] of Object.entries(faceVectors)) {
    if (v[0] === vec[0] && v[1] === vec[1] && v[2] === vec[2]) {
      return face as Face;
    }
  }
  return undefined;
}

/** 指定U, F顏色取得所有方位的顏色 */
export default function getCubeColorMap(u: Face, f: Face): CubeColorMap {
  if (u === f || opposites[u] === f) {
    // 非法：上下或同色
    return {
      u: "white",
      f: "green",
      r: "red",
      l: "orange",
      d: "yellow",
      b: "blue",
    };
  }

  const upVec = faceVectors[u];
  const frontVec = faceVectors[f];
  const rightVec = cross(upVec, frontVec);
  const leftVec: [number, number, number] = [
    -rightVec[0],
    -rightVec[1],
    -rightVec[2],
  ];
  const downVec: [number, number, number] = [-upVec[0], -upVec[1], -upVec[2]];
  const backVec: [number, number, number] = [
    -frontVec[0],
    -frontVec[1],
    -frontVec[2],
  ];

  const r = vectorToFace(rightVec)!;
  const l = vectorToFace(leftVec)!;
  const d = vectorToFace(downVec)!;
  const b = vectorToFace(backVec)!;

  return { u, f, r, l, d, b };
}

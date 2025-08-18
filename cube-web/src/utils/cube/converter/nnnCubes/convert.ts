import type { BasicMove, MirrorMap, RotateMap, MoveToken } from "./types";

/** 基本鏡像映射 */
const BASIC_MIRROR_MAP: MirrorMap = {
  R: "L",
  L: "R",
  U: "U",
  D: "D",
  F: "F",
  B: "B",
  Rw: "Lw",
  Lw: "Rw",
  Uw: "Uw",
  Dw: "Dw",
  Fw: "Fw",
  Bw: "Bw",
  x: "x",
  y: "y",
  z: "z",
};

/** 鏡像代號字串 */
export function mirrorMoveString(params: MoveToken) {
  return {
    ...params,
    code: BASIC_MIRROR_MAP[params.code as BasicMove] || params.code,
    isPrime: !params.isPrime,
  };
}

/** 鏡像公式 */
export function mirrorAlgorithm(params: MoveToken[]) {
  return params.map(mirrorMoveString);
}

/** 反轉公式 */
export function reverseAlgorithm(params: MoveToken[]) {
  return params
    .slice()
    .reverse()
    .map((value) => ({
      ...value,
      isPrime: !value.isPrime,
    }));
}

/** 旋轉基本映射 */
const BASIC_ROTATE_MAP: RotateMap = {
  R: "L",
  L: "R",
  U: "U",
  D: "D",
  F: "B",
  B: "F",
  Rw: "Lw",
  Lw: "Rw",
  Uw: "Uw",
  Dw: "Dw",
  Fw: "Bw",
  Bw: "Fw",
  x: "x",
  y: "y",
  z: "z",
};

/** 旋轉代號字串 */
function rotateMoveString(params: MoveToken) {
  const mapped = BASIC_ROTATE_MAP[params.code as BasicMove];
  if (!mapped) return params;

  // x z 軸要反向
  if (params.code === "x" || params.code === "z") {
    return {
      ...params,
      code: mapped,
      isPrime: !params.isPrime,
    };
  }

  return {
    ...params,
    code: mapped,
  };
}

/** 旋轉公式 */
export function rotateAlgorithm(params: MoveToken[]) {
  return params.map(rotateMoveString);
}

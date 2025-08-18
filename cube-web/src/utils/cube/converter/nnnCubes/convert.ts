import type { BasicMove, MirrorMap, MoveToken } from "./types";

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
export function mirrorHorizontalMoveString(params: MoveToken) {
  return {
    ...params,
    code: BASIC_MIRROR_MAP[params.code as BasicMove] || params.code,
    isPrime: !params.isPrime,
  };
}

/** 鏡像公式 */
export function mirrorAlgorithm(params: MoveToken[]) {
  return params.map(mirrorHorizontalMoveString);
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

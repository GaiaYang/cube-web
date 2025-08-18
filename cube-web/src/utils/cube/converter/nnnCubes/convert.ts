import type { BasicMove, MirrorMap, MoveToken } from "./types";

/** 基本鏡像映射 */
const BASIC_MIRROR_MAP: MirrorMap = {
  horizontal: {
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
  },
  vertical: {
    R: "R",
    L: "L",
    U: "D",
    D: "U",
    F: "F",
    B: "B",
    Rw: "Rw",
    Lw: "Lw",
    Uw: "Dw",
    Dw: "Uw",
    Fw: "Fw",
    Bw: "Bw",
    x: "x",
    y: "y",
    z: "z",
  },
};

/** 水平轉換代號字串 */
export function mirrorHorizontalMoveString(
  params: MoveToken,
  direction: keyof MirrorMap,
) {
  return {
    ...params,
    code: BASIC_MIRROR_MAP[direction][params.code as BasicMove] || params.code,
    isPrime: !params.isPrime,
  };
}

/** 水平轉換公式 */
export function mirrorHorizontalAlgorithm(params: MoveToken[]) {
  return params.map((value) => mirrorHorizontalMoveString(value, "horizontal"));
}

/** 垂直轉換公式 */
export function mirrorVerticalAlgorithm(params: MoveToken[]) {
  return params.map((value) => mirrorHorizontalMoveString(value, "vertical"));
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

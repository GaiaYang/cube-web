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

/** 基本旋轉映射 */
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

/** 鏡像公式 */
export function mirrorAlgorithm(params: MoveToken[]) {
  return params.map((item) => ({
    ...item,
    code: BASIC_MIRROR_MAP[item.code as BasicMove] || item.code,
    isPrime: !item.isPrime, // 鏡像必定反轉
  }));
}

/** 反轉公式（逆序 + 反向旋轉） */
export function reverseAlgorithm(params: MoveToken[]) {
  return params
    .slice()
    .reverse()
    .map((item) => ({ ...item, isPrime: !item.isPrime }));
}

/** 旋轉公式 */
export function rotateAlgorithm(params: MoveToken[]) {
  return params.map((item) => {
    const mapped = BASIC_ROTATE_MAP[item.code as BasicMove];
    if (!mapped) return item;

    // x、z 軸旋轉需反轉 isPrime
    if (item.code === "x" || item.code === "z") {
      return { ...item, code: mapped, isPrime: !item.isPrime };
    }

    return { ...item, code: mapped };
  });
}

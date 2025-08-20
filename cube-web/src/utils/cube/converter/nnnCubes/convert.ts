import { basicMoves } from "./constants";
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

/** 鏡像步驟 */
export function mirrorMove(item: MoveToken): MoveToken | null {
  if (!basicMoves.includes(item.code as BasicMove)) {
    return null;
  }
  return {
    ...item,
    code: BASIC_MIRROR_MAP[item.code as BasicMove],
    isPrime: !item.isPrime, // 鏡像必定反轉
  };
}

/**
 * 反轉步驟
 *
 * 最後處理記得要 `reverse()`
 * */
export function reverseMove(item: MoveToken): MoveToken | null {
  if (!basicMoves.includes(item.code as BasicMove)) {
    return null;
  }
  return { ...item, isPrime: !item.isPrime };
}

/** 旋轉步驟 */
export function rotateMove(item: MoveToken): MoveToken | null {
  if (!basicMoves.includes(item.code as BasicMove)) {
    return null;
  }
  // x、z 軸旋轉需反轉 isPrime
  return {
    ...item,
    code: BASIC_ROTATE_MAP[item.code as BasicMove],
    isPrime:
      item.code === "x" || item.code === "z" ? !item.isPrime : item.isPrime,
  };
}

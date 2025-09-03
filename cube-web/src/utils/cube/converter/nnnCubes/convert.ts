import { basicMoves, basicMovesMap } from "./constants";
import type { MirrorMap, RotateMap, MoveToken } from "./types";

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

/** 通用映射處理 */
function mapMove(
  item: MoveToken,
  map: Record<string, string>,
  reversePrimeFor: string[] = [],
): MoveToken | null {
  const mapped = map[item.code];
  if (!mapped) return null;
  const isPrime = item.isPrime ?? false;
  return {
    code: mapped,
    sliceCount: item.sliceCount ?? 1,
    turnCount: item.turnCount ?? 1,
    isPrime: reversePrimeFor.includes(item.code) ? !isPrime : isPrime,
  };
}

/** 鏡像步驟 */
export function mirrorMove(item: MoveToken): MoveToken | null {
  // 鏡像全部都反轉 isPrime
  // 垂直軸左右鏡像不受影響
  return mapMove(
    item,
    BASIC_MIRROR_MAP,
    basicMoves.filter((item) => !(item === "x")),
  );
}

/**
 * 反轉步驟
 *
 * 最後處理記得要 `reverse()`
 * */
export function reverseMove(item: MoveToken): MoveToken | null {
  // 全反轉 isPrime
  return mapMove(item, basicMovesMap, basicMoves);
}

/** 旋轉步驟 */
export function rotateMove(item: MoveToken): MoveToken | null {
  // x、z 軸旋轉需反轉 isPrime
  return mapMove(item, BASIC_ROTATE_MAP, ["x", "z"]);
}

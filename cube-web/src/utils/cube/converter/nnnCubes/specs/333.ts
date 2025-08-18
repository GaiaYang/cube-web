import type { WideMove, MirrorMap, RotateMap, MoveToken } from "../types";
import { faceMoves, wideMoves, rotations } from "../constants";
import { createCubeProfile } from "../core";

/** 非官方「多層轉動」別名 */
export type WideMoveAliases = "r" | "l" | "u" | "d" | "f" | "b";
/** 非官方「多層轉動」別名集合 */
export const wideMoveAliases: WideMoveAliases[] = [
  "r",
  "l",
  "u",
  "d",
  "f",
  "b",
];

/** 非官方「中層轉動」代號 */
export type MiddleBlockAliasMove = "E" | "M" | "S";
/** 非官方中層轉動集合 */
export const middleLayerMoves: MiddleBlockAliasMove[] = ["E", "M", "S"];

/** 所有多層轉動代號（包含標準 Wide 與別名） */
export type AllWideMove = WideMoveAliases | WideMove;
export const allWideMoves: AllWideMove[] = [...wideMoves, ...wideMoveAliases];

/** 三階魔術方塊所有合法轉動代號 */
export const allMoves = [
  ...wideMoveAliases,
  ...wideMoves,
  ...faceMoves,
  ...rotations,
  ...middleLayerMoves,
];

/** 鏡像映射表 */
const MIRROR_MAP: MirrorMap<MiddleBlockAliasMove | WideMoveAliases> = {
  r: "l",
  l: "r",
  u: "u",
  d: "d",
  f: "f",
  b: "b",
  E: "E",
  M: "M",
  S: "S",
};

/** 旋轉映射表 */
const ROTATE_MAP: RotateMap<MiddleBlockAliasMove | WideMoveAliases> = {
  r: "l",
  l: "r",
  u: "u",
  d: "d",
  f: "b",
  b: "f",
  E: "E",
  M: "M",
  S: "S",
};

/** 雙層大小寫映射 */
const UPPER_MAP: Record<WideMoveAliases, WideMove> = {
  r: "Rw",
  l: "Lw",
  u: "Uw",
  d: "Dw",
  b: "Bw",
  f: "Fw",
};
const LOWER_MAP: Record<WideMove, WideMoveAliases> = {
  Rw: "r",
  Lw: "l",
  Uw: "u",
  Dw: "d",
  Bw: "b",
  Fw: "f",
};

/** 共用映射函式，支援 optional 反向 isPrime */
function mapAlgorithm(
  params: MoveToken[],
  map: Record<string, string>,
  reversePrimeFor: string[] = [],
): MoveToken[] {
  return params.map((item) => {
    const mapped = map[item.code];
    if (!mapped) return item;
    if (reversePrimeFor.includes(item.code)) {
      return { ...item, code: mapped, isPrime: !item.isPrime };
    }
    return { ...item, code: mapped };
  });
}

export const {
  parseMove,
  formatMove,
  isValidMoveString,
  isValidMoveToken,
  isValidWideMove,
  parseAlgorithm,
  stringifyAlgorithm,
  formatMoveToken,
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
} = createCubeProfile({
  layers: 3,
  extraMoves: [...wideMoveAliases, ...middleLayerMoves],
  parseMove({ sliceCount, code, turnCount, isPrime }) {
    // 三階不支援前數字
    if (sliceCount !== null) return null;
    return { code, sliceCount, turnCount, isPrime };
  },
  mirrorAlgorithm(params) {
    // 所有 code 替換，不需反轉 isPrime
    return mapAlgorithm(params, MIRROR_MAP);
  },
  reverseAlgorithm: (params) => params, // 三階不需要反轉
  rotateAlgorithm(params) {
    // M/S 需要反轉 isPrime
    return mapAlgorithm(params, ROTATE_MAP, ["M", "S"]);
  },
});

/** 雙層轉換成大寫公式 */
export function upperAlgorithm(params: MoveToken[]) {
  return mapAlgorithm(params, UPPER_MAP);
}
/** 雙層轉換成小寫公式 */
export function lowerAlgorithm(params: MoveToken[]) {
  return mapAlgorithm(params, LOWER_MAP);
}

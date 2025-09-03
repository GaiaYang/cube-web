import type { WideMove, MirrorMap, RotateMap, MoveToken } from "../types";
import {
  createCubeProfile,
  createRegex,
  parseMoveByRegex,
  ensureValidTurnCount,
} from "../core";
import { basicMoves } from "../constants";
import earlyMap from "@/utils/earlyMap";

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
/** 所有三階擴充轉動代號 */
export const extendsMoves = [...wideMoveAliases, ...middleLayerMoves];
/** 三階擴充轉動代號 */
export type ExtendsMoves = MiddleBlockAliasMove | WideMoveAliases;
/** 三階擴充轉動代號對照表 */
export const extendsMovesMap = Object.fromEntries(
  extendsMoves.map((k) => [k, k]),
);
/** 三階所有轉動代號 */
export const allMoves = [...basicMoves, ...extendsMoves];

/** 鏡像映射表 */
const MIRROR_MAP: MirrorMap<ExtendsMoves> = {
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
const ROTATE_MAP: RotateMap<ExtendsMoves> = {
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

/** 雙層小轉大寫映射 */
const UPPER_MAP: Record<WideMoveAliases, WideMove> = {
  r: "Rw",
  l: "Lw",
  u: "Uw",
  d: "Dw",
  b: "Bw",
  f: "Fw",
};

/** 雙層大轉小寫映射 */
const LOWER_MAP: Record<WideMove, WideMoveAliases> = {
  Rw: "r",
  Lw: "l",
  Uw: "u",
  Dw: "d",
  Bw: "b",
  Fw: "f",
};

/**
 * 映射轉動代號
 *
 * @param move 移動代號
 * @param map 映射表
 * @param reversePrimeFor 要反向 isPrime 的代號
 * */
function mapMove(
  move: MoveToken,
  map: Record<string, string>,
  reversePrimeFor: string[] = [],
): MoveToken | null {
  const mapped = map[move.code];
  if (!mapped) return null;
  return {
    ...move,
    code: mapped,
    isPrime: reversePrimeFor.includes(move.code) ? !move.isPrime : move.isPrime,
  };
}

/** 映射擴充轉動代號 */
function extendsMapMove(move: MoveToken, map: Record<string, string>) {
  const mapped = map[move.code];
  if (!mapped) return move;
  return { ...move, code: mapped };
}

/** 擴充映射輸出列表 */
function extendsMapAlgorithmList(
  list: MoveToken[],
  fn: (p: MoveToken) => MoveToken | null,
): MoveToken[] {
  return earlyMap(list, fn, (item) =>
    Boolean(item && allMoves.includes(item.code as ExtendsMoves)),
  );
}

/** 三階擴充轉動正則 */
const REGEX = createRegex(extendsMoves);

export const cubeProfile = createCubeProfile({
  cubeLayers: 3,
  parseMove(input) {
    if (!input) return null;
    const match = parseMoveByRegex(REGEX, input);
    if (!match) return null;
    const { sliceCount = 1, code, turnCount = 1, isPrime = false } = match;
    if (!extendsMoves.includes(code as ExtendsMoves)) {
      return null;
    }
    // 三階不支援前數字
    if (sliceCount > 1) return null;
    const _turnCount = ensureValidTurnCount(turnCount);
    if (_turnCount === null) return null;
    return { code, sliceCount, turnCount: _turnCount, isPrime };
  },
  mirrorMove(params) {
    // 鏡像全部都反轉 isPrime
    // 垂直軸左右鏡像不受影響
    return mapMove(
      params,
      MIRROR_MAP,
      extendsMoves.filter((item) => !(item === "M")),
    );
  },
  reverseMove: (params) => {
    return mapMove(params, extendsMovesMap, extendsMoves);
  },
  rotateMove(params) {
    // M/S 需要反轉 isPrime
    return mapMove(params, ROTATE_MAP, ["M", "S"]);
  },
});

export const {
  parseMove,
  parseAlgorithm,
  formatMove,
  formatMoveToken,
  formatAlgorithm,
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
} = cubeProfile;

/** 雙層轉換成大寫 */
function upperMove(params: MoveToken): MoveToken {
  return extendsMapMove(params, UPPER_MAP);
}
/** 雙層轉換成大寫公式 */
export function upperAlgorithm(params: MoveToken[]): MoveToken[] {
  return extendsMapAlgorithmList(params, upperMove);
}
/** 雙層轉換成小寫 */
function lowerMove(params: MoveToken): MoveToken {
  return extendsMapMove(params, LOWER_MAP);
}
/** 雙層轉換成小寫公式 */
export function lowerAlgorithm(params: MoveToken[]): MoveToken[] {
  return extendsMapAlgorithmList(params, lowerMove);
}

const output = { ...cubeProfile, upperAlgorithm, lowerAlgorithm };
export default output;

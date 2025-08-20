import type { WideMove, MirrorMap, RotateMap, MoveToken } from "../types";
import {
  createCubeProfile,
  createRegex,
  parseMoveByRegex,
  ensureValidTurnCount,
} from "../core";
import { wideMoves } from "../constants";

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
  params: MoveToken,
  map: Record<string, string>,
  reversePrimeFor: string[] = [],
): MoveToken | null {
  const mapped = map[params.code];
  if (!mapped) return null;
  return {
    ...params,
    code: mapped,
    isPrime: reversePrimeFor.includes(params.code)
      ? !params.isPrime
      : params.isPrime,
  };
}

const REGEX = createRegex(extendsMoves);

const cubeProfile = createCubeProfile({
  cubeLayers: 3,
  parseMove(input) {
    if (!input) return null;
    const match = parseMoveByRegex(REGEX, input);
    if (!match) return null;
    const { sliceCount, code, turnCount, isPrime } = match;
    // 三階不支援前數字
    if (sliceCount !== null) return null;
    if (!extendsMoves.includes(code as ExtendsMoves)) {
      return null;
    }
    const _turnCount = ensureValidTurnCount(turnCount);
    if (_turnCount === null) return null;
    return { code, sliceCount, turnCount: _turnCount, isPrime };
  },
  mirrorMove(params) {
    if (!extendsMoves.includes(params.code as ExtendsMoves)) {
      return null;
    }
    const code = MIRROR_MAP[params.code as WideMoveAliases];
    const isPrime = !params.isPrime;
    return {
      ...params,
      code,
      isPrime,
    };
  },
  reverseMove: (params) => {
    if (!extendsMoves.includes(params.code as ExtendsMoves)) {
      return null;
    }
    return { ...params, isPrime: !params.isPrime };
  },
  rotateMove(params) {
    if (!extendsMoves.includes(params.code as ExtendsMoves)) {
      return null;
    }
    const code = ROTATE_MAP[params.code as WideMoveAliases];
    if (!code) return null;
    // M/S 需要反轉 isPrime
    const isPrime =
      code === "M" || code === "S" ? !params.isPrime : params.isPrime;
    return {
      ...params,
      isPrime,
    };
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
export function upperMove(params: MoveToken): MoveToken | null {
  if (!wideMoveAliases.includes(params.code as WideMoveAliases)) {
    return params;
  }
  const code = UPPER_MAP[params.code as WideMoveAliases];
  return {
    ...params,
    code,
  };
}
/** 雙層轉換成大寫公式 */
export function upperAlgorithm(params: MoveToken[]): MoveToken[] {
  const output = params.map(upperMove);
  return output.every(Boolean) ? (output as MoveToken[]) : [];
}
/** 雙層轉換成小寫 */
export function lowerMove(params: MoveToken): MoveToken | null {
  if (!wideMoves.includes(params.code as WideMove)) {
    return params;
  }
  const code = LOWER_MAP[params.code as WideMove];
  return { ...params, code };
}
/** 雙層轉換成小寫公式 */
export function lowerAlgorithm(params: MoveToken[]): MoveToken[] {
  const output = params.map(lowerMove);
  return output.every(Boolean) ? (output as MoveToken[]) : [];
}

const output = { ...cubeProfile, upperAlgorithm, lowerAlgorithm };
export default output;

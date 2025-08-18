import type { WideMove, MirrorMap, RotateMap } from "../types";

import { faceMoves, wideMoves, rotations } from "../constants";
import { createCubeProfile } from "../core";

/**
 * 非官方「多層轉動」的別名（常用於速記法）
 * 例如：`r` 代表 `Rw`，`u` 代表 `Uw`
 */
export type WideMoveAliases = "r" | "l" | "u" | "d" | "f" | "b";
/** 非官方「多層轉動」的別名集合 */
export const wideMoveAliasess: WideMoveAliases[] = [
  "r",
  "l",
  "u",
  "d",
  "f",
  "b",
];

/**
 * 非官方「中層轉動」的代號（非 WCA 標準）
 * E = Equator（橫向中層）
 * M = Middle（前後中層）
 * S = Standing（上下中層）
 */
export type MiddleBlockAliasMove = "E" | "M" | "S";
/** 非官方「中層轉動」代號集合 */
export const middleLayerMoves: MiddleBlockAliasMove[] = ["E", "M", "S"];

/**
 * 所有「多層轉動」代號（包含標準 Wide 及其別名）
 * 例如：`Rw`、`r`、`Uw`、`u`
 */
export type AllWideMove = WideMoveAliases | WideMove;
/** 所有「多層轉動」代號集合 */
export const allWideMoves: AllWideMove[] = [...wideMoves, ...wideMoveAliasess];

/**
 * 三階魔術方塊的所有合法轉動代號（完整集合）
 * 包含：
 * - 多層轉動（標準 Wide 與別名）
 * - 單層轉動（Face Moves）
 * - 整體旋轉（Rotations）
 * - 中層轉動（非官方 Alias）
 */
export const allMoves = [
  ...wideMoveAliasess,
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

export const {
  parseMove,
  formatMove,
  isValidMoveString,
  isValidMoveToken,
  isValidWideMove,
  parseAlgorithm,
  stringifyAlgorithm,
  formatMoveToken,
  // 轉換實作
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
} = createCubeProfile({
  layers: 3,
  extraMoves: [...wideMoveAliasess, ...middleLayerMoves],
  parseMove({ sliceCount, code, turnCount, isPrime }) {
    // 三階不支援前數字
    if (sliceCount !== null) return null;
    return {
      code,
      sliceCount,
      turnCount,
      isPrime,
    };
  },
  mirrorAlgorithm(params) {
    return params.map((item) => {
      const mappedCode = MIRROR_MAP[item.code as keyof typeof MIRROR_MAP];

      if (!mappedCode) return item;

      return {
        ...item,
        code: mappedCode,
      };
    });
  },
  reverseAlgorithm: (params) => params,
  rotateAlgorithm(params) {
    return params.map((item) => {
      const mappedCode = ROTATE_MAP[item.code as keyof typeof ROTATE_MAP];

      if (!mappedCode) return item;

      // M S 要反向
      if (item.code === "M" || item.code === "S") {
        return {
          ...item,
          code: mappedCode,
          isPrime: !item.isPrime,
        };
      }

      return {
        ...item,
        code: mappedCode,
      };
    });
  },
});

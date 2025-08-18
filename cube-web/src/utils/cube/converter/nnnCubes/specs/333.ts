import type { WideMove } from "../types";

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

export const {
  parseMove,
  formatMove,
  isValidMoveString,
  isValidMoveToken,
  isValidWideMove,
  parseAlgorithm,
  stringifyAlgorithm,
  formatMoveToken,
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
});

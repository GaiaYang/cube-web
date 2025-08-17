import { faceMoves, wideMoves, PRIME_MARK, rotations } from "../constants";
import { createCubeNotationParser } from "../core";
import { WideMove } from "../types";

/**
 * 非官方「多層轉動」的別名（常用於速記法）
 * 例如：`r` 代表 `Rw`，`u` 代表 `Uw`
 */
export type WideAliasMove = "r" | "l" | "u" | "d" | "f" | "b";
/** 非官方「多層轉動」的別名集合 */
export const wideAliasMoves: WideAliasMove[] = ["r", "l", "u", "d", "f", "b"];

/**
 * 非官方「中層轉動」的代號（非 WCA 標準）
 * E = Equator（橫向中層）
 * M = Middle（前後中層）
 * S = Standing（上下中層）
 */
export type MiddleBlockAliasMove = "E" | "M" | "S";
/** 非官方「中層轉動」代號集合 */
export const middleBlockAliasMoves: MiddleBlockAliasMove[] = ["E", "M", "S"];

/**
 * 所有「多層轉動」代號（包含標準 Wide 及其別名）
 * 例如：`Rw`、`r`、`Uw`、`u`
 */
export type AllWideMove = WideAliasMove | WideMove;
/** 所有「多層轉動」代號集合 */
export const allWideMoves: AllWideMove[] = [...wideMoves, ...wideAliasMoves];

/**
 * 三階魔術方塊的所有合法轉動代號（完整集合）
 * 包含：
 * - 多層轉動（標準 Wide 與別名）
 * - 單層轉動（Face Moves）
 * - 整體旋轉（Rotations）
 * - 中層轉動（非官方 Alias）
 */
export const allMoves = [
  ...wideAliasMoves,
  ...wideMoves,
  ...faceMoves,
  ...rotations,
  ...middleBlockAliasMoves,
];

export const { isValidMove, parseMove, parseAlgorithm, stringifyAlgorithm } =
  createCubeNotationParser({
    extraMoves: [...wideAliasMoves, ...middleBlockAliasMoves],
    parseMove([layerStr, base, turnStr, primeMark]) {
      let layers = null;
      let turns = 1;

      // 三階不支援前數字
      if (layerStr !== "") {
        return null;
      }

      if (turnStr) {
        turns = parseInt(turnStr, 10);
        if (Number.isNaN(turns) || turns < 2) {
          return null;
        }
      }

      layers = wideMoves.includes(base as WideMove) ? 2 : 1;

      const prime = primeMark === PRIME_MARK;

      return {
        base,
        layers,
        turns,
        prime,
      };
    },
  });

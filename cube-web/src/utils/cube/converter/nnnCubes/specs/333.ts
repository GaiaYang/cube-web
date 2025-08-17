import { faceMoves, wideMoves, PRIME_MARK, rotations } from "../constants";
import { createCubeNotationParser } from "../core";
import { WideMove } from "../types";

export type WideAliasMove = "r" | "l" | "u" | "d" | "f" | "b";
export const wideAliasMoves: WideAliasMove[] = ["r", "l", "u", "d", "f", "b"];

export type MiddleBlockAliasMove = "E" | "M" | "S";
export const middleBlockAliasMoves: MiddleBlockAliasMove[] = ["E", "M", "S"];

export type AllWideMove = WideAliasMove | WideMove;
export const allWideMoves: AllWideMove[] = [...wideMoves, ...wideAliasMoves];

export const allMoves = [
  ...wideAliasMoves,
  ...wideMoves,
  ...faceMoves,
  ...rotations,
  ...middleBlockAliasMoves,
];

/** 官方正階符號解析正則 */
const REGEX = /^(\d*)([rRlLuUdDfFbEMSxyz])(\d*)(')?$/;

export const { isValidMove, parseMove, parseAlgorithm, stringifyAlgorithm } =
  createCubeNotationParser({
    parseMove(moveStr: string) {
      if (!moveStr) return null;

      const match = moveStr.match(REGEX);
      if (!match) return null;

      const [, layerStr, base, turnStr, primeMark] = match;

      // 三階不支援前數字
      if (layerStr) return null;

      // 解析 turns，預設為 1，若無效或 < 2 則返回 null
      const turns = turnStr ? parseInt(turnStr, 10) : 1;
      if (Number.isNaN(turns) || turns < 2) return null;

      // 設定 layers 根據 base
      const layers = allWideMoves.includes(base as AllWideMove) ? 2 : 1;

      return {
        base,
        layers,
        turns,
        prime: primeMark === PRIME_MARK,
      };
    },
  });

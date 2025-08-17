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
const REGEX = new RegExp(`^(\\d*)(${allMoves.join("|")})(\\d*)(')?$`);

export const { isValidMove, parseMove, parseAlgorithm, stringifyAlgorithm } =
  createCubeNotationParser({
    parseMove(moveStr) {
      if (!moveStr) return null;

      const match = moveStr.match(REGEX);
      if (!match) return null;

      const [, layerStr, base, turnStr, primeMark] = match;
      let layers = 1;
      let turns = 1;

      // 三階不支援前數字
      if (layerStr) {
        return null;
      }

      if (turnStr) {
        turns = parseInt(turnStr, 10);
        if (Number.isNaN(turns) || turns < 2) {
          return null;
        }
      }

      layers = allWideMoves.includes(base as AllWideMove) ? 2 : 1;

      const prime = primeMark === PRIME_MARK;

      return {
        base,
        layers,
        turns,
        prime,
      };
    },
  });

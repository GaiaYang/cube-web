import type { CubeNotationSpec, MoveToken } from "../types";
import { faceMoves, rotations } from "../constants";

/** 2x2 轉換介面 */
export const twoByTwoNotationSpec: CubeNotationSpec = {
  bases: new Set([...faceMoves, ...rotations]),
  allowPrefix: false, // 不支援 wide moves

  isValidMove(token: string): boolean {
    const match = token.match(regex);
    if (!match) return false;
    const [, base] = match;
    return this.bases.has(base);
  },

  parseMove(token: string): MoveToken | null {
    if (!this.isValidMove(token)) return null;

    const match = token.match(regex);
    if (!match) return null;

    const [, base, suffix] = match;
    return {
      raw: token,
      base,
      suffix: (suffix || "") as "" | "'" | "2",
    };
  },
};

const regex = /^([RLUDFBxyz])(2|')?$/;

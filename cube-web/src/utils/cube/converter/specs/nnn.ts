import type { CubeNotationSpec, MoveSuffix, MoveToken } from "../types";
import {
  wideMoves,
  faceMoves,
  rotations,
  type WideMove,
  type FaceMove,
  type Rotation,
} from "../constants";

type Base = WideMove | FaceMove | Rotation;

/**
 * 建立 NxN 轉換介面
 * @param N NxN 的數量
 * */
export function createNxNNotationSpec(N: number): CubeNotationSpec {
  const bases = new Set([...faceMoves, ...rotations, ...wideMoves]);

  return {
    bases,
    allowPrefix: true,

    isValidMove(token: string): boolean {
      const match = token.match(regex);
      if (!match) return false;

      const [, prefixStr, base] = match;
      const prefix = prefixStr ? parseInt(prefixStr) : undefined;

      if (prefix && (prefix < 2 || prefix >= N)) return false; // NxN 限制
      return bases.has(base as Base);
    },

    parseMove(token: string): MoveToken | null {
      if (!this.isValidMove(token)) return null;

      const match = token.match(regex);
      if (!match) return null;

      const [, prefixStr, base, suffix] = match;

      return {
        raw: token,
        base,
        suffix: (suffix || "") as MoveSuffix,
        prefix: prefixStr ? parseInt(prefixStr) : undefined,
      };
    },
  };
}

const regex = /^(\d?)([RLUDFBxyz]|Rw|Lw|Uw|Dw|Fw|Bw)(2|')?$/;

import type { CubeNotationSpec, MoveSuffix, MoveToken } from "../types";
import { sliceMoves, wideMoves, faceMoves, rotations } from "../constants";

/** 3x3 轉換介面 */
export const threeByThreeNotationSpec: CubeNotationSpec = {
  // 基礎符號集合（不包含後綴）
  bases: new Set([...faceMoves, ...wideMoves, ...sliceMoves, ...rotations]),

  allowPrefix: true,

  /** 判斷單一步驟是否合法 */
  isValidMove(token: string): boolean {
    const match = token.match(regex);
    if (!match) return false;

    const [, prefix, base] = match;
    if (prefix && !this.allowPrefix) return false;
    return this.bases.has(base);
  },

  /** 將單個字串解析成 MoveToken */
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

const regex = /^(\d?)([RLUDFBxyzMES]|Rw|Lw|Uw|Dw|Fw|Bw)(2|')?$/;

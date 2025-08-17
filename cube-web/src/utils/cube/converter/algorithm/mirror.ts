import type { CubeNotationSpec, MoveToken } from "../types";
import { parseFormula, stringifyFormula } from "../core";

/**
 * 單步驟水平鏡像 (左右互換)
 * @param token 單步驟 MoveToken
 * @returns 鏡像後的 MoveToken
 */
function mirrorHorizontalToken(token: MoveToken): MoveToken {
  const horizontalMap: Record<string, string> = {
    R: "L",
    L: "R",
    Rw: "Lw",
    Lw: "Rw",
  };

  const mirroredBase = horizontalMap[token.base] || token.base;

  return {
    ...token,
    base: mirroredBase,
    raw: (token.prefix ?? "") + mirroredBase + token.suffix,
  };
}

/**
 * 將整條公式做水平鏡像 (左右互換)
 * @param formula 公式字串
 * @param spec CubeNotationSpec
 * @returns 鏡像後公式字串，非法公式回傳 null
 */
export function mirrorHorizontalAlgorithm(
  formula: string,
  spec: CubeNotationSpec,
): string | null {
  const tokens = parseFormula(formula, spec);
  if (!tokens) return null;

  const mirroredTokens = tokens.map(mirrorHorizontalToken);
  return stringifyFormula(mirroredTokens);
}

/**
 * 預留 vertical 鏡像函式，未來可以依照需求實作
 */
export function mirrorVerticalAlgorithm(
  formula: string,
  spec: CubeNotationSpec,
): string | null {
  // TODO: implement vertical mirror
  return formula; // 暫時回傳原公式
}

import type { CubeNotationSpec, MoveToken } from "../types";
import { parseFormula, stringifyFormula } from "../core";

/**
 * 單步驟 Y2 前後旋轉對應
 * @param token MoveToken
 * @returns 旋轉後 MoveToken
 */
function yRotateToken(token: MoveToken): MoveToken {
  const yMap: Record<string, string> = {
    R: "L",
    L: "R",
    Rw: "Lw",
    Lw: "Rw",
    F: "B",
    B: "F",
    Fw: "Bw",
    Bw: "Fw",
  };

  const rotatedBase = yMap[token.base] || token.base;

  return {
    ...token,
    base: rotatedBase,
    raw: (token.prefix ?? "") + rotatedBase + token.suffix,
  };
}

/**
 * 將公式做前後旋轉 (模擬 y2)
 * @param formula 公式字串
 * @param spec CubeNotationSpec
 * @returns 旋轉後公式字串，非法公式回傳 null
 */
export function yRotateAlgorithm(
  formula: string,
  spec: CubeNotationSpec,
): string | null {
  const tokens = parseFormula(formula, spec);
  if (!tokens) return null;

  const rotatedTokens = tokens.map(yRotateToken);
  return stringifyFormula(rotatedTokens);
}

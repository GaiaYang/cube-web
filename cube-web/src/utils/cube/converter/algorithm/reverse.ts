import type { CubeNotationSpec, MoveToken } from "../types";
import { parseFormula, stringifyFormula } from "../core";

/**
 * 將單步驟方向取反
 * @param token MoveToken
 * @returns 方向取反後的 MoveToken
 */
function invertToken(token: MoveToken): MoveToken {
  let newSuffix: string = token.suffix;
  if (token.suffix === "'") newSuffix = "";
  else if (token.suffix === "") newSuffix = "'";
  // "2" 保持不變

  return {
    ...token,
    suffix: newSuffix as typeof token.suffix,
    raw: (token.prefix ?? "") + token.base + newSuffix,
  };
}

/**
 * 將整條公式反轉 (步驟順序倒置，並反轉方向)
 * @param formula 公式字串
 * @param spec CubeNotationSpec
 * @returns 反轉後公式字串，非法公式回傳 null
 */
export function reverseAlgorithm(
  formula: string,
  spec: CubeNotationSpec,
): string | null {
  const tokens = parseFormula(formula, spec);
  if (!tokens) return null;

  const reversedTokens = tokens.slice().reverse().map(invertToken);
  return stringifyFormula(reversedTokens);
}

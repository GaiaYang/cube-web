import type { CubeNotationSpec, AlgorithmTokens } from "./types";

/** 公式分隔符（固定空白） */
export const SEPARATE = " ";

/**
 * 將公式字串拆解成單步驟字串陣列
 * @param formula 公式字串，例如 "R U R' U'"
 * @returns 拆解後的單步驟字串陣列
 */
export function tokenizeFormula(formula: string): string[] {
  return formula.trim().split(SEPARATE).filter(Boolean);
}

/**
 * 解析公式字串成 Token 物件陣列
 * @param formula 要解析的公式字串
 * @param spec 方塊符號規則物件，必須實作 CubeNotationSpec
 * @returns 解析後的 MoveToken 陣列，若公式包含非法符號則回傳 null
 */
export function parseFormula(
  formula: string,
  spec: CubeNotationSpec,
): AlgorithmTokens | null {
  const tokens: AlgorithmTokens = [];

  for (const token of tokenizeFormula(formula)) {
    const parsed = spec.parseMove(token);
    if (!parsed) return null;
    tokens.push(parsed);
  }

  return tokens;
}

/**
 * 將 Token 陣列重新組合成公式字串
 * @param tokens MoveToken 陣列
 * @returns 以空白分隔的公式字串
 */
export function stringifyFormula(tokens: AlgorithmTokens): string {
  return tokens.map((t) => t.raw).join(SEPARATE);
}

/**
 * 判斷單一步驟是否合法
 * @param token 單步驟字串，例如 "R'", "U2"
 * @param spec 方塊符號規則物件
 * @returns true 表示合法，false 表示非法
 */
export function isValidMove(token: string, spec: CubeNotationSpec): boolean {
  return spec.isValidMove(token);
}

/**
 * 判斷整個公式是否合法
 * @param formula 公式字串
 * @param spec 方塊符號規則物件
 * @returns true 表示公式中所有步驟合法，false 表示至少一個步驟非法
 */
export function isValidFormula(
  formula: string,
  spec: CubeNotationSpec,
): boolean {
  return parseFormula(formula, spec) !== null;
}

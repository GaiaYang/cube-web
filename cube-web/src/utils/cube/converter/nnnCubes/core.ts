import { isNotNil } from "es-toolkit";
import type { CubeNotationParser, MoveToken } from "./types";

/** 分隔符號 */
const SEPARATE = " ";

/** 創建方塊解析 */
export function createCubeNotationParser(parser: CubeNotationParser) {
  return {
    isValidMove: (moveStr?: string | null) => isValidMove(parser, moveStr),
    parseMove: parser.parseMove,
    parseAlgorithm: (alg?: string) => parseAlgorithm(parser, alg),
    stringifyAlgorithm,
  };
}

/** 將公式字串解析成 MoveToken[] */
export function parseAlgorithm(
  parser: CubeNotationParser,
  alg?: string,
): MoveToken[] {
  return [];
}

/** 將 MoveToken[] 組合回字串公式 */
export function stringifyAlgorithm(tokens: MoveToken[]): string {
  return "";
}

/** 檢查單一符號是否合法 */
export function isValidMove(
  parser: CubeNotationParser,
  moveStr?: string | null,
): boolean {
  return parser.parseMove(moveStr) !== null;
}

/**
 * 檢查魔術方塊外層移動的有效性
 * @param N 魔術方塊的總層數
 * @param n 要移動的層數
 * @returns 如果移動有效返回 true，否則返回 false
 */
export function isValidOuterMove(N: number, n?: number | null): boolean {
  // 檢查 N 是否為正整數
  if (!Number.isInteger(N) || N <= 1) {
    return false;
  }

  // 如果 n 未提供，預設為 2
  const moveSlices = n ?? 2;

  // 檢查 n 是否在有效範圍 1 < n < N
  if (!Number.isInteger(moveSlices) || moveSlices <= 1 || moveSlices >= N) {
    return false;
  }

  return true;
}

import type { CubeNotationParser, MoveToken } from "./types";
import { faceMoves, rotations, wideMoves } from "./constants";

/** 分隔符號 */
const SEPARATE = " ";

const BASIC_MOVES = [...faceMoves, ...wideMoves, ...rotations];

/** 創建方塊解析 */
export function createCubeNotationParser(parser: CubeNotationParser) {
  /** 所有移動代號 */
  const moves = Array.isArray(parser.extraMoves)
    ? [...BASIC_MOVES, ...parser.extraMoves]
    : BASIC_MOVES;
  /** 動態生成正規表達式 */
  const REGEX = new RegExp(`^(\\d*)(${moves.join("|")})(\\d*)(')?$`);

  function parseMove(moveStr?: string | null) {
    if (!moveStr) return null;

    const match = moveStr.match(REGEX);
    if (!match) return null;
    const [, layerStr, base, turnStr, primeMark] = match;

    return parser.parseMove([layerStr, base, turnStr, primeMark]);
  }

  return {
    /** 解析代號字串為 MoveToken */
    parseMove,
    /** 代號字串是否合法 */
    isValidMove(moveStr?: string | null) {
      return parseMove(moveStr) !== null;
    },
    /** 將公式字串解析成 MoveToken[] */
    parseAlgorithm() {},
    /** 將 MoveToken[] 組合回字串公式 */
    stringifyAlgorithm() {},
  };
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

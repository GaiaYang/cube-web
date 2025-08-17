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

  function isValidMove(moveStr?: string | null) {
    return parseMove(moveStr) !== null;
  }

  function isValidMoveToken(token: unknown): token is MoveToken {
    if (!token || typeof token !== "object") return false;

    const { base, layers, turns, prime } = token as MoveToken;

    // base 必須是已知代號
    if (typeof base !== "string" || !moves.includes(base)) return false;

    // layers 預設為 1，必須 >= 1 的正整數
    if (typeof layers !== "number" || !Number.isInteger(layers) || layers < 1) {
      return false;
    }

    // turns 預設為 1，必須是 1 ~ 3 的整數 (90°, 180°, 270°)
    if (
      typeof turns !== "number" ||
      !Number.isInteger(turns) ||
      turns < 1 ||
      turns > 3
    ) {
      return false;
    }

    // prime 必須是 boolean
    if (typeof prime !== "boolean") return false;

    return true;
  }

  return {
    /** 解析代號字串為 MoveToken */
    parseMove,
    /** 代號字串是否合法 */
    isValidMove,
    /** 將公式字串解析成 MoveToken[] */
    parseAlgorithm(input?: string | null) {
      if (!input || typeof input !== "string") return [];

      const output = input.trim().split(SEPARATE).map(parseMove);

      return output.every(Boolean) ? output : [];
    },
    /** 將 MoveToken[] 組合回字串公式 */
    stringifyAlgorithm(input?: MoveToken[] | string[] | null) {
      if (!Array.isArray(input)) return "";

      return (
        input.every((item) => {
          if (typeof item === "string") return isValidMove(item);
          return isValidMoveToken(item);
        })
          ? input
          : []
      ).join(SEPARATE);
    },
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

import { isPlainObject } from "es-toolkit";

import { basicMoves, SEPARATE, MOVE_CYCLE_COUNT } from "./constants";
import type { MoveToken, CubeNotationParser } from "./types";

/** escape regex special chars */
function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 驗證並正規化 MoveToken，如果不合法就回傳 null */
function normalizeMoveToken(
  moves: string[],
  token: MoveToken,
): MoveToken | null {
  const { base, sliceCount, turnCount, prime } = token;

  // base 必須是已知代號
  if (typeof base !== "string" || !moves.includes(base)) return null;

  // sliceCount 可以是 null 或 >= 1 的整數
  if (
    !(sliceCount === null || (Number.isInteger(sliceCount) && sliceCount >= 1))
  ) {
    return null;
  }

  // turnCount 必須是 1 ~ 3 (因為 4 會回到原點)
  if (
    typeof turnCount !== "number" ||
    !Number.isInteger(turnCount) ||
    turnCount < 1
  ) {
    return null;
  }

  const normalizedTurns = turnCount % MOVE_CYCLE_COUNT;
  if (normalizedTurns === 0) return null;

  // prime 必須是 boolean
  if (typeof prime !== "boolean") return null;

  return { base, sliceCount, turnCount: normalizedTurns, prime };
}

/** 把 MoveToken 轉回字串 */
function stringifyMoveToken(token: MoveToken): string {
  const sliceCounttr = token.sliceCount ? String(token.sliceCount) : "";
  const turnStr = token.turnCount > 1 ? String(token.turnCount) : "";
  const primeStr = token.prime ? "'" : "";
  return `${sliceCounttr}${token.base}${turnStr}${primeStr}`;
}

/** 建立方塊轉動解析 */
export function createCubeNotationParser(parser: CubeNotationParser) {
  /** 所有移動代號 */
  const moves = Array.isArray(parser.extraMoves)
    ? [...basicMoves, ...parser.extraMoves]
    : basicMoves;

  /** 動態生成正規表達式 */
  const REGEX = new RegExp(
    `^(\\d*)(${moves.map(escapeRegex).join("|")})(\\d*)(')?$`,
  );

  /** 解析單一步驟 */
  function parseMove(moveStr?: string | null) {
    if (!moveStr) return null;

    const match = moveStr.match(REGEX);
    if (!match) return null;
    const [, sliceCounttr, base, turnStr, primeMark] = match;

    const token: MoveToken = {
      base,
      sliceCount: sliceCounttr ? parseInt(sliceCounttr, 10) : null,
      turnCount: turnStr ? parseInt(turnStr, 10) : 1,
      prime: primeMark === "'",
    };

    const normalized = normalizeMoveToken(moves, token);
    return normalized ? parser.parseMove(normalized) : null;
  }

  /** 檢查字串是否為合法單步驟 */
  function isValidMove(moveStr?: string | null) {
    return parseMove(moveStr) !== null;
  }

  /** 檢查 MoveToken 物件是否合法 (需同時通過 parser 規則) */
  function isValidMoveToken(token: MoveToken): token is MoveToken {
    if (!isPlainObject(token)) return false;

    const normalized = normalizeMoveToken(moves, token);
    if (!normalized) return false;

    // 交給 parser 驗證
    return parser.parseMove(normalized) !== null;
  }

  /** 轉動層數是否合法，高階限定 */
  function isValidWideMove(sliceCount: number | null) {
    // 四階開始才能支援多層數字
    if (parser.level < 4) {
      return sliceCount === null;
    }

    if (sliceCount === null) {
      return false;
    }

    return isValidOuterMove(parser.level, sliceCount);
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

      // 如果任何一步不合法，直接回 []
      return output.every(Boolean) ? (output as MoveToken[]) : [];
    },
    /** 將 MoveToken[] 或 string[] 組合回字串公式 */
    stringifyAlgorithm(input?: MoveToken[] | string[] | null) {
      if (!Array.isArray(input)) return "";

      return input
        .map((item) => {
          if (typeof item === "string") return isValidMove(item) ? item : null;
          return isValidMoveToken(item)
            ? stringifyMoveToken(item as MoveToken)
            : null;
        })
        .filter(Boolean)
        .join(SEPARATE);
    },
    /** 檢查 MoveToken 物件是否合法 (需同時通過 parser 規則) */
    isValidMoveToken,
    /** 轉動層數是否合法，高階限定 */
    isValidWideMove,
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

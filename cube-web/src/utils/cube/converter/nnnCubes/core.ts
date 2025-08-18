import { isPlainObject } from "es-toolkit";

import type { MoveToken, CubeProfile } from "./types";

import {
  basicMoves,
  SEPARATE,
  MOVE_CYCLE_COUNT,
  PRIME_MARK,
} from "./constants";

/** escape regex special chars */
function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 驗證並正規化 MoveToken，如果不合法就回傳 null */
function validateAndNormalizeToken(
  /** 要驗證的 MoveToken */
  token: MoveToken,
  /** 所有移動代號 */
  moves: string[],
): MoveToken | null {
  const { base, sliceCount, turnCount, isPrime } = token;

  // base 必須是已知代號
  if (typeof base !== "string" || !moves.includes(base)) return null;

  // sliceCount 可以是 null 或 >= 1 的整數
  if (
    !(sliceCount === null || (Number.isInteger(sliceCount) && sliceCount >= 1))
  ) {
    return null;
  }

  // turnCount 必須是正整數
  if (
    typeof turnCount !== "number" ||
    !Number.isInteger(turnCount) ||
    turnCount < 1
  ) {
    return null;
  }

  /** 將 turnCount 轉換成 0 ~ 3 */
  const normalizedTurns = turnCount % MOVE_CYCLE_COUNT;
  if (normalizedTurns === 0) return null;

  // prime 必須是 boolean
  if (typeof isPrime !== "boolean") return null;

  return { base, sliceCount, turnCount: normalizedTurns, isPrime };
}

/** 將 MoveToken 轉成標準化代號字串 */
export function formatMoveToken(token: MoveToken): string {
  const sliceStr =
    token.sliceCount && token.sliceCount > 1 ? String(token.sliceCount) : "";
  const turnStr = token.turnCount > 1 ? String(token.turnCount) : "";
  const primeStr = token.isPrime ? PRIME_MARK : "";
  return `${sliceStr}${token.base}${turnStr}${primeStr}`;
}

/** 建立方塊轉動解析 */
export function createCubeProfile(parser: CubeProfile) {
  /** 所有移動代號 */
  const moves = [
    ...basicMoves,
    ...(Array.isArray(parser.extraMoves) ? parser.extraMoves : []),
  ];

  /** 動態生成正規表達式，先長後短避免誤匹配 */
  const movesPattern = moves
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .join("|");
  const REGEX = new RegExp(`^(\\d*)(${movesPattern})(\\d*)(')?$`);

  /** 解析單一步驟字串為 MoveToken */
  function parseMove(moveStr?: string | null): MoveToken | null {
    if (!moveStr) return null;

    const match = moveStr.match(REGEX);
    if (!match) return null;

    const [, sliceCountStr, base, turnStr, primeMark] = match;
    const token: MoveToken = {
      base,
      sliceCount: sliceCountStr ? parseInt(sliceCountStr, 10) : null,
      turnCount: turnStr ? parseInt(turnStr, 10) : 1,
      isPrime: primeMark === "'",
    };

    const normalized = validateAndNormalizeToken(token, moves);
    return normalized ? parser.parseMove(normalized) : null;
  }

  /** 將字串轉成標準化代號字串 */
  function formatMove(moveStr?: string | null): string | null {
    const token = parseMove(moveStr);
    if (!token) return null;
    return formatMoveToken(token);
  }

  /** 檢查字串是否為合法單步驟 */
  function isValidMoveString(moveStr?: string | null) {
    return parseMove(moveStr) !== null;
  }

  /** 檢查 MoveToken 物件是否合法 */
  function isValidMoveToken(token: MoveToken): token is MoveToken {
    if (!isPlainObject(token)) return false;

    const normalized = validateAndNormalizeToken(token, moves);
    if (!normalized) return false;

    return parser.parseMove(normalized) !== null;
  }

  /** 轉動層數是否合法，高階限定 */
  function isValidWideMove(sliceCount: number | null) {
    if (parser.layers < 4) return sliceCount === null;
    if (sliceCount === null) return false;
    return isValidOuterMove(parser.layers, sliceCount);
  }

  return {
    /** 解析單一步驟字串為 MoveToken */
    parseMove,
    /** 將字串轉成標準化代號字串 */
    formatMove,
    /** 檢查字串是否為合法單步驟 */
    isValidMoveString,
    /** 檢查 MoveToken 物件是否合法 */
    isValidMoveToken,
    /** 轉動層數是否合法，高階限定 */
    isValidWideMove,
    /** 將公式字串解析成 MoveToken[] */
    parseAlgorithm(input?: string | null) {
      if (!input || typeof input !== "string") return [];
      const output = input.trim().split(SEPARATE).map(parseMove);
      return output.every(Boolean) ? (output as MoveToken[]) : [];
    },
    /** 將 MoveToken[] 或 string[] 組合回標準化字串公式 */
    stringifyAlgorithm(input?: MoveToken[] | string[] | null) {
      if (!Array.isArray(input)) return "";
      return input
        .map((item) => {
          if (typeof item === "string") return formatMove(item);
          return isValidMoveToken(item)
            ? formatMoveToken(item as MoveToken)
            : null;
        })
        .filter(Boolean)
        .join(SEPARATE);
    },
    formatMoveToken,
    // 以下是轉換公式實作
  };
}

/** 檢查魔術方塊外層移動的有效性 */
export function isValidOuterMove(N: number, n?: number | null): boolean {
  if (!Number.isInteger(N) || N <= 1) return false;
  const slices = n ?? 2;
  if (!Number.isInteger(slices) || slices <= 1 || slices >= N) return false;
  return true;
}

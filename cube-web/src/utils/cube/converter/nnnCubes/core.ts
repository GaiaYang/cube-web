import { isPlainObject } from "es-toolkit";

import type { MoveToken, CubeProfile, WideMove, BasicMove } from "./types";

import {
  basicMoves,
  SEPARATE,
  MOVE_CYCLE_COUNT,
  PRIME_MARK,
  wideMoves,
} from "./constants";
import { mirrorMove, reverseMove, rotateMove } from "./convert";

/** 官方標準符號正則表達式 */
const REGEX = createRegex();
/** 建立方塊轉動解析 */
export function createCubeProfile(parser?: CubeProfile) {
  /** 方塊層數，如果沒有表示不設限制 */
  const cubeLayers = parser?.cubeLayers;

  /**
   * 解析單一步驟字串為 `MoveToken`
   *
   * @param moveStr 要解析的步驟字串
   * @returns 回傳 `MoveToken`，官方規則不通過則執行擴充解析，有不合法格式則回傳 `null`
   * */
  function parseMove(moveStr?: string | null): MoveToken | null {
    const match = parseMoveByRegex(REGEX, moveStr);
    if (match) {
      return normalizeOfficialMove(match, cubeLayers);
    }
    return parser?.parseMove?.(moveStr) ?? null;
  }

  /** 將 MoveToken 或字串轉成安全的標準化字串 */
  function _safeFormat(tokenOrStr?: MoveToken | string | null): string {
    const token =
      typeof tokenOrStr === "string" ? parseMove(tokenOrStr) : tokenOrStr;
    const str = moveTokenToString(token);
    return parseMove(str) ? str : "";
  }

  /**
   * 將 `MoveToken` 轉換成標準化字串（會經過 `parser`）
   *
   * @param token 要轉換的 `MoveToken`
   * @returns 回傳標準化字串，有不合法代號則空字串
   * */
  function formatMoveToken(token?: MoveToken | null): string {
    return _safeFormat(token);
  }

  /**
   * 將字串轉成標準化代號字串（會經過 `parser`）
   *
   * @param moveStr 要轉換的字串
   * @returns 回傳標準化字串，有不合法代號則空字串
   * */
  function formatMove(moveStr?: string | null): string {
    return _safeFormat(moveStr);
  }

  /** 高階函式：生成公式映射轉換器 */
  function createAlgorithmMapper(
    main: (move: MoveToken) => MoveToken | null,
    fallback?: (move: MoveToken) => MoveToken | null,
    reverse = false,
  ) {
    return (moves: MoveToken[]): MoveToken[] => {
      const mapped = moves.map((move) => {
        const prased = normalizeOfficialMove(move, cubeLayers);
        if (prased) {
          return main(prased);
        }
        return fallback?.(move) ?? null;
      });
      if (!mapped.every(Boolean)) return [];
      return (reverse ? mapped.reverse() : mapped) as MoveToken[];
    };
  }

  return {
    /** 解析單一步驟字串為 `MoveToken` */
    parseMove,
    /** 將字串轉成標準化代號字串 */
    formatMove,
    /** 將 `MoveToken` 轉換成標準化字串 */
    formatMoveToken,
    /**
     * 將公式字串解析成 `MoveToken[]`
     *
     * @param input 公式字串
     * @returns 回傳 `MoveToken[]` ，有不合法代號則空陣列
     * */
    parseAlgorithm(input?: string | null): MoveToken[] {
      if (!input) return [];
      const tokens = input.trim().split(SEPARATE).map(parseMove);
      return tokens.every(Boolean) ? (tokens as MoveToken[]) : [];
    },
    /**
     * 將 `MoveToken[]` 或 `string[]` 組合回標準化字串公式
     *
     * @param input `MoveToken[]` 或 `string[]`
     * @returns 回傳標準化字串，有不合法代號則空字串
     * */
    formatAlgorithm(input?: MoveToken[] | string[] | null): string {
      if (!Array.isArray(input)) return "";
      const tokens = input.map(_safeFormat);
      return tokens.every(Boolean) ? tokens.join(SEPARATE) : "";
    },
    // 以下是轉換公式實作
    /** 鏡像公式 */
    mirrorAlgorithm: createAlgorithmMapper(mirrorMove, parser?.mirrorMove),
    /** 反轉公式 */
    reverseAlgorithm: createAlgorithmMapper(
      reverseMove,
      parser?.reverseMove,
      true,
    ),
    /** 旋轉公式 (y2) */
    rotateAlgorithm: createAlgorithmMapper(rotateMove, parser?.rotateMove),
  };
}

/**
 * 生成正則表達式
 *
 * @param array 額外的轉動符號
 *
 * 把字串解析成 `[, 轉動層數字串, 轉動代號, 轉動次數字串, 逆時針符號]`
 * */
export function createRegex(array?: string[]): RegExp {
  /** 動態生成正規表達式，先長後短避免誤匹配 */
  const movesPattern = [...basicMoves, ...(Array.isArray(array) ? array : [])]
    .sort((a, b) => b.length - a.length)
    .join("|");
  return new RegExp(`^(\\d*)(${movesPattern})(\\d*)(')?$`);
}

/**
 * 純解析字串
 *
 * @param regex 正則表達式
 * @param input 要解析的字串
 * @returns `[轉動層數, 轉動代號, 轉動次數, 是否為逆時針]`
 * */
export function parseMoveByRegex(
  regex: RegExp,
  input?: string | null,
): MoveToken | null {
  if (!input) return null;
  const match = regex.exec(input);
  if (!match) return null;
  const [, sliceCountStr, code, turnStr, primeMark] = match;

  // 書寫必須從 2 開始
  if (
    sliceCountStr === "0" ||
    sliceCountStr === "1" ||
    turnStr === "0" ||
    turnStr === "1"
  ) {
    return null;
  }

  return {
    sliceCount: sliceCountStr ? parseInt(sliceCountStr, 10) : 1,
    code,
    turnCount: turnStr ? parseInt(turnStr, 10) : 1,
    isPrime: primeMark === PRIME_MARK,
  };
}

/**
 * 官方規則的標準化
 *
 * @param token 要檢查的 `MoveToken`
 * @param cubeLayers 方塊層數，沒有給就不檢查
 * @returns 回傳 `MoveToken`，有不合法格式則回傳 `null`
 * */
export function normalizeOfficialMove(
  token?: MoveToken | null,
  cubeLayers?: number,
): MoveToken | null {
  if (!isPlainObject(token)) return null;
  const { sliceCount = 1, code, turnCount = 1, isPrime = false } = token;
  if (!basicMoves.includes(code as BasicMove)) {
    return null;
  }
  // 只有四階以上才能使用 sliceCount
  if (typeof cubeLayers === "number" && cubeLayers <= 3 && sliceCount >= 2) {
    return null;
  }
  if (!wideMoves.includes(code as WideMove) && sliceCount > 1) return null;

  const _turnCount = ensureValidTurnCount(turnCount);
  if (_turnCount === null) return null;

  return { code, sliceCount, turnCount: _turnCount, isPrime };
}

/**
 * 標準化轉動代號
 *
 * @param moves 轉動代號清單
 * @param code 轉動代號
 * */
export function ensureValidCode<T extends string>(
  moves: T[],
  code: string,
): T | null {
  // code 必須是已知代號
  return moves.includes(code as T) ? (code as T) : null;
}

/** 驗證並簡化 turnCount */
export function ensureValidTurnCount(turnCount: number) {
  const isInteger = Number.isInteger(turnCount);
  const inRange = turnCount > 0 && turnCount < MOVE_CYCLE_COUNT;
  return isInteger && inRange ? turnCount : null;
}

/** 將 MoveToken 轉為字串（不做驗證） */
export function moveTokenToString(token?: MoveToken | null): string {
  if (!isPlainObject(token)) return "";
  const { sliceCount = 1, code, turnCount = 1, isPrime = false } = token;
  return [
    sliceCount > 1 ? sliceCount : "",
    code,
    turnCount > 1 ? turnCount : "",
    isPrime ? PRIME_MARK : "",
  ].join("");
}

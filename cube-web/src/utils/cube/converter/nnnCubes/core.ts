import { isPlainObject } from "es-toolkit";

import type { MoveToken, CubeProfile } from "./types";

import {
  basicMoves,
  SEPARATE,
  MOVE_CYCLE_COUNT,
  PRIME_MARK,
  MIN_LATERS,
} from "./constants";
import { mirrorAlgorithm, reverseAlgorithm, rotateAlgorithm } from "./convert";

/** 將 MoveToken 轉成標準化代號字串 */
export function formatMoveToken(token: MoveToken): string {
  const { sliceCount, code, turnCount, isPrime } = token;
  return `${sliceCount && sliceCount > 1 ? sliceCount : ""}${code}${
    turnCount > 1 ? turnCount : ""
  }${isPrime ? PRIME_MARK : ""}`;
}

/** 建立方塊轉動解析 */
export function createCubeProfile(parser: CubeProfile) {
  /** 所有移動代號 */
  const moves = [
    ...basicMoves,
    ...(Array.isArray(parser.extraMoves) ? parser.extraMoves : []),
  ];
  /** 動態生成正規表達式，先長後短避免誤匹配 */
  const movesPattern = moves.sort((a, b) => b.length - a.length).join("|");
  const REGEX = new RegExp(`^(\\d*)(${movesPattern})(\\d*)(')?$`);

  /** 解析單一步驟字串為 MoveToken */
  function parseMove(moveStr?: string | null): MoveToken | null {
    if (!moveStr) return null;
    const match = moveStr.match(REGEX);
    if (!match) return null;
    const [, sliceCountStr, code, turnStr, primeMark] = match;
    const normalized = _validateAndNormalizeToken(
      {
        code,
        sliceCount: sliceCountStr ? parseInt(sliceCountStr, 10) : null,
        turnCount: turnStr ? parseInt(turnStr, 10) : 1,
        isPrime: primeMark === "'",
      },
      moves,
    );
    return normalized ? parser.parseMove(normalized) : null;
  }

  /** 將字串轉成標準化代號字串 */
  function formatMove(moveStr?: string | null): string | null {
    const token = parseMove(moveStr);
    return token ? formatMoveToken(token) : null;
  }

  /** 檢查字串是否為合法單步驟 */
  function isValidMoveString(moveStr?: string | null) {
    return parseMove(moveStr) !== null;
  }

  /** 檢查 MoveToken 物件是否合法 */
  function isValidMoveToken(
    token: MoveToken | null | undefined,
  ): token is MoveToken {
    const normalized = _validateAndNormalizeToken(token, moves);
    return Boolean(normalized && parser.parseMove(normalized));
  }

  /** 轉動層數是否合法，高階限定 */
  function isValidWideMove(sliceCount: number | null) {
    const layers = parser.layers ?? MIN_LATERS;
    if (layers < 4) return sliceCount === null;
    if (sliceCount === null) return false;
    return isValidOuterMove(layers, sliceCount);
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
    parseAlgorithm(input?: string | null): MoveToken[] {
      if (!input) return [];
      const tokens = input.trim().split(SEPARATE).map(parseMove);
      return tokens.every(Boolean) ? (tokens as MoveToken[]) : [];
    },
    /** 將 MoveToken[] 或 string[] 組合回標準化字串公式 */
    stringifyAlgorithm(input?: MoveToken[] | string[] | null): string {
      if (!Array.isArray(input)) return "";
      const tokens = input.map((item) => {
        if (typeof item === "string") {
          return formatMove(item);
        }
        if (isValidMoveToken(item)) {
          return formatMoveToken(item);
        }
        return null;
      });
      return tokens.every(Boolean) ? (tokens as string[]).join(SEPARATE) : "";
    },
    formatMoveToken,
    // 以下是轉換公式實作
    /**
     * 鏡像處理的通用邏輯：
     * - `code` 會依映射表轉換
     * - `isPrime` 必定反轉一次（鏡像等於反向旋轉）
     *
     * 注意：擴展層 (ex: 333.ts) 只需處理非官方符號的 `code` 映射，
     * 不要再次反轉 `isPrime`，否則會出現方向錯誤。
     */
    mirrorAlgorithm(input: MoveToken[]) {
      return parser.mirrorAlgorithm(mirrorAlgorithm(input));
    },
    /** 反轉公式 */
    reverseAlgorithm(input: MoveToken[]) {
      return parser.reverseAlgorithm(reverseAlgorithm(input));
    },
    /** 旋轉公式(y2) */
    rotateAlgorithm(input: MoveToken[]) {
      return parser.rotateAlgorithm(rotateAlgorithm(input));
    },
  };
}

/** 驗證並正規化 MoveToken，如果不合法就回傳 null */
function _validateAndNormalizeToken(
  /** 要驗證的 MoveToken */
  token: MoveToken | null | undefined,
  moves: string[],
): MoveToken | null {
  if (!isPlainObject(token)) return null;
  const { code, sliceCount, turnCount, isPrime } = token;
  // code 必須是已知代號
  if (!moves.includes(code)) return null;
  // sliceCount 可以是 null 或 >= 1 的整數
  if (
    sliceCount !== null &&
    (!Number.isInteger(sliceCount) || sliceCount < 1)
  ) {
    return null;
  }
  // turnCount 必須是正整數
  if (!Number.isInteger(turnCount) || turnCount < 1) return null;
  /** 將 turnCount 轉換成 0 ~ 3 */
  const normalizedTurns = turnCount % MOVE_CYCLE_COUNT;
  if (normalizedTurns === 0) return null;
  // prime 必須是 boolean
  if (typeof isPrime !== "boolean") return null;
  return { code, sliceCount, turnCount: normalizedTurns, isPrime };
}

/**
 * 檢查魔術方塊外層移動的有效性
 *
 * @param N 方塊總層數
 * @param n 轉動層數
 * */
export function isValidOuterMove(N: number, n?: number | null): boolean {
  if (!Number.isInteger(N) || N <= 1) return false;
  const slices = n ?? MIN_LATERS;
  if (!Number.isInteger(slices) || slices <= 1 || slices >= N) return false;
  return true;
}

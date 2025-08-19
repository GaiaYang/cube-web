import { isPlainObject } from "es-toolkit";

import type { MoveToken, CubeProfile, WideMove } from "./types";

import {
  basicMoves,
  SEPARATE,
  MOVE_CYCLE_COUNT,
  PRIME_MARK,
  wideMoves,
} from "./constants";
import { mirrorAlgorithm, reverseAlgorithm, rotateAlgorithm } from "./convert";

/** 建立方塊轉動解析 */
export function createCubeProfile(parser: CubeProfile) {
  /** 所有移動代號（包含 parser 擴充的符號） */
  const moves = [
    ...basicMoves,
    ...(Array.isArray(parser.extraMoves) ? parser.extraMoves : []),
  ];

  /** 動態生成正規表達式，先長後短避免誤匹配 */
  const movesPattern = moves.sort((a, b) => b.length - a.length).join("|");
  const REGEX = new RegExp(`^(\\d*)(${movesPattern})(\\d*)(')?$`);

  /** 驗證並正規化 `MoveToken`，如果不合法就回傳 `null` */
  function _normalizeToken(
    token: MoveToken | null | undefined,
  ): MoveToken | null {
    if (!isPlainObject(token)) return null;
    const { code, sliceCount, turnCount, isPrime } = token;

    // code 必須是已知代號
    if (!moves.includes(code)) return null;

    // 多層符號前才能有數字
    if (!wideMoves.includes(code as WideMove) && sliceCount !== null) {
      return null;
    }

    // sliceCount 可以是 null 或 >= 1 的整數
    if (
      sliceCount !== null &&
      (!Number.isInteger(sliceCount) || sliceCount <= 1)
    ) {
      return null;
    }

    // turnCount 必須是正整數
    if (!Number.isInteger(turnCount) || turnCount < 1) return null;

    /** 將 turnCount 轉換成 0 ~ 3 */
    const normalizedTurns = turnCount % MOVE_CYCLE_COUNT;
    if (normalizedTurns === 0) return null; // 0 表示沒有動作

    // prime 必須是 boolean
    if (typeof isPrime !== "boolean") return null;

    return { code, sliceCount, turnCount: normalizedTurns, isPrime };
  }

  /** 正規化後再交給 `parser` 做進一步轉換 */
  function _normalizeAndParse(token?: MoveToken | null): MoveToken | null {
    if (!token) return null;
    const normalized = _normalizeToken(token);
    return normalized ? parser.parseMove(normalized) : null;
  }

  /** 解析單一步驟字串為 `MoveToken` */
  function parseMove(moveStr?: string | null): MoveToken | null {
    if (!moveStr) return null;
    const match = moveStr.match(REGEX);
    if (!match) return null;

    const [, sliceCountStr, code, turnStr, primeMark] = match;
    return _normalizeAndParse({
      code,
      sliceCount: sliceCountStr ? +sliceCountStr : null,
      turnCount: turnStr ? +turnStr : 1,
      isPrime: primeMark === "'",
    });
  }

  /** 將 `MoveToken` 轉換成標準化字串（會經過 `parser`） */
  function formatMoveToken(token?: MoveToken | null): string {
    return toMoveTokenString(_normalizeAndParse(token));
  }

  /** 將字串轉成標準化代號字串（會經過 `parser`） */
  function formatMove(moveStr?: string | null): string {
    return formatMoveToken(parseMove(moveStr));
  }
  /** 檢查字串是否為合法單步驟 */
  function isValidMoveString(moveStr?: string | null): moveStr is string {
    return parseMove(moveStr) !== null;
  }

  /** 檢查 MoveToken 物件是否合法 */
  function isValidMoveToken(token?: MoveToken | null): token is MoveToken {
    return _normalizeAndParse(token) !== null;
  }

  /**
   * 高階函式轉換
   *
   * @param baseFn 共用轉換
   * @param parserFn 客製化轉換
   * */
  function withParserTransform(
    baseFn: (input: MoveToken[]) => MoveToken[],
    parserFn: (input: MoveToken[]) => MoveToken[],
  ) {
    return (input: MoveToken[]) => parserFn(baseFn(input));
  }

  return {
    /** 解析單一步驟字串為 `MoveToken` */
    parseMove,
    /** 將字串轉成標準化代號字串 */
    formatMove,
    /** 將 `MoveToken` 轉換成標準化字串 */
    formatMoveToken,
    /** 檢查字串是否為合法單步驟 */
    isValidMoveString,
    /** 檢查 `MoveToken` 物件是否合法 */
    isValidMoveToken,
    /** 將公式字串解析成 `MoveToken[]` */
    parseAlgorithm(input?: string | null): MoveToken[] {
      if (!input) return [];
      const tokens = input.trim().split(SEPARATE).map(parseMove);
      // 全部合法才回傳，否則丟棄
      return tokens.every(Boolean) ? (tokens as MoveToken[]) : [];
    },
    /** 將 MoveToken[] 或 string[] 組合回標準化字串公式 */
    stringifyAlgorithm(input?: MoveToken[] | string[] | null): string {
      if (!Array.isArray(input)) return "";
      const tokens = input.map((item) =>
        typeof item === "string" ? formatMove(item) : formatMoveToken(item),
      );
      // 全部合法才回傳字串，否則丟棄
      return tokens.every(Boolean) ? (tokens as string[]).join(SEPARATE) : "";
    },
    // 以下是轉換公式實作
    /**
     * 鏡像處理的通用邏輯：
     * - `code` 會依映射表轉換
     * - `isPrime` 必定反轉一次（鏡像等於反向旋轉）
     *
     * 注意：擴展層 (ex: 333.ts) 只需處理非官方符號的 `code` 映射，
     * 不要再次反轉 `isPrime`，否則會出現方向錯誤。
     */
    mirrorAlgorithm: withParserTransform(
      mirrorAlgorithm,
      parser.mirrorAlgorithm,
    ),
    /** 反轉公式 */
    reverseAlgorithm: withParserTransform(
      reverseAlgorithm,
      parser.reverseAlgorithm,
    ),
    /** 旋轉公式 (y2) */
    rotateAlgorithm: withParserTransform(
      rotateAlgorithm,
      parser.rotateAlgorithm,
    ),
  };
}

/** 將 `MoveToken` 轉成標準化代號字串 */
export function toMoveTokenString(token?: MoveToken | null): string {
  if (!isPlainObject(token)) return "";
  const { sliceCount, code, turnCount, isPrime } = token;
  return [
    sliceCount && sliceCount > 1 ? sliceCount : "",
    code,
    turnCount > 1 ? turnCount : "",
    isPrime ? PRIME_MARK : "",
  ].join("");
}

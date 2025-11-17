import { isPlainObject } from "es-toolkit";

import type { MoveToken, WideMove, BasicMove } from "./types";
import {
  basicMoves,
  MOVE_CYCLE_COUNT,
  PRIME_MARK,
  wideMoves,
} from "./constants";

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
 * @returns 回傳解析結果
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
  if ([sliceCountStr, turnStr].some((item) => item === "0" || item === "1")) {
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
  if (!basicMoves.includes(code as BasicMove)) return null;
  // 只有四階以上才能使用 sliceCount
  if (sliceCount > 1) {
    if (cubeLayers && cubeLayers <= 3) return null;
    if (!wideMoves.includes(code as WideMove)) return null;
  }

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

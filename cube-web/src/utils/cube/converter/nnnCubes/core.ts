import type { MoveToken, CubeProfile } from "./types";

import { SEPARATE } from "./constants";
import { mirrorMove, reverseMove, rotateMove } from "./convert";
import {
  createRegex,
  parseMoveByRegex,
  normalizeOfficialMove,
  moveTokenToString,
} from "./tools";

import safeMap from "@/utils/safeMap";

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

  /**
   * 將 `MoveToken` 轉換成標準化字串（會經過 `parser`）
   *
   * @param token 要轉換的 `MoveToken`
   * @returns 回傳標準化字串，有不合法代號則空字串
   * */
  function formatMoveToken(token?: MoveToken | null): string {
    const str = moveTokenToString(token);
    return parseMove(str) ? str : "";
  }

  /**
   * 將字串轉成標準化代號字串（會經過 `parser`）
   *
   * @param moveStr 要轉換的字串
   * @returns 回傳標準化字串，有不合法代號則空字串
   * */
  function formatMove(moveStr?: string | null): string {
    return moveTokenToString(parseMove(moveStr)) || "";
  }

  /** 高階函式：生成公式映射轉換器 */
  function createAlgorithmMapper(
    main: (move: MoveToken) => MoveToken | null,
    fallback?: (move: MoveToken) => MoveToken | null,
    reverse = false,
  ) {
    return (moves: MoveToken[]): MoveToken[] => {
      const output = safeMap(moves, (move) => {
        const prased = normalizeOfficialMove(move, cubeLayers);
        if (prased) {
          return main(prased);
        }
        return fallback?.(move) ?? null;
      });
      return reverse ? output.reverse() : output;
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
      return safeMap(input.trim().split(SEPARATE), parseMove);
    },
    /**
     * 將 `MoveToken[]` 或 `string[]` 組合回標準化字串公式
     *
     * @param input `MoveToken[]` 或 `string[]`
     * @returns 回傳標準化字串，有不合法代號則空字串
     * */
    formatAlgorithm(input?: MoveToken[] | string[] | null): string {
      if (!Array.isArray(input)) return "";
      const output = safeMap<MoveToken | string, string>(input, (item) =>
        typeof item === "string" ? formatMove(item) : formatMoveToken(item),
      );
      return output.join(SEPARATE);
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

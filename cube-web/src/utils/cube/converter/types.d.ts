/**
 * 步驟後綴（Move Suffix）
 * - "" 代表順時針 90 度
 * - "'" 代表逆時針 90 度
 * - "2" 代表 180 度
 */
export type MoveSuffix = "" | "'" | "2";

/**
 * 核心解析用單一步驟物件
 * 表示公式中的單個轉動
 */
export interface MoveToken {
  /**
   * 原始字串
   * @example "R'", "Rw2", "x", "2Rw"
   */
  raw: string;
  /**
   * 基礎符號
   * 例如面轉動 "R"、wide move "Rw" 或旋轉 "x"
   */
  base: string;
  /** 後綴，表示旋轉方向或角度 */
  suffix: MoveSuffix;
  /**
   * wide move 前綴
   * 例如 "2Rw" 中的 2
   * 選填，非 wide move 時可省略
   */
  prefix?: number;
}

/** 公式解析結果陣列（Token 陣列） */
export type AlgorithmTokens = MoveToken[];

/**
 * 每個方塊符號規則物件必須實作的介面
 * 用於解析與驗證公式
 */
export interface CubeNotationSpec {
  /** 合法的基本符號集合（不含後綴） */
  bases: Set<string>;
  /** 是否允許數字前綴 (wide move) */
  allowPrefix: boolean;
  /** 檢查單一步驟字串是否合法，回傳 true/false */
  isValidMove(token: string): boolean;
  /** 將單個字串解析成 MoveToken，非法回傳 null */
  parseMove(token: string): MoveToken | null;
}

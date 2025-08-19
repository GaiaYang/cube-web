/** 基本轉動符號 */
export type FaceMove = "F" | "B" | "R" | "L" | "U" | "D";
/** 外層轉動代號 */
export type WideMove = "Fw" | "Bw" | "Rw" | "Lw" | "Uw" | "Dw";
/** 轉體符號(旋轉整顆方塊) */
export type Rotation = "x" | "y" | "z";
/** 所有標準轉動代號 */
export type BasicMove = FaceMove | WideMove | Rotation;
/** 逆時鐘符號 */
export type PrimeMark = "'";

/** 單一步驟的轉動 */
export interface MoveToken {
  /** 基礎面 (F, B, R, L, U, D) 或旋轉 (x,y,z) */
  code: string;
  /**
   * 一次轉動幾層
   *
   * @default null
   * */
  sliceCount: number | null;
  /**
   * 次數
   *
   * @default 1
   * */
  turnCount: number;
  /**
   * 是否為 `'` 符號
   *
   * @default false
   * */
  isPrime: boolean;
}

/** 方塊實作介面 */
export interface CubeProfile {
  /** 方塊階數 */
  layers?: number;
  /** 要拓展的移動代號 */
  extraMoves?: string[];
  /** 將字串解析成 MoveToken */
  parseMove(moveToekn: MoveToken): MoveToken | null;
  // 以下是轉換公式實作
  /** 鏡像公式 */
  mirrorAlgorithm(params: MoveToken[]): MoveToken[];
  /** 反轉公式 */
  reverseAlgorithm(params: MoveToken[]): MoveToken[];
  /** 旋轉公式(y2) */
  rotateAlgorithm(params: MoveToken[]): MoveToken[];
}
// 轉換公式
/** 鏡像方向 */
export type MirrorDirection = "horizontal" | "vertical";
/** 鏡像公式對照表 */
export type MirrorMap<E extends string = BasicMove> = Record<E, E>;
/** 旋轉公式對照表 */
export type RotateMap<E extends string = BasicMove> = Record<E, E>;

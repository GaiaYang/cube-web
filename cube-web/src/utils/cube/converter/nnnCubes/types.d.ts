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
   * @default 1
   * */
  sliceCount: number;
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
  /**
   * 方塊層數
   *
   * 沒有填就當作無限制
   * */
  cubeLayers?: number;
  /** 將字串解析成 MoveToken */
  parseMove?: (input?: string | null) => MoveToken | null;
  // 以下是轉換公式實作
  /** 鏡像公式的單一步驟實作 */
  mirrorMove?: (params: MoveToken) => MoveToken | null;
  /** 反轉公式的單一步驟實作 */
  reverseMove?: (params: MoveToken) => MoveToken | null;
  /** 旋轉公式的單一步驟實作(y2) */
  rotateMove?: (params: MoveToken) => MoveToken | null;
}
// 轉換公式
/** 鏡像方向 */
export type MirrorDirection = "horizontal" | "vertical";
/** 鏡像公式對照表 */
export type MirrorMap<E extends string = BasicMove> = Record<E, E>;
/** 旋轉公式對照表 */
export type RotateMap<E extends string = BasicMove> = Record<E, E>;

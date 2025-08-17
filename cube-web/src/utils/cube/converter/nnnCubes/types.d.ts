/** 基本轉動符號 */
export type FaceMove = "F" | "B" | "R" | "L" | "U" | "D";
/** 外層轉動代號 */
export type WideMove = "Fw" | "Bw" | "Rw" | "Lw" | "Uw" | "Dw";
/** 轉體符號(旋轉整顆方塊) */
export type Rotation = "x" | "y" | "z";
/** 逆時鐘符號 */
export type PrimeMark = "'";

/** 單一步驟的轉動 */
export interface MoveToken {
  /** 基礎面 (F, B, R, L, U, D) 或旋轉 (x,y,z) */
  base: string;
  /**
   * 一次轉動幾層
   *
   * @default 1
   * */
  layers: number;
  /**
   * 次數 (1 = 90°, 2 = 180°)
   *
   * @default 1
   * */
  turns: number;
  /**
   * 是否為反向 `'`
   *
   * @default false
   * */
  prime: boolean;
}

/** 方塊實作介面 */
export interface CubeNotationParser {
  parseMove(moveStr?: string | null): MoveToken | null;
}

/** 方塊核心處理介面 */
export interface CubeNotationCore {
  parseMove(spec: CubeSpec, moveStr?: string | null): MoveToken | null;
}

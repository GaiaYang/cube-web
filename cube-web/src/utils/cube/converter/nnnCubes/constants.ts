import type { FaceMove, WideMove, Rotation, BasicMove } from "./types";

/** 基本符號 */
export const faceMoves: FaceMove[] = ["R", "L", "U", "D", "F", "B"];
/** 官方多層符號 */
export const wideMoves: WideMove[] = ["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"];
/** 轉體符號 */
export const rotations: Rotation[] = ["x", "y", "z"];
/** 官方基本轉動代號 */
export const basicMoves: BasicMove[] = [
  ...wideMoves,
  ...faceMoves,
  ...rotations,
];
/** 分隔符號 */
export const SEPARATE = " ";
/** 逆時鐘符號 */
export const PRIME_MARK = "'";
/** 轉幾次回到原點 */
export const MOVE_CYCLE_COUNT = 4;
/** 方塊最少層數 */
export const MIN_LATERS = 2;

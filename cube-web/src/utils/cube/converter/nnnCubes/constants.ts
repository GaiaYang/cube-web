import type { FaceMove, WideMove, Rotation } from "./types";

/** 基本符號 */
export const faceMoves: FaceMove[] = ["R", "L", "U", "D", "F", "B"];
/** 官方多層符號 */
export const wideMoves: WideMove[] = ["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"];
/** 轉體符號 */
export const rotations: Rotation[] = ["x", "y", "z"];
/** 逆時鐘符號 */
export const PRIME_MARK = "'";
/** 轉幾次回到原點 */
export const MOVE_CYCLE_COUNT = 4;

/** Square-1 層轉動 (X,Y) */
export type Sq1LayerMove = `(${number},${number})`;

/** Square-1 slice 180度 */
export type Sq1SliceMove = "/";

/** Square-1 公式單步驟 */
export type Square1Move = Sq1LayerMove | Sq1SliceMove;

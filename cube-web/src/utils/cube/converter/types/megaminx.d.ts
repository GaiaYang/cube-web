/** Megaminx 基礎面轉動 */
export type MegaminxBasicMove = "U" | "U'";

/** Megaminx 特殊旋轉 */
export type MegaminxRotation = "R++" | "R--" | "D++" | "D--";

/** Megaminx 單步驟 */
export type MegaminxMove = MegaminxBasicMove | MegaminxRotation;

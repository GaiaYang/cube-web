/** Pyraminx 主層轉動 */
export type PyraminxMainMove = "U" | "L" | "R" | "B";

/** Pyraminx 頂點轉動 */
export type PyraminxTipMove = "u" | "l" | "r" | "b";

/** Pyraminx 單步驟 */
export type PyraminxMove =
  | `${PyraminxMainMove}${"" | "'"}`
  | `${PyraminxTipMove}${"" | "'"}`;

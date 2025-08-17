/** Clock 的針位置 */
export type ClockPin =
  | "UR"
  | "DR"
  | "DL"
  | "UL"
  | "U"
  | "R"
  | "D"
  | "L"
  | "ALL";

/** Clock 輪盤轉動 */
export type ClockTurn = `${ClockPin}${"+" | "-"}${number}`;

/** Clock 旋轉 */
export type ClockRotation = "y2";

/** Clock 單步驟 */
export type ClockMove = ClockTurn | ClockRotation;

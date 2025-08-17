import type { NxNMove } from "./nnn";

/** 3x3 特有 slice moves (民間符號) */
export type SliceMove = "M" | "E" | "S";

/** 3x3 公式單步驟 (官方 + slice moves) */
export type ThreeByThreeMove = NxNMove | `${SliceMove}${"" | "'" | "2"}`;

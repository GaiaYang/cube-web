/** 方塊面塊顏色 */
export const CubeFaceColors = {
  /** 白色 */
  WHITE: "white",
  /** 黃色 */
  YELLOW: "yellow",
  /** 綠色 */
  GREEN: "green",
  /** 藍色 */
  BLUE: "blue",
  /** 紅色 */
  RED: "red",
  /** 橘色 */
  ORANGE: "orange",
  /** 無 */
  NONE: "none",
} as const;

export type CubeFaceColors =
  (typeof CubeFaceColors)[keyof typeof CubeFaceColors];

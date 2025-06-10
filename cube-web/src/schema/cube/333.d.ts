import { OLLCategory, PLLCategory } from "./enum/333";

/** 方塊方位 */
export type CubePosition = "U" | "D" | "L" | "R" | "F" | "B";

/** 方塊面塊位置編號 */
export type FaceletPosition =
  | "TL"
  | "TC"
  | "TR"
  | "CL"
  | "CR"
  | "CC"
  | "BL"
  | "BC"
  | "BR"
  | "S-TL"
  | "S-TC"
  | "S-TR"
  | "S-BL"
  | "S-BC"
  | "S-BR"
  | "S-RT"
  | "S-RC"
  | "S-RB"
  | "S-LT"
  | "S-LC"
  | "S-LB";

/** 方塊面塊顏色 */
export type FaceletColor =
  | "red"
  | "orange"
  | "white"
  | "yellow"
  | "blue"
  | "green"
  | "none";

/** OLL定義 */
export interface OLLDefinition {
  id: string;
  /** 名稱 */
  name: string;
  /** 設置公式 */
  setupAlgorithms: string;
  /** 圖案標記 */
  patternPositions: FaceletPosition[];
  /** 類別 */
  category: OLLCategory;
}

/** PLL定義 */
export interface PLLDefinition {
  id: string;
  /** 名稱 */
  name: string;
  /** 設置公式 */
  setupAlgorithms: string;
  /**
   * 圖案標記
   *
   * > 只需要指定`S-`開頭的面塊
   * */
  patternColors: Partial<Record<FaceletPosition, CubePosition>>;
  /** 類別 */
  category: PLLCategory;
}

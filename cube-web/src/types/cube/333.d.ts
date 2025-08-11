import { OLLCategory, PLLCategory, F2LCategory } from "@/enums/cube/333";

/** 方塊方位代號 */
export type CubeFaceCode = "U" | "D" | "L" | "R" | "F" | "B";

/** 方塊立體圖位置 */
export type CubeBlockPosition3D =
  | "U-TL"
  | "U-TC"
  | "U-TR"
  | "U-CL"
  | "U-CR"
  | "U-CC"
  | "U-BL"
  | "U-BC"
  | "U-BR"
  | "F-TL"
  | "F-TC"
  | "F-TR"
  | "F-CL"
  | "F-CR"
  | "F-CC"
  | "F-BL"
  | "F-BC"
  | "F-BR"
  | "S-TL"
  | "S-TC"
  | "S-TR"
  | "S-CL"
  | "S-CR"
  | "S-CC"
  | "S-BL"
  | "S-BC"
  | "S-BR";

/** 方塊平面展開圖位置 */
export type CubeFaceletPosition2D =
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
export type CubeFaceColor =
  | "red"
  | "orange"
  | "white"
  | "yellow"
  | "blue"
  | "green"
  | "none";

export type OLLCaseId =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46"
  | "47"
  | "48"
  | "49"
  | "50"
  | "51"
  | "52"
  | "53"
  | "54"
  | "55"
  | "56"
  | "57";

/** OLL定義 */
export interface OLLDefinition {
  id: OLLCaseId;
  /** 名稱 */
  name: string;
  /** 設置公式 */
  setupAlgorithms: string;
  /** 圖案標記 */
  pattern: CubeFaceletPosition2D[];
  /** 公式 */
  algorithms: string[];
  /** 類別 */
  category: OLLCategory;
}

export type PLLCaseId =
  | "Aa"
  | "Ab"
  | "E"
  | "F"
  | "Ga"
  | "Gb"
  | "Gc"
  | "Gd"
  | "H"
  | "Ja"
  | "Jb"
  | "Na"
  | "Nb"
  | "Ra"
  | "Rb"
  | "T"
  | "Ua"
  | "Ub"
  | "V"
  | "Y"
  | "Z";

/** PLL定義 */
export interface PLLDefinition {
  id: PLLCaseId;
  /** 名稱 */
  name: string;
  /** 設置公式 */
  setupAlgorithms: string;
  /**
   * 圖案標記
   *
   * > 只需要指定`S-`開頭的面塊
   * */
  pattern: Partial<Record<CubeFaceletPosition2D, CubeFaceCode>>;
  /** 公式 */
  algorithms: string[];
  /** 類別 */
  category: PLLCategory;
}

export type F2LCaseId =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41";

/** F2L定義 */
export interface F2LDefinition {
  id: F2LCaseId;
  /** 名稱 */
  name: string;
  /** 設置公式 */
  setupAlgorithms: string;
  /**
   * 圖案標記
   *
   * - `S-`開頭表示側邊
   * - `F-`開頭表示面向自己這邊
   * - `U-`開頭表示上邊
   */
  pattern: Partial<Record<CubeBlockPosition3D, CubeFaceCode>>;
  /** 公式 */
  algorithms: string[];
  /** 類別 */
  category: F2LCategory;
}

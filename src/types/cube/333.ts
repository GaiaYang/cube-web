import type { CommonDefinition } from "./common";

import type { F2LCategory, OLLCategory, PLLCategory } from "@/enums/cube/333";
import type { StringIntRange } from "@/types/utils";

/** 方塊方位代號 */
export type CubeFaceCode = "U" | "D" | "L" | "R" | "F" | "B";

/** 九宮格面塊位置 */
type FaceletCell =
  | "TL"
  | "TC"
  | "TR"
  | "CL"
  | "CR"
  | "CC"
  | "BL"
  | "BC"
  | "BR";

/** 側邊面塊位置（不含 CL/CR/CC，另含左右邊） */
type SideFaceletCell =
  | Exclude<FaceletCell, "CL" | "CR" | "CC">
  | "RT"
  | "RC"
  | "RB"
  | "LT"
  | "LC"
  | "LB";

/** 方塊立體圖位置 */
export type CubeBlockPosition3D = `${"U" | "F" | "S"}-${FaceletCell}`;

/** 方塊平面展開圖位置 */
export type CubeFaceletPosition2D = FaceletCell | `S-${SideFaceletCell}`;

/** OLL 案例 ID */
export type OLLCaseId = StringIntRange<57>;

/** OLL定義 */
export interface OLLDefinition extends CommonDefinition {
  id: OLLCaseId;
  /** 圖案標記 */
  pattern: CubeFaceletPosition2D[];
  /** 類別 */
  category: OLLCategory;
}

/** PLL 案例 ID */
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
export interface PLLDefinition extends CommonDefinition {
  id: PLLCaseId;
  /**
   * 圖案標記
   *
   * > 只需要指定`S-`開頭的面塊
   * */
  pattern: Partial<Record<CubeFaceletPosition2D, CubeFaceCode>>;
  /** 類別 */
  category: PLLCategory;
}

/** F2l 案例 ID */
export type F2LCaseId = StringIntRange<41>;

/** F2L定義 */
export interface F2LDefinition extends CommonDefinition {
  id: F2LCaseId;
  /**
   * 圖案標記
   *
   * - `S-`開頭表示側邊
   * - `F-`開頭表示面向自己這邊
   * - `U-`開頭表示上邊
   */
  pattern: Partial<Record<CubeBlockPosition3D, CubeFaceCode>>;
  /** 類別 */
  category: F2LCategory;
}

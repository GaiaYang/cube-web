import { createEmptyColorMap, FACELET_POSITIONS } from "./colorMap";

import type { CubeFaceColors } from "@/enums/cube/color";
import type { CubeFaceletPosition2D, OLLDefinition } from "@/types/cube/333";

export type OLLColorMap = Record<CubeFaceletPosition2D, CubeFaceColors>;

/** 建立OLL顏色地圖 */
export default function createOllColorMap(
  pattern?: OLLDefinition["pattern"],
  color?: CubeFaceColors,
): OLLColorMap | undefined {
  if (!Array.isArray(pattern) || !color) return;

  const result = createEmptyColorMap(FACELET_POSITIONS);
  for (const item of pattern) {
    result[item] = color;
  }

  return result;
}

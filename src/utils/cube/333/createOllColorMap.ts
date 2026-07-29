import { createEmptyColorMap, FACELET_POSITIONS } from "./colorMap";

import type { CubeFaceletPosition2D, OLLDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";

export type OLLColorMap = Record<CubeFaceletPosition2D, CubeFaceColor>;

/** 建立OLL顏色地圖 */
export default function createOllColorMap(
  pattern?: OLLDefinition["pattern"],
  color?: CubeFaceColor,
): OLLColorMap | undefined {
  if (!Array.isArray(pattern) || !color) return;

  const result = createEmptyColorMap(FACELET_POSITIONS);
  for (const item of pattern) {
    result[item] = color;
  }

  return result;
}

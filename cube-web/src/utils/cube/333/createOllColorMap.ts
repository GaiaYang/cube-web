import type { CubeFaceletPosition2D, OLLDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";

/** 建立OLL顏色地圖 */
export default function createOllColorMap(
  pattern?: OLLDefinition["pattern"],
  color?: CubeFaceColor,
) {
  if (!Array.isArray(pattern)) {
    return;
  }

  const result: Partial<Record<CubeFaceletPosition2D, CubeFaceColor>> = {
    TL: "none",
    TC: "none",
    TR: "none",
    CL: "none",
    CR: "none",
    CC: "none",
    BL: "none",
    BC: "none",
    BR: "none",
    "S-TL": "none",
    "S-TC": "none",
    "S-TR": "none",
    "S-BL": "none",
    "S-BC": "none",
    "S-BR": "none",
    "S-RT": "none",
    "S-RC": "none",
    "S-RB": "none",
    "S-LT": "none",
    "S-LC": "none",
    "S-LB": "none",
  };

  for (const item of pattern) {
    result[item] = color;
  }

  return result;
}

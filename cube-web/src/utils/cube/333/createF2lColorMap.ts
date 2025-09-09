import { isPlainObject } from "es-toolkit";

import type { CubeBlockPosition3D, F2LDefinition } from "@/types/cube/333";
import type { CubeFaceColor } from "@/types/cube/color";
import getCubeColorMap from "./getCubeColorMap";

export type F2LColorMap = Partial<Record<CubeBlockPosition3D, CubeFaceColor>>;

export default function createF2lColorMap(
  pattern?: F2LDefinition["pattern"],
  topColor?: CubeFaceColor,
  frontColor?: CubeFaceColor,
): F2LColorMap | undefined {
  if (!isPlainObject(pattern)) {
    return;
  }

  const colorMap: F2LColorMap = {
    "U-TL": "none",
    "U-TC": "none",
    "U-TR": "none",
    "U-CL": "none",
    "U-CR": "none",
    "U-CC": "none",
    "U-BL": "none",
    "U-BC": "none",
    "U-BR": "none",
    "F-TL": "none",
    "F-TC": "none",
    "F-TR": "none",
    "F-CL": "none",
    "F-CR": "none",
    "F-CC": "none",
    "F-BL": "none",
    "F-BC": "none",
    "F-BR": "none",
    "S-TL": "none",
    "S-TC": "none",
    "S-TR": "none",
    "S-CL": "none",
    "S-CR": "none",
    "S-CC": "none",
    "S-BL": "none",
    "S-BC": "none",
    "S-BR": "none",
  };

  const faceColors = getCubeColorMap(topColor, frontColor);

  if (faceColors) {
    for (const [key, value] of Object.entries(pattern)) {
      colorMap[key as CubeBlockPosition3D] = faceColors[value];
    }
  }

  return colorMap;
}

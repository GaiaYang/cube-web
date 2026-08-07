import type { CubeFaceColors } from "@/enums/cube/color";
import type {
  CubeBlockPosition3D,
  CubeFaceletPosition2D,
} from "@/types/cube/333";

export const FACE_POSITIONS = [
  "TL",
  "TC",
  "TR",
  "CL",
  "CR",
  "CC",
  "BL",
  "BC",
  "BR",
] as const satisfies readonly CubeFaceletPosition2D[];

export const SIDE_POSITIONS = [
  "S-TL",
  "S-TC",
  "S-TR",
  "S-BL",
  "S-BC",
  "S-BR",
  "S-RT",
  "S-RC",
  "S-RB",
  "S-LT",
  "S-LC",
  "S-LB",
] as const satisfies readonly CubeFaceletPosition2D[];

export const FACELET_POSITIONS = [
  ...FACE_POSITIONS,
  ...SIDE_POSITIONS,
] as const;

export const BLOCK_POSITIONS = [
  "U-TL",
  "U-TC",
  "U-TR",
  "U-CL",
  "U-CR",
  "U-CC",
  "U-BL",
  "U-BC",
  "U-BR",
  "F-TL",
  "F-TC",
  "F-TR",
  "F-CL",
  "F-CR",
  "F-CC",
  "F-BL",
  "F-BC",
  "F-BR",
  "S-TL",
  "S-TC",
  "S-TR",
  "S-CL",
  "S-CR",
  "S-CC",
  "S-BL",
  "S-BC",
  "S-BR",
] as const satisfies readonly CubeBlockPosition3D[];

/** 建立每個位置皆為無色的全新 color map */
export function createEmptyColorMap<Position extends string>(
  positions: readonly Position[],
): Record<Position, CubeFaceColors> {
  return Object.fromEntries(
    positions.map((position) => [position, "none"]),
  ) as Record<Position, CubeFaceColors>;
}

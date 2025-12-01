import type { CubeFaceCode, CubeFaceletPosition2D } from "@/types/cube/333";
import { cubeProfile } from "../converter/nnnCubes/specs/333";

export type ScramblePreviewResult = Record<
  CubeFaceCode,
  Record<ScramblePreviewID, CubeFaceCode>
>;

export type ScramblePreviewID = Extract<
  CubeFaceletPosition2D,
  "TL" | "TC" | "TR" | "CL" | "CR" | "CC" | "BL" | "BC" | "BR"
>;

/** 打亂預覽 */
export default function scramblePreview(moves?: string): ScramblePreviewResult {
  const stack: Record<
    CubeFaceCode,
    [
      [CubeFaceCode, CubeFaceCode, CubeFaceCode],
      [CubeFaceCode, CubeFaceCode, CubeFaceCode],
      [CubeFaceCode, CubeFaceCode, CubeFaceCode],
    ]
  > = {
    U: [
      ["U", "U", "U"],
      ["U", "U", "U"],
      ["U", "U", "U"],
    ],
    D: [
      ["D", "D", "D"],
      ["D", "D", "D"],
      ["D", "D", "D"],
    ],
    L: [
      ["L", "L", "L"],
      ["L", "L", "L"],
      ["L", "L", "L"],
    ],
    R: [
      ["R", "R", "R"],
      ["R", "R", "R"],
      ["R", "R", "R"],
    ],
    F: [
      ["F", "F", "F"],
      ["F", "F", "F"],
      ["F", "F", "F"],
    ],
    B: [
      ["B", "B", "B"],
      ["B", "B", "B"],
      ["B", "B", "B"],
    ],
  };
  const result = {
    U: {
      TL: stack.U[0][0],
      TC: stack.U[0][1],
      TR: stack.U[0][2],
      CL: stack.U[1][0],
      CR: stack.U[1][1],
      CC: stack.U[1][2],
      BL: stack.U[2][0],
      BC: stack.U[2][1],
      BR: stack.U[2][2],
    },
    D: {
      TL: stack.D[0][0],
      TC: stack.D[0][1],
      TR: stack.D[0][2],
      CL: stack.D[1][0],
      CR: stack.D[1][1],
      CC: stack.D[1][2],
      BL: stack.D[2][0],
      BC: stack.D[2][1],
      BR: stack.D[2][2],
    },
    L: {
      TL: stack.L[0][0],
      TC: stack.L[0][1],
      TR: stack.L[0][2],
      CL: stack.L[1][0],
      CR: stack.L[1][1],
      CC: stack.L[1][2],
      BL: stack.L[2][0],
      BC: stack.L[2][1],
      BR: stack.L[2][2],
    },
    R: {
      TL: stack.R[0][0],
      TC: stack.R[0][1],
      TR: stack.R[0][2],
      CL: stack.R[1][0],
      CR: stack.R[1][1],
      CC: stack.R[1][2],
      BL: stack.R[2][0],
      BC: stack.R[2][1],
      BR: stack.R[2][2],
    },
    F: {
      TL: stack.F[0][0],
      TC: stack.F[0][1],
      TR: stack.F[0][2],
      CL: stack.F[1][0],
      CR: stack.F[1][1],
      CC: stack.F[1][2],
      BL: stack.F[2][0],
      BC: stack.F[2][1],
      BR: stack.F[2][2],
    },
    B: {
      TL: stack.B[0][0],
      TC: stack.B[0][1],
      TR: stack.B[0][2],
      CL: stack.B[1][0],
      CR: stack.B[1][1],
      CC: stack.B[1][2],
      BL: stack.B[2][0],
      BC: stack.B[2][1],
      BR: stack.B[2][2],
    },
  } satisfies ScramblePreviewResult;

  if (!moves) {
    return result;
  }

  const algorithm = cubeProfile.parseAlgorithm(moves);
  for (const item of algorithm) {
  }

  return result;
}

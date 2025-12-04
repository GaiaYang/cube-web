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

const faceCodes = ["U", "D", "L", "R", "F", "B"] satisfies CubeFaceCode[];
const ids = [
  "TL",
  "TC",
  "TR",
  "CL",
  "CR",
  "CC",
  "BL",
  "BC",
  "BR",
] satisfies ScramblePreviewID[];

const initial: ScramblePreviewResult = Object.fromEntries(
  faceCodes.map((code) => [
    code,
    Object.fromEntries(ids.map((id) => [id, code])),
  ]),
) as ScramblePreviewResult;

export default function scramblePreview(moves?: string): ScramblePreviewResult {
  if (!moves) return initial;

  const stack: Record<CubeFaceCode, CubeFaceCode[][]> = Object.fromEntries(
    faceCodes.map((code) => [
      code,
      Array.from({ length: 3 }, () => Array(3).fill(code)),
    ]),
  ) as Record<CubeFaceCode, CubeFaceCode[][]>;

  const algorithm = cubeProfile.parseAlgorithm(moves);

  for (const { code, turnCount, isPrime } of algorithm) {
    for (let index = 0; index < turnCount; index++) {
      switch (code) {
        case "U":
          rotateFaceInPlace(stack.U, isPrime);
          if (isPrime) {
            const tmp = stack.F[0];
            stack.F[0] = stack.L[0];
            stack.L[0] = stack.B[0];
            stack.B[0] = stack.R[0];
            stack.R[0] = tmp;
          } else {
            const tmp = stack.F[0];
            stack.F[0] = stack.R[0];
            stack.R[0] = stack.B[0];
            stack.B[0] = stack.L[0];
            stack.L[0] = tmp;
          }
          break;
        case "D":
          rotateFaceInPlace(stack.D, isPrime);
          if (isPrime) {
            const tmp = stack.B[2];
            stack.B[2] = stack.L[2];
            stack.L[2] = stack.F[2];
            stack.F[2] = stack.R[2];
            stack.R[2] = tmp;
          } else {
            const tmp = stack.B[2];
            stack.B[2] = stack.R[2];
            stack.R[2] = stack.F[2];
            stack.F[2] = stack.L[2];
            stack.L[2] = tmp;
          }
          break;
        case "L":
          rotateFaceInPlace(stack.L, isPrime);
          if (isPrime) {
            const tmpU = [stack.U[0][0], stack.U[1][0], stack.U[2][0]];
            stack.U[0][0] = stack.F[0][0];
            stack.U[1][0] = stack.F[1][0];
            stack.U[2][0] = stack.F[2][0];
            stack.F[0][0] = stack.D[0][0];
            stack.F[1][0] = stack.D[1][0];
            stack.F[2][0] = stack.D[2][0];
            stack.D[0][0] = stack.B[2][2];
            stack.D[1][0] = stack.B[1][2];
            stack.D[2][0] = stack.B[0][2];
            stack.B[0][2] = tmpU[2];
            stack.B[1][2] = tmpU[1];
            stack.B[2][2] = tmpU[0];
          } else {
            const tmpU = [stack.U[0][0], stack.U[1][0], stack.U[2][0]];
            stack.U[0][0] = stack.B[2][2];
            stack.U[1][0] = stack.B[1][2];
            stack.U[2][0] = stack.B[0][2];
            stack.B[0][2] = stack.D[2][0];
            stack.B[1][2] = stack.D[1][0];
            stack.B[2][2] = stack.D[0][0];
            stack.D[0][0] = stack.F[0][0];
            stack.D[1][0] = stack.F[1][0];
            stack.D[2][0] = stack.F[2][0];
            stack.F[0][0] = tmpU[0];
            stack.F[1][0] = tmpU[1];
            stack.F[2][0] = tmpU[2];
          }
          break;
        case "R":
          rotateFaceInPlace(stack.R, isPrime);
          if (isPrime) {
            const tmpU = [stack.U[0][2], stack.U[1][2], stack.U[2][2]];
            stack.U[0][2] = stack.B[2][0];
            stack.U[1][2] = stack.B[1][0];
            stack.U[2][2] = stack.B[0][0];
            stack.B[0][0] = stack.D[2][2];
            stack.B[1][0] = stack.D[1][2];
            stack.B[2][0] = stack.D[0][2];
            stack.D[0][2] = stack.F[0][2];
            stack.D[1][2] = stack.F[1][2];
            stack.D[2][2] = stack.F[2][2];
            stack.F[0][2] = tmpU[0];
            stack.F[1][2] = tmpU[1];
            stack.F[2][2] = tmpU[2];
          } else {
            const tmpU = [stack.U[0][2], stack.U[1][2], stack.U[2][2]];
            stack.U[0][2] = stack.F[0][2];
            stack.U[1][2] = stack.F[1][2];
            stack.U[2][2] = stack.F[2][2];
            stack.F[0][2] = stack.D[0][2];
            stack.F[1][2] = stack.D[1][2];
            stack.F[2][2] = stack.D[2][2];
            stack.D[0][2] = stack.B[2][0];
            stack.D[1][2] = stack.B[1][0];
            stack.D[2][2] = stack.B[0][0];
            stack.B[0][0] = tmpU[2];
            stack.B[1][0] = tmpU[1];
            stack.B[2][0] = tmpU[0];
          }
          break;
        case "F":
          rotateFaceInPlace(stack.F, isPrime);
          if (isPrime) {
            const tmpU = [stack.U[2][0], stack.U[2][1], stack.U[2][2]];
            stack.U[2][0] = stack.R[0][0];
            stack.U[2][1] = stack.R[1][0];
            stack.U[2][2] = stack.R[2][0];
            stack.R[0][0] = stack.D[0][2];
            stack.R[1][0] = stack.D[0][1];
            stack.R[2][0] = stack.D[0][0];
            stack.D[0][0] = stack.L[0][2];
            stack.D[0][1] = stack.L[1][2];
            stack.D[0][2] = stack.L[2][2];
            stack.L[0][2] = tmpU[2];
            stack.L[1][2] = tmpU[1];
            stack.L[2][2] = tmpU[0];
          } else {
            const tmpU = [stack.U[2][0], stack.U[2][1], stack.U[2][2]];
            stack.U[2][0] = stack.L[2][2];
            stack.U[2][1] = stack.L[1][2];
            stack.U[2][2] = stack.L[0][2];
            stack.L[0][2] = stack.D[0][0];
            stack.L[1][2] = stack.D[0][1];
            stack.L[2][2] = stack.D[0][2];
            stack.D[0][0] = stack.R[2][0];
            stack.D[0][1] = stack.R[1][0];
            stack.D[0][2] = stack.R[0][0];
            stack.R[0][0] = tmpU[0];
            stack.R[1][0] = tmpU[1];
            stack.R[2][0] = tmpU[2];
          }
          break;
        case "B":
          rotateFaceInPlace(stack.B, isPrime);
          if (isPrime) {
            const tmpU = [stack.U[0][0], stack.U[0][1], stack.U[0][2]];
            stack.U[0][0] = stack.L[0][0];
            stack.U[0][1] = stack.L[1][0];
            stack.U[0][2] = stack.L[2][0];
            stack.L[0][0] = stack.D[2][0];
            stack.L[1][0] = stack.D[2][1];
            stack.L[2][0] = stack.D[2][2];
            stack.D[2][0] = stack.R[2][2];
            stack.D[2][1] = stack.R[1][2];
            stack.D[2][2] = stack.R[0][2];
            stack.R[0][2] = tmpU[0];
            stack.R[1][2] = tmpU[1];
            stack.R[2][2] = tmpU[2];
          } else {
            const tmpU = [stack.U[0][0], stack.U[0][1], stack.U[0][2]];
            stack.U[0][0] = stack.R[0][2];
            stack.U[0][1] = stack.R[1][2];
            stack.U[0][2] = stack.R[2][2];
            stack.R[0][2] = stack.D[2][2];
            stack.R[1][2] = stack.D[2][1];
            stack.R[2][2] = stack.D[2][0];
            stack.D[2][0] = stack.L[0][0];
            stack.D[2][1] = stack.L[1][0];
            stack.D[2][2] = stack.L[2][0];
            stack.L[0][0] = tmpU[2];
            stack.L[1][0] = tmpU[1];
            stack.L[2][0] = tmpU[0];
          }
          break;
        default:
          break;
      }
    }
  }

  return Object.fromEntries(
    faceCodes.map((code) => [code, mapFaceToFacelets(stack[code])]),
  ) as ScramblePreviewResult;
}

/** 單面轉動 */
function rotateFaceInPlace(face: CubeFaceCode[][], isPrime: boolean) {
  const copy = face.map((row) => [...row]);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      face[i][j] = isPrime ? copy[j][2 - i] : copy[2 - j][i];
    }
  }
}

/** 映射輸出 */
function mapFaceToFacelets(
  face: CubeFaceCode[][],
): Record<ScramblePreviewID, CubeFaceCode> {
  const [TL, TC, TR, CL, CC, CR, BL, BC, BR] = [
    face[0][0],
    face[0][1],
    face[0][2],
    face[1][0],
    face[1][1],
    face[1][2],
    face[2][0],
    face[2][1],
    face[2][2],
  ];
  return { TL, TC, TR, CL, CC, CR, BL, BC, BR };
}

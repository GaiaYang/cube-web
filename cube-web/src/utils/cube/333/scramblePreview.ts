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

const initial: ScramblePreviewResult = (() => {
  const codes: CubeFaceCode[] = ["U", "D", "L", "R", "F", "B"];
  const ids: ScramblePreviewID[] = [
    "TL",
    "TC",
    "TR",
    "CL",
    "CR",
    "CC",
    "BL",
    "BC",
    "BR",
  ];

  const result = {} as ScramblePreviewResult;

  for (const code of codes) {
    const ob = {} as ScramblePreviewResult[CubeFaceCode];
    for (const id of ids) {
      ob[id] = code;
    }
    result[code] = ob;
  }

  return result;
})();

/** 打亂預覽 */
export default function scramblePreview(moves?: string): ScramblePreviewResult {
  if (!moves) {
    return initial;
  }

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

  const algorithm = cubeProfile.parseAlgorithm(moves);
  for (const { code, turnCount, isPrime } of algorithm) {
    for (let index = 0; index < turnCount; index++) {
      switch (code) {
        case "U":
          [
            stack.U[0][0],
            stack.U[0][1],
            stack.U[0][2],
            stack.U[1][0],
            stack.U[1][1],
            stack.U[1][2],
            stack.U[2][0],
            stack.U[2][1],
            stack.U[2][2],
          ] = [...faceRotate(stack.U, isPrime)];
          [stack.B[0], stack.R[0], stack.F[0], stack.L[0]] = isPrime
            ? [stack.R[0], stack.F[0], stack.L[0], stack.B[0]]
            : [stack.L[0], stack.B[0], stack.R[0], stack.F[0]];
          break;
        case "D":
          [
            stack.D[0][0],
            stack.D[0][1],
            stack.D[0][2],
            stack.D[1][0],
            stack.D[1][1],
            stack.D[1][2],
            stack.D[2][0],
            stack.D[2][1],
            stack.D[2][2],
          ] = [...faceRotate(stack.D, isPrime)];
          [stack.B[2], stack.R[2], stack.F[2], stack.L[2]] = isPrime
            ? [stack.R[2], stack.F[2], stack.L[2], stack.B[2]]
            : [stack.L[2], stack.B[2], stack.R[2], stack.F[2]];
          break;
        case "L":
          [
            stack.L[0][0],
            stack.L[0][1],
            stack.L[0][2],
            stack.L[1][0],
            stack.L[1][1],
            stack.L[1][2],
            stack.L[2][0],
            stack.L[2][1],
            stack.L[2][2],
          ] = [...faceRotate(stack.L, isPrime)];
          [stack.U[0][0], stack.U[1][0], stack.U[2][0]] = isPrime
            ? [stack.F[0][0], stack.F[1][0], stack.F[2][0]]
            : [stack.B[2][2], stack.B[1][2], stack.B[0][2]];
          [stack.F[0][0], stack.F[1][0], stack.F[2][0]] = isPrime
            ? [stack.D[0][0], stack.D[1][0], stack.D[2][0]]
            : [stack.U[0][0], stack.U[1][0], stack.U[2][0]];
          [stack.D[0][0], stack.D[1][0], stack.D[2][0]] = isPrime
            ? [stack.B[2][2], stack.B[1][2], stack.B[0][2]]
            : [stack.F[0][0], stack.F[1][0], stack.F[2][0]];
          [stack.B[0][2], stack.B[1][2], stack.B[2][2]] = isPrime
            ? [stack.U[2][0], stack.U[1][0], stack.U[0][0]]
            : [stack.D[2][0], stack.D[1][0], stack.D[0][0]];
          break;
        case "R":
          [
            stack.R[0][0],
            stack.R[0][1],
            stack.R[0][2],
            stack.R[1][0],
            stack.R[1][1],
            stack.R[1][2],
            stack.R[2][0],
            stack.R[2][1],
            stack.R[2][2],
          ] = [...faceRotate(stack.R, isPrime)];
          [stack.U[0][2], stack.U[1][2], stack.U[2][2]] = isPrime
            ? [stack.B[2][0], stack.B[1][0], stack.B[0][0]]
            : [stack.F[0][2], stack.F[1][2], stack.F[2][2]];
          [stack.B[0][0], stack.B[1][0], stack.B[2][0]] = isPrime
            ? [stack.D[2][2], stack.D[1][2], stack.D[0][2]]
            : [stack.F[2][2], stack.F[1][2], stack.F[0][2]];
          [stack.D[0][2], stack.D[1][2], stack.D[2][2]] = isPrime
            ? [stack.F[0][2], stack.F[1][2], stack.F[2][2]]
            : [stack.B[2][0], stack.B[1][0], stack.B[0][0]];
          [stack.F[0][2], stack.F[1][2], stack.F[2][2]] = isPrime
            ? [stack.U[0][2], stack.U[1][2], stack.U[2][2]]
            : [stack.D[0][2], stack.D[1][2], stack.D[2][2]];
          break;
        case "F":
          [
            stack.F[0][0],
            stack.F[0][1],
            stack.F[0][2],
            stack.F[1][0],
            stack.F[1][1],
            stack.F[1][2],
            stack.F[2][0],
            stack.F[2][1],
            stack.F[2][2],
          ] = [...faceRotate(stack.F, isPrime)];
          [stack.U[2][0], stack.U[2][1], stack.U[2][2]] = isPrime
            ? [stack.R[0][0], stack.R[1][0], stack.R[2][0]]
            : [stack.L[0][2], stack.L[1][2], stack.L[2][2]];
          [stack.R[0][0], stack.R[1][0], stack.R[2][0]] = isPrime
            ? [stack.D[0][2], stack.D[0][1], stack.D[0][0]]
            : [stack.U[2][0], stack.U[2][1], stack.U[2][2]];
          [stack.D[0][0], stack.D[0][1], stack.D[0][2]] = isPrime
            ? [stack.L[0][2], stack.L[1][2], stack.L[2][2]]
            : [stack.R[2][0], stack.R[1][0], stack.R[0][0]];
          [stack.L[0][2], stack.L[1][2], stack.L[2][2]] = isPrime
            ? [stack.U[2][2], stack.U[2][1], stack.U[2][0]]
            : [stack.D[0][0], stack.D[0][1], stack.D[0][2]];
          break;
        case "B":
          [
            stack.B[0][0],
            stack.B[0][1],
            stack.B[0][2],
            stack.B[1][0],
            stack.B[1][1],
            stack.B[1][2],
            stack.B[2][0],
            stack.B[2][1],
            stack.B[2][2],
          ] = [...faceRotate(stack.B, isPrime)];
          [stack.U[0][0], stack.U[0][1], stack.U[0][2]] = isPrime
            ? [stack.L[0][0], stack.L[1][0], stack.L[2][0]]
            : [stack.R[0][2], stack.R[1][2], stack.R[2][2]];
          [stack.L[0][0], stack.L[1][0], stack.L[2][0]] = isPrime
            ? [stack.D[2][0], stack.D[2][1], stack.D[2][2]]
            : [stack.U[0][0], stack.U[0][1], stack.U[0][2]];
          [stack.D[2][0], stack.D[2][1], stack.D[2][2]] = isPrime
            ? [stack.L[2][0], stack.L[1][0], stack.L[0][0]]
            : [stack.R[2][2], stack.R[1][2], stack.R[0][2]];
          [stack.R[0][2], stack.R[1][2], stack.R[2][2]] = isPrime
            ? [stack.U[0][0], stack.U[0][1], stack.U[0][2]]
            : [stack.D[2][2], stack.D[2][1], stack.D[2][0]];
          break;
        default:
          break;
      }
    }
  }

  return {
    U: {
      TL: stack.U[0][0],
      TC: stack.U[0][1],
      TR: stack.U[0][2],
      CL: stack.U[1][0],
      CC: stack.U[1][1],
      CR: stack.U[1][2],
      BL: stack.U[2][0],
      BC: stack.U[2][1],
      BR: stack.U[2][2],
    },
    D: {
      TL: stack.D[0][0],
      TC: stack.D[0][1],
      TR: stack.D[0][2],
      CL: stack.D[1][0],
      CC: stack.D[1][1],
      CR: stack.D[1][2],
      BL: stack.D[2][0],
      BC: stack.D[2][1],
      BR: stack.D[2][2],
    },
    L: {
      TL: stack.L[0][0],
      TC: stack.L[0][1],
      TR: stack.L[0][2],
      CL: stack.L[1][0],
      CC: stack.L[1][1],
      CR: stack.L[1][2],
      BL: stack.L[2][0],
      BC: stack.L[2][1],
      BR: stack.L[2][2],
    },
    R: {
      TL: stack.R[0][0],
      TC: stack.R[0][1],
      TR: stack.R[0][2],
      CL: stack.R[1][0],
      CC: stack.R[1][1],
      CR: stack.R[1][2],
      BL: stack.R[2][0],
      BC: stack.R[2][1],
      BR: stack.R[2][2],
    },
    F: {
      TL: stack.F[0][0],
      TC: stack.F[0][1],
      TR: stack.F[0][2],
      CL: stack.F[1][0],
      CC: stack.F[1][1],
      CR: stack.F[1][2],
      BL: stack.F[2][0],
      BC: stack.F[2][1],
      BR: stack.F[2][2],
    },
    B: {
      TL: stack.B[0][0],
      TC: stack.B[0][1],
      TR: stack.B[0][2],
      CL: stack.B[1][0],
      CC: stack.B[1][1],
      CR: stack.B[1][2],
      BL: stack.B[2][0],
      BC: stack.B[2][1],
      BR: stack.B[2][2],
    },
  } satisfies ScramblePreviewResult;
}

function faceRotate(
  input: [
    [CubeFaceCode, CubeFaceCode, CubeFaceCode],
    [CubeFaceCode, CubeFaceCode, CubeFaceCode],
    [CubeFaceCode, CubeFaceCode, CubeFaceCode],
  ],
  isPrime: boolean,
) {
  return isPrime
    ? [
        input[0][2],
        input[1][2],
        input[2][2],
        input[0][1],
        input[1][1],
        input[2][1],
        input[0][0],
        input[1][0],
        input[2][0],
      ]
    : [
        input[2][0],
        input[1][0],
        input[0][0],
        input[2][1],
        input[1][1],
        input[0][1],
        input[2][2],
        input[1][2],
        input[0][2],
      ];
}

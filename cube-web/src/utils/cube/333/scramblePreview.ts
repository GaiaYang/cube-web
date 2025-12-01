import type { CubeFaceCode, CubeFaceletPosition2D } from "@/types/cube/333";

export type ScramblePreviewResult = Record<
  CubeFaceCode,
  Record<ScramblePreviewID, CubeFaceCode>
>;

export type ScramblePreviewID = Extract<
  CubeFaceletPosition2D,
  "TL" | "TC" | "TR" | "CL" | "CR" | "CC" | "BL" | "BC" | "BR"
>;

/** 打亂預覽 */
export default function scramblePreview(): ScramblePreviewResult {
  const result = {
    U: {
      TL: "U",
      TC: "U",
      TR: "U",
      CL: "U",
      CR: "U",
      CC: "U",
      BL: "U",
      BC: "U",
      BR: "U",
    },
    D: {
      TL: "D",
      TC: "D",
      TR: "D",
      CL: "D",
      CR: "D",
      CC: "D",
      BL: "D",
      BC: "D",
      BR: "D",
    },
    L: {
      TL: "L",
      TC: "L",
      TR: "L",
      CL: "L",
      CR: "L",
      CC: "L",
      BL: "L",
      BC: "L",
      BR: "L",
    },
    R: {
      TL: "R",
      TC: "R",
      TR: "R",
      CL: "R",
      CR: "R",
      CC: "R",
      BL: "R",
      BC: "R",
      BR: "R",
    },
    F: {
      TL: "F",
      TC: "F",
      TR: "F",
      CL: "F",
      CR: "F",
      CC: "F",
      BL: "F",
      BC: "F",
      BR: "F",
    },
    B: {
      TL: "B",
      TC: "B",
      TR: "B",
      CL: "B",
      CR: "B",
      CC: "B",
      BL: "B",
      BC: "B",
      BR: "B",
    },
  } satisfies ScramblePreviewResult;
  return result;
}

/** 外層面轉動 (Face Moves) */
export type FaceMove = "F" | "B" | "R" | "L" | "U" | "D";

/** 外層多層轉動 (Wide / Block Moves) */
export type WideMove =
  | "Fw"
  | "Bw"
  | "Rw"
  | "Lw"
  | "Uw"
  | "Dw"
  | `${number}Fw`
  | `${number}Bw`
  | `${number}Rw`
  | `${number}Lw`
  | `${number}Uw`
  | `${number}Dw`;

/** 整體旋轉 (Cube Rotations) */
export type Rotation = "x" | "y" | "z";

/** NxN 公式單步驟 */
export type NxNMove =
  | `${FaceMove}${"" | "'" | "2"}`
  | `${WideMove}${"" | "'" | "2"}`
  | `${Rotation}${"" | "'" | "2"}`;

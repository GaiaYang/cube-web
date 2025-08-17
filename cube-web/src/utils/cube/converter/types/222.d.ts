import type { FaceMove, Rotation } from "./nnn";

/** 2x2 不允許 wide moves，只有 FaceMove + Rotation */
export type TwoByTwoMove =
  | `${FaceMove}${"" | "'" | "2"}`
  | `${Rotation}${"" | "'" | "2"}`;

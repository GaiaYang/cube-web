import { result } from "es-toolkit/compat";
import { createCubeProfile } from "../core";

export const {
  parseMove,
  formatMove,
  isValidMoveString,
  isValidMoveToken,
  isValidWideMove,
  parseAlgorithm,
  stringifyAlgorithm,
  formatMoveToken,
  // 轉換實作
  mirrorHorizontalAlgorithm,
  mirrorVerticalAlgorithm,
  reverseAlgorithm,
} = createCubeProfile({
  parseMove: (result) => result,
  mirrorHorizontalAlgorithm: (result) => result,
  mirrorVerticalAlgorithm: (result) => result,
  reverseAlgorithm: (result) => result,
});

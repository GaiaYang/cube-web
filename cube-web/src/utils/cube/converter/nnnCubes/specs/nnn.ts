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
  mirrorAlgorithm,
  reverseAlgorithm,
} = createCubeProfile({
  parseMove: (result) => result,
  mirrorAlgorithm: (result) => result,
  reverseAlgorithm: (result) => result,
});

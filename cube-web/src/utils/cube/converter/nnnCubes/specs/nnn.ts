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
} = createCubeProfile({
  parseMove(result) {
    return result;
  },
  mirrorHorizontalAlgorithm(result) {
    return result;
  },
});

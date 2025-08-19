import { createCubeProfile } from "../core";

const cubeProfile = createCubeProfile({
  parseMove: (result) => result,
  mirrorAlgorithm: (result) => result,
  reverseAlgorithm: (result) => result,
  rotateAlgorithm: (params) => params,
});

export const {
  parseMove,
  formatMove,
  isValidMoveString,
  isValidMoveToken,
  parseAlgorithm,
  stringifyAlgorithm,
  formatMoveToken,
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
} = cubeProfile;

export default cubeProfile;

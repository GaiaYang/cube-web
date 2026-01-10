import { createCubeProfile } from "../core";

export const cubeProfile = createCubeProfile();

export const {
  parseMove,
  formatMove,
  formatMoveToken,
  parseAlgorithm,
  formatAlgorithm,
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
} = cubeProfile;

const output = cubeProfile;
export default output;

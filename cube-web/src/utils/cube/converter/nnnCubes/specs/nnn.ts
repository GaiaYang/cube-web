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
  formatMoveToken,
  parseAlgorithm,
  formatAlgorithm,
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
} = cubeProfile;

const output = cubeProfile;
export default output;

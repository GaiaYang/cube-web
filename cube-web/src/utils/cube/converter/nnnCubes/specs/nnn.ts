import { createCubeProfile } from "../core";

const cubeProfile = createCubeProfile({
  parseMove: (result) => result,
  mirrorAlgorithm: (result) => result,
  reverseAlgorithm: (result) => result,
  rotateAlgorithm: (params) => params,
});

const output = { ...cubeProfile };
export default output;

import {
  mirrorHorizontalAlgorithm,
  parseAlgorithm,
  stringifyAlgorithm,
} from "@/utils/cube/converter/nnnCubes/specs/nnn";

export function mirrorAlgorithm(algorithm: string) {
  return stringifyAlgorithm(
    mirrorHorizontalAlgorithm(parseAlgorithm(algorithm)),
  );
}

const output = { mirrorAlgorithm };

export default output;

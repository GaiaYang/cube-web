import {
  parseAlgorithm,
  stringifyAlgorithm,
  mirrorHorizontalAlgorithm as convertMirrorHorizontalAlgorithm,
  reverseAlgorithm as convertReverseAlgorithm,
} from "@/utils/cube/converter/nnnCubes/specs/nnn";

import type { Convert } from "./types";

export function mirrorAlgorithm(algorithm: string) {
  return stringifyAlgorithm(
    convertMirrorHorizontalAlgorithm(parseAlgorithm(algorithm)),
  );
}

export function reverseAlgorithm(algorithm: string) {
  return stringifyAlgorithm(convertReverseAlgorithm(parseAlgorithm(algorithm)));
}

const output: Convert = { mirrorAlgorithm, reverseAlgorithm };

export default output;

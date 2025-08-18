import {
  parseAlgorithm,
  stringifyAlgorithm,
  mirrorAlgorithm as convertMirrorAlgorithm,
  reverseAlgorithm as convertReverseAlgorithm,
} from "@/utils/cube/converter/nnnCubes/specs/333";

import type { Convert } from "./types";

export function mirrorAlgorithm(algorithm: string) {
  return stringifyAlgorithm(convertMirrorAlgorithm(parseAlgorithm(algorithm)));
}

export function reverseAlgorithm(algorithm: string) {
  return stringifyAlgorithm(convertReverseAlgorithm(parseAlgorithm(algorithm)));
}

const output: Convert = { mirrorAlgorithm, reverseAlgorithm };

export default output;

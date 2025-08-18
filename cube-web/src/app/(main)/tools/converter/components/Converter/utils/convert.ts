import {
  parseAlgorithm,
  stringifyAlgorithm,
  mirrorAlgorithm as convertMirrorAlgorithm,
  reverseAlgorithm as convertReverseAlgorithm,
  rotateAlgorithm as convertRotateAlgorithm,
} from "@/utils/cube/converter/nnnCubes/specs/nnn";

import type { Convert } from "./types";

export function mirrorAlgorithm(algorithm: string) {
  return stringifyAlgorithm(convertMirrorAlgorithm(parseAlgorithm(algorithm)));
}

export function reverseAlgorithm(algorithm: string) {
  return stringifyAlgorithm(convertReverseAlgorithm(parseAlgorithm(algorithm)));
}

export function rotateAlgorithm(algorithm: string) {
  return stringifyAlgorithm(convertRotateAlgorithm(parseAlgorithm(algorithm)));
}

export function mirrorRotateAlgorithm(algorithm: string) {
  return stringifyAlgorithm(
    convertRotateAlgorithm(convertMirrorAlgorithm(parseAlgorithm(algorithm))),
  );
}

const output: Convert = {
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
  mirrorRotateAlgorithm,
};

export default output;

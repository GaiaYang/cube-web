import {
  parseAlgorithm,
  stringifyAlgorithm,
  mirrorAlgorithm as convertMirrorAlgorithm,
  reverseAlgorithm as convertReverseAlgorithm,
  rotateAlgorithm as convertRotateAlgorithm,
  upperAlgorithm as convertUpperAlgorithm,
  lowerAlgorithm as convertLowerAlgorithm,
} from "@/utils/cube/converter/nnnCubes/specs/333";

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
export function upperAlgorithm(algorithm: string) {
  return stringifyAlgorithm(convertUpperAlgorithm(parseAlgorithm(algorithm)));
}
export function lowerAlgorithm(algorithm: string) {
  return stringifyAlgorithm(convertLowerAlgorithm(parseAlgorithm(algorithm)));
}

const output: Convert = {
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
  mirrorRotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
};

export default output;

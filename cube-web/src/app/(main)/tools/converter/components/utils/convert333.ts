import {
  mirrorHorizontalAlgorithm,
  parseAlgorithm,
  stringifyAlgorithm,
} from "@/utils/cube/converter/nnnCubes/specs/333";

import type { Convert } from "./types";

export function mirrorAlgorithm(algorithm: string) {
  return stringifyAlgorithm(
    mirrorHorizontalAlgorithm(parseAlgorithm(algorithm)),
  );
}

const output: Convert = { mirrorAlgorithm };

export default output;

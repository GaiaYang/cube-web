import type { Convert, CubeOrder } from "../types";

import convert333 from "@/utils/cube/converter/nnnCubes/specs/333";
import convertNnn from "@/utils/cube/converter/nnnCubes/specs/nnn";
import type { MoveToken } from "@/utils/cube/converter/nnnCubes/types";

/** 原始 converter core（含 parse / format），供驗證等底層用途 */
export const converterCores = {
  nnn: convertNnn,
  "333": convert333,
} as const;

interface ConverterCore {
  parseAlgorithm: (input?: string | null) => MoveToken[];
  formatAlgorithm: (input?: MoveToken[] | string[] | null) => string;
}

/** 包裝：string → token → 轉換 → string */
function wrapAlgorithmMethod(
  core: ConverterCore,
  transform: (input: MoveToken[]) => MoveToken[],
) {
  return (algorithm: string) =>
    core.formatAlgorithm(transform(core.parseAlgorithm(algorithm)));
}

/** UI 用的 string → string 轉換表 */
export const stringConverters: Record<CubeOrder, Convert> = {
  nnn: {
    mirror: wrapAlgorithmMethod(convertNnn, convertNnn.mirrorAlgorithm),
    reverse: wrapAlgorithmMethod(convertNnn, convertNnn.reverseAlgorithm),
    rotate: wrapAlgorithmMethod(convertNnn, convertNnn.rotateAlgorithm),
    mirrorRotate: wrapAlgorithmMethod(convertNnn, (tokens) =>
      convertNnn.rotateAlgorithm(convertNnn.mirrorAlgorithm(tokens)),
    ),
  },
  "333": {
    mirror: wrapAlgorithmMethod(convert333, convert333.mirrorAlgorithm),
    reverse: wrapAlgorithmMethod(convert333, convert333.reverseAlgorithm),
    rotate: wrapAlgorithmMethod(convert333, convert333.rotateAlgorithm),
    mirrorRotate: wrapAlgorithmMethod(convert333, (tokens) =>
      convert333.rotateAlgorithm(convert333.mirrorAlgorithm(tokens)),
    ),
    upper: wrapAlgorithmMethod(convert333, convert333.upperAlgorithm),
    lower: wrapAlgorithmMethod(convert333, convert333.lowerAlgorithm),
  },
};

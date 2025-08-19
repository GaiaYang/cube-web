import type { MoveToken } from "@/utils/cube/converter/nnnCubes/types";
import convert from "@/utils/cube/converter/nnnCubes/specs/nnn";
import convert333 from "@/utils/cube/converter/nnnCubes/specs/333";

import type { Convert } from "./types";
import type { CubeOrder } from "../types";

/** 包裝函式，將 string 轉 algorithm token → 執行方法 → stringify */
function wrapAlgorithmMethod(
  converterCore: {
    parseAlgorithm: (input?: string | null | undefined) => MoveToken[];
    stringifyAlgorithm: (
      input?: MoveToken[] | string[] | null | undefined,
    ) => string;
  },
  converter: (input: MoveToken[]) => MoveToken[],
) {
  return (algorithm: string) => {
    const { parseAlgorithm, stringifyAlgorithm } = converterCore;
    const tokens = converter(parseAlgorithm(algorithm));
    return stringifyAlgorithm(tokens);
  };
}
const output: Record<CubeOrder, Convert> = {
  nnn: {
    mirror: wrapAlgorithmMethod(convert, convert.mirrorAlgorithm),
    reverse: wrapAlgorithmMethod(convert, convert.reverseAlgorithm),
    rotate: wrapAlgorithmMethod(convert, convert.rotateAlgorithm),
    mirrorRotate: wrapAlgorithmMethod(convert, (token) =>
      convert.rotateAlgorithm(convert.mirrorAlgorithm(token)),
    ),
  },
  "333": {
    mirror: wrapAlgorithmMethod(convert333, convert333.mirrorAlgorithm),
    reverse: wrapAlgorithmMethod(convert333, convert333.reverseAlgorithm),
    rotate: wrapAlgorithmMethod(convert333, convert333.rotateAlgorithm),
    mirrorRotate: wrapAlgorithmMethod(convert333, (token) =>
      convert333.rotateAlgorithm(convert333.mirrorAlgorithm(token)),
    ),
    upper: wrapAlgorithmMethod(convert333, convert333.upperAlgorithm),
    lower: wrapAlgorithmMethod(convert333, convert333.lowerAlgorithm),
  },
};

export default output;

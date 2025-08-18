import { useMemo } from "react";

import type { CubeOrder } from "../types";

import convert from "../utils/convert";
import convert333 from "../utils/convert333";

export default function useConvert(cubeOrder?: CubeOrder) {
  return useMemo(() => {
    if (cubeOrder === "333") {
      return {
        mirror: convert333.mirrorAlgorithm,
        reverse: convert333.reverseAlgorithm,
        rotate: convert333.rotateAlgorithm,
        mirrorRotate: convert333.mirrorRotateAlgorithm,
        upper: convert333.upperAlgorithm,
        lower: convert333.lowerAlgorithm,
      };
    }

    return {
      mirror: convert.mirrorAlgorithm,
      reverse: convert.reverseAlgorithm,
      rotate: convert.rotateAlgorithm,
      mirrorRotate: convert.mirrorRotateAlgorithm,
      // upper: convert.upperAlgorithm,
      // lower: convert.lowerAlgorithm,
    };
  }, [cubeOrder]);
}

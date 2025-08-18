import { useMemo } from "react";

import type { CubeOrder } from "../types";

import convert from "../utils/convert";
import convert333 from "../utils/convert333";

export default function useConvert(cubeOrder?: CubeOrder) {
  return useMemo(
    () => (cubeOrder === "333" ? convert333 : convert),
    [cubeOrder],
  );
}

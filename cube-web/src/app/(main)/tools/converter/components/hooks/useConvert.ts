import { useMemo } from "react";

import type { CubeLayer } from "../types";

import convert from "../utils/convert";
import convert333 from "../utils/convert333";

export default function useConvert(cubeLayer?: CubeLayer) {
  return useMemo(
    () => (cubeLayer === "333" ? convert333 : convert),
    [cubeLayer],
  );
}

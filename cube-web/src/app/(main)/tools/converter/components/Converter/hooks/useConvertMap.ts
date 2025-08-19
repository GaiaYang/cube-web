import { useMemo } from "react";

import type { CubeOrder } from "../types";

import convert from "../utils/convert";

export default function useConvert(cubeOrder?: CubeOrder) {
  return useMemo(
    () => convert[cubeOrder || "nnn"] || convert["nnn"],
    [cubeOrder],
  );
}

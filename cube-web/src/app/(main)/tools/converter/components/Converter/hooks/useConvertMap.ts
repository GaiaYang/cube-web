import { useMemo } from "react";

import convert from "../utils/convert";
import { useConverterProps } from "../context";

export default function useConvertMap() {
  const { cubeOrder } = useConverterProps();

  return useMemo(
    () => convert[cubeOrder || "nnn"] || convert["nnn"],
    [cubeOrder],
  );
}

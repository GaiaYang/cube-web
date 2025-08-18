import { useMemo } from "react";
import { produce } from "immer";

import { conversionFlags, conversionProfiles } from "../config";
import type { CubeOrder } from "../types";

export default function useConversionFlags(params: { cubeOrder?: CubeOrder }) {
  const cubeOrder = params?.cubeOrder;

  return useMemo(() => {
    const enabled = produce(conversionFlags, (draft) => {
      if (cubeOrder === "333") {
        draft.lower = true;
        draft.upper = true;
      }
    });
    return conversionProfiles.filter(({ id }) => enabled[id]);
  }, [cubeOrder]);
}

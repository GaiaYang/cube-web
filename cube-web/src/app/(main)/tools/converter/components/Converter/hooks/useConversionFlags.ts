import { useMemo } from "react";
import { produce } from "immer";

import { conversionFlags, conversionProfiles } from "../config";
import { useConverterProps } from "../context";

export default function useConversionFlags() {
  const { cubeOrder } = useConverterProps();

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

import { useMemo } from "react";
import { produce } from "immer";

import convert from "../utils/convert";
import { useConverterProps } from "../context";
import { conversionFlags, conversionProfiles } from "../config";

export default function useConverterObject() {
  const { cubeOrder } = useConverterProps();
  const conversionMap = useMemo(
    () => convert[cubeOrder || "nnn"] || convert["nnn"],
    [cubeOrder],
  );
  const enabledProfiles = useMemo(() => {
    const enabled = produce(conversionFlags, (draft) => {
      if (cubeOrder === "333") {
        draft.lower = true;
        draft.upper = true;
      }
    });
    return conversionProfiles.filter(({ id }) => enabled[id]);
  }, [cubeOrder]);

  return { conversionMap, enabledProfiles };
}

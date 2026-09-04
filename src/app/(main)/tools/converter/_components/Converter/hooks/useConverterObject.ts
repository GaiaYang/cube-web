import { useMemo } from "react";
import { useAtomValue } from "jotai";

import { conversionFlags, conversionProfiles } from "../config";
import { cubeOrderAtom } from "../jotai";
import { stringConverters } from "../utils/converters";

import getOrDefault from "@/utils/getOrDefault";

export default function useConverterObject() {
  const cubeOrder = useAtomValue(cubeOrderAtom);
  const conversionMap = getOrDefault(stringConverters, "nnn", cubeOrder);

  const enabledProfiles = useMemo(() => {
    const enabled =
      cubeOrder === "333"
        ? { ...conversionFlags, lower: true, upper: true }
        : conversionFlags;

    return conversionProfiles.filter(({ id }) => enabled[id]);
  }, [cubeOrder]);

  return { conversionMap, enabledProfiles };
}

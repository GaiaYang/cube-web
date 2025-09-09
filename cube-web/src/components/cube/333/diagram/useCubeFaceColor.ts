import { useHydrateAtoms } from "jotai/utils";
import { useAtomValue } from "jotai";

import { cubeFaceColorAtom, store, initialValue } from "@/jotai/settings";

export default function useCubeFaceColor() {
  useHydrateAtoms(hydrateAtoms, {
    store,
  });
  const cubeFaceColor = useAtomValue(cubeFaceColorAtom);
  return cubeFaceColor;
}

const hydrateAtoms = new Map([[cubeFaceColorAtom, initialValue.cubeFaceColor]]);

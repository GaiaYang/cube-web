import { useAtomValue } from "jotai";

import { cubeFaceColorAtom, store } from "@/jotai/settings";

export default function useCubeFaceColor() {
  const cubeFaceColor = useAtomValue(cubeFaceColorAtom, { store });
  return cubeFaceColor;
}

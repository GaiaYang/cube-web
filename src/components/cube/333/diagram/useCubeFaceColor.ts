import { useAtomValue } from "jotai";

import { cubeFaceColorAtom } from "@/jotai/settings";

export default function useCubeFaceColor() {
  const cubeFaceColor = useAtomValue(cubeFaceColorAtom);
  return cubeFaceColor;
}

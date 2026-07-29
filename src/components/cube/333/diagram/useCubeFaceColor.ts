import { useAtomValue } from "jotai";

import { cubeFaceColorAtom } from "@/jotai/settings";
import type { CubeFaceColor } from "@/types/cube/color";

interface ColorOverrides {
  topColor?: CubeFaceColor;
  frontColor?: CubeFaceColor;
}

/** 讀取設定中的方塊顏色，可用 props 覆寫 */
export default function useCubeFaceColor(overrides?: ColorOverrides) {
  const defaults = useAtomValue(cubeFaceColorAtom);
  return {
    top: overrides?.topColor ?? defaults.top,
    front: overrides?.frontColor ?? defaults.front,
  };
}

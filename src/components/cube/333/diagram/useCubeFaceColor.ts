import { useShallow } from "zustand/shallow";

import type { CubeFaceColor } from "@/types/cube/color";
import { useSettingsStore } from "@/zustand/providers/settings";

interface ColorOverrides {
  topColor?: CubeFaceColor;
  frontColor?: CubeFaceColor;
}

/** 讀取設定中的方塊顏色，可用 props 覆寫 */
export default function useCubeFaceColor(overrides?: ColorOverrides) {
  const defaults = useSettingsStore(useShallow((state) => state.cubeFaceColor));
  return {
    top: overrides?.topColor ?? defaults.top,
    front: overrides?.frontColor ?? defaults.front,
  };
}

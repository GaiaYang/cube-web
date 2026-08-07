import { createStore, StateCreator } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

import type { CubeFaceColors } from "@/enums/cube/color";
import getOppositeColor from "@/utils/cube/getOppositeColor";

interface SettingsState {
  cubeFaceColor: Record<"top" | "front", CubeFaceColors>;
}

interface SettingsActions {
  setCubeFaceTop: (top: CubeFaceColors) => void;
  setCubeFaceFront: (front: CubeFaceColors) => void;
  resetCubeFaceColor: () => void;
}

/** 可選面色（排除 none），順序與 CubeFaceColors 一致 */
const FACE_COLORS = [
  "white",
  "yellow",
  "green",
  "blue",
  "red",
  "orange",
] as const satisfies CubeFaceColors[];

export const defaultInitState: SettingsState = {
  cubeFaceColor: {
    top: "yellow",
    front: "green",
  },
};

const actions: StateCreator<SettingsState, [], [], SettingsActions> = (set) => {
  /** 頂面變更時，選第一個不是頂面／對面的顏色當前面 */
  function pickFrontForTop(top: CubeFaceColors): CubeFaceColors {
    const bottom = getOppositeColor(top);
    return FACE_COLORS.find((color) => color !== top && color !== bottom)!;
  }

  return {
    setCubeFaceTop: (top) => {
      set({
        cubeFaceColor: {
          top,
          front: pickFrontForTop(top),
        },
      });
    },
    setCubeFaceFront: (front) => {
      set((state) => ({
        cubeFaceColor: { ...state.cubeFaceColor, front },
      }));
    },
    resetCubeFaceColor: () => {
      set({ cubeFaceColor: defaultInitState.cubeFaceColor });
    },
  };
};

export type SettingsStore = SettingsState & SettingsActions;

export const createSettingsStore = (
  initState: SettingsState = defaultInitState,
) => {
  return createStore<SettingsStore>()(
    persist(combine(initState, actions), {
      name: "settings",
      storage: createJSONStorage(() => localStorage),
    }),
  );
};

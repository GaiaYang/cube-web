import { createStore } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { focusAtom } from "jotai-optics";

import type { CubeFaceColor } from "@/types/cube/color";

interface Value {
  cubeFaceColor: Record<"top" | "front", CubeFaceColor>;
}

/** 本地儲存 */
const storage = createJSONStorage<Value>();
/** 本地儲存的提供者 */
export const store = createStore();

/** 預設值 */
export const initialValue: Value = {
  cubeFaceColor: {
    top: "yellow",
    front: "green",
  },
};

/** 設定 */
export const settingsAtom = atomWithStorage("settings", initialValue, storage);

/** 方塊顏色 */
export const cubeFaceColorAtom = focusAtom(settingsAtom, (optics) =>
  optics.prop("cubeFaceColor"),
);

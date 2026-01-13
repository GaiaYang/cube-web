import { atom } from "jotai";

import type { FormMode } from "./types";

/** 選項卡索引 */
export const tabIndexAtom = atom(0);

/**
 * 表單形式
 * - stand: 獨立轉換
 * - in-place: 原地複寫
 *
 * @default "stand"
 * */
export const formModeAtom = atom<FormMode>("stand");

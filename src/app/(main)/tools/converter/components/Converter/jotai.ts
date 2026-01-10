import { atom } from "jotai";

import type { FormLayout } from "./types";

/** 選項卡索引 */
export const conversionTabIndexAtom = atom(0);

/**
 * 表單形式
 * - stand: 獨立轉換
 * - in-place: 原地複寫
 *
 * @default "stand"
 * */
export const conversionFormLayoutAtom = atom<FormLayout>("stand");

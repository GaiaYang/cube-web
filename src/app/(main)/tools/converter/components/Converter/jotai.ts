import { atom } from "jotai";

import type { CubeOrder, FormMode } from "./types";

/** 目前轉換器對應的方塊階數 */
export const cubeOrderAtom = atom<CubeOrder>("nnn");

/**
 * 表單形式
 * - stand: 獨立轉換
 * - in-place: 原地複寫
 *
 * @default "stand"
 */
export const formModeAtom = atom<FormMode>("stand");

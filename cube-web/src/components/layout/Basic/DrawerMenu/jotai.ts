import { atom } from "jotai";

/** 存放目前展開的id集合 */
export const openIdsAtom = atom(new Set<string>());
/** 當前路徑 */
export const pathnameAtom = atom("");

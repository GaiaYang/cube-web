import { atom } from "jotai";

import type { MenuOption } from "@/types/menu";

/** 存放目前展開的id集合 */
export const openIdsAtom = atom(new Set<string>());
/** 更新開啟的id集合 */
export const updateOpenIdsAtom = atom(
  (get) => get(openIdsAtom),
  (
    _,
    set,
    params: {
      options: MenuOption[];
      pathname: string;
    },
  ) => {
    set(openIdsAtom, new Set(findOpenPathIds(params.options, params.pathname)));
  },
);
/** 當前路徑 */
export const pathnameAtom = atom("");

/** 找出當前路由所屬的菜單 id 路徑 */
function findOpenPathIds(items: MenuOption[], currentPath: string): string[] {
  for (const item of items) {
    if (item.href === currentPath) {
      return [item.id];
    }
    if (item.submenu) {
      const childPath = findOpenPathIds(item.submenu, currentPath);
      if (childPath.length) {
        return [item.id, ...childPath];
      }
    }
  }
  return [];
}

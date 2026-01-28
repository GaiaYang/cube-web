import { atom } from "jotai";

import type { MenuOption } from "@/types/menu";

/** 要開啟的 `id` 列表 */
export const openIdsAtom = atom<string[]>([]);
/** 更新開啟 `id` 列表 */
export const updateOpenIdsAtom = atom(
  (get) => get(openIdsAtom),
  (_, set, params: { options: MenuOption[]; pathname: string }) => {
    set(openIdsAtom, findMatchedPath(params.options, params.pathname));
  },
);

/** 尋找匹配的路徑 */
function findMatchedPath(
  options: MenuOption[] = [],
  pathname: string = "",
): string[] {
  if (!pathname || options.length === 0) return [];

  function dfs(menus: MenuOption[], parentPath: string[]): string[] {
    for (const { id, href, submenu } of menus) {
      const currentPath = [...parentPath, id];

      if (href === pathname || `/${id}` === pathname) {
        return currentPath;
      }

      if (submenu?.length) {
        const result = dfs(submenu, currentPath);
        if (result.length) return result;
      }
    }

    return [];
  }

  return dfs(options, []);
}

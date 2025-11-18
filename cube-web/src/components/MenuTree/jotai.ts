import { atom } from "jotai";

import type { MenuOption } from "@/types/menu";

/** 要開啟的 `id` 列表 */
export const openIdsAtom = atom<string[]>([]);
/** 路徑名稱 */
export const pathnameAtom = atom<string>("");
/** 更新開啟 `id` 列表 */
export const updateOpenIdsAtom = atom(
  (get) => get(openIdsAtom),
  (_, set, params: { options: MenuOption[]; pathname: string }) => {
    set(pathnameAtom, params.pathname);
    set(openIdsAtom, findMatchedPath(params.options, params.pathname));
  },
);

/** 尋找匹配的路徑 */
function findMatchedPath(
  options: MenuOption[] = [],
  pathname: string = "",
  paths: string[] = [],
): string[] {
  if (!pathname || options.length === 0) {
    return [];
  }

  for (const option of options) {
    const currentPath = [...paths, option.id];
    if (`/${option.id}` === pathname) return currentPath;
    if (option.href === pathname) return currentPath;
    if (option.submenu) {
      const foundPath = findMatchedPath(option.submenu, pathname, currentPath);
      if (foundPath.length > 0) {
        return foundPath;
      }
    }
  }
  return [];
}

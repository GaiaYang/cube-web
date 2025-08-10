import { atom } from "jotai";

import type { MenuOption } from "@/types/menu";

export const openIdsAtom = atom<string[]>([]);
export const pathnameAtom = atom<string>("");

export const updateOpenIdsAtom = atom(
  (get) => get(openIdsAtom),
  (_, set, params: { options: MenuOption[]; pathname: string }) => {
    set(pathnameAtom, params.pathname);
    set(openIdsAtom, findMatchedPath(params.options, params.pathname));
  },
);

/** 尋找匹配的路徑 */
function findMatchedPath(
  options: MenuOption[],
  pathname: string = "",
  path: string[] = [],
): string[] {
  for (const option of options) {
    const currentPath = [...path, option.id];
    if (option.href === pathname) {
      return currentPath;
    }
    if (option.submenu) {
      const foundPath = findMatchedPath(option.submenu, pathname, currentPath);
      if (foundPath.length > 0) return foundPath;
    }
  }
  return [];
}

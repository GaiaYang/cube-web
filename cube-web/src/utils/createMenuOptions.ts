import { nanoid } from "nanoid";

import type { MenuOption, MenuOptionRaw } from "@/types/menu";

/**
 * 建立菜單選項
 * @param options 原始菜單
 * @returns 已經含id的菜單
 */
export default function createMenuOptions(
  options: MenuOptionRaw[],
): MenuOption[] {
  return options.map(callbackfn);
}

function callbackfn(item: MenuOptionRaw) {
  return {
    ...item,
    id: nanoid(),
    submenu: item.submenu ? createMenuOptions(item.submenu) : undefined,
  };
}

import { nanoid } from "nanoid";

import type { MenuOption, MenuOptionRaw } from "@/types/menu";

/**
 * 指派菜單選項id
 * @param options 原始菜單
 * @returns 已經含id的菜單
 */
export default function assignIdsToMenuOptions(
  options: MenuOptionRaw[],
): MenuOption[] {
  return options.map((item) => ({
    ...item,
    id: nanoid(),
    submenu: item.submenu ? assignIdsToMenuOptions(item.submenu) : undefined,
  }));
}

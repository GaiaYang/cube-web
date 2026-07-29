import { nanoid } from "nanoid";

import type { MenuOption, MenuOptionRaw } from "@/types/menu";

/** 為菜單項目補上穩定 id（含巢狀 submenu） */
export default function createMenuOptions(
  options: MenuOptionRaw[],
): MenuOption[] {
  return options.map(toMenuOption);
}

function toMenuOption(item: MenuOptionRaw): MenuOption {
  return {
    ...item,
    id: item.id || item.href || (item.title && `menu-${item.title}`) || nanoid(),
    submenu: item.submenu ? createMenuOptions(item.submenu) : undefined,
  };
}

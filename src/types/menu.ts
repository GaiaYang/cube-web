interface MenuItemBase {
  id?: string;
}

export interface MenuDivider extends MenuItemBase {
  type: "divider";
}

/** daisyUI `menu-title`；不可互動 */
export interface MenuTitle extends MenuItemBase {
  type: "title";
  title: string;
  children?: readonly MenuItem[];
}

/** daisyUI collapsible submenu（`<details>`） */
export interface MenuCollapse extends MenuItemBase {
  type: "collapse";
  id: string;
  title: string;
  children: readonly MenuItem[];
}

/** daisyUI 一般項目；可選永遠展開的 submenu */
export interface MenuLink extends MenuItemBase {
  type: "link";
  title: string;
  href: string;
  children?: readonly MenuItem[];
  disabled?: boolean;
}

export type MenuItem = MenuDivider | MenuTitle | MenuCollapse | MenuLink;

export interface MenuOption {
  /** 標籤標題 */
  title?: string;
  /** 連結網址 */
  href?: string;
  /** 子菜單 */
  submenu?: MenuOption[];
  /** 是否啟用折疊菜單 */
  collapsible?: boolean;
  /** 是否是 `menu-title` */
  asTitle?: boolean;
}

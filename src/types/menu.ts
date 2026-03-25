export interface MenuOptionBase {
  id?: string;
  /** 標籤標題 */
  title?: string;
  /** 連結網址 */
  href?: string;
  /** 是否啟用折疊菜單 */
  collapsible?: boolean;
  /** 是否是 `menu-title` */
  asTitle?: boolean;
  /** 分隔線 */
  divider?: boolean;
}

/** 不含 id 的菜單選項（純資料定義） */
export interface MenuOptionRaw extends MenuOptionBase {
  submenu?: MenuOptionRaw[];
}

/** 含 id 的菜單選項（用於組件與狀態管理） */
export interface MenuOption extends MenuOptionBase {
  id: string;
  submenu?: MenuOption[];
}

export interface MenuOption {
  /** 標籤名稱 */
  label: string;
  /**
   * 連結網址
   *
   * 如果有填寫則自動變成`Link`
   * */
  href?: string;
  /**
   * 點擊函式
   *
   * 如果有填寫則自動變成`button`
   * */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /** 子菜單 */
  submenu?: MenuOption[];
  /** 是否預設展開子菜單 */
  defaultOpen?: boolean;
}

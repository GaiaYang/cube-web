export interface MenuOption {
  key: string;
  /** 標籤標題 */
  title?: string;
  /** 標籤名稱 */
  label?: string;
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
}

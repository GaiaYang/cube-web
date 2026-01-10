export interface CommonProps
  extends Pick<React.HTMLAttributes<HTMLElement>, "className"> {
  /**
   * 步驟顯示方向
   *
   * @default "horizontal"
   * */
  direction: "horizontal" | "vertical";
}

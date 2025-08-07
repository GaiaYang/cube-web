export interface ListRenderItemInfo<ItemT> {
  item: ItemT;
  index: number;
}

export type ListRenderItem<ItemT> = (
  info: ListRenderItemInfo<ItemT>,
) => React.ReactElement | null;

export interface ListProps<ItemT extends ListItemProps> {
  /** 要渲染的項目的陣列（或類陣列清單）。 */
  data: ItemT[];
  /** 從 `data` 取得一個項目，並將其渲染到清單中。 */
  renderItem: ListRenderItem<ItemT>;
  /** 取得 `title` 屬性要顯示的文字 */
  getTitle?: (item: ItemT) => string;
  /**
   * 用來在指定的索引中為指定的項目抽取唯一的 `key`。
   *
   * 預設的提取器會先檢查 `item.key`，然後檢查 `item.id`，然後返回到 `index`
   */
  keyExtractor?: (item: ItemT, index: number) => string;
}

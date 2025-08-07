export interface ListRenderItemInfo<ItemT> {
  item: ItemT;
  index: number;
}

export type ListRenderItem<ItemT> = (
  info: ListRenderItemInfo<ItemT>,
) => React.ReactElement | null;

export interface ListProps<ItemT extends ListItemProps> {
  data: ItemT[];
  renderItem: ListRenderItem<ItemT>;
  getTitle?: (item: ItemT) => string;
  keyExtractor?: (item: ItemT, index: number) => string;
}

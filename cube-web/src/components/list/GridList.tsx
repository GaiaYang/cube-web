import React from "react";

import type { ListProps } from "@/types/list";
import cn from "@/utils/cn";
import getItemKey from "@/utils/list/getItemKey";

export interface GridListProps<ItemT>
  extends ListProps<ItemT>,
    React.OlHTMLAttributes<HTMLOListElement> {}

export default function GridList<ItemT extends object>({
  data,
  renderItem,
  keyExtractor,
  getTitle,
  renderListEmpty,
  ...props
}: GridListProps<ItemT>) {
  function _renderItem(item: ItemT, index: number) {
    const key =
      keyExtractor?.(item, index) ?? getItemKey(item) ?? index.toString();
    const title = getTitle?.(item);

    return (
      <li key={key} className="relative" title={title}>
        {renderItem?.({ item, index })}
      </li>
    );
  }

  function _render() {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        return data.map(_renderItem);
      }

      if (renderListEmpty) {
        <li>{renderListEmpty}</li>;
      }
    }

    return null;
  }

  return (
    <ol
      {...props}
      className={cn(
        "grid gap-y-10",
        "gap-x-6 xl:gap-x-8",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        props.className,
      )}
    >
      {_render()}
    </ol>
  );
}

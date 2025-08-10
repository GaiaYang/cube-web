import React from "react";

import type { MenuOption } from "@/types/menu";
import cn from "@/utils/cn";

import MenuNode from "./MenuNode";

export interface MenuTreeProps extends React.HTMLAttributes<HTMLUListElement> {
  options: MenuOption[];
}

export default function MenuTree({
  options,
  className,
  ...props
}: MenuTreeProps) {
  return (
    <ul {...props} className={cn("menu w-full", className)}>
      {options.map(_renderNode)}
    </ul>
  );
}

function _renderNode(item: MenuOption, _: number) {
  return <MenuNode {...item} key={item.id} />;
}

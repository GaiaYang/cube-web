import React from "react";
import { Provider } from "jotai";

import type { MenuOption } from "@/types/menu";
import type { MenuIconProps } from "./types";
import cn from "@/utils/cn";

import MenuNode from "./MenuNode";
import MenuController from "./MenuController";

export interface MenuTreeProps extends React.HTMLAttributes<HTMLUListElement> {
  options: MenuOption[];
  renderIcon?: (pramas: MenuIconProps) => React.ReactNode;
}

export default function MenuTree({
  options,
  renderIcon,
  className,
  ...props
}: MenuTreeProps) {
  function _renderNode(item: MenuOption) {
    return <MenuNode {...item} key={item.id} renderIcon={renderIcon} />;
  }

  return (
    <Provider>
      <MenuController options={options} />
      <ul {...props} className={cn("menu w-full", className)}>
        {options.map(_renderNode)}
      </ul>
    </Provider>
  );
}

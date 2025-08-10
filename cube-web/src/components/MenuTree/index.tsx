import React from "react";
import { Provider } from "jotai";

import type { MenuOption } from "@/types/menu";
import cn from "@/utils/cn";

import MenuNode from "./MenuNode";
import MenuController from "./MenuController";

export interface MenuTreeProps extends React.HTMLAttributes<HTMLUListElement> {
  options: MenuOption[];
}

export default function MenuTree(props: MenuTreeProps) {
  return (
    <Provider>
      <MenuController options={props.options} />
      <MenuCore {...props} />
    </Provider>
  );
}

function MenuCore({ options, className, ...props }: MenuTreeProps) {
  return (
    <ul {...props} className={cn("menu w-full", className)}>
      {options.map(_renderNode)}
    </ul>
  );
}

function _renderNode(item: MenuOption, _: number) {
  return <MenuNode {...item} key={item.id} />;
}

import { Provider } from "jotai";

import MenuController from "./MenuController";
import MenuNode from "./MenuNode";
import type { MenuIconProps } from "./types";

import type { MenuOption } from "@/types/menu";
import cn from "@/utils/cn";

export interface MenuTreeProps extends React.ComponentProps<"ul"> {
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

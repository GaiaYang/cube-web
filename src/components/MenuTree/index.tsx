import { cn } from "cn";

import MenuNode from "./MenuNode";
import { MenuStateProvider } from "./MenuState";
import type { RenderMenuIcon } from "./types";

import { Menu } from "@/components/daisy-ui/menu";
import type { MenuItem } from "@/types/menu";

export interface MenuTreeProps extends React.ComponentProps<"ul"> {
  items: readonly MenuItem[];
  renderIcon?: RenderMenuIcon;
}

export default function MenuTree({
  items,
  renderIcon,
  className,
  ...props
}: MenuTreeProps) {
  return (
    <MenuStateProvider items={items}>
      <Menu {...props} className={cn("w-full", className)}>
        {items.map((item, index) => (
          <MenuNode
            item={item}
            key={
              item.id ??
              ("href" in item ? item.href : undefined) ??
              `${item.type}-${index}`
            }
            renderIcon={renderIcon}
          />
        ))}
      </Menu>
    </MenuStateProvider>
  );
}

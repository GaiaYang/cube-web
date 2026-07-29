import MenuNode from "./MenuNode";
import { MenuStateProvider } from "./MenuState";
import type { RenderMenuIcon } from "./types";

import type { MenuItem } from "@/types/menu";
import cn from "@/utils/cn";

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
      <ul {...props} className={cn("menu w-full", className)}>
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
      </ul>
    </MenuStateProvider>
  );
}

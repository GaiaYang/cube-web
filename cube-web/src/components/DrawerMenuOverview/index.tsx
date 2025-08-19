"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

import type { MenuOption } from "@/types/menu";
import cn from "@/utils/cn";
import { drawerMenu } from "@/contents/menu";

import MenuNode from "./MenuNode";

export type DrawerMenuOverviewProps = React.HTMLAttributes<HTMLUListElement>;

/** 依照路徑自動顯示抽屜菜單的對應總覽 */
export default function DrawerMenuOverview({
  className,
  ...props
}: DrawerMenuOverviewProps) {
  const pathname = usePathname();
  const options = useMemo(() => {
    const node = findMenuNodeByHref(drawerMenu, pathname);

    return node?.submenu || [];
  }, [pathname]);

  return (
    <ul
      {...props}
      className={cn(
        "not-prose menu rounded-box w-full",
        "border-base-300 border",
        "dark:bg-base-200",
        className,
      )}
    >
      {options.map(_renderNode)}
    </ul>
  );
}

function _renderNode(item: MenuOption) {
  return <MenuNode {...item} key={item.id} />;
}

/** 遞迴尋找符合 href 的節點 */
function findMenuNodeByHref(
  options: MenuOption[],
  href: string,
): MenuOption | null {
  for (const option of options) {
    if (option.id === href) return option;
    if (option.submenu) {
      const found = findMenuNodeByHref(option.submenu, href);
      if (found) return found;
    }
  }
  return null;
}

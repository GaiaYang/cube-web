import Link from "next/link";

import type { MenuOption } from "@/types/menu";

export type MenuNodeProps = MenuOption;

export default function MenuNode({
  title,
  href,
  submenu,
  collapsible,
  asTitle,
}: MenuNodeProps) {
  if (asTitle) {
    if (submenu) {
      // menu-title + 子菜單
      return (
        <li>
          <h2 className="menu-title">{title}</h2>
          <ul>{submenu.map(_renderNode)}</ul>
        </li>
      );
    } else {
      // menu-title（純文字）
      return <li className="menu-title">{title}</li>;
    }
  }

  // 可折疊父層
  if (collapsible && submenu) {
    return (
      <li>
        <details>
          <summary>{title}</summary>
          <ul>{submenu.map(_renderNode)}</ul>
        </details>
      </li>
    );
  }

  return (
    <li>
      {href ? <Link href={href}>{title}</Link> : <span>{title}</span>}
      {submenu ? <ul>{submenu.map(_renderNode)}</ul> : null}
    </li>
  );
}

function _renderNode(item: MenuOption) {
  return <MenuNode {...item} key={item.id} />;
}

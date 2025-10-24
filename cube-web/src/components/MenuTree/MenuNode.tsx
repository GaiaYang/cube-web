import type { MenuOption } from "@/types/menu";
import type { MenuIconProps } from "./types";

import MenuLink from "./MenuLink";
import MenuDetails from "./MenuDetails";

export interface MenuNodeProps extends MenuOption {
  renderIcon?: (pramas: MenuIconProps) => React.ReactNode;
}

const iconProps: Omit<MenuIconProps, keyof MenuOption> = {
  className: "size-5",
  size: 24,
};

export default function MenuNode({ renderIcon, ...item }: MenuNodeProps) {
  const { id, title, href, submenu, collapsible, asTitle, divider } = item;
  const _iconElement = renderIcon?.({ ...item, ...iconProps }) || null;

  // 分隔線
  if (divider) {
    return <li />;
  }

  // menu-title（純文字）
  if (asTitle && !submenu) {
    return (
      <li className="menu-title">
        {_iconElement}
        {title}
      </li>
    );
  }

  // menu-title + 子菜單
  if (asTitle && submenu) {
    return (
      <li>
        <h2 className="menu-title">
          {_iconElement}
          {title}
        </h2>
        <ul>{submenu.map(_renderNode)}</ul>
      </li>
    );
  }

  // 可折疊父層
  if (collapsible && submenu) {
    return (
      <li>
        <MenuDetails id={id}>
          <summary>
            {_iconElement}
            {title}
          </summary>
          <ul>{submenu.map(_renderNode)}</ul>
        </MenuDetails>
      </li>
    );
  }

  /** 統一渲染文字 */
  function _renderLabel() {
    if (href) {
      return (
        <MenuLink href={href}>
          {_iconElement}
          {title}
        </MenuLink>
      );
    }

    return (
      <a>
        {_iconElement}
        {title}
      </a>
    );
  }

  // 一般有子菜單的父層（可點擊）
  if (submenu) {
    return (
      <li>
        {_renderLabel()}
        <ul>{submenu.map(_renderNode)}</ul>
      </li>
    );
  }

  // 單純連結或文字
  return <li>{_renderLabel()}</li>;
}

function _renderNode(item: MenuOption) {
  return <MenuNode {...item} key={item.id} />;
}

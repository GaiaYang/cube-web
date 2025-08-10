import React from "react";

import type { MenuOption } from "@/types/menu";

import MenuLink from "./MenuLink";
import MenuDetails from "./MenuDetails";

export interface MenuNodeProps extends MenuOption {}

export default function MenuNode({
  id,
  title,
  href,
  submenu,
  collapsible,
  asTitle,
}: MenuNodeProps) {
  // menu-title（純文字）
  if (asTitle && !submenu) {
    return <li className="menu-title">{title}</li>;
  }

  // menu-title + 子菜單
  if (asTitle && submenu) {
    return (
      <li>
        <h2 className="menu-title">{title}</h2>
        <ul>{submenu.map(_renderNode)}</ul>
      </li>
    );
  }

  // 可折疊父層
  if (collapsible && submenu) {
    return (
      <li>
        <MenuDetails id={id}>
          <summary>{title}</summary>
          <ul>{submenu.map(_renderNode)}</ul>
        </MenuDetails>
      </li>
    );
  }

  /** 統一渲染文字 */
  function _renderLabel() {
    if (href) {
      return <MenuLink href={href}>{title}</MenuLink>;
    }

    return <a>{title}</a>;
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

"use client";

import React from "react";

import type { MenuOption } from "./types";
import { options } from "./config";

import MenuLink from "./MenuLink";

export default function DrawerMenu() {
  return <ul className="menu w-full">{options.map(_renderNode)}</ul>;
}

function MenuNode({
  title,
  href,
  submenu,
  collapsible,
  asTitle,
  // id,
}: MenuOption) {
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
        <details open={false}>
          <summary>
            <MenuLink href={href}>{title}</MenuLink>
          </summary>
          <ul>{submenu.map(_renderNode)}</ul>
        </details>
      </li>
    );
  }

  // 一般有子菜單的父層（可點擊）
  if (submenu) {
    return (
      <li>
        <MenuLink href={href}>{title}</MenuLink>
        <ul>{submenu.map(_renderNode)}</ul>
      </li>
    );
  }

  // 單純連結或文字
  return (
    <li>
      <MenuLink href={href}>{title}</MenuLink>
    </li>
  );
}

function _renderNode(item: MenuOption) {
  return <MenuNode {...item} key={item.id} />;
}

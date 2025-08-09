"use client";

import React from "react";

import type { MenuOption } from "./types";
import { options } from "./config";

import MenuLink from "./MenuLink";

export default function DrawerMenu() {
  return <ul className="menu w-full">{options.map(_renderNode)}</ul>;
}

function MenuNode(item: MenuOption) {
  // menu-title（純文字）
  if (item.asTitle && !item.submenu) {
    return <li className="menu-title">{item.title}</li>;
  }

  // menu-title + 子菜單
  if (item.asTitle && item.submenu) {
    return (
      <li>
        <h2 className="menu-title">{item.title}</h2>
        <ul>{item.submenu.map(_renderNode)}</ul>
      </li>
    );
  }

  // 可折疊父層
  if (item.collapsible && item.submenu) {
    return (
      <li>
        <details open={false}>
          <summary>
            <MenuLink href={item.href}>{item.title}</MenuLink>
          </summary>
          <ul>{item.submenu.map(_renderNode)}</ul>
        </details>
      </li>
    );
  }

  // 一般有子菜單的父層（可點擊）
  if (item.submenu) {
    return (
      <li>
        <MenuLink href={item.href}>{item.title}</MenuLink>
        <ul>{item.submenu.map(_renderNode)}</ul>
      </li>
    );
  }

  // 單純連結或文字
  return (
    <li>
      <MenuLink href={item.href}>{item.title}</MenuLink>
    </li>
  );
}

function _renderNode(item: MenuOption, index: number) {
  return <MenuNode {...item} key={index} />;
}

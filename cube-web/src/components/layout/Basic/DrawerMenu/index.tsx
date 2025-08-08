"use client";

import React from "react";
import { usePathname } from "next/navigation";

import type { MenuOption } from "./types";
import { options } from "./config";

import LabelLink from "./LabelLink";

export default function DrawerMenu() {
  const pathname = usePathname();
  const openKeys = findOpenKeys(options, pathname);

  function _renderItem({
    key,
    title,
    label,
    href,
    onClick,
    submenu,
  }: MenuOption): React.ReactElement {
    const active = pathname === href;

    function _render() {
      if (title) {
        return <h2 className="menu-title">{title}</h2>;
      }

      if (Array.isArray(submenu)) {
        const isOpen = openKeys.has(key);

        return (
          <details open={isOpen}>
            <summary>{label}</summary>
            <ul>{submenu.map(_renderItem)}</ul>
          </details>
        );
      }

      return (
        <LabelLink
          href={href}
          label={label}
          onClick={onClick}
          active={active}
        />
      );
    }

    return <li key={key}>{_render()}</li>;
  }

  return <ul className="menu w-full">{options.map(_renderItem)}</ul>;
}

/** 尋找要打開的項目`key` */
function findOpenKeys(options: MenuOption[], pathname: string): Set<string> {
  const openKeys = new Set<string>();

  // 首頁直接不展開
  if (pathname === "/") {
    return openKeys;
  }

  function dfs(items: MenuOption[], parents: string[]) {
    for (const item of items) {
      if (item.href && pathname === item.href) {
        parents.forEach((p) => openKeys.add(p));
      }
      if (item.submenu) {
        dfs(item.submenu, [...parents, item.key]);
      }
    }
  }

  dfs(options, []);
  return openKeys;
}

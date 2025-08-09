"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { atom, Provider, useAtomValue, useSetAtom } from "jotai";

import { usePathname } from "next/navigation";

import type { MenuOption } from "./types";
import { options } from "./config";
import { openIdsAtom, pathnameAtom } from "./jotai";

import MenuLink, { type MenuLinkProps } from "./MenuLink";

export default function DrawerMenu() {
  return (
    <Provider>
      <MenuList items={options} />
    </Provider>
  );
}

interface MenuListProps {
  items: MenuOption[];
}

function MenuList({ items }: MenuListProps) {
  const pathname = usePathname();
  const setOpenIds = useSetAtom(openIdsAtom);
  const setPathname = useSetAtom(pathnameAtom);

  useEffect(() => {
    setPathname(pathname);
    setOpenIds(new Set(findOpenPathIds(options, pathname)));
  }, [pathname, setOpenIds, setPathname]);

  return <ul className="menu w-full">{items.map(_renderNode)}</ul>;
}

/** 找出當前路由所屬的菜單 id 路徑 */
function findOpenPathIds(items: MenuOption[], currentPath: string): string[] {
  for (const item of items) {
    if (item.href === currentPath) {
      return [item.id];
    }
    if (item.submenu) {
      const childPath = findOpenPathIds(item.submenu, currentPath);
      if (childPath.length) {
        return [item.id, ...childPath];
      }
    }
  }
  return [];
}

function MenuNode({
  title,
  href,
  submenu,
  collapsible,
  asTitle,
  id,
}: MenuOption) {
  const setOpenIds = useSetAtom(openIdsAtom);
  const isOpen = useAtomValue(
    useMemo(() => atom((get) => get(openIdsAtom).has(id)), [id]),
  );
  const isActive = useAtomValue(
    useMemo(() => atom((get) => get(pathnameAtom) === href), [href]),
  );

  const handleLinkClick = useCallback(() => {
    if (href) {
      setOpenIds(new Set(findOpenPathIds(options, href)));
    }
  }, [setOpenIds, href]);

  const menuLinkProps: MenuLinkProps = {
    href,
    isActive,
    onClick: handleLinkClick,
  };

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
        <details open={isOpen}>
          <summary>
            <MenuLink {...menuLinkProps}>{title}</MenuLink>
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
        <MenuLink {...menuLinkProps}>{title}</MenuLink>
        <ul>{submenu.map(_renderNode)}</ul>
      </li>
    );
  }

  // 單純連結或文字
  return (
    <li>
      <MenuLink {...menuLinkProps}>{title}</MenuLink>
    </li>
  );
}

function _renderNode(item: MenuOption) {
  return <MenuNode {...item} key={item.id} />;
}

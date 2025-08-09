"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { atom, Provider, useAtomValue, useSetAtom } from "jotai";

import { usePathname } from "next/navigation";

import type { MenuOption } from "@/types/menu";
import { openIdsAtom, updateOpenIdsAtom, pathnameAtom } from "./jotai";

import MenuLink, { type MenuLinkProps } from "./MenuLink";
import {
  MenuContext,
  useMenuContext,
  type MenuContextType,
} from "./MenuContext";

export interface MenuTreeProps extends MenuContextType {
  options: MenuOption[];
}

export default function MenuTree(props: MenuTreeProps) {
  const { onLinkClick } = props;

  const contextValue = useMemo(() => ({ onLinkClick }), [onLinkClick]);

  return (
    <MenuContext.Provider value={contextValue}>
      <Provider>
        <MenuList {...props} />
      </Provider>
    </MenuContext.Provider>
  );
}

function MenuList({ options }: MenuTreeProps) {
  const pathname = usePathname();
  const updateOpenIds = useSetAtom(updateOpenIdsAtom);
  const setPathname = useSetAtom(pathnameAtom);

  useEffect(() => {
    setPathname(pathname);
  }, [pathname, setPathname]);

  useEffect(() => {
    updateOpenIds({ options, pathname });
  }, [pathname, updateOpenIds, options]);

  return <ul className="menu w-full">{options.map(_renderNode)}</ul>;
}

interface MenuNodeProps extends MenuOption {
  /** 原本的菜單 */
  array: MenuOption[];
}

function MenuNode({
  id,
  title,
  href,
  submenu,
  collapsible,
  asTitle,
  // 從map原地拿的資料
  array,
}: MenuNodeProps) {
  const { onLinkClick } = useMenuContext();
  const updateOpenIds = useSetAtom(updateOpenIdsAtom);
  const isOpen = useAtomValue(
    useMemo(() => atom((get) => get(openIdsAtom).has(id)), [id]),
  );
  const isActive = useAtomValue(
    useMemo(() => atom((get) => get(pathnameAtom) === href), [href]),
  );

  const handleLinkClick = useCallback(() => {
    if (href) {
      updateOpenIds({ options: array, pathname: href });
    }
    onLinkClick?.();
  }, [updateOpenIds, href, array, onLinkClick]);

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

function _renderNode(item: MenuOption, _: number, array: MenuOption[]) {
  return <MenuNode {...item} key={item.id} array={array} />;
}

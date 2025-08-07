"use client";

import React from "react";
import { usePathname } from "next/navigation";

import type { MenuOption } from "./types";
import { options } from "./config";

import LabelLink from "./LabelLink";

export default function DrawerMenu() {
  const pathname = usePathname();

  function _renderItem(
    { title, label, href, onClick, submenu, defaultOpen = false }: MenuOption,
    index: number,
  ): React.ReactElement {
    const active = pathname === href;

    function _render() {
      if (title) {
        return <h2 className="menu-title">{title}</h2>;
      }

      if (Array.isArray(submenu)) {
        return (
          <details open={defaultOpen}>
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

    return <li key={index}>{_render()}</li>;
  }

  return <ul className="menu w-full">{options.map(_renderItem)}</ul>;
}

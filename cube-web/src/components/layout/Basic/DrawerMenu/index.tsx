"use client";

import React from "react";
import { usePathname } from "next/navigation";

import type { MenuOption } from "./types";
import { options } from "./config";

import LabelLink from "./LabelLink";

export default function DrawerMenu() {
  const pathname = usePathname();

  function _renderItem(
    { label, href, onClick, submenu, defaultOpen }: MenuOption,
    index: number,
  ): React.ReactElement {
    const active = pathname === href;

    return (
      <li key={index}>
        {Array.isArray(submenu) ? (
          <details open={defaultOpen}>
            <summary>{label}</summary>
            <ul>{submenu.map(_renderItem)}</ul>
          </details>
        ) : (
          <LabelLink
            href={href}
            label={label}
            onClick={onClick}
            active={active}
          />
        )}
      </li>
    );
  }

  return <ul className="menu w-full">{options.map(_renderItem)}</ul>;
}

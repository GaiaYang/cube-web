"use client";

import React from "react";
import { XIcon } from "lucide-react";

import type { MenuOption } from "../types";
import { options } from "./config";

import LabelLink from "./LabelLink";

/** 行動版菜單 */
export default function MobileMenu() {
  return <ul className="menu w-full">{options.map(_renderItem)}</ul>;
}

export function DrawerMenu() {
  return (
    <div className="bg-base-100 h-full w-60">
      <div className="navbar">
        <div className="flex-1" />
        <button
          type="button"
          className="btn btn-ghost btn-circle"
          onClick={() => document.getElementById("drawer-menu")?.click()}
        >
          <XIcon className="size-6" />
        </button>
      </div>
      <MobileMenu />
    </div>
  );
}

function _renderItem(
  { label, href, submenu }: MenuOption,
  index: number,
): React.ReactElement {
  return (
    <li key={index}>
      {Array.isArray(submenu) ? (
        <details>
          <summary>{label}</summary>
          <ul>{submenu.map(_renderItem)}</ul>
        </details>
      ) : (
        <LabelLink href={href} label={label} />
      )}
    </li>
  );
}

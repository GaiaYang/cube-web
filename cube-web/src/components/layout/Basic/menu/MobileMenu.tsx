import React from "react";

import type { MenuOption } from "./types";
import { options } from "./config";

import LabelLink from "./LabelLink";

/** 行動版菜單 */
export default function MobileMenu() {
  return <ul className="menu w-full">{options.map(_renderItem)}</ul>;
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

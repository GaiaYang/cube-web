"use client";

import React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import type { MenuOption } from "../types";

import cn from "@/utils/cn";
import { options } from "./config";

import LabelLink from "./LabelLink";

/** 桌面版菜單 */
export default function DesktopMenu() {
  function _renderLink({ label, href, submenu }: MenuOption, index: number) {
    return (
      <Menu key={index} as="li" className="relative">
        {({ open }) => {
          if (Array.isArray(submenu)) {
            return (
              <>
                <MenuButton
                  as="button"
                  type="button"
                  className="btn btn-ghost font-normal"
                >
                  {label}
                  <ChevronDownIcon
                    className={cn("size-3.5 transition-transform", {
                      "rotate-180": open,
                    })}
                    aria-hidden
                  />
                </MenuButton>
                <MenuItems
                  anchor="bottom"
                  as="ul"
                  className="menu bg-base-200 rounded-box z-10 shadow-sm"
                >
                  {submenu.map((item, i) => _renderListItem(item, i))}
                </MenuItems>
              </>
            );
          } else {
            return (
              <MenuItem>
                {({ close }) => (
                  <LabelLink
                    href={href}
                    label={label}
                    className="btn btn-ghost font-normal"
                    onClick={close}
                  />
                )}
              </MenuItem>
            );
          }
        }}
      </Menu>
    );
  }

  return (
    <ul className={cn("flex items-center px-1", "hidden md:flex")}>
      {options.map(_renderLink)}
    </ul>
  );
}

function _renderListItem(
  { label, href, submenu }: MenuOption,
  index: number,
): React.ReactElement {
  const key = index;

  if (Array.isArray(submenu)) {
    return (
      <li key={key}>
        <details>
          <summary className="cursor-pointer px-4 py-2 select-none">
            {label}
          </summary>
          <ul>{submenu.map((item, i) => _renderListItem(item, i))}</ul>
        </details>
      </li>
    );
  } else {
    return (
      <MenuItem key={key}>
        {({ close }) => (
          <li>
            <LabelLink href={href} label={label} onClick={close} />
          </li>
        )}
      </MenuItem>
    );
  }
}

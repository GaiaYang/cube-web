"use client";

import Link from "next/link";
import React from "react";
import { ChevronDownIcon, MenuIcon } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import cn from "@/utils/cn";

interface MenuOption {
  label: string;
  href?: string;
  submenu?: MenuOption[];
}

const links: MenuOption[] = [
  {
    label: "公式表",
    href: "/algs",
    submenu: [{ label: "三階公式表", href: "/event/333/algs" }],
  },
];

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          首頁
        </Link>
      </div>
      <div className="navbar-center">
        <DesktopMenu />
      </div>
      <div className="navbar-end">
        <MobileMenu />
      </div>
    </nav>
  );
}

/** 桌面版菜單 */
function DesktopMenu() {
  function _renderLink({ label, href, submenu }: MenuOption, index: number) {
    return (
      <Menu key={index} as="li">
        {({ open }) => {
          if (Array.isArray(submenu)) {
            return (
              <>
                <MenuButton as="button" className="btn btn-ghost font-normal">
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
                  {submenu.map(_renderListItem)}
                </MenuItems>
              </>
            );
          } else {
            return (
              <MenuItem>
                <LinkLabel
                  href={href}
                  label={label}
                  className="btn btn-ghost font-normal"
                />
              </MenuItem>
            );
          }
        }}
      </Menu>
    );
  }

  return (
    <ul className={cn("flex items-center px-1", "hidden md:flex")}>
      {links.map(_renderLink)}
    </ul>
  );
}

/** 手機版菜單 */
function MobileMenu() {
  return (
    <Menu as="div" className="flex md:hidden">
      {({ open }) => (
        <>
          <MenuButton as="button" className="btn btn-ghost btn-circle">
            <MenuIcon
              className={cn("size-5 transition-transform", {
                "rotate-180": open,
              })}
              aria-hidden
            />
          </MenuButton>
          <MenuItems
            as="ul"
            anchor="bottom"
            className={cn(
              "menu bg-base-200 rounded-box z-10 shadow-sm",
              "min-w-40",
            )}
          >
            {links.map(_renderListItem)}
          </MenuItems>
        </>
      )}
    </Menu>
  );
}

function LinkLabel({
  href,
  label,
  className,
}: Pick<MenuOption, "href" | "label"> & { className?: string }) {
  const _className = cn(className, "text-nowrap");

  if (href) {
    return (
      <Link href={href} className={_className}>
        {label}
      </Link>
    );
  } else {
    return <span className={_className}>{label}</span>;
  }
}

function _renderListItem(
  { label, href, submenu }: MenuOption,
  index: number,
): React.ReactElement {
  return (
    <li key={index}>
      {Array.isArray(submenu) ? (
        <details>
          <summary>{label}</summary>
          <ul>{submenu.map(_renderListItem)}</ul>
        </details>
      ) : (
        <MenuItem>
          <LinkLabel href={href} label={label} />
        </MenuItem>
      )}
    </li>
  );
}

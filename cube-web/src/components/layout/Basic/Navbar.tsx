"use client";

import Link from "next/link";
import React from "react";
import { ChevronDownIcon, MenuIcon } from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import cn from "@/utils/cn";

interface MenuItem {
  label: string;
  href: string;
  submenu?: MenuItem[];
}

const links: MenuItem[] = [
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
  return (
    <ul className={cn("flex items-center px-1", "hidden md:flex")}>
      {links.map((item) => {
        return (
          <li key={item.label}>
            {Array.isArray(item.submenu) ? (
              <Popover className="dropdown dropdown-center">
                {({ open }) => (
                  <>
                    <PopoverButton className="btn btn-ghost font-normal">
                      {item.label}
                      <ChevronDownIcon
                        size={14}
                        className={cn({ "rotate-180": open })}
                      />
                    </PopoverButton>
                    <PopoverPanel transition>
                      <ul
                        className={cn(
                          "dropdown-content menu menu-lg",
                          "bg-base-100 rounded-box z-1 shadow-sm",
                        )}
                      >
                        {item.submenu!.map(_renderListItem)}
                      </ul>
                    </PopoverPanel>
                  </>
                )}
              </Popover>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** 手機版菜單 */
function MobileMenu() {
  return (
    <Popover className={cn("dropdown dropdown-end", "md:hidden")}>
      <PopoverButton className="btn btn-ghost btn-circle">
        <MenuIcon aria-hidden className="size-5" />
      </PopoverButton>
      <PopoverPanel transition>
        <ul
          className={cn(
            "dropdown-content menu w-48",
            "bg-base-100 rounded-box shadow-sm",
          )}
        >
          {links.map(_renderListItem)}
        </ul>
      </PopoverPanel>
    </Popover>
  );
}

function _renderListItem(item: MenuItem) {
  return (
    <li key={item.label}>
      {Array.isArray(item.submenu) ? (
        <details className="w-40">
          <summary>{item.label}</summary>
          <ul>{item.submenu.map(_renderListItem)}</ul>
        </details>
      ) : (
        <Link href={item.href} className="text-nowrap">
          {item.label}
        </Link>
      )}
    </li>
  );
}

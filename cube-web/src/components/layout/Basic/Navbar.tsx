import React from "react";
import { MenuIcon } from "lucide-react";

import type { CommonProps } from "./types";
import { drawerId } from "./config";
import cn from "@/utils/cn";

import LogoButton from "./LogoButton";

export interface NavbarProps extends CommonProps {}

export default function Navbar({ autoExpandDrawer }: NavbarProps) {
  return (
    <nav className="navbar bg-base-100/90 shadow-xs">
      <label
        htmlFor={drawerId}
        className={cn("btn btn-ghost btn-circle", {
          "lg:hidden": autoExpandDrawer,
        })}
      >
        <MenuIcon className="size-6" />
        <span className="sr-only">開啟菜單</span>
      </label>
      <div
        className={cn("flex items-center gap-2", {
          "lg:hidden": autoExpandDrawer,
        })}
      >
        <LogoButton />
      </div>
    </nav>
  );
}

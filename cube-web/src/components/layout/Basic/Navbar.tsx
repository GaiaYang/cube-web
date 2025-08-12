import React from "react";
import { MenuIcon } from "lucide-react";

import type { CommonProps } from "./types";
import { drawerId } from "./config";
import cn from "@/utils/cn";

import LogoButton from "./LogoButton";

export interface NavbarProps extends CommonProps {}

export default function Navbar({ autoExpandDrawer }: NavbarProps) {
  return (
    <nav
      className={cn(
        "navbar backdrop-blur",
        "bg-base-100/90 shadow-xs transition-shadow",
        "[transform:translate3d(0,0,0)] duration-100",
      )}
    >
      <label
        htmlFor={drawerId}
        className={cn("btn btn-ghost btn-circle", {
          "lg:hidden": autoExpandDrawer,
        })}
      >
        <MenuIcon className="size-6" />
        <span className="sr-only">開啟菜單</span>
      </label>
      <LogoButton
        className={cn({
          "lg:hidden": autoExpandDrawer,
        })}
      />
    </nav>
  );
}

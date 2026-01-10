import { MenuIcon } from "lucide-react";

import type { CommonProps } from "./types";
import { drawerToggleId } from "./config";
import cn from "@/utils/cn";

import LogoButton from "./LogoButton";
import ThemeToggleButton from "./ThemeButton";

export type NavbarProps = CommonProps;

export default function Navbar({ responsive }: NavbarProps) {
  return (
    <nav className="navbar">
      <label
        htmlFor={drawerToggleId}
        className={cn("btn btn-ghost btn-circle", {
          "lg:hidden": responsive,
        })}
      >
        <MenuIcon className="size-6" />
        <span className="sr-only">開啟菜單</span>
      </label>
      <LogoButton
        className={cn({
          "lg:hidden": responsive,
        })}
      />
      <div className="grow" />
      <ThemeToggleButton />
    </nav>
  );
}

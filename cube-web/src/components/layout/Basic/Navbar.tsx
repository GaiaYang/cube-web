import { MenuIcon } from "lucide-react";

import type { CommonProps } from "./types";
import { drawerToggleId } from "./config";
import cn from "@/utils/cn";

import LogoButton from "./LogoButton";
import ThemeButton from "./ThemeButton";

export type NavbarProps = CommonProps;

export default function Navbar({ autoExpandDrawer }: NavbarProps) {
  return (
    <nav className="navbar">
      <label
        htmlFor={drawerToggleId}
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
      <div className="grow" />
      <ThemeButton />
    </nav>
  );
}

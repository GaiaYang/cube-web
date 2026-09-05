import { cn } from "cn";
import { MenuIcon } from "lucide-react";

import { drawerToggleId } from "./config";
import LogoButton from "./LogoButton";
import ThemeToggleButton from "./ThemeButton";
import type { CommonProps } from "./types";

import { buttonVariants } from "@/components/daisy-ui/button";
import { Navbar as DaisyNavbar } from "@/components/daisy-ui/navbar";

export type NavbarProps = CommonProps;

export default function Navbar({ responsive }: NavbarProps) {
  return (
    <DaisyNavbar>
      <label
        htmlFor={drawerToggleId}
        className={buttonVariants({
          variant: "ghost",
          shape: "circle",
          className: cn({ "lg:hidden": responsive }),
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
    </DaisyNavbar>
  );
}

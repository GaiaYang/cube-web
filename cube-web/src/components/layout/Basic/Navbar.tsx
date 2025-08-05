import React from "react";
import { MenuIcon } from "lucide-react";

import { drawerId } from "./config";
import cn from "@/utils/cn";

import LogoButton from "./LogoButton";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100/90 shadow-xs">
      <label
        htmlFor={drawerId}
        aria-label="開啟菜單"
        className={cn("btn btn-ghost btn-circle", "lg:hidden")}
      >
        <MenuIcon className="size-6" aria-hidden />
      </label>
      <div className="flex items-center gap-2 lg:hidden">
        <LogoButton />
      </div>
    </nav>
  );
}

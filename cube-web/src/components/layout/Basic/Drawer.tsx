import React from "react";
import { XIcon } from "lucide-react";

import type { CommonProps } from "./types";
import { drawerId } from "./config";
import cn from "@/utils/cn";

import DrawerMenu from "./DrawerMenu";
import LogoButton from "./LogoButton";
import DrawerToggle from "./DrawerToggle";

export interface DrawerProps extends CommonProps {}

export default function Drawer({
  autoExpandDrawer,
  children,
}: React.PropsWithChildren<DrawerProps>) {
  return (
    <div
      className={cn(
        "drawer",
        { "lg:drawer-open": autoExpandDrawer },
        "bg-base-100 mx-auto min-h-dvh max-w-[1920px]",
      )}
    >
      <DrawerToggle />
      <div className="drawer-content">{children}</div>
      <div className={cn("drawer-side z-40", "scroll-pt-20 scroll-smooth")}>
        <label
          htmlFor={drawerId}
          aria-label="關閉菜單"
          className="drawer-overlay"
        />
        <aside aria-label="側邊導航區塊" className="bg-base-100 min-h-dvh w-80">
          <div
            className={cn(
              "navbar bg-base-100/90 shadow-xs backdrop-blur",
              "sticky top-0 z-20",
            )}
          >
            <LogoButton />
            <div className="flex-1" />
            <label
              htmlFor={drawerId}
              aria-label="關閉菜單"
              className={cn("btn btn-ghost btn-circle", {
                "lg:hidden": autoExpandDrawer,
              })}
            >
              <XIcon />
            </label>
          </div>
          <nav aria-label="主選單導覽">
            <DrawerMenu />
          </nav>
        </aside>
      </div>
    </div>
  );
}

import React from "react";

import type { CommonProps } from "./types";
import { drawerId } from "./config";
import cn from "@/utils/cn";

import LogoButton from "./LogoButton";
import DrawerMenu from "./DrawerMenu";

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
        "bg-base-100 mx-auto max-w-[1920px]",
      )}
    >
      <input id={drawerId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex min-h-screen flex-col">
        {children}
      </div>
      <div className={cn("drawer-side z-40", "scroll-pt-20 scroll-smooth")}>
        <label
          htmlFor={drawerId}
          aria-label="關閉菜單"
          className="drawer-overlay"
        />
        <aside className="bg-base-100 min-h-screen w-80">
          <div
            className={cn(
              "navbar bg-base-100/90 shadow-xs backdrop-blur",
              "sticky top-0 z-20 hidden",
              { "lg:flex": autoExpandDrawer },
            )}
          >
            <LogoButton />
          </div>
          <DrawerMenu />
        </aside>
      </div>
    </div>
  );
}

import { XIcon } from "lucide-react";

import type { CommonProps } from "./types";
import { drawerId, drawerSideId, drawerToggleId } from "./config";
import cn from "@/utils/cn";

import DrawerMenu from "./DrawerMenu";
import LogoButton from "./LogoButton";
import DrawerToggle from "./DrawerToggle";
import DrawerNavbar from "./DrawerNavbar";

export type DrawerProps = CommonProps;

export default function Drawer({
  responsive,
  children,
}: React.PropsWithChildren<DrawerProps>) {
  return (
    <div
      id={drawerId}
      className={cn(
        "drawer",
        { "lg:drawer-open": responsive },
        "bg-base-100 mx-auto min-h-dvh max-w-480",
      )}
    >
      <DrawerToggle />
      <main className="drawer-content">{children}</main>
      <div
        id={drawerSideId}
        className={cn("drawer-side z-40", "scroll-pt-20 scroll-smooth")}
      >
        <label
          htmlFor={drawerToggleId}
          aria-label="關閉菜單"
          className="drawer-overlay"
        />
        <aside aria-label="側邊導航區塊" className="bg-base-100 min-h-dvh w-80">
          <DrawerNavbar>
            <LogoButton />
            <div className="flex-1" />
            <label
              htmlFor={drawerToggleId}
              aria-label="關閉菜單"
              className={cn("btn btn-ghost btn-circle", {
                "lg:hidden": responsive,
              })}
            >
              <XIcon />
            </label>
          </DrawerNavbar>
          <nav aria-label="主選單導覽" className="mt-4">
            <DrawerMenu />
          </nav>
          <div className="bg-base-100 pointer-events-none sticky bottom-0 flex h-40 mask-[linear-gradient(transparent,#000000)]" />
        </aside>
      </div>
    </div>
  );
}

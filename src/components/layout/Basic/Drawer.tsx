import { XIcon } from "lucide-react";

import { buttonVariants } from "@/components/daisy-ui/button";
import {
  Drawer as DaisyDrawer,
  DrawerContent,
  DrawerOverlay,
  DrawerSide,
} from "@/components/daisy-ui/drawer";
import { Menu } from "@/components/daisy-ui/menu";

import { drawerId, drawerSideId, drawerToggleId } from "./config";
import DrawerMenu from "./DrawerMenu";
import DrawerNavbar from "./DrawerNavbar";
import DrawerToggle from "./DrawerToggle";
import GithubButton from "./GithubButton";
import LogoButton from "./LogoButton";
import type { CommonProps } from "./types";

export type DrawerProps = CommonProps;

export default function Drawer({
  responsive,
  children,
}: React.PropsWithChildren<DrawerProps>) {
  return (
    <DaisyDrawer
      id={drawerId}
      className={
        responsive
          ? "lg:drawer-open bg-base-100 mx-auto min-h-dvh max-w-480"
          : "bg-base-100 mx-auto min-h-dvh max-w-480"
      }
    >
      <DrawerToggle />
      <DrawerContent>{children}</DrawerContent>
      <DrawerSide id={drawerSideId} className="z-40 scroll-pt-20 scroll-smooth">
        <DrawerOverlay htmlFor={drawerToggleId} aria-label="關閉菜單" />
        <aside aria-label="側邊導航區塊" className="bg-base-100 min-h-dvh w-72">
          <DrawerNavbar>
            <LogoButton />
            <div className="flex-1" />
            <label
              htmlFor={drawerToggleId}
              aria-label="關閉菜單"
              className={buttonVariants({
                variant: "ghost",
                shape: "circle",
                className: responsive ? "lg:hidden" : undefined,
              })}
            >
              <XIcon />
            </label>
          </DrawerNavbar>
          <nav aria-label="主選單導覽" className="mt-4">
            <DrawerMenu />
          </nav>
          <div className="px-4">
            <div className="bg-base-content/10 mx-4 my-2 h-px" />
          </div>
          <Menu horizontal className="w-full px-4 py-0">
            <li>
              <GithubButton />
            </li>
          </Menu>
          <div className="bg-base-100 pointer-events-none sticky bottom-0 flex h-40 mask-[linear-gradient(transparent,#000000)]" />
        </aside>
      </DrawerSide>
    </DaisyDrawer>
  );
}

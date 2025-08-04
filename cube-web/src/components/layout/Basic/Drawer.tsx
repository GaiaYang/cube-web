import { XIcon } from "lucide-react";
import React from "react";
import MobileMenu from "./menu/MobileMenu";

import { drawerId } from "./config";

export interface DrawerProps {}

export default function Drawer({
  children,
}: React.PropsWithChildren<DrawerProps>) {
  return (
    <div className="drawer drawer-end min-h-screen">
      <input
        id={drawerId}
        type="checkbox"
        className="drawer-toggle"
        aria-label="行動版菜單開關"
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side z-20">
        <label
          htmlFor={drawerId}
          aria-label="背景關閉行動版菜單"
          className="drawer-overlay"
        />
        <DrawerContent id={drawerId}>
          <MobileMenu />
        </DrawerContent>
      </div>
    </div>
  );
}

function DrawerContent({
  id,
  children,
}: React.PropsWithChildren<{ id: string }>) {
  return (
    <div className="bg-base-100 h-full w-60">
      <div className="navbar justify-end">
        <label
          htmlFor={id}
          aria-label="關閉行動版菜單"
          className="btn btn-circle"
        >
          <XIcon className="size-6" />
        </label>
      </div>
      {children}
    </div>
  );
}

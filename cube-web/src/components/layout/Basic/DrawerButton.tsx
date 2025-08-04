import React from "react";
import { MenuIcon } from "lucide-react";

import { drawerId } from "./config";
import cn from "@/utils/cn";

export default function DrawerButton() {
  return (
    <label
      aria-label="開啟行動版菜單"
      htmlFor={drawerId}
      className={cn("btn btn-ghost btn-circle", "md:hidden")}
    >
      <MenuIcon className="size-6" />
    </label>
  );
}

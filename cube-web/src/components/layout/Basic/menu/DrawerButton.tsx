"use client";

import React from "react";
import { MenuIcon } from "lucide-react";

import { drawerId } from "../config";
import cn from "@/utils/cn";

export default function DrawerButton() {
  return (
    <button
      type="button"
      onClick={() => {
        document.getElementById(drawerId)?.click();
      }}
      className={cn("btn btn-ghost btn-circle", "md:hidden")}
    >
      <MenuIcon className="size-6" />
    </button>
  );
}

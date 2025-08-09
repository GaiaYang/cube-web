"use client";

import React from "react";

import { options, drawerId } from "./config";

import MenuTree from "@/components/MenuTree";

export default function DrawerMenu() {
  return <MenuTree options={options} onLinkClick={closeDrawer} />;
}

/** 點擊後關閉抽屜 */
function closeDrawer() {
  const drawer = document.getElementById(drawerId) as HTMLInputElement | null;
  if (drawer) {
    drawer.checked = false;
  }
}

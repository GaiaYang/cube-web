import React from "react";

import { options, drawerMenuId } from "./config";

import MenuTree from "@/components/MenuTree";

export default function DrawerMenu() {
  return <MenuTree id={drawerMenuId} options={options} className="px-4 py-0" />;
}

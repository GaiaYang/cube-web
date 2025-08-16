import React from "react";

import { drawerMenuId } from "./config";
import { drawerMenu } from "@/contents/menu";

import MenuTree from "@/components/MenuTree";

export default function DrawerMenu() {
  return (
    <MenuTree id={drawerMenuId} options={drawerMenu} className="px-4 py-0" />
  );
}

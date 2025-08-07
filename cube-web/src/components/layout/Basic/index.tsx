import React from "react";

import type { CommonProps } from "./types";

import Navbar from "./Navbar";
import Header from "./Header";
import Drawer, { type DrawerProps } from "./Drawer";

export interface BasicLayoutProps extends CommonProps, DrawerProps {}

export default function BasicLayout({
  autoExpandDrawer = true,
  children,
}: React.PropsWithChildren<BasicLayoutProps>) {
  return (
    <Drawer autoExpandDrawer={autoExpandDrawer}>
      <Header>
        <Navbar autoExpandDrawer={autoExpandDrawer} />
      </Header>
      {children}
    </Drawer>
  );
}

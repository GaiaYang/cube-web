import React from "react";

import { drawerId } from "./config";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Drawer from "./Drawer";
import { DrawerMenu } from "./menu/MobileMenu";

export default function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10">
          <Navbar />
        </header>
        <Drawer id={drawerId} renderSide={<DrawerMenu />}>
          <div className="flex flex-1 flex-col">{children}</div>
        </Drawer>
      </div>
      <Footer />
    </>
  );
}

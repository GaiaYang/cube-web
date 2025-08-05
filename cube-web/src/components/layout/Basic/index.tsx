import React from "react";

import Navbar from "./Navbar";
import Header from "./Header";
import Drawer from "./Drawer";

export default function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Drawer>
        <Header>
          <Navbar />
        </Header>
        {children}
      </Drawer>
    </>
  );
}

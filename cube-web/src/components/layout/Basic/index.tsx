import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Drawer from "./Drawer";

export default function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Drawer>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-10">
            <Navbar />
          </header>
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
      </Drawer>
      <Footer />
    </>
  );
}

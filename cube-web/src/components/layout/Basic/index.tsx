import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex-1">
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10">
          <Navbar />
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

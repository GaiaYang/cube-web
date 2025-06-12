import Link from "next/link";
import React from "react";

import DesktopMenu from "./menu/DesktopMenu";
import DrawerButton from "./menu/DrawerButton";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          首頁
        </Link>
      </div>
      <div className="navbar-center">
        <DesktopMenu />
      </div>
      <div className="navbar-end">
        <DrawerButton />
      </div>
    </nav>
  );
}

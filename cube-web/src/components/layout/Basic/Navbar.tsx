import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <Link href="/" className="btn btn-ghost text-xl">
        首頁
      </Link>
    </nav>
  );
}

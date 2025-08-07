import React from "react";
import Link from "next/link";

import cn from "@/utils/cn";

import BackButton from "./components/BackButton";

export default function NotFound() {
  return (
    <main
      className={cn(
        "bg-base-100 h-dvh",
        "flex flex-col justify-center",
        "px-6 lg:px-8",
        "py-24 sm:py-32",
      )}
    >
      <div className="text-center">
        <p className="text-primary text-base font-semibold">404</p>
        <h1
          className={cn(
            "text-base-content mt-4 font-semibold tracking-tight text-balance",
            "text-5xl sm:text-7xl",
          )}
        >
          找不到頁面
        </h1>
        <p
          className={cn(
            "text-base-content/60 mt-6 font-medium text-pretty",
            "text-lg sm:text-xl/8",
          )}
        >
          抱歉，我們找不到您要找的頁面。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" replace className="btn btn-primary">
            回到首頁
          </Link>
          <BackButton />
        </div>
      </div>
    </main>
  );
}

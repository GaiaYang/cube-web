import React from "react";

import cn from "@/utils/cn";

import Link from "next/link";
import BasicLayout from "@/components/layout/Basic";

export default function NotFound() {
  return (
    <BasicLayout>
      <main
        className={cn(
          "bg-base-100",
          "flex flex-1 flex-col justify-center",
          "px-6 lg:px-8",
          "py-24 sm:py-32",
        )}
      >
        <div className="text-center">
          <p className="text-primary text-base font-semibold">404</p>
          <h1 className="text-base-content mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            找不到頁面
          </h1>
          <p className="text-base-content/50 mt-6 text-lg font-medium text-pretty sm:text-xl/8">
            抱歉，我們找不到您要找的頁面。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/" replace className="btn btn-primary">
              回到首頁
            </Link>
          </div>
        </div>
      </main>
    </BasicLayout>
  );
}

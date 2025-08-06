import React from "react";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";

import cn from "@/utils/cn";

import BasicLayout from "@/components/layout/Basic";

export default function Home() {
  return (
    <BasicLayout autoExpandDrawer={false}>
      <main
        className={cn(
          "flex flex-1 flex-col justify-center",
          "mx-auto max-w-2xl lg:text-center",
          "px-6 lg:px-8",
        )}
      >
        <h2 className="text-primary text-base/7 font-semibold">
          專為想邁向進階的玩家設計的教學資源
        </h2>
        <h1
          className={cn(
            "text-4xl sm:text-5xl",
            "text-pretty lg:text-balance",
            "text-base-content mt-2 font-semibold tracking-tight",
          )}
        >
          三階魔術方塊速解教學網站
        </h1>
        <p className="text-base-content/70 mt-6 text-lg/8">
          針對已能還原三階魔術方塊的你，提供系統化的速解教學與公式查詢，從基礎觀念到進階技巧，全面提升還原效率與理解力。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/tutorial/333"
            className="btn btn-primary btn-lg group rounded-full"
          >
            開始速解
            <MoveRightIcon className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/algs/333" className="btn btn-lg rounded-full">
            公式查詢
          </Link>
        </div>
      </main>
    </BasicLayout>
  );
}

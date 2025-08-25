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
          "mx-auto min-h-[calc(100dvh-4rem)] max-w-2xl text-center",
          "px-6 lg:px-8",
        )}
      >
        <h2 className="text-primary mb-2 text-base/7 font-semibold">
          專為速解玩家設計的魔術方塊教學與資源
        </h2>
        <h1
          className={cn(
            "text-5xl sm:text-7xl",
            "text-base-content",
            "font-semibold tracking-tight text-balance",
          )}
        >
          虛空魔方
        </h1>
        <p
          className={cn(
            "text-lg sm:text-xl/8",
            "text-base-content/70 mt-8 font-medium text-pretty",
          )}
        >
          分享作者邁向速解進階的教學與心法，提供系統化解法、觀念解析與實用公式查詢，協助你突破瓶頸、提升效率與理解力。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/tutorial/333/cfop"
            className="btn btn-primary md:btn-lg group rounded-full"
          >
            開始速解
            <MoveRightIcon className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/algs/333" className="btn md:btn-lg rounded-full">
            公式查詢
          </Link>
        </div>
      </main>
    </BasicLayout>
  );
}

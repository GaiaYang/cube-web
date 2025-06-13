import React from "react";

import cn from "@/utils/cn";

import BasicLayout from "@/components/layout/Basic";

export default function Home() {
  return (
    <BasicLayout>
      <main
        className={cn(
          "mx-auto max-w-3xl items-center text-center",
          "flex flex-1 flex-col justify-center gap-8",
          "px-6 lg:px-8",
          "py-8 sm:py-12 lg:py-14",
        )}
      >
        <p
          className={cn(
            "text-base-content/70 relative rounded-2xl px-3 py-1 text-sm/6",
            "ring-1 ring-gray-900/10 hover:ring-gray-900/20",
          )}
        >
          網站內容涵蓋公式整理、進階觀念解析以及輔助訓練的工具，協助你更系統化地提升速度與理解。
        </p>
        <h1
          className={cn(
            "text-base-content font-semibold tracking-tight text-balance",
            "text-5xl sm:text-6xl md:text-7xl",
          )}
        >
          一個魔方愛好者的網站
        </h1>
        <p
          className={cn(
            "text-base-content/60 font-medium text-pretty",
            "text-lg sm:text-xl/8",
          )}
        >
          <span>這裡是為三階魔方進階玩家打造的教學平台，分享從</span>
          <Highlight>LBL 解法平均 40 秒</Highlight>
          一路精進到
          <Highlight>CFOP平均 14秒</Highlight>
          <span>的心路歷程與實用技巧。</span>
        </p>
      </main>
    </BasicLayout>
  );
}

function Highlight({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>) {
  return (
    <span
      className={cn(
        "badge badge-soft badge-primary mx-1",
        "badge-lg sm:badge-xl",
      )}
    >
      {children}
    </span>
  );
}

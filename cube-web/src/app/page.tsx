import React from "react";

import cn from "@/utils/cn";

import BasicLayout from "@/components/layout/Basic";
import FullHeightLayout from "@/components/layout/FullHeight";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <FullHeightLayout>
      <BasicLayout>
        <main
          className={cn(
            "mx-auto max-w-3xl text-center",
            "flex flex-1 flex-col justify-center gap-8",
            "px-6 lg:px-8",
            "py-8 sm:py-12 lg:py-14",
          )}
        >
          <div className="text-base-content/70 relative rounded-full px-3 py-1 text-sm/6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            網站內容涵蓋公式整理、進階觀念解析以及輔助訓練的工具，協助你更系統化地提升速度與理解。
          </div>
          <h1 className="text-base-content text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            一個魔方愛好者的網站
          </h1>
          <p className="text-base-content/60 text-lg font-medium text-pretty sm:text-xl/8">
            <span>這裡是為三階魔方進階玩家打造的教學平台，分享從</span>
            <Highlight>LBL 解法平均 40 秒</Highlight>
            一路精進到
            <Highlight>CFOP平均 14秒</Highlight>
            <span>的心路歷程與實用技巧。</span>
          </p>
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <CTASection />
          </div>
        </main>
      </BasicLayout>
    </FullHeightLayout>
  );
}

function Highlight({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>) {
  return (
    <span className="badge badge-soft badge-primary badge-lg sm:badge-xl mx-1">
      {children}
    </span>
  );
}

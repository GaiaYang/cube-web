import Link from "next/link";
import { InfoIcon, MoveRightIcon } from "lucide-react";

import cn from "@/utils/cn";

import BasicLayout from "@/components/layout/Basic";

export default function Home() {
  return (
    <BasicLayout responsive={false}>
      <main
        className={cn(
          "flex flex-1 flex-col justify-center",
          "mx-auto min-h-[calc(100dvh-4rem)] max-w-2xl text-center",
          "px-6 lg:px-8",
          "py-8",
        )}
      >
        <div>
          <h2 className="text-primary mb-2 text-base/7 font-semibold">
            一個喜歡魔術方塊的前端程式設計師
          </h2>
          <h1
            className={cn(
              "text-5xl sm:text-7xl",
              "text-base-content",
              "font-semibold tracking-tight text-balance",
            )}
          >
            Void Cube
          </h1>
          <p
            className={cn(
              "text-lg sm:text-xl/8",
              "text-base-content/70 mt-8 font-medium text-pretty",
            )}
          >
            提供教學、工具及作者的觀念，不用艱深的技巧跟高價的魔術方塊，即使手速跟反應都不夠快也能在15秒內復原完成。
          </p>
        </div>
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
        <div
          role="alert"
          className="alert alert-info alert-dash mt-10 self-center text-sm"
        >
          <InfoIcon />
          <span>因作者健康因素，此網站極度緩慢且不定時更新，請見諒。</span>
        </div>
      </main>
    </BasicLayout>
  );
}

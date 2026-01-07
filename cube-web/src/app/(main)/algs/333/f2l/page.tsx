import { Suspense } from "react";
import { type Metadata } from "next";

import { SITE_URL } from "@/lib/config";

import Article from "@/components/Article";
import FilterPanel from "./components/FilterPanel";
import Cases from "./components/Cases";

export const metadata: Metadata = {
  title: "F2L 公式列表",
  description:
    "將指定邊塊與角塊移動到正確位置，每一組會因為位置不同而有四種變體，本頁只列出位於頂層以及目標槽位的案例，共有 41 種情況。",
  alternates: { canonical: `${SITE_URL}/algs/333/f2l` },
};

export default function Page() {
  return (
    <Article>
      <h1>F2L 公式列表</h1>
      <p>
        將指定邊塊與角塊移動到正確位置，每一組會因為位置不同而有四種變體，
        這裡只列出位於頂層以及目標槽位的案例，共有 41 種情況。
      </p>
      <div className="not-prose mt-8 grid gap-6">
        <h2 className="sr-only">搜尋列</h2>
        <Suspense>
          <FilterPanel />
        </Suspense>
        <h2 className="sr-only">公式列表</h2>
        <Suspense>
          <Cases />
        </Suspense>
      </div>
    </Article>
  );
}

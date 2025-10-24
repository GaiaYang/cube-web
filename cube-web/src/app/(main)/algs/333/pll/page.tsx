import { Suspense } from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import FilterPanel from "./components/FilterPanel";
import Cases from "./components/Cases";

export const metadata: Metadata = {
  title: "PLL 公式列表",
  description:
    "PLL（Permutation of the Last Layer）是CFOP的第四個也是最後一個步驟，目標是排列最後一層的所有方塊使其復原，共 21 種情況。。",
  alternates: { canonical: "/algs/333/pll" },
};

export default function Page() {
  return (
    <Article>
      <h1>PLL 公式列表</h1>
      <p>歸位最後一層的所有方塊，這個步驟完全依靠公式處理，共有 21 種情況。</p>
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

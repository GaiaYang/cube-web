import React, { Suspense } from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";
import FilterPanel from "./components/FilterPanel";
import Algorithms from "./components/Algorithms";

export const metadata: Metadata = {
  title: "PLL 公式列表",
  description:
    "PLL（Permutation of the Last Layer）是 CFOP 的第四個也是最後一個步驟，目標是排列最後一層的所有方塊使其復原。",
  alternates: { canonical: "/algs/333/pll" },
};

export default function Page() {
  return (
    <main>
      <ContentContainer>
        <ContentSection
          title="PLL 公式列表"
          description="歸位最後一層的所有方塊，這個步驟完全依靠公式處理，共有 21 種情況。"
          eyebrow="Permutation of the Last Layer"
        />
        <h2 className="sr-only">搜尋列</h2>
        <Suspense>
          <FilterPanel />
        </Suspense>
        <h2 className="sr-only">公式列表</h2>
        <Suspense>
          <Algorithms />
        </Suspense>
      </ContentContainer>
    </main>
  );
}

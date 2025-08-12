import React, { Suspense } from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ui/ContentSection";
import ContentContainer from "@/components/ui/ContentContainer";
import FilterPanel from "./components/FilterPanel";
import Cases from "./components/Cases";

export const metadata: Metadata = {
  title: "F2L 公式列表",
  description:
    "將指定邊塊與角塊移動到正確位置，每一組會因為位置不同而有四種變體。",
  alternates: { canonical: "/algs/333/f2l" },
};

export default function Page() {
  return (
    <ContentContainer>
      <ContentSection
        title="F2L 公式列表"
        description="將指定邊塊與角塊移動到正確位置，每一組會因為位置不同而有四種變體，這裡只列出位於頂層以及目標槽位的案例，共有 41 種情況。"
        eyebrow="First Two Layers"
      />
      <h2 className="sr-only">搜尋列</h2>
      <Suspense>
        <FilterPanel />
      </Suspense>
      <h2 className="sr-only">公式列表</h2>
      <Suspense>
        <Cases />
      </Suspense>
    </ContentContainer>
  );
}

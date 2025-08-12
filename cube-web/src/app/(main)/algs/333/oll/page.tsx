import React, { Suspense } from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ui/ContentSection";
import ContentContainer from "@/components/ui/ContentContainer";
import FilterPanel from "./components/FilterPanel";
import Cases from "./components/Cases";

export const metadata: Metadata = {
  title: "OLL 公式列表",
  description:
    "將頂層方塊朝向正確方向，這個步驟完全依靠公式處理，共有 57 種情況。",
  alternates: { canonical: "/algs/333/oll" },
};

export default function Page() {
  return (
    <ContentContainer>
      <ContentSection
        title="OLL 公式列表"
        description="將頂層方塊朝向正確方向，這個步驟完全依靠公式處理，共有 57 種情況。"
        eyebrow="Orientation of the Last Layer"
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

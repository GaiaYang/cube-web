import React, { Suspense } from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";
import FilterPanel from "./components/FilterPanel";
import Algorithms from "./components/Algorithms";

export const metadata: Metadata = {
  title: "OLL 公式列表",
  description:
    "將頂層方塊朝向正確方向，這個步驟完全依靠公式處理，共有 57 種情況。",
};

export default function Page() {
  return (
    <main>
      <ContentContainer className="grid gap-6 xl:gap-8">
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
          <Algorithms />
        </Suspense>
      </ContentContainer>
    </main>
  );
}

import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";

export const metadata: Metadata = {
  title: "OLL",
  description:
    "PLL（Permutation of the Last Layer）是 CFOP 的第四個也是最後一個步驟，目標是排列最後一層的所有方塊使其復原。",
};

export default function Page() {
  return (
    <main>
      <ContentContainer>
        <ContentSection
          title="PLL"
          description="PLL 是 CFOP 的第四個也是最後一個步驟，目標是排列最後一層的所有方塊使其復原。"
          eyebrow="Permutation of the Last Layer"
        />
      </ContentContainer>
    </main>
  );
}

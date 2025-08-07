import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";

export const metadata: Metadata = {
  title: "OLL",
  description:
    "OLL（Orientation of the Last Layer）是 CFOP 的第三個步驟，目標是將頂層方塊朝向正確方向。",
};

export default function Page() {
  return (
    <main>
      <ContentContainer>
        <ContentSection
          title="OLL"
          description="OLL 是 CFOP 的第三個步驟，目標是將頂層方塊朝向正確方向。"
          eyebrow="Orientation of the Last Layer"
        />
      </ContentContainer>
    </main>
  );
}

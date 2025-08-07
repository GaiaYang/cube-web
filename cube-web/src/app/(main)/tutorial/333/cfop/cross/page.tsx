import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";

export const metadata: Metadata = {
  title: "Cross",
  description:
    "底部十字（Cross）是 CFOP 的第一個步驟，這個階段的目標是在魔術方塊底部形成一個十字，其中每個底層的邊塊都必須同時對齊與之相鄰的兩個面顏色。",
};

export default function Page() {
  return (
    <main>
      <ContentContainer>
        <ContentSection
          title="底部十字"
          description="底部十字是 CFOP 的第一個步驟，這個階段的目標是在魔術方塊底部形成一個十字，其中每個底層的邊塊都必須同時對齊與之相鄰的兩個面顏色。"
          eyebrow="Cross"
        />
      </ContentContainer>
    </main>
  );
}

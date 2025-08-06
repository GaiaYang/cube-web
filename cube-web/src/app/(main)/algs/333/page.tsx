import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";

export const metadata: Metadata = {
  title: "三階公式總覽",
  description: "三階魔術方塊的所有公式總覽。",
};

export default function Page() {
  return (
    <main>
      <ContentContainer>
        <ContentSection
          title="三階公式總覽"
          description="這裡是三階魔術方塊的所有公式總覽。"
        />
      </ContentContainer>
    </main>
  );
}

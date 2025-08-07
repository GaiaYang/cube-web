import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";

export const metadata: Metadata = {
  title: "公式總覽",
  description: "依照項目分類本站收入的所有公式總覽。",
};

export default function Page() {
  return (
    <main>
      <ContentContainer>
        <ContentSection
          title="公式總覽"
          description="依照項目分類本站收入的所有公式總覽。"
        />
      </ContentContainer>
    </main>
  );
}

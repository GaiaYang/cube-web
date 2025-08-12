import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ui/ContentSection";
import ContentContainer from "@/components/ui/ContentContainer";

export const metadata: Metadata = {
  title: "公式總覽",
  description: "依照項目分類本站收入的所有公式總覽。",
  alternates: { canonical: "/algs" },
};

export default function Page() {
  return (
    <ContentContainer>
      <ContentSection
        title="公式總覽"
        description="依照項目分類本站收入的所有公式總覽。"
      />
    </ContentContainer>
  );
}

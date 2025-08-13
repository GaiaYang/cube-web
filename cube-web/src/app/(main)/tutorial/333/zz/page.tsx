import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ui/ContentSection";
import ContentContainer from "@/components/ui/ContentContainer";

export const metadata: Metadata = {
  title: "ZZ Method",
  description: "ZZ Method 是 CFOP 的變體速解方法，適合用來理解方塊色相的方法。",
  alternates: { canonical: "/tutorial/333/cfop" },
};

export default function Page() {
  return (
    <ContentContainer>
      <ContentSection
        title="ZZ Method"
        description="ZZ Method 是 CFOP 的變體速解方法，最大的特色就是利用色相來讓 F2L 可以在不翻面也不動用到F層的情況復原，適合用來理解方塊色相的方法。"
        eyebrow="Zbigniew Zborowski Method"
      />
    </ContentContainer>
  );
}

import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ui/ContentSection";
import ContentContainer from "@/components/ui/ContentContainer";

export const metadata: Metadata = {
  title: "ZBLS 公式列表",
  description:
    "ZBLS（Zborowski-Bruchem Last Slot）是 F2L 的進階公式，完成最後一組 F2L 的時候必定上頂面為十字。",
  alternates: { canonical: "/algs/333/zbls" },
};

export default function Page() {
  return (
    <ContentContainer>
      <ContentSection
        title="ZBLS 公式列表"
        description="完成最後一組 F2L 的時候可以讓頂面必定為十字，通常會搭配 ZBLL ，共有 305 種情況。"
        eyebrow="Zborowski-Bruchem Last Slot"
      />
    </ContentContainer>
  );
}

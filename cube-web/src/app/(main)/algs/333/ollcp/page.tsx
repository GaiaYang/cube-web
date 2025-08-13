import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ui/ContentSection";
import ContentContainer from "@/components/ui/ContentContainer";

export const metadata: Metadata = {
  title: "OLLCP 公式列表",
  description:
    "OLLCP（Orientation of the Last Layer and Corner Permutation）是 OLL 的進階公式，完成頂面的同時所有角塊歸位。",
  alternates: { canonical: "/algs/333/pll" },
};

export default function Page() {
  return (
    <ContentContainer>
      <ContentSection
        title="OLLCP 公式列表"
        description="OLL 的進階公式，完成頂面的時候所有角塊歸位，部分玩家會學一些簡單的使用，共有 342 種情況。"
        eyebrow="Orientation of the Last Layer and Corner Permutation"
      />
    </ContentContainer>
  );
}

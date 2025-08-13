import React from "react";
import { type Metadata } from "next";

import ContentSection from "@/components/ui/ContentSection";
import ContentContainer from "@/components/ui/ContentContainer";

export const metadata: Metadata = {
  title: "ZBLL 公式列表",
  description:
    "ZBLL（Zborowski-Bruchem Last Layer）是 OLL 的進階公式，當頂面為十字型的時候可以直接跳過 PLL 完全復原方塊。",
  alternates: { canonical: "/algs/333/pll" },
};

export default function Page() {
  return (
    <ContentContainer>
      <ContentSection
        title="ZBLL 公式列表"
        description="當最後一層為十字的時候，可以直接跳過 PLL 直接復原方塊，共有 493 種情況。"
        eyebrow="Zborowski-Bruchem Last Layer"
      />
    </ContentContainer>
  );
}

import React from "react";
import { type Metadata } from "next";

import HeaderSection from "@/components/HeaderSection";

export const metadata: Metadata = {
  title: "F2L 公式列表",
  description:
    "F2L（First Two Layers） 是 CFOP 的第二個步驟，目標是還原 3x3 魔術方塊的底部前兩層。",
};

export default function Page() {
  return (
    <main>
      <HeaderSection
        title="F2L 公式列表"
        description="將指定邊塊與角塊移動到正確位置，每一組會因為位置不同而有四種變體，這裡只列出位於頂層以及目標槽位的案例，共有 41 條公式。"
        eyebrow="First Two Layers"
      />
    </main>
  );
}

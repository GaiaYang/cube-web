import React from "react";
import { type Metadata } from "next";

import Article from "@/components/ui/Article";

export const metadata: Metadata = {
  title: "OLL",
  description:
    "OLL（Orientation of the Last Layer）是 CFOP 的第三個步驟，目標是將頂層方塊朝向正確方向。",
  alternates: { canonical: "/tutorial/333/cfop/oll" },
};

export default function Page() {
  return (
    <Article>
      <h1>OLL</h1>
      <p>OLL 是 CFOP 的第三個步驟，目標是將頂層方塊朝向正確方向。</p>
    </Article>
  );
}

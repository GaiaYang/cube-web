import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";

export const metadata: Metadata = {
  title: "OLL",
  description:
    "PLL（Permutation of the Last Layer）是 CFOP 的第四個也是最後一個步驟，目標是排列最後一層的所有方塊使其復原。",
  alternates: { canonical: "/tutorial/333/cfop/pll" },
};

export default function Page() {
  return (
    <main>
      <Article>
        <h1>PLL</h1>
        <p>
          PLL 是 CFOP
          的第四個也是最後一個步驟，目標是排列最後一層的所有方塊使其復原。
        </p>
      </Article>
    </main>
  );
}

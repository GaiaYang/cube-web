import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";

export const metadata: Metadata = {
  title: "ZBLL公式列表",
  description:
    "ZBLL（Zborowski-Bruchem Last Layer）是OLL的進階公式，當頂面為十字型的時候可以直接跳過PLL完全復原方塊。",
  alternates: { canonical: "/algs/333/zbll" },
};

export default function Page() {
  return (
    <Article>
      <h1>ZBLL公式列表</h1>
      <p>
        當最後一層為十字的時候，可以直接跳過PLL直接復原方塊，共有493種情況。
      </p>
    </Article>
  );
}

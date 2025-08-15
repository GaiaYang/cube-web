import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";

export const metadata: Metadata = {
  title: "OLLCP公式列表",
  description:
    "OLLCP（Orientation of the Last Layer and Corner Permutation）是OLL的進階公式，完成頂面的同時所有角塊歸位。",
  alternates: { canonical: "/algs/333/ollcp" },
};

export default function Page() {
  return (
    <Article>
      <h1>OLLCP公式列表</h1>
      <p>
        OLL的進階公式，完成頂面的時候所有角塊歸位，部分玩家會學一些簡單的使用，共有342種情況。
      </p>
    </Article>
  );
}

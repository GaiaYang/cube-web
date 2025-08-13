import React from "react";
import { type Metadata } from "next";

import Article from "@/components/ui/Article";
import Link from "next/link";

export const metadata: Metadata = {
  title: "F2L",
  description:
    "F2L（First Two Layers） 是 CFOP 的第二個步驟，目標是還原 3x3 魔術方塊的底部前兩層。",
  alternates: { canonical: "/tutorial/333/cfop/f2l" },
};

export default function Page() {
  return (
    <Article>
      <h1>F2L</h1>
      <p>F2L 是 CFOP 的第二個步驟，目標是還原 3x3 魔術方塊的底部前兩層。</p>
      <h2>重點提醒</h2>
      <p>
        四向 F2L 幾乎沒有必要學，很堅持不翻面的玩家請左轉出去
        <Link href="/tutorial/333/zz">ZZ Method</Link>
      </p>
    </Article>
  );
}

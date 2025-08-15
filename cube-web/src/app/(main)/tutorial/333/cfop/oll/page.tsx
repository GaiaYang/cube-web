import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OLL",
  description:
    "OLL（Orientation of the Last Layer）是CFOP的第三個步驟，目標是將頂層方塊朝向正確方向。",
  alternates: { canonical: "/tutorial/333/cfop/oll" },
};

export default function Page() {
  return (
    <Article>
      <h1>OLL</h1>
      <p>OLL是CFOP的第三個步驟，目標是將頂層方塊朝向正確方向。</p>
      <p>
        {[
          "這部分有57條公式",
          "也是整個CFOP中公式佔比最多的步驟",
          "不過我們可以透過分類來記憶",
          "因為作者本人是左右開弓",
          "所以這裡會用到大量的鏡像公式",
          "會挑選方便好做的公式直接鏡像到另一隻手。",
        ].join("，")}
      </p>
      <h2>十字</h2>
      <p>這裡為兩段式OLL要先學的公式，十字的情況復原簡單且順手。</p>
      <blockquote>
        衍生出進階公式子集
        <Link href="/algs/333/zbll" target="_blank">
          ZBLL
        </Link>
        ，不過只有極少數人使用，一般玩家沒必要學。
      </blockquote>
      <blockquote>
        如果你是使用<Link href="/tutorial/333/zz">ZZ Method</Link>
        則最後一層必定為十字。
      </blockquote>
    </Article>
  );
}

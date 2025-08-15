import React from "react";
import { type Metadata } from "next";

import Article from "@/components/ui/Article";
import ExternalLink from "@/components/ExternalLink";

import CubeMoveStructure from "./components/CubeMoveStructure";

export const metadata: Metadata = {
  title: "轉動代號結構",
  description: "轉動代號的結構詳細說明。",
  alternates: { canonical: "/tutorial/notation/structure" },
};

export default function Page() {
  return (
    <Article>
      <h1>轉動代號結構</h1>
      <p>這裡提供轉動代號的結構詳細說明，搭配互動元素讓你更輕鬆了解。</p>
      <h2>基本說明</h2>
      <p>轉動代號最多四個部分組成</p>
      <ol>
        <li>層數</li>
        <li>代號</li>
        <li>次數</li>
        <li>方向</li>
      </ol>
      <p>
        基礎說明請前往
        <ExternalLink href="/tutorial/notation">代號說明</ExternalLink>
        ，這裡只做結構說明
      </p>
      <h2 className="sr-only">教學組件</h2>
      <CubeMoveStructure />
    </Article>
  );
}

import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import ExternalLink from "@/components/ExternalLink";

export const metadata: Metadata = {
  title: "轉動代號結構",
  description:
    "詳細解析魔術方塊轉動代號的結構，幫助你理解每個部分的意義與作用。",
  alternates: { canonical: "/tutorial/notation/structure" },
};

export default function Page() {
  return (
    <Article>
      <h1>轉動代號結構</h1>
      <p>
        本頁將詳細介紹魔術方塊公式中轉動代號的結構，搭配互動元素，幫助你更直觀地理解每個步驟。
      </p>
      <h2>基本說明</h2>
      <p>一個轉動代號通常由最多四個部分組成：</p>
      <ol>
        <li>層數</li>
        <li>代號</li>
        <li>次數</li>
        <li>方向</li>
      </ol>
      <p>
        若想了解每個代號的詳細意義，請前往
        <ExternalLink href="/tutorial/notation">代號說明</ExternalLink>
        ，本頁專注於結構解析。
      </p>
      <h2 className="sr-only">教學組件</h2>
    </Article>
  );
}

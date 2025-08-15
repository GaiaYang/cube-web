import React from "react";
import { type Metadata } from "next";
import { CircleAlertIcon } from "lucide-react";

import Article from "@/components/Article";
import ExternalLink from "@/components/ExternalLink";

export const metadata: Metadata = {
  title: "F2L",
  description:
    "F2L（First Two Layers） 是CFOP的第二個步驟，目標是還原3x3魔術方塊的底部前兩層。",
  alternates: { canonical: "/tutorial/333/cfop/f2l" },
};

export default function Page() {
  return (
    <Article>
      <h1>F2L</h1>
      <p>F2L是CFOP的第二個步驟，目標是還原3x3魔術方塊的底部前兩層。</p>
      <h2>重點提醒</h2>
      <blockquote className="alert alert-warning not-italic">
        <CircleAlertIcon />
        <span>
          四向F2L幾乎沒有必要學，很堅持不翻面的玩家請左轉出去
          <ExternalLink href="/tutorial/333/zz" className="text-[inherit]">
            ZZ Method
          </ExternalLink>
          ，本教學會適當的教部分簡單直覺實用的四項入槽。
        </span>
      </blockquote>
    </Article>
  );
}

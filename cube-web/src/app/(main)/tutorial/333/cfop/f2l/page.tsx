import React from "react";
import { type Metadata } from "next";
import { CircleAlertIcon } from "lucide-react";

import Article from "@/components/Article";
import ExternalLink from "@/components/ExternalLink";
import UnderConstruction from "@/components/notices/UnderConstruction";

export const metadata: Metadata = {
  title: "F2L",
  description:
    "F2L（First Two Layers）是 CFOP 的第二步，目標還原 3x3 魔術方塊的底部前兩層，提供實用入槽策略與教學。",
  alternates: { canonical: "/tutorial/333/cfop/f2l" },
};

export default function Page() {
  return (
    <Article>
      <h1>F2L</h1>
      <p>
        F2L（First Two Layers）是 CFOP 的第二個步驟，目標是還原 3x3
        魔術方塊的底部前兩層。
      </p>
      <h2>重點提醒</h2>
      <blockquote className="alert not-italic">
        <CircleAlertIcon />
        <span>
          四向F2L幾乎沒有必要學， 很堅持不翻面的玩家請左轉出去{" "}
          <ExternalLink href="/tutorial/333/zz" className="text-[inherit]">
            ZZ Method
          </ExternalLink>{" "}
          ，本教學會適當的教部分簡單直覺實用的四項入槽。
        </span>
      </blockquote>
      <UnderConstruction />
    </Article>
  );
}

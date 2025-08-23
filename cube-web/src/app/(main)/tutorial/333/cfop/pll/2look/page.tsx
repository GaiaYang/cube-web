import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import Notices from "@/components/Notices";

export const metadata: Metadata = {
  title: "兩段式 PLL",
  description:
    "將 PLL 分為兩個階段復原，顯著減少公式數量與判斷難度，適合初學者入門。",
  alternates: { canonical: "/tutorial/333/cfop/pll/2look" },
};

export default function Page() {
  return (
    <Article>
      <h1>兩段式PLL</h1>
      <p>
        兩段式 PLL
        將頂層復原分成兩個階段，顯著減少需要記憶的公式數量與判斷難度。
      </p>
      <Notices type="under-construction" />
      <h2>步驟說明</h2>
      <ol>
        <li>先歸位角塊，使頂層只剩邊塊需要交換（共 2 條公式）。</li>
        <li>
          接著歸位邊塊，使用邊塊相關的 PLL 公式完成頂層復原（共 4 條公式）。
        </li>
      </ol>
      <p>
        透過針對特定類型的 PLL 處理頂面，只需要學習約 6 條公式。
        <br />
        相較完整的 21 種 PLL 案例，這種方式能大幅降低記憶量與判斷難度。
      </p>
      <blockquote>
        這些公式皆為現有 PLL 的應用，學會後若要銜接完整 PLL，不需重新記憶。
      </blockquote>
    </Article>
  );
}

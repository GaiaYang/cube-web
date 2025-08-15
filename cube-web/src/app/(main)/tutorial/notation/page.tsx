import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";

export const metadata: Metadata = {
  title: "轉動代號說明",
  description: "解釋方塊公式中的英文跟數字代表什麼意思。",
  alternates: { canonical: "/tutorial/notation" },
};

export default function Page() {
  return (
    <Article>
      <h1>轉動代號說明</h1>
      <p>解釋方塊公式中的英文跟數字代表什麼意思。</p>
    </Article>
  );
}

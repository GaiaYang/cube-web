import React from "react";
import { type Metadata } from "next";

import Article from "@/components/ui/Article";

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
    </Article>
  );
}

import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";

export const metadata: Metadata = {
  title: "兩段式OLL",
  description: "將OLL分成兩個階段復原，大幅簡化需要記憶的公式。",
  alternates: { canonical: "/tutorial/333/cfop/oll/2look" },
};

export default function Page() {
  return (
    <main>
      <Article>
        <h1>兩段式OLL</h1>
        <p>將OLL分成兩個階段復原，大幅簡化需要記憶的公式。</p>
      </Article>
    </main>
  );
}

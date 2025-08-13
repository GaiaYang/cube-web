import React from "react";
import { type Metadata } from "next";

import Article from "@/components/ui/Article";

export const metadata: Metadata = {
  title: "EO Line",
  description:
    "EO（邊塊色相） Line（底層直線），為ZZ法的第一階段也是最精髓的部分。",
  alternates: { canonical: "/tutorial/333/zz/eo-line" },
};

export default function Page() {
  return (
    <Article>
      <h1>EO Line</h1>
      <p>EO（邊塊色相） Line（底層直線），為ZZ法的第一階段也是最精髓的部分。</p>
    </Article>
  );
}

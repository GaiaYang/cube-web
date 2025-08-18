import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import UnderConstruction from "@/components/notices/UnderConstruction";

export const metadata: Metadata = {
  title: "ZZ Method",
  description: "ZZ Method是CFOP的變體速解方法，適合用來理解方塊色相的方法。",
  alternates: { canonical: "/tutorial/333/zz" },
};

export default function Page() {
  return (
    <Article>
      <h1>ZZ Method</h1>
      <p>
        ZZ
        Method是CFOP的變體速解方法，最大的特色就是利用色相來讓F2L可以在不翻面也不動用到F層的情況復原，適合用來理解方塊色相的方法。
      </p>
      <UnderConstruction />
    </Article>
  );
}

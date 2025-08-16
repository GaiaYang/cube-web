import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import DrawerMenuOverview from "@/components/DrawerMenuOverview";

export const metadata: Metadata = {
  title: "三階公式總覽",
  description: "三階魔術方塊的所有公式總覽。",
  alternates: { canonical: "/algs/333" },
};

export default function Page() {
  return (
    <Article>
      <h1>三階公式總覽</h1>
      <p>這裡是三階魔術方塊的所有公式總覽。</p>
      <DrawerMenuOverview />
    </Article>
  );
}

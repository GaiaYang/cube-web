import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";

export const metadata: Metadata = {
  title: "ZBLS公式列表",
  description:
    "ZBLS（Zborowski-Bruchem Last Slot）是 F2L 的進階公式，完成最後一組 F2L 的時候必定上頂面為十字。",
  alternates: { canonical: "/algs/333/zbls" },
};

export default function Page() {
  return (
    <Article>
      <h1>ZBLS公式列表</h1>
      <p>
        完成最後一組F2L的時候可以讓頂面必定為十字，通常會搭配ZBLL，共有305種情況。
      </p>
    </Article>
  );
}

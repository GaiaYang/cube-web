import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import Notices from "@/components/Notices";

export const metadata: Metadata = {
  title: "Cross",
  description:
    "底部十字（Cross）是 CFOP 的第一步，目標是在魔術方塊底部形成一個十字，並使每個底層邊塊同時對齊相鄰的兩個面顏色。",
  alternates: { canonical: "/tutorial/333/cfop/cross" },
};

export default function Page() {
  return (
    <Article>
      <h1>Cross</h1>
      <p>
        底部十字（Cross）是 CFOP 的第一步。
        <br />
        這個階段的目標是在魔術方塊底部形成一個十字，
        並確保每個底層邊塊同時對齊相鄰的兩個面顏色。
      </p>
      <Notices type="under-construction" />
    </Article>
  );
}

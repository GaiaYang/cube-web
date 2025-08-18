import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import ExternalLink from "@/components/ExternalLink";
import Mention from "@/components/notices/Mention";

export const metadata: Metadata = {
  title: "ZBLS 公式列表",
  description:
    "ZBLS（Zborowski-Bruchem Last Slot）是 F2L 的公式子集，用於完成最後一組 F2L 時保證頂面形成十字，常與 ZBLL 搭配使用。",
  alternates: { canonical: "/algs/333/zbls" },
};

export default function Page() {
  return (
    <Article>
      <h1>ZBLS 公式列表</h1>
      <p>
        ZBLS 是 F2L 的公式子集，用於完成最後一組 F2L 時，使頂面必定形成十字，共
        305 種情況。
      </p>
      <blockquote>
        通常會搭配 <ExternalLink href="/algs/333/zbll">ZBLL</ExternalLink> 使用
      </blockquote>
      <Mention />
    </Article>
  );
}

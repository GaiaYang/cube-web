import React from "react";
import { type Metadata } from "next";

import Article from "@/components/Article";
import ExternalLink from "@/components/ExternalLink";
import Notices from "@/components/Notices";

export const metadata: Metadata = {
  title: "ZBLL 公式列表",
  description:
    "ZBLL（Zborowski-Bruchem Last Layer）是 OLL 的公式子集，目標是在頂面形成十字時，使用公式直接還原整個最後一層，通常搭配 ZBLS 使用。",
  alternates: { canonical: "/algs/333/zbll" },
};

export default function Page() {
  return (
    <Article>
      <h1>ZBLL 公式列表</h1>
      <p>
        當最後一層已形成十字時，ZBLL 公式可以直接完成整層復原，共 493 種情況。
      </p>
      <blockquote>
        通常會搭配 <ExternalLink href="/algs/333/zbls">ZBLS</ExternalLink> 使用
      </blockquote>
      <Notices type="mention" />
    </Article>
  );
}

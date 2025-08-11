import React from "react";
import { type Metadata } from "next";
import Link from "next/link";

import type { Option } from "@/options/types";

import ContentSection from "@/components/ContentSection";
import ContentContainer from "@/components/ContentContainer";

export const metadata: Metadata = {
  title: "CFOP",
  description:
    "CFOP 是最多人使用速解方法，其變體解法跟資源十分充足，適合入門速解的方法。",
  alternates: { canonical: "/tutorial/333/cfop" },
};

export default function Page() {
  return (
    <main>
      <ContentContainer>
        <ContentSection
          title="CFOP"
          description="CFOP 是最多人使用速解方法，其變體解法跟資源十分充足，適合入門速解的方法。"
          eyebrow="弗雷德里奇法(Fridrich Method)"
        />
        <ol className="list">{features.map(_renderItem)}</ol>
      </ContentContainer>
    </main>
  );
}

interface Feature {
  title: string;
  description: string;
  options: Option<string>[];
}

function _renderItem(item: Feature, index: number) {
  return (
    <li key={index} className="list-row">
      <div className="flex flex-col gap-2">
        <div className="text-base-content text-base/7">
          <h2 className="font-semibold">{item.title}</h2>
          <p className="opacity-80">{item.description}</p>
        </div>
        <div className="breadcrumbs text-base">
          <ol>{item.options.map(_renderLink)}</ol>
        </div>
      </div>
    </li>
  );
}

function _renderLink(item: Option<string>) {
  return (
    <li key={item.id}>
      <Link href={item.value} className="link link-hover">
        {item.label}
      </Link>
    </li>
  );
}

const stepMap: Record<
  "cross" | "f2l" | "oll" | "pll" | "2lookOll" | "2lookPll",
  Option<string>
> = {
  cross: { id: "cross", label: "Cross", value: "/tutorial/333/cfop/cross" },
  f2l: { id: "f2l", label: "F2L", value: "/tutorial/333/cfop/f2l" },
  oll: { id: "oll", label: "OLL", value: "/tutorial/333/cfop/oll" },
  pll: { id: "pll", label: "PLL", value: "/tutorial/333/cfop/pll" },
  "2lookOll": {
    id: "2lookOll",
    label: "兩段式OLL",
    value: "/tutorial/333/cfop/oll/2look",
  },
  "2lookPll": {
    id: "2lookPll",
    label: "兩段式PLL",
    value: "/tutorial/333/cfop/pll/2look",
  },
};

const features: Feature[] = [
  {
    title: "依照復原順序學習",
    description: "如果你有天份的話直接照順序學吧。",
    options: [stepMap.cross, stepMap.f2l, stepMap.oll, stepMap.pll],
  },
  {
    title: "短時間內加快速度",
    description: "這裡把能大幅度減少秒數跟步數且易學的階段放在前面。",
    options: [
      stepMap.cross,
      stepMap["2lookOll"],
      stepMap["2lookPll"],
      stepMap.f2l,
      stepMap.pll,
      stepMap.oll,
    ],
  },
  {
    title: "個人建議",
    description:
      "「得F2L得天下」，個人建議一開始就把前兩層學好，你的復原大部分時間都在F2L。",
    options: [
      stepMap.cross,
      stepMap.f2l,
      stepMap["2lookOll"],
      stepMap["2lookPll"],
      stepMap.pll,
      stepMap.oll,
    ],
  },
];

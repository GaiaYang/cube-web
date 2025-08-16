import React from "react";
import { type Metadata } from "next";
import Link from "next/link";

import type { Option } from "@/options/types";

import Article from "@/components/Article";

export const metadata: Metadata = {
  title: "CFOP",
  description:
    "CFOP 是最廣泛使用的三階魔術方塊速解方法，變體眾多、資源豐富，非常適合入門學習速解技巧。",
  alternates: { canonical: "/tutorial/333/cfop" },
};

export default function Page() {
  return (
    <Article>
      <h1>CFOP</h1>
      <p>
        CFOP 是目前最多人使用的三階魔術方塊速解方法，
        其變體眾多、資源豐富，非常適合初學者入門速解。
      </p>
      <ol className="list not-prose">{features.map(_renderItem)}</ol>
    </Article>
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
          <p className="text-base-content/70">{item.description}</p>
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
    description: "如果你對方塊已經有基礎，可以直接按照順序學習CFOP各步驟。",
    options: [stepMap.cross, stepMap.f2l, stepMap.oll, stepMap.pll],
  },
  {
    title: "短時間內提升速度",
    description:
      "將能有效減少步數與時間且易學的階段放在前面，幫助你快速提升解法效率。",
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
      "「得 F2L 得天下」，建議一開始就把前兩層（F2L）練熟，因為復原過程的大部分時間都在F2L。",
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

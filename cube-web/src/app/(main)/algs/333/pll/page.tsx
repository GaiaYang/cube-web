import React from "react";
import { type Metadata } from "next";

import cn from "@/utils/cn";
import type { PLLDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/pllCategory";

import definitions from "@/contents/cube/333/pll/definitions";
import HeaderSection from "@/components/HeaderSection";
import OverlayLink from "@/components/OverlayLink";
import Diagram from "@/components/cube/333/diagram/PermutationLastLayer";
import FilterPanel from "./components/FilterPanel";

export const metadata: Metadata = {
  title: "PLL 公式列表",
  description: "頂層的方塊位置排列，共有21種情況。",
};

export default function Page() {
  return (
    <main>
      <HeaderSection
        title="PLL 公式列表"
        description="使頂層的方塊位置排列正確，共有 21 種情況"
        eyebrow="Permutation of the Last Layer"
      />
      <div
        className={cn("container", "px-4 sm:px-6 lg:px-8", "pb-16 sm:pb-24")}
      >
        <h2 className="sr-only">搜尋列</h2>
        <FilterPanel />
        <h2 className="sr-only">公式列表</h2>
        <ol
          aria-label="公式列表"
          className={cn(
            "grid gap-6",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          )}
        >
          {definitions.map(_renderItem)}
        </ol>
      </div>
    </main>
  );
}

function _renderItem(params: PLLDefinition) {
  return (
    <li key={params.id} className="relative" title={params.name}>
      <div className="flex flex-col items-center gap-2 p-4">
        <div>
          <Diagram className="w-full" pattern={params.patternColors} />
        </div>
        <h3 className="text-lg font-semibold">{params.name}</h3>
        <p className="badge badge-soft badge-primary badge-lg">
          {labels[params.category]}
        </p>
      </div>
      <OverlayLink
        href={`pll/${params.id}`}
        target="_blank"
        label={params.name}
      />
    </li>
  );
}

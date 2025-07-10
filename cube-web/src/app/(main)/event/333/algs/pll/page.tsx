import React from "react";

import cn from "@/utils/cn";
import type { PLLDefinition } from "@/schema/cube/333";
import { labels } from "@/options/cube/333/pllCategory";

import definitions from "@/content/cube/333/pll/definitions";
import HeaderSection from "@/components/HeaderSection";
import OverlayLink from "@/components/OverlayLink";
import Diagram from "@/components/cube/333/diagram/PermutationLastLayer";

export default function Page() {
  return (
    <main>
      <h1 className="sr-only">PLL 公式列表</h1>
      <HeaderSection
        title="PLL 公式列表"
        description="PLL（最後一層排列）是 CFOP 方法的第四步，也是最後一步，目的是將頂層的方塊位置排列正確，使整顆 3x3 完全還原，共有 21 種情況，需透過公式解法完成。"
        eyebrow="Permutation of the Last Layer"
      />
      <div
        className={cn("container", "px-4 sm:px-6 lg:px-8", "pb-16 sm:pb-24")}
      >
        <ul
          role="list"
          className={cn(
            "grid gap-6",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          )}
        >
          {definitions.map(_renderItem)}
        </ul>
      </div>
    </main>
  );
}

function _renderItem(params: PLLDefinition) {
  return (
    <li key={params.id} className="group relative">
      <div className="flex flex-col gap-4 p-4">
        <div>
          <Diagram className="w-full" pattern={params.patternColors} />
        </div>
        <div className="flex-1 text-center">
          <h3 className="text-lg font-semibold">{params.name}</h3>
          <p className="badge badge-soft badge-primary btn mt-1">
            {labels[params.category]}
          </p>
        </div>
      </div>
      <OverlayLink
        href={`pll/${params.id}`}
        target="_blank"
        label={params.name}
      />
    </li>
  );
}

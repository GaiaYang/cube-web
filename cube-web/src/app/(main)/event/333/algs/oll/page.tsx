import React from "react";

import cn from "@/utils/cn";
import type { OLLDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/ollCategory";

import definitions from "@/contents/cube/333/oll/definitions";
import HeaderSection from "@/components/HeaderSection";
import OverlayLink from "@/components/OverlayLink";
import Diagram from "@/components/cube/333/diagram/OrientationLastLayer";

export default function Page() {
  return (
    <main>
      <h1 className="sr-only">OLL 公式列表</h1>
      <HeaderSection
        title="OLL 公式列表"
        description="OLL（最後一層定向）是 CFOP 方法的第三步，目的是讓 3x3 魔術方塊頂層顏色一致，總共有 57 種情況，需透過公式解法完成。"
        eyebrow="Orientation of the Last Layer"
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

function _renderItem(params: OLLDefinition) {
  return (
    <li key={params.id} className="group relative">
      <div className="flex flex-col gap-4 p-4">
        <div>
          <Diagram className="w-full" pattern={params.patternPositions} />
        </div>
        <div className="flex-1 text-center">
          <h3 className="text-lg font-semibold">{params.name}</h3>
          <p className="badge badge-soft badge-primary btn mt-1">
            {labels[params.category]}
          </p>
        </div>
      </div>
      <OverlayLink
        href={`oll/${params.id}`}
        target="_blank"
        label={params.name}
      />
    </li>
  );
}

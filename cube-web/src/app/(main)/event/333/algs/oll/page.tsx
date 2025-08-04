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
      <HeaderSection
        title="OLL 公式列表"
        description="使頂層的方塊顏色一致，總共有 57 種情況"
        eyebrow="Orientation of the Last Layer"
      />
      <div
        className={cn("container", "px-4 sm:px-6 lg:px-8", "pb-16 sm:pb-24")}
      >
        <ol
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

function _renderItem(params: OLLDefinition) {
  return (
    <li key={params.id} className="group relative" title={params.name}>
      <div className="flex flex-col items-center gap-2 p-4">
        <div>
          <Diagram className="w-full" pattern={params.patternPositions} />
        </div>
        <h3 className="text-lg font-semibold">{params.name}</h3>
        <p className="badge badge-soft badge-primary badge-lg">
          {labels[params.category]}
        </p>
      </div>
      <OverlayLink
        href={`oll/${params.id}`}
        target="_blank"
        label={params.name}
      />
    </li>
  );
}

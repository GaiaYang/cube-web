import React from "react";

import cn from "@/utils/cn";
import type { OLLDefinition } from "@/schema/cube/333";
import { labels } from "@/options/cube/333/ollCategory";

import definitions from "@/content/cube/333/oll/definitions";
import HeaderSection from "@/components/HeaderSection";
import Diagram from "@/components/cube/333/diagram/OrientationLastLayer";

export default function Page() {
  return (
    <main>
      <h1 className="sr-only">OLL 公式列表</h1>
      <HeaderSection title="OLL 公式列表" description="這裡是 OLL 公式的列表" />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <ul
          role="list"
          className={cn(
            "grid",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            "gap-x-6 xl:gap-x-8",
            "gap-y-10",
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
    <li key={params.id} className="flex flex-col gap-4 p-4">
      <div>
        <Diagram className="w-full" pattern={params.patternPositions} />
      </div>
      <div className="flex-1 text-center">
        <h3 className="text-lg font-semibold">{params.name}</h3>
        <p className="badge badge-soft mt-1">{labels[params.category]}</p>
      </div>
    </li>
  );
}

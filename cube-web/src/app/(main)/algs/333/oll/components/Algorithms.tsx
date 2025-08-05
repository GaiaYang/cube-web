"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import cn from "@/utils/cn";
import searchParamToEnum from "@/utils/searchParamToEnum";
import type { OLLDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/ollCategory";
import { OLLCategory } from "@/enums/cube/333";
import definitions from "@/contents/cube/333/oll/definitions";

import OverlayLink from "@/components/OverlayLink";
import Diagram from "@/components/cube/333/diagram/OrientationLastLayer";

/** OLL公式列表 */
export default function Algorithms() {
  const searchParams = useSearchParams();
  const category = searchParamToEnum(OLLCategory, searchParams.get("category"));

  const data = useMemo(() => {
    if (!category) {
      return definitions;
    }

    return definitions.filter((item) => item.category === category);
  }, [category]);

  return (
    <ol
      aria-label="公式列表"
      className={cn(
        "grid gap-6",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      )}
    >
      {data.map(_renderItem)}
    </ol>
  );
}

function _renderItem(params: OLLDefinition) {
  return (
    <li key={params.id} className="relative" title={params.name}>
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

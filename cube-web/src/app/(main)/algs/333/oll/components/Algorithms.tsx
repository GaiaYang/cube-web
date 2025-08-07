"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import cn from "@/utils/cn";
import searchParamToEnum from "@/utils/searchParamToEnum";
import type { OLLDefinition } from "@/types/cube/333";
import { OLLCategory } from "@/enums/cube/333";
import { definitions } from "@/contents/cube/333/oll/definitions";

import OverlayLink from "@/components/OverlayLink";
import OLLAlgoithm from "@/components/gridItems/OLLAlgoithm";

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
      <OLLAlgoithm {...params} />
      <OverlayLink
        href={`oll/${params.id}`}
        target="_blank"
        label={params.name}
      />
    </li>
  );
}

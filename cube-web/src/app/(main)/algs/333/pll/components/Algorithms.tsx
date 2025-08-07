"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import cn from "@/utils/cn";
import searchParamToEnum from "@/utils/searchParamToEnum";
import type { PLLDefinition } from "@/types/cube/333";
import { PLLCategory } from "@/enums/cube/333";
import { definitions } from "@/contents/cube/333/pll/definitions";

import OverlayLink from "@/components/OverlayLink";
import PLLAlgoithm from "@/components/gridItems/PLLAlgoithm";

/** PLL公式列表 */
export default function Algorithms() {
  const searchParams = useSearchParams();
  const category = searchParamToEnum(PLLCategory, searchParams.get("category"));

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

function _renderItem(params: PLLDefinition) {
  return (
    <li key={params.id} className="relative" title={params.name}>
      <PLLAlgoithm {...params} />
      <OverlayLink
        href={`pll/${params.id}`}
        target="_blank"
        label={params.name}
      />
    </li>
  );
}

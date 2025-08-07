"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import searchParamToEnum from "@/utils/searchParamToEnum";
import type { OLLDefinition } from "@/types/cube/333";
import { OLLCategory } from "@/enums/cube/333";
import { definitions } from "@/contents/cube/333/oll/definitions";

import OverlayLink from "@/components/OverlayLink";
import OLLAlgoithm from "@/components/gridItems/OLLAlgoithm";
import GridList, { type GridListProps } from "@/components/list/GridList";

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
    <GridList
      aria-label="公式列表"
      data={data}
      renderItem={_renderItem}
      getTitle={(item) => item.name}
    />
  );
}

const _renderItem: GridListProps<OLLDefinition>["renderItem"] = ({ item }) => {
  return (
    <>
      <OLLAlgoithm {...item} />
      <OverlayLink href={`oll/${item.id}`} target="_blank" label={item.name} />
    </>
  );
};

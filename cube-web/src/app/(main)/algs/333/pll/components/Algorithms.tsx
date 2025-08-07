"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import searchParamToEnum from "@/utils/searchParamToEnum";
import type { PLLDefinition } from "@/types/cube/333";
import { PLLCategory } from "@/enums/cube/333";
import { definitions } from "@/contents/cube/333/pll/definitions";

import OverlayLink from "@/components/OverlayLink";
import PLLAlgoithm from "@/components/gridItems/PLLAlgoithm";
import GridList, { type GridListProps } from "@/components/list/GridList";

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
    <GridList
      data={data}
      renderItem={_renderItem}
      getTitle={(item) => item.name}
    />
  );
}

const _renderItem: GridListProps<PLLDefinition>["renderItem"] = ({ item }) => {
  return (
    <>
      <PLLAlgoithm {...item} />
      <OverlayLink href={`pll/${item.id}`} target="_blank" label={item.name} />
    </>
  );
};

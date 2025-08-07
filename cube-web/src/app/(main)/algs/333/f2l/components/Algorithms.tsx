"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import searchParamToEnum from "@/utils/searchParamToEnum";
import type { F2LDefinition } from "@/types/cube/333";
import { F2LCategory } from "@/enums/cube/333";
import { definitions } from "@/contents/cube/333/f2l/definitions";

import OverlayLink from "@/components/OverlayLink";
import F2LAlgoithm from "@/components/gridItems/F2LAlgoithm";
import GridList, { type GridListProps } from "@/components/list/GridList";

/** F2L公式列表 */
export default function Algorithms() {
  const searchParams = useSearchParams();
  const category = searchParamToEnum(F2LCategory, searchParams.get("category"));

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

const _renderItem: GridListProps<F2LDefinition>["renderItem"] = ({ item }) => {
  return (
    <>
      <F2LAlgoithm {...item} />
      <OverlayLink href={`f2l/${item.id}`} target="_blank" label={item.name} />
    </>
  );
};

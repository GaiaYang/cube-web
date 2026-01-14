"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import stringToEnum from "@/utils/stringToEnum";
import type { F2LDefinition } from "@/types/cube/333";
import { F2LCategory } from "@/enums/cube/333";
import { definitions } from "@/data/cube/333/f2l";

import OverlayLink from "@/components/ui/OverlayLink";
import F2LCase from "@/components/gridItems/F2LCase";
import GridList, { type GridListProps } from "@/components/list/GridList";

/** F2L公式列表 */
export default function Algorithms() {
  const searchParams = useSearchParams();
  const category = stringToEnum(F2LCategory, searchParams.get("category"));

  const data = useMemo(() => {
    if (!category) {
      return definitions;
    }

    return definitions.filter((item) => item.category === category);
  }, [category]);

  return <GridList data={data} renderItem={_renderItem} />;
}

const _renderItem: GridListProps<F2LDefinition>["renderItem"] = ({ item }) => {
  return (
    <>
      <F2LCase {...item} />
      <OverlayLink href={`f2l/${item.id}`} target="_blank" label={item.name} />
    </>
  );
};

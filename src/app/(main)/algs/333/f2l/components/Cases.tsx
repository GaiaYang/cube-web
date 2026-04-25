"use client";

import { parseAsStringEnum, useQueryState } from "nuqs";

import F2LCase from "@/components/gridItems/F2LCase";
import GridList, { type GridListProps } from "@/components/list/GridList";
import OverlayLink from "@/components/ui/OverlayLink";
import { definitions } from "@/data/cube/333/f2l";
import { F2LCategory } from "@/enums/cube/333";
import type { F2LDefinition } from "@/types/cube/333";
import filterCases from "@/utils/filterCases";

/** F2L公式列表 */
export default function Algorithms() {
  const [category] = useQueryState(
    "category",
    parseAsStringEnum<F2LCategory>(Object.values(F2LCategory)),
  );
  const data = filterCases(definitions, category);

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

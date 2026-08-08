"use client";

import F2LCase from "@/components/gridItems/F2LCase";
import GridList, { type GridListProps } from "@/components/list/GridList";
import OverlayLink from "@/components/ui/OverlayLink";
import { definitions } from "@/data/cube/333/f2l";
import { useF2lCategory } from "@/hooks/useCube333Category";
import type { F2LDefinition } from "@/types/cube/333";
import filterCases from "@/utils/filterCases";

/** F2L公式列表 */
export default function Cases() {
  const [category] = useF2lCategory();
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

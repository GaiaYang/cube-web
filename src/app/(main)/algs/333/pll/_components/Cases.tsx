"use client";

import PLLCase from "@/components/gridItems/PLLCase";
import GridList, { type GridListProps } from "@/components/list/GridList";
import OverlayLink from "@/components/ui/OverlayLink";
import { definitions } from "@/data/cube/333/pll";
import { usePllCategory } from "@/hooks/useCube333Category";
import type { PLLDefinition } from "@/types/cube/333";
import filterCases from "@/utils/filterCases";

/** PLL公式列表 */
export default function Cases() {
  const [category] = usePllCategory();
  const data = filterCases(definitions, category);

  return <GridList data={data} renderItem={_renderItem} />;
}

const _renderItem: GridListProps<PLLDefinition>["renderItem"] = ({ item }) => {
  return (
    <>
      <PLLCase {...item} />
      <OverlayLink href={`pll/${item.id}`} target="_blank" label={item.name} />
    </>
  );
};

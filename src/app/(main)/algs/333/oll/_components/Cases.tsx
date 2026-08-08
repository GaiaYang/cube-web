"use client";

import OLLCase from "@/components/gridItems/OLLCase";
import GridList, { type GridListProps } from "@/components/list/GridList";
import OverlayLink from "@/components/ui/OverlayLink";
import { definitions } from "@/data/cube/333/oll";
import { useOllCategory } from "@/hooks/useCube333Category";
import type { OLLDefinition } from "@/types/cube/333";
import filterCases from "@/utils/filterCases";

/** OLL公式列表 */
export default function Cases() {
  const [category] = useOllCategory();
  const data = filterCases(definitions, category);

  return <GridList data={data} renderItem={_renderItem} />;
}

const _renderItem: GridListProps<OLLDefinition>["renderItem"] = ({ item }) => {
  return (
    <>
      <OLLCase {...item} />
      <OverlayLink href={`oll/${item.id}`} target="_blank" label={item.name} />
    </>
  );
};

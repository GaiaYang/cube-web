"use client";

import { parseAsStringEnum, useQueryState } from "nuqs";

import OLLCase from "@/components/gridItems/OLLCase";
import GridList, { type GridListProps } from "@/components/list/GridList";
import OverlayLink from "@/components/ui/OverlayLink";
import { definitions } from "@/data/cube/333/oll";
import { OLLCategory } from "@/enums/cube/333";
import type { OLLDefinition } from "@/types/cube/333";
import filterCases from "@/utils/filterCases";

/** OLL公式列表 */
export default function Cases() {
  const [category] = useQueryState(
    "category",
    parseAsStringEnum<OLLCategory>(Object.values(OLLCategory)),
  );
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

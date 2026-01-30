"use client";

import { useSearchParams } from "next/navigation";

import stringToEnum from "@/utils/stringToEnum";
import type { OLLDefinition } from "@/types/cube/333";
import { OLLCategory } from "@/enums/cube/333";
import { definitions } from "@/data/cube/333/oll";
import filterCases from "@/utils/filterCases";

import OverlayLink from "@/components/ui/OverlayLink";
import OLLCase from "@/components/gridItems/OLLCase";
import GridList, { type GridListProps } from "@/components/list/GridList";

/** OLL公式列表 */
export default function Cases() {
  const searchParams = useSearchParams();
  const category = stringToEnum(OLLCategory, searchParams.get("category"));
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

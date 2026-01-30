"use client";

import { useSearchParams } from "next/navigation";

import stringToEnum from "@/utils/stringToEnum";
import type { PLLDefinition } from "@/types/cube/333";
import { PLLCategory } from "@/enums/cube/333";
import { definitions } from "@/data/cube/333/pll";
import filterCases from "@/utils/filterCases";

import OverlayLink from "@/components/ui/OverlayLink";
import PLLCase from "@/components/gridItems/PLLCase";
import GridList, { type GridListProps } from "@/components/list/GridList";

/** PLL公式列表 */
export default function Cases() {
  const searchParams = useSearchParams();
  const category = stringToEnum(PLLCategory, searchParams.get("category"));
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

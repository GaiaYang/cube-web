import React from "react";
import { type Metadata } from "next";

import type { Option } from "@/options/types";

import ContentSection from "@/components/ui/ContentSection";
import ContentContainer from "@/components/ui/ContentContainer";
import GridList, { type GridListProps } from "@/components/list/GridList";
import F2LDiagram from "@/components/cube/333/diagram/FirstTwoLayersByCase";
import OLLDiagram from "@/components/cube/333/diagram/OrientationLastLayerByCase";
import PLLDiagram from "@/components/cube/333/diagram/PermutationLastLayerByCase";
import OverlayLink from "@/components/OverlayLink";
import AlgorithmCaseCard from "@/components/AlgorithmCaseCard";

export const metadata: Metadata = {
  title: "三階公式總覽",
  description: "三階魔術方塊的所有公式總覽。",
  alternates: { canonical: "/algs/333" },
};

const options: Option<string>[] = [
  { id: "f2l", label: "F2L", value: "/algs/333/f2l" },
  { id: "oll", label: "OLL", value: "/algs/333/oll" },
  { id: "pll", label: "PLL", value: "/algs/333/pll" },
];

export default function Page() {
  return (
    <ContentContainer>
      <ContentSection
        title="三階公式總覽"
        description="這裡是三階魔術方塊的所有公式總覽。"
      />
      <GridList data={options} renderItem={_renderItem} />
    </ContentContainer>
  );
}

const _renderItem: GridListProps<Option<string>>["renderItem"] = ({ item }) => {
  return (
    <>
      <AlgorithmCaseCard name={item.label} tag={null}>
        {(() => {
          switch (item.id) {
            case "f2l":
              return <F2LDiagram caseId="1" />;
            case "oll":
              return <OLLDiagram caseId="1" />;
            case "pll":
              return <PLLDiagram caseId="Aa" />;
            default:
              break;
          }
        })()}
      </AlgorithmCaseCard>
      <OverlayLink href={item.value} label={item.label} />
    </>
  );
};

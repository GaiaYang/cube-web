import type { ReactNode } from "react";
import { type Metadata } from "next";

import FirstTwoLayers from "@/components/cube/333/diagram/FirstTwoLayers";
import OrientationLastLayer from "@/components/cube/333/diagram/OrientationLastLayer";
import PermutationLastLayer from "@/components/cube/333/diagram/PermutationLastLayer";
import GridList, { type ListRenderItem } from "@/components/list/GridList";
import Article from "@/components/ui/Article";
import Card from "@/components/ui/Card";
import OverlayLink from "@/components/ui/OverlayLink";
import { definitions as f2l } from "@/data/cube/333/f2l";
import { definitions as oll } from "@/data/cube/333/oll";
import { definitions as pll } from "@/data/cube/333/pll";

export const metadata: Metadata = {
  title: "三階公式總覽",
  description: "三階魔術方塊的所有公式總覽。",
};

interface ListData {
  name: string;
  href: string;
  diagram: ReactNode;
}

const data: ListData[] = [
  {
    name: "F2L",
    href: "/algs/333/f2l",
    diagram: <FirstTwoLayers pattern={f2l[0].pattern} />,
  },
  {
    name: "OLL",
    href: "/algs/333/oll",
    diagram: <OrientationLastLayer pattern={oll[0].pattern} />,
  },
  {
    name: "PLL",
    href: "/algs/333/pll",
    diagram: <PermutationLastLayer pattern={pll[0].pattern} />,
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-16">
      <Article>
        <h1>三階公式總覽</h1>
        <p>這裡是三階魔術方塊的所有公式總覽。</p>
      </Article>
      <section>
        <h2 className="sr-only">公式總覽</h2>
        <GridList data={data} renderItem={_renderItem} />
      </section>
    </div>
  );
}

const _renderItem: ListRenderItem<ListData> = ({ item }) => {
  return (
    <div className="relative">
      <Card>
        <div className="px-4 pt-4">
          <figure className="aspect-square w-full">{item.diagram}</figure>
        </div>
        <div className="card-body">
          <h3 className="card-title">{item.name}</h3>
        </div>
      </Card>
      <OverlayLink href={item.href} label={item.name} />
    </div>
  );
};

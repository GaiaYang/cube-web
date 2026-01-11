import { type Metadata } from "next";

import Article from "@/components/ui/Article";
import GridList, { type ListRenderItem } from "@/components/list/GridList";
import OverlayLink from "@/components/ui/OverlayLink";
import Card from "@/components/ui/Card";
import FirstTwoLayersByCase from "@/components/cube/333/diagram/FirstTwoLayersByCase";
import OrientationLastLayerByCase from "@/components/cube/333/diagram/OrientationLastLayerByCase";
import PermutationLastLayerByCase from "@/components/cube/333/diagram/PermutationLastLayerByCase";

export const metadata: Metadata = {
  title: "三階公式總覽",
  description: "三階魔術方塊的所有公式總覽。",
};

interface ListData {
  name: string;
  href: string;
}

const data: ListData[] = [
  { name: "F2L", href: "/algs/333/f2l" },
  { name: "OLL", href: "/algs/333/oll" },
  { name: "PLL", href: "/algs/333/pll" },
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
          <figure className="aspect-square w-full">
            {(() => {
              switch (item.name) {
                case "F2L":
                  return <FirstTwoLayersByCase caseId="1" />;
                case "OLL":
                  return <OrientationLastLayerByCase caseId="1" />;
                case "PLL":
                  return <PermutationLastLayerByCase caseId="Aa" />;
                default:
                  return null;
              }
            })()}
          </figure>
        </div>
        <div className="card-body">
          <h3 className="card-title">{item.name}</h3>
        </div>
      </Card>
      <OverlayLink href={item.href} label={item.name} />
    </div>
  );
};

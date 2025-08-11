import React from "react";
import { type Metadata } from "next";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";

import {
  definitions,
  OLLDefinition,
} from "@/contents/cube/333/oll/definitions";
import { OLLCategory } from "@/enums/cube/333";

import Article from "@/components/Article";
import LastLayerDiagram, {
  LastLayerDiagramProps,
} from "@/components/cube/333/diagram/LastLayerDiagram";
import OrientationLastLayerByCase, {
  type OrientationLastLayerByCaseProps,
} from "@/components/cube/333/diagram/OrientationLastLayerByCase";
import OverlayLink from "@/components/OverlayLink";
import GridList, { GridListProps } from "@/components/list/GridList";
import OLLAlgoithm from "@/components/gridItems/OLLAlgoithm";

export const metadata: Metadata = {
  title: "兩段式OLL",
  description: "將OLL分成兩個階段復原，大幅簡化需要記憶的公式。",
  alternates: { canonical: "/tutorial/333/cfop/oll/2look" },
};

export default function Page() {
  return (
    <main>
      <Article>
        <h1>兩段式OLL</h1>
        <p>將OLL分成兩個階段復原，大幅簡化需要記憶的公式。</p>
        <h2>步驟說明</h2>
        <ol>
          <li>一次將對應的邊塊翻上來讓頂面形成十字。</li>
          <li>用十字型OLL公式完成頂面。</li>
        </ol>
        <p>
          這邊利用特定類型的OLL處理頂面情況，OLL有些是通過其他OLL疊加上來的，掌握該原理就能在這階段選擇自己喜歡的公式執行。
        </p>
        <blockquote>
          以下的公式都是現有OLL去執行，所以學會後要銜接到全OLL就不用重新記一次。
        </blockquote>
        <h2>運氣很好</h2>
        <LastLayerDiagram
          className="size-24 md:size-28 lg:size-32"
          colorMap={{
            TL: "yellow",
            TC: "yellow",
            TR: "yellow",
            CL: "yellow",
            CR: "yellow",
            CC: "yellow",
            BL: "yellow",
            BC: "yellow",
            BR: "yellow",
          }}
        />
        <p>
          這不用解釋了吧，直接進入
          <Link href="/tutorial/333/cfop/pll">PLL</Link>
          或者
          <Link href="/tutorial/333/cfop/pll/2look">兩段式PLL</Link>
        </p>
        <h2>第一次判斷</h2>
        <p>這裡的判斷不需要管角塊，我們只需要專注在邊塊就好。</p>
        <AlgorithmsTable
          algorithms={[
            {
              pattern: {
                CL: "yellow",
                CC: "yellow",
                CR: "yellow",
              },
              algorithm: "F ( R U R' U' ) F'",
              caseId: "45",
              description:
                "如果這裡形狀為Ｔ型，可以擺放跟原始公式一樣，有一半的機率直接完成頂面。",
            },
            {
              pattern: {
                CC: "yellow",
                CR: "yellow",
                BC: "yellow",
              },
              algorithm: "f ( R U R' U' ) f'",
              caseId: "44",
              description: "從上面一層改為轉動兩層。",
            },
            {
              pattern: {
                CC: "yellow",
              },
              algorithm: ["F (R U R' U') F'", "f ( R U R' U' ) f'"],
              description:
                "這裡可以看成以上兩個情況照順序執行，這OLL屬於公式疊加。",
              caseId: "2",
            },
          ]}
        />
        <h2>第二次判斷</h2>
        <LastLayerDiagram
          colorMap={{
            TC: "yellow",
            CL: "yellow",
            CC: "yellow",
            CR: "yellow",
            BC: "yellow",
          }}
          size={128}
        />
        <p>
          此階段必定十字，如果沒有十字又不符合上面三種情況，那一定是你的方塊裝錯。
        </p>
        <div className="not-prose">
          <GridList
            data={definitions.filter(
              (item) => item.category === OLLCategory.OCLL,
            )}
            renderItem={_renderOCLLItem}
          />
        </div>
      </Article>
    </main>
  );
}

const _renderOCLLItem: GridListProps<OLLDefinition>["renderItem"] = ({
  item,
}) => {
  return (
    <>
      <OLLAlgoithm {...item} />
      <OverlayLink
        href={`/algs/333/oll/${item.id}`}
        target="_blank"
        label={item.name}
      />
    </>
  );
};

interface AlgorithmTableRow {
  pattern: LastLayerDiagramProps["colorMap"];
  caseId: NonNullable<OrientationLastLayerByCaseProps["caseId"]>;
  algorithm: string | string[];
  description?: string;
}

interface AlgorithmsTableProps {
  algorithms: AlgorithmTableRow[];
}

function AlgorithmsTable({ algorithms }: AlgorithmsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-(--container-2xl)">
        <thead>
          <tr>
            <th>情況</th>
            <th>公式</th>
            <th>原始OLL</th>
          </tr>
        </thead>
        <tbody>{algorithms.map(_renderItem)}</tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="flex items-center gap-2 lg:hidden">
              <span>請向右滾動</span>
              <MoveRightIcon />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function _renderItem(item: AlgorithmTableRow, index: number) {
  return (
    <tr key={index}>
      <td>
        <LastLayerDiagram
          colorMap={item.pattern}
          className="size-24 md:size-28 lg:size-32"
        />
      </td>
      <td className="align-middle">
        <code>
          {Array.isArray(item.algorithm)
            ? item.algorithm.join(" ")
            : item.algorithm}
        </code>
        <br />
        {item.description}
      </td>
      <td>
        <div className="relative w-fit">
          <OrientationLastLayerByCase
            caseId={item.caseId}
            className="size-24 md:size-28 lg:size-32"
          />
          <OverlayLink
            href={`/algs/333/oll/${item.caseId}`}
            label={item.caseId}
            target="_blank"
          />
        </div>
      </td>
    </tr>
  );
}

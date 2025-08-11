import React from "react";
import { type Metadata } from "next";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";

import { definitions } from "@/contents/cube/333/oll/definitions";
import { OLLCategory } from "@/enums/cube/333";
import { OLLCaseId } from "@/types/cube/333";

import Article from "@/components/Article";
import LastLayerDiagram, {
  LastLayerDiagramProps,
} from "@/components/cube/333/diagram/LastLayerDiagram";
import createOllColorMap from "@/utils/cube/333/createOllColorMap";

import CubeAlgorithmDisplay from "@/components/cube/333/CubeAlgorithmDisplay";

export const metadata: Metadata = {
  title: "兩段式OLL",
  description: "將OLL分成兩個階段復原，大幅簡化需要記憶的公式。",
  alternates: { canonical: "/tutorial/333/cfop/oll/2look" },
};

const topColor = "yellow";
/** 十字型OLL要獲得的數量 */
const collFirstCount = 5;

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
            TL: topColor,
            TC: topColor,
            TR: topColor,
            CL: topColor,
            CR: topColor,
            CC: topColor,
            BL: topColor,
            BC: topColor,
            BR: topColor,
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
              colorMap: {
                CL: topColor,
                CC: topColor,
                CR: topColor,
              },
              algorithm: "F ( R U R' U' ) F'",
              caseId: "45",
              description:
                "如果這裡形狀為Ｔ型，可以擺放跟原始公式一樣，有一半的機率直接完成頂面。",
            },
            {
              colorMap: {
                CC: topColor,
                CR: topColor,
                BC: topColor,
              },
              algorithm: "f ( R U R' U' ) f'",
              caseId: "44",
              description: "從上面一層改為轉動兩層。",
            },
            {
              colorMap: {
                CC: topColor,
              },
              algorithm: "F (R U R' U') F' f ( R U R' U' ) f'",
              description:
                "這裡可以看成以上兩個情況照順序執行，這OLL屬於公式疊加。",
              caseId: "2",
            },
          ]}
        />
        <h3>錯誤情況</h3>
        <p>如果頂層的邊塊翻上的數量不是偶數或者0那就表示方塊裝錯了。</p>
        <div className="flex gap-2">
          <LastLayerDiagram
            colorMap={{
              CC: topColor,
              BC: topColor,
            }}
            className="m-4 size-24 md:size-28 lg:size-32"
          />
          <LastLayerDiagram
            colorMap={{
              CC: topColor,
              CL: topColor,
              CR: topColor,
              BC: topColor,
            }}
            className="m-4 size-24 md:size-28 lg:size-32"
          />
        </div>
        <h2>第二次判斷</h2>
        <LastLayerDiagram
          colorMap={{
            TC: topColor,
            CL: topColor,
            CC: topColor,
            CR: topColor,
            BC: topColor,
          }}
          size={128}
        />
        <p>
          此階段必定十字，如果沒有十字又不符合上面三種情況，那一定是你的方塊裝錯。
        </p>
        <p>{`以下情況請選擇順手或者習慣的公式，這裡直接照公式表列出前 ${collFirstCount} 項。`}</p>
        <AlgorithmsTable
          algorithms={definitions
            .filter((item) => item.category === OLLCategory.OCLL)
            .map((item) => {
              return {
                colorMap: createOllColorMap(item.pattern, topColor),
                algorithm: item.algorithms.slice(0, collFirstCount),
                caseId: item.id,
              };
            })}
        />
        <h2>下一步</h2>
        <p>現在你完成了頂面，接下來開始完成頂層的排列來復原方塊。</p>
        <ul>
          <li>
            <Link href="/tutorial/333/cfop/pll">PLL</Link>
          </li>
          <li>
            <Link href="/tutorial/333/cfop/pll/2look">兩段式PLL</Link>
          </li>
        </ul>
      </Article>
    </main>
  );
}

interface AlgorithmTableRow {
  colorMap: LastLayerDiagramProps["colorMap"];
  caseId: OLLCaseId;
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
            <th className="text-center">情況</th>
            <th>公式</th>
            <th className="text-center">原始OLL</th>
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
    <tr key={index} className="[&>td]:align-middle">
      <td>
        <LastLayerDiagram
          colorMap={item.colorMap}
          className="m-4 size-24 md:size-28 lg:size-32"
        />
      </td>
      <td className="w-full">
        <div className="grid gap-4 py-4">
          <div className="not-prose flex flex-col items-start gap-2">
            {Array.isArray(item.algorithm) ? (
              <>
                {item.algorithm.map((alg) => (
                  <CubeAlgorithmDisplay algorithm={alg} key={alg} />
                ))}
              </>
            ) : (
              <CubeAlgorithmDisplay algorithm={item.algorithm} />
            )}
          </div>
          {item.description}
        </div>
      </td>
      <td className="text-nowrap">
        <Link
          href={`/algs/333/oll/${item.caseId}`}
          target="_blank"
          className="btn"
        >
          原始公式
        </Link>
      </td>
    </tr>
  );
}

import React from "react";
import { type Metadata } from "next";
import Link from "next/link";

import type { OLLCaseId } from "@/types/cube/333";

import { definitions } from "@/contents/cube/333/oll/definitions";
import { OLLCategory } from "@/enums/cube/333";

import Article from "@/components/Article";
import OrientationLastLayer, {
  OrientationLastLayerProps,
} from "@/components/cube/333/diagram/OrientationLastLayer";

import AlgorithmsTable, {
  AlgorithmTableRow,
} from "./components/AlgorithmsTable";
import Notices from "@/components/Notices";
import Chart from "./components/Chart";

export const metadata: Metadata = {
  title: "兩段式 OLL",
  description:
    "將 OLL 分為兩個階段復原，顯著減少公式數量與判斷難度，適合初學者入門。",
  alternates: { canonical: "/tutorial/333/cfop/oll/2look" },
};

/** 十字型OLL要獲得的數量 */
const collFirstCount = 3;
/** 圖案尺寸 */
const patternSize = 128;

export default function Page() {
  return (
    <Article>
      <h1>兩段式 OLL</h1>
      <p>
        兩段式 OLL
        將頂面復原分成兩個階段，顯著減少需要記憶的公式數量與判斷難度。
      </p>
      <Notices type="in-progress" />
      <h2>步驟說明</h2>
      <ol>
        <li>
          先將對應的邊塊翻上來，使頂面形成十字。
          <br />
          <strong>共 3 條公式</strong>
        </li>
        <li>
          接著使用十字型 OLL 公式完成頂面復原。
          <br />
          <strong>共 7 條公式</strong>
        </li>
      </ol>
      <p>
        <strong>總共 10 條公式</strong>
        就能讓頂面完成。
      </p>
      <Chart />
      <p>相比完整版 OLL 的 57 種案例，能大幅減輕記憶負擔與判斷難度。</p>
      <blockquote>
        這些公式皆為現有 OLL 的應用，學會後若要銜接完整 OLL，不需重新記憶。
      </blockquote>
      <h2>運氣很好</h2>
      <OrientationLastLayer
        pattern={["TL", "TC", "TR", "CL", "CR", "CC", "BL", "BC", "BR"]}
        size={patternSize}
      />
      <p>
        這不用解釋了吧，直接進入
        <Link href="/tutorial/333/cfop/pll">PLL</Link>
        或者
        <Link href="/tutorial/333/cfop/pll/2look">兩段式PLL</Link>
      </p>
      <h2>第一次判斷</h2>
      <p>
        這裡的判斷不需要管角塊，我們只需要專注在四個邊塊就好，目標是做出十字。
      </p>
      <AlgorithmsTable
        cases={[
          {
            pattern: ["CL", "CC", "CR"],
            algorithms: "F R U R' U' F'",
            caseId: "45" as OLLCaseId,
            description: "F 後做手順公式在做 F'",
          },
          {
            pattern: ["CC", "CR", "BC"],
            algorithms: "f R U R' U' f'",
            caseId: "44",
            description: "從上面一層改為轉動兩層。",
          },
          {
            pattern: ["CC"],
            algorithms: "F R U R' U' F' f R U R' U' f'",
            description: "這裡可以看成以上兩個情況照順序執行。",
            caseId: "2",
          },
        ]}
        renderPattern={renderPattern}
        getOriginalAlgorithmUrl={getOriginalAlgorithmUrl}
      />
      <h3>錯誤情況</h3>
      <div className="flex gap-4">
        <OrientationLastLayer pattern={["CC", "BC"]} size={patternSize} />
        <OrientationLastLayer
          pattern={["CC", "CL", "CR", "BC"]}
          size={patternSize}
        />
      </div>
      <p>如果頂層的邊塊翻上的數量不是0或者偶數那就表示方塊裝錯了。</p>
      <h2>第二次判斷</h2>
      <OrientationLastLayer
        pattern={["TC", "CL", "CC", "CR", "BC"]}
        size={patternSize}
      />
      <p>
        這裡只需要專注角塊，依照案例執行公式即可，目標是將角塊全部翻到上面。
      </p>
      <blockquote>{`請選擇順手或者習慣的公式，這裡直接照公式表列出前${collFirstCount}項。`}</blockquote>
      <AlgorithmsTable
        cases={definitions
          .filter((item) => item.category === OLLCategory.OCLL)
          .map((item) => {
            return {
              pattern: item.pattern,
              algorithms: item.algorithms.slice(0, collFirstCount),
              caseId: item.id as OLLCaseId,
            };
          })}
        renderPattern={renderPattern}
        getOriginalAlgorithmUrl={getOriginalAlgorithmUrl}
      />
      <h3>錯誤情況</h3>
      <p>十字必定是上面的情況，如果沒有出現以上案例表示方塊裝錯。</p>
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
  );
}

type TableRow = AlgorithmTableRow<
  OrientationLastLayerProps["pattern"],
  OLLCaseId
>;

function renderPattern(item: TableRow) {
  return <OrientationLastLayer pattern={item.pattern} size={patternSize} />;
}

function getOriginalAlgorithmUrl(item: TableRow) {
  return `/algs/333/oll/${item.caseId}`;
}

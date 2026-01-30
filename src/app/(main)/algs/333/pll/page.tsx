import { Suspense } from "react";
import { type Metadata } from "next";

import { SITE_URL } from "@/lib/config";
import { options as pllOptions } from "@/data/options/cube/333/pllCategory";
import { PLLCategory } from "@/enums/cube/333";

import Article from "@/components/ui/Article";
import AlgorithmsFilterPanel from "@/components/searchParamsTools/AlgorithmsFilterPanel";
import Cases from "./components/Cases";
import AlgorithmCasesFallback from "@/components/cube/AlgorithmCasesFallback";

export const metadata: Metadata = {
  title: "PLL 公式列表",
  description: "排列頂層方塊使整顆方塊還原，需以公式解決，共 21 種情況。",
  alternates: { canonical: `${SITE_URL}/algs/333/pll` },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-16">
      <Article>
        <h1>PLL 公式列表</h1>
        <p>
          PLL（Permutation of the Last Layer）是 CFOP
          法的第四步，也是最後一步，目標是排列頂層方塊使其完全還原，共 21
          種情況。
        </p>
      </Article>
      <section>
        <h2 className="sr-only">搜尋列</h2>
        <AlgorithmsFilterPanel options={pllOptions} valueMap={PLLCategory} />
      </section>
      <section>
        <h2 className="sr-only">公式列表</h2>
        <Suspense fallback={<AlgorithmCasesFallback />}>
          <Cases />
        </Suspense>
      </section>
    </div>
  );
}

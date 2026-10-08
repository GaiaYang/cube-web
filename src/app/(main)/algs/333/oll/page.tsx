import { type Metadata } from "next";
import { Suspense } from "react";

import AlgorithmCasesFallback from "@/components/cube/algorithms/AlgorithmCasesFallback";
import AlgorithmsFilterPanel from "@/components/searchParamsTools/AlgorithmsFilterPanel";
import Article from "@/components/ui/Article";

import Cases from "./_components/Cases";
import CategoryFilter from "./_components/CategoryFilter";

export const metadata: Metadata = {
  title: "OLL 公式列表",
  description: "將頂層全部朝同一顏色，需以公式解決，共 57 種情況。",
  alternates: { canonical: "/algs/333/oll" },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-16">
      <Article>
        <h1>OLL 公式列表</h1>
        <p>
          OLL（Orientation of the Last Layer）是 CFOP
          法的第三步，目標是將頂層全部朝同一顏色，共 57 種情況。
        </p>
      </Article>
      <section>
        <h2 className="sr-only">篩選</h2>
        <AlgorithmsFilterPanel>
          <CategoryFilter />
        </AlgorithmsFilterPanel>
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

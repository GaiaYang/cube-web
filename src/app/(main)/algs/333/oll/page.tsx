import { Suspense } from "react";
import { type Metadata } from "next";

import { SITE_URL } from "@/lib/config";
import { options as ollOptions } from "@/options/cube/333/ollCategory";
import { OLLCategory } from "@/enums/cube/333";

import Article from "@/components/ui/Article";
import AlgorithmsFilterPanel from "@/components/searchParamsTools/AlgorithmsFilterPanel";
import Cases from "./components/Cases";

export const metadata: Metadata = {
  title: "OLL 公式列表",
  description: "將頂層全部朝同一顏色，需以公式解決，共 57 種情況。",
  alternates: { canonical: `${SITE_URL}/algs/333/oll` },
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
        <h2 className="sr-only">搜尋列</h2>
        <AlgorithmsFilterPanel options={ollOptions} enumMap={OLLCategory} />
      </section>
      <section>
        <h2 className="sr-only">公式列表</h2>
        <Suspense>
          <Cases />
        </Suspense>
      </section>
    </div>
  );
}

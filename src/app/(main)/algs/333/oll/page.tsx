import { Suspense } from "react";
import { type Metadata } from "next";

import { SITE_URL } from "@/lib/config";
import { options as ollOptions } from "@/options/cube/333/ollCategory";
import { OLLCategory } from "@/enums/cube/333";

import Article from "@/components/ui/Article";
import AlgorithmsFilterPanel, {
  AlgorithmsFilterPanelFallback,
} from "@/components/searchParamsTools/AlgorithmsFilterPanel";
import Cases from "./components/Cases";

export const metadata: Metadata = {
  title: "OLL 公式列表",
  description:
    "將頂層方塊朝向正確方向，這個步驟完全依靠公式處理，共有 57 種情況。",
  alternates: { canonical: `${SITE_URL}/algs/333/oll` },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-16">
      <Article>
        <h1>OLL 公式列表</h1>
        <p>將頂層方塊朝向正確方向，這個步驟完全依靠公式處理，共 57 種情況。</p>
      </Article>
      <section>
        <h2 className="sr-only">搜尋列</h2>
        <Suspense fallback={<AlgorithmsFilterPanelFallback />}>
          <AlgorithmsFilterPanel options={ollOptions} enumMap={OLLCategory} />
        </Suspense>
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

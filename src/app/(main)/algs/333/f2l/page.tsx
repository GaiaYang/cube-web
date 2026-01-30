import { Suspense } from "react";
import { type Metadata } from "next";

import { SITE_URL } from "@/lib/config";
import { options as f2lOptions } from "@/data/options/cube/333/f2lCategory";
import { F2LCategory } from "@/enums/cube/333";

import Article from "@/components/ui/Article";
import AlgorithmsFilterPanel from "@/components/searchParamsTools/AlgorithmsFilterPanel";
import Cases from "./components/Cases";
import AlgorithmCasesFallback from "@/components/cube/AlgorithmCasesFallback";

export const metadata: Metadata = {
  title: "F2L 公式列表",
  description:
    "完成方塊底部兩層，每種情況皆有四種變化以避免轉體，這裡只列出位於頂層或目標插槽中的所有組合，共有 41 種情況。",
  alternates: { canonical: `${SITE_URL}/algs/333/f2l` },
};

export default function Page() {
  return (
    <div className="flex flex-col gap-16">
      <Article>
        <h1>F2L 公式列表</h1>
        <p>
          F2L（First Two Layers）是 CFOP
          法的第二步，目標是完成方塊底部兩層，這裡只列出位於頂層或目標插槽中的所有組合，共有
          41 種情況。
        </p>
        <p>
          每個公式解決一組角塊與邊塊，並將其放入對應位置，因有四個插槽，每種情況皆有四種變化以避免轉體。
        </p>
        <p>這步驟比較特別，公式建議只作爲參考，請理解其運作原理。</p>
      </Article>
      <section>
        <h2 className="sr-only">搜尋列</h2>
        <AlgorithmsFilterPanel options={f2lOptions} valueMap={F2LCategory} />
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

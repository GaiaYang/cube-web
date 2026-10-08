import { Suspense, use } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Pattern from "@/components/cube/333/diagram/PermutationLastLayer";
import AlgorithmPanel, {
  AlgorithmPanelFallback,
} from "@/components/cube/algorithms/AlgorithmPanel";
import { byId, definitions, type PLLCaseId } from "@/data/cube/333/pll";

type Props = {
  params: Promise<{ id: PLLCaseId }>;
};

export function generateStaticParams() {
  return definitions.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = byId[id];

  if (!data) {
    notFound();
  }

  return {
    title: data.name,
    description: `${data.name} 公式與圖示。`,
  };
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<AlgorithmPanelFallback />}>
      <Case params={params} />
    </Suspense>
  );
}

function Case({ params }: Props) {
  const { id } = use(params);
  const data = byId[id];

  if (!data) {
    notFound();
  }

  return (
    <AlgorithmPanel
      {...data}
      renderPattern={<Pattern pattern={data.pattern} />}
    />
  );
}

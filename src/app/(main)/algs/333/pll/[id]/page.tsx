import { use } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { definitions, type PLLCaseId } from "@/contents/cube/333/pll";
import AlgorithmPanel from "@/components/cube/AlgorithmPanel";
import Pattern from "@/components/cube/333/diagram/PermutationLastLayerByCase";

type Props = {
  params: Promise<{ id: PLLCaseId }>;
};

export function generateStaticParams() {
  return definitions.map((item) => ({ id: item.id }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

  const data = definitions.find((item) => item.id === id);

  if (!data) {
    notFound();
  }

  const previousTitle = (await parent).title;

  return {
    title: `PLL ${data.id}` || previousTitle,
    description: data.name,
  };
}

export default function Page({ params }: Props) {
  const { id } = use(params);

  const data = definitions.find((item) => item.id === id);

  if (!data) {
    notFound();
  }

  return <AlgorithmPanel {...data} renderPattern={<Pattern caseId={id} />} />;
}

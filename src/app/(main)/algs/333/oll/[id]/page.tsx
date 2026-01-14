import { use } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { definitions, type OLLCaseId } from "@/data/cube/333/oll";
import AlgorithmPanel from "@/components/cube/AlgorithmPanel";
import Pattern from "@/components/cube/333/diagram/OrientationLastLayerByCase";

type Props = {
  params: Promise<{ id: OLLCaseId }>;
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
    title: `OLL ${data.id}` || previousTitle,
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

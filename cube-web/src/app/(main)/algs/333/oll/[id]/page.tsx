import { use } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import {
  definitions,
  type OLLCaseId,
} from "@/contents/cube/333/oll/definitions";
import AlgorithmPanel from "@/components/cube/AlgorithmPanel";
import OrientationLastLayerByCase from "@/components/cube/333/diagram/OrientationLastLayerByCase";

type Props = {
  params: Promise<{ id: OLLCaseId }>;
};

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
    alternates: {
      canonical: `/algs/333/oll/${id}`,
    },
  };
}

export default function Page({ params }: Props) {
  const { id } = use(params);
  const data = definitions.find((item) => item.id === id);

  if (!data) {
    notFound();
  }

  return (
    <AlgorithmPanel
      {...data}
      renderPattern={<OrientationLastLayerByCase caseId={id} />}
    />
  );
}

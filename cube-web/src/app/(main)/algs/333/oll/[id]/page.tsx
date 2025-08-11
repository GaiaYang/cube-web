import React, { use } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import {
  definitionMap,
  type OLLCaseId,
} from "@/contents/cube/333/oll/definitions";
import AlgorithmPanel from "@/components/AlgorithmPanel";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

  const data = definitionMap.get(id as OLLCaseId);

  if (!data) {
    notFound();
  }

  const previousTitle = (await parent).title;

  return {
    title: `OLL ${data.name}` || previousTitle,
    description: `OLL ${data.name}`,
    alternates: {
      canonical: `/algs/333/oll/${id}`,
    },
  };
}

export default function Page({ params }: Props) {
  const { id } = use(params);

  return (
    <main>
      <AlgorithmPanel />
    </main>
  );
}

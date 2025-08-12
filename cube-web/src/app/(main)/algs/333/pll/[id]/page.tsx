import React, { use } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import {
  definitionMap,
  type PLLCaseId,
} from "@/contents/cube/333/pll/definitions";
import AlgorithmPanel from "@/components/cube/AlgorithmPanel";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

  const data = definitionMap.get(id as PLLCaseId);

  if (!data) {
    notFound();
  }

  const previousTitle = (await parent).title;

  return {
    title: `PLL ${data.name}` || previousTitle,
    description: `PLL ${data.name}`,
    alternates: {
      canonical: `/algs/333/pll/${id}`,
    },
  };
}

export default function Page({ params }: Props) {
  const { id } = use(params);

  const data = definitionMap.get(id as PLLCaseId);

  if (!data) {
    notFound();
  }

  return <AlgorithmPanel {...data} />;
}

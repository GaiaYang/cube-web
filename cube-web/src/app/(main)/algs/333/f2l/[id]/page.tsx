import { use } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import {
  definitions,
  type F2LCaseId,
} from "@/contents/cube/333/f2l/definitions";
import AlgorithmPanel from "@/components/cube/AlgorithmPanel";

type Props = {
  params: Promise<{ id: F2LCaseId }>;
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
    title: `F2L ${data.name}` || previousTitle,
    description: `F2L ${data.name}`,
    alternates: {
      canonical: `/algs/333/f2l/${id}`,
    },
  };
}

export default function Page({ params }: Props) {
  const { id } = use(params);

  const data = definitions.find((item) => item.id === id);

  if (!data) {
    notFound();
  }

  return <AlgorithmPanel {...data} />;
}

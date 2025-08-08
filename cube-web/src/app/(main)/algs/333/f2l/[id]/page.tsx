import React, { use } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import {
  definitionMap,
  type F2LCaseId,
} from "@/contents/cube/333/f2l/definitions";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

  const data = definitionMap.get(id as F2LCaseId);

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

  return <main>{id}</main>;
}

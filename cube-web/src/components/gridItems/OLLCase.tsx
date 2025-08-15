import React from "react";

import type { OLLDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/ollCategory";

import Diagram from "@/components/cube/333/diagram/OrientationLastLayer";
import AlgorithmCaseCard from "@/components/AlgorithmCaseCard";

export type OLLCaseProps = OLLDefinition;

export default function OLLCase({ pattern, name, category }: OLLCaseProps) {
  return (
    <AlgorithmCaseCard name={name} tag={labels[category]}>
      <Diagram className="w-full" pattern={pattern} />
    </AlgorithmCaseCard>
  );
}

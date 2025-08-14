import React from "react";

import type { PLLDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/pllCategory";

import Diagram from "@/components/cube/333/diagram/PermutationLastLayer";
import AlgorithmCaseCard from "@/components/AlgorithmCaseCard";

export interface PLLCaseProps extends PLLDefinition {}

export default function PLLCase({ pattern, name, category }: PLLCaseProps) {
  return (
    <AlgorithmCaseCard name={name} tag={labels[category]}>
      <Diagram className="w-full" pattern={pattern} />
    </AlgorithmCaseCard>
  );
}

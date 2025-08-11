import React from "react";

import type { PLLDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/pllCategory";

import Diagram from "@/components/cube/333/diagram/PermutationLastLayer";
import AlgorithmCaseCard from "@/components/AlgorithmCaseCard";

export interface PLLAlgoithmProps extends PLLDefinition {}

export default function PLLAlgoithm({
  pattern,
  name,
  category,
}: PLLAlgoithmProps) {
  return (
    <AlgorithmCaseCard name={name} category={labels[category]}>
      <Diagram className="w-full" pattern={pattern} />
    </AlgorithmCaseCard>
  );
}

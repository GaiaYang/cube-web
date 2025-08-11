import React from "react";

import type { OLLDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/ollCategory";

import Diagram from "@/components/cube/333/diagram/OrientationLastLayer";
import AlgorithmCaseCard from "@/components/AlgorithmCaseCard";

export interface OLLAlgoithmProps extends OLLDefinition {}

export default function OLLAlgoithm({
  pattern,
  name,
  category,
}: OLLAlgoithmProps) {
  return (
    <AlgorithmCaseCard name={name} category={labels[category]}>
      <Diagram className="w-full" pattern={pattern} />
    </AlgorithmCaseCard>
  );
}

import React from "react";

import type { F2LDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/f2lCategory";

import Diagram from "@/components/cube/333/diagram/FirstTwoLayers";
import AlgorithmCaseCard from "@/components/AlgorithmCaseCard";

export type F2LCaseProps = F2LDefinition;

export default function F2LCase({ pattern, name, category }: F2LCaseProps) {
  return (
    <AlgorithmCaseCard name={name} tag={labels[category]}>
      <Diagram pattern={pattern} />
    </AlgorithmCaseCard>
  );
}

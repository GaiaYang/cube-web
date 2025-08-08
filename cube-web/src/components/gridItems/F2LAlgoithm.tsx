import React from "react";

import type { F2LDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/f2lCategory";

import Diagram from "@/components/cube/333/diagram/FirstTwoLayers";
import AlgorithmCard from "@/components/AlgorithmCard";

export interface F2LAlgoithmProps extends F2LDefinition {}

export default function F2LAlgoithm({
  // pattern,
  name,
  category,
}: F2LAlgoithmProps) {
  return (
    <AlgorithmCard name={name} category={labels[category]}>
      <Diagram />
    </AlgorithmCard>
  );
}

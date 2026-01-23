import type { OLLDefinition } from "@/types/cube/333";
import { labels } from "@/data/options/cube/333/ollCategory";

import Diagram from "@/components/cube/333/diagram/OrientationLastLayer";
import AlgorithmCaseCard from "@/components/cube/AlgorithmCaseCard";

export type OLLCaseProps = OLLDefinition;

export default function OLLCase({ pattern, name, category }: OLLCaseProps) {
  return (
    <AlgorithmCaseCard
      name={name}
      tag={labels[category]}
      renderDiagram={
        <Diagram pattern={pattern} loading="lazy" placeholder="skeleton" />
      }
    />
  );
}

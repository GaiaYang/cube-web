import type { PLLDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/pllCategory";

import Diagram from "@/components/cube/333/diagram/PermutationLastLayer";
import AlgorithmCaseCard from "@/components/cube/AlgorithmCaseCard";

export type PLLCaseProps = PLLDefinition;

export default function PLLCase({ pattern, name, category }: PLLCaseProps) {
  return (
    <AlgorithmCaseCard
      name={name}
      tag={labels[category]}
      renderDiagram={<Diagram className="w-full" pattern={pattern} />}
    />
  );
}

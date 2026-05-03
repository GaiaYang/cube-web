import Diagram from "@/components/cube/333/diagram/PermutationLastLayer";
import AlgorithmCaseCard from "@/components/cube/algorithms/AlgorithmCaseCard";
import { labels } from "@/data/options/cube/333/pllCategory";
import type { PLLDefinition } from "@/types/cube/333";

export type PLLCaseProps = PLLDefinition;

export default function PLLCase({ pattern, name, category }: PLLCaseProps) {
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

import { InView } from "react-intersection-observer";

import type { F2LDefinition } from "@/types/cube/333";
import { labels } from "@/data/options/cube/333/f2lCategory";

import Diagram from "@/components/cube/333/diagram/FirstTwoLayers";
import AlgorithmCaseCard from "@/components/cube/AlgorithmCaseCard";

export type F2LCaseProps = F2LDefinition;

export default function F2LCase({ pattern, name, category }: F2LCaseProps) {
  return (
    <AlgorithmCaseCard
      name={name}
      tag={labels[category]}
      renderDiagram={
        <InView>
          {({ ref, inView }) => (
            <Diagram ref={ref} pattern={pattern} isLoading={!inView} />
          )}
        </InView>
      }
    />
  );
}

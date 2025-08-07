import React from "react";

import type { PLLDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/pllCategory";

import Diagram from "@/components/cube/333/diagram/PermutationLastLayer";

export interface PLLAlgoithmProps extends PLLDefinition {}

export default function PLLAlgoithm({
  pattern,
  name,
  category,
}: PLLAlgoithmProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="w-full">
        <Diagram className="w-full" pattern={pattern} />
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="badge badge-soft badge-primary badge-lg">
        {labels[category]}
      </p>
    </div>
  );
}

import React from "react";

import type { OLLDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/ollCategory";

import Diagram from "@/components/cube/333/diagram/OrientationLastLayer";

export interface OLLAlgoithmProps extends OLLDefinition {}

export default function OLLAlgoithm({
  pattern,
  name,
  category,
}: OLLAlgoithmProps) {
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

import React from "react";

import type { F2LDefinition } from "@/types/cube/333";
import { labels } from "@/options/cube/333/f2lCategory";

// import Diagram from "@/components/cube/333/diagram/OrientationLastLayer";

export interface F2LAlgoithmProps extends F2LDefinition {}

export default function F2LAlgoithm({
  // pattern,
  name,
  category,
}: F2LAlgoithmProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="w-full">
        {/* <Diagram className="w-full" pattern={pattern} /> */}
        <div className="skeleton aspect-square w-full" />
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="badge badge-soft badge-primary badge-lg">
        {labels[category]}
      </p>
    </div>
  );
}

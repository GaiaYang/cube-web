import React from "react";

import type { CommonDefinition } from "@/types/cube/common";

import cn from "@/utils/cn";

import AlgorithmDisplay from "./AlgorithmDisplay";
import UnderConstruction from "../notices/UnderConstruction";

export type AlgorithmPanelProps = CommonDefinition;

export default function AlgorithmPanel({
  id,
  name,
  setupAlgorithm,
  algorithms,
}: AlgorithmPanelProps) {
  return (
    <div className={cn("w-full max-w-none grow", "px-4 sm:px-6 lg:px-8")}>
      {true ? (
        <UnderConstruction />
      ) : (
        <>
          <p>{id}</p>
          <p>{name}</p>
          <AlgorithmDisplay algorithm={setupAlgorithm} />
          <ul>{algorithms.map(_renderAlgorithm)}</ul>
        </>
      )}
    </div>
  );
}

function _renderAlgorithm(algorithm: string, index: number) {
  return (
    <li key={index}>
      <AlgorithmDisplay algorithm={algorithm} />
    </li>
  );
}

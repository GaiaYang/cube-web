import React from "react";

import type { CommonDefinition } from "@/types/cube/common";

import AlgorithmDisplay from "./AlgorithmDisplay";

export type AlgorithmPanelProps = CommonDefinition;

export default function AlgorithmPanel({
  id,
  name,
  setupAlgorithm,
  algorithms,
}: AlgorithmPanelProps) {
  return (
    <div>
      <p>{id}</p>
      <p>{name}</p>
      <AlgorithmDisplay algorithm={setupAlgorithm} />
      <ul>{algorithms.map(_renderAlgorithm)}</ul>
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

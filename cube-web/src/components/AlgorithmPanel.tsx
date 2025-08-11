import React from "react";
import { CommonDefinition } from "@/types/cube/common";

export interface AlgorithmPanelProps extends CommonDefinition {}

export default function AlgorithmPanel({ id }: AlgorithmPanelProps) {
  return <div>{id}</div>;
}

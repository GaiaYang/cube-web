import React from "react";

import CubeDiagram, { type CubeDiagramProps } from "./CubeDiagram";

export interface FirstTwoLayersProps
  extends Omit<CubeDiagramProps, "colorMap"> {}

export default function FirstTwoLayers({}: FirstTwoLayersProps) {
  return <CubeDiagram />;
}

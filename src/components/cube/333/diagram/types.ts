import type { SVGProps } from "react";

import type { LazySvgOptions } from "@/components/LazySvg";

export interface CommonDiagramProps
  extends Omit<SVGProps<SVGSVGElement>, "children">, LazySvgOptions {
  /** 指定固定尺寸 */
  size?: number;
}


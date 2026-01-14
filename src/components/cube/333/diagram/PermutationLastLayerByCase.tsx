import { definitions, type PLLCaseId } from "@/data/cube/333/pll";

import PermutationLastLayer, {
  type PermutationLastLayerProps,
} from "./PermutationLastLayer";

export interface PermutationLastLayerByCaseProps extends Omit<
  PermutationLastLayerProps,
  "pattern"
> {
  /** 該案例的`id` */
  caseId?: PLLCaseId | null;
}

/**
 * PLL顯示特定的圖案
 *
 * 只提供`caseId`直接顯示指定圖案
 * */
export default function PermutationLastLayerByCase({
  caseId,
  ...props
}: PermutationLastLayerByCaseProps) {
  return (
    <PermutationLastLayer
      {...props}
      pattern={
        caseId
          ? definitions.find((item) => item.id === caseId)?.pattern
          : undefined
      }
    />
  );
}

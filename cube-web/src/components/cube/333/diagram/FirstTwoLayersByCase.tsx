import {
  definitionMap,
  type F2LCaseId,
} from "@/contents/cube/333/f2l/definitions";

import FirstTwoLayers, { type FirstTwoLayersProps } from "./FirstTwoLayers";

export interface FirstTwoLayersByCaseProps
  extends Omit<FirstTwoLayersProps, "pattern"> {
  /** 該案例的`id` */
  caseId?: F2LCaseId | null;
}

/**
 * F2L顯示特定的圖案
 *
 * 只提供`caseId`直接顯示指定圖案
 * */
export default function FirstTwoLayersByCase({
  caseId,
  ...props
}: FirstTwoLayersByCaseProps) {
  return (
    <FirstTwoLayers
      {...props}
      pattern={caseId ? definitionMap.get(caseId)?.pattern : undefined}
    />
  );
}

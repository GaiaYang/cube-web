import {
  definitionMap,
  type OLLCaseId,
} from "@/contents/cube/333/oll/definitions";

import OrientationLastLayer, {
  type OrientationLastLayerProps,
} from "./OrientationLastLayer";

export interface OrientationLastLayerByCaseProps
  extends Omit<OrientationLastLayerProps, "pattern"> {
  /** 該案例的`id` */
  caseId?: OLLCaseId | null;
}

/**
 * OLL顯示特定的圖案
 *
 * 只提供`caseId`直接顯示指定圖案
 * */
export default function OrientationLastLayerByCase({
  caseId,
  ...props
}: OrientationLastLayerByCaseProps) {
  return (
    <OrientationLastLayer
      {...props}
      pattern={caseId ? definitionMap.get(caseId)?.pattern : undefined}
    />
  );
}

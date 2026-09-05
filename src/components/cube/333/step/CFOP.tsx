import type { CommonProps } from "./types";

import { Step as DaisyStep, Steps } from "@/components/daisy-ui/steps";

export type Step = "Cross" | "F2L" | "PLL" | "OLL";

export interface CFOPStepProps extends CommonProps {
  /** 步驟 */
  step: Step;
}

interface StepOption {
  label: string;
  value: Step;
}

const steps: StepOption[] = [
  { label: "底層十字", value: "Cross" },
  { label: "前兩層", value: "F2L" },
  { label: "頂面方向", value: "OLL" },
  { label: "頂層位置", value: "PLL" },
];

/** CFOP步驟 */
export default function CFOPStep({
  step,
  direction,
  className,
}: CFOPStepProps) {
  function _renderStep(item: StepOption) {
    return (
      <DaisyStep
        key={item.value}
        color={item.value === step ? "primary" : undefined}
      >
        {item.label}
      </DaisyStep>
    );
  }

  return (
    <Steps vertical={direction === "vertical"} className={className}>
      {steps.map(_renderStep)}
    </Steps>
  );
}

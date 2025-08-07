import React from "react";

import cn from "@/utils/cn";
import type { CommonProps } from "./types";

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
      <li
        key={item.value}
        className={cn("step", { "steps-primary": item.value === step })}
      >
        {item.label}
      </li>
    );
  }

  return (
    <ul
      className={cn(
        "steps",
        { "steps-vertical": direction === "vertical" },
        className,
      )}
    >
      {steps.map(_renderStep)}
    </ul>
  );
}

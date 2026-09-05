import { cn } from "cn";

export interface StepsProps extends React.ComponentProps<"ul"> {
  /** 垂直排列 */
  vertical?: boolean;
}

export function Steps({
  vertical = false,
  className,
  ...props
}: StepsProps) {
  return (
    <ul
      {...props}
      className={cn("steps", { "steps-vertical": vertical }, className)}
    />
  );
}

export interface StepProps extends Omit<
  React.ComponentProps<"li">,
  "color"
> {
  /** 步驟顏色（通常標示已完成） */
  color?:
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
}

export function Step({ color, className, ...props }: StepProps) {
  return (
    <li
      {...props}
      className={cn("step", color && COLOR_CLASSES[color], className)}
    />
  );
}

const COLOR_CLASSES: Record<NonNullable<StepProps["color"]>, string> = {
  neutral: "step-neutral",
  primary: "step-primary",
  secondary: "step-secondary",
  accent: "step-accent",
  info: "step-info",
  success: "step-success",
  warning: "step-warning",
  error: "step-error",
};

import { cn } from "cn";

import type { DaisyColor, DaisySize } from "./types";

export interface BadgeProps extends Omit<
  React.ComponentProps<"span">,
  "color"
> {
  /**
   * 徽章樣式
   *
   * @default "default"
   */
  variant?: "default" | "outline" | "dash" | "soft" | "ghost";
  /** 徽章顏色 */
  color?: DaisyColor;
  /** 徽章尺寸 */
  size?: DaisySize;
}

export function Badge({
  variant = "default",
  color,
  size,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        "badge",
        variant !== "default" && VARIANT_CLASSES[variant],
        color && COLOR_CLASSES[color],
        size && SIZE_CLASSES[size],
        className,
      )}
    />
  );
}

const VARIANT_CLASSES: Record<
  Exclude<NonNullable<BadgeProps["variant"]>, "default">,
  string
> = {
  outline: "badge-outline",
  dash: "badge-dash",
  soft: "badge-soft",
  ghost: "badge-ghost",
};

const COLOR_CLASSES: Record<NonNullable<BadgeProps["color"]>, string> = {
  neutral: "badge-neutral",
  primary: "badge-primary",
  secondary: "badge-secondary",
  accent: "badge-accent",
  info: "badge-info",
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
};

const SIZE_CLASSES: Record<NonNullable<BadgeProps["size"]>, string> = {
  xs: "badge-xs",
  sm: "badge-sm",
  md: "badge-md",
  lg: "badge-lg",
  xl: "badge-xl",
};

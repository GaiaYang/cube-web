import { cn } from "cn";

export interface LoadingProps extends Omit<
  React.ComponentProps<"span">,
  "color"
> {
  /**
   * 載入動畫樣式
   *
   * @default "spinner"
   */
  variant?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
  /** 載入動畫尺寸 */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Loading({
  variant = "spinner",
  size,
  className,
  ...props
}: LoadingProps) {
  return (
    <span
      {...props}
      className={cn(
        "loading",
        VARIANT_CLASSES[variant],
        size && SIZE_CLASSES[size],
        className,
      )}
    />
  );
}

const VARIANT_CLASSES: Record<
  NonNullable<LoadingProps["variant"]>,
  string
> = {
  spinner: "loading-spinner",
  dots: "loading-dots",
  ring: "loading-ring",
  ball: "loading-ball",
  bars: "loading-bars",
  infinity: "loading-infinity",
};

const SIZE_CLASSES: Record<NonNullable<LoadingProps["size"]>, string> = {
  xs: "loading-xs",
  sm: "loading-sm",
  md: "loading-md",
  lg: "loading-lg",
  xl: "loading-xl",
};

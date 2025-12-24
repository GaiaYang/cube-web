import { forwardRef } from "react";

import cn from "@/utils/cn";

export interface CardProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  /**
   * 卡片樣式
   *
   * - `shadow`: 陰影
   * - `border`: 邊框
   * - `dash-border`: 虛線邊框
   *
   * @default "border"
   */
  variant?: "shadow" | "border" | "dash-border";
  /**
   * 卡片尺寸
   *
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "border", size = "md", className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "card bg-base-100 dark:bg-base-200",
        (() => {
          switch (variant) {
            case "shadow":
              return "shadow-sm";
            case "dash-border":
              return "card-dash border-base-300";
            case "border":
            default:
              return "card-border border-base-300";
          }
        })(),
        (() => {
          switch (size) {
            case "xs":
              return "card-xs";
            case "sm":
              return "card-sm";
            case "lg":
              return "card-lg";
            case "xl":
              return "card-xl";
            case "md":
            default:
              return "card-md";
          }
        })(),
        className,
      )}
    />
  );
});

export default Card;

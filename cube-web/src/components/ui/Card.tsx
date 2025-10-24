import cn from "@/utils/cn";
import { forwardRef } from "react";

export interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /**
   * 卡片樣式
   *
   * - `elevation`: 陰影
   * - `outlined`: 邊框
   *
   * @default "outlined"
   */
  variant?: "elevation" | "outlined";
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant, className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "card rounded-lg",
        (() => {
          switch (variant) {
            case "elevation":
              // 深色模式下提升底色並加強陰影
              return ["shadow", "bg-base-100 dark:bg-base-200"];
            case "outlined":
            default:
              // 深色模式下提升底色並加強邊框
              return ["bg-base-100 dark:bg-base-200", "border-base-300 border"];
          }
        })(),
        className,
      )}
    />
  );
});

export default Card;

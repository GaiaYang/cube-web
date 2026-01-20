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
   * 預設使用 Daisy UI 的 Card 尺寸，若傳入則使用自定義尺寸
   *
   * @default undefined
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function Card({
  variant = "border",
  size,
  className,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "card bg-base-100 dark:bg-base-200",
        VARIANT_CLASSES[variant] ?? "",
        size ? SIZE_CLASSES[size] : "",
        className,
      )}
    />
  );
}

const VARIANT_CLASSES: Record<NonNullable<CardProps["variant"]>, string> = {
  shadow: "shadow-sm",
  border: "card-border border-base-300",
  "dash-border": "card-dash border-base-300",
};

const SIZE_CLASSES: Record<NonNullable<CardProps["size"]>, string> = {
  xs: "card-xs",
  sm: "card-sm",
  md: "card-md",
  lg: "card-lg",
  xl: "card-xl",
};

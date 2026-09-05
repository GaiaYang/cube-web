import { cn } from "cn";

export interface CardProps extends React.ComponentProps<"div"> {
  /**
   * 卡片樣式
   *
   * - `shadow`: 陰影
   * - `border`: 邊框
   * - `dash-border`: 虛線邊框
   *
   * @default "shadow"
   */
  variant?: "shadow" | "border" | "dash-border";
  /**
   * 卡片尺寸
   *
   * @default undefined
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** 圖片改為側邊配置（`card-side`） */
  side?: boolean;
  /** 圖片作為全幅背景（`image-full`） */
  imageFull?: boolean;
}

export function Card({
  variant = "shadow",
  size,
  side = false,
  imageFull = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "card bg-base-100",
        VARIANT_CLASSES[variant],
        size && SIZE_CLASSES[size],
        {
          "card-side": side,
          "image-full": imageFull,
        },
        className,
      )}
    />
  );
}

export function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={cn("card-body", className)} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 {...props} className={cn("card-title", className)} />;
}

export function CardActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div {...props} className={cn("card-actions", className)} />;
}

export function CardFigure(props: React.ComponentProps<"figure">) {
  return <figure {...props} />;
}

const VARIANT_CLASSES: Record<NonNullable<CardProps["variant"]>, string> = {
  shadow: "shadow-sm",
  border: "card-border",
  "dash-border": "card-dash",
};

const SIZE_CLASSES: Record<NonNullable<CardProps["size"]>, string> = {
  xs: "card-xs",
  sm: "card-sm",
  md: "card-md",
  lg: "card-lg",
  xl: "card-xl",
};

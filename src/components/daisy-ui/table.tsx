import { cn } from "cn";

export interface TableProps extends Omit<
  React.ComponentProps<"table">,
  "size"
> {
  /** 斑馬紋 */
  zebra?: boolean;
  /** 固定列 */
  pinRows?: boolean;
  /** 固定欄 */
  pinCols?: boolean;
  /** 表格尺寸 */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Table({
  zebra = false,
  pinRows = false,
  pinCols = false,
  size,
  className,
  ...props
}: TableProps) {
  return (
    <table
      {...props}
      className={cn(
        "table",
        {
          "table-zebra": zebra,
          "table-pin-rows": pinRows,
          "table-pin-cols": pinCols,
        },
        size && SIZE_CLASSES[size],
        className,
      )}
    />
  );
}

const SIZE_CLASSES: Record<NonNullable<TableProps["size"]>, string> = {
  xs: "table-xs",
  sm: "table-sm",
  md: "table-md",
  lg: "table-lg",
  xl: "table-xl",
};

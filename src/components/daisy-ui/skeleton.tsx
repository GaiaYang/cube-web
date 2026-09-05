import { cn } from "cn";

/** 骨架 class（用於非 `div` 元素，如 `svg`） */
export function skeletonClassName(enabled = true) {
  return enabled ? "skeleton" : undefined;
}

export function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div {...props} className={cn("skeleton", className)} />;
}

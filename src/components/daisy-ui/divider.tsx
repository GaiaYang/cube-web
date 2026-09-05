import { cn } from "cn";

export function Divider({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div {...props} className={cn("divider", className)} />;
}

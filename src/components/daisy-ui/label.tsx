import { cn } from "cn";

export function Label({ className, ...props }: React.ComponentProps<"p">) {
  return <p {...props} className={cn("label", className)} />;
}

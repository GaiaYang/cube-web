import { cn } from "cn";

export function Fieldset({
  className,
  ...props
}: React.ComponentProps<"fieldset">) {
  return <fieldset {...props} className={cn("fieldset", className)} />;
}

export function FieldsetLegend({
  className,
  ...props
}: React.ComponentProps<"legend">) {
  return <legend {...props} className={cn("fieldset-legend", className)} />;
}

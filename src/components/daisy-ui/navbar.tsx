import { cn } from "cn";

export function Navbar({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return <nav {...props} className={cn("navbar", className)} />;
}

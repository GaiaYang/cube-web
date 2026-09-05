import { cn } from "cn";
import Link from "next/link";

import { buttonVariants } from "@/components/daisy-ui/button";

export type LogoButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "href"
>;

export default function LogoButton({ className, ...props }: LogoButtonProps) {
  return (
    <Link
      {...props}
      href="/"
      className={buttonVariants({
        variant: "ghost",
        className: cn("text-xl", className),
      })}
    >
      <span className="sr-only">前往首頁</span>
      Void Cube
    </Link>
  );
}

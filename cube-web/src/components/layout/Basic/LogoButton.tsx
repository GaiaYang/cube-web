import Link from "next/link";

import cn from "@/utils/cn";

export type LogoButtonProps = Omit<
  React.HTMLAttributes<HTMLAnchorElement>,
  "href"
>;

export default function LogoButton({ className, ...props }: LogoButtonProps) {
  return (
    <Link
      {...props}
      href="/"
      className={cn("btn btn-ghost text-xl", className)}
    >
      <span className="sr-only">前往首頁</span>
      Voidling Cube
    </Link>
  );
}

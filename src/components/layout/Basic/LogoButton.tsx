import { cn } from "cn";
import Link from "next/link";

export type LogoButtonProps = Omit<React.ComponentProps<"a">, "href">;

export default function LogoButton({ className, ...props }: LogoButtonProps) {
  return (
    <Link
      {...props}
      href="/"
      className={cn("btn btn-ghost text-xl", className)}
    >
      <span className="sr-only">前往首頁</span>
      Void Cube
    </Link>
  );
}

import React from "react";
import Link, { type LinkProps } from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import cn from "@/utils/cn";

export interface ExternalLinkProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof LinkProps<unknown>
    >,
    LinkProps<unknown>,
    React.RefAttributes<HTMLAnchorElement> {
  children?: React.ReactNode | undefined;
}

/** 外部連結 */
export default function ExternalLink({
  children,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <Link
      {...props}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={cn(className)}
    >
      {children}
      <span className="ml-0.5 inline-flex">
        <ExternalLinkIcon size={16} />
      </span>
    </Link>
  );
}

import React from "react";
import Link, { type LinkProps } from "next/link";
import { ArrowUpRightIcon, ExternalLinkIcon } from "lucide-react";
import * as z from "zod";

import cn from "@/utils/cn";

export type NewTabLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps<unknown>
> &
  LinkProps<unknown> & {
    children?: React.ReactNode | undefined;
  } & React.RefAttributes<HTMLAnchorElement>;

/** 新分頁連結 */
export default function NewTabLink({
  children,
  className,
  ...props
}: NewTabLinkProps) {
  const href = props.href;
  const isExternal = isExternalUrl(href);
  if (isExternal) {
    return (
      <a
        {...props}
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={cn("link link-info", className)}
      >
        {children}
        <span className="ml-0.5 inline-flex">
          <ExternalLinkIcon size={ICON_SIZE} />
        </span>
      </a>
    );
  } else {
    return (
      <Link
        {...props}
        href={href}
        target="_blank"
        className={cn("link link-primary", className)}
      >
        {children}
        <span className="ml-0.5 inline-flex">
          <ArrowUpRightIcon size={ICON_SIZE} />
        </span>
      </Link>
    );
  }
}

/** 圖標尺寸 */
const ICON_SIZE = 16;

function isExternalUrl(href: unknown): href is string {
  return typeof href === "string" && z.httpUrl().safeParse(href).success;
}

import { ArrowUpRightIcon, ExternalLinkIcon } from "lucide-react";
import NextLink, { type LinkProps } from "next/link";
import * as z from "zod";

import { Link, linkVariants } from "@/components/daisy-ui/link";

export type NewTabLinkProps = Omit<
  React.ComponentProps<"a">,
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

  if (typeof href === "string" && z.httpUrl().safeParse(href).success) {
    return (
      <Link
        {...props}
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        color="info"
        className={className}
      >
        {children}
        <span className="ml-0.5 inline-flex">
          <ExternalLinkIcon size={ICON_SIZE} />
        </span>
      </Link>
    );
  }

  return (
    <NextLink
      {...props}
      href={href}
      target="_blank"
      className={linkVariants({ color: "primary", className })}
    >
      {children}
      <span className="ml-0.5 inline-flex">
        <ArrowUpRightIcon size={ICON_SIZE} />
      </span>
    </NextLink>
  );
}

/** 圖標尺寸 */
const ICON_SIZE = 16;

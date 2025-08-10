"use client";

import { useMemo } from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import cn from "@/utils/cn";

export interface MenuLinkProps
  extends LinkProps,
    Pick<React.HTMLAttributes<HTMLElement>, "className"> {
  children?: React.ReactNode;
}

export default function MenuLink({ className, href, ...props }: MenuLinkProps) {
  const pathname = usePathname();
  const isActive = useMemo(() => href === pathname, [href, pathname]);

  return (
    <Link
      {...props}
      href={href}
      className={cn({ "menu-active": isActive }, className)}
    />
  );
}

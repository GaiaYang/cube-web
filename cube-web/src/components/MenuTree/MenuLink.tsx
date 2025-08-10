"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import cn from "@/utils/cn";

export interface MenuLinkProps
  extends LinkProps,
    Pick<React.HTMLAttributes<HTMLElement>, "className"> {
  children?: React.ReactNode;
}

export default function MenuLink({ className, ...props }: MenuLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link {...props} className={cn({ "menu-active": isActive }, className)} />
  );
}

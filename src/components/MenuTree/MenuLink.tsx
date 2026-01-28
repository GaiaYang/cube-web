"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import cn from "@/utils/cn";

export interface MenuLinkProps
  extends LinkProps, Pick<React.HTMLAttributes<HTMLElement>, "className"> {
  children?: React.ReactNode;
}

export default function MenuLink({ className, href, ...props }: MenuLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      href={href}
      className={cn({ "menu-active": pathname === href }, className)}
    />
  );
}

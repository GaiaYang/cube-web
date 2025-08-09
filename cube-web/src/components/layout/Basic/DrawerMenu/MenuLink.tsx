import Link from "next/link";

import { drawerId } from "../config";
import cn from "@/utils/cn";

export interface MenuLinkProps
  extends Pick<React.HTMLAttributes<HTMLElement>, "onClick" | "className"> {
  isActive?: boolean;
  href?: string;
  children?: React.ReactNode;
}

export default function MenuLink({
  href,
  onClick,
  isActive,
  className,
  children,
}: MenuLinkProps) {
  const _onClick: React.MouseEventHandler<HTMLElement> = (event) => {
    closeDrawer();
    onClick?.(event);
  };

  const commonProps: React.HTMLAttributes<HTMLElement> = {
    className: cn({ "menu-active": isActive }, className),
    onClick: _onClick,
  };

  if (href) {
    return (
      <Link {...commonProps} href={href}>
        {children}
      </Link>
    );
  }

  return <a {...commonProps}>{children}</a>;
}

/** 點擊後關閉抽屜 */
function closeDrawer() {
  const drawer = document.getElementById(drawerId) as HTMLInputElement | null;
  if (drawer) {
    drawer.checked = false;
  }
}

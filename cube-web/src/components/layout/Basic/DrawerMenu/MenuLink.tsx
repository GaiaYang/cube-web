import Link from "next/link";

import { drawerId } from "../config";

export interface MenuLinkProps {
  href?: string;
  children: React.ReactNode;
}

export default function MenuLink({ href, children }: MenuLinkProps) {
  const commonProps: React.HTMLAttributes<HTMLElement> = {
    onClick: closeDrawer,
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

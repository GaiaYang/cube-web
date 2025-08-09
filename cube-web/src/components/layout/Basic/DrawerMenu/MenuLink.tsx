import Link from "next/link";

export interface MenuLinkProps {
  href?: string;
  children: React.ReactNode;
}

export default function MenuLink({ href, children }: MenuLinkProps) {
  if (href) {
    return <Link href={href}>{children}</Link>;
  }

  return <a>{children}</a>;
}

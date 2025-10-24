"use client";

import useScrolledClass from "./useScrolledClass";

export default function Header({ children }: React.PropsWithChildren) {
  const className = useScrolledClass();

  return <header className={className}>{children}</header>;
}
